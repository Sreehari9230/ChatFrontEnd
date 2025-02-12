import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import useWebSocketStore from "../store/useWebSocketStore";

const ChatBubbles = () => {
  const { chatId } = useChatStore();
  const { messages, fetchMessages } = useWebSocketStore(); // ✅ Get fetchMessages

  useEffect(() => {
    if (chatId) {
      fetchMessages(chatId); // ✅ Fetch messages when chatId changes
    }
  }, [chatId, fetchMessages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.length > 0 ? (
        messages.map((msg, index) => (
          <div key={index} className="p-2 border rounded-lg bg-gray-100">
            <p>
              <strong>{msg.user}:</strong> {msg.message || JSON.stringify(msg.form, null, 2)}
            </p>
          </div>
        ))
      ) : (
        <p>No messages yet.</p>
      )}
    </div>
  );
};

export default ChatBubbles;
