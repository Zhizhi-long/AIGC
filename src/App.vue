<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import NavbarElement from '@/components/NavbarElement.vue'

const { locale } = useI18n()

onMounted(() => {
  // 从localStorage读取用户保存的语言
  const savedLang = localStorage.getItem('userLanguage')
  console.log('🌶️',savedLang)
  if (savedLang) {
    locale.value = savedLang
    return
  }
  
  // 自动检测浏览器语言
  const browserLang = navigator.language || navigator.userLanguage
  if (browserLang.startsWith('zh')) {
    locale.value = 'zh'
  } else {
    locale.value = 'en'
  }
  console.log(locale.value)
})
</script>

<template>
  <RouterView />
</template>

<style scoped>
  body { font-family: 'Inter', sans-serif; background-color: '#E3E3E3'; }
</style>
