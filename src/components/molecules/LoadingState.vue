<script setup>
defineProps({
  message: { type: String, default: 'Memuat data…' },
});
</script>

<template>
  <div
    class="flex flex-col items-center justify-center gap-3 border-3 border-dashed border-black bg-white p-8 text-center"
  >
    <span class="h-8 w-8 animate-spin rounded-none border-4 border-black border-t-transparent" />
    <p class="font-display text-xs uppercase tracking-widest">{{ message }}</p>
  </div>
</template>
