<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import StartPage from './components/StartPage.vue';
import GameBoard from './components/GameBoard.vue';
import { useTheme } from './utils/theme';

const { theme } = useTheme();
const currentView = ref('start');
const gameDifficulty = ref(null);
const gameSet = ref('set1');
const isSoundOn = ref(true);
const audio = ref(null);

onMounted(() => {
  // Устанавливаем тему при загрузке
  document.documentElement.setAttribute('data-theme', theme.value);
  
  audio.value = new Audio('/src/assets/audio/background-music.mp3');
  audio.value.loop = true;
  audio.value.volume = 0.3;
  
  const savedSoundState = localStorage.getItem('soundEnabled');
  isSoundOn.value = savedSoundState === null || savedSoundState === 'true';
  localStorage.setItem('soundEnabled', isSoundOn.value);
  
  if (isSoundOn.value) {
    audio.value.play().catch(() => {
      // Игнорируем ошибку автовоспроизведения
    });
  }
});

onUnmounted(() => {
  if (audio.value) {
    audio.value.pause();
    audio.value = null;
  }
});

const toggleSound = () => {
  isSoundOn.value = !isSoundOn.value;
  localStorage.setItem('soundEnabled', isSoundOn.value);
  
  if (audio.value) {
    if (isSoundOn.value) {
      audio.value.play().catch(() => {
        // Игнорируем ошибку автовоспроизведения
      });
    } else {
      audio.value.pause();
    }
  }
};

const handleSetSelected = (setId) => {
  gameSet.value = setId;
};

const startGame = (difficulty) => {
  currentView.value = 'game';
  gameDifficulty.value = difficulty;
};

const handleGameOver = (result) => {
  if (result.reset) {
    currentView.value = 'start';
    gameDifficulty.value = null;
  }
};
</script>

<template>
  <div class="app" :data-theme="theme">
    <StartPage 
      v-if="currentView === 'start'" 
      @start-game="startGame"
      @set-selected="handleSetSelected"
      :is-sound-on="isSoundOn"
      @toggle-sound="toggleSound"
    />
    <GameBoard 
      v-else-if="currentView === 'game'"
      :difficulty="gameDifficulty"
      :set="gameSet"
      @game-over="handleGameOver"
      :is-sound-on="isSoundOn"
      @toggle-sound="toggleSound"
    />
    </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --bg-primary: #f5f5f5;
  --bg-secondary: #ffffff;
  --text-primary: #1e293b;
  --text-secondary: #64748b;
  --border-color: #e2e8f0;
  --card-bg: rgba(255, 255, 255, 0.9);
  --gradient-start: #6366f1;
  --gradient-end: #8b5cf6;
}

[data-theme="dark"] {
  --bg-primary: #1e293b;
  --bg-secondary: #334155;
  --text-primary: #f1f5f9;
  --text-secondary: #94a3b8;
  --border-color: #475569;
  --card-bg: rgba(51, 65, 85, 0.9);
  --gradient-start: #4f46e5;
  --gradient-end: #7c3aed;
}

body {
  font-family: 'Inter', sans-serif;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  transition: background-color 0.3s ease, color 0.3s ease;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.app {
  width: 100%;
  min-height: 100vh;
    display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}
</style>
