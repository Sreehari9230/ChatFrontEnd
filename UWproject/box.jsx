import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import useWebSocketStore from "../store/useWebSocketStore";
import { format } from "date-fns";

// Import the helper function
// import { parseBoxMessage } from "../utils";

const ChatBubbles = () => {
  const { chatId } = useChatStore();
  const { fetchChatMessages, fetchedMessages } = useWebSocketStore();
  let lastDate = null;

  useEffect(() => {
    if (chatId) {
      fetchChatMessages(chatId);
    }
  }, [chatId, fetchChatMessages]);

  const parseBoxMessage = (message) => {
    try {
      return message ? JSON.parse(message) : null;
    } catch (error) {
      console.error("Error parsing box message:", error);
      return null;
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {fetchedMessages.length === 0 ? (
        <p className="text-center text-gray-500">No previous chat</p>
      ) : (
        fetchedMessages.map((msg, index) => {
          const msgDate = format(new Date(msg.timestamp), "yyyy-MM-dd");
          const showDateSeparator = lastDate !== msgDate;
          lastDate = msgDate;

          // Parse box-type messages using the helper function
          const parsedBoxMessage =
            msg.Type === "box" ? parseBoxMessage(msg.message) : null;

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
                  {parsedBoxMessage ? (
                    <table className="border border-gray-300 w-full text-sm">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border px-2 py-1">Task</th>
                          <th className="border px-2 py-1">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(parsedBoxMessage).map(
                          ([key, value]) => (
                            <tr key={key} className="border">
                              <td className="border px-2 py-1">{key}</td>
                              <td className="border px-2 py-1">{value}</td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  ) : msg.message ? (
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
    </div>
  );
};

export default ChatBubbles;
