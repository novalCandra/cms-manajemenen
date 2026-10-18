import { apiClient } from '@/api/client';

const unwrap = (response) => response.data.data;

export const stockService = {
  async list(params = {}) {
    return unwrap(await apiClient.get('/items', { params }));
  },

  async create(payload) {
    return unwrap(await apiClient.post('/items', payload));
  },

  async update(id, payload) {
    return unwrap(await apiClient.patch(`/items/${id}`, payload));
  },

  async remove(id) {
    await apiClient.delete(`/items/${id}`);
  },
};
