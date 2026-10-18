import { apiClient } from '@/api/client';

export const photoService = {
  async list() {
    const { data } = await apiClient.get('/photos');
    return data.data;
  },

  async upload({ file, itemId, itemName, quantity, worker }) {
    const form = new FormData();
    form.append('photo', file);
    form.append('quantity', String(quantity));
    form.append('worker', worker);
    if (itemId) form.append('itemId', itemId);
    if (itemName) form.append('itemName', itemName);

    const { data } = await apiClient.post('/photos', form);
    return data.data;
  },

  async remove(id) {
    await apiClient.delete(`/photos/${id}`);
  },
};
