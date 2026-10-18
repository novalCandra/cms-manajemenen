<script setup>
import { reactive, watch } from 'vue';
import BaseButton from '@/components/atoms/BaseButton.vue';
import BaseInput from '@/components/atoms/BaseInput.vue';
import BaseTextarea from '@/components/atoms/BaseTextarea.vue';
import FormField from '@/components/molecules/FormField.vue';

const props = defineProps({
  editing: { type: Object, default: null },
  saving: { type: Boolean, default: false },
});

const emit = defineEmits(['submit', 'cancel']);

const form = reactive({ title: '', content: '' });
const errors = reactive({});

watch(
  () => props.editing,
  (value) => {
    form.title = value?.title ?? '';
    form.content = value?.content ?? '';
    errors.title = '';
    errors.content = '';
  },
  { immediate: true },
);

const validate = () => {
  errors.title = form.title.trim() ? '' : 'Judul wajib diisi';
  errors.content = form.content.trim() ? '' : 'Isi catatan wajib diisi';
  return !errors.title && !errors.content;
};

const reset = () => {
  form.title = '';
  form.content = '';
  errors.title = '';
  errors.content = '';
  emit('cancel');
};

const onSubmit = () => {
  if (!validate()) return;
  emit('submit', { title: form.title.trim(), content: form.content.trim() });
};

defineExpose({ reset });
</script>

<template>
  <form class="border-4 border-black bg-white p-5 shadow-brutal" @submit.prevent="onSubmit">
    <h2 class="font-display text-sm uppercase tracking-wide">
      {{ editing ? 'Ubah Catatan' : 'Catatan Produk Baru' }}
    </h2>

    <div class="mt-4 space-y-4">
      <FormField label="Judul" html-for="note-title" :error="errors.title" required>
        <BaseInput
          id="note-title"
          v-model="form.title"
          placeholder="Contoh: Resep batch pagi"
          :invalid="Boolean(errors.title)"
        />
      </FormField>

      <FormField label="Isi Catatan" html-for="note-content" :error="errors.content" required>
        <BaseTextarea
          id="note-content"
          v-model="form.content"
          :rows="4"
          placeholder="Tulis detail catatan produksi…"
          :invalid="Boolean(errors.content)"
        />
      </FormField>
    </div>

    <div class="mt-4 flex justify-end gap-2">
      <BaseButton v-if="editing" variant="outline" :disabled="saving" @click="reset">
        Batal
      </BaseButton>
      <BaseButton type="submit" variant="primary" :loading="saving" icon="check">
        {{ editing ? 'Simpan Catatan' : 'Tambah Catatan' }}
      </BaseButton>
    </div>
  </form>
</template>
