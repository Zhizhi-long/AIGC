<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'

const { locale } = useI18n()

onMounted(() => {
  // 从localStorage读取用户保存的语言
  const savedLang = localStorage.getItem('userLanguage')
  console.log('🌶️',savedLang)
  if (savedLang) {
    locale.value = savedLang
    return
  }
})
</script>

<template>
  <RouterView />
</template>

<style scoped>
  body { font-family: 'Inter', sans-serif; background-color: '#E3E3E3'; }
</style>
