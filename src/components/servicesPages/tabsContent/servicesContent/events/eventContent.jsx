"use client";
import LoadingSpinner from "@/components/common/spinner";
import useDesignContext from "@/components/hooks/useDesignContext";
import useServicesContext from "@/components/hooks/useServiceContext";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FiCalendar, FiMapPin, FiUser, FiEye, FiEyeOff } from "react-icons/fi";

const EventContent = () => {
  const { setActiveTab } = useDesignContext();
  const { slug } = useParams();
  const {
    eventsFormData,
    setEventsFormData,
    servicesDataLoading,
    setServicesDataLoading,
  } = useServicesContext();
  const [showPassword, setShowPassword] = useState(false);
  const [showLocationOptions, setShowLocationOptions] = useState(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [errors, setErrors] = useState({});

  const handlePassword = () => {
    setShowPassword((prev) => !prev);
  };

  // --- inside EventContent component ---

  // validation helper
  const validateField = (name, value) => {
    let errorMsg = "";

    if (name === "contactPhone") {
      const phoneRegex = /^[0-9]{10,15}$/;
      if (value && !phoneRegex.test(value)) {
        errorMsg = "Phone number must be 10–15 digits.";
      }
    }

    if (name === "contactEmail") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (value && !emailRegex.test(value)) {
        errorMsg = "Enter a valid email address.";
      }
    }

    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventsFormData((prev) => ({ ...prev, [name]: value }));

    // validate while typing
    validateField(name, value);
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

      // ✅ Direct Google Maps link
      const mapLink = `https://www.google.com/maps?q=${latitude},${longitude}`;

      setEventsFormData((prev) => ({
        ...prev,
        mapLink: mapLink, // <-- saves direct link, not address
      }));
    } catch (error) {
      console.error("Location fetch failed:", error);
      alert("Failed to fetch location. Please check location permissions.");
    } finally {
      setIsLoadingLocation(false);
    }
  };

  // --- handle file upload ---
 // --- handle file upload ---
