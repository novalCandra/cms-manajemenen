import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth.store';

export const useAuth = () => {
  const store = useAuthStore();
  const { user, loading, error, isAuthenticated, ready } = storeToRefs(store);

  return {
    user,
    loading,
    error,
    isAuthenticated,
    ready,
    login: (payload) => store.login(payload),
    register: (payload) => store.register(payload),
    logout: () => store.logout(),
    bootstrap: () => store.bootstrap(),
  };
};
