"use client";
import React, { useState, useRef } from "react";
import useServicesContext from "@/components/hooks/useServiceContext";
import { Eye, EyeOff } from "lucide-react";
import { IoLocation } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import NFCModal from "@/components/modalPopUps/nfcModal";
import useDesignContext from "@/components/hooks/useDesignContext";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";
import LoadingSpinner from "@/components/common/spinner";
import axios from "axios";

const MAX_FILE_SIZE_MB = 2; // Per file
const MAX_TOTAL_SIZE_MB = 30;

const BusinessShopContent = () => {
  const { businessShopFormData, setBusinessShopFormData } =
    useServicesContext();
  const { setBgDesign } = useDesignContext();
  const { setActiveTab } = useDesignContext();
  const { slug } = useParams();
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    phone: "",
    altPhone: "",
    email: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const logoInputRef = useRef(null);

  const validatePhone = (phone) => {
    if (phone && !/^\d{10,15}$/.test(phone)) {
      return "Phone number must be between 10 to 15 digits";
    }
    return "";
  };

  const validateEmail = (email) => {
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return "Please enter a valid email address";
    }
    return "";
  };

 const handleChange = (section, field, value) => {
  if (section === "contact") {
    setBusinessShopFormData((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        [field]: value,
      },
    }));

    // ✅ Live validation
    if (field === "phone") {
      setErrors((prev) => ({ ...prev, phone: validatePhone(value) }));
    }
    if (field === "altPhone") {
      setErrors((prev) => ({ ...prev, altPhone: validatePhone(value) }));
    }
    if (field === "email") {
      setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
    }
  } else {
    setBusinessShopFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }
};


  const handleFileChange = (field, files) => {
    const newFiles = Array.from(files);

    // Validate per-file size
    for (const file of newFiles) {
      const sizeInMB = file.size / (1024 * 1024);
      if (sizeInMB > MAX_FILE_SIZE_MB) {
        toast.error(`${file.name} exceeds 2MB limit`);
        return;
      }
    }

    // Calculate total size with existing files
    let totalSize = 0;

    if (field === "shopImages") {
      const existingFiles = businessShopFormData.shopImages || [];
      const allFiles = [...existingFiles, ...newFiles];

      totalSize = allFiles.reduce((acc, file) => {
        const size = typeof file === "string" ? 0 : file.size;
        return acc + size;
      }, 0);

      if (totalSize > MAX_TOTAL_SIZE_MB * 1024 * 1024) {
        toast.error("Total gallery size must not exceed 30MB");
        return;
      }

      setBusinessShopFormData((prev) => ({
        ...prev,
        shopImages: allFiles,
      }));
    }

    if (field === "shopLogo") {
      const sizeInMB = newFiles[0]?.size / (1024 * 1024);
      if (sizeInMB > MAX_FILE_SIZE_MB) {
        toast.error(`${newFiles[0].name} exceeds 2MB limit`);
        return;
      }

      setBusinessShopFormData((prev) => ({
        ...prev,
        shopLogo: newFiles[0],
      }));
    }
  };

  const removeImage = (field, index = null) => {
    if (field === "shopLogo") {
      setBusinessShopFormData((prev) => ({ ...prev, shopLogo: "" }));
      if (logoInputRef.current) {
        logoInputRef.current.value = ""; // ✅ Clears the file name from input
      }
    } else if (field === "shopImages" && index !== null) {
      const updatedImages = [...businessShopFormData.shopImages];
      updatedImages.splice(index, 1);
      setBusinessShopFormData((prev) => ({
        ...prev,
        shopImages: updatedImages,
      }));
    }
  };

  const handleTemplateSelect = (templateName) => {
    setBusinessShopFormData((prev) => ({
      ...prev,
      selectedTemplate: templateName,
    }));

    setBgDesign("");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const fetchCurrentLocation = async () => {
    if (navigator.geolocation) {
      try {
        const pos = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        const { latitude, longitude } = pos.coords;

        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
        );
        const data = await response.json();
        const fullAddress = data.display_name || "Address not found";

        handleChange("contact", "address", fullAddress);
      } catch (err) {
        console.error("Error fetching current location:", err.message);
        toast.error("Could not fetch current location. Please enter manually.");
      }
    } else {
      toast.warn("Geolocation is not supported by this browser.");
    }
  };

  const isFormEmpty = () => {
    const {
      businessName,
      businessType,
      description,
      shopTimings,
      discount,
      contact,
      shopLogo,
      shopImages,
      password,
    } = businessShopFormData;

    return !(
      businessName ||
      businessType ||
      description ||
      shopTimings ||
      discount ||
      contact.ownerName ||
      contact.phone ||
      contact.altPhone ||
      contact.email ||
      contact.address ||
      shopLogo ||
      shopImages.length > 0 ||
      password
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isFormEmpty()) {
      toast.error("Please fill at least one field before submitting");
      return;
    }

    const { contact } = businessShopFormData;

    const validationErrors = {
      phone: validatePhone(contact.phone),
      altPhone: validatePhone(contact.altPhone),
      email: validateEmail(contact.email),
    };

    setErrors(validationErrors);

    if (Object.values(validationErrors).some((error) => error)) {
      toast.error("Please fix the validation errors before submitting");
      return;
    }

    setIsModalOpen(true);
  };

  const handleModalEdit = () => {
    setIsModalOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleModalOk = async () => {
    // Here you would typically send the businessShopFormData to your backend
    // For now, we'll just close the modal and navigate

    setIsModalOpen(false);
    setActiveTab(slug, "Backdrop Designs"); // Assuming this is the desired next step
  };

  return (
    <>
      <div className="space-y-6 p-4 md:p-8 bg-gray-50 rounded-xl shadow-lg overflow-auto hide-scrollbar">
        {/* Template Selection Section */}
        <div className="p-4 bg-white rounded-xl shadow border border-gray-100 transition-all duration-300 hover:shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2 border-gray-200">
            Shop Timings Template
          </h3>
          <div className="space-y-4">
            <label className="block text-base font-medium text-gray-700 mb-2">
              Choose a Template:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              {[1, 2, 3, 4].map((templateNum) => {
                const isSelected =
                  businessShopFormData.selectedTemplate ===
                  `template${templateNum}`;

                const backgroundImageUrl = `/images/templates/businessShop${templateNum}.webp`;

                return (
                  <div
                    key={templateNum}
                    className={`relative cursor-pointer rounded-lg overflow-hidden border-2 ${
                      isSelected
                        ? "border-teal-500 ring-2 ring-teal-300"
                        : "border-gray-300 hover:border-gray-400"
                    } transition-all duration-200 shadow-sm hover:shadow-md h-40 bg-cover bg-center`}
                    style={
                      isSelected
                        ? { backgroundImage: `url(${backgroundImageUrl})` }
                        : {}
                    }
                    onClick={() =>
                      handleTemplateSelect(`template${templateNum}`)
                    }
                  >
                    {!isSelected && (
                      <img
                        src={backgroundImageUrl}
                        alt={`Template ${templateNum}`}
                        className="w-full h-full object-center"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* General Information Section */}
        <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2 border-gray-200">
          General Information
        </h3>
        <div className="space-y-2">
          <label className="block text-base font-medium text-gray-700">
            Business Logo{" "}
            <span className="text-gray-500 text-sm">(Max 2MB)</span>
          </label>
          {businessShopFormData.shopLogo && (
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={
                    typeof businessShopFormData.shopLogo === "string"
                      ? businessShopFormData.shopLogo
                      : URL.createObjectURL(businessShopFormData.shopLogo)
                  }
                  alt="Business Logo"
                  className="h-20 w-20 object-center rounded-lg"
                />
                <button
                  onClick={() => removeImage("shopLogo")}
                  className="absolute -top-2 -right-2 bg-red-500 cursor-pointer text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                  aria-label="Remove logo"
                >
                  <MdCancel />
                </button>
              </div>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            ref={logoInputRef}
            className="w-full  text-gray-700 file:mr-4 file:py-3 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-600 file:text-white hover:file:bg-teal-700 file:transition-colors file:duration-200 cursor-pointer border border-gray-300 rounded-lg py-2"
            onChange={(e) => handleFileChange("shopLogo", e.target.files)}
          />
        </div>

        <div className="space-y-5 mt-10">
          {[
            "businessName",
            "businessType",
            "description",
            "shopTimings",
            "discount",
          ].map((field) =>
            field === "description" ? (
              <div key={field}>
                <label
                  htmlFor={field}
                  className="block text-base font-medium text-gray-700"
                >
                  {field
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}
                </label>
                <textarea
                  key={field}
                  placeholder={field
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}
                  rows={4}
                  className="w-full px-5 py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none transition-all duration-200 resize-y"
                  value={businessShopFormData[field]}
                  onChange={(e) => handleChange("", field, e.target.value)}
                />
              </div>
            ) : (
              <div key={field} className="space-y-1">
                <label
                  htmlFor={field}
                  className="block text-base font-medium text-gray-700"
                >
                  {field
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}
                </label>
                <input
                  id={field}
                  type="text"
                  placeholder={field
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}
                  className="w-full px-5 py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-teal-500 transition-all duration-200"
                  value={businessShopFormData[field]}
                  onChange={(e) => handleChange("", field, e.target.value)}
                />
              </div>
            )
          )}
        </div>

        {/* Contact Information Section */}
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-3 border-gray-200">
          Contact Information
        </h3>
        <div className="space-y-5">
          <div className="space-y-1">
            <label
              htmlFor="owner"
              className="block text-base font-medium text-gray-700"
            >
              Owner Name
            </label>
            <input
              id="ownerName"
              type="text"
              placeholder="Owner Name"
              className="w-full px-5 py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-teal-500 transition-all duration-200"
              value={businessShopFormData.contact.ownerName || ""}
              onChange={(e) =>
                handleChange("contact", "ownerName", e.target.value)
              }
            />
          </div>

          <div className="space-y-1">
            <label
              htmlFor="phone"
              className="block text-base font-medium text-gray-700"
            >
              Phone Number
            </label>
            <input
              id="phone"
              type="text"
              placeholder="Phone Number"
              className="w-full px-5 py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-teal-500 transition-all duration-200"
              value={businessShopFormData.contact.phone || ""}
              onChange={(e) => handleChange("contact", "phone", e.target.value)}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          <div className="space-y-1">
            <label
              htmlFor="altPhone"
              className="block text-base font-medium text-gray-700"
            >
              Alternate Phone Number
            </label>
            <input
              id="altPhone"
              type="text"
              placeholder="Alternate Phone Number"
              className="w-full px-5 py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-teal-500 transition-all duration-200"
              value={businessShopFormData.contact.altPhone || ""}
              onChange={(e) =>
                handleChange("contact", "altPhone", e.target.value)
              }
            />
            {errors.altPhone && (
              <p className="text-red-500 text-sm mt-1">{errors.altPhone}</p>
            )}
          </div>

          <div className="space-y-1">
            <label
              htmlFor="email"
              className="block text-base font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              className="w-full px-5 py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-teal-500 transition-all duration-200"
              value={businessShopFormData.contact.email || ""}
              onChange={(e) => handleChange("contact", "email", e.target.value)}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div className="relative">
            <label
              htmlFor="address"
              className="block text-base font-medium text-gray-700"
            >
              Full Address
            </label>
            <textarea
              id="address"
              placeholder="Full Address"
              rows={3}
              className="w-full px-5 py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-teal-500 transition-all duration-200 resize-y pr-12"
              value={businessShopFormData.contact.address || ""}
              onChange={(e) =>
                handleChange("contact", "address", e.target.value)
              }
            />
            <button
              type="button"
              onClick={fetchCurrentLocation}
              className="mt-2 w-full flex items-center justify-center cursor-pointer px-4 py-2 bg-[#0e7b7b] text-white rounded-lg hover:bg-[#066666] transition-colors"
            >
              Use Current Location
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2 mt-6">
            <div className="flex items-center justify-start gap-6 pb-4">
              <label className="block text-base font-medium text-gray-700">
                Shop Images{" "}
                <span className="text-gray-500 text-sm">
                  (Max Single File Size: 2 MB )
                </span>
              </label>
            </div>

            <div className="flex items-center justify-start gap-9">
              <label className="bg-teal-700  text-white px-4 py-2 rounded cursor-pointer">
                Choose Files
                <input
                  type="file"
                  multiple
                  onChange={(e) =>
                    handleFileChange("shopImages", e.target.files)
                  }
                  className="hidden"
                />
              </label>
              <p className="text-sm text-gray-600">
                {businessShopFormData.shopImages?.length > 0
                  ? `${businessShopFormData.shopImages.length} file(s) selected`
                  : "No files chosen"}
              </p>
            </div>
            <div className="flex flex-wrap gap-4 mt-6">
              {Array.isArray(businessShopFormData.shopImages) &&
                businessShopFormData.shopImages.map((file, index) => (
                  <div key={index} className="relative">
                    <img
                      src={
                        typeof file === "string"
                          ? file
                          : URL.createObjectURL(file)
                      }
                      alt={`Gallery ${index}`}
                      className="h-20 w-20 object-center rounded-lg"
                    />
                    <button
                      onClick={() => removeImage("shopImages", index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white cursor-pointer rounded-full p-1 hover:bg-red-600"
                    >
                      <MdCancel />
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="relative">
          <label htmlFor="password" className="sr-only">
            Password
          </label>{" "}
          {/* For accessibility */}
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full px-5 py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-teal-500 pr-12 transition-all duration-200"
            value={businessShopFormData.password || ""}
            onChange={(e) => handleChange("", "password", e.target.value)}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-teal-600 hover:text-teal-800 transition-colors duration-200"
            onClick={togglePasswordVisibility}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
        </div>

        <div className="flex justify-center items-center">
          <button
            onClick={handleSubmit}
            className="font-bold px-4 cursor-pointer bg-[#008080] text-white py-2 rounded transition-effects text-lg"
          >
            Next →
          </button>
        </div>
      </div>

      {/* Custom Modal */}
      {isModalOpen && (
               <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/30">
          <div className="bg-white relative rounded-xl shadow-xl p-6 w-full max-w-xl max-h-[90vh] border border-teal-200 mx-4 sm:mx-auto">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Confirm Submission
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to submit this form? You can edit it now or
              confirm to proceed.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleModalEdit}
                className="px-4 py-2 border cursor-pointer border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleModalOk}
                className="px-4 py-2 bg-teal-600 cursor-pointer text-white rounded-md hover:bg-teal-700 transition-colors"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BusinessShopContent;
