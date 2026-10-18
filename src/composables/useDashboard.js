import { storeToRefs } from 'pinia';
import { useDashboardStore } from '@/stores/dashboard.store';

export const useDashboard = () => {
  const store = useDashboardStore();
  const { snapshot, loading, error, loaded } = storeToRefs(store);

  return {
    snapshot,
    loading,
    error,
    loaded,
    fetch: () => store.fetch(),
    refresh: () => store.refresh(),
  };
};
