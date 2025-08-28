"use client";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setDeleteUserFullData } from "@/redux/slices/authSlice";
import { getUserFullDetails } from "../dashboard/QRCodeLists/fetchUserDetails";

const DeleteServiceModal = ({ onClose, serviceData, onDeleted, servicesDataLoading, setServicesDataLoading }) => {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    setServicesDataLoading(true);
    try {
      const res = await axios.delete(
        `/api/delete/${serviceData.userId}/${serviceData.serviceName}/${serviceData.serviceId}`
      );

      if (res.data.success) {
        toast.success(res.data.message || "Service deleted successfully");
        onDeleted(serviceData.serviceId);
        dispatch(setDeleteUserFullData(serviceData.serviceId));
        getUserFullDetails(dispatch);
        onClose();
      } else {
        toast.error(res.data.error || "Failed to delete service");
      }
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.error || "Something went wrong!");
    } finally {
      setServicesDataLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/30">
      <div className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-red-500">❌</button>

        <h2 className="text-2xl font-bold text-center text-red-600 my-4"> Delete Service</h2>

        <p className="text-center text-lg my-4">
          Are you sure you want to delete <strong>{serviceData.serviceName}</strong>?
        </p>

        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 cursor-pointer font-semibold py-2 px-6 rounded-lg hover:bg-gray-400 transition"
            disabled={servicesDataLoading}
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            className="bg-red-600 text-white font-bold cursor-pointer py-2 px-6 rounded-lg hover:bg-red-700 transition"
            disabled={servicesDataLoading}
          >
            {servicesDataLoading ? "Deleting..." : "OK"}
          </button>
        </div>
      </div>
    </div>
  );
};


export default DeleteServiceModal;
