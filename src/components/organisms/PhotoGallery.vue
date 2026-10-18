<script setup>
import Icon from '@/components/atoms/Icon.vue';
import EmptyState from '@/components/molecules/EmptyState.vue';
import ErrorState from '@/components/molecules/ErrorState.vue';
import LoadingState from '@/components/molecules/LoadingState.vue';
import { formatDateTime, formatNumber } from '@/utils/format';

defineProps({
  photos: { type: Array, default: () => [] },
  loading: { type: Boolean, default: false },
  error: { type: Object, default: null },
});

defineEmits(['delete', 'retry']);
</script>

<template>
  <div>
    <LoadingState v-if="loading" message="Memuat galeri…" />
    <ErrorState v-else-if="error" :message="error.message" @retry="$emit('retry')" />
    <EmptyState
      v-else-if="photos.length === 0"
      icon="camera"
      title="Galeri masih kosong"
      message="Unggahan foto produk akan tampil di sini."
    />

    <div v-else class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <figure
        v-for="(photo, index) in photos"
        :key="photo.id"
        class="relative border-4 border-black bg-white p-3 pb-12 shadow-brutal"
        :class="index % 2 === 0 ? 'rotate-[-1deg]' : 'rotate-[1deg]'"
      >
        <div class="aspect-square w-full overflow-hidden border-3 border-black bg-yellow/20">
          <img
            :src="photo.url"
            :alt="`Foto ${photo.itemName}`"
            loading="lazy"
            class="h-full w-full object-cover"
          />
        </div>
        <figcaption class="pt-3">
          <p class="font-display text-sm uppercase tracking-wide">{{ photo.itemName }}</p>
          <p class="font-mono text-xs text-black/60">
            {{ formatNumber(photo.quantity) }} · {{ photo.worker }}
          </p>
          <p class="font-mono text-[10px] text-black/50">{{ formatDateTime(photo.createdAt) }}</p>
        </figcaption>
        <button
          type="button"
          class="absolute right-4 top-4 border-3 border-black bg-white p-1.5 shadow-brutal-sm transition-transform hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
          :aria-label="`Hapus foto ${photo.itemName}`"
          @click="$emit('delete', photo)"
        >
          <Icon name="trash" :size="16" />
        </button>
      </figure>
    </div>
  </div>
</template>
