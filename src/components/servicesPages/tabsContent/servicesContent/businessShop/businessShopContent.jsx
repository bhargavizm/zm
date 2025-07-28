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
import axios from 'axios';

const BusinessShopContent = () => {
  const { dynamicForms, updateDynamicForm, servicesDataLoading, setServicesDataLoading } = useServicesContext();
  const { setIsLoading, setBgDesign } = useDesignContext();
  const { setActiveTab } = useDesignContext();
  const { slug } = useParams();
  const businessInfo = dynamicForms.businessInfo;
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    phone: "",
    altPhone: "",
    email: ""
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const shopTimingsTemplate = dynamicForms.shopTimingsTemplate;

  // Refs for file inputs
  const logoInputRef = useRef(null);
  const galleryInputRef = useRef(null);

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

  const handleChange = (formKey, sectionKey, fieldKey, value) => {
    updateDynamicForm(formKey, sectionKey, fieldKey, value);

    if (fieldKey === 'phone') {
      setErrors(prev => ({ ...prev, phone: validatePhone(value) }));
    } else if (fieldKey === 'altPhone') {
      setErrors(prev => ({ ...prev, altPhone: validatePhone(value) }));
    } else if (fieldKey === 'email') {
      setErrors(prev => ({ ...prev, email: validateEmail(value) }));
    }
  };

  const handleFileChange = (section, field, files, isMultiple = false) => {
    let updatedValue;

    if (isMultiple) {
      const newFiles = Array.from(files || []);
      const existingFiles = businessInfo[section][field] || [];
      updatedValue = [...existingFiles, ...newFiles];
    } else {
      updatedValue = files?.[0] || null;
    }

    updateDynamicForm("businessInfo", section, field, updatedValue);
  };

  const removeImage = (section, field, index = null) => {
    if (index !== null) {
      const updatedImages = [...businessInfo[section][field]];
      updatedImages.splice(index, 1);
      updateDynamicForm("businessInfo", section, field, updatedImages);
    } else {
      updateDynamicForm("businessInfo", section, field, null);
      // Reset the file input when removing the logo
      if (field === "logo" && logoInputRef.current) {
        logoInputRef.current.value = "";
      }
    }

    // Reset gallery input if all images are removed
    if (field === "galleryImages" && galleryInputRef.current &&
      (!businessInfo[section][field] || businessInfo[section][field].length === 0)) {
      galleryInputRef.current.value = "";
    }
  };

  const handleTemplateSelect = (templateName) => {
    setIsLoading(true);
    updateDynamicForm("shopTimingsTemplate", null, "selectedTemplate", templateName);
    setBgDesign(null);
    setTimeout(() => setIsLoading(false), 300);
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

        handleChange(
          "businessInfo",
          "contact",
          "address",
          fullAddress
        );
      } catch (err) {
        console.error("Error fetching current location:", err.message);
      }
    } else {
      console.warn("Geolocation is not supported by this browser.");
    }
  };

  const isFormEmpty = () => {
    const generalFields = Object.values(businessInfo.general);
    const hasGeneralInfo = generalFields.some(value => value && value.toString().trim() !== "");

    const contactFields = Object.values(businessInfo.contact);
    const hasContactInfo = contactFields.some(value => value && value.toString().trim() !== "");

    const hasSecurityInfo = businessInfo.security.password && businessInfo.security.password.trim() !== "";

    const hasMediaInfo =
      businessInfo.media.logo ||
      (businessInfo.media.galleryImages && businessInfo.media.galleryImages.length > 0);

    return !(hasGeneralInfo || hasContactInfo || hasSecurityInfo || hasMediaInfo);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isFormEmpty()) {
      toast.error("Please fill at least one field before submitting");
      return;
    }

    const validationErrors = {
      phone: validatePhone(businessInfo.contact.phone),
      altPhone: validatePhone(businessInfo.contact.altPhone),
      email: validateEmail(businessInfo.contact.email)
    };

    setErrors(validationErrors);

    if (Object.values(validationErrors).some(error => error)) {
      toast.error("Please fix the validation errors before submitting");
      return;
    }

    setIsModalOpen(true);
  };

  const handleModalEdit = () => {
    setIsModalOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetFormFields = () => {
    // Reset general info
    Object.keys(businessInfo.general).forEach(key => {
      updateDynamicForm("businessInfo", "general", key, "");
    });

    // Reset contact info
    Object.keys(businessInfo.contact).forEach(key => {
      updateDynamicForm("businessInfo", "contact", key, "");
    });

    // Reset security
    updateDynamicForm("businessInfo", "security", "password", "");

    // Reset media
    updateDynamicForm("businessInfo", "media", "logo", null);
    updateDynamicForm("businessInfo", "media", "galleryImages", []);

    // Reset file inputs
    if (logoInputRef.current) logoInputRef.current.value = "";
    if (galleryInputRef.current) galleryInputRef.current.value = "";

    // Reset errors
    setErrors({
      phone: "",
      altPhone: "",
      email: ""
    });
  };

  const handleModalOk = async () => {
    setActiveTab(slug, "Backdrop Designs");
    // setIsModalOpen(false);
    // setServicesDataLoading(true);
    // const formData = new FormData();

    // // General Info
    // Object.entries(businessInfo.general).forEach(([key, value]) => {
    //   formData.append(`businessInfo.general.${key}`, value || "");
    // });

    // // Contact Info
    // Object.entries(businessInfo.contact).forEach(([key, value]) => {
    //   formData.append(`businessInfo.contact.${key}`, value || "");
    // });

    // // Security
    // formData.append(`businessInfo.security.password`, businessInfo.security.password || "");

    // // Logo
    // if (businessInfo.media.logo instanceof File) {
    //   formData.append(`businessInfo.media.logo`, businessInfo.media.logo);
    // }

    // // Gallery Images
    // if (Array.isArray(businessInfo.media.galleryImages)) {
    //   businessInfo.media.galleryImages.forEach((file) => {
    //     if (file instanceof File) {
    //       formData.append(`businessInfo.media.galleryImages`, file);
    //     }
    //   });
    // }

    // // Shop Timings Template
    // formData.append(`shopTimingsTemplate.selectedTemplate`, shopTimingsTemplate.selectedTemplate);

    // const templateKey = shopTimingsTemplate.selectedTemplate + 'Data';
    // const templateData = shopTimingsTemplate[templateKey] || {};

    // Object.entries(templateData).forEach(([key, value]) => {
    //   formData.append(`shopTimingsTemplate.${templateKey}.${key}`, value || "");
    // });
    // setActiveTab(slug, "Backdrop Designs");
    // // try {
    // //   const response = await axios.post('/api/services/business-shop', formData, {
    // //     headers: { "Content-Type": "multipart/form-data" },
    // //   });

    // //   if (response.data.success) {
    // //     toast.success("Business data saved successfully");
    // //     setActiveTab(slug, "QR Code");

    // //     resetFormFields();
    // //   }
    // // } catch (error) {
    // //   toast.error(error?.response?.data?.error || "Something went wrong!");
    // //   console.error("Submit error:", error);
    // //   if (error.response?.status === 401) {
    // //     window.location.href = "/login"; // ✅ Auto logout on expiry
    // //     return;
    // //   }
    // // } finally {
    // //   setServicesDataLoading(false); // ✅ End loader
    // // }
  };

  return (
    <>
      {servicesDataLoading && <LoadingSpinner />}

      <div className="space-y-8 p-4 md:p-8 lg:p-12 bg-gray-50 rounded-xl shadow-lg overflow-auto hide-scrollbar">
        {/* Template Selection Section */}
        <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-3 border-gray-200">
            Shop Timings Template
          </h3>
          <div className="space-y-5">
            <label className="block text-base font-medium text-gray-700 mb-2">
              Choose a Template:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              {[1, 2, 3, 4].map((templateNum) => {
                const isSelected =
                  shopTimingsTemplate.selectedTemplate === `template${templateNum}`;
                const backgroundImageUrl = `/images/templates/businessShop${templateNum}.webp`;

                return (
                  <div
                    key={templateNum}
                    className={`relative cursor-pointer rounded-lg overflow-hidden border-2 ${isSelected
                      ? "border-teal-500 ring-2 ring-teal-300"
                      : "border-gray-300 hover:border-gray-400"
                      } transition-all duration-200 shadow-sm hover:shadow-md h-40 bg-cover bg-center`}
                    style={
                      isSelected
                        ? { backgroundImage: `url(${backgroundImageUrl})` }
                        : {}
                    }
                    onClick={() => handleTemplateSelect(`template${templateNum}`)}
                  >
                    {!isSelected && (
                      <img
                        src={backgroundImageUrl}
                        alt={`Template ${templateNum}`}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* General Information Section */}
        <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-3 border-gray-200">
            General Information
          </h3>
          <div className="space-y-2">
            <label className="block text-base font-medium text-gray-700">
              Business Logo
            </label>
            {businessInfo.media.logo && (
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={typeof businessInfo.media.logo === 'string'
                      ? businessInfo.media.logo
                      : URL.createObjectURL(businessInfo.media.logo)}
                    alt="Business Logo"
                    className="h-20 w-20 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => removeImage("media", "logo")}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
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
              className="w-full text-gray-700 file:mr-4 file:py-3 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-600 file:text-white hover:file:bg-teal-700 file:transition-colors file:duration-200 cursor-pointer border border-gray-300 rounded-lg py-2"
              onChange={(e) => handleFileChange("media", "logo", e.target.files)}
            />
          </div>

          <div className="space-y-5 mt-10">
            {['businessName', 'businessType', 'description', 'shopTimings', 'discount'].map((field) => (
              field === 'description' ? (
                <textarea
                  key={field}
                  placeholder={field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  rows={4}
                  className="w-full px-5 py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-teal-500 transition-all duration-200 resize-y"
                  value={businessInfo.general[field] || ""}
                  onChange={(e) =>
                    handleChange("businessInfo", "general", field, e.target.value)
                  }
                />
              ) : (
                <input
                  key={field}
                  type="text"
                  placeholder={field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  className="w-full px-5 py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-teal-500 transition-all duration-200"
                  value={businessInfo.general[field] || ""}
                  onChange={(e) =>
                    handleChange("businessInfo", "general", field, e.target.value)
                  }
                />
              )
            ))}
          </div>
        </div>

        {/* Contact Information Section */}
        <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-3 border-gray-200">
            Contact Information
          </h3>
          <div className="space-y-5">
            <input
              type="text"
              placeholder="Owner Name"
              className="w-full px-5 py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-teal-500 transition-all duration-200"
              value={businessInfo.contact.owner || ""}
              onChange={(e) =>
                handleChange("businessInfo", "contact", "owner", e.target.value)
              }
            />

            <div className="space-y-1">
              <input
                type="text"
                placeholder="Phone Number"
                className="w-full px-5 py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-teal-500 transition-all duration-200"
                value={businessInfo.contact.phone || ""}
                onChange={(e) =>
                  handleChange("businessInfo", "contact", "phone", e.target.value)
                }
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>

            <div className="space-y-1">
              <input
                type="text"
                placeholder="Alternate Phone Number"
                className="w-full px-5 py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-teal-500 transition-all duration-200"
                value={businessInfo.contact.altPhone || ""}
                onChange={(e) =>
                  handleChange("businessInfo", "contact", "altPhone", e.target.value)
                }
              />
              {errors.altPhone && <p className="text-red-500 text-sm mt-1">{errors.altPhone}</p>}
            </div>

            <div className="space-y-1">
              <input
                type="email"
                placeholder="Email"
                className="w-full px-5 py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-teal-500 transition-all duration-200"
                value={businessInfo.contact.email || ""}
                onChange={(e) =>
                  handleChange("businessInfo", "contact", "email", e.target.value)
                }
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div className="relative">
              <textarea
                placeholder="Full Address"
                rows={3}
                className="w-full px-5 py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-teal-500 transition-all duration-200 resize-y pr-12"
                value={businessInfo.contact.address || ""}
                onChange={(e) =>
                  handleChange("businessInfo", "contact", "address", e.target.value)
                }
              />
              <button
                type="button"
                onClick={fetchCurrentLocation}
                className="absolute right-2 bottom-2 p-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 text-sm"
                title="Get current location"
              >
                <IoLocation />
              </button>
            </div>
          </div>
        </div>

        {/* Media Section */}
        <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-3 border-gray-200">
            Media
          </h3>

          <div className="space-y-6">
            <div className="space-y-2 mt-6">
              <div className="flex items-center justify-start gap-6 pb-4">
                <label className="block text-base font-medium text-gray-700">
                  Gallery Images
                </label>
                <p className="text-sm text-gray-600">
                  {businessInfo.media.galleryImages?.length > 0
                    ? `${businessInfo.media.galleryImages.length} file(s) selected`
                    : "No files chosen"}
                </p>
              </div>

              <label className="bg-teal-700 text-white px-4 py-2 rounded cursor-pointer">
                Choose Files
                <input
                  type="file"
                  multiple
                  ref={galleryInputRef}
                  onChange={(e) =>
                    handleFileChange("media", "galleryImages", e.target.files, true)
                  }
                  className="hidden"
                />
              </label>

              <div className="flex flex-wrap gap-4 mt-6">
                {Array.isArray(businessInfo.media.galleryImages) &&
                  businessInfo.media.galleryImages.map((file, index) => (
                    <div key={index} className="relative">
                      <img
                        src={
                          typeof file === "string" ? file : URL.createObjectURL(file)
                        }
                        alt={`Gallery ${index}`}
                        className="h-20 w-20 object-cover rounded-lg"
                      />
                      <button
                        onClick={() => removeImage("media", "galleryImages", index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white cursor-pointer rounded-full p-1 hover:bg-red-600"
                      >
                        <MdCancel />
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        {/* Security Section */}
        <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-3 border-gray-200">
            Security
          </h3>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full px-5 py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-teal-500 pr-12 transition-all duration-200"
              value={businessInfo.security.password || ""}
              onChange={(e) =>
                handleChange("businessInfo", "security", "password", e.target.value)
              }
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
        </div>
      </div>

      <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg">
        <NFCModal />
      </div>
      <button
        onClick={handleSubmit}
        className="w-full py-2 my-4 cursor-pointer bg-[#008080] text-white font-semibold rounded hover:bg-[#006666] transition"
      >
        Submit
      </button>

      {/* Custom Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-white-70 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Confirm Submission
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to submit this form? You can edit it now or confirm to proceed.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleModalEdit}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={handleModalOk}
                className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BusinessShopContent;