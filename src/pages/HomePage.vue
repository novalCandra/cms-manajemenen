<script setup>
import { onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import BaseButton from '@/components/atoms/BaseButton.vue';
import AiRecommendCard from '@/components/organisms/AiRecommendCard.vue';
import StockRow from '@/components/molecules/StockRow.vue';
import StatCard from '@/components/molecules/StatCard.vue';
import EmptyState from '@/components/molecules/EmptyState.vue';
import ErrorState from '@/components/molecules/ErrorState.vue';
import LoadingState from '@/components/molecules/LoadingState.vue';
import TargetProgressCard from '@/components/organisms/TargetProgressCard.vue';
import DashboardLayout from '@/components/templates/DashboardLayout.vue';
import { useDashboard } from '@/composables/useDashboard';
import { formatCurrency, formatNumber } from '@/utils/format';

const { snapshot, loading, error, loaded, fetch } = useDashboard();

onMounted(() => {
  fetch().catch(() => {});
});
</script>

<template>
  <DashboardLayout>
    <div class="space-y-6">
      <LoadingState v-if="loading && !loaded" message="Memuat ringkasan…" />

      <ErrorState
        v-else-if="error && !loaded"
        :message="error.message"
        @retry="fetch().catch(() => {})"
      />

      <template v-else>
        <TargetProgressCard
          :daily-target="snapshot.target.dailyTarget"
          :achieved="snapshot.target.achieved"
          :percent="snapshot.target.percent"
        />

        <div class="grid gap-4 sm:grid-cols-3">
          <StatCard
            label="Keluaran Hari Ini"
            :value="formatNumber(snapshot.today.output)"
            hint="unit barang"
            icon="box"
            tone="blue"
          />
          <StatCard
            label="Keuntungan Hari Ini"
            :value="formatCurrency(snapshot.today.profit)"
            hint="estimasi"
            icon="chart"
            tone="yellow"
          />
          <StatCard
            label="Transaksi"
            :value="formatNumber(snapshot.today.transactions)"
            hint="catatan hari ini"
            icon="note"
            tone="white"
          />
        </div>

        <section class="border-4 border-black bg-white p-5 shadow-brutal">
          <header class="flex items-center justify-between gap-3">
            <div>
              <h2 class="font-display text-sm uppercase tracking-wide">Stok Barang</h2>
              <p class="font-body text-xs text-black/60">
                {{ snapshot.lowStock.length }} barang perlu perhatian
              </p>
            </div>
            <RouterLink :to="{ name: 'stock' }">
              <BaseButton variant="secondary" size="sm" icon="box">Kelola Stok</BaseButton>
            </RouterLink>
          </header>

          <div v-if="snapshot.stocks.length === 0" class="mt-4">
            <EmptyState
              icon="box"
              title="Belum ada barang"
              message="Tambahkan barang di halaman Stok untuk mulai melacak."
            >
              <RouterLink :to="{ name: 'stock' }">
                <BaseButton variant="primary" size="sm" icon="plus">Tambah Barang</BaseButton>
              </RouterLink>
            </EmptyState>
          </div>

          <div v-else class="mt-4 space-y-2">
            <StockRow v-for="item in snapshot.stocks" :key="item.id" :item="item" />
          </div>
        </section>

        <AiRecommendCard />
      </template>
    </div>
  </DashboardLayout>
</template>
