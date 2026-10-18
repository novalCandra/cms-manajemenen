<script setup>
import Icon from '@/components/atoms/Icon.vue';

defineProps({
  label: { type: String, default: '' },
  value: { type: [String, Number], default: '' },
  hint: { type: String, default: '' },
  icon: { type: String, default: '' },
  tone: {
    type: String,
    default: 'white',
    validator: (value) => ['white', 'blue', 'yellow'].includes(value),
  },
});

const toneClass = {
  white: 'bg-white text-black',
  blue: 'bg-blue text-white',
  yellow: 'bg-yellow text-black',
};
</script>

<template>
  <div :class="['border-4 border-black p-4 shadow-brutal', toneClass[tone]]">
    <div class="flex items-center justify-between gap-2">
      <p class="font-display text-[11px] uppercase tracking-widest">{{ label }}</p>
      <Icon v-if="icon" :name="icon" :size="20" />
    </div>
    <p class="mt-2 font-mono text-2xl font-bold">{{ value }}</p>
    <p v-if="hint" class="mt-1 font-body text-[11px] uppercase opacity-70">{{ hint }}</p>
  </div>
</template>
