// lib/axiosInstance.js
"use client";

import axios from "axios";
import { toast } from "react-hot-toast";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const message = error?.response?.data?.error || "";

    // 🔐 Handle session expiration
    if (status === 401 && message.toLowerCase().includes("session expired")) {
      toast.error("Session expired. Redirecting to login...");

      // Optional: clear any auth storage or cookies
      // document.cookie = "token=; Max-Age=0; path=/;";

      setTimeout(() => {
        window.location.href = "/login"; // redirect to login
      }, 1000);
    }

    // Let other handlers deal with it
    return Promise.reject(error);
  }
);

export default axiosInstance;
