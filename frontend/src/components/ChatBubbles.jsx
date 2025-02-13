import React, { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import WebSocketService from "../Websocket/websocket";
import useWebSocketStore from "../store/useWebSocketStore";
import { formatMessageTime } from "../lib/utils";
import { format } from "date-fns";

const ChatBubbles = () => {
  const { chatId } = useChatStore();
  const [wsService, setWsService] = useState(null);
  const { messages, fetchChatMessages, fetchedMessages } = useWebSocketStore(); // ✅ Get fetchMessages

  let lastDate = null;

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
        fetchedMessages.map((msg, index) => {
          const msgDate = format(new Date(msg.timestamp), "yyyy-MM-dd");
          const showDateSeparator = lastDate !== msgDate;
          lastDate = msgDate; // Update last seen date

          return (
            <div key={msg._id || index}>
              {/* Date Separator */}
              {showDateSeparator && (
                <div className="text-center text-gray-400 text-sm my-2">
                  {format(new Date(msg.timestamp), "MMMM d, yyyy")}
                </div>
              )}

              {/* Chat Message */}
              <div
                className={`chat ${
                  msg.user === "AI" ? "chat-start" : "chat-end"
                }`}
              >
                <div className="chat-header mb-1">
                  <time className="text-xs opacity-50 ml-1">
                    {format(new Date(msg.timestamp), "h:mm a")}
                  </time>
                </div>
                <div className="chat-bubble flex flex-col">
                  <p>{msg.message}</p>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default ChatBubbles;
