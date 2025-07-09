// "use client";

// import React, { useState } from "react";
// import useServicesContext from "@/components/hooks/useServiceContext";
// import { FiTrash2 } from "react-icons/fi";
// import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
// import NFCModal from "@/components/modalPopUps/nfcModal";

// const MedicalAlertContent = () => {
//   const {
//     dynamicForms,
//     updateDynamicForm,
//     addTemplateField,
//     removeTemplateField,
//     setDynamicForms,
//     showPassword,
//     setShowPassword,
//   } = useServicesContext();

//   const medicalAlert = dynamicForms.medicalAlert;

//   const sections = {
//     patientInfo: ["patientName", "birthDate", "bloodType"],
//     medicalHistory: [
//       "medicalConditions",
//       "allergies",
//       "medications",
//       "additionalNotes",
//     ],
//     emergencyContact: ["emergencyContact", "contactPhone"],
//     additional: [
//       "familyDoctorName",
//       "familyDoctorPhone",
//       "emergencyInstructions",
//       "insuranceProvider",
//       "policyNumber",
//       "medicalReports", // PDF
//       "prescription", // image
//       "insuranceImage", // image
//       "preferredHospital",
//       "location",
//     ],
//   };

//   const [deletedFields, setDeletedFields] = useState({
//     patientInfo: [],
//     medicalHistory: [],
//     emergencyContact: [],
//     additional: [],
//   });

//   const handleChange = (section, key, value) => {
//     if (value instanceof File) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         updateDynamicForm("medicalAlert", section, key, reader.result);
//       };
//       reader.readAsDataURL(value);
//     } else {
//       updateDynamicForm("medicalAlert", section, key, value);
//     }
//   };

//   const handleAddField = (section, key) => {
//     addTemplateField("medicalAlert", section, key, "");
//     setDeletedFields((prev) => ({
//       ...prev,
//       [section]: prev[section].filter((item) => item !== key),
//     }));
//   };

//   const handleRemoveField = (section, key) => {
//     removeTemplateField("medicalAlert", section, key);
//     setDeletedFields((prev) => ({
//       ...prev,
//       [section]: [...prev[section], key],
//     }));
//   };

//   const fieldLabel = (key) =>
//     key
//       .replace(/([A-Z])/g, " $1")
//       .replace(/^./, (str) => str.toUpperCase());

//   return (
//     <>
//       <div className="space-y-6">
//         <h1 className="text-3xl font-bold pb-6 text-[#008080]">
//           Medical Alert QR Code
//         </h1>

//         {Object.entries(sections).map(([section, fields]) => (
//           <div key={section} className="border rounded p-4 shadow-sm space-y-4">
//             <h3 className="text-xl font-semibold capitalize text-[#008080]">
//               {section.replace(/([A-Z])/g, " $1")}
//             </h3>

//             {fields
//               .filter((key) => medicalAlert[section]?.[key] !== undefined)
//               .map((key) => (
//                 <div key={key} className="flex items-center space-x-2">
//                   {["medicalReports", "prescription", "insuranceImage"].includes(key) ? (
//                     <div className="flex flex-col w-full">
//                       <label className="text-sm font-medium text-gray-700">
//                         {fieldLabel(key)}
//                       </label>
//                       <input
//                         type="file"
//                         accept={
//                           key === "medicalReports" ? "application/pdf" : "image/*"
//                         }
//                         onChange={(e) =>
//                           handleChange(section, key, e.target.files[0])
//                         }
//                         className="w-full file:mr-4 file:py-3 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-600 file:text-white hover:file:bg-teal-700 file:transition-colors file:duration-200 cursor-pointer border border-gray-300 rounded-lg py-2 mt-1"
//                       />
//                     </div>
//                   ) : (
//                     <input
//                       type="text"
//                       name={key}
//                       placeholder={fieldLabel(key)}
//                       value={medicalAlert[section][key]}
//                       onChange={(e) => handleChange(section, key, e.target.value)}
//                       className="border p-2 rounded flex-1"
//                     />
//                   )}

//                   <button
//                     type="button"
//                     onClick={() => handleRemoveField(section, key)}
//                     className="hover:bg-red-200 p-2 rounded"
//                     aria-label="Remove Field"
//                   >
//                     <FiTrash2 className="text-red-700" />
//                   </button>
//                 </div>
//               ))}

