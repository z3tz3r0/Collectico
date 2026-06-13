<script setup lang="ts">
import { useAuthStore } from '@/entities/user'

// FSD features/auth/login: the login interaction. Styling is intentionally minimal (Vuetify parity comes later).
const auth = useAuthStore()
const route = useRoute()
const email = ref('')
const password = ref('')
const errorMessage = ref<string | null>(null)
const submitting = ref(false)

// Honor the ?redirect the auth.global guard writes when bouncing an anonymous visitor off a
// protected route. Only same-origin relative paths are accepted, so a crafted ?redirect can't
// open-redirect to an external site.
function postLoginTarget(): string {
  const redirect = route.query.redirect
  if (typeof redirect === 'string' && redirect.startsWith('/') && !redirect.startsWith('//')) {
    return redirect
  }
  return '/'
}

async function onSubmit() {
  errorMessage.value = null
  submitting.value = true
  try {
    await auth.login({ email: email.value, password: password.value })
    await navigateTo(postLoginTarget())
  } catch (e) {
    errorMessage.value = e instanceof Error ? e.message : 'Login failed'
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <form class="login-form" @submit.prevent="onSubmit">
    <h2>Sign in</h2>
    <label>
      Email
      <input v-model="email" type="email" required autocomplete="email" />
    </label>
    <label>
      Password
      <input v-model="password" type="password" required autocomplete="current-password" />
    </label>
    <p v-if="errorMessage" role="alert" class="login-form__error">{{ errorMessage }}</p>
    <button type="submit" :disabled="submitting">
      {{ submitting ? 'Signing in...' : 'Sign in' }}
    </button>
  </form>
</template>

<style scoped>
.login-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.login-form label {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.login-form__error {
  color: #b3261e;
}
</style>
