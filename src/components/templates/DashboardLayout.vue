<script setup>
import { useRouter } from 'vue-router';
import Badge from '@/components/atoms/Badge.vue';
import BaseButton from '@/components/atoms/BaseButton.vue';
import Icon from '@/components/atoms/Icon.vue';
import AppSidebar from '@/components/organisms/AppSidebar.vue';
import BottomNav from '@/components/organisms/BottomNav.vue';
import { useAuth } from '@/composables/useAuth';
import { useRealtime } from '@/composables/useRealtime';
import { useToast } from '@/composables/useToast';
import { useUiStore } from '@/stores/ui.store';

const navItems = [
  { name: 'home', label: 'Beranda', icon: 'home' },
  { name: 'photo', label: 'Foto', icon: 'camera' },
  { name: 'notes', label: 'Catatan', icon: 'note' },
  { name: 'stock', label: 'Stok', icon: 'box' },
];

const ui = useUiStore();
const router = useRouter();
const toast = useToast();
const { businessName, displayName } = useAuth();
const { connected } = useRealtime();

const onLogout = async () => {
  const { logout } = useAuth();
  await logout();
  toast.info('Anda telah keluar');
  router.push({ name: 'login' });
};
</script>

<template>
  <div class="min-h-screen bg-white">
    <header class="sticky top-0 z-40 border-b-4 border-black bg-yellow">
      <div class="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <div class="flex items-center gap-3">
          <button
            type="button"
            class="border-3 border-black bg-white p-1.5 shadow-brutal-sm lg:hidden"
            aria-label="Buka menu"
            @click="ui.toggleSidebar()"
          >
            <Icon name="menu" :size="20" />
          </button>
          <h1 class="font-display text-lg tracking-tight">STOKKU</h1>
          <Badge :variant="connected ? 'live' : 'neutral'">
            {{ connected ? 'LIVE' : 'MENGHUBUNGKAN' }}
          </Badge>
        </div>
        <div class="flex items-center gap-3">
          <div class="hidden text-right sm:block">
            <p class="font-display text-[11px] uppercase tracking-wide">{{ businessName }}</p>
            <p class="font-mono text-[10px] text-black/60">{{ displayName }}</p>
          </div>
          <BaseButton variant="outline" size="sm" icon="logout" @click="onLogout">
            Keluar
          </BaseButton>
        </div>
      </div>
    </header>

    <div class="mx-auto flex max-w-6xl gap-6 px-4 py-6">
      <aside class="hidden w-56 shrink-0 lg:block">
        <div class="sticky top-24 border-4 border-black bg-white p-3 shadow-brutal">
          <AppSidebar :items="navItems" />
        </div>
      </aside>

      <main class="min-w-0 flex-1 pb-24 lg:pb-6">
        <slot />
      </main>
    </div>

    <BottomNav :items="navItems" />

    <div
      v-if="ui.sidebarOpen"
      class="fixed inset-0 z-50 lg:hidden"
      role="dialog"
      aria-modal="true"
    >
      <div class="absolute inset-0 bg-black/40" @click="ui.closeSidebar()" />
      <div class="absolute left-0 top-0 h-full w-64 border-r-4 border-black bg-yellow p-4">
        <div class="mb-4 flex items-center justify-between">
          <span class="font-display text-sm uppercase">Menu</span>
          <button type="button" aria-label="Tutup menu" @click="ui.closeSidebar()">
            <Icon name="close" :size="20" />
          </button>
        </div>
        <AppSidebar :items="navItems" @navigate="ui.closeSidebar()" />
      </div>
    </div>
  </div>
</template>
