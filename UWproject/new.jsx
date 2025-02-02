import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Wifi, WifiOff } from "lucide-react";

const WebSocketChat = () => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isThinking, setIsThinking] = useState(false);

  useEffect(() => {
    const ws = new WebSocket("wss://v5dmsmd1-8000.inc1.devtunnels.ms/ws/messages/2/");

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
        setChatHistory((prev) => [...prev, { type: "received", content: responseContent }]);
        setIsThinking(false);
      }
    };

    ws.onclose = () => {
      console.log("WebSocket Disconnected");
      setIsConnected(false);
    };

    setSocket(ws);

    return () => {
      ws.close();
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
      setChatHistory((prev) => [...prev, { type: "thinking", content: "Thinking..." }]);
    }
  }, [socket, isConnected, message]);

  return (
    <Card className="w-full max-w-3xl mx-auto h-[80vh] flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>WebSocket Chat</CardTitle>
        {isConnected ? <Wifi className="text-green-500" size={24} /> : <WifiOff className="text-red-500" size={24} />}
      </CardHeader>
      <CardContent className="flex-grow overflow-y-auto">
        {chatHistory.map((chat, index) => (
          <div key={index} className={`mb-2 ${chat.type === "sent" ? "text-right" : "text-left"}`}>
            <span
              className={`inline-block p-2 rounded-lg ${
                chat.type === "sent"
                  ? "bg-blue-500 text-white"
                  : chat.type === "received"
                  ? "bg-gray-200"
                  : "bg-yellow-200 animate-pulse"
              }`}
            >
              <pre className="whitespace-pre-wrap break-words">{chat.content}</pre>
            </span>
          </div>
        ))}
      </CardContent>
      <CardFooter className="flex gap-2">
        <Input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          className="flex-grow"
        />
        <Button onClick={sendMessage} disabled={!isConnected || isThinking}>
          {isThinking ? "Thinking..." : "Send"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default WebSocketChat;
