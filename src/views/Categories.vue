<template>
  <MainLayout>
    <h2 class="mb-4">Categories (Users)</h2>

    <template v-if="mdAndDown">
      <v-row>
        <v-col v-for="user in users" :key="user.id" cols="12" sm="6">
          <v-card>
            <v-card-title>{{ user.name }}</v-card-title>
            <v-card-text>
              <div><strong>Username:</strong> {{ user.username }}</div>
              <div><strong>Email:</strong> {{ user.email }}</div>
              <div><strong>City:</strong> {{ user.address.city }}</div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </template>

    <template v-else>
      <v-data-table
        :headers="headers"
        :items="users"
        :loading="loading"
        loading-text="Loading users..."
        class="elevation-1"
      />
    </template>

    <v-alert v-if="error" type="error" class="mt-4">
      Failed to fetch users. Please try again.
    </v-alert>
  </MainLayout>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useCategoriesStore } from '@/stores/categories'
import MainLayout from '@/layouts/MainLayout.vue'
import { useDisplay } from 'vuetify'

const { mdAndDown } = useDisplay()
const categoriesStore = useCategoriesStore()


const handleFetchUsers = () => {
 categoriesStore.fetchUsers()
}

onMounted(() => {
  if (users.value.length === 0) {
    handleFetchUsers()
    
  }
})

const headers = [
  { title: 'ID', value: 'id' },
  { title: 'Name', value: 'name' },
  { title: 'Username', value: 'username' },
  { title: 'Email', value: 'email' },
  { title: 'City', value: 'address.city' }
]
const users = computed(() => categoriesStore.users)
const loading = computed(() => categoriesStore.loading)
const error = computed(() => categoriesStore.error)
</script>
