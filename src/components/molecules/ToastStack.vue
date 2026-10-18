<script setup>
import Icon from '@/components/atoms/Icon.vue';
import { useUiStore } from '@/stores/ui.store';

const ui = useUiStore();

const styles = {
  success: 'bg-blue text-white',
  error: 'bg-black text-white',
  info: 'bg-yellow text-black',
};

const icons = {
  success: 'check',
  error: 'alert',
  info: 'sparkles',
};
</script>

<template>
  <div
    class="pointer-events-none fixed inset-x-0 bottom-4 z-[60] flex flex-col items-center gap-2 px-4 sm:items-end sm:pr-6"
    aria-live="polite"
  >
    <div
      v-for="toast in ui.toasts"
      :key="toast.id"
      :class="[
        'pointer-events-auto flex w-full max-w-sm items-start gap-3 border-4 border-black p-3 shadow-brutal',
        styles[toast.type] || styles.info,
      ]"
    >
      <Icon :name="icons[toast.type] || 'sparkles'" :size="20" />
      <p class="flex-1 font-body text-sm">{{ toast.message }}</p>
      <button type="button" aria-label="Tutup" @click="ui.dismiss(toast.id)">
        <Icon name="close" :size="16" :stroke-width="3" />
      </button>
    </div>
  </div>
</template>
