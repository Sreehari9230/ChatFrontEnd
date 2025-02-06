import React, { useState, useRef, useEffect, useCallback } from "react";
import { useChatStore } from "../store/useChatStore";
import {
  Image,
  Paperclip,
  Plus,
  Send,
  Share,
  Wifi,
  WifiOff,
} from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const {
    // sendMessage
    teamSelcted,
    getNewChat,
    chatId
  } = useChatStore();

  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const socketRef = useRef(null);

  useEffect(() => {
    const ws = new WebSocket(
      `wss://v5dmsmd1-8000.inc1.devtunnels.ms/ws/messages/${chatId}/`
    );

    ws.onopen = () => {
      console.log("WebSocket Connected");
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      console.log("Received message:", event.data);
      const data = JSON.parse(event.data);
      let responseContent = "";

      if (data.action === "form_response") {
        if (data.response && data.response.message_id) {
          responseContent = data.response.message_id;
        } else if (data.response && typeof data.response === "object") {
          responseContent = JSON.stringify(data.response, null, 2);
        } else {
          responseContent = JSON.stringify(data, null, 2);
        }

        setChatHistory((prev) => prev.filter((msg) => msg.type !== "thinking"));
        setChatHistory((prev) => [
          ...prev,
          { type: "received", content: responseContent },
        ]);
        setIsThinking(false);
      }
    };

    ws.onclose = () => {
      console.log("WebSocket Disconnected");
      setIsConnected(false);
    };

    setSocket(ws);

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, []);
  const sendMessage = useCallback(() => {
    if (socket && isConnected && message.trim()) {
      const payload = {
        action: "chat_manually",
        message: message,
      };
      socket.send(JSON.stringify(payload));
      setChatHistory((prev) => [...prev, { type: "sent", content: message }]);
      setMessage("");
      setIsThinking(true);
      setChatHistory((prev) => [
        ...prev,
        { type: "thinking", content: "Thinking..." },
      ]);
    }
  }, [socket, isConnected, message]);

  const handleNewChat = (teamSelcted) => {
    // // Logic for a new chat, e.g., open a modal or reset state
    console.log("New Chat initiated");
    // console.log(teamSelcted)
    if (teamSelcted == "Onboarding Team") {
      console.log(teamSelcted, "this is the the team onbpardong");
      getNewChat(1);
    }
    console.log("button clicked", teamSelcted);
  };

  return (
    <div className="p-4 w-full">
      <form
        // onSubmit={handleSendMessage}
        className="flex items-center gap-2"
      >
        <button
          onClick={() => handleNewChat(teamSelcted)}
          type="button"
          className="hidden sm:flex btn btn-circle text-zinc-400"
        >
          <Plus size={20} />
        </button>

        <div className="flex-1 flex gap-2">
          <input
            type="text"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
            placeholder="Type a message..."
            value={message}
            // value={text}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button
            type="button"
            className={`hidden sm:flex btn btn-circle text-zinc-400"}`}
          >
            <Paperclip size={20} />
          </button>
        </div>

        {/* Add WiFi status indicator */}
        <div className="flex items-center">
          {isConnected ? (
            <Wifi size={16} className="text-success" />
          ) : (
            <WifiOff size={16} className="text-error" />
          )}
        </div>

        <button
          type="submit"
          className="btn btn-sm btn-circle"
          disabled={
            !message.trim()
            //  && !imagePreview
          }
          onClick={sendMessage}
        >
          <Send size={22} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
