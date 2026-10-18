<script setup>
import { computed, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import BaseButton from '@/components/atoms/BaseButton.vue';
import BaseInput from '@/components/atoms/BaseInput.vue';
import Icon from '@/components/atoms/Icon.vue';
import FormField from '@/components/molecules/FormField.vue';
import AuthLayout from '@/components/templates/AuthLayout.vue';
import { useAuth } from '@/composables/useAuth';
import { useToast } from '@/composables/useToast';

const route = useRoute();
const router = useRouter();
const toast = useToast();
const { login, register, loading } = useAuth();

const mode = ref('login');
const formError = ref('');
const form = reactive({
  name: '',
  businessName: '',
  email: '',
  password: '',
  dailyTarget: 50,
});
const errors = reactive({});

const isRegister = computed(() => mode.value === 'register');

const switchMode = (next) => {
  mode.value = next;
  formError.value = '';
  Object.keys(errors).forEach((key) => {
    errors[key] = '';
  });
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validate = () => {
  errors.email = emailPattern.test(form.email.trim()) ? '' : 'Email tidak valid';
  errors.password =
    form.password.length >= (isRegister.value ? 8 : 1)
      ? ''
      : isRegister.value
        ? 'Kata sandi minimal 8 karakter'
        : 'Kata sandi wajib diisi';

  if (isRegister.value) {
    errors.name = form.name.trim() ? '' : 'Nama wajib diisi';
    errors.businessName = form.businessName.trim() ? '' : 'Nama usaha wajib diisi';
  }

  return Object.values(errors).every((value) => !value);
};

const submit = async () => {
  formError.value = '';
  if (!validate()) return;

  try {
    if (isRegister.value) {
      await register({
        name: form.name.trim(),
        businessName: form.businessName.trim(),
        email: form.email.trim(),
        password: form.password,
        dailyTarget: Number(form.dailyTarget) || 50,
      });
      toast.success('Akun berhasil dibuat. Selamat datang!');
    } else {
      await login({ email: form.email.trim(), password: form.password });
      toast.success('Berhasil masuk');
    }
    const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : '/';
    router.replace(redirect);
  } catch (error) {
    formError.value = error.message || 'Terjadi kesalahan, coba lagi.';
  }
};
</script>

<template>
  <AuthLayout>
    <div class="grid overflow-hidden border-4 border-black bg-white shadow-brutal-lg md:grid-cols-2">
      <section class="flex flex-col justify-between bg-blue p-8 text-white">
        <div>
          <div class="inline-flex items-center gap-2 border-3 border-black bg-yellow px-3 py-1 text-black">
            <Icon name="box" :size="18" />
            <span class="font-display text-sm uppercase tracking-wide">StokKu</span>
          </div>
          <h1 class="mt-8 font-display text-4xl leading-none">
            Catat produksi & stok tanpa ribet.
          </h1>
          <p class="mt-4 font-body text-sm text-white/90">
            Ganti buku tulis dengan pencatatan digital: stok, keluaran, foto produk, dan
            keuntungan dalam satu tempat.
          </p>
        </div>
        <ul class="mt-8 space-y-2 font-mono text-xs uppercase">
          <li class="flex items-center gap-2"><Icon name="check" :size="16" /> Stok real-time</li>
          <li class="flex items-center gap-2"><Icon name="check" :size="16" /> Foto produk</li>
          <li class="flex items-center gap-2"><Icon name="check" :size="16" /> Laporan keuntungan</li>
        </ul>
      </section>

      <section class="p-6 sm:p-8">
        <div class="flex border-3 border-black">
          <button
            type="button"
            class="flex-1 py-2.5 font-display text-xs uppercase tracking-wide transition-colors"
            :class="mode === 'login' ? 'bg-black text-white' : 'bg-white text-black'"
            @click="switchMode('login')"
          >
            Masuk
          </button>
          <button
            type="button"
            class="flex-1 border-l-3 border-black py-2.5 font-display text-xs uppercase tracking-wide transition-colors"
            :class="mode === 'register' ? 'bg-black text-white' : 'bg-white text-black'"
            @click="switchMode('register')"
          >
            Daftar
          </button>
        </div>

        <form class="mt-6 space-y-4" @submit.prevent="submit">
          <template v-if="isRegister">
            <FormField label="Nama" html-for="au-name" :error="errors.name" required>
              <BaseInput id="au-name" v-model="form.name" placeholder="Nama Anda" :invalid="Boolean(errors.name)" />
            </FormField>
            <FormField label="Nama Usaha" html-for="au-biz" :error="errors.businessName" required>
              <BaseInput
                id="au-biz"
                v-model="form.businessName"
                placeholder="Contoh: Warung Budi"
                :invalid="Boolean(errors.businessName)"
              />
            </FormField>
          </template>

          <FormField label="Email" html-for="au-email" :error="errors.email" required>
            <BaseInput
              id="au-email"
              v-model="form.email"
              type="email"
              autocomplete="email"
              placeholder="nama@usaha.id"
              :invalid="Boolean(errors.email)"
            />
          </FormField>

          <FormField
            label="Kata Sandi"
            html-for="au-pass"
            :error="errors.password"
            :hint="isRegister ? 'Minimal 8 karakter' : ''"
            required
          >
            <BaseInput
              id="au-pass"
              v-model="form.password"
              type="password"
              :autocomplete="isRegister ? 'new-password' : 'current-password'"
              placeholder="••••••••"
              :invalid="Boolean(errors.password)"
            />
          </FormField>

          <FormField
            v-if="isRegister"
            label="Target Produksi Harian"
            html-for="au-target"
            hint="Bisa diubah nanti"
          >
            <BaseInput id="au-target" v-model="form.dailyTarget" type="number" min="0" />
          </FormField>

          <p
            v-if="formError"
            class="border-3 border-black bg-yellow px-3 py-2 font-mono text-xs uppercase"
            role="alert"
          >
            {{ formError }}
          </p>

          <BaseButton type="submit" block size="lg" :loading="loading" icon="check">
            {{ isRegister ? 'Buat Akun' : 'Masuk' }}
          </BaseButton>
        </form>

        <p class="mt-4 text-center font-body text-xs text-black/60">
          {{ isRegister ? 'Sudah punya akun?' : 'Belum punya akun?' }}
          <button
            type="button"
            class="font-display uppercase underline"
            @click="switchMode(isRegister ? 'login' : 'register')"
          >
            {{ isRegister ? 'Masuk' : 'Daftar' }}
          </button>
        </p>
      </section>
    </div>
  </AuthLayout>
</template>
