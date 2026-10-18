import { storeToRefs } from 'pinia';
import { useNoteStore } from '@/stores/note.store';

export const useNotes = () => {
  const store = useNoteStore();
  const { items, loading, saving, error, loaded } = storeToRefs(store);

  return {
    items,
    loading,
    saving,
    error,
    loaded,
    fetchAll: () => store.fetchAll(),
    create: (payload) => store.create(payload),
    update: (id, payload) => store.update(id, payload),
    remove: (id) => store.remove(id),
  };
};
