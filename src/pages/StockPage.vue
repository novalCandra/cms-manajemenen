<script setup>
import { onMounted, ref } from 'vue';
import BaseButton from '@/components/atoms/BaseButton.vue';
import SearchBar from '@/components/molecules/SearchBar.vue';
import ConfirmDialog from '@/components/organisms/ConfirmDialog.vue';
import StockFormModal from '@/components/organisms/StockFormModal.vue';
import StockTable from '@/components/organisms/StockTable.vue';
import DashboardLayout from '@/components/templates/DashboardLayout.vue';
import { useStock } from '@/composables/useStock';
import { useToast } from '@/composables/useToast';

const toast = useToast();
const { filtered, loading, saving, error, search, fetchAll, create, update, remove, setSearch } =
  useStock();

const modalOpen = ref(false);
const editingItem = ref(null);
const deletingItem = ref(null);
const removing = ref(false);

onMounted(() => {
  fetchAll().catch(() => {});
});

const openCreate = () => {
  editingItem.value = null;
  modalOpen.value = true;
};

const openEdit = (item) => {
  editingItem.value = item;
  modalOpen.value = true;
};

const closeModal = () => {
  modalOpen.value = false;
  editingItem.value = null;
};

const onSubmit = async (payload) => {
  try {
    if (editingItem.value) {
      await update(editingItem.value.id, payload);
      toast.success('Barang diperbarui');
    } else {
      await create(payload);
      toast.success('Barang ditambahkan');
    }
    closeModal();
  } catch (err) {
    toast.error(err.message || 'Gagal menyimpan barang');
  }
};

const confirmDelete = async () => {
  if (!deletingItem.value) return;
  removing.value = true;
  try {
    await remove(deletingItem.value.id);
    toast.success('Barang dihapus');
    deletingItem.value = null;
  } catch (err) {
    toast.error(err.message || 'Gagal menghapus barang');
  } finally {
    removing.value = false;
  }
};
</script>

<template>
  <DashboardLayout>
    <div class="space-y-6">
      <header class="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 class="font-display text-2xl uppercase tracking-tight">Stok Barang</h1>
          <p class="font-body text-sm text-black/60">Kelola daftar barang dan jumlah stok.</p>
        </div>
        <BaseButton variant="primary" icon="plus" @click="openCreate">Tambah Barang</BaseButton>
      </header>

      <div class="max-w-sm">
        <SearchBar
          :model-value="search"
          placeholder="Cari nama atau kode barang…"
          @update:model-value="setSearch"
        />
      </div>

      <StockTable
        :items="filtered"
        :loading="loading"
        :error="error"
        @edit="openEdit"
        @delete="deletingItem = $event"
        @retry="fetchAll().catch(() => {})"
      />
    </div>

    <StockFormModal
      :open="modalOpen"
      :item="editingItem"
      :saving="saving"
      @close="closeModal"
      @submit="onSubmit"
    />

    <ConfirmDialog
      :open="Boolean(deletingItem)"
      title="Hapus Barang"
      :message="`Barang ${deletingItem?.name ?? ''} akan dihapus permanen.`"
      confirm-label="Hapus"
      :loading="removing"
      @confirm="confirmDelete"
      @cancel="deletingItem = null"
    />
  </DashboardLayout>
</template>
