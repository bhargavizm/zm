// D:\previous\zm\src\components\dashboard\profile\Profile.jsx
"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserFullDetails } from "../QRCodeLists/fetchUserDetails";
import useServicesContext from "@/components/hooks/useServiceContext";
import LoadingSpinner from "@/components/common/spinner";
import { FiEdit, FiSave, FiX, FiMail, FiPhone, FiUser, FiCalendar, FiCheckCircle } from "react-icons/fi";
import axiosInstance from "@/lib/axiosInstance";
import toast from "react-hot-toast";

const Profile = () => {
  const { servicesDataLoading, setServicesDataLoading } = useServicesContext();
  const dispatch = useDispatch();
  const userFullData = useSelector(
    (state) => state?.authentication?.fullUserDetails
  );
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(getUserFullDetails(setServicesDataLoading));
  }, [dispatch, setServicesDataLoading]);

  useEffect(() => {
    if (userFullData?.userDetails) {
      setFormData({
        name: userFullData.userDetails.name || "",
        email: userFullData.userDetails.email || "",
        phone: userFullData.userDetails.phone || "",
      });
    }
  }, [userFullData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      
      // Basic validation
      if (!formData.name.trim()) {
        toast.error("Name is required");
        return;
      }
      
      if (!formData.email.trim()) {
        toast.error("Email is required");
        return;
      }
      
      if (!formData.phone.trim()) {
        toast.error("Phone number is required");
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        toast.error("Please enter a valid email address");
        return;
      }

      const res = await axiosInstance.put("/api/user/update-profile", formData);
      
      if (res.data.success) {
        toast.success("Profile updated successfully");
        setIsEditing(false);
        // Refresh user data
        dispatch(getUserFullDetails(setServicesDataLoading));
      } else {
        toast.error(res.data.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.response?.data?.message || error.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: userFullData?.userDetails?.name || "",
      email: userFullData?.userDetails?.email || "",
      phone: userFullData?.userDetails?.phone || "",
    });
    setIsEditing(false);
  };

  if (servicesDataLoading) {
    return <LoadingSpinner />;
  }

  // Calculate statistics from services data
  const calculateStats = () => {
    if (!userFullData?.services) return { totalQRCodes: 0, activeServices: 0, totalScans: 0 };
    
    const totalQRCodes = userFullData.services.reduce((total, service) => total + (service.count || 0), 0);
    const activeServices = userFullData.services.filter(service => service.count > 0).length;
    
    const totalScans = userFullData.services.reduce((total, service) => {
      return total + (service.data?.reduce((serviceTotal, item) => {
        return serviceTotal + (item.qrCodeDetails?.scanCount || 0);
      }, 0) || 0);
    }, 0);
    
    return { totalQRCodes, activeServices, totalScans };
  };

  const stats = calculateStats();

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-mainGreen">User Profile</h1>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 bg-mainGreen text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition"
          >
            <FiEdit /> Edit Profile
          </button>
        ) : (
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={handleSave}
              disabled={loading}
              className="flex items-center gap-2 bg-mainGreen text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition disabled:opacity-50"
            >
              <FiSave /> {loading ? "Saving..." : "Save Changes"}
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
            >
              <FiX /> Cancel
            </button>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-full">
                <FiUser className="text-blue-600" />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mainGreen"
                    placeholder="Enter your full name"
                  />
                ) : (
                  <p className="text-gray-900">{userFullData?.userDetails?.name || "Not provided"}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-full">
                <FiMail className="text-green-600" />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mainGreen"
                    placeholder="Enter your email address"
                  />
                ) : (
                  <p className="text-gray-900">{userFullData?.userDetails?.email}</p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-full">
                <FiPhone className="text-purple-600" />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mainGreen"
                    placeholder="Enter your phone number"
                  />
                ) : (
                  <p className="text-gray-900">{userFullData?.userDetails?.phone || "Not provided"}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
             {/* // to add more feilds // */}
            </div>
          </div>
        </div>

        {/* Account statistics */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-mainGreen mb-4">Account Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
              <h3 className="text-sm font-medium text-gray-700">Total QR Codes</h3>
              <p className="text-2xl font-bold text-mainGreen">
                {stats.totalQRCodes}
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
              <h3 className="text-sm font-medium text-gray-700">Active Services</h3>
              <p className="text-2xl font-bold text-mainGreen">
                {stats.activeServices}
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
              <h3 className="text-sm font-medium text-gray-700">Total Scans</h3>
              <p className="text-2xl font-bold text-mainGreen">
                {stats.totalScans}
              </p>
            </div>
          </div>
        </div>

        {/* Account creation date */}
        <div className="pt-6 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Member Since</h3>
              <p className="text-gray-600 flex items-center gap-2">
                <FiCalendar className="text-mainGreen" />
                {userFullData?.userDetails?.createdAt ? new Date(userFullData.userDetails.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                }) : "N/A"}
              </p>
            </div>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;