// components/EventContent.jsx
"use client";

import useServicesContext from "@/components/hooks/useServiceContext";
import NFCModal from "@/components/modalPopUps/nfcModal";
import React, { useState } from "react";
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

const EventContent = () => {
  const { eventsFormData, setEventsFormData } = useServicesContext();

  const [showPassword, setShowPassword] = useState(false);
  const [showLocationOptions, setShowLocationOptions] = useState(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventsFormData((prev) => ({ ...prev, [name]: value }));
  };

  // const handleGetCurrentLocation = () => {
  //   setIsLoadingLocation(true);
  //   setShowLocationOptions(false);

  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         const { latitude, longitude } = position.coords;
  //         setEventsFormData((prev) => ({
  //           ...prev,
  //           address: `Latitude: ${latitude.toFixed(
  //             4
  //           )}, Longitude: ${longitude.toFixed(4)}`,
  //         }));
  //         setIsLoadingLocation(false);
  //       },
  //       (error) => {
  //         console.error("Error getting location:", error);
  //         setIsLoadingLocation(false);
  //       }
  //     );
  //   } else {
  //     alert("Geolocation is not supported by this browser.");
  //     setIsLoadingLocation(false);
  //   }
  // };

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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
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
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Address
  </label>
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

            {/* About */}
            

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
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
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

            {/* Web Links */}
            

            <NFCModal />

            <button type="button" className="w-full py-2 cursor-pointer bg-[#008080] text-white font-semibold rounded hover:bg-[#006666] transition">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EventContent;
