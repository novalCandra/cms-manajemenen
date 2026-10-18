import { defineStore } from 'pinia';
import { noteService } from '@/services/note.service';

export const useNoteStore = defineStore('note', {
  state: () => ({
    items: [],
    loading: false,
    saving: false,
    loaded: false,
    error: null,
  }),

  actions: {
    async fetchAll() {
      this.loading = true;
      this.error = null;
      try {
        this.items = await noteService.list();
        this.loaded = true;
      } catch (error) {
        this.error = error;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async create(payload) {
      this.saving = true;
      try {
        const note = await noteService.create(payload);
        this.items = [note, ...this.items];
        return note;
      } finally {
        this.saving = false;
      }
    },

    async update(id, payload) {
      this.saving = true;
      try {
        const note = await noteService.update(id, payload);
        this.items = this.items.map((entry) => (entry.id === id ? note : entry));
        return note;
      } finally {
        this.saving = false;
      }
    },

    async remove(id) {
      this.saving = true;
      try {
        await noteService.remove(id);
        this.items = this.items.filter((entry) => entry.id !== id);
      } finally {
        this.saving = false;
      }
    },
  },
});
