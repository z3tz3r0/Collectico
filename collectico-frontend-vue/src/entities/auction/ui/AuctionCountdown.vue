<script setup lang="ts">
// FSD entities/auction UI: a live countdown to the auction end. Time-based, so it is meant to be
// rendered client-side only (wrap in <ClientOnly>) to avoid a server/client hydration mismatch.
const props = defineProps<{ endDate?: string }>()
const emit = defineEmits<{ ended: [] }>()

const now = ref(Date.now())
let timer: ReturnType<typeof setInterval> | undefined

const endMs = computed(() => (props.endDate ? new Date(props.endDate).getTime() : 0))
const remaining = computed(() => Math.max(0, endMs.value - now.value))
const ended = computed(() => endMs.value > 0 && remaining.value <= 0)

const parts = computed(() => {
  const total = Math.floor(remaining.value / 1000)
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  }
})

function pad(n: number): string {
  return String(n).padStart(2, '0')
}

onMounted(() => {
  now.value = Date.now()
  if (ended.value) emit('ended')
  timer = setInterval(() => {
    now.value = Date.now()
  }, 1000)
})

watch(ended, (isEnded) => {
  if (isEnded) emit('ended')
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <div v-if="endDate" class="auction-countdown" :class="{ 'auction-countdown--ended': ended }">
    <span v-if="ended">Auction ended</span>
    <span v-else>{{ pad(parts.days) }}d {{ pad(parts.hours) }}h {{ pad(parts.minutes) }}m {{ pad(parts.seconds) }}s</span>
  </div>
</template>

<style scoped>
.auction-countdown {
  font-variant-numeric: tabular-nums;
  font-weight: 600;
}
.auction-countdown--ended {
  color: #b3261e;
}
</style>
