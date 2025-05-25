<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const credentials = ref({
  email: '',
  password: ''
})

const error = ref(null)
const loading = ref(false)

const handleSubmit = async () => {
  loading.value = true
  error.value = null
  
  try {
    const result = await authStore.login(credentials.value)
    if (result.success) {
      router.push('/dashboard')
    } else {
      error.value = result.error
    }
  } catch (err) {
    error.value = 'Error durante el inicio de sesión'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img class="mx-auto h-12 w-auto" src="https://kushkipagos.com/wp-content/themes/kushki/assets/img/logo.svg" alt="Kushki">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Iniciar Sesión
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Accede a la plataforma de pruebas de Kushki
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" @submit.prevent="handleSubmit">
          <!-- Alerta de error -->
          <div v-if="error" class="alert alert-error">
            <div class="flex items-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{{ error }}</span>
            </div>
          </div>

          <div>
            <label for="email" class="form-label">
              Correo electrónico
            </label>
            <div class="mt-1">
              <input
                id="email"
                v-model="credentials.email"
                type="email"
                required
                class="input-field"
                placeholder="demo@kushki.com"
              >
            </div>
          </div>

          <div>
            <label for="password" class="form-label">
              Contraseña
            </label>
            <div class="mt-1">
              <input
                id="password"
                v-model="credentials.password"
                type="password"
                required
                class="input-field"
                placeholder="••••••••"
              >
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember_me"
                type="checkbox"
                class="h-4 w-4 text-kushki-blue focus:ring-kushki-blue border-gray-300 rounded"
              >
              <label for="remember_me" class="ml-2 block text-sm text-gray-900">
                Recordarme
              </label>
            </div>

            <div class="text-sm">
              <a href="#" class="font-medium text-kushki-blue hover:text-blue-500">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-kushki-blue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-kushki-blue"
              :disabled="loading"
            >
              <template v-if="loading">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Iniciando sesión...
              </template>
              <template v-else>
                Iniciar sesión
              </template>
            </button>
          </div>
        </form>

        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500">
                Credenciales de prueba
              </span>
            </div>
          </div>

          <div class="mt-6 text-sm text-center text-gray-500">
            <p>Email: demo@kushki.com</p>
            <p>Contraseña: demo123</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: var(--bg-light);
  padding: 1rem;
}

.login-card {
  width: 100%;
  max-width: 450px;
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  overflow: hidden;
  animation: fadeIn 0.5s ease;
}

.login-header {
  padding: 2rem;
  text-align: center;
  background-color: var(--bg-color);
  border-bottom: 1px solid rgba(0,0,0,0.05);
}

.logo {
  width: 80px;
  height: 80px;
  margin-bottom: 1rem;
}

.login-form {
  padding: 2rem;
}

.login-button {
  width: 100%;
  padding: 0.8rem;
  font-size: 1.1rem;
  margin-top: 0.5rem;
}

.login-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.login-help {
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
  font-size: 0.9rem;
  color: var(--text-light);
}

.alert {
  padding: 0.8rem;
  margin-bottom: 1rem;
  border-radius: var(--border-radius);
  font-weight: 500;
}

.alert.error {
  background-color: rgba(244, 67, 54, 0.1);
  color: var(--error-color);
  border: 1px solid rgba(244, 67, 54, 0.2);
}

input.error {
  border-color: var(--error-color);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 480px) {
  .login-header {
    padding: 1.5rem;
  }
  
  .login-form {
    padding: 1.5rem;
  }
  
  .logo {
    width: 60px;
    height: 60px;
  }
}
</style>