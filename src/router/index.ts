import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      // @ts-ignore
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/architectural-render-n',
      name: 'architectural-render-n',
      // @ts-ignore
      component: () => import('../views/ArchitecturalRender-new.vue')
    },
    {
      path: '/architectural-render',
      name: 'architectural-render',
      // @ts-ignore
      component: () => import('../views/ArchitecturalRender.vue')
    }
  ],
})

export default router
