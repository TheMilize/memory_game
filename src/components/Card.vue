<template>
  <div 
    class="flip-card" 
    :class="{ 'flipped': isFlipped, 'matched': isMatched }"
    @click="handleClick"
  >
    <div class="flip-card-inner">
      <div class="flip-card-front">
        <img :src="cardImage" :alt="`Card ${cardId}`">
      </div>
      <div class="flip-card-back">
        <div class="card-back-content">
          <div class="card-pattern"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  cardId: {
    type: Number,
    required: true
  },
  cardImage: {
    type: String,
    required: true
  },
  isFlipped: {
    type: Boolean,
    default: false
  },
  isMatched: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['card-click']);

const handleClick = () => {
  if (!props.isFlipped && !props.isMatched) {
    emit('card-click', props.cardId);
  }
};
</script>

<style scoped>
.flip-card {
  background-color: transparent;
  width: 190px;
  height: 254px;
  perspective: 1000px;
  font-family: 'Inter', sans-serif;
  cursor: pointer;
  margin: 10px;
  transition: transform 0.2s ease;
}

.flip-card:hover {
  transform: scale(1.02);
}

.flip-card.flipped .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  transform-style: preserve-3d;
}

.flip-card-front,
.flip-card-back {
  box-shadow: 0 8px 14px 0 rgba(0,0,0,0.2);
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  border-radius: 1rem;
  overflow: hidden;
}

.flip-card-front {
  background: linear-gradient(120deg, #ffffff 0%, #f5f5f5 100%);
  transform: rotateY(180deg);
}

.flip-card-front img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 1rem;
}

.flip-card-back {
  background: linear-gradient(120deg, #6366f1 0%, #8b5cf6 100%);
}

.card-back-content {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.card-pattern {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: 
    radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.1) 2%, transparent 0%),
    radial-gradient(circle at 75px 75px, rgba(255, 255, 255, 0.1) 2%, transparent 0%);
  background-size: 100px 100px;
}

.flip-card.matched {
  opacity: 0.7;
  cursor: default;
  transform: scale(0.95);
}

.flip-card.matched:hover {
  transform: scale(0.95);
}
</style> 