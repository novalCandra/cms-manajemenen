<script setup>
import { computed, onMounted, ref } from 'vue';
import ConfirmDialog from '@/components/organisms/ConfirmDialog.vue';
import NoteComposer from '@/components/organisms/NoteComposer.vue';
import NoteList from '@/components/organisms/NoteList.vue';
import ProductionTable from '@/components/organisms/ProductionTable.vue';
import TabBar from '@/components/molecules/TabBar.vue';
import DashboardLayout from '@/components/templates/DashboardLayout.vue';
import { useNotes } from '@/composables/useNotes';
import { useProductions } from '@/composables/useProductions';
import { useToast } from '@/composables/useToast';

const toast = useToast();
const {
  items: productions,
  loading: productionsLoading,
  error: productionsError,
  fetchAll: fetchProductions,
} = useProductions();
const {
  items: notes,
  loading: notesLoading,
  saving: notesSaving,
  error: notesError,
  fetchAll: fetchNotes,
  create: createNote,
  update: updateNote,
  remove: removeNote,
} = useNotes();

const activeTab = ref('keluaran');
const editingNote = ref(null);
const deletingNote = ref(null);
const removing = ref(false);

const tabs = computed(() => [
  { key: 'keluaran', label: 'Keluaran', count: productions.value.length },
  { key: 'keuntungan', label: 'Keuntungan' },
  { key: 'produk', label: 'Catatan Produk', count: notes.value.length },
]);

onMounted(() => {
  fetchProductions().catch(() => {});
  fetchNotes().catch(() => {});
});

const onSubmitNote = async (payload) => {
  try {
    if (editingNote.value) {
      await updateNote(editingNote.value.id, payload);
      toast.success('Catatan diperbarui');
      editingNote.value = null;
    } else {
      await createNote(payload);
      toast.success('Catatan ditambahkan');
    }
  } catch (error) {
    toast.error(error.message || 'Gagal menyimpan catatan');
  }
};

const onEditNote = (note) => {
  editingNote.value = note;
  activeTab.value = 'produk';
};

const onCancelEdit = () => {
  editingNote.value = null;
};

const confirmDeleteNote = async () => {
  if (!deletingNote.value) return;
  removing.value = true;
  try {
    await removeNote(deletingNote.value.id);
    toast.success('Catatan dihapus');
    if (editingNote.value?.id === deletingNote.value.id) editingNote.value = null;
    deletingNote.value = null;
  } catch (error) {
    toast.error(error.message || 'Gagal menghapus catatan');
  } finally {
    removing.value = false;
  }
};
</script>

<template>
  <DashboardLayout>
    <div class="space-y-6">
      <header>
        <h1 class="font-display text-2xl uppercase tracking-tight">Catatan</h1>
        <p class="font-body text-sm text-black/60">
          Riwayat keluaran, keuntungan, dan catatan produk.
        </p>
      </header>

      <TabBar v-model="activeTab" :tabs="tabs" />

      <section v-if="activeTab === 'keluaran'">
        <ProductionTable
          variant="keluaran"
          :productions="productions"
          :loading="productionsLoading"
          :error="productionsError"
          @retry="fetchProductions().catch(() => {})"
        />
      </section>

      <section v-else-if="activeTab === 'keuntungan'">
        <ProductionTable
          variant="keuntungan"
          :productions="productions"
          :loading="productionsLoading"
          :error="productionsError"
          @retry="fetchProductions().catch(() => {})"
        />
      </section>

      <section v-else class="space-y-6">
        <NoteComposer
          :editing="editingNote"
          :saving="notesSaving"
          @submit="onSubmitNote"
          @cancel="onCancelEdit"
        />
        <NoteList
          :notes="notes"
          :loading="notesLoading"
          :error="notesError"
          @edit="onEditNote"
          @delete="deletingNote = $event"
          @retry="fetchNotes().catch(() => {})"
        />
      </section>
    </div>

    <ConfirmDialog
      :open="Boolean(deletingNote)"
      title="Hapus Catatan"
      :message="`Catatan ${deletingNote?.title ?? ''} akan dihapus permanen.`"
      confirm-label="Hapus"
      :loading="removing"
      @confirm="confirmDeleteNote"
      @cancel="deletingNote = null"
    />
  </DashboardLayout>
</template>
