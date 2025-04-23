<template>
  <div class="sound-toggle-container">
    <button class="sound-button" @click="$emit('toggle-sound')">
      {{ isSoundOn ? '🔊' : '🔇' }}
    </button>
    <span v-if="showLabel" class="control-label">{{ t('sound') }}</span>
  </div>
</template>

<script setup>
import { useI18n } from '../utils/i18n';

const { t } = useI18n();
defineProps({
  isSoundOn: {
    type: Boolean,
    required: true
  },
  showLabel: {
    type: Boolean,
    default: true
  }
});

defineEmits(['toggle-sound']);
</script>

<style scoped>
.sound-toggle-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 50px;
}

.sound-button {
  width: 40px;
  height: 30px;
  background: var(--card-bg);
  border: 2px solid var(--border-color);
  border-radius: 15px;
  color: var(--text-primary);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}

.sound-button:hover {
  background: var(--bg-secondary);
  border-color: var(--border-color);
  transform: translateY(-2px);
}

.control-label {
  color: var(--text-secondary);
  font-size: 0.8rem;
  text-align: center;
  white-space: nowrap;
  margin-top: 0.5rem;
}
</style> 