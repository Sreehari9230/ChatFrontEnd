import React, { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Plus, X } from "lucide-react";

const ChatHistoryModal = ({ chats, onClose }) => {
  const { chatHistory, isChatHistoryLoading, updateChatId } = useChatStore();

  useEffect(() => {
    console.log(chatHistory, "inside chat history modal");
  }, [chatHistory]);

  return (
    <div className="modal modal-open">
      <div className="modal-box w-96 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <X size={30} />
        </button>

        <h3 className="font-bold text-lg text-center">Chat History</h3>

        <ul className="space-y-2 mt-4">
          {isChatHistoryLoading ? (
            <p className="text-sm text-gray-500">Loading chat history...</p>
          ) : chatHistory.length > 0 ? (
            chatHistory
              .slice()
              .reverse()
              .map((chat) => (
                <li
                  onClick={() => {
                    onClose();
                    updateChatId(chat.id);
                  }}
                  key={chat.id}
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
            <p className="text-sm text-gray-500">No chats available.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ChatHistoryModal;
