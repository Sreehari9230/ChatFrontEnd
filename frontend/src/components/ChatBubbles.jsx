import React, { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import WebSocketService from "../Websocket/websocket";

const ChatBubbles = () => {
  const { chatId } = useChatStore();
  const [messages, setMessages] = useState([]);
  const [wsService, setWsService] = useState(null);

  // useEffect(() => {
  //   if (!chatId) return;
  
  //   const service = new WebSocketService(
  //     chatId,
  //     (data) => handleWebSocketMessage(data),
  //     () => console.log("✅ WebSocket connected"),
  //     () => console.log("❌ WebSocket disconnected")
  //   );
  
  //   service.connect();
  //   setWsService(service);
  
  //   return () => service.close();
  // }, [chatId]);
  
  // Function to handle messages
 
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
      setMessages(data.messages);
    }
  };
  
  // // Call this function when you need to fetch chat messages
  // const fetchMessages = () => {
  //   if (wsService) {
  //     wsService.fetchChatMessages();
  //   }
  // };

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((msg) => (
        <div
          key={msg._id}
          className={`chat ${msg.user === "user" ? "chat-end" : "chat-start"}`}
        >
          <div className="chat-header mb-1">
            <time className="text-xs opacity-50 ml-1">
              {new Date(msg.timestamp).toLocaleTimeString()}
            </time>
          </div>
          <div className="chat-bubble flex flex-col">
            {msg.Type === "link" ? (
              <a
                href={msg.message}
                className="text-blue-500 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {msg.message}
              </a>
            ) : (
              <p>{msg.message}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatBubbles;
