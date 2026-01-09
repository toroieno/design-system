import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

// Component routes
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/docs/button'
  },
  {
    path: '/docs',
    redirect: '/docs/button'
  },
  {
    path: '/docs/:component',
    name: 'docs',
    component: () => import('@/pages/DocsPage.vue'),
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
