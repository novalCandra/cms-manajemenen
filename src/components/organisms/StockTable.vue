<script setup>
import Badge from '@/components/atoms/Badge.vue';
import Icon from '@/components/atoms/Icon.vue';
import EmptyState from '@/components/molecules/EmptyState.vue';
import ErrorState from '@/components/molecules/ErrorState.vue';
import LoadingState from '@/components/molecules/LoadingState.vue';
import { formatCurrency, formatNumber } from '@/utils/format';

defineProps({
  items: { type: Array, default: () => [] },
  loading: { type: Boolean, default: false },
  error: { type: Object, default: null },
});

defineEmits(['edit', 'delete', 'retry']);
</script>

<template>
  <div>
    <LoadingState v-if="loading" message="Memuat stok barang…" />
    <ErrorState
      v-else-if="error"
      :message="error.message"
      @retry="$emit('retry')"
    />
    <EmptyState
      v-else-if="items.length === 0"
      icon="box"
      title="Stok masih kosong"
      message="Tambahkan barang pertama Anda untuk mulai melacak stok."
    />

    <div v-else class="overflow-x-auto border-4 border-black shadow-brutal">
      <table class="w-full min-w-[720px] border-collapse bg-white text-left">
        <thead>
          <tr class="border-b-4 border-black bg-yellow">
            <th class="px-3 py-2 font-display text-[11px] uppercase tracking-wide">Nama</th>
            <th class="px-3 py-2 font-display text-[11px] uppercase tracking-wide">Kode</th>
            <th class="px-3 py-2 font-display text-[11px] uppercase tracking-wide">Stok</th>
            <th class="px-3 py-2 font-display text-[11px] uppercase tracking-wide">Min</th>
            <th class="px-3 py-2 font-display text-[11px] uppercase tracking-wide">Modal</th>
            <th class="px-3 py-2 font-display text-[11px] uppercase tracking-wide">Jual</th>
            <th class="px-3 py-2 font-display text-[11px] uppercase tracking-wide">Status</th>
            <th class="px-3 py-2 text-right font-display text-[11px] uppercase tracking-wide">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in items"
            :key="item.id"
            class="border-b-3 border-black/20 last:border-b-0 hover:bg-yellow/30"
          >
            <td class="px-3 py-2 font-display text-sm uppercase tracking-wide">{{ item.name }}</td>
            <td class="px-3 py-2 font-mono text-xs text-black/60">{{ item.sku || '—' }}</td>
            <td class="px-3 py-2 font-mono text-sm font-bold">
              {{ formatNumber(item.stock) }} {{ item.unit }}
            </td>
            <td class="px-3 py-2 font-mono text-xs">{{ formatNumber(item.minStock) }}</td>
            <td class="px-3 py-2 font-mono text-xs">{{ formatCurrency(item.cost) }}</td>
            <td class="px-3 py-2 font-mono text-xs">{{ formatCurrency(item.price) }}</td>
            <td class="px-3 py-2">
              <Badge :variant="item.status.toLowerCase()">{{ item.status }}</Badge>
            </td>
            <td class="px-3 py-2">
              <div class="flex justify-end gap-2">
                <button
                  type="button"
                  class="border-3 border-black bg-white p-1.5 shadow-brutal-sm transition-transform hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
                  :aria-label="`Ubah ${item.name}`"
                  @click="$emit('edit', item)"
                >
                  <Icon name="edit" :size="16" />
                </button>
                <button
                  type="button"
                  class="border-3 border-black bg-black p-1.5 text-white shadow-brutal-sm transition-transform hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
                  :aria-label="`Hapus ${item.name}`"
                  @click="$emit('delete', item)"
                >
                  <Icon name="trash" :size="16" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
