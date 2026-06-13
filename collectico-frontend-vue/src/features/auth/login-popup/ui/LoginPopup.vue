<script setup lang="ts">
import { useAuthStore } from '@/entities/user'

// FSD features/auth/login-popup: the modal sign-in dialog, ported from the legacy React Login modal.
// Visibility is owned by the auth store (isLoginPopupOpen). The store's login() closes the popup on success.
// Visibility defaults to false, so SSR renders nothing and client hydration matches.
const auth = useAuthStore()
const { isLoginPopupOpen } = storeToRefs(auth)

const email = ref('')
const password = ref('')
const errorMessage = ref<string | null>(null)
const submitting = ref(false)

function reset() {
  email.value = ''
  password.value = ''
  errorMessage.value = null
}

function close() {
  reset()
  auth.closeLoginPopup()
}

async function onSubmit() {
  errorMessage.value = null
  submitting.value = true
  try {
    await auth.login({ email: email.value, password: password.value })
    reset()
  } catch (e) {
    errorMessage.value = e instanceof Error ? e.message : 'Login failed'
  } finally {
    submitting.value = false
  }
}

async function goToRegister() {
  close()
  await navigateTo('/register')
}

async function goToResetPassword() {
  close()
  await navigateTo('/resetpassword')
}
</script>

<template>
  <div v-if="isLoginPopupOpen" class="login-popup__backdrop" @click.self="close">
    <div class="login-popup" role="dialog" aria-modal="true" aria-label="Sign in">
      <button type="button" class="login-popup__close" aria-label="Close" @click="close">&times;</button>
      <h2>Welcome to Collectico</h2>
      <p class="login-popup__subtitle">Sign in to explore, create, or collect.</p>

      <form class="login-popup__form" @submit.prevent="onSubmit">
        <label>
          Email
          <input v-model="email" type="email" required autocomplete="email" />
        </label>
        <label>
          Password
          <input v-model="password" type="password" required autocomplete="current-password" />
        </label>
        <p v-if="errorMessage" role="alert" class="login-popup__error">{{ errorMessage }}</p>
        <button type="submit" :disabled="submitting">
          {{ submitting ? 'Signing in...' : 'Sign in' }}
        </button>
        <button type="button" class="login-popup__link" @click="goToResetPassword">Forgot password?</button>
      </form>

      <!-- Social sign-in: visual placeholders, wired in a later phase (parity with the legacy modal). -->
      <div class="login-popup__social">
        <button type="button" disabled>Google</button>
        <button type="button" disabled>Facebook</button>
      </div>

      <p class="login-popup__signup">
        Don't have an account yet?
        <button type="button" class="login-popup__link" @click="goToRegister">Sign up</button>
      </p>
    </div>
  </div>
</template>

<style scoped>
.login-popup__backdrop {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1000;
}
.login-popup {
  position: relative;
  background: #fff;
  border-radius: 12px;
  padding: 2rem;
  width: min(420px, 90vw);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-family: sans-serif;
}
.login-popup__close {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  line-height: 1;
}
.login-popup__subtitle {
  color: #555;
  font-size: 0.875rem;
}
.login-popup__form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.login-popup__form label {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.login-popup__error {
  color: #b3261e;
}
.login-popup__link {
  background: none;
  border: none;
  color: #1a73e8;
  cursor: pointer;
  padding: 0;
  font: inherit;
  text-align: left;
  width: fit-content;
}
.login-popup__social {
  display: flex;
  gap: 0.5rem;
}
.login-popup__signup {
  font-size: 0.875rem;
  color: #555;
}
</style>
