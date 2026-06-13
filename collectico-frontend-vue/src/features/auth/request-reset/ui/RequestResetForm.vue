<script setup lang="ts">
import { useAuthStore } from '@/entities/user'

// FSD features/auth/request-reset: step one of the email reset flow. The user supplies their email,
// the backend emails a tokenized reset link. The response is intentionally generic (anti-enumeration),
// so on success we show the same neutral message regardless of whether the email is registered.
const auth = useAuthStore()

const email = ref('')
const errorMessage = ref<string | null>(null)
const submitting = ref(false)
const submitted = ref(false)

async function onSubmit() {
  errorMessage.value = null
  submitting.value = true
  try {
    await auth.requestPasswordReset({ email: email.value })
    // Stay on the page. A neutral success line avoids leaking whether the address exists.
    submitted.value = true
  } catch (e) {
    errorMessage.value = e instanceof Error ? e.message : 'Request failed'
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <form class="request-reset-form" @submit.prevent="onSubmit">
    <h2>Forgot password</h2>
    <p class="request-reset-form__hint">
      Enter your email and we'll send you a link to reset your password.
    </p>
    <label>
      Email
      <input v-model="email" type="email" required autocomplete="email" :disabled="submitted" />
    </label>
    <p v-if="errorMessage" role="alert" class="request-reset-form__error">{{ errorMessage }}</p>
    <p v-if="submitted" role="status" class="request-reset-form__success">
      If that email is registered, a reset link has been sent.
    </p>
    <button type="submit" :disabled="submitting || submitted">
      {{ submitting ? 'Sending...' : 'Send reset link' }}
    </button>
  </form>
</template>

<style scoped>
.request-reset-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.request-reset-form label {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.request-reset-form__hint {
  color: #555;
  font-size: 0.875rem;
}
.request-reset-form__error {
  color: #b3261e;
}
.request-reset-form__success {
  color: #1a7f37;
  font-size: 0.875rem;
}
</style>
