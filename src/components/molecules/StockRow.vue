<script setup>
import Badge from '@/components/atoms/Badge.vue';
import { formatNumber } from '@/utils/format';

defineProps({
  item: { type: Object, required: true },
});
</script>

<template>
  <div
    class="flex items-center justify-between gap-3 border-3 border-black bg-white px-3 py-2.5"
  >
    <div class="min-w-0">
      <p class="truncate font-display text-sm uppercase tracking-wide">{{ item.name }}</p>
      <p class="font-mono text-xs text-black/60">
        {{ item.sku || 'TANPA KODE' }} · min {{ formatNumber(item.minStock) }} {{ item.unit }}
      </p>
    </div>
    <div class="flex shrink-0 items-center gap-2">
      <span class="font-mono text-sm font-bold">
        {{ formatNumber(item.stock) }} {{ item.unit }}
      </span>
      <Badge :variant="item.status.toLowerCase()">{{ item.status }}</Badge>
    </div>
  </div>
</template>
