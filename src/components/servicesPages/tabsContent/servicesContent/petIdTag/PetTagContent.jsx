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

const PetTagContent = () => {
  const { setActiveTab } = useDesignContext();
  const { slug } = useParams();
  const { petIDFormData, setPetIDFormData } = useServicesContext();
  const { setIsLoading, setBgDesign } = useDesignContext();
  const [showPassword, setShowPassword] = useState(false);
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const dispatch = useDispatch();
  const templateImages = ["pet1.webp", "pet2.webp", "pet3.webp", "pet4.webp"];

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setPetIDFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleOwnerChange = (e) => {
    const { id, value } = e.target;
    setPetIDFormData((prev) => ({
      ...prev,
      ownerInfo: {
        ...prev.ownerInfo,
        [id]: value,
      },
    }));
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
    if (uploadedFile) {
      setFile(uploadedFile);
      setPetIDFormData((prev) => ({
        ...prev,
        mainImage: URL.createObjectURL(uploadedFile),
      }));
    }
  };

  const clearImage = () => {
    setFile(null);
    setPetIDFormData((prev) => ({
      ...prev,
      mainImage: "",
    }));
    document.getElementById("imageInput").value = null;
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
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
        );
        const data = await response.json();
        const fullAddress = data.display_name || "Address not found";

        setPetIDFormData((prev) => ({
          ...prev,
          ownerInfo: {
            ...prev.ownerInfo,
            address: fullAddress,
          },
        }));
      } catch (err) {
        console.error("Error fetching current location:", err.message);
        alert("Failed to fetch location. Please check permissions.");
      }
    } else {
      alert("Geolocation not supported in your browser.");
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
    setShowPreviewModal(true);
  };

  const handleFinalSubmit = async () => {
    setSubmitting(true);
    setShowPreviewModal(false);

    try {
      const base64Image = file ? await toBase64(file) : null;

      const payload = {
        ...petIDFormData,
        image: base64Image,
      };

      const res = await axios.post("/api/services/petid", payload);

      if (res.status === 201) {
        setShowSuccessModal(true);
        setActiveTab(slug, "QR Code");
        dispatch(setPetIdServices(res.data));
        console.log("Pet ID Tag created successfully:", res.data);
        setTimeout(() => {
          setShowSuccessModal(false);
          // Reset form
          setPetIDFormData({
            selectedTemplate: "",
            mainImage: "",
            ownerInfo: {
              name: "",
              phone: "",
              email: "",
              password: "",
              address: ""
            },
            pet: {
              name: "",
              breed: "",
              color: ""
            }
          });
          setFile(null);
          if (document.getElementById("imageInput")) {
            document.getElementById("imageInput").value = null;
          }
        }, 2000);
      } else {
        alert("Failed to create Pet ID Tag.");
      }
    } catch (error) {
      console.error("Submission Error:", error);
      alert("Something went wrong while submitting.");
    } finally {
      setSubmitting(false);
    }
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
      <form onSubmit={handlePreviewSubmit}>
        <div className="grid grid-cols-1 gap-10">
          <div className="bg-white shadow-xl rounded-xl p-6 space-y-6">
            {/* Templates */}
            <div>
              <h2 className="text-xl font-semibold mb-4">
                Pet Tag Templates (click to select)
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
                      className="object-cover rounded w-full h-auto"
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
              {petIDFormData.mainImage && (
                <div className="mt-3 relative w-max">
                  <Image
                    src={petIDFormData.mainImage}
                    alt="Pet"
                    width={100}
                    height={100}
                    className="rounded"
                  />
                  <button
                    onClick={clearImage}
                    type="button"
                    className="absolute top-[-8px] right-[-8px] bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center hover:bg-red-600"
                  >
                    ✕
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
              <input
                type="tel"
                id="phone"
                value={petIDFormData.ownerInfo.phone}
                onChange={handleOwnerChange}
                placeholder="Phone Number"
                className="border p-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#008080]"
              />
              <input
                type="email"
                id="email"
                value={petIDFormData.ownerInfo.email}
                onChange={handleOwnerChange}
                placeholder="Email Address"
                className="border p-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#008080]"
              />

              <div className="space-y-2 col-span-1 md:col-span-2">
                <textarea
                  id="address"
                  value={petIDFormData.ownerInfo.address}
                  onChange={handleOwnerChange}
                  placeholder="Address"
                  rows={3}
                  className="border p-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#008080] resize-none"
                />
                <button
                  type="button"
                  onClick={fetchCurrentLocation}
                  className="flex items-center justify-center w-full py-2 px-3 bg-gray-100 hover:bg-gray-300 text-gray-700 text-sm rounded-lg transition-colors duration-200 cursor-pointer"
                >
                  <MapPin size={16} className="mr-2" />
                  Use Current Location
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
                value={petIDFormData.ownerInfo.password}
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

            <NFCModal />

            <button
              type="submit"
              disabled={submitting}
              className="mt-4 w-full bg-[#008080] text-white font-semibold py-2 rounded hover:bg-[#006666] transition disabled:opacity-60"
            >
              {submitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      </form>

      {/* Preview/Confirm Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Confirm Your Information</h2>
                <button
                  onClick={() => setShowPreviewModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Owner Information</h3>
                  {renderPreviewField("Name", petIDFormData.ownerInfo.name)}
                  {renderPreviewField("Phone", petIDFormData.ownerInfo.phone)}
                  {renderPreviewField("Email", petIDFormData.ownerInfo.email)}
                  {renderPreviewField("Address", petIDFormData.ownerInfo.address)}
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Pet Information</h3>
                  {renderPreviewField("Pet Name", petIDFormData.pet.name)}
                  {renderPreviewField("Breed", petIDFormData.pet.breed)}
                  {renderPreviewField("Color", petIDFormData.pet.color)}

                  {petIDFormData.mainImage && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Pet Image</h4>
                      <Image
                        src={petIDFormData.mainImage}
                        alt="Pet Preview"
                        width={120}
                        height={120}
                        className="rounded-lg"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowPreviewModal(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
                >
                  Edit Information
                </button>
                <button
                  type="button"
                  onClick={handleFinalSubmit}
                  disabled={submitting}
                  className="px-6 py-2 bg-[#008080] text-white rounded-lg hover:bg-[#006666] disabled:opacity-70 disabled:cursor-not-allowed transition flex items-center justify-center"
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
                      <Check className="mr-1" size={18} />
                      Confirm and Submit
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
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            <div className="p-6 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Success!</h3>
              <p className="text-gray-600">Pet ID Tag has been created successfully.</p>
              <div className="mt-6">
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div className="bg-green-600 h-1.5 rounded-full animate-[countdown_2s_linear_forwards]" />
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