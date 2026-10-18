<script setup>
defineProps({
  modelValue: { type: String, default: '' },
  id: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  rows: { type: [String, Number], default: 3 },
  invalid: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
});

defineEmits(['update:modelValue']);
</script>

<template>
  <textarea
    :id="id"
    :value="modelValue"
    :placeholder="placeholder"
    :rows="rows"
    :disabled="disabled"
    :class="[
      'w-full border-3 bg-white px-3 py-2.5 font-body text-sm text-black placeholder:text-black/40',
      'focus:shadow-brutal-sm',
      invalid ? 'border-blue shadow-brutal-sm' : 'border-black',
      disabled ? 'cursor-not-allowed opacity-60' : '',
    ]"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>
