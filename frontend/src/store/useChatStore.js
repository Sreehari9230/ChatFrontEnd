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
    chats: [],

    isChatLoading: false,
    chat: null,

    isHistoryModalOpen: false,
    chatHistory: [],


    setDepartmentSelected: (deaprtment) => {
        set({ deaprtmentSelected: deaprtment })
    },

    setTeamSelected: (team) => {
        set({ teamSelcted: team })
        set({ isTeamSelected: true })
    },

    setHistoryModal: (isOpen) => set({ isHistoryModalOpen: isOpen }),

    getChatHistory: async (teamSelected) => {
        console.log('inside getchat his')
        set({ isChatHistoryLoading: true })
        try {
            // // console.log('hahahhahaha', accessToken)
            // console.log('inside try of getchathostory')
            // const res = await axiosInstance.get(`/organization/agent/${teamSelected}/chat-sessions/`, {
            //     headers: {
            //         Authorization: `Bearer ${accessToken}`
            //     },
            // })
            // // console.log(chats)
            // set({ chats: res })
            console.log('Fetching chat history...');

            // Retrieve the accessToken from localStorage
            const accessToken = localStorage.getItem('access_token'); // Adjust 'accessToken' to your actual storage key

            if (!accessToken) {
                throw new Error('Access token is missing. Please log in again.');
            }

            const res = await axiosInstance.get(`/organization/agent/${teamSelected}/chat-sessions/`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            // Update the state with the fetched chat history
            set({ chats: res.data }); // Assuming `res.data` contains the chat sessions
            console.log(chats)
        } catch (error) {
            toast.error(error.message)
        } finally {
            set({ isChatHistoryLoading: false })
        }
    },

    getNewChat: async (teamSelected) => {
        set({ isChatLoading: true })
        try {
            console.log('NewChat fetching');
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
            set({ chat: res.data }); // Assuming `res.data` contains the chat sessions
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