// "use client";

// import React, { useState } from "react";
// import useServicesContext from "@/components/hooks/useServiceContext";
// import { FiTrash2 } from "react-icons/fi";
// import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
// import NFCModal from "@/components/modalPopUps/nfcModal";
// import { MapPin } from "lucide-react";


// const PropertyContent = () => {
//   const {
//     dynamicForms,
//     updateDynamicForm,
//     addTemplateField,
//     removeTemplateField,
//     setDynamicForms,
//     showPassword,
//     setShowPassword,
//   } = useServicesContext();

//   const propertyData = dynamicForms.propertyDetails || {
//     basicInfo: {},
//     addressInfo: {},
//     pricingInfo: {},
//     images: {},
//     password: "",
//   };

//   const sections = {
//     basicInfo: ["propertyName", "propertyType", "ownerName", "contactNumber", "alternateNumber", "propertyDescription"],
//     addressInfo: ["address", "mapLink"],
//     pricingInfo: ["price", "area", "amenities"],
//     images: ["mainImage", "galleryImages"],
//   };

//   const [deletedFields, setDeletedFields] = useState({
//     basicInfo: [],
//     addressInfo: [],
//     pricingInfo: [],
//     images: [],
//   });

//   const handleChange = (section, key, value) => {
//     updateDynamicForm("propertyDetails", section, key, value);
//   };

//   const handleAddField = (section, key) => {
//     addTemplateField("propertyDetails", section, key, "");
//     setDeletedFields((prev) => ({
//       ...prev,
//       [section]: prev[section].filter((item) => item !== key),
//     }));
//   };

//   const handleRemoveField = (section, key) => {
//     removeTemplateField("propertyDetails", section, key);
//     setDeletedFields((prev) => ({
//       ...prev,
//       [section]: [...prev[section], key],
//     }));
//   };

//   const handlePasswordChange = (e) => {
//     const value = e.target.value;
//     setDynamicForms((prev) => ({
//       ...prev,
//       propertyDetails: {
//         ...prev.propertyDetails,
//         password: value,
//       },
//     }));
//   };

//   const handleImageChange = (section, key, files) => {
//     updateDynamicForm("propertyDetails", section, key, files);
//   };

//   const fetchCurrentLocation = async () => {
//   if (navigator.geolocation) {
//     try {
//       const pos = await new Promise((resolve, reject) => {
//         navigator.geolocation.getCurrentPosition(resolve, reject, {
//           enableHighAccuracy: true,
//           timeout: 10000,
//           maximumAge: 0,
//         });
//       });

//       const { latitude, longitude } = pos.coords;

//       const response = await fetch(
//         `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
//       );
//       const data = await response.json();
//       const fullAddress = data.display_name || "Address not found";

//       updateDynamicForm("propertyDetails", "addressInfo", "address", fullAddress);
//     } catch (err) {
//       console.error("Error fetching current location:", err.message);
//       alert("Failed to fetch location. Please check permissions.");
//     }
//   } else {
//     alert("Geolocation not supported in your browser.");
//   }
// };


//   return (
//     <>
//     <div className="space-y-6">
//   <h1 className="text-3xl font-bold pb-6 text-[#008080]">
//     Property QR Code
//   </h1>

//   {Object.entries(sections).map(([section, fields]) => (
//     <div key={section} className="border rounded p-4 shadow-sm space-y-4">
//       <h3 className="text-xl font-semibold capitalize text-[#008080]">
//         {section.replace(/([A-Z])/g, " $1")}
//       </h3>

//       {fields
//         .filter((key) => propertyData[section]?.[key] !== undefined)
//         .map((key) => (
//           <div key={key} className="flex items-start md:items-center space-x-2">
//             {key === "mainImage" ? (
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) =>
//                   handleImageChange(section, key, e.target.files[0])
//                 }
//                 className="w-full text-gray-700 file:mr-4 file:py-3 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-600 file:text-white hover:file:bg-teal-700 file:transition-colors file:duration-200 cursor-pointer border border-gray-300 rounded-lg py-2"
//               />
//             ) : key === "galleryImages" ? (
//               <input
//                 type="file"
//                 accept="image/*"
//                 multiple
//                 onChange={(e) =>
//                   handleImageChange(
//                     section,
//                     key,
//                     Array.from(e.target.files)
//                   )
//                 }
//                 className="w-full text-gray-700 file:mr-4 file:py-3 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-600 file:text-white hover:file:bg-teal-700 file:transition-colors file:duration-200 cursor-pointer border border-gray-300 rounded-lg py-2"
//               />
//             ) : key === "address" ? (
//               <div className="flex-1 space-y-2">
//                 <textarea
//                   rows={3}
//                   name={key}
//                   placeholder="Address"
//                   value={propertyData[section][key]}
//                   onChange={(e) =>
//                     handleChange(section, key, e.target.value)
//                   }
//                   className="border p-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#008080] resize-none"
//                 />
//                 <button
//                   type="button"
//                   onClick={fetchCurrentLocation}
//                   className="flex items-center justify-center w-full py-2 px-3 bg-gray-100 hover:bg-gray-300 text-gray-700 text-sm rounded-lg transition-colors duration-200 cursor-pointer"
//                 >
//                   <MapPin size={16} className="mr-2" />
//                   Use Current Location
//                 </button>
//               </div>
//             ) : (
//               <input
//                 type="text"
//                 name={key}
//                 placeholder={key.replace(/([A-Z])/g, " $1")}
//                 value={propertyData[section][key]}
//                 onChange={(e) =>
//                   handleChange(section, key, e.target.value)
//                 }
//                 className="border p-2 rounded flex-1"
//               />
//             )}

