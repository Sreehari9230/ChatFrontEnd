import React, { useState } from "react";
import { useChatStore } from "../store/useChatStore";

// Chat History Modal Component
const ChatHistoryModal = ({ chats, onClose }) => {
  const { chatHistory } = useChatStore();

  return (
    <div className="modal modal-open">
      <div className="modal-box w-96">
        <h3 className="font-bold text-lg">Chat History</h3>
        <ul className="space-y-2 mt-4">
          {/* Uncomment and adapt the following lines when dynamic chat history is available */}
          {/* {chats.length > 0 ? (
        chats.map((chat, index) => (
          <li
            key={index}
            className="p-3 bg-base-200 rounded-md shadow-sm hover:bg-base-300 transition"
          >
            {chat}
          </li>
        ))
      ) : ( */}
          <p className="text-sm text-gray-500">No chats available.</p>
          {/* )} */}
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
