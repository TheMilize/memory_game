<template>
  <div class="start-page">
    <div class="start-content">
      <div class="controls">
        <div class="theme-toggle">
          <div class="toggle-switch">
            <label class="switch-label">
              <input type="checkbox" class="checkbox" :checked="theme === 'dark'" @change="toggleTheme">
              <span class="slider"></span>
            </label>
          </div>
          <span class="control-label">{{ t('theme') }}</span>
        </div>
        <div class="language-toggle">
          <button class="language-button" @click="toggleLanguage">
            {{ language === 'ru' ? 'EN' : 'RU' }}
          </button>
          <span class="control-label">{{ t('language') }}</span>
        </div>
        <SoundToggle :is-sound-on="isSoundOn" @toggle-sound="$emit('toggle-sound')" />
      </div>
      <h1 class="game-title">{{ t('gameTitle') }}</h1>
      <p class="game-description">{{ t('gameDescription') }}</p>
      <SetSelector @set-selected="handleSetSelected" />
      <DifficultySelector @difficulty-selected="startGame" />
    </div>
  </div>
</template>

<script setup>
import { defineEmits } from 'vue';
import DifficultySelector from './DifficultySelector.vue';
import { useTheme } from '../utils/theme';
import { useI18n } from '../utils/i18n';
import SoundToggle from './SoundToggle.vue';
import SetSelector from './SetSelector.vue';

const { theme, toggleTheme } = useTheme();
const { language, t, toggleLanguage } = useI18n();
const emit = defineEmits(['start-game', 'set-selected', 'toggle-sound']);

const handleSetSelected = (setId) => {
  emit('set-selected', setId);
};

const startGame = (difficulty) => {
  emit('start-game', difficulty);
};

defineProps({
  isSoundOn: {
    type: Boolean,
    required: true
  }
});
</script>

<style scoped>
.start-page {
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--gradient-start) 0%, var(--gradient-end) 100%);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}

.start-content {
  text-align: center;
  padding: 40px;
  background: var(--card-bg);
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  max-width: 600px;
  width: 100%;
  position: relative;
  margin: 0 auto;
  max-height: 90vh;
  overflow-y: auto;
}

.controls {
  position: fixed;
  top: 1rem;
  right: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  z-index: 10;
  margin-right: 2rem;
  background: var(--card-bg);
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 2px solid var(--border-color);
}

.theme-toggle, .language-toggle, .sound-toggle-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60px;
  height: 60px;
  position: relative;
}

.toggle-switch, .language-button, .toggleSwitch {
  width: 40px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.control-label {
  color: var(--text-secondary);
  font-size: 0.8rem;
  text-align: center;
  white-space: nowrap;
  margin-top: 0.8rem;
  width: 100%;
}

.toggle-switch {
  position: relative;
  width: 60px;
  height: 30px;
  --light: #d8dbe0;
  --dark: #28292c;
}

.switch-label {
  position: relative;
  width: 100%;
  height: 100%;
  display: block;
  cursor: pointer;
}

.checkbox {
  position: absolute;
  display: none;
}

.slider {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--dark);
  border-radius: 15px;
  transition: 0.3s;
}

.checkbox:checked ~ .slider {
  background-color: var(--light);
}

.slider::before {
  content: "";
  position: absolute;
  top: 3px;
  left: 3px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: var(--light);
  transition: 0.3s;
}

.checkbox:checked ~ .slider::before {
  transform: translateX(30px);
  background-color: var(--dark);
}

.language-button {
  width: 60px;
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
}

.language-button:hover {
  background: var(--bg-secondary);
  border-color: var(--border-color);
  transform: translateY(-2px);
}

@media (max-width: 600px) {
  .controls {
    position: static;
    justify-content: center;
    margin-bottom: 1.5rem;
    gap: 1.5rem;
  }

  .theme-toggle, .language-toggle {
    width: 70px;
  }

  .game-title {
    margin-top: 0;
  }
}

.game-title {
  font-size: 3rem;
  color: var(--text-primary);
  margin-top: 60px;
  margin-bottom: 1rem;
  font-weight: 700;
}

.game-description {
  font-size: 1.2rem;
  color: var(--text-secondary);
  margin-bottom: 3rem;
  line-height: 1.6;
}
</style> 