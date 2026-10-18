<script setup>
import { computed, reactive, ref } from 'vue';
import BaseButton from '@/components/atoms/BaseButton.vue';
import BaseInput from '@/components/atoms/BaseInput.vue';
import BaseSelect from '@/components/atoms/BaseSelect.vue';
import BaseTextarea from '@/components/atoms/BaseTextarea.vue';
import FormField from '@/components/molecules/FormField.vue';

const props = defineProps({
  items: { type: Array, default: () => [] },
  loading: { type: Boolean, default: false },
});

const emit = defineEmits(['submit']);

const form = reactive({
  itemId: '',
  quantity: 1,
  worker: '',
  note: '',
});
const errors = reactive({});
const submitting = ref(false);

const options = computed(() =>
  props.items.map((item) => ({
    value: item.id,
    label: `${item.name} · ${item.stock} ${item.unit}`,
  })),
);

const validate = () => {
  errors.itemId = form.itemId ? '' : 'Pilih barang terlebih dahulu';
  errors.quantity =
    Number(form.quantity) > 0 ? '' : 'Jumlah keluaran harus lebih dari 0';
  errors.worker = form.worker.trim() ? '' : 'Nama pekerja wajib diisi';
  return !errors.itemId && !errors.quantity && !errors.worker;
};

const reset = () => {
  form.itemId = '';
  form.quantity = 1;
  form.worker = '';
  form.note = '';
  Object.keys(errors).forEach((key) => {
    errors[key] = '';
  });
};

const onSubmit = () => {
  if (!validate()) return;
  emit('submit', {
    itemId: form.itemId,
    quantity: Number(form.quantity),
    worker: form.worker.trim(),
    note: form.note.trim() || null,
  });
};

defineExpose({ reset });
</script>

<template>
  <form
    class="border-4 border-black bg-white p-5 shadow-brutal"
    @submit.prevent="onSubmit"
  >
    <h2 class="font-display text-sm uppercase tracking-wide">Catat Keluaran Produksi</h2>

    <div class="mt-4 grid gap-4 sm:grid-cols-2">
      <FormField label="Barang" html-for="tx-item" :error="errors.itemId" required>
        <BaseSelect
          id="tx-item"
          v-model="form.itemId"
          :options="options"
          placeholder="Pilih barang"
          :invalid="Boolean(errors.itemId)"
        />
      </FormField>

      <FormField label="Jumlah" html-for="tx-qty" :error="errors.quantity" required>
        <BaseInput
          id="tx-qty"
          v-model="form.quantity"
          type="number"
          min="1"
          :invalid="Boolean(errors.quantity)"
        />
      </FormField>

      <FormField label="Pekerja" html-for="tx-worker" :error="errors.worker" required>
        <BaseInput
          id="tx-worker"
          v-model="form.worker"
          placeholder="Nama pekerja"
          :invalid="Boolean(errors.worker)"
        />
      </FormField>

      <FormField label="Catatan" html-for="tx-note" hint="Opsional">
        <BaseTextarea id="tx-note" v-model="form.note" :rows="1" placeholder="Catatan singkat" />
      </FormField>
    </div>

    <div class="mt-4 flex justify-end">
      <BaseButton
        type="submit"
        variant="primary"
        icon="plus"
        :loading="submitting"
        :disabled="loading || items.length === 0"
      >
        Simpan Keluaran
      </BaseButton>
    </div>
  </form>
</template>
