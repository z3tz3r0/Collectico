<script setup lang="ts">
import { useAuthStore } from '@/entities/user'

// FSD features/auth/register: the sign-up interaction, ported from the legacy React Register page.
// Validation rules and messages mirror the React form. Styling is minimal (Vuetify parity comes later).
const auth = useAuthStore()

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const phone = ref('')
const password = ref('')
const confirmPassword = ref('')
const isArtist = ref(false)
const artistName = ref('')
const artistDescription = ref('')

const errorMessage = ref<string | null>(null)
const submitting = ref(false)

const phonePattern = /^(\d{3}-\d{3}-\d{4}|\d{10})$/
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Returns the first validation error, or null when the form is valid.
function validate(): string | null {
  if (!firstName.value || !lastName.value || !email.value || !phone.value || !password.value || !confirmPassword.value) {
    return 'Please fill in all fields.'
  }
  if (!phonePattern.test(phone.value)) {
    return 'Phone number format should be 012-345-6789'
  }
  if (!emailPattern.test(email.value)) {
    return 'Please enter a valid email address'
  }
  if (isArtist.value && (!artistName.value || !artistDescription.value)) {
    return 'Please fill in artist name and description.'
  }
  if (password.value !== confirmPassword.value) {
    return 'Passwords do not match!'
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
    await auth.register({
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      phone: phone.value,
      password: password.value,
      isArtist: isArtist.value,
      artistName: isArtist.value ? artistName.value : undefined,
      artistDescription: isArtist.value ? artistDescription.value : undefined,
    })
    await navigateTo('/login')
  } catch (e) {
    errorMessage.value = e instanceof Error ? e.message : 'Registration failed'
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <form class="register-form" @submit.prevent="onSubmit">
    <h2>Sign up</h2>

    <label>
      First name
      <input v-model="firstName" type="text" required autocomplete="given-name" />
    </label>
    <label>
      Last name
      <input v-model="lastName" type="text" required autocomplete="family-name" />
    </label>
    <label>
      Email
      <input v-model="email" type="email" required autocomplete="email" />
    </label>
    <label>
      Phone
      <input v-model="phone" type="tel" required autocomplete="tel" placeholder="012-345-6789" />
    </label>
    <label>
      Password
      <input v-model="password" type="password" required autocomplete="new-password" />
    </label>
    <label>
      Confirm password
      <input v-model="confirmPassword" type="password" required autocomplete="new-password" />
    </label>

    <label class="register-form__toggle">
      <input v-model="isArtist" type="checkbox" />
      Become an artist
    </label>

    <template v-if="isArtist">
      <label>
        Artist name
        <input v-model="artistName" type="text" />
      </label>
      <label>
        Description
        <textarea v-model="artistDescription" rows="6" placeholder="Tell us about your art..." />
      </label>
    </template>

    <p v-if="errorMessage" role="alert" class="register-form__error">{{ errorMessage }}</p>
    <button type="submit" :disabled="submitting">
      {{ submitting ? 'Signing up...' : 'Sign up' }}
    </button>
  </form>
</template>

<style scoped>
.register-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.register-form label {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.register-form__toggle {
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
}
.register-form__error {
  color: #b3261e;
}
</style>
