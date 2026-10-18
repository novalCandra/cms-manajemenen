<script setup>
defineProps({
  size: { type: [Number, String], default: 24 },
  label: { type: String, default: 'Memuat' },
});
</script>

<template>
  <span class="inline-flex items-center gap-2" role="status" :aria-label="label">
    <span
      class="inline-block animate-spin rounded-none border-3 border-black border-t-transparent"
      :style="{ width: `${size}px`, height: `${size}px` }"
    />
    <span v-if="label" class="font-display text-xs uppercase tracking-wide">{{ label }}</span>
  </span>
</template>
