<script setup>
import Badge from '@/components/atoms/Badge.vue';

defineProps({
  tabs: { type: Array, required: true },
  modelValue: { type: String, required: true },
});

defineEmits(['update:modelValue']);
</script>

<template>
  <div class="flex flex-wrap gap-2" role="tablist">
    <button
      v-for="tab in tabs"
      :key="tab.key"
      type="button"
      role="tab"
      :aria-selected="modelValue === tab.key"
      :class="[
        'border-3 border-black px-4 py-2 font-display text-xs uppercase tracking-wide transition-transform',
        modelValue === tab.key
          ? 'bg-black text-white shadow-none'
          : 'bg-white text-black shadow-brutal-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none',
      ]"
      @click="$emit('update:modelValue', tab.key)"
    >
      <span class="inline-flex items-center gap-2">
        {{ tab.label }}
        <Badge v-if="tab.count !== undefined" variant="neutral">{{ tab.count }}</Badge>
      </span>
    </button>
  </div>
</template>
