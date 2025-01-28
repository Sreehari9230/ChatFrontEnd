import React, { useEffect } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import { useChatStore } from "../store/useChatStore";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";
import OnboardingForm from "./forms/OnboardingForm";
import RecruitmentForm from "./forms/RecruitmentForm";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    teamSelcted,
  } = useChatStore();
  console.log(teamSelcted, "hehe");
  const { authUser } = useAuthStore();

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

  return (
    // <div className="flex-1 flex flex-col overflow-auto">
    //   <ChatHeader />

    //   {teamSelcted === "Recruitment Team" ? (
    //     <RecruitmentForm />
    //   ) : (
    //     <OnboardingForm />
    //   )}

    //   <div className="flex-1 overflow-y-auto p-4 space-y-4">
    //     {messages.map((message) => {
    //       <div
    //         key={messages._id}
    //         className={`chat ${
    //           messages.sender._id === authUser._id ? "chat-end" : "chat-start"
    //         }`}
    //       >
    //         <div className="chat-image avatar">
    //           <div className="size-10 rounded-full border">
    //             <img
    //               src={
    //                 messages.senderId === authUser._id
    //                   ? authUser.profilePic || "./avatar.png"
    //                   : selectedUser.profilePic || "./avatar.png"
    //               }
    //               alt="profile pic"
    //             />
    //           </div>
    //         </div>

    //         <div className="chat-header mb-1">
    //           <time className="text-xs opacity-50 ml-1">
    //             {formatMessageTime(message.createdAt)}
    //           </time>
    //         </div>

    //         <div className="chat-bubble flex flex-col">
    //           {message.image && (
    //             <img
    //               src={message.image}
    //               alt="Attachment"
    //               className="sm:max-w-[200px] rounded-md mb-2"
    //             />
    //           )}
    //           {message.text && <p>{message.text}</p>}
    //         </div>
    //       </div>;
    //     })}
    //   </div>

    //   <MessageInput />
    // </div>

    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      {/* {teamSelcted === "Recruitment Team" ? (
        <RecruitmentForm />
      ) : (
        <OnboardingForm />
      )} */}

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Message 1 */}
  <div className="chat chat-end">
    {/* <div className="chat-image avatar">
      <div className="size-10 rounded-full border">
        <img
          src="./authUserAvatar.png"
          alt="profile pic"
        />
      </div>
    </div> */}
    <div className="chat-header mb-1">
      <time className="text-xs opacity-50 ml-1">10:00 AM</time>
    </div>
    <div className="chat-bubble flex flex-col">
      <p>Hello, how are you?</p>
    </div>
  </div>

  {/* Message 2 */}
  <div className="chat chat-start">
    {/* <div className="chat-image avatar">
      <div className="size-10 rounded-full border">
        <img
          src="./selectedUserAvatar.png"
          alt="profile pic"
        />
      </div>
    </div> */}
    <div className="chat-header mb-1">
      <time className="text-xs opacity-50 ml-1">10:01 AM</time>
    </div>
    <div className="chat-bubble flex flex-col">
      <p>I'm good, thank you! How about you?</p>
    </div>
  </div>

  {/* Message 3 with an Image */}
  <div className="chat chat-end">
    {/* <div className="chat-image avatar">
      <div className="size-10 rounded-full border">
        <img
          src="./authUserAvatar.png"
          alt="profile pic"
        />
      </div>
    </div> */}
    <div className="chat-header mb-1">
      <time className="text-xs opacity-50 ml-1">10:02 AM</time>
    </div>
    <div className="chat-bubble flex flex-col">
      {/* <img
        src="./imageAttachment.png"
        alt="Attachment"
        className="sm:max-w-[200px] rounded-md mb-2"
      /> */}
      <p>Here’s the image you asked for!</p>
    </div>
  </div>
      </div>

      {/* Only show MessageInput when no form is displayed */}
      {/* {!teamSelcted && <MessageInput />} */}
     <MessageInput />
    </div>
  );
};

export default ChatContainer;
