import axios from "axios";

const axiosClient = axios.create({
    baseURL: "http://localhost:8000/api/",
    headers: {
        "Content-Type": "application/json",
    },
})
axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if(config.headers){
        config.headers.Authorization = token ? `Bearer ${token}` : '';
    }
    return config;
})

export default axiosClient