//             <button
//               type="button"
//               onClick={() => handleRemoveField(section, key)}
//               className="hover:bg-red-200 mt-1"
//             >
//               <FiTrash2 className="text-red-700" />
//             </button>
//           </div>
//         ))}

//       {/* Dropdown to Add Deleted Fields */}
//       {deletedFields[section].length > 0 && (
//         <div className="flex items-center space-x-2">
//           <select
//             onChange={(e) => {
//               const key = e.target.value;
//               if (key) handleAddField(section, key);
//               e.target.selectedIndex = 0;
//             }}
//             className="border p-2 rounded"
//           >
//             <option value="">Add field</option>
//             {deletedFields[section].map((field) => (
//               <option key={field} value={field}>
//                 {field.replace(/([A-Z])/g, " $1")}
//               </option>
//             ))}
//           </select>
//         </div>
//       )}
//     </div>
//   ))}

//   {/* Password Field with Eye Icon */}
//   <div className="relative w-full">
//     <input
//       type={showPassword ? "text" : "password"}
//       placeholder="Password"
//       value={propertyData.password || ""}
//       onChange={handlePasswordChange}
//       className="border p-2 pr-10 rounded w-full"
//     />
//     <span
//       onClick={() => setShowPassword(!showPassword)}
//       className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-[#008080]"
//     >
//       {showPassword ? (
//         <IoEyeOutline size={20} />
//       ) : (
//         <IoEyeOffOutline size={20} />
//       )}
//     </span>
//   </div>

//   <NFCModal />

//   <button
//     type="submit"
//     className="mt-4 w-full bg-[#008080] text-white font-semibold py-2 rounded hover:bg-[#006666] transition"
//   >
//     Submit
//   </button>
// </div>

//     </>
//   );
// };

// export default PropertyContent;

// "use client";

// import React, { useState, useRef } from "react";
// import useServicesContext from "@/components/hooks/useServiceContext";
// import { FiTrash2 } from "react-icons/fi";
// import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
// import NFCModal from "@/components/modalPopUps/nfcModal";
// import { MapPin } from "lucide-react";
// import { useParams, useRouter } from "next/navigation";
// import toast from "react-hot-toast";
// import { setPropertyServices } from "@/redux/slices/servicesSlice";
// import axios from "axios";
// import { useDispatch } from "react-redux";
// import useDesignContext from "@/components/hooks/useDesignContext";
// // PropertyContent.jsx
"use client";

import React, { useState, useRef } from "react";
import { FiTrash2 } from "react-icons/fi";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { MapPin } from "lucide-react";
import toast from "react-hot-toast";
import NFCModal from "@/components/modalPopUps/nfcModal";
import { useParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setPropertyServices } from "@/redux/slices/servicesSlice";
import useServicesContext from "@/components/hooks/useServiceContext";
import useDesignContext from "@/components/hooks/useDesignContext";

