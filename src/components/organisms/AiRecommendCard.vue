<script setup>
import Badge from '@/components/atoms/Badge.vue';
import Icon from '@/components/atoms/Icon.vue';

defineProps({
  title: { type: String, default: 'AI Rekomendasi' },
});
</script>

<template>
  <div class="border-4 border-black bg-white p-5 shadow-brutal">
    <div class="flex items-center justify-between gap-3">
      <div class="flex items-center gap-3">
        <span class="border-3 border-black bg-yellow p-2">
          <Icon name="sparkles" :size="22" />
        </span>
        <div>
          <h2 class="font-display text-sm uppercase tracking-wide">{{ title }}</h2>
          <p class="font-body text-xs text-black/60">Prediksi restock & tren penjualan.</p>
        </div>
      </div>
      <Badge variant="neutral">Segera hadir</Badge>
    </div>
    <div class="mt-4 space-y-2">
      <div class="h-3 w-full animate-pulse border-3 border-black/20 bg-black/10" />
      <div class="h-3 w-4/5 animate-pulse border-3 border-black/20 bg-black/10" />
    </div>
    <button
      type="button"
      disabled
      class="mt-4 w-full cursor-not-allowed border-3 border-black bg-black/10 px-4 py-2.5 font-display text-xs uppercase tracking-wide text-black/40"
    >
      AI Rekomendasi - segera hadir
    </button>
  </div>
</template>
