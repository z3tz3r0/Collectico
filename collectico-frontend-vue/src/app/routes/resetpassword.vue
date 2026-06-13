<script setup lang="ts">
// URL is /resetpassword (one word) to match the legacy React route segment.
import { ResetPasswordForm } from '@/features/auth/reset-password'
</script>

<template>
  <main style="padding: 2rem; max-width: 420px; margin: 0 auto; font-family: sans-serif">
    <ResetPasswordForm />
  </main>
</template>
