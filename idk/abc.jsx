// REAL MESSAGE INPUT



import React from "react";
import { useChatStore } from "../store/useChatStore";
import { teamMap } from "../lib/utils";

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

        {/* <button
          onClick={chatManuallyButton}
          className="btn btn-outline btn-primary btn-xs py-0 h-8 min-h-0 w-48"
        >
          Chat Manually
        </button> */}
      </div>
    </div>
    //   </div>
    // </div>
  );
};

export default WelcomeChat;
