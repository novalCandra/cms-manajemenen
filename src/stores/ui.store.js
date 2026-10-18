import { defineStore } from 'pinia';

let counter = 0;

export const useUiStore = defineStore('ui', {
  state: () => ({
    toasts: [],
    sidebarOpen: false,
  }),

  actions: {
    push({ type = 'info', message, timeout = 4000 }) {
      const id = ++counter;
      this.toasts.push({ id, type, message });
      if (timeout > 0) {
        setTimeout(() => this.dismiss(id), timeout);
      }
      return id;
    },

    success(message) {
      return this.push({ type: 'success', message });
    },

    error(message) {
      return this.push({ type: 'error', message });
    },

    info(message) {
      return this.push({ type: 'info', message });
    },

    dismiss(id) {
      this.toasts = this.toasts.filter((toast) => toast.id !== id);
    },

    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    },

    closeSidebar() {
      this.sidebarOpen = false;
    },
  },
});
