<template>
  <label
    :for="htmlFor"
    class="block font-display text-xs uppercase tracking-wide text-black"
  >
    <slot />
  </label>
</template>

<script setup>
defineProps({
  htmlFor: { type: String, default: '' },
});
</script>