//             {deletedFields[section].length > 0 && (
//               <div className="flex items-center space-x-2">
//                 <select
//                   onChange={(e) => {
//                     const key = e.target.value;
//                     if (key) handleAddField(section, key);
//                     e.target.selectedIndex = 0;
//                   }}
//                   className="border p-2 rounded"
//                 >
//                   <option value="">Add field</option>
//                   {deletedFields[section].map((field) => (
//                     <option key={field} value={field}>
//                       {fieldLabel(field)}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             )}
//           </div>
//         ))}

//         {/* Password Field */}
//         <div className="relative w-full">
//           <input
//             type={showPassword ? "text" : "password"}
//             placeholder="Password"
//             value={dynamicForms.medicalAlert?.password || ""}
//             onChange={(e) =>
//               setDynamicForms((prev) => ({
//                 ...prev,
//                 medicalAlert: {
//                   ...prev.medicalAlert,
//                   password: e.target.value,
//                 },
//               }))
//             }
//             className="border p-2 pr-10 rounded w-full"
//           />
//           <span
//             onClick={() => setShowPassword(!showPassword)}
//             className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-[#008080]"
//           >
//             {showPassword ? (
//                <IoEyeOutline size={20} />
//             ) : (
            
//                <IoEyeOffOutline size={20} />
//             )}
//           </span>
//         </div>
//       </div>

//       <NFCModal />

//       <button
//         type="submit"
//         className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-lg font-semibold text-sm transition mt-6"
//       >
//         Submit
//       </button>
//     </>
//   );
// };

// export default MedicalAlertContent;



// "use client";

// import React, { useState } from "react";
// import useServicesContext from "@/components/hooks/useServiceContext";
// import { FiTrash2 } from "react-icons/fi";
// import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
// import NFCModal from "@/components/modalPopUps/nfcModal";
// import axios from "axios";
// import { useDispatch } from "react-redux";

// import toast from "react-hot-toast";
// import { useParams, useRouter } from "next/navigation";
// import useDesignContext from "@/components/hooks/useDesignContext";
// import { setmedicalServices } from "@/redux/slices/servicesSlice";

// const MedicalAlertContent = () => {
//   const {
//     dynamicForms,
//     updateDynamicForm,
//     addTemplateField,
//     removeTemplateField,
//     showPassword,
//     setShowPassword,
//   } = useServicesContext();

//   const medicalAlert = dynamicForms.medicalAlert;
//   const [showConfirmModal,setShowConfirmModal]=useState(false);
//   const dispatch = useDispatch();
//   const router = useRouter();
//   const { setActiveTab } = useDesignContext();
// const { slug } = useParams();

//   const sections = {
//     patientInfo: ["patientName", "birthDate", "bloodType"],
//     medicalHistory: [
//       "medicalConditions",
//       "allergies",
//       "medications",
//       "additionalNotes",
//     ],
//     emergencyContact: ["emergencyContact", "contactPhone"],
//     additional: [
//       "familyDoctorName",
//       "familyDoctorPhone",
//       "emergencyInstructions",
//       "insuranceProvider",
//       "policyNumber",
//       "preferredHospital",
//       "location",
//     ],
//   };

//   const fileFields = ["medicalReports", "prescription", "insuranceImage"];
//   const maxFileSize = 2 * 1024 * 1024;
//   const maxTotalSize = 30 * 1024 * 1024;

//   const [files, setFiles] = useState({
//     medicalReports: [],
//     prescription: [],
//     insuranceImage: [],
//   });

//   const [deletedFields, setDeletedFields] = useState({
//     patientInfo: [],
//     medicalHistory: [],
//     emergencyContact: [],
//     additional: [],
//   });

//   // Helper: user-friendly labels
//   const fieldLabel = (key) =>
//     key
//       .replace(/([A-Z])/g, " $1")
//       .replace(/^./, (str) => str.toUpperCase());

//   // Text input change handler
//   const handleInputChange = (section, key, value) => {
//     updateDynamicForm("medicalAlert", section, key, value);
//   };

//   // Password change handler (special case: no section)
//   const handlePasswordChange = (value) => {
//     // updateDynamicForm with section=null updates at root medicalAlert.password
//     updateDynamicForm("medicalAlert", null, "password", value);
//   };
  