const PropertyContent = () => {

  const {propertyDetails, setPropertyDetails} = useServicesContext()
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [galleryPreview, setGalleryPreview] = useState([]);
  const galleryInputRef = useRef(null);
  const { slug } = useParams();
  const { setActiveTab } = useDesignContext();
  const router = useRouter();
  const dispatch = useDispatch();

  const sections = {
    basicInfo: ["propertyName", "propertyType", "ownerName", "contactNumber", "alternateNumber", "propertyDescription"],
    addressInfo: ["address", "mapLink"],
    pricingInfo: ["price", "area", "amenities"],
    images: ["galleryImages"],
  };

  const handleChange = (section, key, value) => {
    setPropertyDetails((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  const handleImageChange = (section, key, files) => {
    const newValidFiles = [];
    const newPreviews = [];
    let newSize = 0;

    for (const file of files) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error(`"${file.name}" exceeds 2MB limit.`);
      } else {
        newSize += file.size;
        newValidFiles.push(file);
        newPreviews.push({ file, url: URL.createObjectURL(file) });
      }
    }

    const existingSize = galleryPreview.reduce((acc, item) => acc + item.file.size, 0);
    const totalSize = existingSize + newSize;

    if (totalSize > 30 * 1024 * 1024) {
      toast.error("Total image size must be ≤ 30MB");
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
    handleChange("images", "galleryImages", newPreview.map((item) => item.file));
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

        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
        );
        const data = await response.json();
        const fullAddress = data.display_name || "Address not found";

        handleChange("addressInfo", "address", fullAddress);
      } catch (err) {
        alert("Failed to fetch location. Please check permissions.");
        console.error("Location error:", err);
      }
    } else {
      alert("Geolocation not supported in your browser.");
    }
  };

  const validateForm = () => {
    const phoneRegex = /^[0-9]{10,15}$/;
    const contactNumber = propertyDetails.basicInfo.contactNumber || "";
    const alternateNumber = propertyDetails.basicInfo.alternateNumber || "";

    if (alternateNumber && !contactNumber) {
      toast.error("Contact number is required if alternate number is provided.");
      return false;
    }
    if (contactNumber && !phoneRegex.test(contactNumber)) {
      toast.error("Please enter a valid contact number.");
      return false;
    }
    if (alternateNumber && !phoneRegex.test(alternateNumber)) {
      toast.error("Please enter a valid alternate number.");
      return false;
    }
    return true;
  };

  const handleInitialSubmit = (e) => {
    e.preventDefault();
    const allValues = Object.values(propertyDetails).flatMap(section =>
      typeof section === 'object' && !Array.isArray(section)
        ? Object.values(section || {})
        : [section]
    );

    const hasNonEmptyValue = allValues.some(value =>
      Array.isArray(value) ? value.length > 0 : typeof value === "string" ? value.trim() !== "" : !!value
    );

    if (!hasNonEmptyValue) {
      toast.error("Enter at least one field before submitting");
      return;
    }

    if (!validateForm()) return;
    setShowConfirmModal(true);
  };

  const handleConfirmedSubmit = async () => {
    setShowConfirmModal(false);
    const formData = new FormData();

    Object.entries(propertyDetails).forEach(([sectionKey, sectionFields]) => {
      if (typeof sectionFields === "object" && !Array.isArray(sectionFields)) {
        Object.entries(sectionFields).forEach(([fieldKey, value]) => {
          if (Array.isArray(value)) {
            value.forEach((v) => formData.append(fieldKey, v));
          } else {
            formData.append(fieldKey, value);
          }
        });
      } else {
        formData.append(sectionKey, sectionFields);
      }
    });

    try {
      const res = await fetch("/api/services/property", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();

      if (result.success) {
        toast.success("Property submitted!");
        setActiveTab(slug, "QR Code");
        dispatch(setPropertyServices(result.data));
        setPropertyDetails({
          basicInfo: { propertyName: "", propertyType: "", ownerName: "", contactNumber: "", alternateNumber: "", propertyDescription: "" },
          addressInfo: { address: "", mapLink: "" },
          pricingInfo: { price: "", area: "", amenities: "" },
          images: { galleryImages: [] },
          password: "",
        });
        setGalleryPreview([]);
        if (galleryInputRef.current) galleryInputRef.current.value = "";
      } else {
        toast.error(result.error || "Submission failed");
      }
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold pb-6 text-[#008080]">Property QR Code</h1>

      {Object.entries(sections).map(([section, fields]) => (
        <div key={section} className="border rounded p-4 shadow-sm space-y-4">
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
                          handleImageChange(section, key, Array.from(e.target.files))
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
                      <div key={idx} className="relative w-24 h-24 rounded border overflow-hidden shadow-sm">
                        <img
                          src={item.url}
                          alt={`Preview ${idx + 1}`}
                          className="object-cover w-full h-full"
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
              ) : key === "address" ? (
                <div className="space-y-2">
                  <textarea
                    rows={3}
                    name={key}
                    placeholder="Address"
                    value={propertyDetails[section][key] || ""}
                    onChange={(e) => handleChange(section, key, e.target.value)}
                    className="border p-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#008080] resize-none"
                  />
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
                <input
                  type="text"
                  name={key}
                  placeholder={key.replace(/([A-Z])/g, " $1")}
                  value={propertyDetails[section][key] || ""}
                  onChange={(e) => handleChange(section, key, e.target.value)}
                  className="border p-2 rounded"
                />
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
          {showPassword ? <IoEyeOutline size={20} /> : <IoEyeOffOutline size={20} />}
        </span>
      </div>

      <NFCModal />

      <button
        type="submit"
        onClick={handleInitialSubmit}
        className="mt-4 w-full bg-[#008080] text-white font-semibold py-2 rounded hover:bg-[#006666] transition"
      >
        Submit
      </button>

      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/30">
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full border border-teal-200 relative">
            <h2 className="text-lg font-semibold text-gray-800">Confirm Submission</h2>
            <p className="text-gray-600 text-sm mt-2">
              Are you sure you want to submit this property listing? Please review details before confirming.
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
                Confirm & Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyContent;









