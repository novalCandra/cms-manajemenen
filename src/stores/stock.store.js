import { defineStore } from 'pinia';
import { stockService } from '@/services/stock.service';

export const useStockStore = defineStore('stock', {
  state: () => ({
    items: [],
    loading: false,
    saving: false,
    loaded: false,
    error: null,
    search: '',
    sortKey: 'name',
    sortDir: 'asc',
  }),

  getters: {
    filtered: (state) => {
      const needle = state.search.trim().toLowerCase();
      const list = needle
        ? state.items.filter(
            (item) =>
              item.name.toLowerCase().includes(needle) ||
              (item.sku ?? '').toLowerCase().includes(needle),
          )
        : [...state.items];

      const dir = state.sortDir === 'asc' ? 1 : -1;
      return list.sort((a, b) => {
        const left = a[state.sortKey];
        const right = b[state.sortKey];
        if (typeof left === 'number' && typeof right === 'number') {
          return (left - right) * dir;
        }
        return String(left).localeCompare(String(right)) * dir;
      });
    },

    lowStock: (state) => state.items.filter((item) => item.status !== 'AMAN'),

    byId: (state) => (id) => state.items.find((item) => item.id === id) ?? null,
  },

  actions: {
    setSearch(value) {
      this.search = value;
    },

    async fetchAll() {
      this.loading = true;
      this.error = null;
      try {
        this.items = await stockService.list();
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
        const item = await stockService.create(payload);
        this.upsert(item);
        return item;
      } finally {
        this.saving = false;
      }
    },

    async update(id, payload) {
      this.saving = true;
      try {
        const item = await stockService.update(id, payload);
        this.upsert(item);
        return item;
      } finally {
        this.saving = false;
      }
    },

    async remove(id) {
      this.saving = true;
      try {
        await stockService.remove(id);
        this.items = this.items.filter((item) => item.id !== id);
      } finally {
        this.saving = false;
      }
    },

    upsert(item) {
      const index = this.items.findIndex((entry) => entry.id === item.id);
      if (index === -1) {
        this.items = [...this.items, item];
      } else {
        this.items = this.items.map((entry) => (entry.id === item.id ? item : entry));
      }
    },

    removeById(id) {
      this.items = this.items.filter((item) => item.id !== id);
    },
  },
});
