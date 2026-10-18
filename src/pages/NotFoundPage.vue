<script setup>
import { RouterLink } from 'vue-router';
import BaseButton from '@/components/atoms/BaseButton.vue';
import Icon from '@/components/atoms/Icon.vue';
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-yellow p-6">
    <div class="w-full max-w-md border-4 border-black bg-white p-8 text-center shadow-brutal">
      <span class="inline-block border-3 border-black bg-blue p-3 text-white">
        <Icon name="alert" :size="32" />
      </span>
      <h1 class="mt-4 font-display text-3xl uppercase">404</h1>
      <p class="mt-2 font-body text-sm text-black/70">
        Halaman yang Anda cari tidak ditemukan.
      </p>
      <div class="mt-6">
        <RouterLink :to="{ name: 'home' }">
          <BaseButton variant="primary" icon="home">Kembali ke Beranda</BaseButton>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
