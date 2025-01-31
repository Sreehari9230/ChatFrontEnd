import React, { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";

// Chat History Modal Component
const ChatHistoryModal = ({ chats, onClose }) => {
  const { chatHistory, isChatHistoryLoading } = useChatStore();

  // Log chatHistory to check if it's being updated
  useEffect(() => {
    console.log(chatHistory, "inside chat history modal");
  }, [chatHistory]); // Runs whenever chatHistory changes

  return (
    <div className="modal modal-open">
      <div className="modal-box w-96">
        <h3 className="font-bold text-lg">Chat History</h3>
        <ul className="space-y-2 mt-4">
          {isChatHistoryLoading ? (
            <p className="text-sm text-gray-500">Loading chat history...</p> // Loading state
          ) : chatHistory.length > 0 ? (
            chatHistory.map((chat, index) => (
              <li
                key={chat.id} // Use the unique 'id' as the key for better performance
                className="p-3 bg-base-200 rounded-md shadow-sm hover:bg-base-300 transition"
              >
                <p>
                  <strong>Chat ID:</strong> {chat.id}
                </p>
                <p>
                  <strong>Created At:</strong>{" "}
                  {new Date(chat.created_at).toLocaleString()}
                </p>
              </li>
            ))
          ) : (
            <p className="text-sm text-gray-500">No chats available.</p> // Empty state
          )}
        </ul>
        <div className="modal-action">
          <button onClick={onClose} className="btn btn-primary w-full">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatHistoryModal;
