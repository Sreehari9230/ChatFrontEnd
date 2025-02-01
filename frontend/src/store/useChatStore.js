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
    isHistoryModalOpen: false,

    newChatClicked:false,
    newChatId: null,


    formButtonClicked: false,

    setFormButton: () => {
        set({ formButtonClicked : true})
        set({newChatClicked: false})
    },




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
    
            // ✅ Update state correctly and log inside set
            set((state) => {
                console.log('Updated chat history:', res.data);
                return { chatHistory: res.data };
            });
    
            // ❌ This won't work because set is async
            // console.log(chatHistory);  // Remove this
    
        } catch (error) {
            toast.error(error.message);
            console.error("Error fetching chat history:", error);
        } finally {
            set({ isChatHistoryLoading: false });
        }
    }
    ,

    getNewChat: async (teamSelected) => {
        set({ newChatClicked: true })
        try {
            console.log('NewChat fetching for id hahahah');
            // Retrieve the accessToken from localStorage
            const accessToken = localStorage.getItem('access_token'); // Adjust 'accessToken' to your actual storage key
            if (!accessToken) {
                throw new Error('Access token is missing. Please log in again.');
            }
            const res = await axiosInstance.post(`organization/agents/${teamSelected}/create-chat-message/`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            // Update the state with the fetched chat history
            set({ newChatId: res.data }); // Assuming `res.data` contains the chat sessions
            console.log(chat)
        } catch (error) {
            toast.error(error)
        } finally {
            set({ isChatLoading: false })
        }
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