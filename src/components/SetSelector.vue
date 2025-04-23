<template>
  <div class="theme-selection">
    <h3 class="theme-title">{{ t('gameTheme') }}</h3>
    <div class="set-selector">
      <button 
        v-for="set in sets" 
        :key="set.id"
        class="set-button"
        :class="{ active: selectedSet === set.id }"
        @click="selectSet(set.id)"
      >
        {{ t(set.id === 'set1' ? 'aiSpace' : 'meme') }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useI18n } from '../utils/i18n';

const { t } = useI18n();
const selectedSet = ref('set1');

const sets = [
  { id: 'set1' },
  { id: 'set2' }
];

const emit = defineEmits(['set-selected']);

const selectSet = (setId) => {
  selectedSet.value = setId;
  emit('set-selected', setId);
};
</script>

<style scoped>
.theme-selection {
  background: var(--card-bg);
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 2px solid var(--border-color);
  margin: 0 auto 2rem;
  width: 90%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.theme-title {
  color: var(--text-primary);
  font-size: 1.2rem;
  margin-bottom: 1rem;
  text-align: center;
  width: 100%;
}

.set-selector {
  display: flex;
  gap: 1rem;
  justify-content: center;
  width: 100%;
  flex-wrap: wrap;
}

.set-button {
  padding: 0.8rem 1.5rem;
  border: 2px solid var(--border-color);
  border-radius: 8px;
  background: var(--card-bg);
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  min-width: 120px;
  text-align: center;
}

.set-button:hover {
  background: var(--bg-secondary);
  transform: translateY(-2px);
}

.set-button.active {
  background: linear-gradient(120deg, var(--gradient-start) 0%, var(--gradient-end) 100%);
  border-color: var(--gradient-start);
  color: white;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}

@media (max-width: 480px) {
  .theme-selection {
    padding: 1rem;
    width: 95%;
  }

  .set-button {
    padding: 0.6rem 1rem;
    min-width: 100px;
    font-size: 0.9rem;
  }
}
</style> 