const handleImageUpload = (e) => {
  const files = Array.from(e.target.files);

  // Calculate total size (already uploaded + new ones)
  let totalSize =
    eventsFormData.files.reduce((acc, f) => acc + f.size, 0) +
    files.reduce((acc, f) => acc + f.size, 0);

  // ✅ Only enforce total < 30MB
  if (totalSize > 30 * 1024 * 1024) {
    toast.error("Total upload size cannot exceed 30 MB.");
    return;
  }

  files.forEach((file, index) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setEventsFormData((prev) => ({
        ...prev,
        files: [
          ...prev.files,
          {
            id: `${file.name}-${Date.now()}-${index}`, // ✅ unique enough
            file,
            image: reader.result, // base64 preview
            size: file.size,
          },
        ],
      }));
    };
    reader.readAsDataURL(file);
  });

  // reset input so same file can be reselected if deleted
  e.target.value = null;
};


  // --- handle remove file ---
  const handleRemoveImage = (id) => {
    setEventsFormData((prev) => ({
      ...prev,
      files: prev.files.filter((file) => file.id !== id),
    }));
  };

  const handleInitialSubmit = (e) => {
    e.preventDefault();

    // ❌ If any validation errors exist, block modal
    if (Object.values(errors).some((err) => err)) {
      toast.error("Please fix validation errors before continuing.");
      return;
    }

    const isEmptyValue = (val) => {
      if (typeof val === "string") return val.trim() === "";
      if (Array.isArray(val)) return val.length === 0;
      if (val && typeof val === "object") {
        return Object.values(val).every((v) => isEmptyValue(v));
      }
      return !val;
    };

    const isCompletelyEmpty = Object.values(eventsFormData).every(isEmptyValue);

    if (isCompletelyEmpty) {
      toast.error("Enter at least one field before submitting");
      return;
    }

    // ✅ Only open modal if no errors + not empty
    setShowConfirmModal(true);
  };

  const handleConfirmedSubmit = async () => {
    console.log("formdata", eventsFormData);
    setActiveTab(slug, "Backdrop Designs");
  };

  return (
    <>
      {servicesDataLoading && <LoadingSpinner />}

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
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Map Link
                  </label>
                  <textarea
                    name="mapLink"
                    rows={3}
                    placeholder="Enter map link"
                    value={eventsFormData.mapLink || ""}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#59c1c1] focus:border-[#226161]"
                  />
                  <button
                    type="button"
                    onClick={fetchCurrentLocation}
                    disabled={isLoadingLocation}
                    className="mt-2 w-full flex items-center justify-center px-4 py-2 bg-[#0e7b7b] text-white rounded-lg hover:bg-[#066666] transition-colors"
                  >
                    {isLoadingLocation
                      ? "Fetching location..."
                      : "Use Current Location"}
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="contactEmail"
                    placeholder="Enter email address"
                    value={eventsFormData.contactEmail || ""}
                    onChange={handleChange}
                    className={`w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#59c1c1] ${
                      errors.contactEmail
                        ? "border-red-500"
                        : "border-gray-300 focus:border-[#226161]"
                    }`}
                  />
                  {errors.contactEmail && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.contactEmail}
                    </p>
                  )}
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
                    className={`w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#59c1c1] ${
                      errors.contactPhone
                        ? "border-red-500"
                        : "border-gray-300 focus:border-[#226161]"
                    }`}
                  />
                  {errors.contactPhone && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.contactPhone}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <label className="font-medium">Upload Event Card Images:</label>
              <p className="text-sm text-gray-500">
                Max  Files Size: 30 MB
              </p>

              <div className="relative mt-1 w-full py-2 px-4 border rounded-md">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer z-10"
                />
                <button
                  type="button"
                  className="bg-teal-600 text-white text-sm px-4 py-2 rounded-md font-medium pointer-events-none"
                >
                  Choose Files
                </button>
                <span className="ml-3 text-sm text-gray-500">
                  {eventsFormData.files.length > 0
                    ? `${eventsFormData.files.length} file${
                        eventsFormData.files.length > 1 ? "s" : ""
                      } selected`
                    : "No file selected"}
                </span>
              </div>

              {/* Previews */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                {eventsFormData.files.map((item) => (
                  <div key={item.id} className="relative w-full h-40  ">
                    <img
                      src={item.image}
                      className="w-full h-full object-center"
                      alt="Event Upload"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(item.id)}
                      className="absolute top-1 right-1 bg-white text-red-600 w-6 h-6 text-xs rounded-full flex items-center justify-center shadow"
                    >
                      ❌
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
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
                {!showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>

            {/* <NFCModal /> */}
            <div className="flex justify-center items-center">
              <button
                type="button"
                onClick={handleInitialSubmit}
                className="font-bold px-4 cursor-pointer bg-[#008080] text-white py-2 rounded transition-effects text-lg"
              >
                Next →
              </button>
            </div>
          </form>
        </div>

        {showConfirmModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/30">
            <div className="bg-white relative rounded-xl shadow-xl p-6 w-full max-w-xl max-h-[90vh] overflow-y-auto scrollbar-hide border border-teal-200 mx-4 sm:mx-auto">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
              >
                ❌
              </button>

              <h2 className="text-xl font-semibold text-gray-800 text-center">
                Confirm Submission
              </h2>

              {/* Text Summary */}
              <div className="text-sm text-gray-700 space-y-2 mt-2">
                {eventsFormData.organizer && (
                  <p>
                    <strong>Organizer Name:</strong> {eventsFormData.organizer}
                  </p>
                )}
                {eventsFormData.title && (
                  <p>
                    <strong>Event Name:</strong> {eventsFormData.title}
                  </p>
                )}
                {eventsFormData.summary && (
                  <p>
                    <strong>Event Summary:</strong> {eventsFormData.summary}
                  </p>
                )}
                {eventsFormData.fromDate && (
                  <p>
                    <strong>Start Date & Time:</strong>{" "}
                    {eventsFormData.fromDate}
                  </p>
                )}
                {eventsFormData.toDate && (
                  <p>
                    <strong>End Date & Time:</strong> {eventsFormData.toDate}
                  </p>
                )}
                {eventsFormData.venue && (
                  <p>
                    <strong>Venue Name:</strong> {eventsFormData.venue}
                  </p>
                )}
                {eventsFormData.address && (
                  <p>
                    <strong>Address:</strong> {eventsFormData.address}
                  </p>
                )}
                {eventsFormData.contactName && (
                  <p>
                    <strong>Contact Person:</strong>{" "}
                    {eventsFormData.contactName}
                  </p>
                )}
                {eventsFormData.contactEmail && (
                  <p>
                    <strong>Email:</strong> {eventsFormData.contactEmail}
                  </p>
                )}
                {eventsFormData.contactPhone && (
                  <p>
                    <strong>Phone:</strong> {eventsFormData.contactPhone}
                  </p>
                )}
                {eventsFormData.password && (
                  <p>
                    <strong>Password:</strong> {eventsFormData.password}
                  </p>
                )}
              </div>

              {/* 🔽 Image Preview Section if files exist */}
              {eventsFormData.files?.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-sm font-semibold text-gray-800 mb-2">
                    Uploaded Images:
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {eventsFormData.files.map((item) => (
                      <div
                        key={item.id}
                        className="w-full h-28 border rounded-md overflow-hidden shadow-sm"
                      >
                        <img
                          src={item.image}
                          alt="Preview"
                          className="w-full h-full object-center"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Buttons */}
              <div className="flex justify-end gap-4 pt-6">
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="px-4 py-2 rounded-lg cursor-pointer text-gray-600 border border-gray-300 hover:bg-gray-100"
                >
                  Back
                </button>
                <button
                  onClick={handleConfirmedSubmit}
                  className="px-4 py-2 rounded-lg cursor-pointer bg-teal-600 text-white hover:bg-teal-700"
                >
                  Continue
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
