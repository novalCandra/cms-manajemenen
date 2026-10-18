import { io } from 'socket.io-client';
import { getAccessToken } from '@/api/client';

const socketUrl = import.meta.env.VITE_SOCKET_URL || undefined;

let socket = null;
const listeners = new Map();

const bindListeners = () => {
  if (!socket) return;
  for (const [event, handlers] of listeners.entries()) {
    for (const handler of handlers) {
      socket.on(event, handler);
    }
  }
};

export const socketService = {
  connect() {
    const token = getAccessToken();
    if (!token) return null;
    this.disconnect();
    socket = io(socketUrl, {
      withCredentials: true,
      transports: ['websocket', 'polling'],
      auth: { token },
      reconnectionAttempts: 5,
    });
    bindListeners();
    return socket;
  },

  disconnect() {
    if (socket) {
      socket.removeAllListeners();
      socket.disconnect();
      socket = null;
    }
  },

  on(event, handler) {
    if (!listeners.has(event)) listeners.set(event, new Set());
    listeners.get(event).add(handler);
    if (socket) socket.on(event, handler);
  },

  off(event, handler) {
    listeners.get(event)?.delete(handler);
    if (socket) socket.off(event, handler);
  },

  get isConnected() {
    return Boolean(socket?.connected);
  },
};
