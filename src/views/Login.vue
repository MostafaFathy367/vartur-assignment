<template>
  <v-container class="h-screen d-flex justify-center align-center">
    <v-card class="pa-6 w-100 w-md-50">
      <v-card-title class="text-h5 text-center">Login</v-card-title>

      <v-card-text>
        <v-form @submit.prevent="handleLogin">
          <v-text-field
            v-model="username"
            label="Username"
            prepend-inner-icon="mdi-account"
            required
          />
          <v-text-field
            v-model="password"
            label="Password"
            type="password"
            prepend-inner-icon="mdi-lock"
            required
          />
          <v-alert v-if="error" type="error" class="my-2" density="compact">
            Invalid credentials. Please try again.
          </v-alert>

          <v-btn type="submit" color="primary" block class="mt-3">
            Login
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const username = ref("");
const password = ref("");
const error = ref(false);

const router = useRouter();
const auth = useAuthStore();

const handleLogin = () => {
  const success = auth.login(username.value, password.value);
  if (success) {
    error.value = false;
    router.push("/");
  } else {
    error.value = true;
  }
};
</script>
