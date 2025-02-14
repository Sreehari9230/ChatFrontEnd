import React, { useEffect, useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
// import WebSocketService from "../Websocket/websocket";
import useWebSocketStore from "../store/useWebSocketStore";
import { format } from "date-fns";

const ChatBubbles = () => {
  const { chatId } = useChatStore();
  const { currentMessages, fetchChatMessages, fetchedMessages } =
    useWebSocketStore();
  let lastDate = null;
  const chatEndRef = useRef(null); // Ref to track the last message
  // const [wsService, setWsService] = useState(null);

  useEffect(() => {
    if (chatId) {
      fetchChatMessages(chatId);
    }
  }, [chatId, fetchChatMessages]);

  // Scroll to bottom when messages update
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [fetchedMessages, currentMessages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {fetchedMessages.length === 0 ? (
        <p className="text-center text-gray-500">No previous chat</p>
      ) : (
        fetchedMessages.map((msg, index) => {
          const msgDate = format(new Date(msg.timestamp), "yyyy-MM-dd");
          const showDateSeparator = lastDate !== msgDate;
          lastDate = msgDate;

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
                  {msg.message ? (
                    <p>{msg.message}</p>
                  ) : msg.form ? (
                    <div className="space-y-1">
                      {Object.entries(msg.form).map(([key, value]) => (
                        <p key={key}>
                          <strong>{key}:</strong> {value}
                        </p>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No content</p>
                  )}
                </div>
              </div>
            </div>
          );
        })
      )}

      {currentMessages.length === 0 ? (
        <p className="text-center text-gray-500">No current chat</p>
      ) : (
        currentMessages.map((msg, index) => {
          const isUserMessage =
            msg.action === "chat_manually" || msg.action === "form";
          const messageText =
            typeof msg.message === "object" ? msg.message.message : msg.message;

          return (
            <div
              key={index}
              className={`chat ${isUserMessage ? "chat-end" : "chat-start"}`}
            >
              <div className="chat-header mb-1">
                <time className="text-xs opacity-50 ml-1">
                  timestampNotGiven
                </time>
              </div>
              <div className="chat-bubble flex flex-col">
                <p>{messageText}</p>
              </div>
            </div>
          );
        })
      )}

      {/* Empty div for auto scroll */}
      <div ref={chatEndRef}></div>
    </div>
  );
};

export default ChatBubbles;
