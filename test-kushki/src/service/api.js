import axios from 'axios'

// Base configuration for axios
// In a real application, you would set this to your API URL
const api = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// For testing purposes, we'll simulate API calls
export async function loginUser(username, password) {
  // This would be a real API call in production
  // return api.post('/auth/login', { username, password })
  
  // For now, we'll simulate a successful login with test credentials
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Test user credentials for demonstration
      if (username === 'test' && password === 'password') {
        resolve({
          id: 1,
          username: 'test',
          name: 'Test User',
          email: 'test@example.com',
          token: 'fake-jwt-token'
        })
      } else {
        reject(new Error('Usuario o contraseña incorrectos'))
      }
    }, 1000) // Simulate network delay
  })
}

// Add other API functions as needed
export default api