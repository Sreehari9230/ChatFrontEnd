import React, { useEffect } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import { useChatStore } from "../store/useChatStore";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";
import OnboardingForm from "./forms/OnboardingForm";
import RecruitmentForm from "./forms/RecruitmentForm";
import WelcomeChat from "./WelcomeChat";
import ChatBubbles from "./ChatBubbles";

import useWebSocketStore from "../store/useWebSocketStore";

const ChatContainer = () => {
  const {
    teamSelcted,
    chatHistory,
    newChatButtonClicked,
    formButtonClicked,
    hasChatHistory,
    chatManuallyButtonClicked,
    chatId,
  } = useChatStore();
  // console.log(teamSelcted, "hehe");
  const { authUser } = useAuthStore();

  const { connect } = useWebSocketStore(); // ✅ Extract connect function

  // ✅ Connect WebSocket when chatId changes
  useEffect(() => {
    if (chatId) {
      connect(chatId);
    }
  }, [chatId, connect]);

  const formRenderContent = () => {
    console.log(formButtonClicked);
    // if (formButtonClicked) {
    // Show appropriate form based on team selection
    if (teamSelcted === "Recruitment Team") {
      console.log("insode render content");
      return <RecruitmentForm />;
    } else if (teamSelcted === "Onboarding Team") {
      return <OnboardingForm />;
      // }
    }

    // // Show welcome chat if there's chat history or new chat is clicked
    // if (hasChatHistory || newChatClicked || chatManuallyButtonClicked) {
    //   return <WelcomeChat />;
    // }

    // // Default welcome chat view
    // return <WelcomeChat />;
  };

  return (
    // chatheader should be shown regardless
    // chatbubbles and chat input shouldbe shown if there is no form or there is no newchat ui shown
    // form should be shown if the form button in the newUi is clicked
    // newUi should be shpwn if the user gets in and he has no prevous chat in the team or he has clicked the newChat button

    <div className="flex-1 flex flex-col overflow-auto">
      {/* <RecruitmentForm/> */}
      <ChatHeader />
      {!hasChatHistory || newChatButtonClicked ? (
        <WelcomeChat />
      ) : formButtonClicked ? (
        formRenderContent()
      ) : chatManuallyButtonClicked || hasChatHistory ? ( // Fixed syntax
        <>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <ChatBubbles />
          </div>
          <MessageInput />
        </>
      ) : null}{" "}
      {/* Added a fallback */}
    </div>

    //   <div className="flex-1 flex flex-col overflow-auto">
    //   <ChatHeader />
    //   {/* {formRenderContent()}/ */}
    //   <ChatBubbles/>
    //   {/* {newChatClicked || !hasChatHistory ? (
    //     <WelcomeChat />
    //   ) : formButtonClicked ? (
    //     formRenderContent()
    //   ) : chatManuallyButtonClicked || hasChatHistory ? (
    //     <>
    //       <div className="flex-1 overflow-y-auto p-4 space-y-4"></div>
    //       <MessageInput />
    //     </>
    //   ) : null} */}
    // </div>
  );
};

export default ChatContainer;
