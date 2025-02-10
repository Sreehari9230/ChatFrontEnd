import React, { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import WebSocketService from "../Websocket/websocket";

const ChatBubbles = () => {
  const { chatId } = useChatStore();
  const [messages, setMessages] = useState([]);
  const [wsService, setWsService] = useState(null);
 
  useEffect(() => {
    if (!chatId) return;
  
    const service = new WebSocketService(
      chatId,
      (data) => handleWebSocketMessage(data),
      () => {
        console.log("✅ WebSocket connected");
        service.fetchChatMessages(); // Automatically fetch chat messages when connected
      },
      () => console.log("❌ WebSocket disconnected")
    );
  
    service.connect();
    setWsService(service);
  
    return () => service.close();
  }, [chatId]);
  
  const handleWebSocketMessage = (data) => {
    if (data.action === "show_messages") {
      console.log("📩 Received chat history:", data.messages);
      setMessages([...data.messages]); // Ensure a new array reference
    }
  };
  
  // Log messages after it updates
  useEffect(() => {
    console.log("✅ Messages updated:", messages);
  }, [messages]); // Runs whenever messages state updates
  

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
  <div className="flex-1 overflow-y-auto p-4 space-y-4">
    {messages.length > 0 ? (
      messages.map((msg) => (
        <div key={msg._id} className="p-2 border rounded-lg bg-gray-100">
          <p><strong>{msg.user}:</strong> {msg.message || JSON.stringify(msg.form, null, 2)}</p>
        </div>
      ))
    ) : (
      <p>No messages yet.</p>
    )}
  </div>
    </div>
  );
};

export default ChatBubbles;
