import { defineStore } from 'pinia'
import axios from 'axios'

export const useCategoriesStore = defineStore('categories', {
  state: () => ({
    users: [],
    loading: false,
    error: false
  }),
  actions: {
    async fetchUsers() {
      this.loading = true
      this.error = false
      try {
        const res = await axios.get('https://jsonplaceholder.typicode.com/users')
        this.users = res.data
      } catch (err) {
        this.error = true
      } finally {
        this.loading = false
      }
    }
  }
})
