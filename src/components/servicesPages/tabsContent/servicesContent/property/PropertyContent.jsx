"use client";

import React, { useState, useRef } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { MapPin } from "lucide-react";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setPropertyServices } from "@/redux/slices/servicesSlice";
import useServicesContext from "@/components/hooks/useServiceContext";
import useDesignContext from "@/components/hooks/useDesignContext";
import LoadingSpinner from "@/components/common/spinner";

const PropertyContent = () => {
  const {
    propertyDetails,
    setPropertyDetails,
    servicesDataLoading,
    setServicesDataLoading,
  } = useServicesContext();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [galleryPreview, setGalleryPreview] = useState([]);
  const [errors, setErrors] = useState({});
  const galleryInputRef = useRef(null);
  const { slug } = useParams();
  const { setActiveTab } = useDesignContext();
  const router = useRouter();
  const dispatch = useDispatch();

  const phoneRegex = /^[0-9]{10,15}$/;

  const sections = {
    basicInfo: [
      "propertyName",
      "propertyType",
      "ownerName",
      "contactNumber",
      "alternateNumber",
      "propertyDescription",
    ],
    addressInfo: ["address", "mapLink"],
    pricingInfo: ["price", "area", "amenities"],
    images: ["galleryImages"],
  };

  // ✅ validation rules
  const validateField = (section, key, value) => {
    let error = "";
    if (
      ["propertyName", "propertyType", "ownerName"].includes(key) &&
      !value.trim()
    ) {
      error = `${key.replace(/([A-Z])/g, " $1")} is required.`;
    }
    if (key === "contactNumber" && value && !phoneRegex.test(value)) {
      error = "Invalid contact number.";
    }
    if (key === "alternateNumber" && value && !phoneRegex.test(value)) {
      error = "Invalid alternate number.";
    }
    if (key === "price" && value && isNaN(value)) {
      error = "Price must be numeric.";
    }
    if (key === "area" && value && isNaN(value)) {
      error = "Area must be numeric.";
    }
    setErrors((prev) => ({
      ...prev,
      [`${section}.${key}`]: error,
    }));
  };

  const handleChange = (section, key, value) => {
    setPropertyDetails((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
    validateField(section, key, value);
  };

const handleImageChange = (section, key, files) => {
  const newValidFiles = [];
  const newPreviews = [];
  let newSize = 0;

  for (const file of files) {
    newSize += file.size;
    newValidFiles.push(file);
    newPreviews.push({ file, url: URL.createObjectURL(file) });
  }

  const existingSize = galleryPreview.reduce(
    (acc, item) => acc + item.file.size,
    0
  );
  const totalSize = existingSize + newSize;

  // ✅ Only check total size
  if (totalSize > 30 * 1024 * 1024) {
    toast.error("Total image size must be less than 30MB");
    return;
  }

  const updatedPreviews = [...galleryPreview, ...newPreviews];
  setGalleryPreview(updatedPreviews);
  handleChange(section, key, updatedPreviews.map((item) => item.file));
};


  const handleDeleteImage = (index) => {
    const newPreview = [...galleryPreview];
    newPreview.splice(index, 1);
    setGalleryPreview(newPreview);
    handleChange(
      "images",
      "galleryImages",
      newPreview.map((item) => item.file)
    );
    if (galleryInputRef.current) galleryInputRef.current.value = "";
  };

const fetchCurrentLocation = async () => {
  if (navigator.geolocation) {
    try {
      const pos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        });
      });

      const { latitude, longitude } = pos.coords;

      // ✅ Direct Google Maps link
      const mapLink = `https://www.google.com/maps?q=${latitude},${longitude}`;

      // If you prefer OpenStreetMap, use:
      // const mapLink = `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=18/${latitude}/${longitude}`;

      handleChange("addressInfo", "mapLink", mapLink);
    } catch (err) {
      toast.error("Failed to fetch location. Please check permissions.");
      console.error("Location error:", err);
    }
  } else {
    toast.error("Geolocation not supported in your browser.");
  }
};


  const handleInitialSubmit = (e) => {
    e.preventDefault();

    // check if any errors
    const hasErrors = Object.values(errors).some((err) => err);
    if (hasErrors) {
      toast.error("Please fix errors before submitting.");
      return;
    }

    const allValues = Object.values(propertyDetails).flatMap((section) =>
      typeof section === "object" && !Array.isArray(section)
        ? Object.values(section || {})
        : [section]
    );

    const hasNonEmptyValue = allValues.some((value) =>
      Array.isArray(value)
        ? value.length > 0
        : typeof value === "string"
        ? value.trim() !== ""
        : !!value
    );

    if (!hasNonEmptyValue) {
      toast.error("Enter at least one field before submitting");
      return;
    }

    setShowConfirmModal(true);
  };

  const handleConfirmedSubmit = async () => {
    setActiveTab(slug, "Backdrop Designs");
  };

  return (
    <>
      {servicesDataLoading && <LoadingSpinner />}

      <div className="space-y-6">
        <h1 className="text-3xl font-bold pb-6 text-[#008080]">
          Property QR Code
        </h1>

        {Object.entries(sections).map(([section, fields]) => (
          <div
            key={section}
            className="border rounded p-4 shadow-sm space-y-4"
          >
            <h3 className="text-xl font-semibold capitalize text-[#008080]">
              {section.replace(/([A-Z])/g, " $1")}
            </h3>

            {fields.map((key) => (
              <div key={key} className="flex flex-col space-y-2">
                {key === "galleryImages" ? (
                  <>
                    <div className="flex items-center gap-4">
                      <label className="relative cursor-pointer bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200">
                        Choose Files
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          ref={galleryInputRef}
                          onChange={(e) =>
                            handleImageChange(
                              section,
                              key,
                              Array.from(e.target.files)
                            )
                          }
                          className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                        />
                      </label>
                      <span className="text-sm text-gray-700">
  {galleryPreview.length > 0
    ? `${galleryPreview.length} file${galleryPreview.length > 1 ? "s" : ""} selected`
    : "No files selected"}
</span>

                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {galleryPreview.map((item, idx) => (
                        <div
                          key={idx}
                          className="relative w-24 h-24 rounded border overflow-hidden shadow-sm"
                        >
                          <img
                            src={item.url}
                            alt={`Preview ${idx + 1}`}
                            className="object-center w-full h-full"
                          />
                          <button
                            onClick={() => handleDeleteImage(idx)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center hover:bg-red-600"
                            title="Remove"
                          >
                            &times;
                          </button>
                        </div>
                      ))}
                    </div>
                  </>
                ) :key === "address" ? (
      <div className="space-y-2">
        <textarea
          rows={3}
          name={key}
          placeholder="Address"
          value={propertyDetails[section][key] || ""}
          onChange={(e) => handleChange(section, key, e.target.value)}
          className="border p-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#008080] resize-none"
        />
        {errors[`${section}.${key}`] && (
          <p className="text-red-500 text-sm">
            {errors[`${section}.${key}`]}
          </p>
        )}
      </div>
    ) : key === "mapLink" ? (
      <div className="space-y-2">
        <textarea
          rows={4}
          type="text"
          name={key}
          placeholder="Map Link"
          value={propertyDetails[section][key] || ""}
          onChange={(e) => handleChange(section, key, e.target.value)}
          className="border p-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#008080]"
        />
        {errors[`${section}.${key}`] && (
          <p className="text-red-500 text-sm">
            {errors[`${section}.${key}`]}
          </p>
        )}
        <button
          type="button"
          onClick={fetchCurrentLocation}
          className="flex items-center justify-center w-full py-2 px-3 bg-[#008080] hover:bg-[#006666] text-white text-sm rounded-lg transition-colors duration-200 cursor-pointer"
        >
          <MapPin size={16} className="mr-2" />
          Use Current Location
        </button>
      </div>
    ) : (
                  <>
                    <input
                      type="text"
                      name={key}
                      placeholder={key.replace(/([A-Z])/g, " $1")}
                      value={propertyDetails[section][key] || ""}
                      onChange={(e) =>
                        handleChange(section, key, e.target.value)
                      }
                      className={`border p-2 rounded ${
                        errors[`${section}.${key}`]
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    {errors[`${section}.${key}`] && (
                      <p className="text-red-500 text-sm">
                        {errors[`${section}.${key}`]}
                      </p>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        ))}

        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={propertyDetails.password || ""}
            onChange={(e) =>
              setPropertyDetails((prev) => ({
                ...prev,
                password: e.target.value,
              }))
            }
            className="border p-2 pr-10 rounded w-full"
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-[#008080]"
          >
            {showPassword ? (
              <IoEyeOutline size={20} />
            ) : (
              <IoEyeOffOutline size={20} />
            )}
          </span>
        </div>

        <div className="flex justify-center items-center pt-6">
          <button
            type="submit"
            onClick={handleInitialSubmit}
            className="font-bold px-4 cursor-pointer bg-[#008080] text-white py-2 rounded transition-effects text-lg"
          >
            Next →
          </button>
        </div>

        {showConfirmModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/30">
            <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full border border-teal-200 relative">
              <h2 className="text-lg font-semibold text-gray-800">
                Confirm Submission
              </h2>
              <p className="text-gray-600 text-sm mt-2">
                Are you sure you want to submit this property listing? Please
                review details before confirming.
              </p>
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

export default PropertyContent;

