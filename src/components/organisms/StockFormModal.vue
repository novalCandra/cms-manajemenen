<script setup>
import { reactive, ref, watch } from 'vue';
import BaseButton from '@/components/atoms/BaseButton.vue';
import BaseInput from '@/components/atoms/BaseInput.vue';
import Icon from '@/components/atoms/Icon.vue';
import FormField from '@/components/molecules/FormField.vue';

const props = defineProps({
  open: { type: Boolean, default: false },
  item: { type: Object, default: null },
  saving: { type: Boolean, default: false },
});

const emit = defineEmits(['close', 'submit']);

const blank = () => ({
  name: '',
  sku: '',
  unit: 'pcs',
  stock: 0,
  minStock: 0,
  cost: 0,
  price: 0,
});

const form = reactive(blank());
const errors = reactive({});
const touched = ref(false);

const isEdit = () => Boolean(props.item);

watch(
  () => [props.open, props.item],
  () => {
    if (!props.open) return;
    const source = props.item ? { ...props.item } : blank();
    Object.assign(form, {
      name: source.name ?? '',
      sku: source.sku ?? '',
      unit: source.unit ?? 'pcs',
      stock: source.stock ?? 0,
      minStock: source.minStock ?? 0,
      cost: source.cost ?? 0,
      price: source.price ?? 0,
    });
    touched.value = false;
    Object.keys(errors).forEach((key) => {
      errors[key] = '';
    });
  },
  { immediate: true },
);

const validate = () => {
  errors.name = form.name.trim() ? '' : 'Nama barang wajib diisi';
  errors.unit = form.unit.trim() ? '' : 'Satuan wajib diisi';
  errors.stock = Number(form.stock) >= 0 ? '' : 'Stok tidak boleh negatif';
  errors.minStock = Number(form.minStock) >= 0 ? '' : 'Stok minimum tidak boleh negatif';
  errors.cost = Number(form.cost) >= 0 ? '' : 'Harga modal tidak boleh negatif';
  errors.price = Number(form.price) >= 0 ? '' : 'Harga jual tidak boleh negatif';
  return Object.values(errors).every((value) => !value);
};

const onSubmit = () => {
  touched.value = true;
  if (!validate()) return;
  emit('submit', {
    name: form.name.trim(),
    sku: form.sku.trim() || null,
    unit: form.unit.trim(),
    stock: Number(form.stock),
    minStock: Number(form.minStock),
    cost: Number(form.cost),
    price: Number(form.price),
  });
};
</script>

<template>
  <Transition
    enter-active-class="transition duration-150"
    enter-from-class="opacity-0"
    leave-active-class="transition duration-150"
    leave-to-class="opacity-0"
  >
    <div
      v-if="open"
      class="fixed inset-0 z-[55] flex items-start justify-center overflow-y-auto p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
    >
      <div class="absolute inset-0 bg-black/50" @click="emit('close')" />
      <form
        class="relative z-10 my-4 w-full max-w-xl border-4 border-black bg-white p-5 shadow-brutal"
        @submit.prevent="onSubmit"
      >
        <header class="flex items-center justify-between gap-3">
          <h2 class="font-display text-lg uppercase tracking-tight">
            {{ isEdit() ? 'Ubah Barang' : 'Tambah Barang' }}
          </h2>
          <button
            type="button"
            class="border-3 border-black bg-white p-1.5 shadow-brutal-sm"
            aria-label="Tutup"
            @click="emit('close')"
          >
            <Icon name="close" :size="18" />
          </button>
        </header>

        <div class="mt-4 grid gap-4 sm:grid-cols-2">
          <div class="sm:col-span-2">
            <FormField label="Nama Barang" html-for="it-name" :error="errors.name" required>
              <BaseInput
                id="it-name"
                v-model="form.name"
                placeholder="Contoh: Kopi Bubuk 250g"
                :invalid="Boolean(errors.name)"
              />
            </FormField>
          </div>

          <FormField label="Kode / SKU" html-for="it-sku" hint="Opsional">
            <BaseInput id="it-sku" v-model="form.sku" placeholder="SKU-001" />
          </FormField>

          <FormField label="Satuan" html-for="it-unit" :error="errors.unit" required>
            <BaseInput id="it-unit" v-model="form.unit" placeholder="pcs" :invalid="Boolean(errors.unit)" />
          </FormField>

          <FormField label="Stok Saat Ini" html-for="it-stock" :error="errors.stock" required>
            <BaseInput
              id="it-stock"
              v-model="form.stock"
              type="number"
              min="0"
              :invalid="Boolean(errors.stock)"
            />
          </FormField>

          <FormField label="Stok Minimum" html-for="it-min" :error="errors.minStock" required>
            <BaseInput
              id="it-min"
              v-model="form.minStock"
              type="number"
              min="0"
              :invalid="Boolean(errors.minStock)"
            />
          </FormField>

          <FormField label="Harga Modal" html-for="it-cost" :error="errors.cost" required>
            <BaseInput
              id="it-cost"
              v-model="form.cost"
              type="number"
              min="0"
              :invalid="Boolean(errors.cost)"
            />
          </FormField>

          <FormField label="Harga Jual" html-for="it-price" :error="errors.price" required>
            <BaseInput
              id="it-price"
              v-model="form.price"
              type="number"
              min="0"
              :invalid="Boolean(errors.price)"
            />
          </FormField>
        </div>

        <div class="mt-5 flex justify-end gap-2">
          <BaseButton variant="outline" :disabled="saving" @click="emit('close')">Batal</BaseButton>
          <BaseButton type="submit" variant="primary" :loading="saving" icon="check">
            {{ isEdit() ? 'Simpan Perubahan' : 'Tambah Barang' }}
          </BaseButton>
        </div>
      </form>
    </div>
  </Transition>
</template>
