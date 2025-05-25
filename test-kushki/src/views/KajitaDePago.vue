<script setup>
import { ref, onMounted } from 'vue'
import DashboardLayout from '../components/DashboardLayout.vue'

const orderDetails = {
  product: 'Computador Dell XPS 13',
  description: 'Laptop ultradelgada con pantalla InfinityEdge de 13.4"',
  specs: [
    '11th Gen Intel Core i7',
    '16GB RAM',
    '512GB SSD',
    'Windows 11 Pro'
  ],
  amount: 2000000,
  tax: 380000,
  total: 2380000
}

const paymentStatus = ref({
  loading: false,
  success: false,
  error: null
})

onMounted(() => {
  const kushki = new window.KushkiCheckout({
    kformId: "t0cR6t3uC",
    form: "kushki-payment-form",
    publicMerchantId: "8cd43de7a8654511b20f5e8c36b88a72",
    inTestEnvironment: true,
    amount: {
      subtotalIva: orderDetails.amount,
      iva: orderDetails.tax,
      subtotalIva0: 0,
    },
    currency: "COP",
    regional: false,
    onPaymentCompleted: (response) => {
      if (response.code === "000") {
        handlePaymentSuccess(response.token);
      } else {
        handlePaymentError(response.message);
      }
    }
  });
});

const handlePaymentSuccess = async (token) => {
  paymentStatus.value.loading = true;
  try {
    const response = await fetch('/api/process-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token,
        amount: orderDetails.total
      })
    });
    
    const data = await response.json();
    if (data.success) {
      paymentStatus.value.success = true;
      paymentStatus.value.error = null;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    handlePaymentError(error.message);
  } finally {
    paymentStatus.value.loading = false;
  }
};

const handlePaymentError = (message) => {
  paymentStatus.value.success = false;
  paymentStatus.value.error = message;
  paymentStatus.value.loading = false;
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}
</script>

<template>
  <DashboardLayout>
    <div class="flex-1 min-h-screen bg-gray-100">
      <!-- Contenedor principal con márgenes responsivos -->
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Columna izquierda: Resumen del pedido -->
          <div class="space-y-6">
            <!-- Header -->
            <div>
              <h1 class="text-2xl sm:text-3xl font-bold text-gray-900">Pasarela de Pago Kushki</h1>
              <p class="mt-2 text-gray-600">Complete los detalles del pago para procesar su orden</p>
            </div>

            <!-- Resumen del Pedido -->
            <div class="bg-white rounded-xl shadow-sm p-6">
              <h2 class="text-xl font-semibold text-gray-800 mb-4">Resumen del Pedido</h2>
              
              <!-- Detalles del producto -->
              <div class="space-y-6">
                <div class="flex items-start">
                  <div class="flex-1">
                    <h3 class="font-medium text-gray-900">{{ orderDetails.product }}</h3>
                    <p class="text-sm text-gray-500">{{ orderDetails.description }}</p>
                    <ul class="mt-2 space-y-1">
                      <li v-for="spec in orderDetails.specs" :key="spec" class="text-sm text-gray-600 flex items-center">
                        <svg class="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                        {{ spec }}
                      </li>
                    </ul>
                  </div>
                  <span class="font-medium text-gray-900">{{ formatCurrency(orderDetails.amount) }}</span>
                </div>

                <!-- Línea divisoria -->
                <div class="border-t border-gray-200"></div>

                <!-- Subtotal -->
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">Subtotal</span>
                  <span class="font-medium">{{ formatCurrency(orderDetails.amount) }}</span>
                </div>

                <!-- Impuestos -->
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">IVA (19%)</span>
                  <span class="font-medium">{{ formatCurrency(orderDetails.tax) }}</span>
                </div>

                <!-- Total -->
                <div class="border-t border-gray-200 pt-4 flex justify-between items-center">
                  <span class="text-lg font-semibold text-gray-900">Total a pagar</span>
                  <span class="text-xl font-bold text-kushki-blue">{{ formatCurrency(orderDetails.total) }}</span>
                </div>
              </div>
            </div>

            <!-- Información de Seguridad -->
            <div class="bg-blue-50 rounded-xl p-6 border border-blue-100">
              <h3 class="font-semibold text-blue-900 mb-3">Información de Seguridad</h3>
              <div class="space-y-3 text-sm text-blue-800">
                <div class="flex items-start">
                  <svg class="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <p>Todas las transacciones son procesadas de forma segura por Kushki</p>
                </div>
                <div class="flex items-start">
                  <svg class="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <p>Sus datos están protegidos con encriptación de grado bancario</p>
                </div>
                <div class="flex items-start">
                  <svg class="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                  </svg>
                  <p>No almacenamos información sensible de tarjetas</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Columna derecha: Formulario de pago -->
          <div class="lg:sticky lg:top-24">
            <div class="bg-white rounded-xl shadow-sm p-6">
              <h2 class="text-xl font-semibold text-gray-800 mb-6">Información de Pago</h2>
              
              <!-- Alertas de estado -->
              <div v-if="paymentStatus.error" class="alert alert-error mb-6">
                <div class="flex items-center">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{{ paymentStatus.error }}</span>
                </div>
              </div>

              <div v-if="paymentStatus.success" class="alert alert-success mb-6">
                <div class="flex items-center">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>¡Pago procesado exitosamente!</span>
                </div>
              </div>

              <!-- Formulario de Kushki -->
              <form id="kushki-payment-form" class="space-y-4">
                <div v-if="paymentStatus.loading" class="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center">
                  <div class="animate-spin rounded-full h-12 w-12 border-4 border-kushki-blue border-t-transparent"></div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<style scoped>
/* Estilos adicionales para mejorar la responsividad */
@import url('../assets/styles/variables.css');
@media (max-width: 640px) {
  .grid {
    gap: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .lg\:sticky {
    position: sticky;
    align-self: start;
  }
}

/* Animaciones */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
