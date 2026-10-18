<script setup>
import BaseButton from '@/components/atoms/BaseButton.vue';
import Icon from '@/components/atoms/Icon.vue';

defineProps({
  message: { type: String, default: 'Terjadi kesalahan.' },
  retryLabel: { type: String, default: 'Coba lagi' },
  showRetry: { type: Boolean, default: true },
});

defineEmits(['retry']);
</script>

<template>
  <div
    class="flex flex-col items-center gap-3 border-4 border-black bg-white p-8 text-center shadow-brutal"
  >
    <span class="border-3 border-black bg-yellow p-2">
      <Icon name="alert" :size="26" />
    </span>
    <p class="font-display text-sm uppercase tracking-wide">Gagal memuat</p>
    <p class="max-w-sm font-body text-sm text-black/70">{{ message }}</p>
    <BaseButton v-if="showRetry" variant="secondary" icon="refresh" @click="$emit('retry')">
      {{ retryLabel }}
    </BaseButton>
  </div>
</template>
