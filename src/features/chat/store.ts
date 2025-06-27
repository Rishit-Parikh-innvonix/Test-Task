import { create } from 'zustand';
import { Message } from './chat';

interface WebSocketStore {
  ws: WebSocket | null;
  isConnected: boolean;
  connect: (url: string) => void;
  disconnect: () => void;
  sendMessage: (msg: Message, id: any) => void;
  onMessage: (cb: (msg: Message) => void) => void;
}

let messageCallback: ((msg: Message) => void) | null = null;

export const useWebSocketStore = create<WebSocketStore>((set, get) => ({
  ws: null,
  isConnected: false,

  connect: (url: string) => {
    console.log('[WS] Connected:', url);

    if (get().isConnected || get().ws) return;
    const ws = new WebSocket(url);
    ws.onopen = () => {
      set({ ws, isConnected: true });
    };

    ws.onclose = () => {
      console.log('[WS] Disconnected');
      set({ ws: null, isConnected: false });
    };

    ws.onerror = e => {
      console.error('[WS] Error:', e);
    };

    ws.onmessage = event => {
      try {
        const msg = JSON.parse(event.data);
        if (messageCallback) messageCallback(msg);
      } catch (e) {
        console.warn('[WS] Invalid message:', event.data);
      }
    };
  },

  disconnect: () => {
    get().ws?.close();
    set({ ws: null, isConnected: false });
  },

  sendMessage: (msg: Message, conversationId?: number) => {
    const socket = get().ws;
    if (socket?.readyState !== WebSocket.OPEN) {
      console.warn('[WS] Not connected');
      return;
    }

    const payload: any = {
      message: msg.text,
    };
    if (conversationId) {
      payload.conversation_id = conversationId;
    }

    socket.send(JSON.stringify(payload));
    console.log('[WS] Sent:', payload);
  },

  onMessage: cb => {
    messageCallback = cb;
  },
}));
