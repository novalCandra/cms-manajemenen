import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth.store';

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/LoginPage.vue'),
    meta: { guestOnly: true, title: 'Masuk' },
  },
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/HomePage.vue'),
    meta: { requiresAuth: true, title: 'Beranda' },
  },
  {
    path: '/foto',
    name: 'photo',
    component: () => import('@/pages/PhotoPage.vue'),
    meta: { requiresAuth: true, title: 'Foto Produk' },
  },
  {
    path: '/catatan',
    name: 'notes',
    component: () => import('@/pages/NotesPage.vue'),
    meta: { requiresAuth: true, title: 'Catatan' },
  },
  {
    path: '/stok',
    name: 'stock',
    component: () => import('@/pages/StockPage.vue'),
    meta: { requiresAuth: true, title: 'Stok Barang' },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/pages/NotFoundPage.vue'),
    meta: { title: 'Tidak Ditemukan' },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
});

router.beforeEach(async (to) => {
  const auth = useAuthStore();
  if (!auth.ready) {
    await auth.bootstrap();
  }

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return { name: 'login', query: { redirect: to.fullPath } };
  }
  if (to.meta.guestOnly && auth.isAuthenticated) {
    return { name: 'home' };
  }
  return true;
});

router.afterEach((to) => {
  document.title = to.meta.title ? `StokKu - ${to.meta.title}` : 'StokKu';
});

export default router;
