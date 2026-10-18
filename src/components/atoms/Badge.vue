<script setup>
import { computed } from 'vue';
import Icon from './Icon.vue';

const props = defineProps({
  variant: {
    type: String,
    default: 'aman',
    validator: (value) => ['aman', 'menipis', 'habis', 'neutral', 'live'].includes(value),
  },
  label: { type: String, default: '' },
});

const styleClass = computed(
  () =>
    ({
      aman: 'bg-blue text-white border-black',
      menipis: 'bg-yellow text-black border-black',
      habis: 'bg-white text-black border-black',
      neutral: 'bg-white text-black border-black',
      live: 'bg-blue text-white border-black',
    })[props.variant],
);
</script>

<template>
  <span
    :class="[
      'inline-flex items-center gap-1 border-3 px-2 py-0.5 font-display text-[10px] uppercase tracking-wider',
      styleClass,
    ]"
  >
    <Icon
      v-if="variant === 'habis'"
      name="close"
      :size="12"
      :stroke-width="3.5"
    />
    <span
      v-else-if="variant === 'live'"
      class="h-2 w-2 animate-blink border border-white bg-white"
    />
    <slot>{{ label }}</slot>
  </span>
</template>
