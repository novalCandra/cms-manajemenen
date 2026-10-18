<script setup>
import { RouterLink } from 'vue-router';
import Icon from '@/components/atoms/Icon.vue';

defineProps({
  items: { type: Array, required: true },
});

defineEmits(['navigate']);
</script>

<template>
  <nav class="flex flex-col gap-2" aria-label="Navigasi utama">
    <RouterLink
      v-for="item in items"
      :key="item.name"
      :to="{ name: item.name }"
      class="flex items-center gap-3 border-3 border-black px-3 py-2.5 font-display text-xs uppercase tracking-wide transition-transform"
      :class="[
        'bg-white text-black shadow-brutal-sm',
        'hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none',
      ]"
      active-class="!bg-black !text-white !shadow-none translate-x-[2px] translate-y-[2px]"
      @click="$emit('navigate', item.name)"
    >
      <Icon :name="item.icon" :size="18" />
      {{ item.label }}
    </RouterLink>
  </nav>
</template>
