import { apiClient } from '@/api/client';

const unwrap = (response) => response.data.data;

export const noteService = {
  async list() {
    return unwrap(await apiClient.get('/notes'));
  },

  async create(payload) {
    return unwrap(await apiClient.post('/notes', payload));
  },

  async update(id, payload) {
    return unwrap(await apiClient.patch(`/notes/${id}`, payload));
  },

  async remove(id) {
    await apiClient.delete(`/notes/${id}`);
  },
};
