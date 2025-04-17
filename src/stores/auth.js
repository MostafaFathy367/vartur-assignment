import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: sessionStorage.getItem('isAuthenticated') === 'true'
  }),
  actions: {
    login(username, password) {
      if (username === 'admin' && password === 'admin') {
        this.isAuthenticated = true
        sessionStorage.setItem('isAuthenticated', 'true')
        return true
      } else {
        return false
      }
    },
    logout() {
      this.isAuthenticated = false
      sessionStorage.removeItem('isAuthenticated')
    }
  }
})
