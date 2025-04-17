<template>
  <MainLayout>
    <h2 class="mb-4">Products (Posts)</h2>

    <template v-if="mdAndDown">
      <v-row>
        <v-col
          v-for="post in posts"
          :key="post.id"
          cols="12"
          sm="6"
        >
          <v-card>
            <v-card-title class="text-wrap">
              {{ post.title }}
            </v-card-title>
            <v-card-text>
              {{ post.body }}
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </template>

    <template v-else>
      <v-data-table
        :headers="headers"
        :items="posts"
        :loading="loading"
        loading-text="Loading posts..."
        class="elevation-1"
        items-per-page="10"
      />
    </template>

    <v-alert v-if="error" type="error" class="mt-4">
      Failed to fetch posts. Please try again.
    </v-alert>
  </MainLayout>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useProductsStore } from '@/stores/products'
import MainLayout from '@/layouts/MainLayout.vue'
import { useDisplay } from 'vuetify'

const { mdAndDown } = useDisplay()
const productsStore = useProductsStore()

const headers = [
  { title: 'ID', value: 'id' },
  { title: 'Title', value: 'title' },
  { title: 'Body', value: 'body' }
]

const handleFetchPosts = () => {
  productsStore.fetchPosts()
}

onMounted(async () => {
  if (posts.value.length === 0) {
    handleFetchPosts()
    
  }
})

const posts = computed(() => productsStore.posts)
const loading = computed(() => productsStore.loading)
const error = computed(() => productsStore.error)
</script>
