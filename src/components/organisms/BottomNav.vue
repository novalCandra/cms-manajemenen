<script setup>
import { RouterLink } from 'vue-router';
import Icon from '@/components/atoms/Icon.vue';

defineProps({
  items: { type: Array, required: true },
});
</script>

<template>
  <nav
    class="fixed inset-x-0 bottom-0 z-40 grid grid-cols-4 border-t-4 border-black bg-white lg:hidden"
    aria-label="Navigasi bawah"
  >
    <RouterLink
      v-for="item in items"
      :key="item.name"
      :to="{ name: item.name }"
      class="flex flex-col items-center gap-1 border-r-3 border-black px-1 py-2 font-display text-[10px] uppercase tracking-wide last:border-r-0"
      active-class="bg-blue text-white"
    >
      <Icon :name="item.icon" :size="20" />
      {{ item.label }}
    </RouterLink>
  </nav>
</template>
