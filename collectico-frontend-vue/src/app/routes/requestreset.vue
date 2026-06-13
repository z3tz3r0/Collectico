<script setup lang="ts">
// URL is /requestreset (one word) to match the sibling /resetpassword auth route segment style.
import { RequestResetForm } from '@/features/auth/request-reset'
</script>

<template>
  <main style="padding: 2rem; max-width: 420px; margin: 0 auto; font-family: sans-serif">
    <RequestResetForm />
  </main>
</template>
