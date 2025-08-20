"use client";

import React, { useState } from "react";
import useServicesContext from "@/components/hooks/useServiceContext";
import { FiTrash2, FiMapPin } from "react-icons/fi";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import NFCModal from "@/components/modalPopUps/nfcModal";
import { toast } from "react-hot-toast";
import { useParams } from "next/navigation";
import useDesignContext from "@/components/hooks/useDesignContext";
import LoadingSpinner from "@/components/common/spinner";

// Reusable file upload component
const MultipleFileUploadField = ({ label, section, keyName, filesData, onFileChange, onRemoveFile }) => (
  <div className="space-y-2 mt-4">
    <label className="text-sm font-medium text-gray-700 block">{label}</label>
    <label className="bg-teal-700 text-white px-4 py-2 rounded cursor-pointer inline-block">
      Choose Files
      <input
        type="file"
        multiple
        onChange={(e) => onFileChange(section, keyName, e.target.files)}
        className="hidden"
      />
    </label>
    <p className="text-sm text-gray-600">
      {filesData?.files?.length > 0
        ? `${filesData.files.length} file(s) selected`
        : "No files chosen"}
    </p>
    {filesData?.files?.length > 0 && (
      <div className="flex flex-wrap gap-3 mt-2">
        {filesData.files.map((file, index) => {
          const isImage = file.type?.startsWith("image") || file.name?.match(/\.(jpg|jpeg|png|webp|gif)$/i);
          return (
            <div key={index} className="relative">
              {isImage ? (
                <img
                  src={typeof file === "string" ? file : URL.createObjectURL(file)}
                  alt={`File ${index}`}
                  className="h-20 w-20 object-center rounded-lg"
                />
              ) : (
                <div className="h-20 w-20 flex items-center justify-center text-xs text-center bg-gray-100 rounded-lg px-1">
                  {file.name}
                </div>
              )}
              <button
                onClick={() => onRemoveFile(section, keyName, index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white cursor-pointer rounded-full p-1 hover:bg-red-600"
                type="button"
              >
                <FiTrash2 size={14} />
              </button>
            </div>
          );
        })}
      </div>
    )}
  </div>
);

// Confirm Modal
const ConfirmModal = ({ onCancel, onConfirm }) => (
         <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/30">
          <div className="bg-white relative rounded-xl shadow-xl p-6 w-full max-w-xl max-h-[90vh] border border-teal-200 mx-4 sm:mx-auto">
      <h2 className="text-lg font-semibold mb-4 text-center text-gray-800">
        Confirm Submission
      </h2>
      <p className="text-gray-600 text-center mb-6">
        Are you sure you want to submit this Medical Alert form?
      </p>
      <div className="flex justify-center gap-4">
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
        >
          Edit
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
        >
          Continue
        </button>
      </div>
    </div>
  </div>
);

// Main Component
const MedicalAlertContent = () => {
  const {
    dynamicForms,
    updateDynamicForm,
    servicesDataLoading,
    setServicesDataLoading
  } = useServicesContext();
  const { slug } = useParams();
  const { setActiveTab } = useDesignContext();

  const medicalAlert = dynamicForms.medicalAlert || {};

  const sections = {
    patientInfo: ["patientName", "age", "bloodType"],
    medicalHistory: ["medicalConditions", "allergies", "medications", "additionalNotes"],
    emergencyContact: ["emergencyContact", "contactPhone", "preferredHospital", "location"],
    additional: ["familyDoctorName", "familyDoctorPhone", "emergencyInstructions", "insuranceProvider", "policyNumber", "medicalReports", "prescription", "insuranceImage"]
  };

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Live validation state
  const [validationErrors, setValidationErrors] = useState({});

  const fieldLabel = (key) =>
    key.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase());

  // -----------------------------
  // Live validation on change
  // -----------------------------
const handleChange = (section, key, value) => {
  updateDynamicForm("medicalAlert", section, key, value);

  setValidationErrors(prev => {
    let error = false;

    if (key === "patientName") {
      error = value.trim().length === 0; // required text
    } 
    else if (["contactPhone", "familyDoctorPhone", "emergencyContact"].includes(key)) {
      // validate only if user typed something
      error = value.trim().length > 0 && !/^\d{10,15}$/.test(value);
    }

    return { ...prev, [key]: error };
  });
};


  const handleFileChange = (section, key, files) => {
    const newFilesArray = Array.from(files);
    const existingFiles = medicalAlert[section]?.[key]?.files || [];
    const mergedFiles = [...existingFiles];

    newFilesArray.forEach(file => {
      const isDuplicate = existingFiles.some(
        f => f.name === file.name && f.size === file.size && f.type === file.type
      );
      if (!isDuplicate) mergedFiles.push(file);
    });

    updateDynamicForm("medicalAlert", section, key, {
      displayValue: mergedFiles.map(f => f.name).join(", "),
      files: mergedFiles,
    });
  };

  const handleRemoveFile = (section, key, index) => {
    const currentFiles = [...(medicalAlert[section]?.[key]?.files || [])];
    currentFiles.splice(index, 1);
    updateDynamicForm("medicalAlert", section, key, {
      displayValue: currentFiles.map(f => f.name).join(", "),
      files: currentFiles,
    });
  };

const validateForm = () => {
  const errors = {};

  // Required
  errors.patientName = !medicalAlert.patientInfo?.patientName?.trim();

  // Phone validation (required + format)
  errors.emergencyContact = !/^\d{10,15}$/.test(medicalAlert.emergencyContact?.emergencyContact || "");
  errors.contactPhone = !/^\d{10,15}$/.test(medicalAlert.emergencyContact?.contactPhone || "");
  errors.familyDoctorPhone =
    medicalAlert.additional?.familyDoctorPhone?.trim()
      ? !/^\d{10,15}$/.test(medicalAlert.additional.familyDoctorPhone)
      : false; // optional field

  setValidationErrors(errors);

  return !Object.values(errors).some(Boolean);
};


  const resetForm = () => {
    Object.entries(sections).forEach(([section, keys]) => {
      keys.forEach(key => updateDynamicForm("medicalAlert", section, key, key === "age" ? 0 : ""));
    });
    setPassword("");
    setValidationErrors({});
  };

  const handleFinalSubmit = async () => {
    updateDynamicForm("medicalAlert", null, "password", password.trim());
    setActiveTab(slug, "Backdrop Designs");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) setShowConfirmModal(true);
    else toast.error("Please fill the necessary fields correctly.");
  };

  const fetchCurrentLocation = async () => {
    if (navigator.geolocation) {
      try {
        const pos = await new Promise((resolve, reject) =>
          navigator.geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy: true, timeout: 10000 })
        );
        const { latitude, longitude } = pos.coords;
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
        const data = await res.json();
        handleChange("emergencyContact", "location", data.display_name || "Address not found");
      } catch {
        toast.error("Failed to get location.");
      }
    } else {
      toast.error("Geolocation not supported.");
    }
  };

  return (
    <>
      {servicesDataLoading && <LoadingSpinner />}

      <form onSubmit={handleSubmit}>
        <h1 className="text-3xl font-bold pb-6 text-[#008080]">Medical Alert QR Code</h1>
        {error && <div className="text-red-600 bg-red-100 p-3 rounded">{error}</div>}

        {Object.entries(sections).map(([section, keys]) => (
          <div key={section} className="border p-4 rounded shadow-sm mb-6">
            <h2 className="text-xl font-semibold mb-4 text-[#008080]">
              {section.replace(/([A-Z])/g, " $1")}
            </h2>

            {keys.filter(k => medicalAlert[section]?.[k] !== undefined).map(key => (
              <div key={key} className="mb-4">
                {["medicalReports", "prescription", "insuranceImage"].includes(key) ? (
                  <MultipleFileUploadField
                    label={fieldLabel(key)}
                    section={section}
                    keyName={key}
                    filesData={medicalAlert[section]?.[key]}
                    onFileChange={handleFileChange}
                    onRemoveFile={handleRemoveFile}
                  />
                ) : (
                  <div className="relative">
                    <input
                      type={key === "age" ? "number" : "text"}
                      placeholder={fieldLabel(key)}
                      value={medicalAlert[section]?.[key] || ""}
                      onChange={(e) => handleChange(section, key, e.target.value)}
                      className={`w-full border p-2 rounded ${validationErrors[key] ? "border-red-500" : ""}`}
                    />
                    {key === "location" && (
                      <button
                        type="button"
                        onClick={fetchCurrentLocation}
                        className="absolute right-2 top-2 text-gray-500 hover:text-[#008080]"
                        title="Get current location"
                      >
                        <FiMapPin size={18} />
                      </button>
                    )}
                   {validationErrors[key] && (
  <p className="text-red-500 text-sm mt-1">
    {["contactPhone", "familyDoctorPhone", "emergencyContact"].includes(key)
      ? "Please enter a valid phone number"
      : `${fieldLabel(key)} is required`}
  </p>
)}


                  </div>
                )}
              </div>
            ))}
          </div>
        ))}

        <div className="relative mb-4">
          <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-2 pr-10 rounded"
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-[#008080]"
          >
            {showPassword ? <IoEyeOutline size={20} /> : <IoEyeOffOutline size={20} />}
          </span>
        </div>

        <NFCModal />

        <div className="flex justify-center items-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="font-bold px-4 cursor-pointer bg-[#008080] text-white py-2 rounded transition-effects text-lg"
          >
            Next →
          </button>
        </div>

        {showConfirmModal && (
          <ConfirmModal
            onCancel={() => setShowConfirmModal(false)}
            onConfirm={handleFinalSubmit}
          />
        )}
      </form>
    </>
  );
};

export default MedicalAlertContent;


