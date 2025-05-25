<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const isMobileMenuOpen = ref(false)
const isSidebarOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const logout = () => {
  authStore.logout()
  router.push('/login')
}

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const menuItems = [
  { 
    name: 'Dashboard', 
    path: '/dashboard',
    icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />`
  },
  { 
    name: 'Kajita de Pago', 
    path: '/kajita-de-pago',
    icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />`
  },
  { 
    name: 'Prueba API', 
    path: '/prueba-api',
    icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />`
  },
  { 
    name: 'Solución Ejercicio', 
    path: '/solucion-ejercicio',
    icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />`
  },
  { 
    name: 'Bonus', 
    path: '/bonus',
    icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />`
  }
]
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Barra de navegación superior -->
    <nav class="bg-white shadow-sm fixed w-full z-30">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <!-- Logo y botón de menú -->
          <div class="flex items-center">
            <button 
              @click="toggleSidebar"
              class="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-kushki-blue"
            >
              <span class="sr-only">Abrir menú</span>
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div class="flex-shrink-0 flex items-center ml-4">
              <img class="h-8 w-auto" src="https://kushkipagos.com/wp-content/themes/kushki/assets/img/logo.svg" alt="Kushki">
            </div>
          </div>

          <!-- Navegación derecha -->
          <div class="flex items-center space-x-4">
            <span class="text-sm font-medium text-gray-500">{{ authStore.currentUser?.name }}</span>
            <div class="h-6 w-px bg-gray-200"></div>
            <button 
              @click="logout"
              class="text-sm text-gray-500 hover:text-gray-700 font-medium flex items-center"
            >
              <svg class="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Contenedor principal -->
    <div class="pt-16 flex">
      <!-- Barra lateral -->
      <aside 
        :class="[
          'lg:block lg:w-64 lg:fixed lg:inset-y-0 lg:pt-16 bg-white shadow-sm transform transition-transform duration-300 ease-in-out',
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        ]"
        class="fixed inset-y-0 left-0 z-20 w-64 pt-16"
      >
        <div class="h-full overflow-y-auto">
          <nav class="px-3 mt-6">
            <div class="space-y-1">
              <router-link
                v-for="item in menuItems"
                :key="item.path"
                :to="item.path"
                class="nav-link"
                :class="{ 'active': $route.path === item.path }"
              >
                <svg class="mr-3 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" v-html="item.icon"></svg>
                {{ item.name }}
              </router-link>
            </div>
          </nav>

          <!-- Footer de la barra lateral -->
          <div class="absolute bottom-0 w-full p-4 border-t border-gray-200">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-kushki-blue rounded-full flex items-center justify-center text-white font-medium">
                K
              </div>
              <div class="flex-1">
                <p class="text-sm font-medium text-gray-900">Kushki Test</p>
                <p class="text-xs text-gray-500">v1.0.0</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <!-- Contenido principal -->
      <main class="flex-1 lg:pl-64">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <slot></slot>
        </div>
      </main>

      <!-- Overlay para cerrar el menú en móvil -->
      <div 
        v-if="isSidebarOpen" 
        @click="toggleSidebar"
        class="fixed inset-0 z-10 bg-black bg-opacity-50 lg:hidden"
      ></div>
    </div>
  </div>
</template>

<style scoped>
.nav-link {
  @apply flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200;
  color: var(--color-text-secondary);
}

.nav-link:hover {
  @apply bg-gray-50;
  color: var(--kushki-blue);
}

.nav-link.active {
  @apply bg-blue-50;
  color: var(--kushki-blue);
}

.nav-link.active svg {
  color: var(--kushki-blue);
}

/* Transiciones suaves */
.transform {
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}
</style>