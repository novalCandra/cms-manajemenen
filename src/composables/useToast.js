import { useUiStore } from '@/stores/ui.store';

export const useToast = () => {
  const ui = useUiStore();
  return {
    push: (payload) => ui.push(payload),
    success: (message) => ui.success(message),
    error: (message) => ui.error(message),
    info: (message) => ui.info(message),
    dismiss: (id) => ui.dismiss(id),
  };
};
