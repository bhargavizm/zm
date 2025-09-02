"use client";
import React, { useState } from "react";
import Image from "next/image";
import useServicesContext from "@/components/hooks/useServiceContext";
import useDesignContext from "@/components/hooks/useDesignContext";
import NFCModal from "@/components/modalPopUps/nfcModal";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { MapPin, Check, X } from "lucide-react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setPetIdServices } from "@/redux/slices/servicesSlice";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import LoadingSpinner from "@/components/common/spinner";

const PetTagContent = () => {
  const { setActiveTab, setIsLoading, setBgDesign } = useDesignContext();
  const { slug } = useParams();
  const { petIDFormData, setPetIDFormData, servicesDataLoading, setServicesDataLoading } = useServicesContext();
  const [showPassword, setShowPassword] = useState(false);
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);

  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const dispatch = useDispatch();
  const templateImages = ["pet1.webp", "pet2.webp", "pet3.webp", "pet4.webp"];
const [emailError, setEmailError] = useState("");

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setPetIDFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

const handleOwnerChange = (e) => {
  const { id, value } = e.target;

  // Phone validation
  if (id === "phone") {
    const phoneRegex = /^[0-9]{10,15}$/;
    if (value && !phoneRegex.test(value)) {
      setPhoneError("Please enter a valid phone number (10-15 digits)");
    } else {
      setPhoneError("");
    }
  }

  // Email validation
  if (id === "email") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value && !emailRegex.test(value)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  }

  // Password updates root level
  if (id === "password") {
    setPetIDFormData((prev) => ({
      ...prev,
      password: value,
    }));
  } else {
    // Everything else updates ownerInfo
    setPetIDFormData((prev) => ({
      ...prev,
      ownerInfo: {
        ...prev.ownerInfo,
        [id]: value,
      },
    }));
  }
};


  const handlePetChange = (e) => {
    const { id, value } = e.target;
    setPetIDFormData((prev) => ({
      ...prev,
      pet: {
        ...prev.pet,
        [id]: value,
      },
    }));
  };

 const handleImageUpload = (e) => {
  const uploadedFile = e.target.files[0];
  const maxSize = 30 * 1024 * 1024; // 30MB

  if (uploadedFile) {
    if (uploadedFile.size > maxSize) {
      alert("File size must not exceed 30MB");
      e.target.value = ""; // Reset input
      return;
    }

    const previewUrl = URL.createObjectURL(uploadedFile);
    setFile(uploadedFile);
    setPetIDFormData((prev) => ({
      ...prev,
      mainImage: uploadedFile,
      previewUrl,
    }));
  }
};


  const clearImage = () => {
  setFile(null);
  setPetIDFormData((prev) => ({
    ...prev,
    mainImage: "",
    previewUrl: "",
  }));
  // Safely clear file input (if needed)
  const input = document.getElementById("imageInput");
  if (input) input.value = "";
};

  const handleTemplateSelect = (selectedTemplate) => {
    if (petIDFormData.selectedTemplate !== selectedTemplate) {
      setIsLoading(true);
      setPetIDFormData((prev) => ({
        ...prev,
        selectedTemplate,
      }));
      setBgDesign(null);
      setTimeout(() => setIsLoading(false), 300);
    }
  };

 const fetchCurrentLocation = async () => {
  if (!navigator.geolocation) {
    alert("Geolocation not supported in your browser.");
    return;
  }

  setIsFetchingLocation(true);

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
    const googleMapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;

    setPetIDFormData((prev) => ({
      ...prev,
      ownerInfo: {
        ...prev.ownerInfo,
        mapLink: googleMapsLink,
      },
    }));
  } catch (err) {
    console.error("Error fetching current location:", err.message);
    alert("Failed to fetch location. Please check permissions.");
  } finally {
    setIsFetchingLocation(false);
  }
};


  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });

  const handlePreviewSubmit = (e) => {
    e.preventDefault();

    // Check if phone number is valid if it's filled
    if (petIDFormData.ownerInfo.phone && phoneError) {
      toast.error(phoneError);
      return;
    }

    const { selectedTemplate, mainImage, ownerInfo, pet } = petIDFormData;

    const isAnyOwnerInfoFilled = Object.values(ownerInfo).some(
      (v) => v !== null && v !== undefined && v.toString().trim() !== ""
    );
    const isAnyPetInfoFilled = Object.values(pet).some(
      (v) => v !== null && v !== undefined && v.toString().trim() !== ""
    );
    const isTemplateSelected = !!selectedTemplate;
    const isImageUploaded = !!mainImage;

    if (!isAnyOwnerInfoFilled && !isAnyPetInfoFilled && !isTemplateSelected && !isImageUploaded) {
      toast.error("Please fill at least one field before submitting.");
      return;
    }

    setShowPreviewModal(true);
  };

  const handleFinalSubmit = async () => {
    setActiveTab(slug, "Backdrop Designs");
   
    
  };

  const renderPreviewField = (label, value) => {
    return (
      <div className="mb-3">
        <h4 className="text-sm font-medium text-gray-500">{label}</h4>
        <p className="text-gray-800 break-words">
          {value || <span className="text-gray-400">Not provided</span>}
        </p>
      </div>
    );
  };

  return (
    <>
      {servicesDataLoading && <LoadingSpinner />}

      <form onSubmit={handlePreviewSubmit}>
        <div className="grid grid-cols-1 gap-10">
          <div className="bg-white shadow-md rounded-xl p-6 space-y-6">
            {/* Templates */}
            <div>
              <h2 className="text-xl font-semibold mb-4">
                Choose a Template (click to select)
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {templateImages.map((filename, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleTemplateSelect(filename)}
                    className={`relative rounded-md border-2 cursor-pointer transition-all p-1 ${petIDFormData.selectedTemplate === filename
                      ? "border-[#008080] ring-2 ring-[#008080]"
                      : "border-gray-300"
                      }`}
                  >
                    <Image
                      src={`/pet-id/${filename}`}
                      alt={`Template ${idx + 1}`}
                      width={300}
                      height={180}
                      className="object-center rounded w-full h-auto"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Pet Image Upload */}
            <div>
              <label className="block mb-1 font-medium">Upload Pet Image</label>
              <input
                id="imageInput"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#008080] file:text-white hover:file:bg-[#006666] transition duration-200 cursor-pointer"
              />
              {petIDFormData.previewUrl && (
                <div className="mt-3 relative w-max">
                  <Image
                    src={petIDFormData.previewUrl}
                    alt="Pet"
                    width={100}
                    height={100}
                    className="rounded-xl w-24 h-24"
                  />
                  <button
                    onClick={clearImage}
                    type="button"
                    className="absolute top-[-8px] right-[-8px] bg-white rounded-full w-5 h-5 text-xs flex items-center justify-center hover:bg-red-600"
                  >
                    ❌
                  </button>
                </div>
              )}
            </div>

            {/* Owner Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                id="name"
                value={petIDFormData.ownerInfo.name}
                onChange={handleOwnerChange}
                placeholder="Owner Name"
                className="border p-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#008080]"
              />
              <div>
                <input
                  type="tel"
                  id="phone"
                  value={petIDFormData.ownerInfo.phone}
                  onChange={handleOwnerChange}
                  placeholder="Phone Number"
                  className={`border p-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 ${phoneError ? "focus:ring-red-500 border-red-500" : "focus:ring-[#008080]"
                    }`}
                />
                {phoneError && (
                  <p className="mt-1 text-sm text-red-600">{phoneError}</p>
                )}
              </div>
             <div>
  <input
    type="email"
    id="email"
    value={petIDFormData.ownerInfo.email}
    onChange={handleOwnerChange}
    placeholder="Email Address"
    className={`border p-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 ${
      emailError ? "focus:ring-red-500 border-red-500" : "focus:ring-[#008080]"
    }`}
  />
  {emailError && (
    <p className="mt-1 text-sm text-red-600">{emailError}</p>
  )}
</div>


              <div className="space-y-2 col-span-1 md:col-span-2">
                <textarea
                  id="address"
                  value={petIDFormData.ownerInfo.address}
                  onChange={handleOwnerChange}
                  placeholder="Address"
                  rows={3}
                  className="border p-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#008080] resize-none"
                />
                {/* <button
                  type="button"
                  onClick={fetchCurrentLocation}
                  className="flex items-center justify-center w-full py-2 px-3 bg-mainGreen text-white text-sm rounded-lg transition-colors duration-200 cursor-pointer"
                >
                  <MapPin size={16} className="mr-2" />
                  Use Current Location
                </button> */}
              </div>

              <div className="space-y-2 col-span-1 md:col-span-2">
                <textarea
                  id="mapLink"
                  value={petIDFormData.ownerInfo.mapLink}
                  onChange={handleOwnerChange}
                  placeholder="Map Link"
                  rows={3}
                  className="border p-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#008080] resize-none"
                />
               <button
  type="button"
  onClick={fetchCurrentLocation}
  disabled={isFetchingLocation}
  className={`flex items-center justify-center w-full py-2 cursor-pointer px-3 rounded-lg text-white text-sm transition-colors duration-200 ${
    isFetchingLocation ? "bg-gray-400 cursor-not-allowed" : "bg-mainGreen"
  }`}
>
  <MapPin size={16} className="mr-2" />
  {isFetchingLocation ? "Fetching Location..." : "Use Current Location"}
</button>

              </div>
            </div>

            {/* Pet Info */}
            <div>
              <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">
                Pet Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {["name", "breed", "color"].map((field) => (
                  <input
                    key={field}
                    type="text"
                    id={field}
                    value={petIDFormData.pet[field]}
                    onChange={handlePetChange}
                    placeholder={`Pet ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                    className="border p-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#008080]"
                  />
                ))}
              </div>
            </div>

            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={petIDFormData?.password}
                onChange={handleOwnerChange}
                placeholder="QR Password"
                className="border p-2 pr-10 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#008080]"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
              >
                {showPassword ? (
                  <AiOutlineEye size={20} />
                ) : (
                  <AiOutlineEyeInvisible size={20} />
                )}
              </button>
            </div>

            <div className="flex justify-center items-center">
            <button
              type="submit"
            
              className="font-bold px-4 cursor-pointer bg-[#008080] text-white py-2 rounded transition-effects text-lg"

            >
              
 Next → 
            </button>
            </div>
          </div>
        </div>
      </form>

      {/* Preview/Confirm Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/30">
          <div className="bg-white relative rounded-xl shadow-xl p-6 w-full max-w-xl max-h-[90vh] border border-teal-200 mx-4 sm:mx-auto">
            <div className="p-6">
              <div className="mb-6 px-4 py-3 flex justify-between items-start gap-4">
                {/* Heading and Subtext */}
                <div className="flex flex-col">
                  <h2 className="text-2xl font-bold text-gray-800">Confirm Submission</h2>
                  <p className="text-sm text-gray-600 mt-1 max-w-md">
                    Are you sure you want to submit this Pet Id listing? Please review all details before confirming.
                  </p>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setShowPreviewModal(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  ❌
                </button>
              </div>

              
              <div className="mt-8 flex flex-col sm:flex-row justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowPreviewModal(false)}
                  className="px-6 py-2 border cursor-pointer border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleFinalSubmit}
                  disabled={submitting}
                  className="px-6 py-2 cursor-pointer bg-[#008080] text-white rounded-lg hover:bg-[#006666] disabled:opacity-70 disabled:cursor-not-allowed transition flex items-center justify-center"
                >
                  {submitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    <>
                      Continue
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="p-6 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <Check className="h-6 w-6 text-mainGreen" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Success!</h3>
              <p className="text-gray-600">Pet ID Tag has been created successfully.</p>
              <div className="mt-6">
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div className="bg-mainGreen h-1.5 rounded-full animate-[countdown_2s_linear_forwards]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PetTagContent;