import { create } from "zustand";
import WebSocketService from "../services/WebSocketService";

const useWebSocketStore = create((set, get) => ({
  wsService: null,
  isConnected: false,
  messages: [],
  chatId: null, // Store chat ID globally

  setChatId: (id) => set({ chatId: id }),

  connectWebSocket: (chatId) => {
    if (!chatId) return;

    const existingService = get().wsService;
    if (existingService) {
      existingService.close(); // Close existing connection before reconnecting
    }

    const service = new WebSocketService(
      chatId,
      (data) => get().handleMessageReceived(data),
      (status) => set({ isConnected: status })
    );

    service.connect();
    set({ wsService: service });
  },

  handleMessageReceived: (data) => {
    try {
      const parsedData = JSON.parse(data);
      set((state) => ({
        messages: [...state.messages, parsedData],
      }));
    } catch (error) {
      console.error("❌ Error parsing WebSocket message:", error);
    }
  },

  sendMessage: (message) => {
    const { wsService } = get();
    if (wsService) {
      wsService.sendMessage({ action: "chat_manually", message });
      set((state) => ({
        messages: [...state.messages, { type: "sent", content: message }],
      }));
    }
  },

  fetchChatMessages: () => {
    const { wsService } = get();
    if (wsService) {
      wsService.fetchChatMessages();
    }
  },

  disconnectWebSocket: () => {
    const { wsService } = get();
    if (wsService) {
      wsService.close();
      set({ wsService: null, isConnected: false });
    }
  },
}));

export default useWebSocketStore;
