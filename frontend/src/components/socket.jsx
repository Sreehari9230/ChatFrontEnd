// useEffect(() => {
//     const ws = new WebSocket(
//       "wss://v5dmsmd1-8000.inc1.devtunnels.ms/ws/messages/2/"
//     );

//     ws.onopen = () => {
//       console.log("WebSocket Connected");
//       setIsConnected(true);
//     };

//     ws.onmessage = (event) => {
//       console.log("Received message:", event.data);
//       const data = JSON.parse(event.data);
//       let responseContent = "";

//       if (data.action === "form_response") {
//         if (data.response && data.response.message_id) {
//           responseContent = data.response.message_id;
//         } else if (data.response && typeof data.response === "object") {
//           responseContent = JSON.stringify(data.response, null, 2);
//         } else {
//           responseContent = JSON.stringify(data, null, 2);
//         }

//         setChatHistory((prev) => prev.filter((msg) => msg.type !== "thinking"));
//         setChatHistory((prev) => [
//           ...prev,
//           { type: "received", content: responseContent },
//         ]);
//         setIsThinking(false);
//       }
//     };

//     ws.onclose = () => {
//       console.log("WebSocket Disconnected");
//       setIsConnected(false);
//     };

//     setSocket(ws);

//     return () => {
//       ws.close();
//     };
//   }, []);
//   const sendMessage = useCallback(() => {
//     if (socket && isConnected && message.trim()) {
//       const payload = {
//         action: "chat_manually",
//         message: message,
//       };
//       socket.send(JSON.stringify(payload));
//       setChatHistory((prev) => [...prev, { type: "sent", content: message }]);
//       setMessage("");
//       setIsThinking(true);
//       setChatHistory((prev) => [
//         ...prev,
//         { type: "thinking", content: "Thinking..." },
//       ]);
//     }
//   }, [socket, isConnected, message]);

{
  /* {imagePreview && (
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
      )} */
}

{
  /* Plus button for new chat */
}
{
  /* <button
          type="button"
          className="btn  btn-circle bg-base-300 hover:bg-base-400"
          onClick={handleNewChat} // Implement the new chat logic in this handler
        >
          <Plus size={20} className="text-700" />
        </button> */
}

{
  /* <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          /> */
}

{
  /* <button
            type="button"
            className={`hidden sm:flex btn btn-circle
                     ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Paperclip size={20} />
          </button> */
}

{
  /* <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          /> */
}

{
  /* <button
            type="button"
            className={`hidden sm:flex btn btn-circle
                     ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Paperclip size={20} />
          </button> */
}


  // useEffect(() => {
  //   getMessages(selectedUser._id)
  // }, [selectedUser._id, getMessages]);

  // if (isMessagesLoading)
  //   return (
  //     <div className="flex-1 flex flex-col overflow-auto">
  //       <ChatHeader />
  //       <MessageSkeleton />
  //       <MessageInput />
  //     </div>
  //   );


      // <div className="flex-1 flex flex-col overflow-auto">
    //   <ChatHeader />
    //   {!hasChatHistory || newChatClicked ? (
    //     <WelcomeChat />
    //   ) : formButtonClicked ? (
    //     formRenderContent()
    //   ) : chatManuallyButtonClicked || !hasChatHistory (
    //     <>
    //       <div className="flex-1 overflow-y-auto p-4 space-y-4">

    //       </div>
    //       <MessageInput />
    //     </>
    //   )}
    // </div>
