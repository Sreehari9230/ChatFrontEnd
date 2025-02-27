import React, { useState } from "react";
import { useChatStore } from "../store/useChatStore";

const RaiseATicketModal = ({ isOpen, onClose }) => {
  const [message, setMessage] = useState("");
  const { postTicket } = useChatStore();

  const handleSubmitButton = () => {
    postTicket(message);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <div className="bg-base-100 p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Raise a Ticket</h2>

        <textarea
          // className="textarea textarea-bordered w-full h-32"
          className="textarea textarea-secondary w-full h-32"
          placeholder="Describe your issue..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <div className="flex justify-end gap-2 mt-4">
          <button className="btn btn-outline" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              console.log("Submitted ticket:", message);
              handleSubmitButton(); // Call the function
              onClose(); // Close the modal
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default RaiseATicketModal;
