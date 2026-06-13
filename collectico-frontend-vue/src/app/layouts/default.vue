<script setup lang="ts">
import { LoginPopup } from '@/features/auth/login-popup'
</script>

<template>
  <div class="app-shell">
    <slot />
    <LoginPopup />
  </div>
</template>
