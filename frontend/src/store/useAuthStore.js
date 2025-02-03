import { create } from 'zustand'
import { axiosInstance } from '../lib/axios'
import toast from 'react-hot-toast'

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,

    isCheckingAuth: true,

    accessToken: null,
    refreshToken: null,
    userRole: null,
    userId: null,

    userAuth: false,

    checkAuth: () => {
        try {
          const token = localStorage.getItem("token");
    
          if (token) {
            set({ userAuth: true });
          } else {
            set({ userAuth: false });
          }
        } catch (error) {
          toast.error("Error checking authentication");
          set({ userAuth: false });
        } finally {
          set({ isCheckingAuth: false });
        }
      },

    // function to check auth when reloading the page the page will be checking if the user is authenticated
    // checkAuth: async () => {
    //     try {
    //         const res = await axiosInstance.get("/auth/check") //baseUrl will fill the first
    //         set({ authUser: res.data })
    //     } catch (error) {
    //         console.log('error in checkAuth:', error);

    //         set({ authUser: null })
    //     } finally {
    //         set({ isCheckingAuth: false })
    //     }
    // },
    // signup logic
    // signup: async (data) => {
    //     set({ isSigningUp: true })
    //     try {
    //         const res = await axiosInstance.post("/auth/signup", data);
    //         set({ suthUser: res.data })
    //         toast.success("Account created successfully")
    //     } catch (error) {
    //         toast.error(error.response.data.message)
    //     } finally {
    //         set({ isSigningUp: false })
    //     }
    // },

    // logout: async () => {
    //     try {
    //         await axiosInstance.post("/auth/logout");
    //         set({ authUser: null });
    //         toast.success("Logged out successfully")
    //     } catch (error) {
    //         toast.error(error.response.data.message)
    //     }
    // },

    login: async (data) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post('/organization/login/', data); // Real endpoint
            console.log('response:', res.data)
            const { access_token, refresh_token, user_id, role } = res.data;
            // Set auth-related details in the state
            set({
                authUser: data.email, // Storing user's email as a placeholder for auth user
                accessToken: access_token,
                refreshToken: refresh_token,
                userRole: role,
                userId: user_id,
            });
            console.log('accessToken:', access_token);
            console.log('refreshToken:', refresh_token);

            // Store tokens locally
            localStorage.setItem('access_token', access_token);
            localStorage.setItem('refresh_token', refresh_token);
            // console.log('hahaha')

            // toast.success('Logged in successfully!');
            // After logging in, fetch home data
            // console.log(access_token, 'access token is here')
            // fetchHome(access_token);
            // console.log('hem');

            // Return the response tokens to be used in the login handler
            return {
                access_token,
                refresh_token
            };

        } catch (error) {
            // console.log('login catch');

            const message = error.response?.data?.message || 'Login failed. Please check your credentials.';
            // toast.error(message);
        } finally {
            set({ isLoggingIn: false });
        }
    },

    fetchHome: async (accessToken) => {
        try {
            console.log('inside fetchHome')
            const res = await axiosInstance.get("/organization/home/", {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
            })
            console.log('fetchhome over')
            // console.log("Home Data:", res, data);
            // Handle the fetched data here, such as updating state or rendering content
        } catch (error) {
            // console.log('fetch home catch')
            console.error("Error fetching home data:", error);
            // Handle errors (e.g., redirect, display an error message)
        }
    },

    updateProfile: async (data) => { },

}))








// authUser: null,
// accessToken: null,
// refreshToken: null,
// userRole: null,
// userId: null,

// isLoggingIn: false,

// Login logic
