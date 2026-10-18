import { storeToRefs } from 'pinia';
import { useStockStore } from '@/stores/stock.store';

export const useStock = () => {
  const store = useStockStore();
  const { items, filtered, lowStock, loading, saving, error, search, loaded } =
    storeToRefs(store);

  return {
    items,
    filtered,
    lowStock,
    loading,
    saving,
    error,
    search,
    loaded,
    fetchAll: () => store.fetchAll(),
    create: (payload) => store.create(payload),
    update: (id, payload) => store.update(id, payload),
    remove: (id) => store.remove(id),
    setSearch: (value) => store.setSearch(value),
    byId: (id) => store.byId(id),
  };
};
