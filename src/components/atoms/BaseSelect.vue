<script setup>
defineProps({
  modelValue: { type: [String, Number], default: '' },
  id: { type: String, default: '' },
  options: { type: Array, default: () => [] },
  placeholder: { type: String, default: '' },
  invalid: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
});

defineEmits(['update:modelValue']);
</script>

<template>
  <select
    :id="id"
    :value="modelValue"
    :disabled="disabled"
    :class="[
      'w-full border-3 bg-white px-3 py-2.5 font-body text-sm text-black',
      'focus:shadow-brutal-sm',
      invalid ? 'border-blue shadow-brutal-sm' : 'border-black',
      disabled ? 'cursor-not-allowed opacity-60' : '',
    ]"
    @change="$emit('update:modelValue', $event.target.value)"
  >
    <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.label }}
    </option>
  </select>
</template>
