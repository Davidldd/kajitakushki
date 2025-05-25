<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import DashboardLayout from '../components/DashboardLayout.vue'

const router = useRouter()
const authStore = useAuthStore()

const stats = ref([
  {
    name: 'Transacciones Totales',
    value: '2,651',
    change: '+12.5%',
    changeType: 'increase'
  },
  {
    name: 'Monto Total',
    value: '$45,678.00',
    change: '+8.2%',
    changeType: 'increase'
  },
  {
    name: 'Tasa de Aprobación',
    value: '98.5%',
    change: '+2.1%',
    changeType: 'increase'
  },
  {
    name: 'Transacciones Rechazadas',
    value: '23',
    change: '-5.4%',
    changeType: 'decrease'
  }
])

const recentTransactions = ref([
  {
    id: 1,
    date: '2024-03-15',
    amount: '$1,200.00',
    status: 'success',
    description: 'Pago de computadora'
  },
  {
    id: 2,
    date: '2024-03-14',
    amount: '$850.00',
    status: 'success',
    description: 'Compra de celular'
  },
  {
    id: 3,
    date: '2024-03-14',
    amount: '$350.00',
    status: 'pending',
    description: 'Accesorios electrónicos'
  },
  {
    id: 4,
    date: '2024-03-13',
    amount: '$75.00',
    status: 'failed',
    description: 'Suscripción mensual'
  }
])

const menuOptions = [
  {
    id: 'kajita-de-pago',
    title: 'Kajita de Pago',
    icon: 'mdi-cash-register',
    path: '/kajita-de-pago',
    description: 'Gestione sus pagos y transacciones'
  },
  {
    id: 'prueba-api',
    title: 'Prueba de API',
    icon: 'mdi-api',
    path: '/prueba-api',
    description: 'Realice pruebas con nuestra API'
  },
  {
    id: 'solucion-ejercicio',
    title: 'Solución de Ejercicio',
    icon: 'mdi-puzzle',
    path: '/solucion-ejercicio',
    description: 'Resuelva ejercicios interactivos'
  },
  {
    id: 'bonus',
    title: 'Bonus',
    icon: 'mdi-gift',
    path: '/bonus',
    description: 'Descubra contenido adicional exclusivo'
  }
]

const navigateTo = (path) => {
  router.push(path)
}
</script>

<template>
  <DashboardLayout>
    <div class="py-6">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-2xl font-semibold text-gray-900">
          Bienvenido, {{ authStore.currentUser?.name }}
        </h1>
        <p class="mt-1 text-sm text-gray-600">
          Aquí tienes un resumen de tu actividad reciente
        </p>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Stats -->
        <div class="mt-8">
          <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div v-for="item in stats" :key="item.name" class="bg-white overflow-hidden shadow rounded-lg">
              <div class="px-4 py-5 sm:p-6">
                <dt class="text-sm font-medium text-gray-500 truncate">
                  {{ item.name }}
                </dt>
                <dd class="mt-1 text-3xl font-semibold text-gray-900">
                  {{ item.value }}
                </dd>
                <div class="mt-4">
                  <div class="flex items-center">
                    <div :class="[
                      item.changeType === 'increase' ? 'text-green-600' : 'text-red-600',
                      'flex items-center text-sm font-medium'
                    ]">
                      <svg v-if="item.changeType === 'increase'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                      <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6" />
                      </svg>
                      <span class="ml-1">{{ item.change }}</span>
                    </div>
                    <span class="ml-2 text-sm text-gray-500">vs mes anterior</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Transacciones Recientes -->
        <div class="mt-8">
          <div class="bg-white shadow rounded-lg">
            <div class="px-4 py-5 border-b border-gray-200 sm:px-6">
              <h3 class="text-lg leading-6 font-medium text-gray-900">
                Transacciones Recientes
              </h3>
            </div>
            <div class="bg-white">
              <ul role="list" class="divide-y divide-gray-200">
                <li v-for="transaction in recentTransactions" :key="transaction.id" class="px-4 py-4 sm:px-6">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center">
                      <div :class="[
                        transaction.status === 'success' ? 'bg-green-100 text-green-800' : 
                        transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800',
                        'flex-shrink-0 w-2.5 h-2.5 rounded-full mr-4'
                      ]"></div>
                      <div>
                        <p class="text-sm font-medium text-gray-900">
                          {{ transaction.description }}
                        </p>
                        <p class="text-sm text-gray-500">
                          {{ transaction.date }}
                        </p>
                      </div>
                    </div>
                    <div class="ml-6 flex items-center">
                      <p class="text-sm font-medium text-gray-900">
                        {{ transaction.amount }}
                      </p>
                      <svg class="ml-2 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<style scoped>
.dashboard-stats {
  @apply grid gap-6 mb-8;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}

.stat-card {
  @apply bg-white rounded-lg shadow p-6;
}

.stat-value {
  @apply text-3xl font-bold text-gray-900;
}

.stat-label {
  @apply text-sm text-gray-500;
}

.transactions-list {
  @apply space-y-4;
}

.transaction-item {
  @apply flex items-center justify-between p-4 bg-white rounded-lg shadow;
}
</style>