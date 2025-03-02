// NOT REAL MESSAGE INPUT




import React from "react";
import { useChatStore } from "../store/useChatStore";
import { teamMap } from "../lib/utils";
import { Plus, Send, Wifi, WifiOff } from "lucide-react";

const WelcomeChat = () => {
  const {
    teamSelected,
    formButtonClicked,
    setFormButton,
    getNewChat,
    setFormButtonClicked,
    setChatManuallyButtonClicked,
  } = useChatStore();

  const handleNewForm = () => {
    console.log(`Starting New Form in ${teamSelected}`);
    console.log(teamSelected);
    setFormButtonClicked();
  };

  return (
    // <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
    //   <div className="card bg-base-100 w-full max-w-lg shadow-xl">
    <div className="card-body p-4">
      <div className="chat chat-start">
        <div className="chat-bubble chat-bubble-primary p-4">
          <h2 className="text-lg font-bold mb-2">Hello,</h2>
          <p className="text-sm mb-2">
            Welcome to The {teamSelected}. I am your Team Manager and I am happy
            to assist you with any requirements you may have.
          </p>
          <p className="text-sm">
            Please let us know how we can help you today!
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-center gap-2 mt-3">
        <button
          onClick={handleNewForm}
          className="btn btn-outline btn-primary btn-xs py-0 h-8 min-h-0 w-48"
        >
          New {teamSelected}
        </button>
      </div>

      <div className="p-4 w-full relative">
      <form className="flex items-center gap-2"
      //  onSubmit={handleSendMessage}
       >
        {/* <button
          // onClick={handleNewChatButton}
          type="button"
          className="hidden sm:flex btn btn-circle"
        >
          <Plus size={20} />
        </button> */}

        <div className="flex-1 flex gap-2 relative">
          {/* {showSuggestions && filteredSuggestions.length > 0 && (
            <ul className="absolute bottom-full left-0 w-full bg-base-100 border border-base-300 rounded-lg shadow-lg z-10 max-h-40 overflow-y-auto">
              {filteredSuggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="p-2 cursor-pointer hover:bg-base-200"
                  onClick={() => {
                    setMessage(suggestion);
                    setShowSuggestions(false);
                  }}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )} */}

          <input
            type="text"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
            placeholder="Type a message..."
            // value={message}
            // onChange={(e) => {
            //   const inputValue = e.target.value;
            //   setMessage(inputValue);
            //   setShowSuggestions(
            //     inputValue.length > 0 && filteredSuggestions.length > 0
            //   );
            // }}
          />
        </div>

        <div className="hidden sm:flex btn btn-circle">
          {/* {isConnected ? ( */}
            <Wifi size={16} className="text-success" />
          {/* // ) : ( */}
            {/* <WifiOff size={16} className="text-error" /> */}
          {/* )} */}
        </div>

        <button
          type="submit"
          className="hidden sm:flex btn btn-circle"
          // disabled={!message.trim() || responseIsThinking}
        >
          <Send size={22} />
        </button>
      </form>
    </div>
    </div>
    //   </div>
    // </div>

    
  );
};

export default WelcomeChat;
