// hooks/useLogout.js
"use client";

import axios from "axios";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { logoutUser } from "@/redux/slices/authSlice";

const useLogout = () => {
  const dispatch = useDispatch();

  const logout = async () => {
    try {
      await axios.post("/api/logout", {}, { withCredentials: true }); // ✅ Clear cookie
      dispatch(logoutUser()); // ✅ Clear Redux
      toast.success("Logged out successfully");
    } catch (err) {
      console.error("Logout error:", err);
      toast.error("Logout failed. Try again.");
    }
  };

  return logout;
};

export default useLogout;
