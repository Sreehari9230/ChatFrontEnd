import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: "https://13.61.220.76/",
    withCredentials: true,
}) 