<script setup>
import BaseInput from '@/components/atoms/BaseInput.vue';
import Icon from '@/components/atoms/Icon.vue';

defineProps({
  modelValue: { type: String, default: '' },
  placeholder: { type: String, default: 'Cari…' },
});

defineEmits(['update:modelValue']);
</script>

<template>
  <div class="relative">
    <span class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-black">
      <Icon name="search" :size="18" />
    </span>
    <BaseInput
      :model-value="modelValue"
      :placeholder="placeholder"
      class="[&]:pl-10"
      @update:model-value="$emit('update:modelValue', $event)"
    />
  </div>
</template>