//   // File input change handler (multiple files)
//   const handleFileChange = (key, selectedFiles) => {
//     setFiles((prev) => ({
//       ...prev,
//       [key]: Array.from(selectedFiles),
//     }));
//   };

//   const handleAddField = (section, key) => {
//     addTemplateField("medicalAlert", section, key, "");
//     setDeletedFields((prev) => ({
//       ...prev,
//       [section]: prev[section].filter((item) => item !== key),
//     }));
//   };

//   const handleRemoveField = (section, key) => {
//     removeTemplateField("medicalAlert", section, key);
//     setDeletedFields((prev) => ({
//       ...prev,
//       [section]: [...prev[section], key],
//     }));
//   };

// const handleInitialSubmit = () => {
//   let hasData = false;

//   // Check all text inputs
//   Object.entries(sections).forEach(([section, keys]) => {
//     keys.forEach((key) => {
//       const value = medicalAlert[section]?.[key];
//       if (value && value.trim() !== "") {
//         hasData = true;
//       }
//     });
//   });

//   // Check password
//   if (medicalAlert.password && medicalAlert.password.trim() !== "") {
//     hasData = true;
//   }

//   // Check uploaded files
//   for (const field of fileFields) {
//     if (files[field] && files[field].length > 0) {
//       hasData = true;
//     }
//   }

//   if (!hasData) {
//     toast.error("At least one field must be filled before submitting.");
//     return;
//   }

//   setShowConfirmModal(true);
// };


//   // Submit handler
//   const handleSubmit = async () => {
//     try {
//       const formData = new FormData();
//       let totalSize = 0;

//       // Append text fields
//       Object.entries(sections).forEach(([section, keys]) => {
//         keys.forEach((key) => {
//           const value = medicalAlert[section]?.[key];
//           if (value) {
            
//             formData.append(key, value);
//           }
//         });
//       });

//       // Append password
//        formData.append("password", medicalAlert.password || "");

        

//       // Append files
//       for (const field of fileFields) {
//         const fileArray = files[field];
//         for (const file of fileArray) {
//           if (file.size > maxFileSize) {
//             toast.error(`Each file must be 2MB or less. File "${file.name}" is too large.`);
//             return;
//           }
//           totalSize += file.size;
//           if (totalSize > maxTotalSize) {
//             toast.error("Total upload size exceeds 30MB limit.");
//             return;
//           }
         
//           formData.append(field, file);
//         }
//       }

//       // Post to your backend API
//       const res = await axios.post(
//         "http://localhost:3000/api/services/medicalAlert",
//         formData
//       );

//       toast.success("Form submitted successfully!");
//       setActiveTab(slug, "QR Code");
//       dispatch(setmedicalServices(res.data.data));
//       console.log(res.data);
//     } catch (error) {
//       console.error("Submit error:", error);
//       toast.error("Submit failed: " + (error.response?.data?.error || error.message));
//     }
//   };

//   return (
//     <>
//       <div className="space-y-6">
//         <h1 className="text-3xl font-bold pb-6 text-[#008080]">
//           Medical Alert QR Code
//         </h1>

//         {Object.entries(sections).map(([section, fields]) => (
//           <div key={section} className="border rounded p-4 shadow-sm space-y-4">
//             <h3 className="text-xl font-semibold capitalize text-[#008080]">
//               {section.replace(/([A-Z])/g, " $1")}
//             </h3>

//             {fields
//               .filter((key) => medicalAlert[section]?.[key] !== undefined)
//               .map((key) => (
//                 <div key={key} className="flex items-center space-x-2">
//                   <input
//                     type="text"
//                     name={key}
//                     placeholder={fieldLabel(key)}
//                     value={medicalAlert[section][key]}
//                     onChange={(e) =>
//                       handleInputChange(section, key, e.target.value)
//                     }
//                     className="border p-2 rounded flex-1"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => handleRemoveField(section, key)}
//                     className="hover:bg-red-200 p-2 rounded"
//                     aria-label="Remove Field"
//                   >
//                     <FiTrash2 className="text-red-700" />
//                   </button>
//                 </div>
//               ))}

//             {deletedFields[section].length > 0 && (
//               <div className="flex items-center space-x-2">
//                 <select
//                   onChange={(e) => {
//                     const key = e.target.value;
//                     if (key) handleAddField(section, key);
//                     e.target.selectedIndex = 0;
//                   }}
//                   className="border p-2 rounded"
//                 >
//                   <option value="">Add field</option>
//                   {deletedFields[section].map((field) => (
//                     <option key={field} value={field}>
//                       {fieldLabel(field)}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             )}
//           </div>
//         ))}

