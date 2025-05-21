import './index.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n' // 引入vue-i18n
import App from './App.vue'
import router from './router'

// 1. 准备语言翻译信息
const messages = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      products: 'Products',
      contact: 'Contact'
    }
  },
  zh: {
    nav: {
      home: '首页',
      about: '关于我们',
      products: '产品',
      contact: '联系我们'
    }
  }
}

// 2. 创建i18n实例
const i18n = createI18n({
  legacy: false, // 使用Composition API风格
  locale: 'zh', // 默认语言
  fallbackLocale: 'en', // 备用语言
  messages
})

const app = createApp(App)

// 3. 使用插件
app.use(createPinia())
app.use(router)
app.use(i18n) // 使用i18n插件

app.mount('#app')