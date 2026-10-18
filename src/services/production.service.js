import { apiClient } from '@/api/client';

export const productionService = {
  async list(params = {}) {
    const { data } = await apiClient.get('/productions', { params });
    return data.data;
  },

  async create(payload) {
    const { data } = await apiClient.post('/productions', payload);
    return data.data;
  },
};
