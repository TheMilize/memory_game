<template>
  <div class="timer">
    <div class="timer-icon">⏱️</div>
    <div class="timer-display">
      {{ formattedTime }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { useI18n } from '../utils/i18n';

const { t } = useI18n();

const props = defineProps({
  timeLimit: {
    type: Number,
    required: true
  },
  isRunning: {
    type: Boolean,
    default: true
  }
});

const emit = defineEmits(['time-up']);

const timeLeft = ref(props.timeLimit);
let timer = null;

const formattedTime = computed(() => {
  const minutes = Math.floor(timeLeft.value / 60);
  const seconds = timeLeft.value % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
});

const startTimer = () => {
  if (timer) {
    clearInterval(timer);
  }
  timeLeft.value = props.timeLimit;
  timer = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--;
    } else {
      clearInterval(timer);
      emit('time-up');
    }
  }, 1000);
};

const stopTimer = () => {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
};

watch(() => props.isRunning, (newValue) => {
  if (newValue) {
    startTimer();
  } else {
    stopTimer();
  }
});

watch(() => props.timeLimit, () => {
  if (props.isRunning) {
    startTimer();
  }
});

onMounted(() => {
  if (props.isRunning) {
    startTimer();
  }
});

onUnmounted(() => {
  stopTimer();
});
</script>

<style scoped>
.timer {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.2rem;
  font-weight: 600;
  color: #1e293b;
}

.timer-icon {
  font-size: 1.4rem;
}

.timer-display {
  font-family: 'Inter', monospace;
  color: #6366f1;
  background: rgba(99, 102, 241, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  min-width: 80px;
  text-align: center;
}
</style> 