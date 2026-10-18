<script setup>
import { computed } from 'vue';
import Icon from './Icon.vue';

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'outline', 'danger', 'ghost'].includes(value),
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value),
  },
  type: { type: String, default: 'button' },
  block: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  icon: { type: String, default: '' },
});

defineEmits(['click']);

const variantClass = computed(
  () =>
    ({
      primary: 'bg-blue text-white',
      secondary: 'bg-yellow text-black',
      outline: 'bg-white text-black',
      danger: 'bg-black text-white',
      ghost: 'bg-transparent text-black border-transparent shadow-none',
    })[props.variant],
);

const sizeClass = computed(
  () =>
    ({
      sm: 'px-3 py-1.5 text-xs gap-1.5',
      md: 'px-4 py-2.5 text-sm gap-2',
      lg: 'px-6 py-3.5 text-base gap-2.5',
    })[props.size],
);

const isDisabled = computed(() => props.disabled || props.loading);
</script>

<template>
  <button
    :type="type"
    :disabled="isDisabled"
    :class="[
      'inline-flex select-none items-center justify-center border-3 border-black font-display uppercase tracking-wide transition-transform duration-100',
      'shadow-brutal hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none',
      'active:translate-x-[6px] active:translate-y-[6px] active:shadow-none',
      'disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-brutal',
      variantClass,
      sizeClass,
      block ? 'w-full' : '',
    ]"
    @click="$emit('click', $event)"
  >
    <span
      v-if="loading"
      class="h-4 w-4 animate-spin rounded-none border-2 border-black border-t-transparent"
      :class="variant === 'primary' || variant === 'danger' ? 'border-white' : 'border-black'"
    />
    <Icon v-else-if="icon" :name="icon" :size="size === 'sm' ? 14 : 18" />
    <span v-if="$slots.default"><slot /></span>
  </button>
</template>
