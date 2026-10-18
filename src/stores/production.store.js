import { defineStore } from 'pinia';
import { productionService } from '@/services/production.service';

const isToday = (isoDate) => {
  const date = new Date(isoDate);
  const now = new Date();
  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  );
};

export const useProductionStore = defineStore('production', {
  state: () => ({
    items: [],
    loading: false,
    saving: false,
    loaded: false,
    error: null,
  }),

  getters: {
    today: (state) => state.items.filter((entry) => isToday(entry.createdAt)),
    todayOutput() {
      return this.today.reduce((sum, entry) => sum + entry.quantity, 0);
    },
    todayProfit() {
      return this.today.reduce((sum, entry) => sum + entry.profit, 0);
    },
    totalProfit: (state) => state.items.reduce((sum, entry) => sum + entry.profit, 0),
  },

  actions: {
    async fetchAll(params = {}) {
      this.loading = true;
      this.error = null;
      try {
        this.items = await productionService.list(params);
        this.loaded = true;
      } catch (error) {
        this.error = error;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async create(payload) {
      this.saving = true;
      try {
        const result = await productionService.create(payload);
        this.addFromRealtime(result.production);
        return result;
      } finally {
        this.saving = false;
      }
    },

    addFromRealtime(production) {
      if (this.items.some((entry) => entry.id === production.id)) return;
      this.items = [production, ...this.items];
    },
  },
});
