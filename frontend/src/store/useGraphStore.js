import { create } from 'zustand'
import { axiosInstance } from '../lib/axios'
import toast from 'react-hot-toast'

export const useGraphStore = create((set) => ({

    GraphData: [],
    CompanyName: null,

    GetGraphData: async () => {
        try {
            console.log('inside GetGraphData Function');
            const accessToken = localStorage.getItem('access_token');
            const res = await axiosInstance.get("/organization/eod-report/", {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            console.log('GetGraphData over', res.data);

            set({ GraphData: res.data.eod_reports || [] }); 
            set({ CompanyName: res.data.organization })
        } catch (error) {
            console.error("Error in GetGraphDta:", error);
        }
    },


}))