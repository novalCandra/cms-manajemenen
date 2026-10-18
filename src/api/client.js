import axios from 'axios';
import { normalizeApiError } from './errors';

const origin = import.meta.env.VITE_API_BASE_URL || '';
export const apiBaseURL = `${origin.replace(/\/$/, '')}/api`;

export const apiClient = axios.create({
  baseURL: apiBaseURL,
  withCredentials: true,
  timeout: 20000,
  headers: { Accept: 'application/json' },
});

const bareClient = axios.create({
  baseURL: apiBaseURL,
  withCredentials: true,
  timeout: 20000,
});

let accessToken = null;
let unauthorizedHandler = () => {};

export const setAccessToken = (token) => {
  accessToken = token ?? null;
};

export const getAccessToken = () => accessToken;

export const setUnauthorizedHandler = (handler) => {
  unauthorizedHandler = typeof handler === 'function' ? handler : () => {};
};

apiClient.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

let refreshPromise = null;

const refreshAccessToken = () => {
  if (!refreshPromise) {
    refreshPromise = bareClient
      .post('/auth/refresh')
      .then((response) => {
        const token = response.data?.data?.accessToken ?? null;
        setAccessToken(token);
        return token;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
};

const isAuthEndpoint = (url = '') => /\/auth\/(login|register|refresh|logout)/.test(url);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config ?? {};
    const status = error.response?.status;
    const shouldRefresh = status === 401 && !config._retry && !isAuthEndpoint(config.url);

    if (shouldRefresh) {
      config._retry = true;
      try {
        const token = await refreshAccessToken();
        if (token) {
          config.headers = { ...(config.headers ?? {}), Authorization: `Bearer ${token}` };
          return apiClient(config);
        }
      } catch {
        setAccessToken(null);
      }
      unauthorizedHandler();
    }

    return Promise.reject(normalizeApiError(error));
  },
);
