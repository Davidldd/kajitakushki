<script setup>
import DashboardLayout from '../components/DashboardLayout.vue'
import { ref } from 'vue'

const sections = ref([
  {
    id: 'caso1',
    title: 'Caso 1: Error Crítico con Solución Pendiente',
    type: 'case',
    actions: [
      'Comunicar lo más claro posible el problema raiz y el tiempo estimado de la solución.',
      'Ofrecer una solución temporal siempre y cuando aplique con algún procesamiento manual o método alternativo.',
      'Brindar actualizaciones diarias y priorización de solución de casos respecto a este evento.',
      'Documentar todo en el sistema de tickets para feedback interno.'
    ],
    status: 'warning'
  },
  {
    id: 'caso2',
    title: 'Caso 2: Error por Tercero',
    type: 'case',
    actions: [
      'Identificar al responsable mediante logs y códigos de error.',
      'Contactar al tercero para escalar el incidente.',
      'Informar al comercio sobre la causa y acciones en curso.',
      'Proporcionar un canal directo para updates.'
    ],
    status: 'info'
  }
])

const feedback = ref([
  {
    id: 'onboarding',
    title: 'Onboarding',
    description: 'Guía interactiva paso a paso en la consola UAT.',
    icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />`
  },
  {
    id: 'documentacion',
    title: 'Documentación Técnica',
    description: 'Añadir ejemplos en múltiples lenguajes.',
    icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />`
  },
  {
    id: 'tokenizacion',
    title: 'Tokenización',
    description: 'Reemplazo de datos sensibles por tokens; evita exposición en backend. Cumple con PCI DSS y reduce riesgo de fraude.',
    icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />`
  },
  {
    id: 'webhook',
    title: 'Webhook',
    description: 'Endpoint que recibe notificaciones automáticas.',
    icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />`
  }
])
</script>

<template>
  <DashboardLayout>
    <div class="py-6">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-2xl font-semibold text-gray-900">
          Manejo de Situaciones con Comercios
        </h1>
        <p class="mt-1 text-sm text-gray-600">
          Guía de resolución de casos y mejores prácticas
        </p>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <!-- Casos -->
        <div class="grid gap-6 mb-8">
          <div v-for="section in sections" :key="section.id" class="bg-white shadow rounded-lg overflow-hidden">
            <div class="px-4 py-5 sm:p-6">
              <div class="flex items-start">
                <div class="flex-shrink-0">
                  <span 
                    :class="[
                      'inline-flex items-center justify-center h-10 w-10 rounded-full',
                      section.status === 'warning' ? 'bg-yellow-100 text-yellow-600' : 'bg-blue-100 text-blue-600'
                    ]"
                  >
                    <svg v-if="section.status === 'warning'" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <svg v-else class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                </div>
                <div class="ml-4 flex-1">
                  <h3 class="text-lg font-medium text-gray-900">
                    {{ section.title }}
                  </h3>
                  <div class="mt-4">
                    <ul class="space-y-3">
                      <li v-for="(action, index) in section.actions" :key="index" class="flex items-start">
                        <svg class="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span class="text-gray-600">{{ action }}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Feedback Adicional -->
        <div class="bg-white shadow rounded-lg overflow-hidden">
          <div class="px-4 py-5 border-b border-gray-200 sm:px-6">
            <h2 class="text-lg font-medium text-gray-900">Feedback Adicional</h2>
            <p class="mt-1 text-sm text-gray-600">
              Mejoras y características importantes
            </p>
          </div>
          <div class="px-4 py-5 sm:p-6">
            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div v-for="item in feedback" :key="item.id" class="relative rounded-lg border border-gray-200 bg-white px-6 py-5 shadow-sm flex items-start space-x-3 hover:border-kushki-blue focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-kushki-blue">
                <div class="flex-shrink-0">
                  <span class="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-kushki-blue bg-opacity-10">
                    <svg class="h-6 w-6 text-kushki-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" v-html="item.icon"></svg>
                  </span>
                </div>
                <div class="flex-1 min-w-0">
                  <div class="focus:outline-none">
                    <p class="text-sm font-medium text-gray-900">{{ item.title }}</p>
                    <p class="text-sm text-gray-500 mt-1">{{ item.description }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<style scoped>
.case-card {
  @apply bg-white rounded-lg shadow-sm p-6 border border-gray-200;
}

.case-card.warning {
  @apply border-yellow-200 bg-yellow-50;
}

.case-card.info {
  @apply border-blue-200 bg-blue-50;
}

.action-list {
  @apply mt-4 space-y-3;
}

.action-item {
  @apply flex items-start text-gray-600;
}

.feedback-grid {
  @apply grid gap-6;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}


</style>