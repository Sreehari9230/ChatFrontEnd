import { create } from "zustand";
import toast from 'react-hot-toast'
import { axiosInstance } from '../lib/axios'
import { HistoryIcon } from "lucide-react";


export const useChatStore = create((set, get) => ({
    // messages: [],
    // users: [],
    // selectedUsers: null,
    // isUsersLoading: false,
    // isMessagesLoading: false,

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
        set({ newChatButtonClicked: false })
        set({ chatManuallyButtonClicked: true })
        set({ hasChatHistory: false })
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

    // getChatHistory: async (teamSelected) => {
    //     set({ isChatHistoryLoading: true });
    //     try {
    //         console.log('Fetching chat history...');
    //         const accessToken = localStorage.getItem('access_token');
    //         if (!accessToken) {
    //             throw new Error('Access token is missing. Please log in again.');
    //         }

    //         const res = await axiosInstance.get(`/organization/agent/${teamSelected}/chat-sessions/`, {
    //             headers: {
    //                 Authorization: `Bearer ${accessToken}`,
    //             },
    //         });
    //         console.log('port is open?')

    //         set((state) => {
    //             console.log('Updated chat history:', res.data);
    //             return { chatHistory: res.data };
    //         });
    //     } catch (error) {
    //         toast.error(error.message);
    //         console.error("Error fetching chat history:", error);
    //     } finally {
    //         set({ isChatHistoryLoading: false });
    //     }
    // },

    // getChatHistory: async (teamSelected) => {
    //     set({ isChatHistoryLoading: true });
    //     try {
    //         console.log('Fetching chat history...');
    //         const accessToken = localStorage.getItem('access_token');
    //         if (!accessToken) {
    //             throw new Error('Access token is missing. Please log in again.');
    //         }

    //         const res = await axiosInstance.get(`/organization/agent/${teamSelected}/chat-sessions/`, {
    //             headers: {
    //                 Authorization: `Bearer ${accessToken}`,
    //             },
    //         });

    //         console.log('Port is open?');

    //         set((state) => {
    //             console.log('Updated chat history:', res.data);
    //             const chatHistory = res.data;

    //             // If chat history is not empty, update the chatId with the last chat session ID
    //             const lastChatId = chatHistory.length > 0 ? chatHistory[chatHistory.length - 1].id : null;

    //             return {
    //                 chatHistory,
    //                 chatId: lastChatId, // Update chatId state
    //             };
    //         });
    //     } catch (error) {
    //         toast.error(error.message);
    //         console.error("Error fetching chat history:", error);
    //     } finally {
    //         set({ isChatHistoryLoading: false });
    //     }
    // },

    getChatHistory: async (teamSelected) => {
        set({ isChatHistoryLoading: true });
        try {
            console.log('Fetching chat history...');
            const accessToken = localStorage.getItem('access_token');
            if (!accessToken) {
                throw new Error('Access token is missing. Please log in again.');
            }

            // Commenting out the real API request
            // const res = await axiosInstance.get(`/organization/agent/${teamSelected}/chat-sessions/`, {
            //     headers: {
            //         Authorization: `Bearer ${accessToken}`,
            //     },
            // });

            // Using mock data instead
            const res = {
                data: [
                    { id: 24, created_at: "2025-01-25T14:01:20.375896Z" },
                    { id: 25, created_at: "2025-01-25T14:03:47.737136Z" },
                    { id: 26, created_at: "2025-01-25T14:04:11.003386Z" },
                    { id: 27, created_at: "2025-01-25T14:11:01.846740Z" },
                ],
            };

            set((state) => {
                console.log('Updated chat history:', res.data);
                const chatHistory = res.data;

                // If chat history is not empty, update the chatId with the last chat session ID
                const lastChatId = chatHistory.length > 0 ? chatHistory[chatHistory.length - 1].id : null;

                return {
                    chatHistory,
                    chatId: lastChatId, // Update chatId state
                    hasChatHistory: chatHistory.length > 0, // Set hasChatHistory to true if chatHistory is not empty
                };
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

    // getNewChat: async (teamSelected) => {
    //     // set({ newChatClicked: true });
    //     try {
    //         console.log(`New Chat Is Fetching For ${teamSelected}`);

    //         const accessToken = localStorage.getItem('access_token');
    //         if (!accessToken) {
    //             throw new Error('Access token is missing. Please log in again.');
    //         }

    //         const res = await axiosInstance.post(
    //             `organization/agents/${teamSelected}/create-chat-message/`, {}, // Ensure the request body is an empty object if needed
    //             {
    //                 headers: {
    //                     Authorization: `Bearer ${accessToken}`,
    //                 },
    //             }
    //         );

    //         set({ chatId: res.data.chat_message_id });
    //         console.log(`New Chat ID: ${res.data.chat_message_id}`);
    //     } catch (error) {
    //         toast.error(error.message || "An error occurred while fetching the chat.");
    //     }
    //     // finally {
    //     //     set({ isChatLoading: false });
    //     // }
    // },

    getNewChat: async (teamSelected) => {
        try {
            console.log(`New Chat Is Fetching For ${teamSelected}`);

            const accessToken = localStorage.getItem('access_token');
            if (!accessToken) {
                throw new Error('Access token is missing. Please log in again.');
            }

            const res = await axiosInstance.post(
                `organization/agents/${teamSelected}/create-chat-message/`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            const newChatId = res.data.chat_message_id;
            set((state) => ({ ...state, chatId: newChatId })); // ✅ Update chatId state

            console.log(`New Chat ID: ${newChatId}`);
        } catch (error) {
            toast.error(error.message || "An error occurred while fetching the chat.");
        }
    },
}))