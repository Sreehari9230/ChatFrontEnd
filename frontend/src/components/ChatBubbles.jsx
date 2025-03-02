import React, { useEffect, useRef, useState } from "react";
import useWebSocketStore from "../store/useWebSocketStore";
import FetchedBubbles from "./FetchedBubbles";
import CurrentBubbles from "./CurrentBubbles";

const ChatBubbles = () => {

  const { currentMessages, fetchedMessages, sendMessage } = useWebSocketStore();
  let lastDate = null;
  const chatEndRef = useRef(null);

  // console.log(currentMessages);
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [fetchedMessages, currentMessages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      <FetchedBubbles />
      <CurrentBubbles />

      {/* Empty div for auto scroll */}
      <div ref={chatEndRef}></div>
    </div>
  );
};

export default ChatBubbles;
