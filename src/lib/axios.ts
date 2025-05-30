import { setToken } from "@/store/slice/authSlice";
import { store } from "@/store/store";
import axios from "axios";
import Cookies from "js-cookie";
const axiosClient = axios.create({
  // baseURL:
  //  "https://ecommerce-be-production-60ab.up.railway.app/api",
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
})
axiosClient.interceptors.request.use((config) => {
  const token = Cookies.get("access_token");
  console.log("Current token:", token);
   if (config.headers) {
      config.headers.Authorization = token ? `Bearer ${token}` : "";
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
        const refreshToken = Cookies.get("refresh_token");
        const userId = Cookies.get("user_id"); 
        const res = await axiosClient.post("/users/refresh-token", {
          refreshToken,
          userId
        });
        const { accessToken, refreshToken: newRefreshToken } = res.data;
        store.dispatch(setToken(accessToken));
        console.log("New tokens:", accessToken, newRefreshToken);
        Cookies.set("access_token", accessToken);
        Cookies.set("refresh_token", newRefreshToken);
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axiosClient(originalRequest);
      } catch (err) {
        console.error("Refresh token error:", err);
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
        Cookies.remove("user_id");
        window.location.href = "/login"; 
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
)

export default axiosClient