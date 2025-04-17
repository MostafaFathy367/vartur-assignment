import { defineStore } from 'pinia'
import axios from 'axios'

export const useProductsStore = defineStore('product', {
  state: () => ({
    posts: [],
    loading: false,
    error: false
  }),
  actions: {
    async fetchPosts() {
      this.loading = true
      this.error = false
      try {
        const res = await axios.get('https://jsonplaceholder.typicode.com/posts')
        this.posts = res.data
      } catch (err) {
        this.error = true
      } finally {
        this.loading = false
      }
    }
  }
})