//         {/* File Uploads */}
//         {fileFields.map((key) => (
//           <div key={key} className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               {fieldLabel(key)} (multiple files allowed)
//             </label>
//             <input
//               type="file"
//               accept={key === "medicalReports" ? ".pdf" : "image/*"}
//               multiple
//               onChange={(e) => handleFileChange(key, e.target.files)}
//               className="w-full file:mr-4 file:py-3 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-600 file:text-white hover:file:bg-teal-700 file:transition-colors file:duration-200 cursor-pointer border border-gray-300 rounded-lg py-2"
//             />
//             {files[key]?.length > 0 && (
//               <ul className="text-sm mt-2 list-disc list-inside text-gray-600">
//                 {files[key].map((file, i) => (
//                   <li key={i}>{file.name}</li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         ))}

//         {/* Password input */}
//         <div className="relative w-full">
//           <input
//             type={showPassword ? "text" : "password"}
//             placeholder="Password"
//             value={medicalAlert.password || ""}
//             onChange={(e) => handlePasswordChange(e.target.value)}
//             className="border p-2 pr-10 rounded w-full"
//           />
//           <span
//             onClick={() => setShowPassword(!showPassword)}
//             className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-[#008080]"
//           >
//             {showPassword ? (
//               <IoEyeOutline size={20} />
//             ) : (
//               <IoEyeOffOutline size={20} />
//             )}
//           </span>
//         </div>
//              <NFCModal />
//         <button
//           type="button"
//           onClick={handleInitialSubmit}
//           className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-lg font-semibold text-sm transition mt-6"
//         >
//           Submit
//         </button>
//       </div>
//       {showConfirmModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/30">
//           <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full border border-teal-200 relative">
//             <h2 className="text-lg font-semibold text-gray-800">Confirm Submission</h2>
//             <p className="text-gray-600 text-sm mt-2">
//               Are you sure you want to submit this property listing? Please review details before confirming.
//             </p>
//             <div className="flex justify-end gap-4 pt-4">
//               <button
//                 onClick={() => setShowConfirmModal(false)}
//                 className="px-4 py-2 rounded-lg text-gray-600 border border-gray-300 hover:bg-gray-100"
//               >
//                 Back
//               </button>
//               <button
//                 onClick={handleSubmit}
//                 className="px-4 py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700"
//               >
//                 Confirm  && Submit
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
     
//     </>
//   );
// };

// export default MedicalAlertContent;

"use client";

