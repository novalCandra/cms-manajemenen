<script setup>
const props = defineProps({
  modelValue: { type: [String, Number], default: '' },
  type: { type: String, default: 'text' },
  id: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  invalid: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  autocomplete: { type: String, default: 'off' },
  inputmode: { type: String, default: '' },
  min: { type: [String, Number], default: undefined },
  max: { type: [String, Number], default: undefined },
  step: { type: [String, Number], default: undefined },
});

const emit = defineEmits(['update:modelValue']);

const onInput = (event) => {
  const { value } = event.target;
  if (props.type === 'number') {
    emit('update:modelValue', value === '' ? '' : Number(value));
  } else {
    emit('update:modelValue', value);
  }
};
</script>

<template>
  <input
    :id="id"
    :type="type"
    :value="modelValue"
    :placeholder="placeholder"
    :disabled="disabled"
    :autocomplete="autocomplete"
    :inputmode="inputmode || undefined"
    :min="min"
    :max="max"
    :step="step"
    :class="[
      'w-full border-3 bg-white px-3 py-2.5 font-body text-sm text-black placeholder:text-black/40',
      'focus:shadow-brutal-sm',
      invalid ? 'border-blue shadow-brutal-sm' : 'border-black',
      disabled ? 'cursor-not-allowed opacity-60' : '',
    ]"
    @input="onInput"
  />
</template>
