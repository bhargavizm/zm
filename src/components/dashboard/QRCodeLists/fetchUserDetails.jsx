// /app/user-dashboard/createqrcode/fetchUserDetails.js
import axiosInstance from "@/lib/axiosInstance";
import { setGetUserFullData } from "@/redux/slices/authSlice";
import toast from "react-hot-toast";

export const getUserFullDetails = (setLoading) => async (dispatch) => {
  try {
    setLoading(true); // start loading
    const res = await axiosInstance.get("/api/userDetails");

    if (res.data.success) {
      dispatch(setGetUserFullData(res.data.userFullDetails));
    //   toast.success(res.data.message);
    } else {
      toast.error(res.data.message || "Failed to fetch user details");
    }
  } catch (err) {
    console.error(err);
    toast.error(err?.response?.data?.error || "Something went wrong!");
  } finally {
    setLoading(false); // stop loading
  }
};
