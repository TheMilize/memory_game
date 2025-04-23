import { ref, watch } from 'vue';
import ru from './locales/ru';
import en from './locales/en';

const translations = {
  ru,
  en
};

const language = ref(localStorage.getItem('language') || 'ru');

watch(language, (newLang) => {
  localStorage.setItem('language', newLang);
});

export const useI18n = () => {
  const t = (key) => translations[language.value][key] || key;
  
  const toggleLanguage = () => {
    language.value = language.value === 'ru' ? 'en' : 'ru';
  };

  return {
    language,
    t,
    toggleLanguage
  };
}; 