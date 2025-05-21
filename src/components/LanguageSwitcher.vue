<template>
    <button @click="toggleLanguage" class="language-switcher">
        <img class="w-5"  src="../assets/earth.svg" />
      {{ currentLanguage === 'zh' ? 'EN' : 'CN' }}
    </button>
  </template>
  
  <script setup>
  import { useI18n } from 'vue-i18n'
  import { computed } from 'vue'
  
  const { locale } = useI18n()
  
  const currentLanguage = computed(() => locale.value)
  
  const toggleLanguage = () => {
    const newLocale = currentLanguage.value === 'zh' ? 'en' : 'zh'
    locale.value = newLocale
    localStorage.setItem('userLanguage', newLocale)
  }
  </script>
  
  <style scoped>
  .language-switcher {
    padding: 5px 10px;
    cursor: pointer;
    margin-left: 15px;
    transition: all 0.3s ease;
    font-size: 10px;
  }
  
  .language-switcher:hover {
    background: #e9e9e9;
    transform: scale(1.05);
  }
  </style>