import { create } from "zustand";

const useWebSocketStore = create((set, get) => ({
  ws: null,
  currentMessages: [],
  fetchedMessages: [],
  isConnected: false,
  responseIsThinking: true,

  connect: (chatId) => {
    if (!chatId) {
        console.error("WebSocketStore: chatId is missing.");
        return;
    }

    // Close existing connection if any
    const existingWs = get().ws;
    if (existingWs) {
        existingWs.close();
    }

    // Clear messages before reconnecting
    set({ currentMessages: [], fetchedMessages: [] });

    const ws = new WebSocket(`wss://v5dmsmd1-8000.inc1.devtunnels.ms/ws/messages/${chatId}/`);

    ws.onopen = () => {
        console.log("✅ WebSocket Connected");
        set({ isConnected: true });
        get().fetchChatMessages(); // Fetch chat history when connected
    };

    ws.onmessage = (event) => {
        try {
            const data = JSON.parse(event.data);
            console.log("📩 Message received:", data);

            if (data.action === "show_messages" && Array.isArray(data.messages)) {
                set({ fetchedMessages: data.messages });
            } else if (data.action === "new_message") {
                set((state) => ({
                    currentMessages: [...state.currentMessages, data],
                    responseIsThinking: false,
                }));
            }
        } catch (error) {
            console.error("❌ Error parsing WebSocket message:", error);
        }
    };

    ws.onerror = (error) => console.error("❌ WebSocket Error:", error);

    ws.onclose = (closeEvent) => {
        console.log("🔴 WebSocket Disconnected", closeEvent.code, closeEvent.reason);
        set({ isConnected: false });

        if (![1000, 1006].includes(closeEvent.code)) {
            setTimeout(() => get().connect(chatId), 3000);
        }
    };

    set({ ws });
},

  sendMessage: (message) => {
    const ws = get().ws;
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(message));
      console.log("📤 Message sent:", message);
      // Push sent message to currentMessages
      set((state) => ({ currentMessages: [...state.currentMessages, message] }));
      // Set responseIsThinking to true only for "chat_manually" or "form" actions
      if (message.action === "chat_manually" || message.action === "form") {
        set({ responseIsThinking: true });
      }
      // Push to currentMessages only if action is "chat_manually" or "form"
      //   if (message.action === "chat_manually" || message.action === "form") {
      //     set((state) => ({ currentMessages: [...state.currentMessages, message] }));
      //   }
      // } else {
      //   console.error("❌ WebSocket is not open.");
      // }
    } else {
      console.error("❌ WebSocket is not open.");
    }
  },

  fetchChatMessages: () => {
    const ws = get().ws;
    if (ws && ws.readyState === WebSocket.OPEN) {
      // Clear fetchedMessages before sending the request
      set({ fetchedMessages: [] });

      const message = { action: "fetch_messages" };
      ws.send(JSON.stringify(message));
      console.log("📤 Sent request to fetch chat messages:", message);
    } else {
      console.error("❌ WebSocket is not open.");
    }
  },

  closeConnection: () => {
    const ws = get().ws;
    if (ws) {
      ws.close();
      set({ ws: null, isConnected: false });
    }
  },
}));

export default useWebSocketStore;
