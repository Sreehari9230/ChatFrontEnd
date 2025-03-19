import { create } from 'zustand'
import { axiosInstance } from '../lib/axios'
import toast from 'react-hot-toast'

export const useAuthStore = create((set) => ({
    authUser: null,
    // isSigningUp: false,
    isLoggingIn: false,
    // isUpdatingProfile: false,

    isCheckingAuth: true,

    accessToken: null,
    refreshToken: null,
    userRole: null,
    userId: null,

    userAuth: false,



    // DepartmentsTeams: JSON.parse(localStorage.getItem('DepartmentsTeams')) || [],
    // CompanyData: JSON.parse(localStorage.getItem("CompanyData")) || null,
    CompanyData: JSON.parse(localStorage.getItem("CompanyData")) || [],
    // {
    //     "id": "96733e68-4241-4892-8028-2ccc820d2659",
    //     "name": "nypus",
    //     "package": {
    //         "id": "592e137f-df57-4162-bd0d-29ed63a27579",
    //         "name": "tier1",
    //         "description": "",
    //         "price": "500.00",
    //         "max_ai_teams": 1,
    //         "max_ivas": 2,
    //         "max_agents": 5,
    //         "features": {
    //             "HR Department": [
    //                 "Recruitment Team",
    //                 "Onboarding Team"
    //             ],
    //             "Sales Department": [
    //                 "Content Creation",
    //                 "Customer Relationship Management",
    //                 "Sales Strategy",
    //                 "Lead Generation"
    //             ],
    //             "Marketing Department": [
    //                 "SEO Team",
    //                 "Marketing Research Team",
    //                 "Social Media Team"
    //             ]
    //         }
    //     }
    // },

    checkAuth: () => {
        const token = localStorage.getItem("access_token");

        if (token) {
            set({ userAuth: true });
        } else {
            set({ userAuth: false });
        }
        set({ isCheckingAuth: false });
    },

    login: async (data) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post('/organization/login/', data);
            console.log('response:', res.data)
            const { access_token, refresh_token, user_id, role } = res.data;
            // Set auth-related details in the state

            set({
                authUser: data.email,
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

            // Return the response tokens to be used in the login handler
            return {
                access_token,
                refresh_token
            };

        } catch (error) {
            const message = error.response?.data?.message || 'Login failed. Please check your credentials.';
            toast.error(message);
        } finally {
            set({ isLoggingIn: false });
        }
    },

    fetchHome: async (accessToken) => {
        try {
            console.log('inside fetchHome');
            const res = await axiosInstance.get("/organization/home/", {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            console.log('fetchHome over', res.data);

            // const newDepartmentsTeams = res.data.package.features;
            // set({ DepartmentsTeams: newDepartmentsTeams });

            // Store the new data in localStorage
            // localStorage.setItem('DepartmentsTeams', JSON.stringify(newDepartmentsTeams));

            const Company = res.data;
            set({ CompanyData: Company });

            // Store the new data in localStorage
            localStorage.setItem("CompanyData", JSON.stringify(Company));
        } catch (error) {
            console.error("Error fetching home data:", error);
        }
    },

    logout: () => {
        localStorage.clear(); // Clears all stored data

        set({
            authUser: null,
            accessToken: null,
            refreshToken: null,
            userRole: null,
            userId: null,
            userAuth: false,
            // DepartmentsTeams: [],
            CompanyData: null
        });

        toast.success("Logged out successfully");
    },

    ForgotPassword: async (data) => {
        try {
            console.log("Inside ForgotPassword Fn");

            // Use POST instead of GET and send data in the request body
            const res = await axiosInstance.post("/auth/forgot-password/", data);

            console.log(res.data);

            // Check if the response indicates success
            if (res.data.success == false) {
                return { success: false, message: res.data.message };
            } else {
                return { success: true, message: res.data.message };
            }

        } catch (error) {
            console.error("Error in ForgotPassword:", error);

            // Return failure response with error message
            return { success: false, message: error.response?.data?.message || "Email doesn't exist!" };
        }
    }

}))