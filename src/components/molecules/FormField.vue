<script setup>
import BaseLabel from '@/components/atoms/BaseLabel.vue';

defineProps({
  label: { type: String, default: '' },
  htmlFor: { type: String, default: '' },
  error: { type: String, default: '' },
  hint: { type: String, default: '' },
  required: { type: Boolean, default: false },
});
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <BaseLabel v-if="label" :html-for="htmlFor">
      {{ label }}<span v-if="required" class="text-blue"> *</span>
    </BaseLabel>
    <slot />
    <p v-if="error" class="font-mono text-[11px] uppercase text-blue">{{ error }}</p>
    <p v-else-if="hint" class="font-body text-[11px] text-black/60">{{ hint }}</p>
  </div>
</template>
