import axios from "axios";

const axiosClient = axios.create({
    baseURL: "http://localhost:8000/api/",
    headers: {
        "Content-Type": "application/json",
    },
})
axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("access_token");
    console.log("token", token)
    if(config.headers){
        config.headers.Authorization = token ? `Bearer ${token}` : '';
    }
    return config;
})

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refresh_token");
        const userId = localStorage.getItem("user_id"); 
        const res = await axiosClient.post("/users/refresh-token", {
          refreshToken,
          userId
        });
        const { accessToken, refreshToken: newRefreshToken } = res.data;
        console.log("New tokens:", accessToken, newRefreshToken);
        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("refresh_token", newRefreshToken);

       
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axiosClient(originalRequest);
      } catch (err) {
        console.error("Refresh token error:", err);
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user_id");
        window.location.href = "/login"; 
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
)

export default axiosClient