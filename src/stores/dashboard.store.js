import { defineStore } from 'pinia';
import { dashboardService } from '@/services/dashboard.service';

const emptySnapshot = () => ({
  target: { dailyTarget: 0, achieved: 0, percent: 0 },
  today: { output: 0, profit: 0, transactions: 0 },
  stocks: [],
  lowStock: [],
});

export const useDashboardStore = defineStore('dashboard', {
  state: () => ({
    snapshot: emptySnapshot(),
    loading: false,
    loaded: false,
    error: null,
  }),

  getters: {
    targetPercent: (state) => state.snapshot.target.percent,
    todayOutput: (state) => state.snapshot.today.output,
    todayProfit: (state) => state.snapshot.today.profit,
    stocks: (state) => state.snapshot.stocks,
    lowStock: (state) => state.snapshot.lowStock,
  },

  actions: {
    async fetch() {
      this.loading = true;
      this.error = null;
      try {
        this.snapshot = await dashboardService.snapshot();
        this.loaded = true;
      } catch (error) {
        this.error = error;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async refresh() {
      try {
        this.snapshot = await dashboardService.snapshot();
      } catch {
        return;
      }
    },
  },
});
