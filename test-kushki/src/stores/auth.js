import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    currentUser: (state) => state.user
  },

  actions: {
    async login(credentials) {
      try {
        // Simulación de llamada a API
        if (credentials.email === 'demo@kushki.com' && credentials.password === 'demo123') {
          const token = 'demo-token-' + Math.random().toString(36).substring(7)
          const user = {
            id: 1,
            name: 'Usuario Demo',
            email: credentials.email,
            role: 'admin'
          }
          
          this.token = token
          this.user = user
          localStorage.setItem('token', token)
          
          return { success: true }
        } else {
          throw new Error('Credenciales inválidas')
        }
      } catch (error) {
        return {
          success: false,
          error: error.message
        }
      }
    },

    logout() {
      this.token = null
      this.user = null
      localStorage.removeItem('token')
    },

    async checkAuth() {
      const token = localStorage.getItem('token')
      if (token) {
        // Aquí podrías validar el token con el backend
        this.token = token
        this.user = {
          id: 1,
          name: 'Usuario Demo',
          email: 'demo@kushki.com',
          role: 'admin'
        }
        return true
      }
      return false
    }
  }
})