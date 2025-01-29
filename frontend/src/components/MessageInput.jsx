import React, { useState, useRef, useEffect, useCallback } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Paperclip, Plus, Send, Share } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
  // const [text, setText] = useState("");
  // const [imagePreview, setImagePreview] = useState(null);
  // const fileInputRef = useRef(null);
  const { 
    // sendMessage
    teamSelcted, getNewChat } = useChatStore();

    const [socket, setSocket] = useState(null);
    const [message, setMessage] = useState("");
    const [chatHistory, setChatHistory] = useState([]);
    const [isConnected, setIsConnected] = useState(false);
    const [isThinking, setIsThinking] = useState(false);
    const socketRef = useRef(null);

  // useEffect(() => {
  //   const ws = new WebSocket(
  //     "wss://v5dmsmd1-8000.inc1.devtunnels.ms/ws/messages/2/"
  //   );

  //   ws.onopen = () => {
  //     console.log("WebSocket Connected");
  //     setIsConnected(true);
  //   };

  //   ws.onmessage = (event) => {
  //     console.log("Received message:", event.data);
  //     const data = JSON.parse(event.data);
  //     let responseContent = "";

  //     if (data.action === "form_response") {
  //       if (data.response && data.response.message_id) {
  //         responseContent = data.response.message_id;
  //       } else if (data.response && typeof data.response === "object") {
  //         responseContent = JSON.stringify(data.response, null, 2);
  //       } else {
  //         responseContent = JSON.stringify(data, null, 2);
  //       }

  //       setChatHistory((prev) => prev.filter((msg) => msg.type !== "thinking"));
  //       setChatHistory((prev) => [
  //         ...prev,
  //         { type: "received", content: responseContent },
  //       ]);
  //       setIsThinking(false);
  //     }
  //   };

  //   ws.onclose = () => {
  //     console.log("WebSocket Disconnected");
  //     setIsConnected(false);
  //   };

  //   setSocket(ws);

  //   return () => {
  //     if (ws.readyState === WebSocket.OPEN) {
  //       ws.close();
  //     }
  //   };
  // }, []);
  // const sendMessage = useCallback(() => {
  //   if (socket && isConnected && message.trim()) {
  //     const payload = {
  //       action: "chat_manually",
  //       message: message,
  //     };
  //     socket.send(JSON.stringify(payload));
  //     setChatHistory((prev) => [...prev, { type: "sent", content: message }]);
  //     setMessage("");
  //     setIsThinking(true);
  //     setChatHistory((prev) => [
  //       ...prev,
  //       { type: "thinking", content: "Thinking..." },
  //     ]);
  //   }
  // }, [socket, isConnected, message]);

  useEffect(() => {
    const ws = new WebSocket(
      "wss://v5dmsmd1-8000.inc1.devtunnels.ms/ws/messages/2/"
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
  
    socketRef.current = ws; // Save WebSocket instance in ref
  
    return () => {
      if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
        console.log("Closing WebSocket...");
        socketRef.current.close();
      }
    };
  }, []); // Dependency array remains empty to ensure the WebSocket is created once
  
  const sendMessage = useCallback(() => {
    if (socketRef.current && isConnected && message.trim()) {
      const payload = {
        action: "chat_manually",
        message: message,
      };
      socketRef.current.send(JSON.stringify(payload));
      setChatHistory((prev) => [...prev, { type: "sent", content: message }]);
      setMessage("");
      setIsThinking(true);
      setChatHistory((prev) => [
        ...prev,
        { type: "thinking", content: "Thinking..." },
      ]);
    }
  }, [isConnected, message]); // Remove socketRef.current from dependencies to prevent unnecessary re-renders

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (!file.type.startsWith("image/")) {
  //     toast.error("Please select an image file");
  //     return;
  //   }

  //   const reader = new FileReader();
  //   reader.onloadend = () => {
  //     setImagePreview(reader.result);
  //   };
  //   reader.readAsDataURL(file);
  // };

  // const removeImage = () => {
  //   setImagePreview(null);
  //   if (fileInputRef.current) fileInputRef.current.value = "";
  // };

  // const handleSendMessage = async (e) => {
  //   e.preventDefault();
  //   if (!text.trim() && !imagePreview) return;
  //   try {
  //     await sendMessage({
  //       text: text.trim(),
  //       image: imagePreview,
  //     });
  //     setText("");
  //     setImagePreview(null);
  //     if (fileInputRef.current) fileInputRef.current.value = "";
  //   } catch (error) {
  //     console.error("failed to send message:", error);
  //   }
  // };

  // const handleSendMessage = async (e) => {
  //   e.preventDefault();
  //   if (!text.trim()) return;
  //   try {
  //     await sendMessage({
  //       text: text.trim(),
  //     });
  //     setText("");
  //   } catch (error) {
  //     console.error("failed to send message:", error);
  //   }
  // };

  const handleNewChat = (teamSelcted) => {
    // // Logic for a new chat, e.g., open a modal or reset state
    // console.log("New Chat initiated");
    // console.log(teamSelcted)
    // if(teamSelcted == 'Onboarding Team'){

    //   console.log(teamSelcted,'this is the the team onbpardong')
    //   getNewChat(1)
    // }
    console.log("button clicked", teamSelcted);
  };

  return (
    <div className="p-4 w-full">
      {/* {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )} */}

      <form 
      // onSubmit={handleSendMessage}
       className="flex items-center gap-2">
        {/* Plus button for new chat */}
        {/* <button
          type="button"
          className="btn  btn-circle bg-base-300 hover:bg-base-400"
          onClick={handleNewChat} // Implement the new chat logic in this handler
        >
          <Plus size={20} className="text-700" />
        </button> */}

        <button
          onClick={handleNewChat(teamSelcted)}
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

          {/* <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          /> */}

          {/* <button
            type="button"
            className={`hidden sm:flex btn btn-circle
                     ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Paperclip size={20} />
          </button> */}

          <button
            type="button"
            className={`hidden sm:flex btn btn-circle text-zinc-400"}`}
          >
            <Paperclip size={20} />
          </button>
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
