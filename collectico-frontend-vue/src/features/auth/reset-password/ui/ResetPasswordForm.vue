<script setup lang="ts">
import { useAuthStore } from '@/entities/user'

// FSD features/auth/reset-password: step two of the email reset flow. The user arrives via the
// tokenized link the backend emailed (<APP_URL>/resetpassword?token=<raw>&email=<encoded>), so the
// token and email come from the route query. The token gates the change server-side. Styling later.
const auth = useAuthStore()
const route = useRoute()

// Query values are string | string[] | undefined. Coerce to a single trimmed string safely.
function firstQueryValue(value: string | string[] | undefined): string {
  if (Array.isArray(value)) return value[0] ?? ''
  return value ?? ''
}

const token = firstQueryValue(route.query.token as string | string[] | undefined)
const hasToken = computed(() => token.length > 0)

const email = ref(firstQueryValue(route.query.email as string | string[] | undefined))
const password = ref('')
const errorMessage = ref<string | null>(null)
const submitting = ref(false)

function validate(): string | null {
  if (!hasToken.value) {
    return 'Invalid or missing reset link. Please request a new one.'
  }
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
    await auth.resetPassword({ email: email.value, password: password.value, token })
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
    <p v-if="!hasToken" role="alert" class="reset-form__error">
      Invalid or missing reset link. Please request a new one.
    </p>
    <label>
      Email
      <input v-model="email" type="email" required autocomplete="email" :disabled="!hasToken" />
    </label>
    <label>
      New password
      <input
        v-model="password"
        type="password"
        required
        autocomplete="new-password"
        :disabled="!hasToken"
      />
    </label>
    <p v-if="errorMessage && hasToken" role="alert" class="reset-form__error">{{ errorMessage }}</p>
    <button type="submit" :disabled="submitting || !hasToken">
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
