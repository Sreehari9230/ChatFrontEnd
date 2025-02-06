class WebSocketService {
  constructor(chatId, onMessageReceived, onConnectionStatusChange) {
    this.chatId = chatId;
    this.ws = null;
    this.onMessageReceived = onMessageReceived;
    this.onConnectionStatusChange = onConnectionStatusChange;
  }

  connect() {
    if (!this.chatId) {
      console.error("WebSocketService: chatId is missing.");
      return;
    }

    this.ws = new WebSocket(`wss://v5dmsmd1-8000.inc1.devtunnels.ms/ws/messages/${this.chatId}/`);

    this.ws.onopen = () => {
      console.log("✅ WebSocket Connected");
      this.onConnectionStatusChange(true);
    };

    this.ws.onmessage = (event) => {
      console.log("📩 Message received:", event.data);
      this.onMessageReceived(event.data);
    };

    this.ws.onerror = (error) => {
      console.error("❌ WebSocket Error:", error);
    };

    this.ws.onclose = (closeEvent) => {
      console.log("🔴 WebSocket Disconnected", closeEvent.code, closeEvent.reason);
    
      // Attempt reconnection after a delay if the error is recoverable
      if (![1000, 1006].includes(closeEvent.code)) {
        setTimeout(() => {
          this.connect();
        }, 3000);
      }
    
      this.onConnectionStatusChange(false);
    };
  }

  sendMessage(message) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
      console.log("📤 Message sent:", message);
    } else {
      console.error("❌ WebSocket is not open.");
    }
  }

  close() {
    if (this.ws) {
      this.ws.close();
      console.log("🛑 WebSocket Closed");
    }
  }
}

export default WebSocketService;
