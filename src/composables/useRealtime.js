import { onBeforeUnmount, onMounted, ref } from 'vue';
import { SOCKET_EVENTS } from '@/services/events';
import { socketService } from '@/services/socket.service';
import { useDashboardStore } from '@/stores/dashboard.store';
import { usePhotoStore } from '@/stores/photo.store';
import { useProductionStore } from '@/stores/production.store';
import { useStockStore } from '@/stores/stock.store';

export const useRealtime = () => {
  const stock = useStockStore();
  const production = useProductionStore();
  const photo = usePhotoStore();
  const dashboard = useDashboardStore();
  const connected = ref(false);

  const onStockUpdated = (payload = {}) => {
    if (payload.item) stock.upsert(payload.item);
    if (payload.id) stock.removeById(payload.id);
    dashboard.refresh();
  };

  const onProductionCreated = (payload = {}) => {
    if (payload.production) production.addFromRealtime(payload.production);
    dashboard.refresh();
  };

  const onPhotoCreated = (payload = {}) => {
    if (payload.photo) photo.addFromRealtime(payload.photo);
  };

  const onDashboardRefresh = () => {
    dashboard.refresh();
  };

  const handlers = [
    [SOCKET_EVENTS.stockUpdated, onStockUpdated],
    [SOCKET_EVENTS.productionCreated, onProductionCreated],
    [SOCKET_EVENTS.photoCreated, onPhotoCreated],
    [SOCKET_EVENTS.dashboardRefresh, onDashboardRefresh],
  ];

  onMounted(() => {
    for (const [event, handler] of handlers) {
      socketService.on(event, handler);
    }
    const socket = socketService.connect();
    if (socket) {
      connected.value = socket.connected;
      socket.on('connect', () => {
        connected.value = true;
      });
      socket.on('disconnect', () => {
        connected.value = false;
      });
    }
  });

  onBeforeUnmount(() => {
    for (const [event, handler] of handlers) {
      socketService.off(event, handler);
    }
  });

  return { connected };
};
