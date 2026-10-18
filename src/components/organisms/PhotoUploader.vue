<script setup>
import { computed, onBeforeUnmount, reactive, ref } from 'vue';
import BaseButton from '@/components/atoms/BaseButton.vue';
import BaseInput from '@/components/atoms/BaseInput.vue';
import BaseSelect from '@/components/atoms/BaseSelect.vue';
import Icon from '@/components/atoms/Icon.vue';
import FormField from '@/components/molecules/FormField.vue';

const props = defineProps({
  items: { type: Array, default: () => [] },
  uploading: { type: Boolean, default: false },
});

const emit = defineEmits(['submit']);

const form = reactive({
  itemId: '',
  itemName: '',
  quantity: 1,
  worker: '',
});
const errors = reactive({});
const file = ref(null);
const previewUrl = ref('');
const dragging = ref(false);

const hasProducts = computed(() => props.items.length > 0);
const options = computed(() =>
  props.items.map((item) => ({ value: item.id, label: item.name })),
);

const setFile = (incoming) => {
  if (!incoming) return;
  errors.file = '';
  if (previewUrl.value) URL.revokeObjectURL(previewUrl.value);
  file.value = incoming;
  previewUrl.value = URL.createObjectURL(incoming);
};

const onFileChange = (event) => setFile(event.target.files?.[0]);

const onDrop = (event) => {
  dragging.value = false;
  setFile(event.dataTransfer?.files?.[0]);
};

const validate = () => {
  errors.file = file.value ? '' : 'Pilih atau ambil foto terlebih dahulu';
  errors.quantity = Number(form.quantity) >= 0 ? '' : 'Jumlah tidak boleh negatif';
  errors.worker = form.worker.trim() ? '' : 'Nama pekerja wajib diisi';
  errors.itemId = hasProducts.value ? (form.itemId ? '' : 'Pilih produk') : '';
  errors.itemName = !hasProducts.value ? (form.itemName.trim() ? '' : 'Nama produk wajib diisi') : '';
  return Object.values(errors).every((value) => !value);
};

const reset = () => {
  file.value = null;
  if (previewUrl.value) URL.revokeObjectURL(previewUrl.value);
  previewUrl.value = '';
  form.itemId = '';
  form.itemName = '';
  form.quantity = 1;
  form.worker = '';
  Object.keys(errors).forEach((key) => {
    errors[key] = '';
  });
};

const onSubmit = () => {
  if (!validate()) return;
  emit('submit', {
    file: file.value,
    itemId: form.itemId || null,
    itemName: form.itemName.trim() || null,
    quantity: Number(form.quantity),
    worker: form.worker.trim(),
  });
};

onBeforeUnmount(() => {
  if (previewUrl.value) URL.revokeObjectURL(previewUrl.value);
});

defineExpose({ reset });
</script>

<template>
  <form
    class="border-4 border-black bg-white p-5 shadow-brutal"
    @submit.prevent="onSubmit"
  >
    <h2 class="font-display text-sm uppercase tracking-wide">Foto Produk</h2>

    <label
      class="mt-4 flex cursor-pointer flex-col items-center justify-center gap-2 border-3 border-dashed border-black bg-yellow/30 p-6 text-center transition-colors"
      :class="dragging ? 'bg-yellow' : ''"
      @dragover.prevent="dragging = true"
      @dragleave.prevent="dragging = false"
      @drop.prevent="onDrop"
    >
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp"
        capture="environment"
        class="hidden"
        @change="onFileChange"
      />
      <img
        v-if="previewUrl"
        :src="previewUrl"
        alt="Pratinjau foto produk"
        class="max-h-56 w-auto border-3 border-black object-contain"
      />
      <template v-else>
        <span class="border-3 border-black bg-white p-2">
          <Icon name="camera" :size="26" />
        </span>
        <span class="font-display text-xs uppercase tracking-wide">
          Ketuk untuk ambil / pilih foto
        </span>
        <span class="font-body text-[11px] text-black/60">JPG, PNG, WEBP · maks 5MB</span>
      </template>
    </label>
    <p v-if="errors.file" class="mt-1 font-mono text-[11px] uppercase text-blue">
      {{ errors.file }}
    </p>

    <div class="mt-4 grid gap-4 sm:grid-cols-2">
      <FormField v-if="hasProducts" label="Produk" html-for="ph-item" :error="errors.itemId" required>
        <BaseSelect
          id="ph-item"
          v-model="form.itemId"
          :options="options"
          placeholder="Pilih produk"
          :invalid="Boolean(errors.itemId)"
        />
      </FormField>
      <FormField v-else label="Produk" html-for="ph-name" :error="errors.itemName" required>
        <BaseInput
          id="ph-name"
          v-model="form.itemName"
          placeholder="Nama produk"
          :invalid="Boolean(errors.itemName)"
        />
      </FormField>

      <FormField label="Jumlah" html-for="ph-qty" :error="errors.quantity" required>
        <BaseInput
          id="ph-qty"
          v-model="form.quantity"
          type="number"
          min="0"
          :invalid="Boolean(errors.quantity)"
        />
      </FormField>

      <FormField label="Pekerja" html-for="ph-worker" :error="errors.worker" required>
        <BaseInput
          id="ph-worker"
          v-model="form.worker"
          placeholder="Nama pekerja"
          :invalid="Boolean(errors.worker)"
        />
      </FormField>
    </div>

    <div class="mt-4 flex justify-end">
      <BaseButton type="submit" variant="secondary" icon="upload" :loading="uploading">
        Unggah Foto
      </BaseButton>
    </div>
  </form>
</template>
