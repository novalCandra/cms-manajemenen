<script setup>
import { onMounted, ref } from 'vue';
import ConfirmDialog from '@/components/organisms/ConfirmDialog.vue';
import PhotoGallery from '@/components/organisms/PhotoGallery.vue';
import PhotoUploader from '@/components/organisms/PhotoUploader.vue';
import DashboardLayout from '@/components/templates/DashboardLayout.vue';
import { usePhotos } from '@/composables/usePhotos';
import { useStock } from '@/composables/useStock';
import { useToast } from '@/composables/useToast';

const toast = useToast();
const { items: photos, loading, uploading, error, fetchAll, upload, remove } = usePhotos();
const { items: stockItems, fetchAll: fetchStock } = useStock();

const uploaderRef = ref(null);
const deleting = ref(null);
const removing = ref(false);

onMounted(() => {
  fetchAll().catch(() => {});
  fetchStock().catch(() => {});
});

const onSubmit = async (payload) => {
  try {
    await upload(payload);
    uploaderRef.value?.reset();
    toast.success('Foto produk berhasil diunggah');
  } catch (err) {
    toast.error(err.message || 'Gagal mengunggah foto');
  }
};

const askDelete = (photo) => {
  deleting.value = photo;
};

const confirmDelete = async () => {
  if (!deleting.value) return;
  removing.value = true;
  try {
    await remove(deleting.value.id);
    toast.success('Foto dihapus');
    deleting.value = null;
  } catch (err) {
    toast.error(err.message || 'Gagal menghapus foto');
  } finally {
    removing.value = false;
  }
};
</script>

<template>
  <DashboardLayout>
    <div class="space-y-6">
      <header>
        <h1 class="font-display text-2xl uppercase tracking-tight">Foto Produk</h1>
        <p class="font-body text-sm text-black/60">
          Ambil foto hasil produksi dan simpan detailnya.
        </p>
      </header>

      <PhotoUploader
        ref="uploaderRef"
        :items="stockItems"
        :uploading="uploading"
        @submit="onSubmit"
      />

      <section>
        <h2 class="mb-3 font-display text-sm uppercase tracking-wide">Galeri</h2>
        <PhotoGallery
          :photos="photos"
          :loading="loading"
          :error="error"
          @delete="askDelete"
          @retry="fetchAll().catch(() => {})"
        />
      </section>
    </div>

    <ConfirmDialog
      :open="Boolean(deleting)"
      title="Hapus Foto"
      :message="`Foto ${deleting?.itemName ?? ''} akan dihapus permanen.`"
      confirm-label="Hapus"
      :loading="removing"
      @confirm="confirmDelete"
      @cancel="deleting = null"
    />
  </DashboardLayout>
</template>
