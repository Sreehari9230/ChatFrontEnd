import React from "react";
import { useChatStore } from "../store/useChatStore";
import { teamMap } from "../lib/utils";

const WelcomeChat = () => {
  const {
    teamSelcted,
    formButtonClicked,
    setFormButton,
    getNewChat,
    setFormButtonClicked,
    setChatManuallyButtonClicked,
  } = useChatStore();

  const handleNewForm = () => {
    console.log(`Starting New Form in ${teamSelcted}`);
    console.log(teamSelcted);
    setFormButtonClicked();

    if (teamMap[teamSelcted]) {
      getNewChat(teamMap[teamSelcted]);
    } else {
      console.log("Invalid Team Selected");
    }
  };

  const chatManuallyButton = () => {
    console.log(`Starting To Chat Manually in ${teamSelcted}`);
    console.log(teamSelcted);
    setChatManuallyButtonClicked();

    if (teamMap[teamSelcted]) {
      console.log("Inside if");
      getNewChat(teamMap[teamSelcted]);
    } else {
      console.log("Invalid Team Selected");
    }
  };

  return (
    // <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
    //   <div className="card bg-base-100 w-full max-w-lg shadow-xl">
    <div className="card-body p-4">
      <div className="chat chat-start">
        <div className="chat-bubble chat-bubble-primary p-4">
          <h2 className="text-lg font-bold mb-2">Hello,</h2>
          <p className="text-sm mb-2">
            Welcome to The {teamSelcted}. I am your Team Manager and I am happy
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
          New {teamSelcted}
        </button>

        <button
          onClick={chatManuallyButton}
          className="btn btn-outline btn-primary btn-xs py-0 h-8 min-h-0 w-48"
        >
          {/* Status of previous onboardings */}
          Chat Manually
        </button>
      </div>
    </div>
    //   </div>
    // </div>
  );
};

export default WelcomeChat;
