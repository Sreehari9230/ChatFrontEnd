<div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      {teamSelcted === "Recruitment Team" && formButtonClicked ? (
        <RecruitmentForm />
      ) : (
        <OnboardingForm />
      )}
      {chatHistory.length === 0 || newChatClicked ? (
        <WelcomeChat />
      ) : (
        <>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* <WelcomeChat /> */}
            {messages.map((message) => {
              <div
                key={messages._id}
                className={`chat ${
                  messages.sender._id === authUser._id
                    ? "chat-end"
                    : "chat-start"
                }`}
              >
                <div className="chat-image avatar">
                  <div className="size-10 rounded-full border">
                    <img
                      src={
                        messages.senderId === authUser._id
                          ? authUser.profilePic || "./avatar.png"
                          : selectedUser.profilePic || "./avatar.png"
                      }
                      alt="profile pic"
                    />
                  </div>
                </div>

                <div className="chat-header mb-1">
                  <time className="text-xs opacity-50 ml-1">
                    {formatMessageTime(message.createdAt)}
                  </time>
                </div>

                <div className="chat-bubble flex flex-col">
                  {message.image && (
                    <img
                      src={message.image}
                      alt="Attachment"
                      className="sm:max-w-[200px] rounded-md mb-2"
                    />
                  )}
                  {message.text && <p>{message.text}</p>}
                </div>
              </div>;
            })}
          </div>

          {/* <MessageInput /> */}
          {/* Show MessageInput only if neither form nor WelcomeChat is active */}
          {!formButtonClicked && chatHistory.length > 1 && !newChatClicked && (
            <MessageInput />
          )}
        </>
      )}
    </div>