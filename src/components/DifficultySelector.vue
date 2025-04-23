<template>
  <div class="difficulty-selector">
    <button
      v-for="(level, key) in DIFFICULTY_LEVELS"
      :key="key"
      class="difficulty-button"
      :class="{ active: selectedDifficulty === key }"
      @click="selectDifficulty(key)"
    >
      <div class="button-content">
        <span class="difficulty-name">{{ t(key) }}</span>
        <span class="difficulty-info">
          {{ level.pairs }} {{ t('pairs') }}, {{ Math.floor(level.timeLimit / 60) }} {{ 
            Math.floor(level.timeLimit / 60) === 1 ? t('minute') : 
            [2,3,4].includes(Math.floor(level.timeLimit / 60) % 10) && ![12,13,14].includes(Math.floor(level.timeLimit / 60)) ? t('minutes2') :
            t('minutes')
          }}
        </span>
      </div>
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { DIFFICULTY_LEVELS } from '../utils/constants';
import { useI18n } from '../utils/i18n';

const { t } = useI18n();
const selectedDifficulty = ref(null);

const emit = defineEmits(['difficulty-selected']);

const selectDifficulty = (difficulty) => {
  selectedDifficulty.value = difficulty;
  emit('difficulty-selected', difficulty);
};
</script>

<style scoped>
.difficulty-selector {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}

.difficulty-button {
  position: relative;
  padding: 1.2rem;
  border: none;
  border-radius: 1rem;
  background: #ffffff;
  color: #333;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.difficulty-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  border-color: rgba(0, 0, 0, 0.2);
}

.difficulty-button.active {
  background: linear-gradient(135deg, #f8fafc, #e2e8f0);
  color: #1e293b;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  border-color: rgba(0, 0, 0, 0.2);
}

.difficulty-button.easy {
  background: #ffffff;
  border-color: rgba(34, 197, 94, 0.2);
}

.difficulty-button.easy:hover {
  background: #f0fdf4;
  border-color: rgba(34, 197, 94, 0.4);
}

.difficulty-button.easy.active {
  background: linear-gradient(135deg, #f0fdf4, #dcfce7);
  color: #166534;
  border-color: rgba(34, 197, 94, 0.4);
}

.difficulty-button.medium {
  background: #ffffff;
  border-color: rgba(239, 68, 68, 0.2);
}

.difficulty-button.medium:hover {
  background: #fef2f2;
  border-color: rgba(239, 68, 68, 0.4);
}

.difficulty-button.medium.active {
  background: linear-gradient(135deg, #fef2f2, #fee2e2);
  color: #991b1b;
  border-color: rgba(239, 68, 68, 0.4);
}

.difficulty-button.hard {
  background: #ffffff;
  border-color: rgba(59, 130, 246, 0.2);
}

.difficulty-button.hard:hover {
  background: #eff6ff;
  border-color: rgba(59, 130, 246, 0.4);
}

.difficulty-button.hard.active {
  background: linear-gradient(135deg, #eff6ff, #dbeafe);
  color: #1e40af;
  border-color: rgba(59, 130, 246, 0.4);
}

.button-content {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  text-align: left;
}

.difficulty-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: inherit;
}

.difficulty-info {
  font-size: 0.9rem;
  opacity: 0.8;
  color: inherit;
}

@media (max-width: 600px) {
  .difficulty-selector {
    padding: 0 1rem;
  }
  
  .difficulty-button {
    padding: 1rem;
  }
  
  .difficulty-name {
    font-size: 1rem;
  }
  
  .difficulty-info {
    font-size: 0.85rem;
  }
}
</style> 