import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: "http://13.61.154.213/",
    withCredentials: true,
})