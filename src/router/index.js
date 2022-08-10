import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/rates',
    name: 'rates',
    component: () => import('../views/RateView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
