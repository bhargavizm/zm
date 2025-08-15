

"use client";
import React, { useRef, useState } from "react";
import useServicesContext from "@/components/hooks/useServiceContext";
import {
  Eye,
  EyeOff,
  PlusCircle,
  MinusCircle,
  MapPin,
  CheckCircle,
} from "lucide-react";
import NFCModal from "@/components/modalPopUps/nfcModal";
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
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { setActiveTab, setText } = useDesignContext();
  const { slug } = useParams();
  // Validation patterns
  const phoneRegex = /^\+?[0-9]{10,15}$/;
  const mapLinkRegex =
    /^https:\/\/(www\.)?(google\.[a-z.]+\/maps|maps\.google\.[a-z.]+)\//;

  const primaryFields = [
    {
      key: "childName",
      placeholder: "Child's Full Name",
      type: "text",
      section: "Child Information",
      required: true,
    },
    {
      key: "dob",
      placeholder: "Date of Birth",
      type: "date",
      section: "Child Information",
      required: true,
    },
    {
      key: "classGrade",
      placeholder: "Class / Grade",
      type: "text",
      section: "Child Information",
      optional: true,
    },
    {
      key: "schoolName",
      placeholder: "School Name",
      type: "text",
      section: "School Information",
      required: true,
    },
    {
      key: "schoolAddress",
      placeholder: "School Full Address",
      type: "textarea",
      section: "School Information",
    },
    {
      key: "schoolContact",
      placeholder: "School Phone Number",
      type: "tel",
      section: "School Information",
      required: true,
    },
    {
      key: "parentName",
      placeholder: "Parent / Guardian Name",
      type: "text",
      section: "Parent Contacts",
      required: true,
    },
    {
      key: "contact",
      placeholder: "Primary Contact Number",
      type: "tel",
      section: "Parent Contacts",
      required: true,
    },
    {
      key: "contact2",
      placeholder: "Secondary Contact Number",
      type: "tel",
      section: "Parent Contacts",
    },
    {
      key: "homeAddress",
      placeholder: "Home Full Address",
      type: "textarea",
      section: "Home Location",
    },
    {
      key: "mapLink",
      placeholder: "Google Maps Link (Optional)",
      type: "url",
      section: "Home Location",
      optional: true,
    },
    {
      key: "password",
      placeholder: "Set Password",
      type: "password",
      section: "Security",
    },
  ];

  const [removedOptionalFields, setRemovedOptionalFields] = useState(() => {
    const initialRemoved = {};
    primaryFields.forEach((field) => {
      if (field.optional && !kidsSafety[field.key]) {
        const sectionName = field.section;
        if (!initialRemoved[sectionName]) {
          initialRemoved[sectionName] = [];
        }
        initialRemoved[sectionName].push(field.key);
      }
    });
    return initialRemoved;
  });

  // Validation functions
  const validateField = (fieldKey, value) => {
    const field = primaryFields.find((f) => f.key === fieldKey);
    if (!field) return "";

    if (field.required && !value?.trim()) {
      return `${field.placeholder} is required`;
    }

    if (
      (fieldKey === "schoolContact" ||
        fieldKey === "contact" ||
        fieldKey === "contact2") &&
      value
    ) {
      if (!phoneRegex.test(value)) {
        return "Please enter a valid phone number 10-15 digits";
      }
    }

    if (fieldKey === "dob" && value) {
      const dob = new Date(value);
      const today = new Date();
      if (dob > today) return "Date of birth cannot be in the future";
    }

    if (fieldKey === "mapLink" && value && !mapLinkRegex.test(value)) {
      return "Please enter a valid Google Maps link";
    }

    return "";
  };

  const validateAltContacts = (contacts) => {
    if (!contacts) return [];
    return contacts.map((contact) =>
      contact && !phoneRegex.test(contact)
        ? "Please enter a valid phone number"
        : ""
    );
  };

  const validateImage = (file) => {
    if (!file) return "Child image is required";

    const minSize = 1024; // 1KB
    const maxSize = 30 * 1024 * 1024; // 30MB

    if (file.size < minSize) return "Image must be larger than 1KB";
    if (file.size > maxSize) return "Image must be smaller than 30MB";

    return "";
  };

  const validateForm = () => {
    const newErrors = {};

    primaryFields.forEach((field) => {
      if (!removedOptionalFields[field.section]?.includes(field.key)) {
        const error = validateField(field.key, kidsSafety[field.key]);
        if (error) newErrors[field.key] = error;
      }
    });

    if (kidsSafety.altContact) {
      const altContactErrors = validateAltContacts(kidsSafety.altContact);
      if (altContactErrors.some((err) => err)) {
        newErrors.altContact = altContactErrors;
      }
    }

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
  setErrors((prev) => ({
    ...prev,
    [fieldKey]: error
  }));
};


 const handleImageChange = (e) => {
  const file = e.target.files[0];
  const error = file ? validateImage(file) : "Child image is required";

  setErrors((prev) => ({ ...prev, kidsImage: error }));

  if (!error) {
    updateDynamicForm("kidsSafety", null, "kidsImage", file);
  } else if (imageInputRef.current) {
    imageInputRef.current.value = "";
  }
};


  const addAltContact = () => {
    updateDynamicForm("kidsSafety", null, "altContact", [
      ...(kidsSafety.altContact || []),
      "",
    ]);
  };

  const handleAltContactChange = (index, value) => {
  const updatedContacts = [...(kidsSafety.altContact || [])];
  updatedContacts[index] = value;
  updateDynamicForm("kidsSafety", null, "altContact", updatedContacts);

  const error = value && !phoneRegex.test(value) ? "Please enter a valid phone number" : "";
  const updatedErrors = [...(errors.altContact || [])];
  updatedErrors[index] = error;
  setErrors((prev) => ({ ...prev, altContact: updatedErrors }));
};


  const removeAltContact = (index) => {
    const updatedContacts = [...(kidsSafety.altContact || [])];
    updatedContacts.splice(index, 1);
    updateDynamicForm("kidsSafety", null, "altContact", updatedContacts);

    if (errors.altContact?.[index]) {
      const updatedErrors = [...errors.altContact];
      updatedErrors.splice(index, 1);
      setErrors({ ...errors, altContact: updatedErrors });
    }
  };

  const handleAddField = (sectionName, fieldKey) => {
    handleInputChange(fieldKey, "");
    setRemovedOptionalFields((prev) => ({
      ...prev,
      [sectionName]: prev[sectionName].filter((key) => key !== fieldKey),
    }));
  };

  const handleRemoveField = (sectionName, fieldKey) => {
    handleInputChange(fieldKey, undefined);
    setRemovedOptionalFields((prev) => ({
      ...prev,
      [sectionName]: [...(prev[sectionName] || []), fieldKey],
    }));
    if (errors[fieldKey]) {
      setErrors((prev) => ({ ...prev, [fieldKey]: "" }));
    }
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

      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`
      );
      const data = await response.json();
      handleInputChange("homeAddress", data.display_name || "Current location");
    } catch (error) {
      toast.error("Failed to fetch location: " + error.message);
    }
  };

 const hasAnyError = Object.values(errors).some(
  (err) => Array.isArray(err) ? err.some(Boolean) : Boolean(err)
);

const handleSubmit = (e) => {
  e.preventDefault();

  // Final check before opening modal
  if (!validateForm() || hasAnyError) {
    toast.error("Please fix all errors before proceeding");
    return;
  }

  setShowConfirmationModal(true);
};


  const confirmSubmission = async () => {
    setActiveTab(slug, "Backdrop Designs");

    // setShowConfirmationModal(false);
    // setIsSubmitting(true);

    // try {
    //   const formData = new FormData();
    //   Object.entries(kidsSafety).forEach(([key, value]) => {
    //     if (key === "altContact") {
    //       formData.append(key, JSON.stringify(value));
    //     } else if (key === "dob") {
    //       formData.append(key, new Date(value).toISOString());
    //     } else if (key !== "kidsImage" && value != null) {
    //       formData.append(key, value);
    //     }
    //   });

    //   if (kidsSafety.kidsImage instanceof File) {
    //     formData.append("kidsImage", kidsSafety.kidsImage);
    //   }

    //   const response = await fetch("/api/services/kids-safety-qr-tags", {
    //     method: "POST",
    //     body: formData,
    //   });

    //   const { fileData, qrUrl } = response.body;

    //   if (!fileData?._id && qrUrl) throw new Error("Submission failed");

    //   setShowSuccessModal(true);
    //   toast.success("Kids Safety form submitted successfully!");
    //   setText(qrUrl); // ✅ from backend
    //   setActiveTab(slug, "QR Code");
    //   dynamicForms.kidsSafety = {
    //     childName: "",
    //     dob: "",
    //     classGrade: "",
    //     schoolName: "",
    //     schoolAddress: "",
    //     parentName: "",
    //     contact: "",
    //     contact2: "",
    //     schoolContact: "",
    //     altContact: [],
    //     homeAddress: "",
    //     mapLink: "",
    //     password: "",
    //     selectedTemplate: "",
    //     kidsImage: null,
    //   };

    //   router.refresh();
    // } catch (error) {
    //   toast.error(error?.response?.data?.error || "Something went wrong!");
    // } finally {
    //   setIsSubmitting(false);
    // }
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const hasError = (fieldKey, index = null) => {
    return index !== null ? errors.altContact?.[index] : errors[fieldKey];
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="space-y-8 p-4 bg-gray-50 rounded-xl shadow-lg"
      >
        {/* Child's Profile Image */}
        <div className="p-6 bg-white rounded-xl shadow-md">
          <h3 className="text-2xl font-semibold mb-6 border-b pb-3">
            Child's Profile Image
          </h3>
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
            {errors.kidsImage && (
              <p className="text-red-500 text-sm">{errors.kidsImage}</p>
            )}
            {kidsSafety.kidsImage && (
              <div className="relative mt-4 w-fit">
                <img
                  src={
                    kidsSafety.kidsImage instanceof File
                      ? URL.createObjectURL(kidsSafety.kidsImage)
                      : kidsSafety.kidsImage
                  }
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
            (sections[field.section] = sections[field.section] || []).push(
              field
            );
            return sections;
          }, {})
        ).map(([sectionName, fields]) => (
          <div key={sectionName} className="p-6 bg-white rounded-xl shadow-md">
            <h3 className="text-2xl font-semibold mb-6 border-b pb-3 capitalize">
              {sectionName}
            </h3>
            <div className="space-y-5">
              {fields
                .filter(
                  (field) =>
                    !removedOptionalFields[sectionName]?.includes(field.key)
                )
                .map((field) => (
                  <div key={field.key} className="space-y-1">
                    <div className="flex items-center space-x-3">
                      {field.type === "textarea" ? (
                        <textarea
                          placeholder={field.placeholder}
                          value={kidsSafety[field.key] || ""}
                          onChange={(e) =>
                            handleInputChange(field.key, e.target.value)
                          }
                          rows={3}
                          className={`w-full p-3 border rounded-lg ${
                            hasError(field.key)
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                        />
                      ) : field.type === "password" ? (
                        <div className="relative flex-1">
                          <input
                            type={showPassword ? "text" : "password"}
                            placeholder={field.placeholder}
                            value={kidsSafety[field.key] || ""}
                            onChange={(e) =>
                              handleInputChange(field.key, e.target.value)
                            }
                            className={`w-full p-3 border rounded-lg pr-10 ${
                              hasError(field.key)
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                          >
                            {showPassword ? (
                              <Eye size={18} />
                            ) : (
                              <EyeOff size={18} />
                            )}
                          </button>
                        </div>
                      ) : (
                        <input
                          type={field.type}
                          placeholder={field.placeholder}
                          value={kidsSafety[field.key] || ""}
                          onChange={(e) =>
                            handleInputChange(field.key, e.target.value)
                          }
                          className={`w-full p-3 border rounded-lg ${
                            hasError(field.key)
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                        />
                      )}
                      {field.optional && (
                        <button
                          type="button"
                          onClick={() =>
                            handleRemoveField(sectionName, field.key)
                          }
                          className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                        >
                          <MinusCircle size={20} />
                        </button>
                      )}
                    </div>
                    {hasError(field.key) && (
                      <p className="text-red-500 text-sm">
                        {errors[field.key]}
                      </p>
                    )}
                  </div>
                ))}

              {sectionName === "Parent Contacts" && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">School Contact Numbers</h4>
                    <button
                      type="button"
                      onClick={addAltContact}
                      className="flex items-center text-teal-600 text-sm"
                    >
                      <PlusCircle size={16} className="mr-1" />
                      Add Contact
                    </button>
                  </div>
                  {kidsSafety.altContact?.map((contact, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex items-center space-x-3">
                        <input
                          type="tel"
                          placeholder={`Contact ${index + 1}`}
                          value={contact || ""}
                          onChange={(e) =>
                            handleAltContactChange(index, e.target.value)
                          }
                          className={`flex-1 p-3 border rounded-lg ${
                            hasError(null, index)
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => removeAltContact(index)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                        >
                          <MinusCircle size={20} />
                        </button>
                      </div>
                      {hasError(null, index) && (
                        <p className="text-red-500 text-sm">
                          {errors.altContact[index]}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {sectionName === "Home Location" && (
                <button
                  type="button"
                  onClick={fetchCurrentLocation}
                  className="flex items-center justify-center w-full p-3 bg-mainGreen text-white cursor-pointer rounded-lg"
                >
                  <MapPin size={16} className="mr-2" />
                  Use Current Location
                </button>
              )}

              {removedOptionalFields[sectionName]?.length > 0 && (
                <div className="pt-2">
                  <h4 className="text-sm text-gray-500 mb-2">
                    Add Optional Fields:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {removedOptionalFields[sectionName].map((fieldKey) => {
                      const field = primaryFields.find(
                        (f) => f.key === fieldKey
                      );
                      return (
                        field && (
                          <button
                            key={fieldKey}
                            type="button"
                            onClick={() =>
                              handleAddField(sectionName, fieldKey)
                            }
                            className="flex items-center text-xs text-teal-600 bg-teal-50 px-3 py-1 rounded-full"
                          >
                            <PlusCircle size={14} className="mr-1" />
                            {field.placeholder}
                          </button>
                        )
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* NFC Section */}
        {/* <div className="p-6 bg-white rounded-xl shadow-md">
          <h3 className="text-2xl font-semibold mb-6 border-b pb-3">NFC Functionality</h3>
          <NFCModal />
        </div> */}

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"

             className="font-bold px-4 cursor-pointer bg-[#008080] text-white py-2 rounded transition-effects text-lg"
          >
            Next →
          </button>
        </div>
      </form>

      {/* Confirmation Modal */}
      {showConfirmationModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/30">
          <div className="bg-white relative rounded-xl shadow-xl p-6 w-full max-w-xl max-h-[90vh] border border-teal-200 mx-4 sm:mx-auto">
            <h3 className="text-2xl font-semibold mb-4">Confirm Submission</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to submit this information?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowConfirmationModal(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-100"
              >
                Back
              </button>
              <button
                onClick={confirmSubmission}
                className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                disabled={isSubmitting}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-blur bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-2xl font-semibold mb-2">Success!</h3>
            <p className="text-gray-600 mb-6">
              Information submitted successfully.
            </p>
            <button
              onClick={closeSuccessModal}
              className="w-full px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default KidsSafetyContent;
