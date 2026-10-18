import { defineStore } from 'pinia';
import { photoService } from '@/services/photo.service';

export const usePhotoStore = defineStore('photo', {
  state: () => ({
    items: [],
    loading: false,
    uploading: false,
    loaded: false,
    error: null,
  }),

  actions: {
    async fetchAll() {
      this.loading = true;
      this.error = null;
      try {
        this.items = await photoService.list();
        this.loaded = true;
      } catch (error) {
        this.error = error;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async upload(payload) {
      this.uploading = true;
      try {
        const photo = await photoService.upload(payload);
        this.addFromRealtime(photo);
        return photo;
      } finally {
        this.uploading = false;
      }
    },

    async remove(id) {
      await photoService.remove(id);
      this.items = this.items.filter((photo) => photo.id !== id);
    },

    addFromRealtime(photo) {
      if (this.items.some((entry) => entry.id === photo.id)) return;
      this.items = [photo, ...this.items];
    },
  },
});
