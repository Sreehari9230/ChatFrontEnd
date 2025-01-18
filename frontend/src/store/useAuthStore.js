import { create } from 'zustand'
import { axiosInstance } from '../lib/axios'
import toast from 'react-hot-toast'

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,

    isCheckingAuth: true,

    // function to check auth when reloading the page the page will be checking if the user is authenticated
    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check") //baseUrl will fill the first
            set({ authUser: res.data })
        } catch (error) {
            console.log('error in checkAuth:', error);

            set({ authUser: null })
        } finally {
            set({ isCheckingAuth: false })
        }
    },
    // signup logic
    signup: async (data) => {
        set({ isSigningUp: true })
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            set({ suthUser: res.data })
            toast.success("Account created successfully")
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({ isSigningUp: false })
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({ authUser: null });
            toast.success("Logged out successfully")
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },

    login: async () => {
        set({ isLoggingIn: true })
        try {
            const res = await axiosInstance.post("/auth/login", data); 
            set({ authUser: res.data })
            toast.success("Logged in Successfully")
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({ isLoggingIn: false })
        }
    }

}))