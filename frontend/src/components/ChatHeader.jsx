import { HistoryIcon } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import ChatHistoryModal from "./ChatHistoryModal";

const ChatHeader = () => {
  const {
    // selectedUser,
    // setSelectedUser,
    isHistoryModalOpen,
    setHistoryModal,
    chatHistory,
    teamSelcted,
    getChatHistory
  } = useChatStore();

  const handleModalOpen = () => setHistoryModal(true);
  const handleModalClose = () => setHistoryModal(false);
  const handleGetChat = (abc) => {
    console.log('in chatheadr function', abc == 'Onboarding Team', abc,'Onboarding Team')
    if(abc == 'Onboarding Team'){
      
      console.log(abc,'this is the the team onbpardong')
      getChatHistory(1)
    }
  };

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div>
            <h3 className="font-medium">CHAT ID</h3>
          </div>
        </div>
        {/* Right Section: History Icon */}
        <button
          onClick={() => {
            handleModalOpen();
            handleGetChat(teamSelcted);
          }}
          className="p-2 hover:bg-gray-100 rounded-full transition"
        >
          <HistoryIcon />
        </button>
      </div>
      {/* Modal */}
      {isHistoryModalOpen && (
        <ChatHistoryModal
          onClose={handleModalClose}
          chatHistory={chatHistory}
        />
      )}
    </div>
  );
};
export default ChatHeader;
