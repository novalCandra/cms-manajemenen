import { defineStore } from 'pinia';
import { setUnauthorizedHandler } from '@/api/client';
import { authService } from '@/services/auth.service';
import { socketService } from '@/services/socket.service';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    ready: false,
    loading: false,
    error: null,
    handlersInstalled: false,
  }),

  getters: {
    isAuthenticated: (state) => Boolean(state.user),
    displayName: (state) => state.user?.name ?? '',
    businessName: (state) => state.user?.businessName ?? '',
  },

  actions: {
    installHandlers() {
      if (this.handlersInstalled) return;
      setUnauthorizedHandler(() => {
        this.user = null;
        socketService.disconnect();
        import('@/router').then(({ default: router }) => {
          if (router.currentRoute.value.meta.requiresAuth) {
            router.push({ name: 'login' }).catch(() => {});
          }
        });
      });
      this.handlersInstalled = true;
    },

    async bootstrap() {
      this.installHandlers();
      if (this.ready) return;
      try {
        const { user } = await authService.refresh();
        this.user = user;
        this.connectSocket();
      } catch {
        this.user = null;
      } finally {
        this.ready = true;
      }
    },

    async login(payload) {
      this.installHandlers();
      this.loading = true;
      this.error = null;
      try {
        const { user } = await authService.login(payload);
        this.user = user;
        this.ready = true;
        this.connectSocket();
        return user;
      } catch (error) {
        this.error = error;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async register(payload) {
      this.installHandlers();
      this.loading = true;
      this.error = null;
      try {
        const { user } = await authService.register(payload);
        this.user = user;
        this.ready = true;
        this.connectSocket();
        return user;
      } catch (error) {
        this.error = error;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async logout() {
      await authService.logout().catch(() => {});
      this.user = null;
      socketService.disconnect();
    },

    connectSocket() {
      socketService.connect();
    },
  },
});
