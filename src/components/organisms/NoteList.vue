<script setup>
import Icon from '@/components/atoms/Icon.vue';
import EmptyState from '@/components/molecules/EmptyState.vue';
import ErrorState from '@/components/molecules/ErrorState.vue';
import LoadingState from '@/components/molecules/LoadingState.vue';
import { formatDateTime } from '@/utils/format';

defineProps({
  notes: { type: Array, default: () => [] },
  loading: { type: Boolean, default: false },
  error: { type: Object, default: null },
});

defineEmits(['edit', 'delete', 'retry']);
</script>

<template>
  <div>
    <LoadingState v-if="loading" message="Memuat catatan…" />
    <ErrorState v-else-if="error" :message="error.message" @retry="$emit('retry')" />
    <EmptyState
      v-else-if="notes.length === 0"
      icon="note"
      title="Belum ada catatan produk"
      message="Tulis catatan penting seputar produksi Anda."
    />

    <div v-else class="grid gap-4 sm:grid-cols-2">
      <article
        v-for="note in notes"
        :key="note.id"
        class="border-4 border-black bg-white p-4 shadow-brutal"
      >
        <header class="flex items-start justify-between gap-2">
          <h3 class="font-display text-sm uppercase tracking-wide">{{ note.title }}</h3>
          <div class="flex shrink-0 gap-2">
            <button
              type="button"
              class="border-3 border-black bg-white p-1.5 shadow-brutal-sm transition-transform hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
              :aria-label="`Ubah ${note.title}`"
              @click="$emit('edit', note)"
            >
              <Icon name="edit" :size="15" />
            </button>
            <button
              type="button"
              class="border-3 border-black bg-black p-1.5 text-white shadow-brutal-sm transition-transform hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
              :aria-label="`Hapus ${note.title}`"
              @click="$emit('delete', note)"
            >
              <Icon name="trash" :size="15" />
            </button>
          </div>
        </header>
        <p class="mt-2 whitespace-pre-wrap font-body text-sm text-black/80">{{ note.content }}</p>
        <p class="mt-3 font-mono text-[10px] uppercase text-black/50">
          {{ formatDateTime(note.createdAt) }}
        </p>
      </article>
    </div>
  </div>
</template>
