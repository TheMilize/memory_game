<template>
  <div class="game-board">
    <div class="game-content">
      <div class="game-stats">
        <Timer 
          :time-limit="timeLimit" 
          :is-running="gameStarted && !isGameOver"
          @time-up="handleTimeUp"
        />
        <div class="moves-counter">
          <span class="moves-label">{{ t('moves') }}:</span>
          <span class="moves-value">{{ moves }}</span>
        </div>
        <SoundToggle :is-sound-on="isSoundOn" :show-label="false" @toggle-sound="$emit('toggle-sound')" />
        <button class="menu-button" @click="returnToMenu">
          <span class="menu-icon">←</span>
          {{ t('menu') }}
        </button>
      </div>
      
      <div class="cards-grid" :style="gridStyle">
        <Card
          v-for="card in cards"
          :key="card.id"
          :card-id="card.id"
          :card-image="card.image"
          :is-flipped="card.isFlipped"
          :is-matched="card.isMatched"
          @card-click="handleCardClick"
        />
      </div>
      
      <div v-if="isGameOver" class="game-over">
        <h2>{{ gameResult }}</h2>
        <p class="stats">{{ t('moves') }}: {{ moves }}</p>
        <button @click="resetGame">{{ t('playAgain') }}</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Card from './Card.vue';
import Timer from './Timer.vue';
import SoundToggle from './SoundToggle.vue';
import { DIFFICULTY_LEVELS } from '../utils/constants';
import { useI18n } from '../utils/i18n';

const { t } = useI18n();

const props = defineProps({
  difficulty: {
    type: String,
    required: true
  },
  set: {
    type: String,
    required: true
  },
  isSoundOn: {
    type: Boolean,
    required: true
  }
});

const emit = defineEmits(['game-over', 'toggle-sound']);

const isGameOver = ref(false);
const gameResult = ref('');
const timeLimit = ref(0);
const cards = ref([]);
const flippedCards = ref([]);
const moves = ref(0);
const gameStarted = ref(false);

const gridStyle = computed(() => {
  const gridSize = DIFFICULTY_LEVELS[props.difficulty].gridSize;
  return {
    'grid-template-columns': `repeat(${gridSize}, 1fr)`
  };
});

const getCardImages = () => {
  const setPath = props.set === 'set1' ? 'set1' : 'set2';
  return Array.from({ length: 15 }, (_, i) => `/src/assets/${setPath}/${i + 1}.jpg`);
};

const initializeCards = () => {
  const difficulty = DIFFICULTY_LEVELS[props.difficulty];
  timeLimit.value = difficulty.timeLimit;
  const cardImages = getCardImages();
  
  // Создаем пары карточек
  const cardPairs = [...cardImages, ...cardImages];
  
  // Перемешиваем карточки
  for (let i = cardPairs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cardPairs[i], cardPairs[j]] = [cardPairs[j], cardPairs[i]];
  }
  
  cards.value = cardPairs.map((image, index) => ({
    id: index,
    image,
    isFlipped: false,
    isMatched: false
  }));
};

const handleCardClick = (cardId) => {
  if (flippedCards.value.length >= 2) return;
  
  const card = cards.value.find(c => c.id === cardId);
  if (!card || card.isFlipped || card.isMatched) return;
  
  if (!gameStarted.value) {
    gameStarted.value = true;
  }
  
  card.isFlipped = true;
  flippedCards.value.push(card);
  
  if (flippedCards.value.length === 2) {
    moves.value++;
    checkMatch();
  }
};

const checkMatch = () => {
  const [card1, card2] = flippedCards.value;
  
  if (card1.image === card2.image) {
    card1.isMatched = true;
    card2.isMatched = true;
    flippedCards.value = [];
    
    // Проверяем, все ли карточки найдены
    if (cards.value.every(card => card.isMatched)) {
      handleWin();
    }
  } else {
    setTimeout(() => {
      card1.isFlipped = false;
      card2.isFlipped = false;
      flippedCards.value = [];
    }, 1000);
  }
};

const handleWin = () => {
  isGameOver.value = true;
  gameResult.value = t('congratulations');
  emit('game-over', { moves: moves.value, won: true });
};

const handleTimeUp = () => {
  isGameOver.value = true;
  gameResult.value = t('timeUp');
  emit('game-over', { moves: moves.value, won: false });
};

const resetGame = () => {
  emit('game-over', { reset: true });
};

const returnToMenu = () => {
  emit('game-over', { reset: true });
};

// Инициализируем игру при монтировании компонента
initializeCards();
</script>

<style scoped>
.game-board {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  background: var(--background-color);
  transition: background-color 0.3s ease;
  overflow-y: auto;
}

.game-content {
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
}

.game-stats {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1rem;
  background: var(--card-bg);
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  gap: 1rem;
  width: 100%;
  position: relative;
}

.moves-counter {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.2rem;
  color: var(--text-primary);
}

.moves-label {
  font-weight: 500;
  color: var(--text-secondary);
}

.moves-value {
  font-weight: 700;
  color: var(--gradient-start);
}

.cards-grid {
  display: grid;
  gap: 20px;
  margin-top: 20px;
  justify-content: center;
  padding: 1rem;
  background: var(--card-bg);
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  grid-template-columns: repeat(5, 1fr);
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}

@media (max-width: 1200px) {
  .cards-grid {
    grid-template-columns: repeat(5, 1fr);
  }
}

@media (max-width: 1000px) {
  .cards-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 800px) {
  .cards-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 600px) {
  .cards-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.game-over {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: var(--bg-secondary);
  padding: 2rem;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  width: 90%;
}

.game-over h2 {
  font-size: 1.8rem;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.stats {
  font-size: 1.2rem;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}

.game-over button {
  margin-top: 1rem;
  padding: 0.8rem 2rem;
  font-size: 1rem;
  background: linear-gradient(120deg, var(--gradient-start) 0%, var(--gradient-end) 100%);
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.game-over button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}

.menu-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: var(--card-bg);
  border: 2px solid var(--border-color);
  border-radius: 8px;
  color: var(--text-secondary);
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.menu-button:hover {
  background: var(--bg-secondary);
  border-color: var(--border-color);
  color: var(--text-primary);
}

.menu-icon {
  font-size: 1.2rem;
  font-weight: bold;
}
</style> 