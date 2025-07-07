"use client";

import useServicesContext from "@/components/hooks/useServiceContext";
import NFCModal from "@/components/modalPopUps/nfcModal";
import { setEventServices } from "@/redux/slices/servicesSlice";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import {
  FiCalendar,
  FiMapPin,
  FiUser,
  FiMail,
  FiPhone,
  FiGlobe,
  FiPlus,
  FiX,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import { useDispatch } from "react-redux";

const EventContent = () => {
  const { eventsFormData, setEventsFormData } = useServicesContext();

  const [showPassword, setShowPassword] = useState(false);
  const [showLocationOptions, setShowLocationOptions] = useState(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const handlePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventsFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInitialSubmit = (e) => {
    e.preventDefault();
    setShowConfirmModal(true);
  };

  const fetchCurrentLocation = async () => {
    setIsLoadingLocation(true);
    try {
      const position = await new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        })
      );

      const { latitude, longitude } = position.coords;
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
      );
      const data = await response.json();
      const fullAddress = data.display_name || "Address not found";

      setEventsFormData((prev) => ({
        ...prev,
        address: fullAddress,
      }));
    } catch (error) {
      console.error("Location fetch failed:", error);
      alert("Failed to fetch address. Please check location permissions.");
    } finally {
      setIsLoadingLocation(false);
    }
  };

  const handleConfirmedSubmit = async () => {
    const payload = {
      organizer: eventsFormData.organizer,
      title: eventsFormData.title,
      summary: eventsFormData.summary,
      fromDate: eventsFormData.fromDate,
      toDate: eventsFormData.toDate,
      venue: eventsFormData.venue,
      address: eventsFormData.address,
      contactName: eventsFormData.contactName,
      contactEmail: eventsFormData.contactEmail,
      contactPhone: eventsFormData.contactPhone,
    };

    try {
      const response = await axios.post("/api/services/event", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.success) {
        dispatch(setEventServices(response.data.fileData));
        toast.success("Text submitted successfully!");
        setShowConfirmModal(false);

        // Reset form
        setEventsFormData({
          organizer: "",
          title: "",
          summary: "",
          fromDate: "",
          toDate: "",
          venue: "",
          address: "",
          contactName: "",
          contactEmail: "",
          contactPhone: "",
          password: "",
        });
      }
    } catch (error) {
      const errMsg = error?.response?.data?.error || "An unexpected error occurred.";
      toast.error(`❌ ${errMsg}`);
      console.error("Submit Error:", errMsg);
    }
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row">
        <div className="p-8 flex-1">
          <form className="space-y-8">
            {/* Basic Info */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-[#0a5e5e] flex items-center">
                <FiUser className="mr-2" /> Basic Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Organizer Name
                  </label>
                  <input
                    type="text"
                    name="organizer"
                    placeholder="Enter host/organizer name"
                    value={eventsFormData.organizer || ""}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#59c1c1] focus:border-[#226161]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Event Name
                  </label>
                  <input
                    type="text"
                    name="title"
                    placeholder="Enter event name"
                    value={eventsFormData.title || ""}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#59c1c1] focus:border-[#226161]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Event Summary
                  </label>
                  <textarea
                    name="summary"
                    placeholder="A short summary about the event"
                    value={eventsFormData.summary || ""}
                    onChange={handleChange}
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#59c1c1] focus:border-[#226161]"
                  />
                </div>
              </div>
            </div>

            {/* Schedule */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-[#0e7b7b] flex items-center">
                <FiCalendar className="mr-2" /> Schedule
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    name="fromDate"
                    value={eventsFormData.fromDate || ""}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#59c1c1] focus:border-[#226161]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    name="toDate"
                    value={eventsFormData.toDate || ""}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#59c1c1] focus:border-[#226161]"
                  />
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-[#0e7b7b] flex items-center">
                <FiMapPin className="mr-2" /> Location
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Venue Name
                  </label>
                  <input
                    type="text"
                    name="venue"
                    placeholder="Enter venue name"
                    value={eventsFormData.venue || ""}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#59c1c1] focus:border-[#226161]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <textarea
                    name="address"
                    rows={3}
                    placeholder="Enter full event address"
                    value={eventsFormData.address || ""}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#59c1c1] focus:border-[#226161]"
                  />
                  <button
                    type="button"
                    onClick={fetchCurrentLocation}
                    disabled={isLoadingLocation}
                    className="mt-2 w-full flex items-center justify-center px-4 py-2 bg-[#0e7b7b] text-white rounded-lg hover:bg-[#066666] transition-colors"
                  >
                    {isLoadingLocation ? "Fetching location..." : "Use Current Location"}
                  </button>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-[#0e7b7b] flex items-center">
                <FiUser className="mr-2" /> Contact Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Person
                  </label>
                  <input
                    type="text"
                    name="contactName"
                    placeholder="Enter contact person name"
                    value={eventsFormData.contactName || ""}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#59c1c1] focus:border-[#226161]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="contactEmail"
                    placeholder="Enter email address"
                    value={eventsFormData.contactEmail || ""}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#59c1c1] focus:border-[#226161]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    name="contactPhone"
                    placeholder="Enter phone number"
                    value={eventsFormData.contactPhone || ""}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#59c1c1] focus:border-[#226161]"
                  />
                </div>
              </div>
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter password"
                value={eventsFormData.password || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:ring-2 focus:ring-[#59c1c1] focus:border-[#226161]"
              />
              <button
                type="button"
                onClick={handlePassword}
                className="absolute right-3 top-9 text-gray-600"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>

            <NFCModal />

            <button
              type="button"
              onClick={handleInitialSubmit}
              className="w-full py-2 cursor-pointer bg-[#008080] text-white font-semibold rounded hover:bg-[#006666] transition"
            >
              Submit
            </button>
          </form>
        </div>

        {showConfirmModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/30">
            <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full border border-teal-200 relative">
              <h2 className="text-lg font-semibold text-gray-800">Confirm Submission</h2>
              <div className="text-sm text-gray-700 space-y-2">
                {eventsFormData.organizer && (
                  <p><strong>Organizer Name:</strong> {eventsFormData.organizer}</p>
                )}
                {eventsFormData.title && (
                  <p><strong>Event Name:</strong> {eventsFormData.title}</p>
                )}
                {eventsFormData.summary && (
                  <p><strong>Event Summary:</strong> {eventsFormData.summary}</p>
                )}
                {eventsFormData.fromDate && (
                  <p><strong>Start Date & Time:</strong> {eventsFormData.fromDate}</p>
                )}
                {eventsFormData.toDate && (
                  <p><strong>End Date & Time:</strong> {eventsFormData.toDate}</p>
                )}
                {eventsFormData.venue && (
                  <p><strong>Venue Name:</strong> {eventsFormData.venue}</p>
                )}
                {eventsFormData.address && (
                  <p><strong>Address:</strong> {eventsFormData.address}</p>
                )}
                {eventsFormData.contactName && (
                  <p><strong>Contact Person:</strong> {eventsFormData.contactName}</p>
                )}
                {eventsFormData.contactEmail && (
                  <p><strong>Email:</strong> {eventsFormData.contactEmail}</p>
                )}
                {eventsFormData.contactPhone && (
                  <p><strong>Phone:</strong> {eventsFormData.contactPhone}</p>
                )}
                {eventsFormData.password && (
                  <p><strong>Password:</strong> {eventsFormData.password}</p>
                )}
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="px-4 py-2 rounded-lg text-gray-600 border border-gray-300 hover:bg-gray-100"
                >
                  Back
                </button>
                <button
                  onClick={handleConfirmedSubmit}
                  className="px-4 py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700"
                >
                  Confirm & Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default EventContent;
