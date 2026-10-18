import { storeToRefs } from 'pinia';
import { useProductionStore } from '@/stores/production.store';

export const useProductions = () => {
  const store = useProductionStore();
  const { items, loading, saving, error, loaded } = storeToRefs(store);

  return {
    items,
    loading,
    saving,
    error,
    loaded,
    today: () => store.today,
    todayOutput: () => store.todayOutput,
    todayProfit: () => store.todayProfit,
    totalProfit: () => store.totalProfit,
    fetchAll: (params) => store.fetchAll(params),
    create: (payload) => store.create(payload),
  };
};
