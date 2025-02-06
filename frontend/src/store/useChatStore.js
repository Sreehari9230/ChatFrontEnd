import { create } from "zustand";
import toast from 'react-hot-toast'
import { axiosInstance } from '../lib/axios'
import { HistoryIcon } from "lucide-react";


export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    selectedUsers: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    isDeparmentLoading: false,
    deaprtmentSelected: '',
    isTeamSelected: false,
    teamSelcted: '',

    isChatHistoryLoading: false,
    // chats: [],
    // isChatLoading: false,
    chatHistory: [],

    hasChatHistory: false,


    isHistoryModalOpen: false,



    newChatClicked: false,
    newChatId: null,


    chatId: null,


    formButtonClicked: false,

    chatManuallyButtonClicked: false,

    newChatButtonClicked: false,

    setFormButtonClicked: () => {
        console.log('insode setformbuttonclicked')
        set({ hasChatHistory: false })
        set({ newChatClicked: false })
        set({ formButtonClicked: true })

    },

    setChatManuallyButtonClicked: () => {
        set({ chatManuallyButtonClicked: true })
        set({ formButtonClicked: false })
        set({ hasChatHistory: true })
        // set({ newChatClicked: false })
    },

    setNewChatButtonClicked: () => {
        set({ newChatButtonClicked: true })
    },


    // setFormButton: () => {
    //     set({ formButtonClicked: true })
    //     set({ newChatClicked: false })
    // },

    setDepartmentSelected: (department) => {
        set({ deaprtmentSelected: department })
    },

    setTeamSelected: (team) => {
        set({ teamSelcted: team })
        set({ isTeamSelected: true })
    },

    setHistoryModal: (isOpen) => set({ isHistoryModalOpen: isOpen }),

    getChatHistory: async (teamSelected) => {
        set({ isChatHistoryLoading: true });
        try {
            console.log('Fetching chat history...');
            const accessToken = localStorage.getItem('access_token');
            if (!accessToken) {
                throw new Error('Access token is missing. Please log in again.');
            }

            const res = await axiosInstance.get(`/organization/agent/${teamSelected}/chat-sessions/`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            console.log('port is open?')

            set((state) => {
                console.log('Updated chat history:', res.data);
                return { chatHistory: res.data };
            });
        } catch (error) {
            toast.error(error.message);
            console.error("Error fetching chat history:", error);
        } finally {
            set({ isChatHistoryLoading: false });
        }
    },

    setHasChatHistory: () => {
        if (chatHistory.length == 0) {
            set({ hasChatHistory: false })
        } else {
            set({ hasChatHistory: true })
        }
    },

    getNewChat: async (teamSelected) => {
        // set({ newChatClicked: true });
        try {
            console.log(`New Chat Is Fetching For ${teamSelected}`);

            const accessToken = localStorage.getItem('access_token');
            if (!accessToken) {
                throw new Error('Access token is missing. Please log in again.');
            }

            const res = await axiosInstance.post(
                `organization/agents/${teamSelected}/create-chat-message/`, {}, // Ensure the request body is an empty object if needed
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            set({ chatId: res.data.chat_message_id });
            console.log(`New Chat ID: ${res.data.chat_message_id}`);
        } catch (error) {
            toast.error(error.message || "An error occurred while fetching the chat.");
        }
        // finally {
        //     set({ isChatLoading: false });
        // }
    },

    // getUsers: async () => {
    //     set({ isUsersLoading: true })
    //     try {
    //         const res = await axiosInstance.get('/messages/users');
    //         set({ users: res.data })
    //     } catch (error) {
    //         toast.error(error.response.data.message)
    //     } finally {
    //         set({ isUsersLoading: false })
    //     }
    // },

    // getMessages: async (userId) => {
    //     set({ isMessagesLoading: true })
    //     try {
    //         const res = await axiosInstance.get(`/messages/${userId}`)
    //         set({ messages: res.data })
    //     } catch (error) {
    //         toast.error(error.response.data.message)
    //     } finally {
    //         set({ isMessagesLoading: false })
    //     }
    // },

    // sendMessage: async (messageData) => {
    //     const { selectedUser, messages } = get()
    //     try {
    //         const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData)
    //         set({ messages: [...messages, res.data] })
    //     } catch (error) {
    //         toast.error(error.response.data.message)
    //     }
    // },

    // optimize this one later later
    // setSelectedUser: (selectedUser) => set({ selectedUser })
}))