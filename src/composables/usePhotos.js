import { storeToRefs } from 'pinia';
import { usePhotoStore } from '@/stores/photo.store';

export const usePhotos = () => {
  const store = usePhotoStore();
  const { items, loading, uploading, error, loaded } = storeToRefs(store);

  return {
    items,
    loading,
    uploading,
    error,
    loaded,
    fetchAll: () => store.fetchAll(),
    upload: (payload) => store.upload(payload),
    remove: (id) => store.remove(id),
  };
};
