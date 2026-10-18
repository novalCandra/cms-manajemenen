<script setup>
import { RouterView } from 'vue-router';
import ToastStack from '@/components/molecules/ToastStack.vue';
</script>

<template>
  <RouterView v-slot="{ Component }">
    <component :is="Component" />
  </RouterView>
  <ToastStack />
</template>
