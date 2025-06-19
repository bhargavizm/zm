"use client";

import React, { useState } from "react";
import useServicesContext from "@/components/hooks/useServiceContext";
import { FiTrash2 } from "react-icons/fi";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import NFCModal from "@/components/modalPopUps/nfcModal";

const MedicalAlertContent = () => {
  const {
    dynamicForms,
    updateDynamicForm,
    addTemplateField,
    removeTemplateField,
    setDynamicForms,
    showPassword,
    setShowPassword,
  } = useServicesContext();

  const medicalAlert = dynamicForms.medicalAlert;

  const sections = {
    patientInfo: ["patientName", "birthDate", "bloodType"],
    medicalHistory: [
      "medicalConditions",
      "allergies",
      "medications",
      "additionalNotes",
    ],
    emergencyContact: ["emergencyContact", "contactPhone"],
    additional: [
      "familyDoctorName",
      "familyDoctorPhone",
      "emergencyInstructions",
      "insuranceProvider",
      "policyNumber",
      "medicalReports", // PDF
      "prescription", // image
      "insuranceImage", // image
      "preferredHospital",
      "location",
    ],
  };

  const [deletedFields, setDeletedFields] = useState({
    patientInfo: [],
    medicalHistory: [],
    emergencyContact: [],
    additional: [],
  });

  const handleChange = (section, key, value) => {
    if (value instanceof File) {
      const reader = new FileReader();
      reader.onload = () => {
        updateDynamicForm("medicalAlert", section, key, reader.result);
      };
      reader.readAsDataURL(value);
    } else {
      updateDynamicForm("medicalAlert", section, key, value);
    }
  };

  const handleAddField = (section, key) => {
    addTemplateField("medicalAlert", section, key, "");
    setDeletedFields((prev) => ({
      ...prev,
      [section]: prev[section].filter((item) => item !== key),
    }));
  };

  const handleRemoveField = (section, key) => {
    removeTemplateField("medicalAlert", section, key);
    setDeletedFields((prev) => ({
      ...prev,
      [section]: [...prev[section], key],
    }));
  };

  const fieldLabel = (key) =>
    key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());

  return (
    <>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold pb-6 text-[#008080]">
          Medical Alert QR Code
        </h1>

        {Object.entries(sections).map(([section, fields]) => (
          <div key={section} className="border rounded p-4 shadow-sm space-y-4">
            <h3 className="text-xl font-semibold capitalize text-[#008080]">
              {section.replace(/([A-Z])/g, " $1")}
            </h3>

            {fields
              .filter((key) => medicalAlert[section]?.[key] !== undefined)
              .map((key) => (
                <div key={key} className="flex items-center space-x-2">
                  {["medicalReports", "prescription", "insuranceImage"].includes(key) ? (
                    <div className="flex flex-col w-full">
                      <label className="text-sm font-medium text-gray-700">
                        {fieldLabel(key)}
                      </label>
                      <input
                        type="file"
                        accept={
                          key === "medicalReports" ? "application/pdf" : "image/*"
                        }
                        onChange={(e) =>
                          handleChange(section, key, e.target.files[0])
                        }
                        className="w-full file:mr-4 file:py-3 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-600 file:text-white hover:file:bg-teal-700 file:transition-colors file:duration-200 cursor-pointer border border-gray-300 rounded-lg py-2 mt-1"
                      />
                    </div>
                  ) : (
                    <input
                      type="text"
                      name={key}
                      placeholder={fieldLabel(key)}
                      value={medicalAlert[section][key]}
                      onChange={(e) => handleChange(section, key, e.target.value)}
                      className="border p-2 rounded flex-1"
                    />
                  )}

                  <button
                    type="button"
                    onClick={() => handleRemoveField(section, key)}
                    className="hover:bg-red-200 p-2 rounded"
                    aria-label="Remove Field"
                  >
                    <FiTrash2 className="text-red-700" />
                  </button>
                </div>
              ))}

            {deletedFields[section].length > 0 && (
              <div className="flex items-center space-x-2">
                <select
                  onChange={(e) => {
                    const key = e.target.value;
                    if (key) handleAddField(section, key);
                    e.target.selectedIndex = 0;
                  }}
                  className="border p-2 rounded"
                >
                  <option value="">Add field</option>
                  {deletedFields[section].map((field) => (
                    <option key={field} value={field}>
                      {fieldLabel(field)}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        ))}

        {/* Password Field */}
        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={dynamicForms.medicalAlert?.password || ""}
            onChange={(e) =>
              setDynamicForms((prev) => ({
                ...prev,
                medicalAlert: {
                  ...prev.medicalAlert,
                  password: e.target.value,
                },
              }))
            }
            className="border p-2 pr-10 rounded w-full"
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-[#008080]"
          >
            {showPassword ? (
              <IoEyeOffOutline size={20} />
            ) : (
              <IoEyeOutline size={20} />
            )}
          </span>
        </div>
      </div>

      <NFCModal />

      <button
        type="submit"
        className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-lg font-semibold text-sm transition mt-6"
      >
        Submit
      </button>
    </>
  );
};

export default MedicalAlertContent;
