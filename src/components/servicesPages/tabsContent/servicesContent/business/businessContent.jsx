"use client";
import Image from "next/image";
import useServicesContext from "@/components/hooks/useServiceContext";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import React, { useState, useRef } from "react";
import { toast } from "react-hot-toast";
import { MapPin } from "lucide-react";
import useDesignContext from "@/components/hooks/useDesignContext";
import { useParams } from "next/navigation";
import { useDispatch } from "react-redux";
import LoadingSpinner from "@/components/common/spinner";

// New ConfirmationModal component
const ConfirmationModal = ({ show, onClose, onConfirm }) => {
  if (!show) return null;

  return (
            <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/30">
          <div className="bg-white relative rounded-xl shadow-xl p-6 w-full max-w-xl max-h-[90vh] border border-teal-200 mx-4 sm:mx-auto">
        <h3 className="text-lg font-semibold mb-4">Confirm Submission</h3>
        <p className="mb-6">
          Are you sure you want to submit? Please review all details before
          confirming.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
          >
            Back
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-md bg-[#008080] text-white hover:bg-[#006666] transition-colors duration-200"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

const BusinessContent = () => {
  const {
    businessForm,
    setBusinessForm,
    servicesDataLoading,
    setServicesDataLoading,
  } = useServicesContext();
  const dispatch = useDispatch();
  const { setActiveTab } = useDesignContext();
  const { slug } = useParams();
const [errors, setErrors] = useState({});

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false); // New state for confirmation modal

  const fileInputRef = useRef(null);

  const templateImages = ["bc.webp", "bc2.webp", "bc3.webp", "bc4.webp"];

const handleInputChange = (idOrEvent, value = null) => {
  let field, fieldValue;

  if (typeof idOrEvent === "string") {
    field = idOrEvent;
    fieldValue = value;
  } else {
    field = idOrEvent.target.id;
    fieldValue = idOrEvent.target.value;
  }

  // Update form data
  setBusinessForm((prev) => ({ ...prev, [field]: fieldValue }));

  // Live validation
  let errorMessage = "";

  if (field === "mobile" && fieldValue.trim()) {
    const phoneRegex = /^\d{10,15}$/;
    if (!phoneRegex.test(fieldValue)) {
      errorMessage = "Phone number must be 10 to 15 digits";
    }
  }

  if (field === "email" && fieldValue.trim()) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(fieldValue)) {
      errorMessage = "Please enter a valid email address";
    }
  }

  // if (field === "mapLink" && fieldValue.trim()) {
  //   try {
  //     new URL(fieldValue);
  //   } catch {
  //     errorMessage = "Please enter a valid URL";
  //   }
  // }

  // ✅ New: Validate social media links 1–12
  if (
    /^socialLink\d{0,2}$/.test(field) && // matches socialLink, socialLink2, ... socialLink12
    fieldValue.trim()
  ) {
    try {
      new URL(fieldValue);
    } catch {
      errorMessage = "Please enter a valid URL";
    }
  }

  setErrors((prev) => ({ ...prev, [field]: errorMessage }));
};



 const fetchCurrentLocation = async () => {
  if (!navigator.geolocation) {
    toast.error("Geolocation not supported in your browser.");
    return;
  }

  try {
    const pos = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      });
    });

    const { latitude, longitude } = pos.coords;

    // Direct Google Maps link
    const googleMapLink = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

    // Update the mapLink input
    handleInputChange("mapLink", googleMapLink);
  } catch (err) {
    console.error("Error fetching current location:", err.code, err.message);

    // Show user-friendly error messages
    switch (err.code) {
      case 1:
        toast.error("Permission denied. Please allow location access.");
        break;
      case 2:
        toast.error("Position unavailable. Try again later.");
        break;
      case 3:
        toast.error("Location request timed out.");
        break;
      default:
        toast.error("Failed to fetch location.");
    }
  }
};

