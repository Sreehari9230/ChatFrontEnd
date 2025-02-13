import React, { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import WebSocketService from "../Websocket/websocket";
import useWebSocketStore from "../store/useWebSocketStore";
import { formatMessageTime } from "../lib/utils";

const ChatBubbles = () => {
  const { chatId } = useChatStore();
  const [wsService, setWsService] = useState(null);
  const { messages, fetchChatMessages, fetchedMessages } = useWebSocketStore(); // ✅ Get fetchMessages

  useEffect(() => {
    if (chatId) {
      fetchChatMessages(chatId); // ✅ Fetch messages when chatId changes
    }
  }, [chatId, fetchChatMessages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {fetchedMessages.length === 0 ? (
        <p className="text-center text-gray-500">No previous chat</p>
      ) : (
        fetchedMessages.map((msg, index) => (
          <div
            key={msg._id || index}
            className={`chat ${msg.user === "AI" ? "chat-start" : "chat-end"}`}
          >
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(msg.timestamp)}
              </time>
            </div>
            <div className="chat-bubble flex flex-col">
              <p>{msg.message}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ChatBubbles;
