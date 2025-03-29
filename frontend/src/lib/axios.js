import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: "https://smartteams.nypus.in/",
    withCredentials: true,
})
