// import { create } from 'zustand';
// import { axiosInstance } from '../lib/axios';
// import toast from 'react-hot-toast';

// // Load persisted state from localStorage
// const getStoredAuthData = () => ({
//     authUser: localStorage.getItem('auth_user') || null,
//     accessToken: localStorage.getItem('access_token') || null,
//     refreshToken: localStorage.getItem('refresh_token') || null,
//     userRole: localStorage.getItem('user_role') || null,
//     userId: localStorage.getItem('user_id') || null,
//     homeData: JSON.parse(localStorage.getItem('home_data')) || null, // Load home data
// });

// export const useAuthStore = create((set) => ({
//     // Initial state (loaded from localStorage)
//     ...getStoredAuthData(),
//     isLoggingIn: false,
//     isFetchingHomeData: false,

//     // ✅ Login Function
//     login: async (data) => {
//         set({ isLoggingIn: true });
//         try {
//             const res = await axiosInstance.post('/organization/login/', data);
//             console.log('Response:', res.data);
//             const { access_token, refresh_token, user_id, role } = res.data;

//             const authData = {
//                 authUser: data.email,
//                 accessToken: access_token,
//                 refreshToken: refresh_token,
//                 userRole: role,
//                 userId: user_id,
//             };

//             // ✅ Set state with user auth data
//             set(authData);

//             // ✅ Persist tokens & user data to localStorage
//             Object.entries(authData).forEach(([key, value]) => {
//                 localStorage.setItem(key, JSON.stringify(value));
//             });

//             return { access_token, refresh_token };
//         } catch (error) {
//             const message = error.response?.data?.message || 'Login failed. Please check your credentials.';
//             toast.error(message);
//         } finally {
//             set({ isLoggingIn: false });
//         }
//     },

//     // ✅ Fetch Home Data Function
//     fetchHomeData: async () => {
//         set({ isFetchingHomeData: true });
//         try {
//             const res = await axiosInstance.get('/organization/home');
//             console.log('Home API Response:', res.data);

//             // ✅ Update Zustand Store
//             set({ homeData: res.data });

//             // ✅ Save to Local Storage
//             localStorage.setItem('home_data', JSON.stringify(res.data));
//         } catch (error) {
//             toast.error('Failed to fetch home data.');
//         } finally {
//             set({ isFetchingHomeData: false });
//         }
//     },

//     // ✅ Logout Function
//     logout: () => {
//         // Clear Zustand Store
//         set({
//             authUser: null,
//             accessToken: null,
//             refreshToken: null,
//             userRole: null,
//             userId: null,
//             homeData: null,
//         });

//         // ✅ Remove from Local Storage
//         ['auth_user', 'access_token', 'refresh_token', 'user_role', 'user_id', 'home_data'].forEach((key) =>
//             localStorage.removeItem(key)
//         );
//     },
// }));

// // ✅ Restore local storage values when Zustand store is initialized
// useAuthStore.setState(getStoredAuthData());


    fetchHome: async (accessToken) => {
        try {
            console.log('inside fetchHome');
            const res = await axiosInstance.get("/organization/home/", {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            console.log('fetchHome over', res.data);

            const newDepartmentsTeams = res.data.package.features;
            set({ DepartmentsTeams: newDepartmentsTeams });

            // Store the new data in localStorage
            localStorage.setItem('DepartmentsTeams', JSON.stringify(newDepartmentsTeams));
        } catch (error) {
            console.error("Error fetching home data:", error);
        }
    }