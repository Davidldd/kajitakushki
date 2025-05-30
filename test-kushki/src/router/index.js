import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/kajita-de-pago',
    name: 'KajitaDePago',
    component: () => import('../views/KajitaDePago.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/prueba-api',
    name: 'PruebaApi',
    component: () => import('../views/PruebaApi.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/solucion-ejercicio',
    name: 'SolucionEjercicio',
    component: () => import('../views/SolucionEjercicio.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/bonus',
    name: 'Bonus',
    component: () => import('../views/Bonus.vue'),
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router