import React, { useState } from "react";
import useServicesContext from "@/components/hooks/useServiceContext";
import useDesignContext from "@/components/hooks/useDesignContext";
import { FiTrash2 } from "react-icons/fi";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { useParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import NFCModal from "@/components/modalPopUps/nfcModal";
import { setMedicalServices } from "@/redux/slices/servicesSlice";
import axios from "axios";
import toast from "react-hot-toast";

const MedicalAlertContent = () => {
  const {
    dynamicForms,
    updateDynamicForm,
    addTemplateField,
    removeTemplateField,
    showPassword,
    setShowPassword,
  } = useServicesContext();

  const medicalAlert = dynamicForms.medicalAlert || {};
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { setActiveTab } = useDesignContext();
  const dispatch = useDispatch();
  const router = useRouter();
  const { slug } = useParams();

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
      "preferredHospital",
      "location",
    ],
  };

  const fileFields = ["medicalReports", "prescription", "insuranceImage"];
  const maxFileSize = 2 * 1024 * 1024;
  const maxTotalSize = 30 * 1024 * 1024;

  const [files, setFiles] = useState({
    medicalReports: [],
    prescription: [],
    insuranceImage: [],
  });

  const [deletedFields, setDeletedFields] = useState({
    patientInfo: [],
    medicalHistory: [],
    emergencyContact: [],
    additional: [],
  });

  const fieldLabel = (key) =>
    key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());

  const handleInputChange = (section, key, value) => {
    updateDynamicForm("medicalAlert", section, key, value);
  };

  const handlePasswordChange = (value) => {
    updateDynamicForm("medicalAlert", null, "password", value);
  };

  const handleFileChange = (key, selectedFiles) => {
    setFiles((prev) => ({
      ...prev,
      [key]: Array.from(selectedFiles),
    }));
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

  const handleInitialSubmit = () => {
    let hasData = false;

    Object.entries(sections).forEach(([section, keys]) => {
      keys.forEach((key) => {
        const value = medicalAlert[section]?.[key];
        if (value && value.trim() !== "") hasData = true;
      });
    });

    if (medicalAlert.password && medicalAlert.password.trim() !== "") {
      hasData = true;
    }

    for (const field of fileFields) {
      if (files[field]?.length > 0) {
        hasData = true;
      }
    }

    if (!hasData) {
      toast.error("At least one field must be filled before submitting.");
      return;
    }

    setShowConfirmModal(true);
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      let totalSize = 0;

      Object.entries(sections).forEach(([section, keys]) => {
        keys.forEach((key) => {
          const value = medicalAlert[section]?.[key];
          if (value) {
            formData.append(key, value);
          }
        });
      });

      formData.append("password", medicalAlert.password || "");

      for (const field of fileFields) {
        const fileArray = files[field];
        for (const file of fileArray) {
          if (file.size > maxFileSize) {
            toast.error(`Each file must be 2MB or less. "${file.name}" is too large.`);
            return;
          }
          totalSize += file.size;
          if (totalSize > maxTotalSize) {
            toast.error("Total upload size exceeds 30MB.");
            return;
          }
          formData.append(field, file);
        }
      }

      const res = await axios.post(
        "http://localhost:3000/api/services/medicalAlert",
        formData
      );

      toast.success("Form submitted successfully!");
      setActiveTab(slug, "QR Code");
      dispatch(setmedicalServices(res.data.data));
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("Submit failed: " + (error.response?.data?.error || error.message));
    }
  };

  return (
    <>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold pb-6 text-[#008080]">Medical Alert QR Code</h1>

        {Object.entries(sections).map(([section, fields]) => (
          <div key={section} className="border rounded p-4 shadow-sm space-y-4">
            <h3 className="text-xl font-semibold capitalize text-[#008080]">
              {section.replace(/([A-Z])/g, " $1")}
            </h3>

            {fields
              .filter((key) => medicalAlert[section]?.[key] !== undefined)
              .map((key) => (
                <div key={key} className="flex items-center space-x-2">
                  <input
                    type="text"
                    name={key}
                    placeholder={fieldLabel(key)}
                    value={medicalAlert[section][key]}
                    onChange={(e) => handleInputChange(section, key, e.target.value)}
                    className="border p-2 rounded flex-1"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveField(section, key)}
                    className="hover:bg-red-200 p-2 rounded"
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

        {/* File Upload Fields */}
        {fileFields.map((key) => (
          <div key={key} className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {fieldLabel(key)} (multiple files allowed)
            </label>
            <input
              type="file"
              accept={key === "medicalReports" ? ".pdf" : "image/*"}
              multiple
              onChange={(e) => handleFileChange(key, e.target.files)}
              className="w-full file:mr-4 file:py-3 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-600 file:text-white hover:file:bg-teal-700 file:transition-colors file:duration-200 cursor-pointer border border-gray-300 rounded-lg py-2"
            />
            {files[key]?.length > 0 && (
              <ul className="mt-2 space-y-2">
                {files[key].map((file, i) => (
                  <li key={i} className="text-sm text-gray-600">
                    {file.type.startsWith("image/") ? (
                      <img
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        className="h-24 rounded border object-cover"
                      />
                    ) : (
                      <span>{file.name}</span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}

        {/* Password Field */}
        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={medicalAlert.password || ""}
            onChange={(e) => handlePasswordChange(e.target.value)}
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
          type="button"
          onClick={handleInitialSubmit}
          className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-lg font-semibold text-sm transition mt-6"
        >
          Submit
        </button>
      </div>

      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/30">
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full border border-teal-200 relative">
            <h2 className="text-lg font-semibold text-gray-800">Confirm Submission</h2>
            <p className="text-gray-600 text-sm mt-2">
              Are you sure you want to submit this form? Please review all the details before confirming.
            </p>
            <div className="flex justify-end gap-4 pt-4">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 rounded-lg text-gray-600 border border-gray-300 hover:bg-gray-100"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700"
              >
                Confirm & Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MedicalAlertContent;
