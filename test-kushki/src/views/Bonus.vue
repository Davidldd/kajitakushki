<script setup>
import DashboardLayout from '../components/DashboardLayout.vue'
import { ref, onMounted } from 'vue'

const kushki = ref(null)
const loading = ref(false)
const error = ref(null)
const success = ref(null)
const transactionDetails = ref(null)

const form = ref({
  name: '',
  number: '',
  expiryMonth: '',
  expiryYear: '',
  cvv: '',
  amount: 1000000,
  currency: 'COP'
})

const initKushki = () => {
  kushki.value = new window.Kushki({
    merchantId: 'fb8f4568972b4cfda39f5502fa192c01',
    inTest: true
  })
}

onMounted(() => {
  // Cargar el script de Kushki para ambiente de pruebas
  const script = document.createElement('script')
  script.src = 'https://cdn-uat.kushkipagos.com/kushki.min.js'
  script.onload = initKushki
  document.head.appendChild(script)
})

const getCardToken = async () => {
  const card = {
    name: form.value.name,
    number: form.value.number,
    cvc: form.value.cvv,
    expiryMonth: form.value.expiryMonth,
    expiryYear: form.value.expiryYear
  }

  return new Promise((resolve, reject) => {
    kushki.value.requestToken({
      card,
      totalAmount: form.value.amount,
      currency: form.value.currency
    }, (response) => {
      if (!response.code) {
        resolve(response.token)
      } else {
        reject(new Error(response.message))
      }
    })
  })
}

const makeCharge = async (token) => {
  try {
    const response = await fetch('https://api-uat.kushkipagos.com/card/v1/charges', {
      method: 'POST',
      headers: {
        'Private-Merchant-Id': 'fb8f4568972b4cfda39f5502fa192c01',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token,
        amount: {
          subtotalIva: 0,
          subtotalIva0: form.value.amount,
          ice: 0,
          iva: 0,
          currency: form.value.currency
        },
        metadata: {
          paymentType: 'card'
        }
      })
    })

    return await response.json()
  } catch (err) {
    throw new Error('Error al procesar el pago')
  }
}

const handleSubmit = async () => {
  loading.value = true
  error.value = null
  success.value = null
  transactionDetails.value = null

  try {
    const token = await getCardToken()
    const charge = await makeCharge(token)

    if (charge.ticketNumber) {
      success.value = 'Transacción aprobada'
      transactionDetails.value = charge
    } else {
      error.value = charge.message || 'Transacción rechazada'
    }
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP'
  }).format(amount)
}
</script>

<template>
  <DashboardLayout>
    <div class="py-6">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-2xl font-semibold text-gray-900">
          Formulario de Pago
        </h1>
        <p class="mt-1 text-sm text-gray-600">
          Realiza un pago de prueba con tarjeta de crédito
        </p>
      </div>

      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div class="bg-white shadow rounded-lg overflow-hidden">
          <div class="px-4 py-5 sm:p-6">
            <!-- Alertas -->
            <div v-if="error" class="mb-4 rounded-md bg-red-50 p-4">
              <div class="flex">
                <div class="flex-shrink-0">
                  <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div class="ml-3">
                  <h3 class="text-sm font-medium text-red-800">{{ error }}</h3>
                </div>
              </div>
            </div>

            <div v-if="success" class="mb-4 rounded-md bg-green-50 p-4">
              <div class="flex">
                <div class="flex-shrink-0">
                  <svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div class="ml-3">
                  <h3 class="text-sm font-medium text-green-800">{{ success }}</h3>
                </div>
              </div>
            </div>

            <!-- Formulario -->
            <form @submit.prevent="handleSubmit" class="space-y-6">
              <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                <div class="sm:col-span-2">
                  <label for="name" class="block text-sm font-medium text-gray-700">
                    Nombre del titular
                  </label>
                  <div class="mt-1">
                    <input
                      type="text"
                      id="name"
                      v-model="form.name"
                      required
                      class="input-field"
                      placeholder="Como aparece en la tarjeta"
                    >
                  </div>
                </div>

                <div class="sm:col-span-2">
                  <label for="number" class="block text-sm font-medium text-gray-700">
                    Número de tarjeta
                  </label>
                  <div class="mt-1">
                    <input
                      type="text"
                      id="number"
                      v-model="form.number"
                      required
                      class="input-field"
                      placeholder="4242 4242 4242 4242"
                    >
                  </div>
                </div>

                <div>
                  <label for="expiry-month" class="block text-sm font-medium text-gray-700">
                    Mes de expiración
                  </label>
                  <div class="mt-1">
                    <input
                      type="text"
                      id="expiry-month"
                      v-model="form.expiryMonth"
                      required
                      maxlength="2"
                      class="input-field"
                      placeholder="MM"
                    >
                  </div>
                </div>

                <div>
                  <label for="expiry-year" class="block text-sm font-medium text-gray-700">
                    Año de expiración
                  </label>
                  <div class="mt-1">
                    <input
                      type="text"
                      id="expiry-year"
                      v-model="form.expiryYear"
                      required
                      maxlength="2"
                      class="input-field"
                      placeholder="YY"
                    >
                  </div>
                </div>

                <div>
                  <label for="cvv" class="block text-sm font-medium text-gray-700">
                    CVV
                  </label>
                  <div class="mt-1">
                    <input
                      type="text"
                      id="cvv"
                      v-model="form.cvv"
                      required
                      maxlength="4"
                      class="input-field"
                      placeholder="123"
                    >
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700">
                    Monto a pagar
                  </label>
                  <div class="mt-1">
                    <div class="input-field bg-gray-50 flex items-center justify-between px-3 py-2">
                      <span class="text-gray-900">{{ formatCurrency(form.amount) }}</span>
                      <span class="text-gray-500">{{ form.currency }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="flex items-center justify-end">
                <button
                  type="submit"
                  class="btn-primary px-4 py-2 rounded-md text-sm font-medium"
                  :disabled="loading"
                >
                  <template v-if="loading">
                    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Procesando...
                  </template>
                  <template v-else>
                    Pagar ahora
                  </template>
                </button>
              </div>
            </form>

            <!-- Detalles de la transacción -->
            <div v-if="transactionDetails" class="mt-8 border-t border-gray-200 pt-6">
              <h3 class="text-lg font-medium text-gray-900">Detalles de la transacción</h3>
              <dl class="mt-4 space-y-4">
                <div class="grid grid-cols-3 gap-4">
                  <dt class="text-sm font-medium text-gray-500">Ticket</dt>
                  <dd class="text-sm text-gray-900 col-span-2">{{ transactionDetails.ticketNumber }}</dd>
                </div>
                <div class="grid grid-cols-3 gap-4">
                  <dt class="text-sm font-medium text-gray-500">Referencia</dt>
                  <dd class="text-sm text-gray-900 col-span-2">{{ transactionDetails.transactionReference }}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<style scoped>
.input-field {
  @apply block w-full rounded-md border-gray-300 shadow-sm focus:border-kushki-blue focus:ring-kushki-blue sm:text-sm;
}

.btn-primary {
  @apply bg-kushki-blue border border-transparent text-white shadow-sm hover:bg-kushki-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-kushki-blue;
}

.btn-primary:disabled {
  @apply opacity-50 cursor-not-allowed;
}
</style>