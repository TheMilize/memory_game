import { ref, watch } from 'vue';

const theme = ref(localStorage.getItem('theme') || 'light');

watch(theme, (newTheme) => {
  localStorage.setItem('theme', newTheme);
  document.documentElement.setAttribute('data-theme', newTheme);
});

export const useTheme = () => {
  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light';
  };

  return {
    theme,
    toggleTheme
  };
}; 