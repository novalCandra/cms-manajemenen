<script setup>
import BaseButton from '@/components/atoms/BaseButton.vue';
import Icon from '@/components/atoms/Icon.vue';

defineProps({
  open: { type: Boolean, default: false },
  title: { type: String, default: 'Konfirmasi' },
  message: { type: String, default: 'Apakah Anda yakin?' },
  confirmLabel: { type: String, default: 'Ya, lanjutkan' },
  cancelLabel: { type: String, default: 'Batal' },
  loading: { type: Boolean, default: false },
});

defineEmits(['confirm', 'cancel']);
</script>

<template>
  <Transition
    enter-active-class="transition duration-150"
    enter-from-class="opacity-0"
    leave-active-class="transition duration-150"
    leave-to-class="opacity-0"
  >
    <div
      v-if="open"
      class="fixed inset-0 z-[55] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <div class="absolute inset-0 bg-black/50" @click="$emit('cancel')" />
      <div class="relative w-full max-w-md border-4 border-black bg-white p-5 shadow-brutal">
        <div class="flex items-start gap-3">
          <span class="border-3 border-black bg-yellow p-2">
            <Icon name="alert" :size="22" />
          </span>
          <div>
            <h2 class="font-display text-lg uppercase tracking-tight">{{ title }}</h2>
            <p class="mt-1 font-body text-sm text-black/70">{{ message }}</p>
          </div>
        </div>
        <div class="mt-5 flex justify-end gap-2">
          <BaseButton variant="outline" :disabled="loading" @click="$emit('cancel')">
            {{ cancelLabel }}
          </BaseButton>
          <BaseButton variant="danger" :loading="loading" @click="$emit('confirm')">
            {{ confirmLabel }}
          </BaseButton>
        </div>
      </div>
    </div>
  </Transition>
</template>
