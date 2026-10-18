<script setup>
import Icon from '@/components/atoms/Icon.vue';

defineProps({
  title: { type: String, default: 'Belum ada data' },
  message: { type: String, default: 'Data akan muncul di sini setelah ditambahkan.' },
  icon: { type: String, default: 'box' },
});
</script>

<template>
  <div
    class="flex flex-col items-center gap-3 border-3 border-dashed border-black bg-white p-8 text-center"
  >
    <span class="border-3 border-black bg-yellow p-2">
      <Icon :name="icon" :size="26" />
    </span>
    <p class="font-display text-sm uppercase tracking-wide">{{ title }}</p>
    <p class="max-w-sm font-body text-sm text-black/60">{{ message }}</p>
    <slot />
  </div>
</template>
