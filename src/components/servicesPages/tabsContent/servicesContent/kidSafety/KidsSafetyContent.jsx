"use client";
import React, { useRef, useState } from "react";
import useServicesContext from "@/components/hooks/useServiceContext";
import { Eye, EyeOff, MapPin, CheckCircle } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import useDesignContext from "@/components/hooks/useDesignContext";

const KidsSafetyContent = () => {
  const { dynamicForms, updateDynamicForm } = useServicesContext();
  const kidsSafety = dynamicForms.kidsSafety || {};
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const imageInputRef = useRef(null);
  const { setActiveTab, setText } = useDesignContext();
  const { slug } = useParams();

  const phoneRegex = /^\+?[0-9]{10,15}$/;

  const primaryFields = [
    { key: "childName", placeholder: "Child's Full Name", type: "text", section: "Child Information", required: true },
    { key: "dob", placeholder: "Date of Birth", type: "date", section: "Child Information", required: true },
    { key: "classGrade", placeholder: "Class / Grade", type: "text", section: "Child Information" },
    { key: "schoolName", placeholder: "School Name", type: "text", section: "School Information", required: true },
    { key: "schoolAddress", placeholder: "School Full Address", type: "textarea", section: "School Information" },
    { key: "schoolContact", placeholder: "School Phone Number", type: "tel", section: "School Information", required: true },
    { key: "parentName", placeholder: "Parent / Guardian Name", type: "text", section: "Parent Contacts", required: true },
    { key: "contact", placeholder: "Primary Contact Number", type: "tel", section: "Parent Contacts", required: true },
    { key: "contact2", placeholder: "Secondary Contact Number", type: "tel", section: "Parent Contacts" },
    { key: "homeAddress", placeholder: "Home Full Address", type: "textarea", section: "Home Location" },
    { key: "mapLink", placeholder: " Maps Link", type: "textarea", section: "Map Link" },
    { key: "password", placeholder: "Set Password", type: "password", section: "Security" },
  ];

  const validateField = (fieldKey, value) => {
    const field = primaryFields.find((f) => f.key === fieldKey);
    if (!field) return "";

    if (field.required && !value?.trim()) return `${field.placeholder} is required`;

    if ((fieldKey === "schoolContact" || fieldKey === "contact" || fieldKey === "contact2") && value) {
      if (!phoneRegex.test(value)) return "Please enter a valid phone number 10-15 digits";
    }

    if (fieldKey === "dob" && value) {
      const dob = new Date(value);
      const today = new Date();
      if (dob > today) return "Date of birth cannot be in the future";
    }
    return "";
  };

 const validateImage = (file) => {
  if (!file) return "Child image is required";

  const maxSize = 30 * 1024 * 1024; // 30MB
  if (file.size > maxSize) return "Image must be smaller than 30MB";

  return "";
};

  const validateForm = () => {
    const newErrors = {};
    primaryFields.forEach((field) => {
      const error = validateField(field.key, kidsSafety[field.key]);
      if (error) newErrors[field.key] = error;
    });

    if (!kidsSafety.kidsImage) {
      newErrors.kidsImage = "Child image is required";
    } else if (kidsSafety.kidsImage instanceof File) {
      const imageError = validateImage(kidsSafety.kidsImage);
      if (imageError) newErrors.kidsImage = imageError;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (fieldKey, value) => {
    updateDynamicForm("kidsSafety", null, fieldKey, value);
    const error = validateField(fieldKey, value);
    setErrors((prev) => ({ ...prev, [fieldKey]: error }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const error = file ? validateImage(file) : "Child image is required";
    setErrors((prev) => ({ ...prev, kidsImage: error }));
    if (!error) updateDynamicForm("kidsSafety", null, "kidsImage", file);
    else if (imageInputRef.current) imageInputRef.current.value = "";
  };

const fetchCurrentLocation = async () => {
  if (!navigator.geolocation) {
    toast.error("Geolocation is not supported by your browser");
    return;
  }

  try {
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    const { latitude, longitude } = position.coords;

    // Fill homeAddress with the human-readable address (optional)
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
    );
    const data = await response.json();
    handleInputChange("mapLink", data.display_name || "");

    // Fill mapLink with Google Maps link
    const googleMapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
    handleInputChange("mapLink", googleMapsLink);

  } catch (error) {
    toast.error("Failed to fetch location: " + error.message);
  }
};


  const hasAnyError = Object.values(errors).some(
    (err) => Array.isArray(err) ? err.some(Boolean) : Boolean(err)
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm() || hasAnyError) {
      toast.error("Please fix all errors before proceeding");
      return;
    }
    setShowConfirmationModal(true);
  };

  const confirmSubmission = async () => {
    setActiveTab(slug, "Backdrop Designs");
  };

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const closeSuccessModal = () => setShowSuccessModal(false);

  const hasError = (fieldKey) => errors[fieldKey];

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-8 p-4  rounded-xl">
        {/* Child's Profile Image */}
        <div className="p-6 bg-white rounded-xl shadow-md">
          <h3 className="text-2xl font-semibold mb-6 border-b pb-3">Child's Profile Image</h3>
          <div className="space-y-2">
            <input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className={`w-full file:mr-4 file:py-3 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-600 file:text-white hover:file:bg-teal-700 border ${
                errors.kidsImage ? "border-red-500" : "border-gray-300"
              } rounded-lg`}
            />
            {errors.kidsImage && <p className="text-red-500 text-sm">{errors.kidsImage}</p>}
            {kidsSafety.kidsImage && (
              <div className="relative mt-4 w-fit">
                <img
                  src={kidsSafety.kidsImage instanceof File ? URL.createObjectURL(kidsSafety.kidsImage) : kidsSafety.kidsImage}
                  alt="Child preview"
                  className="w-24 h-24 object-center rounded-2xl border"
                />
                <button
                  onClick={() => {
                    updateDynamicForm("kidsSafety", null, "kidsImage", null);
                    if (imageInputRef.current) imageInputRef.current.value = "";
                  }}
                  className="absolute top-[-10px] right-[-10px] bg-white rounded-full p-1 shadow"
                >
                  ❌
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Form Sections */}
        {Object.entries(
          primaryFields.reduce((sections, field) => {
            (sections[field.section] = sections[field.section] || []).push(field);
            return sections;
          }, {})
        ).map(([sectionName, fields]) => (
          <div key={sectionName} className="p-6 bg-white rounded-xl shadow-md">
            <h3 className="text-2xl font-semibold mb-6 border-b pb-3 capitalize">{sectionName}</h3>
            <div className="space-y-5">
              {fields.map((field) => (
                <div key={field.key} className="space-y-1">
                  <div className="flex items-center space-x-3">
                    {field.type === "textarea" ? (
                      <textarea
                        placeholder={field.placeholder}
                        value={kidsSafety[field.key] || ""}
                        onChange={(e) => handleInputChange(field.key, e.target.value)}
                        rows={3}
                        className={`w-full p-3 border rounded-lg ${hasError(field.key) ? "border-red-500" : "border-gray-300"}`}
                      />
                    ) : field.type === "password" ? (
                      <div className="relative flex-1">
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder={field.placeholder}
                          value={kidsSafety[field.key] || ""}
                          onChange={(e) => handleInputChange(field.key, e.target.value)}
                          className={`w-full p-3 border rounded-lg pr-10 ${hasError(field.key) ? "border-red-500" : "border-gray-300"}`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        >
                          {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                        </button>
                      </div>
                    ) : (
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        value={kidsSafety[field.key] || ""}
                        onChange={(e) => handleInputChange(field.key, e.target.value)}
                        className={`w-full p-3 border rounded-lg ${hasError(field.key) ? "border-red-500" : "border-gray-300"}`}
                      />
                    )}
                  </div>
                  {hasError(field.key) && <p className="text-red-500 text-sm">{errors[field.key]}</p>}
                </div>
              ))}

              {sectionName === "Map Link" && (
                <button
                  type="button"
                  onClick={fetchCurrentLocation}
                  className="flex items-center justify-center w-full p-3 bg-mainGreen text-white cursor-pointer rounded-lg"
                >
                  <MapPin size={16} className="mr-2" />
                  Use Current Location
                </button>
              )}
            </div>
          </div>
        ))}

        {/* Submit Button */}
        <div className="flex justify-center">
          <button type="submit" className="font-bold px-4 cursor-pointer bg-[#008080] text-white py-2 rounded transition-effects text-lg">
            Next →
          </button>
        </div>
      </form>

      {/* Confirmation Modal */}
      {showConfirmationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/30">
          <div className="bg-white relative rounded-xl shadow-xl p-6 w-full max-w-xl max-h-[90vh] border border-teal-200 mx-4 sm:mx-auto">
            <h3 className="text-2xl font-semibold mb-4">Confirm Submission</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to submit this information?</p>
            <div className="flex justify-end space-x-4">
              <button onClick={() => setShowConfirmationModal(false)} className="px-4 py-2 border rounded-lg cursor-pointer">Back</button>
              <button onClick={confirmSubmission} className="px-4 py-2 bg-teal-600 text-white rounded-lg cursor-pointer" disabled={isSubmitting}>Continue</button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-blur bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
              <CheckCircle className="h-6 w-6 text-mainGreen" />
            </div>
            <h3 className="text-2xl font-semibold mb-2">Success!</h3>
            <p className="text-gray-600 mb-6">Information submitted successfully.</p>
            <button onClick={closeSuccessModal} className="w-full px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700">OK</button>
          </div>
        </div>
      )}
    </>
  );
};

export default KidsSafetyContent;
