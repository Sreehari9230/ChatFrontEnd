import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: "http://13.61.220.76/",
    withCredentials: true,
}) 