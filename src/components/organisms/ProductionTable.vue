<script setup>
import EmptyState from '@/components/molecules/EmptyState.vue';
import ErrorState from '@/components/molecules/ErrorState.vue';
import LoadingState from '@/components/molecules/LoadingState.vue';
import { formatCurrency, formatDateTime, formatNumber } from '@/utils/format';

const props = defineProps({
  productions: { type: Array, default: () => [] },
  loading: { type: Boolean, default: false },
  error: { type: Object, default: null },
  variant: { type: String, default: 'keluaran' },
});

defineEmits(['retry']);

const total = () =>
  props.productions.reduce((sum, entry) => sum + entry.quantity, 0);
const totalProfit = () =>
  props.productions.reduce((sum, entry) => sum + entry.profit, 0);
</script>

<template>
  <div>
    <LoadingState v-if="loading" message="Memuat catatan…" />
    <ErrorState v-else-if="error" :message="error.message" @retry="$emit('retry')" />
    <EmptyState
      v-else-if="productions.length === 0"
      icon="note"
      title="Belum ada catatan"
      message="Catat keluaran produksi untuk melihat riwayat di sini."
    />

    <div v-else class="space-y-4">
      <div class="flex flex-wrap gap-3">
        <div class="border-3 border-black bg-yellow px-4 py-2 shadow-brutal-sm">
          <p class="font-display text-[10px] uppercase tracking-widest">Total Keluaran</p>
          <p class="font-mono text-lg font-bold">{{ formatNumber(total()) }}</p>
        </div>
        <div
          v-if="variant === 'keuntungan'"
          class="border-3 border-black bg-blue px-4 py-2 text-white shadow-brutal-sm"
        >
          <p class="font-display text-[10px] uppercase tracking-widest">Total Keuntungan</p>
          <p class="font-mono text-lg font-bold">{{ formatCurrency(totalProfit()) }}</p>
        </div>
      </div>

      <div class="overflow-x-auto border-4 border-black shadow-brutal">
        <table class="w-full min-w-[640px] border-collapse bg-white text-left">
          <thead>
            <tr class="border-b-4 border-black bg-yellow">
              <th class="px-3 py-2 font-display text-[11px] uppercase tracking-wide">Waktu</th>
              <th class="px-3 py-2 font-display text-[11px] uppercase tracking-wide">Barang</th>
              <th class="px-3 py-2 font-display text-[11px] uppercase tracking-wide">Jumlah</th>
              <th class="px-3 py-2 font-display text-[11px] uppercase tracking-wide">Pekerja</th>
              <th
                v-if="variant === 'keuntungan'"
                class="px-3 py-2 font-display text-[11px] uppercase tracking-wide"
              >
                Keuntungan
              </th>
              <th class="px-3 py-2 font-display text-[11px] uppercase tracking-wide">Catatan</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="entry in productions"
              :key="entry.id"
              class="border-b-3 border-black/20 last:border-b-0 hover:bg-yellow/30"
            >
              <td class="px-3 py-2 font-mono text-xs">{{ formatDateTime(entry.createdAt) }}</td>
              <td class="px-3 py-2 font-display text-sm uppercase tracking-wide">
                {{ entry.itemName }}
              </td>
              <td class="px-3 py-2 font-mono text-sm font-bold">{{ formatNumber(entry.quantity) }}</td>
              <td class="px-3 py-2 font-body text-sm">{{ entry.worker }}</td>
              <td
                v-if="variant === 'keuntungan'"
                class="px-3 py-2 font-mono text-sm font-bold text-blue"
              >
                {{ formatCurrency(entry.profit) }}
              </td>
              <td class="px-3 py-2 font-body text-xs text-black/60">{{ entry.note || '—' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
