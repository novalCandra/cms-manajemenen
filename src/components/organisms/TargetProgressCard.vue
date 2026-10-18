<script setup>
import Icon from '@/components/atoms/Icon.vue';
import { formatNumber } from '@/utils/format';

defineProps({
  dailyTarget: { type: Number, default: 0 },
  achieved: { type: Number, default: 0 },
  percent: { type: Number, default: 0 },
});
</script>

<template>
  <section class="border-4 border-black bg-yellow p-5 shadow-brutal">
    <header class="flex items-start justify-between gap-3">
      <div>
        <p class="font-display text-[11px] uppercase tracking-widest">Target Produksi Hari Ini</p>
        <p class="mt-1 font-mono text-3xl font-bold">
          {{ formatNumber(achieved) }}
          <span class="text-black/50">/ {{ formatNumber(dailyTarget) }}</span>
        </p>
      </div>
      <span class="border-3 border-black bg-white p-2">
        <Icon name="chart" :size="22" />
      </span>
    </header>

    <div
      class="mt-4 h-7 w-full border-3 border-black bg-white"
      role="progressbar"
      :aria-valuenow="percent"
      aria-valuemin="0"
      aria-valuemax="100"
    >
      <div
        class="h-full bg-blue transition-[width] duration-500"
        :style="{ width: `${Math.min(100, Math.max(0, percent))}%` }"
      />
    </div>

    <p class="mt-2 font-display text-xs uppercase tracking-wide">
      {{ percent }}% tercapai
      <span v-if="dailyTarget === 0">· target belum diatur</span>
    </p>
  </section>
</template>
