<script setup lang="ts">
import { useAuthStore } from '@/entities/user'

// FSD features/auth/reset-password: the password-reset interaction, ported from the legacy React
// ForgotPassword page. The user supplies their email and a new password. Styling comes with Vuetify later.
const auth = useAuthStore()

const email = ref('')
const password = ref('')
const errorMessage = ref<string | null>(null)
const submitting = ref(false)

function validate(): string | null {
  if (!email.value || !password.value) {
    return 'Please fill in all fields.'
  }
  if (password.value.length < 8 || !/[A-Z]/.test(password.value) || !/[a-z]/.test(password.value)) {
    return 'Password must be longer than 8 characters and include an uppercase and a lowercase letter.'
  }
  return null
}

async function onSubmit() {
  errorMessage.value = validate()
  if (errorMessage.value) return

  submitting.value = true
  try {
    await auth.resetPassword({ email: email.value, password: password.value })
    await navigateTo('/login')
  } catch (e) {
    errorMessage.value = e instanceof Error ? e.message : 'Reset password failed'
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <form class="reset-form" @submit.prevent="onSubmit">
    <h2>Reset password</h2>
    <p class="reset-form__hint">If you can't remember your password, let us help you.</p>
    <label>
      Email
      <input v-model="email" type="email" required autocomplete="email" />
    </label>
    <label>
      New password
      <input v-model="password" type="password" required autocomplete="new-password" />
    </label>
    <p v-if="errorMessage" role="alert" class="reset-form__error">{{ errorMessage }}</p>
    <button type="submit" :disabled="submitting">
      {{ submitting ? 'Submitting...' : 'Submit' }}
    </button>
  </form>
</template>

<style scoped>
.reset-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.reset-form label {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.reset-form__hint {
  color: #555;
  font-size: 0.875rem;
}
.reset-form__error {
  color: #b3261e;
}
</style>
