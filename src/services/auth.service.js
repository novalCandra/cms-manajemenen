import { apiClient, setAccessToken } from '@/api/client';

export const authService = {
  async register(payload) {
    const { data } = await apiClient.post('/auth/register', payload);
    setAccessToken(data.data.accessToken);
    return data.data;
  },

  async login(payload) {
    const { data } = await apiClient.post('/auth/login', payload);
    setAccessToken(data.data.accessToken);
    return data.data;
  },

  async refresh() {
    const { data } = await apiClient.post('/auth/refresh');
    setAccessToken(data.data.accessToken);
    return data.data;
  },

  async logout() {
    try {
      await apiClient.post('/auth/logout');
    } finally {
      setAccessToken(null);
    }
  },

  async me() {
    const { data } = await apiClient.get('/auth/me');
    return data.data.user;
  },
};