const handleImageUpload = (e) => {
  const file = e.target.files[0];

  if (file) {
    const maxSizeInBytes = 30 * 1024 * 1024; // 30MB

    if (file.size > maxSizeInBytes) {
      toast.error("File size exceeds 30MB limit.");
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Clear file input
      }
      return;
    }

    const previewUrl = URL.createObjectURL(file);

    setBusinessForm((prev) => ({
      ...prev,
      profileImageUrl: file,      // Store actual file
      previewImageUrl: previewUrl, // Store preview URL
    }));
  }
};



  const handleImageRemove = () => {
    setBusinessForm((prev) => ({
      ...prev,
      profileImageUrl: "",
      previewImageUrl: "", // ✅ also clear the preview image
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // This function is now responsible for opening the confirmation modal
  const handlePreSubmit = (e) => {
  e.preventDefault();

  // ✅ Ensure at least one field is filled
  const isAnyFieldFilled = Object.values(businessForm).some(
    (value) => typeof value === "string" && value.trim() !== ""
  );

  if (!isAnyFieldFilled) {
    toast.error("Please fill in at least one field before submitting.");
    return;
  }

  // ✅ Check for any existing validation errors before opening modal
  const hasErrors = Object.values(errors).some((msg) => msg && msg.trim() !== "");
  if (hasErrors) {
    toast.error("Please fix all highlighted errors before continuing.");
    return;
  }

  // ✅ Open confirmation modal only if there are no errors
  setShowConfirmModal(true);
};






  // This function is called when the user confirms in the modal
  const handleConfirmSubmit = async () => {
    setActiveTab(slug, "Backdrop Designs");
   
  };
  return (
    <>
      {servicesDataLoading && <LoadingSpinner />}

      <div>
        <div className="grid grid-cols-1 gap-10">
          <div className="bg-white shadow-xl rounded-xl p-6 space-y-6">
            {/* Templates */}
            <div>
              <h2 className="text-xl font-semibold mb-4">
                Choose a Template (click to select)
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {templateImages.map((filename, idx) => (
                  <div
                    key={idx}
                    className={`rounded-md p-2 cursor-pointer transition hover:shadow-lg ${
                      businessForm.selectedTemplate === filename
                        ? "border-2 border-[#008080]"
                        : "border border-gray-300"
                    }`}
                    onClick={() =>
                      setBusinessForm({
                        ...businessForm,
                        selectedTemplate: filename,
                      })
                    }
                  >
                    <Image
                      src={`/business-card-templates/${filename}`}
                      alt={`Template ${idx + 1}`}
                      width={100}
                      height={120}
                      className="object-center rounded"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Image Uploads */}
            <div className="grid grid-cols-2 gap-4 items-start">
              <div className="mb-4">
                <label className="block mb-1 font-medium text-sm">
                  Brand Logo 
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="block w-full text-sm text-gray-700
      file:mr-4 file:py-2 file:px-2
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-[#008080] file:text-white
      hover:file:bg-[#006666]
      transition duration-200 cursor-pointer"
                />

                {/* {profileImage && (
                  <div className="mt-4 relative w-[90px] sm:w-[100px]">
                    <Image
                      src={profileImage}
                      alt="Uploaded Logo"
                      width={100}
                      height={100}
                      className="w-full h-auto rounded border object-contain"
                    />
                    <button
                      onClick={handleImageRemove}
                      className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center hover:bg-red-700"
                      title="Remove image"
                    >
                      ❌
                    </button>
                  </div>
                )} */}
                {businessForm.previewImageUrl && (
                  <div className="mt-4 relative w-[90px] sm:w-[100px]">
                    <Image
                      src={businessForm.previewImageUrl}
                      alt="Uploaded Logo"
                      width={100}
                      height={100}
                      className="w-full h-auto rounded border object-contain"
                    />
                    <button
                      onClick={handleImageRemove}
                      className="absolute -top-2 -right-2 bg-white rounded-full w-5 h-5 text-xs flex items-center justify-center hover:bg-red-700"
                      title="Remove image"
                    >
                      ❌
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { id: "name", placeholder: "Name" },
                { id: "subheading", placeholder: "Company" },
                { id: "mobile", placeholder: "Mobile Number", type: "tel" },
                { id: "designation", placeholder: "Designation" },

                
                { id: "email", placeholder: "Email", type: "email" },
                { id: "socialLink", placeholder: "Social Media Link" },
                { id: "socialLink2", placeholder: "Social Media Link2" },
                { id: "address", placeholder: "Address" },
                { id: "mapLink", placeholder: "Map Link", type: "url" },
                {
                  id: "password",
                  placeholder: "Password",
                  type: "password",
                },
              ].map(({ id, placeholder, type = "text" }) => {
                if (id === "password") {
                  return (
                    <div key={id} className="w-full">
                      <label
                        htmlFor={id}
                        className="block mb-1 text-sm font-medium text-gray-700"
                      >
                        {placeholder}
                      </label>
                      <div className="relative">
                        <input
                          id={id}
                          type={showPassword ? "text" : "password"}
                          value={businessForm[id] || ""}
                          onChange={handleInputChange}
                          placeholder={placeholder}
                          className="border p-2 pr-10 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#008080] placeholder:text-gray-400"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((prev) => !prev)}
                          className="absolute inset-y-0 right-3 flex items-center text-gray-600"
                        >
                          {showPassword ? (
                            <AiOutlineEye size={20} />
                          ) : (
                            <AiOutlineEyeInvisible size={20} />
                          )}
                        </button>
                      </div>
                    </div>
                  );
                }

                if (id === "address") {
                  return (
                    <div
                      key="address"
                      className="space-y-2 col-span-1 md:col-span-2"
                    >
                      <label
                        htmlFor={id}
                        className="text-sm font-medium text-gray-700"
                      >
                        {placeholder}:
                      </label>
                      <textarea
                        id="address"
                        value={businessForm.address || ""}
                        onChange={handleInputChange}
                        placeholder="Address"
                        rows={3}
                        className="border p-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#008080] resize-none"
                      />
                    </div>
                  );
                }

                if (id === "mapLink") {
                  return (
                    <div
                      key="mapLink"
                      className="space-y-2 col-span-1 md:col-span-2"
                    >
                      <label
                        htmlFor={id}
                        className="text-sm font-medium text-gray-700"
                      >
                        {placeholder}:
                      </label>
                      <textarea
                        id="mapLink"
                        value={businessForm.mapLink || ""}
                        onChange={handleInputChange}
                        placeholder="Map Link"
                        rows={3}
                        className="border p-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#008080] resize-none"
                      />
                      <button
                        type="button"
                        onClick={fetchCurrentLocation}
                        className="flex items-center justify-center w-full py-2 px-3 bg-mainGreen  text-white text-sm rounded-lg transition-colors duration-200 cursor-pointer"
                      >
                        <MapPin size={16} className="mr-2" />
                        Use Current Location
                      </button>
                    </div>
                  );
                }

                return (
                  <div key={id} className="flex flex-col space-y-1">
                    <label
                      htmlFor={id}
                      className="text-sm font-medium text-gray-700"
                    >
                      {placeholder} :
                    </label>
                    <input
  id={id}
  type={type}
  value={businessForm[id] || ""}
  onChange={handleInputChange}
  placeholder={placeholder}
  className="border p-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#008080]"
/>
{errors[id] && <p className="text-red-500 text-sm">{errors[id]}</p>}

                  </div>
                  
                );
              })}
            </div>

            <div className="flex justify-center items-center">
              <button
                type="submit"
                onClick={handlePreSubmit} // Call pre-submit to open the modal first
                className="font-bold px-4 cursor-pointer bg-[#008080] text-white py-2 rounded transition-effects text-lg"
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Confirmation Modal */}
      <ConfirmationModal
        show={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmSubmit}
      />
    </>
  );
};

export default BusinessContent;
