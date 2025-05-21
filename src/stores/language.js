// stores/language.js
import { defineStore } from 'pinia'

export const useLanguageStore = defineStore('language', {
  state: () => ({
    currentLanguage: localStorage.getItem('userLanguage') || 'zh'
  }),
  actions: {
    setLanguage(lang) {
      this.currentLanguage = lang
      localStorage.setItem('userLanguage', lang)
    }
  }
})