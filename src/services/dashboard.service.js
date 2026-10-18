import { apiClient } from '@/api/client';

export const dashboardService = {
  async snapshot() {
    const { data } = await apiClient.get('/dashboard');
    return data.data;
  },
};
