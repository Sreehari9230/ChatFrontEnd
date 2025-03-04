import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import useWebSocketStore from "../store/useWebSocketStore";
import { format } from "date-fns";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { formatJobPosting } from "../lib/utils";

const FetchedBubbles = () => {
  const { chatId } = useChatStore();
  const {
    fetchChatMessages,
    fetchedMessages,
    sendMessage,
    isFetchMessagesLoading,
  } = useWebSocketStore();

  let lastDate = null;

  useEffect(() => {
    if (chatId) {
      fetchChatMessages(chatId);
    }
  }, [chatId, fetchChatMessages]);

  const parseBoxMessage = (message) => {
    try {
      return message ? JSON.parse(message) : null;
    } catch (error) {
      console.error("Error parsing box message:", error);
      return null;
    }
  };

  const handleRetryButton = () => {
    sendMessage({ action: "retry", message: "retry" });
  };

  if (isFetchMessagesLoading) return <MessageSkeleton />;

  return (
    <>
      {fetchedMessages.length === 0 ? (
        <p className="text-center text-gray-500">No previous chat</p>
      ) : (
        fetchedMessages.map((msg, index) => {
          const msgDate = format(new Date(msg.timestamp), "yyyy-MM-dd");
          const showDateSeparator = lastDate !== msgDate;
          lastDate = msgDate;

          const parsedBoxMessage =
            msg.Type === "box" ? parseBoxMessage(msg.message) : null;

          return (
            <div key={msg._id || index}>
              {/* Date Separator */}
              {showDateSeparator && (
                <div className="text-center text-gray-400 text-sm my-2">
                  {format(new Date(msg.timestamp), "MMMM d, yyyy")}
                </div>
              )}

              {/* Chat Bubble */}
              <div
                className={`chat ${
                  msg.user === "AI" ? "chat-start" : "chat-end"
                }`}
              >
                <div className="chat-header mb-1">
                  <time className="text-xs opacity-50 ml-1">
                    {format(new Date(msg.timestamp), "h:mm a")}
                  </time>
                </div>

                <div className="chat-bubble chat-bubble-primary flex flex-col max-w-[60%]">
                  {msg.user === "user" ? (
                    msg.message ? (
                      <p>{msg.message}</p>
                    ) : msg.form ? (
                      <div className="space-y-1">
                        {Object.entries(msg.form).map(([key, value]) => (
                          <p key={key}>
                            <strong>{key}:</strong> {value}
                          </p>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">No content</p>
                    )
                  ) : msg.message?.error ? (
                    <p className="text-red-500">{msg.message.error}</p>
                  ) : msg.Type === "text" ? (
                    <div
                      className="formatted-text"
                      dangerouslySetInnerHTML={{
                        __html: formatJobPosting(String(msg.message || "")),
                      }}
                    />
                  ) : msg.Type === "brochure" ? (
                    <>
                      <div
                        className="formatted-text"
                        dangerouslySetInnerHTML={{
                          __html: formatJobPosting(String(msg.message || "")),
                        }}
                      />
                      {/* {msg.content && (
                        <div
                          className="formatted-text mt-2 text-gray-600"
                          dangerouslySetInnerHTML={{ __html: formatJobPosting(String(msg.content || "")) }}
                        />
                      )} */}

                      {msg.content && (
                        <div
                          className="border border-base-300 p-2 rounded-lg bg-secondary mt-2"
                          dangerouslySetInnerHTML={{
                            __html: formatJobPosting(String(msg.content || "")),
                          }}
                        />
                        // </div>
                      )}

                      {/* Copy Button */}
                      {/* <button
                        className="btn btn-xs btn-outline absolute top-2 right-2"
                        onClick={() =>
                          navigator.clipboard.writeText(
                            msg.content || msg.message
                          )
                        }
                      >
                        Copy
                      </button> */}
                    </>
                  ) : msg.Type === "email templates" ? (
                    <>
                      <div
                        className="formatted-text"
                        dangerouslySetInnerHTML={{
                          __html: formatJobPosting(String(msg.message || "")),
                        }}
                      />
                      {Array.isArray(msg.content) && msg.content.length > 0 && (
                        <div className="mt-4 space-y-4">
                          {msg.content.map((template, index) => (
                            <div
                              key={index}
                              className="p-4 border rounded-lg shadow-sm bg-white"
                            >
                              <h3 className="text-lg font-semibold text-gray-900">
                                {template.subject}
                              </h3>
                              <p className="mt-2 text-gray-700 whitespace-pre-line">
                                {template.body}
                              </p>
                              <p className="mt-2 text-blue-600 font-medium">
                                {template.call_to_action}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  ) : // other types are in the sidebarJSX in the idk folder should put it just after closing bracket in the next like before parsedBox
                  parsedBoxMessage ? (
                    <div className="flex flex-col gap-4">
                      <table className="w-full text-sm">
                        <tbody>
                          {Object.entries(parsedBoxMessage).map(
                            ([key, value]) => (
                              <tr key={key}>
                                <td className="px-2 py-1">{key}</td>
                                <td
                                  className={`px-2 py-1 font-bold ${
                                    value === "COMPLETED"
                                      ? "text-green-500"
                                      : value === "PENDING"
                                      ? "text-red-500"
                                      : ""
                                  }`}
                                >
                                  {value}
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                      {msg.retry === "False" && (
                        <div className="flex justify-center">
                          <button
                            className="btn btn-primary"
                            onClick={handleRetryButton}
                          >
                            Retry
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-500">No content</p>
                  )}
                </div>
              </div>
            </div>
          );
        })
      )}
    </>
  );
};

export default FetchedBubbles;
