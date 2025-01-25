import axios from "axios";
import { baseURL } from "@/constants/config";

const axiosInstance = axios.create({
  baseURL: baseURL,
});

// Add an interceptor to dynamically set the token
axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
