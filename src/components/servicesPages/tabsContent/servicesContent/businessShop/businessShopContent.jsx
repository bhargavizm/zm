// // src/components/BusinessContent.jsx
// "use client";

// import React, { useState } from "react";
// import useServicesContext from "@/components/hooks/useServiceContext"; // Adjust path
// import { Eye, EyeOff } from "lucide-react"; // Assuming lucide-react is installed
// import { IoEyeOutline, IoEyeOffOutline,IoLocation } from "react-icons/io5";
// import { MdCancel } from "react-icons/md";
// import NFCModal from "@/components/modalPopUps/nfcModal";
// import useDesignContext from "@/components/hooks/useDesignContext";


// const BusinessShopContent = () => {
//   const { dynamicForms, updateDynamicForm } = useServicesContext();
//   const { setIsLoading, setBgDesign } = useDesignContext();

//   const businessInfo = dynamicForms.businessInfo;
//   const [showPassword, setShowPassword] = useState(false);
//   const shopTimingsTemplate = dynamicForms.shopTimingsTemplate;

//   const handleChange = (formKey, sectionKey, fieldKey, value) => {
//     updateDynamicForm(formKey, sectionKey, fieldKey, value);
//   };

//   const handleFileChange = (section, field, files, isMultiple = false) => {
//     const fileValue = isMultiple ? Array.from(files) : files[0];
//     updateDynamicForm("businessInfo", section, field, fileValue);
//   };

//   const removeImage = (section, field, index = null) => {
//     if (index !== null) {
//       // For gallery images (array)
//       const updatedImages = [...businessInfo[section][field]];
      
//       updatedImages.splice(index, 1);
//       updateDynamicForm("businessInfo", section, field, updatedImages);
//     } else {
//       // For single image (logo)
//       updateDynamicForm("businessInfo", section, field, null);
//     }
//   };

//   const handleTemplateSelect = (templateName) => {
//     setIsLoading(true);
//     updateDynamicForm("shopTimingsTemplate", null, "selectedTemplate", templateName);
//     setBgDesign(null);
//     setTimeout(() => setIsLoading(false), 300);
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const fetchCurrentLocation = async () => {
//   if (navigator.geolocation) {
//     try {
//       const pos = await new Promise((resolve, reject) => {
//         navigator.geolocation.getCurrentPosition(resolve, reject);
//       });
//       const { latitude, longitude } = pos.coords;

//       const response = await fetch(
//         `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
//       );
//       const data = await response.json();
//       const fullAddress = data.display_name || "Address not found";

//       // Use handleChange instead of handleInputChange
//       handleChange(
//         "businessInfo",
//         "contact",
//         "address",
//         fullAddress
//       );
//     } catch (err) {
//       console.error("Error fetching current location:", err.message);
//       alert(
//         "Failed to fetch current location. Please enter it manually or check permissions."
//       );
//     }
//   } else {
//     console.warn("Geolocation is not supported by this browser.");
//     alert(
//       "Geolocation is not supported by your browser. Please enter address manually."
//     );
//   }
// };

//   return (
//     <>
//       <div className="space-y-8 p-4 md:p-8 lg:p-12 bg-gray-50 rounded-xl shadow-lg overflow-auto hide-scrollbar">
//         {/* New Template Selection and Editing Section */}
//         <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg">
//           <h3 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-3 border-gray-200">
//             Shop Timings Template
//           </h3>

//           <div className="space-y-5">
//             <label className="block text-base font-medium text-gray-700 mb-2">
//               Choose a Template:
//             </label>

//             {/* Template Image/Video Selection Grid */}
//             <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
//               {/* Template 1 Image */}
//               <div
//                 className={`relative cursor-pointer rounded-lg overflow-hidden border-2 ${
//                   shopTimingsTemplate.selectedTemplate === "template1"
//                     ? "border-teal-500 ring-2 ring-teal-300"
//                     : "border-gray-300 hover:border-gray-400"
//                 } transition-all duration-200 shadow-sm hover:shadow-md`}
//                 onClick={() => handleTemplateSelect("template1")}
//               >
//                 <img
//                   src="/images/templates/businessShop1.webp"
//                   alt="Template 1: Opening Hours"
//                   className="w-full h-auto object-cover"
//                 />
//               </div>

//               {/* Template 2 Image */}
//               <div
//                 className={`relative cursor-pointer rounded-lg overflow-hidden border-2 ${
//                   shopTimingsTemplate.selectedTemplate === "template2"
//                     ? "border-teal-500 ring-2 ring-teal-300"
//                     : "border-gray-300 hover:border-gray-400"
//                 } transition-all duration-200 shadow-sm hover:shadow-md`}
//                 onClick={() => handleTemplateSelect("template2")}
//               >
//                 <img
//                   src="/images/templates/businessShop2.webp"
//                   alt="Template 2: We're Open"
//                   className="w-full h-auto object-cover"
//                 />
//               </div>

//               {/* Template 3 Video */}
//               <div
//                 className={`relative cursor-pointer rounded-lg overflow-hidden border-2 ${
//                   shopTimingsTemplate.selectedTemplate === "template3"
//                     ? "border-teal-500 ring-2 ring-teal-300"
//                     : "border-gray-300 hover:border-gray-400"
//                 } transition-all duration-200 shadow-sm hover:shadow-md`}
//                 onClick={() => handleTemplateSelect("template3")}
//               >
//                 <img
//                   src="/images/normal/businessShop3.webp"
//                   alt="Template 2: We're Open"
//                   className="w-full h-auto object-cover"
//                 />
//               </div>

//               {/* Clear Selection / No Template Option */}
//               <div
//                 className={`relative cursor-pointer rounded-lg overflow-hidden border-2 ${
//                   shopTimingsTemplate.selectedTemplate === "template3"
//                     ? "border-teal-500 ring-2 ring-teal-300"
//                     : "border-gray-300 hover:border-gray-400"
//                 } transition-all duration-200 shadow-sm hover:shadow-md`}
//                 onClick={() => handleTemplateSelect("template4")}
//               >
//                 <img
//                   src="/images/templates/businessShop4.webp"
//                   alt="Template 2: We're Open"
//                   className="w-full h-auto object-cover"
//                 />
//               </div>
//             </div>

//             {/* Conditional rendering for Template 1 editing */}
//             {shopTimingsTemplate.selectedTemplate === "template1" && (
//               <div className="mt-6 p-4 border border-gray-200 rounded-lg bg-gray-50 space-y-4">
//                 <h4 className="text-xl font-medium text-gray-700">
//                   Template 1 Content (Opening Hours)
//                 </h4>
//                 <input
//                   type="text"
//                   placeholder="Title (e.g., Opening Hours)"
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-teal-200"
//                   value={shopTimingsTemplate.template1Data.title || ""}
//                   onChange={(e) =>
//                     handleChange(
//                       "shopTimingsTemplate",
//                       "template1Data",
//                       "title",
//                       e.target.value
//                     )
//                   }
//                 />
//                 {(shopTimingsTemplate.template1Data.days || []).map(
//                   (dayData, index) => (
//                     <div key={index} className="flex space-x-2">
//                       <input
//                         type="text"
//                         placeholder="Day (e.g., MONDAY)"
//                         className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-teal-200"
//                         value={dayData.day || ""}
//                         onChange={(e) => {
//                           const newDays = [
//                             ...(shopTimingsTemplate.template1Data.days || []),
//                           ];
//                           newDays[index] = {
//                             ...newDays[index],
//                             day: e.target.value,
//                           };
//                           handleChange(
//                             "shopTimingsTemplate",
//                             "template1Data",
//                             "days",
//                             newDays
//                           );
//                         }}
//                       />
//                       <input
//                         type="text"
//                         placeholder="Time (e.g., 10AM - 10PM)"
//                         className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-teal-200"
//                         value={dayData.time || ""}
//                         onChange={(e) => {
//                           const newDays = [
//                             ...(shopTimingsTemplate.template1Data.days || []),
//                           ];
//                           newDays[index] = {
//                             ...newDays[index],
//                             time: e.target.value,
//                           };
//                           handleChange(
//                             "shopTimingsTemplate",
//                             "template1Data",
//                             "days",
//                             newDays
//                           );
//                         }}
//                       />
//                     </div>
//                   )
//                 )}
//                 <input
//                   type="text"
//                   placeholder="About Us Link Text"
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-teal-200"
//                   value={shopTimingsTemplate.template1Data.aboutUsLink || ""}
//                   onChange={(e) =>
//                     handleChange(
//                       "shopTimingsTemplate",
//                       "template1Data",
//                       "aboutUsLink",
//                       e.target.value
//                     )
//                   }
//                 />
//                 <input
//                   type="text"
//                   placeholder="Site Link Text"
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-teal-200"
//                   value={shopTimingsTemplate.template1Data.siteLink || ""}
//                   onChange={(e) =>
//                     handleChange(
//                       "shopTimingsTemplate",
//                       "template1Data",
//                       "siteLink",
//                       e.target.value
//                     )
//                   }
//                 />
//               </div>
//             )}

//             {/* Conditional rendering for Template 2 editing */}
//             {shopTimingsTemplate.selectedTemplate === "template2" && (
//               <div className="mt-6 p-4 border border-gray-200 rounded-lg bg-gray-50 space-y-4">
//                 <h4 className="text-xl font-medium text-gray-700">
//                   Template 2 Content (We're Open)
//                 </h4>
//                 <input
//                   type="text"
//                   placeholder="Logo Text (e.g., GIGGLING PLATYPUS)"
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-teal-200"
//                   value={shopTimingsTemplate.template2Data.logoText || ""}
//                   onChange={(e) =>
//                     handleChange(
//                       "shopTimingsTemplate",
//                       "template2Data",
//                       "logoText",
//                       e.target.value
//                     )
//                   }
//                 />
//                 <input
//                   type="text"
//                   placeholder="Main Heading (e.g., WE'RE OPEN)"
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-teal-200"
//                   value={shopTimingsTemplate.template2Data.mainHeading || ""}
//                   onChange={(e) =>
//                     handleChange(
//                       "shopTimingsTemplate",
//                       "template2Data",
//                       "mainHeading",
//                       e.target.value
//                     )
//                   }
//                 />
//                 <input
//                   type="text"
//                   placeholder="Sub Heading (e.g., TUESDAY TO SUNDAY)"
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-teal-200"
//                   value={shopTimingsTemplate.template2Data.subHeading || ""}
//                   onChange={(e) =>
//                     handleChange(
//                       "shopTimingsTemplate",
//                       "template2Data",
//                       "subHeading",
//                       e.target.value
//                     )
//                   }
//                 />
//                 <input
//                   type="text"
//                   placeholder="Time Range (e.g., 12 AM - 10 PM)"
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-teal-200"
//                   value={shopTimingsTemplate.template2Data.timeRange || ""}
//                   onChange={(e) =>
//                     handleChange(
//                       "shopTimingsTemplate",
//                       "template2Data",
//                       "timeRange",
//                       e.target.value
//                     )
//                   }
//                 />
//                 <input
//                   type="text"
//                   placeholder="Closed Day (e.g., CLOSED MONDAY)"
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-teal-200"
//                   value={shopTimingsTemplate.template2Data.closedDay || ""}
//                   onChange={(e) =>
//                     handleChange(
//                       "shopTimingsTemplate",
//                       "template2Data",
//                       "closedDay",
//                       e.target.value
//                     )
//                   }
//                 />
//                 <input
//                   type="text"
//                   placeholder="Address Line 1"
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-teal-200"
//                   value={shopTimingsTemplate.template2Data.addressLine1 || ""}
//                   onChange={(e) =>
//                     handleChange(
//                       "shopTimingsTemplate",
//                       "template2Data",
//                       "addressLine1",
//                       e.target.value
//                     )
//                   }
//                 />
//                 <input
//                   type="text"
//                   placeholder="Address Line 2"
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-teal-200"
//                   value={shopTimingsTemplate.template2Data.addressLine2 || ""}
//                   onChange={(e) =>
//                     handleChange(
//                       "shopTimingsTemplate",
//                       "template2Data",
//                       "addressLine2",
//                       e.target.value
//                     )
//                   }
//                 />
//                 <input
//                   type="text"
//                   placeholder="Website (e.g., www.reallygreatsite.com)"
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-teal-200"
//                   value={shopTimingsTemplate.template2Data.website || ""}
//                   onChange={(e) =>
//                     handleChange(
//                       "shopTimingsTemplate",
//                       "template2Data",
//                       "website",
//                       e.target.value
//                     )
//                   }
//                 />
//               </div>
//             )}

//             {/* Conditional rendering for Template 4 editing */}
//             {shopTimingsTemplate.selectedTemplate === "template4" && (
//               <div className="mt-6 p-4 border border-gray-200 rounded-lg bg-gray-50 space-y-4">
//                 <h4 className="text-xl font-medium text-gray-700">
//                   Template 4 Content (We're Open)
//                 </h4>
//                 <input
//                   type="text"
//                   placeholder="Logo Text (e.g., GIGGLING PLATYPUS)"
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-teal-200"
//                   value={shopTimingsTemplate.template2Data.logoText || ""}
//                   onChange={(e) =>
//                     handleChange(
//                       "shopTimingsTemplate",
//                       "template2Data",
//                       "logoText",
//                       e.target.value
//                     )
//                   }
//                 />
//                 <input
//                   type="text"
//                   placeholder="Main Heading (e.g., WE'RE OPEN)"
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-teal-200"
//                   value={shopTimingsTemplate.template2Data.mainHeading || ""}
//                   onChange={(e) =>
//                     handleChange(
//                       "shopTimingsTemplate",
//                       "template2Data",
//                       "mainHeading",
//                       e.target.value
//                     )
//                   }
//                 />
//                 <input
//                   type="text"
//                   placeholder="Sub Heading (e.g., TUESDAY TO SUNDAY)"
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-teal-200"
//                   value={shopTimingsTemplate.template2Data.subHeading || ""}
//                   onChange={(e) =>
//                     handleChange(
//                       "shopTimingsTemplate",
//                       "template2Data",
//                       "subHeading",
//                       e.target.value
//                     )
//                   }
//                 />
//                 <input
//                   type="text"
//                   placeholder="Time Range (e.g., 12 AM - 10 PM)"
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-teal-200"
//                   value={shopTimingsTemplate.template2Data.timeRange || ""}
//                   onChange={(e) =>
//                     handleChange(
//                       "shopTimingsTemplate",
//                       "template2Data",
//                       "timeRange",
//                       e.target.value
//                     )
//                   }
//                 />
//                 <input
//                   type="text"
//                   placeholder="Closed Day (e.g., CLOSED MONDAY)"
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-teal-200"
//                   value={shopTimingsTemplate.template2Data.closedDay || ""}
//                   onChange={(e) =>
//                     handleChange(
//                       "shopTimingsTemplate",
//                       "template2Data",
//                       "closedDay",
//                       e.target.value
//                     )
//                   }
//                 />
//                 <input
//                   type="text"
//                   placeholder="Address Line 1"
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-teal-200"
//                   value={shopTimingsTemplate.template2Data.addressLine1 || ""}
//                   onChange={(e) =>
//                     handleChange(
//                       "shopTimingsTemplate",
//                       "template2Data",
//                       "addressLine1",
//                       e.target.value
//                     )
//                   }
//                 />
//                 <input
//                   type="text"
//                   placeholder="Address Line 2"
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-teal-200"
//                   value={shopTimingsTemplate.template2Data.addressLine2 || ""}
//                   onChange={(e) =>
//                     handleChange(
//                       "shopTimingsTemplate",
//                       "template2Data",
//                       "addressLine2",
//                       e.target.value
//                     )
//                   }
//                 />
//                 <input
//                   type="text"
//                   placeholder="Website (e.g., www.reallygreatsite.com)"
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-teal-200"
//                   value={shopTimingsTemplate.template2Data.website || ""}
//                   onChange={(e) =>
//                     handleChange(
//                       "shopTimingsTemplate",
//                       "template2Data",
//                       "website",
//                       e.target.value
//                     )
//                   }
//                 />
//               </div>
//             )}
//           </div>
//         </div>

//         {/* General Section */}
//         <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg">
//           <h3 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-3 border-gray-200">
//             General Information
//           </h3>
//           <div className="space-y-5">
//             <input
//               type="text"
//               placeholder="Business Name"
//               className="w-full px-5 py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-teal-500 transition-all duration-200"
//               value={businessInfo.general.businessName || ""}
//               onChange={(e) =>
//                 handleChange(
//                   "businessInfo",
//                   "general",
//                   "businessName",
//                   e.target.value
//                 )
//               }
//             />

//             <input
//               type="text"
//               placeholder="Business Type"
//               className="w-full px-5 py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-teal-500 transition-all duration-200"
//               value={businessInfo.general.businessType || ""}
//               onChange={(e) =>
//                 handleChange(
//                   "businessInfo",
//                   "general",
//                   "businessType",
//                   e.target.value
//                 )
//               }
//             />

//             <textarea
//               placeholder="Business Description"
//               rows={4}
//               className="w-full px-5 py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-teal-500 transition-all duration-200 resize-y"
//               value={businessInfo.general.description || ""}
//               onChange={(e) =>
//                 handleChange(
//                   "businessInfo",
//                   "general",
//                   "description",
//                   e.target.value
//                 )
//               }
//             />

//             <input
//               type="text"
//               placeholder="Shop Timings (e.g., 9:00 AM - 6:00 PM)"
//               className="w-full px-5 py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-teal-500 transition-all duration-200"
//               value={businessInfo.general.shopTimings || ""}
//               onChange={(e) =>
//                 handleChange(
//                   "businessInfo",
//                   "general",
//                   "shopTimings",
//                   e.target.value
//                 )
//               }
//             />
//           </div>
//         </div>

//         {/* Contact Section */}
//         <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg">
//           <h3 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-3 border-gray-200">
//             Contact Information
//           </h3>
//           <div className="space-y-5">
//             <input
//               type="text"
//               placeholder="Phone Number"
//               className="w-full px-5 py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-teal-500 transition-all duration-200"
//               value={businessInfo.contact.phone || ""}
//               onChange={(e) =>
//                 handleChange("businessInfo", "contact", "phone", e.target.value)
//               }
//             />
//             <input
//               type="text"
//               placeholder="Alternate Phone Number"
//               className="w-full px-5 py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-teal-500 transition-all duration-200"
//               value={businessInfo.contact.altPhone || ""}
//               onChange={(e) =>
//                 handleChange("businessInfo", "contact", "altPhone", e.target.value)
//               }
//             />

//             <input
//               type="email"
//               placeholder="Email Address"
//               className="w-full px-5 py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-teal-500 transition-all duration-200"
//               value={businessInfo.contact.email || ""}
//               onChange={(e) =>
//                 handleChange("businessInfo", "contact", "email", e.target.value)
//               }
//             />

//            <div className="relative">
//               <textarea
//                 placeholder="Full Address"
//                 rows={3}
//                 className="w-full px-5 py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-teal-500 transition-all duration-200 resize-y pr-12"
//                 value={businessInfo.contact.address || ""}
//                 onChange={(e) =>
//                   handleChange(
//                     "businessInfo",
//                     "contact",
//                     "address",
//                     e.target.value
//                   )
//                 }
//               />
//               <button
//                 type="button"
//                 onClick={fetchCurrentLocation}
//                 className="absolute right-2 bottom-2 p-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 text-sm"
//                 title="Get current location"
//               >
//                 <IoLocation/>
//               </button>
//             </div>
            
//           </div>
//         </div>

//         {/* Media Section */}
//         <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg">
//           <h3 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-3 border-gray-200">
//             Media
//           </h3>
//           <div className="space-y-6">
//             {/* Business Logo */}
//             <div className="space-y-2">
//               <label className="block text-base font-medium text-gray-700">
//                 Business Logo
//               </label>
//               {businessInfo.media.logo ? (
//                 <div className="flex items-center gap-4">
//                   <div className="relative">
//                     <img
//                       src={typeof businessInfo.media.logo === 'string' 
//                         ? businessInfo.media.logo 
//                         : URL.createObjectURL(businessInfo.media.logo)}
//                       alt="Business Logo"
//                       className="h-20 w-20 object-cover rounded-lg"
//                     />
//                     <button
//                       onClick={() => removeImage("media", "logo")}
//                       className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
//                       aria-label="Remove logo"
//                     >

//                         <MdCancel/>
                      
//                     </button>
//                   </div>
//                   <span className="text-sm text-gray-500">Click to change</span>
//                 </div>
//               ) : null}
//               <input
//                 type="file"
//                 accept="image/*"
//                 className="w-full text-gray-700 file:mr-4 file:py-3 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-600 file:text-white hover:file:bg-teal-700 file:transition-colors file:duration-200 cursor-pointer border border-gray-300 rounded-lg py-2"
//                 onChange={(e) =>
//                   handleFileChange("media", "logo", e.target.files)
//                 }
//               />
//             </div>

//             {/* Gallery Images */}
//             <div className="space-y-2">
//               <label className="block text-base font-medium text-gray-700">
//                 Gallery Images
//               </label>
//               {businessInfo.media.galleryImages?.length > 0 && (
//                 <div className="grid grid-cols-3 gap-2 mb-4">
//                   {businessInfo.media.galleryImages.map((image, index) => (
//                     <div key={index} className="relative">
//                       <img
//                         src={typeof image === 'string' ? image : URL.createObjectURL(image)}
//                         alt={`Gallery ${index + 1}`}
//                         className="h-24 w-full object-cover rounded-lg"
//                       />
//                       <button
//                         onClick={() => removeImage("media", "galleryImages", index)}
//                         className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
//                         aria-label={`Remove image ${index + 1}`}
//                       >
//                         <MdCancel/>
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               )}
//               <input
//                 type="file"
//                 accept="image/*"
//                 multiple
//                 className="w-full text-gray-700 file:mr-4 file:py-3 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-600 file:text-white hover:file:bg-teal-700 file:transition-colors file:duration-200 cursor-pointer border border-gray-300 rounded-lg py-2"
//                 onChange={(e) =>
//                   handleFileChange(
//                     "media",
//                     "galleryImages",
//                     e.target.files,
//                     true
//                   )
//                 }
//               />
//             </div>
//           </div>
//         </div>

//         {/* Security Section */}
//         <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg">
//           <h3 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-3 border-gray-200">
//             Security
//           </h3>
//           <div className="relative">
//             <input
//               type={showPassword ? "text" : "password"}
//               placeholder="Password"
//               className="w-full px-5 py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-teal-500 pr-12 transition-all duration-200"
//               value={businessInfo.security.password || ""}
//               onChange={(e) =>
//                 handleChange(
//                   "businessInfo",
//                   "security",
//                   "password",
//                   e.target.value
//                 )
//               }
//             />
//             <button
//               type="button"
//               className="absolute inset-y-0 right-0 pr-4 flex items-center text-teal-600 hover:text-teal-800 transition-colors duration-200"
//               onClick={togglePasswordVisibility}
//               aria-label={showPassword ? "Hide password" : "Show password"}
//             >
//               {showPassword ? <Eye size={20} />  :  <EyeOff size={20} />}
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg">
//         <NFCModal />
//       </div>
//       <button className="w-full py-2 cursor-pointer bg-[#008080] text-white font-semibold rounded hover:bg-[#006666] transition">
//         Submit
//       </button>
//     </>
//   );
// };

// export default BusinessShopContent;


"use client";

import React, { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { IoLocation } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import { toast } from "react-hot-toast";
import axios from "axios";
import useServicesContext from "@/components/hooks/useServiceContext";
import useDesignContext from "@/components/hooks/useDesignContext";
import NFCModal from "@/components/modalPopUps/nfcModal";

//

const API_ENDPOINT = '/api/services/businessShop';

const BusinessShopContent = () => {
  // Context hooks
  const { dynamicForms, updateDynamicForm } = useServicesContext();
  const { setIsLoading, setBgDesign } = useDesignContext();

  // State initialization
  const [businessInfo, setBusinessInfo] = useState({
    general: {
      businessName: "",
      businessType: "",
      description: "",
      shopTimings: ""
    },
    contact: {
      phone: "",
      altPhone: "",
      email: "",
      address: ""
    },
    media: {
      logo: null, // Can be File object or string URL
      galleryImages: [] // Array of File objects or string URLs
    },
    security: {
      password: ""
    }
  });

  const [shopTimingsTemplate, setShopTimingsTemplate] = useState({
    selectedTemplate: null,
    template1Data: {
      title: "",
      days: [],
      aboutUsLink: "",
      siteLink: ""
    },
    template2Data: {
      logoText: "",
      mainHeading: "",
      subHeading: "",
      timeRange: "",
      closedDay: "",
      addressLine1: "",
      addressLine2: "",
      website: ""
    }
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userId, setUserId] = useState(null); // State to hold the current user's ID

  // Initialize Firebase Auth and get userId
  

  // Initialize with context data
  useEffect(() => {
    if (dynamicForms?.businessInfo) {
      setBusinessInfo(prev => ({
        ...prev,
        ...dynamicForms.businessInfo
      }));
    }
    if (dynamicForms?.shopTimingsTemplate) {
      setShopTimingsTemplate(prev => ({
        ...prev,
        ...dynamicForms.shopTimingsTemplate
      }));
    }
  }, [dynamicForms]);

  // Fetch initial data - now depends on userId
  useEffect(() => {
    const fetchData = async () => {
      if (!userId) {
        // Do not fetch until userId is available
        console.log("Waiting for userId to fetch data...");
        return;
      }

      try {
        setIsLoading(true);
        // Pass userId as a query parameter for the GET request
        const response = await axios.get(`${API_ENDPOINT}?userId=${userId}`);
        
        if (response.data?.data) {
          const { businessInfo, shopTimingsTemplate } = response.data.data;
          
          setBusinessInfo(prev => ({
            ...prev,
            ...(businessInfo || {})
          }));
          
          setShopTimingsTemplate(prev => ({
            ...prev,
            ...(shopTimingsTemplate || {})
          }));
          
          if (updateDynamicForm) {
            updateDynamicForm('businessInfo', null, null, businessInfo || {});
            updateDynamicForm('shopTimingsTemplate', null, null, shopTimingsTemplate || {});
          }
        }
      } catch (error) {
        console.error('Fetch error:', error);
        toast.error(`Failed to load data: ${error.response?.data?.error || error.message}`);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [updateDynamicForm, setIsLoading, userId]); // Added userId to dependency array

  // Handlers
  const handleChange = (formKey, sectionKey, fieldKey, value) => {
    if (formKey === 'businessInfo') {
      setBusinessInfo(prev => ({
        ...prev,
        [sectionKey]: {
          ...prev[sectionKey],
          [fieldKey]: value
        }
      }));
    } else if (formKey === 'shopTimingsTemplate') {
      setShopTimingsTemplate(prev => ({
        ...prev,
        [sectionKey]: {
          ...prev[sectionKey],
          [fieldKey]: value
        }
      }));
    }
    
    if (updateDynamicForm) {
      updateDynamicForm(formKey, sectionKey, fieldKey, value);
    }
  };

  // Modified handleFileChange to append new gallery images
  const handleFileChange = (section, field, files, isMultiple = false) => {
    if (isMultiple) {
      // For galleryImages, append new files to existing ones (which can be Files or URLs)
      setBusinessInfo(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: [...prev[section][field], ...Array.from(files)]
        }
      }));
      // Update dynamic form with the new combined array
      if (updateDynamicForm) {
        updateDynamicForm("businessInfo", section, field, [...businessInfo[section][field], ...Array.from(files)]);
      }
    } else {
      // For single files like logo, replace the current value
      const fileValue = files[0];
      setBusinessInfo(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: fileValue
        }
      }));
      if (updateDynamicForm) {
        updateDynamicForm("businessInfo", section, field, fileValue);
      }
    }
  };

  const removeImage = (section, field, index = null) => {
    setBusinessInfo(prev => {
      const newState = { ...prev };
      if (index !== null) {
        // Remove specific image from galleryImages array
        const updatedImages = [...newState[section][field]];
        updatedImages.splice(index, 1);
        newState[section][field] = updatedImages;
      } else {
        // Set logo to null
        newState[section][field] = null;
      }
      return newState;
    });
    
    if (updateDynamicForm) {
      if (index !== null) {
        const updatedImages = [...businessInfo[section][field]];
        updatedImages.splice(index, 1);
        updateDynamicForm("businessInfo", section, field, updatedImages);
      } else {
        updateDynamicForm("businessInfo", section, field, null);
      }
    }
  };

  const handleTemplateSelect = (templateName) => {
    setIsLoading(true);
    setShopTimingsTemplate(prev => ({
      ...prev,
      selectedTemplate: templateName
    }));
    
    if (updateDynamicForm) {
      updateDynamicForm("shopTimingsTemplate", null, "selectedTemplate", templateName);
    }
    
    setBgDesign(null); // Assuming setBgDesign is a function to clear background design
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

        const response = await axios.get(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
        );
        const fullAddress = response.data.display_name || "Address not found";
        handleChange("businessInfo", "contact", "address", fullAddress);
      } catch (err) {
        console.error("Error fetching current location:", err);
        toast.error("Failed to fetch current location. Please ensure location services are enabled and try again.");
      }
    } else {
      toast.warning("Geolocation is not supported by your browser. Please enter address manually.");
    }
  };

  const handleSubmit = async () => {
    if (!userId) {
      toast.error("User ID not available. Please ensure you are logged in.");
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      
      // Separate new File objects from existing string URLs for gallery images
      const newGalleryFiles = businessInfo.media.galleryImages.filter(item => item instanceof File);
      const existingGalleryUrls = businessInfo.media.galleryImages.filter(item => typeof item === 'string');

      // Append main JSON data including userId and only existing gallery URLs
      formData.append('jsonData', JSON.stringify({
        userId, // Crucial: Include userId in the JSON data for POST request
        businessInfo: {
          ...businessInfo,
          media: {
            ...businessInfo.media,
            galleryImages: existingGalleryUrls // Only send existing URLs in the JSON part
          }
        },
        shopTimingsTemplate
      }));
      
      // Append logo file if it's a new File object. 
      // If it's an existing URL or null, send it as a string.
      if (businessInfo.media?.logo instanceof File) {
        formData.append('logo', businessInfo.media.logo);
      } else if (typeof businessInfo.media?.logo === 'string') {
        formData.append('logo', businessInfo.media.logo); // Send the existing URL string
      } else {
        formData.append('logo', 'null'); // Indicate logo was removed or never set
      }
      
      // Append new gallery files with a distinct key
      newGalleryFiles.forEach((file, index) => {
        formData.append(`newGalleryImages`, file); 
      });
      
      const response = await axios.post(API_ENDPOINT, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      toast.success(response.data?.message || 'Business info saved successfully!');
      
      // Update local state with the new URLs returned from the server
      if (response.data?.data?.businessInfo) {
        setBusinessInfo(prev => ({
          ...prev,
          media: {
            ...prev.media,
            logo: response.data.data.businessInfo.media?.logo || null,
            galleryImages: response.data.data.businessInfo.media?.galleryImages || []
          }
        }));
        // Also update the context if necessary
        if (updateDynamicForm) {
          updateDynamicForm('businessInfo', 'media', 'logo', response.data.data.businessInfo.media?.logo || null);
          updateDynamicForm('businessInfo', 'media', 'galleryImages', response.data.data.businessInfo.media?.galleryImages || []);
        }
      }
      
    } catch (error) {
      console.error('Submission error:', error);
      toast.error(error.response?.data?.error || error.message || 'Failed to save business info');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 p-4 md:p-8 lg:p-12 bg-gray-50 rounded-xl shadow-lg overflow-auto hide-scrollbar font-inter">
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
            {[1, 2, 3, 4].map((templateNum) => (
              <div
                key={`template${templateNum}`}
                className={`relative cursor-pointer rounded-lg overflow-hidden border-2 ${
                  shopTimingsTemplate.selectedTemplate === `template${templateNum}`
                    ? "border-teal-500 ring-2 ring-teal-300"
                    : "border-gray-300 hover:border-gray-400"
                } transition-all duration-200 shadow-sm hover:shadow-md`}
                onClick={() => handleTemplateSelect(`template${templateNum}`)}
              >
                <img
                  src={`https://placehold.co/200x150/E0F2F7/008080?text=Template+${templateNum}`}
                  alt={`Template ${templateNum}`}
                  className="w-full h-auto object-cover"
                  onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/200x150/E0F2F7/008080?text=Image+Error"; }}
                />
              </div>
            ))}
          </div>

          {/* Template 1 Editor */}
          {shopTimingsTemplate.selectedTemplate === "template1" && (
            <div className="mt-6 p-4 border border-gray-200 rounded-lg bg-gray-50 space-y-4">
              <h4 className="text-xl font-medium text-gray-700">Template 1 Content</h4>
              <input
                type="text"
                placeholder="Title"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-200"
                value={shopTimingsTemplate.template1Data?.title || ""}
                onChange={(e) => handleChange("shopTimingsTemplate", "template1Data", "title", e.target.value)}
              />
              {/* Days and Times */}
              {(shopTimingsTemplate.template1Data?.days || []).map((day, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <input
                    type="text"
                    placeholder="Day"
                    className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg"
                    value={day.day || ""}
                    onChange={(e) => {
                      const newDays = [...shopTimingsTemplate.template1Data.days];
                      newDays[index] = { ...newDays[index], day: e.target.value };
                      handleChange("shopTimingsTemplate", "template1Data", "days", newDays);
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Time"
                    className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg"
                    value={day.time || ""}
                    onChange={(e) => {
                      const newDays = [...shopTimingsTemplate.template1Data.days];
                      newDays[index] = { ...newDays[index], time: e.target.value };
                      handleChange("shopTimingsTemplate", "template1Data", "days", newDays);
                    }}
                  />
                  <button
                    onClick={() => {
                      const newDays = [...shopTimingsTemplate.template1Data.days];
                      newDays.splice(index, 1);
                      handleChange("shopTimingsTemplate", "template1Data", "days", newDays);
                    }}
                    className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                    title="Remove Day"
                  >
                    <MdCancel size={18} />
                  </button>
                </div>
              ))}
              <button
                onClick={() => {
                  const newDays = [...(shopTimingsTemplate.template1Data?.days || []), { day: "", time: "" }];
                  handleChange("shopTimingsTemplate", "template1Data", "days", newDays);
                }}
                className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
              >
                Add Day
              </button>
              <input
                type="text"
                placeholder="About Us Link"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-200"
                value={shopTimingsTemplate.template1Data?.aboutUsLink || ""}
                onChange={(e) => handleChange("shopTimingsTemplate", "template1Data", "aboutUsLink", e.target.value)}
              />
              <input
                type="text"
                placeholder="Site Link"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-200"
                value={shopTimingsTemplate.template1Data?.siteLink || ""}
                onChange={(e) => handleChange("shopTimingsTemplate", "template1Data", "siteLink", e.target.value)}
              />
            </div>
          )}

          {/* Template 2 Editor */}
          {shopTimingsTemplate.selectedTemplate === "template2" && (
            <div className="mt-6 p-4 border border-gray-200 rounded-lg bg-gray-50 space-y-4">
              <h4 className="text-xl font-medium text-gray-700">Template 2 Content</h4>
              <input
                type="text"
                placeholder="Logo Text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                value={shopTimingsTemplate.template2Data?.logoText || ""}
                onChange={(e) => handleChange("shopTimingsTemplate", "template2Data", "logoText", e.target.value)}
              />
              <input
                type="text"
                placeholder="Main Heading"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                value={shopTimingsTemplate.template2Data?.mainHeading || ""}
                onChange={(e) => handleChange("shopTimingsTemplate", "template2Data", "mainHeading", e.target.value)}
              />
              <input
                type="text"
                placeholder="Sub Heading"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                value={shopTimingsTemplate.template2Data?.subHeading || ""}
                onChange={(e) => handleChange("shopTimingsTemplate", "template2Data", "subHeading", e.target.value)}
              />
              <input
                type="text"
                placeholder="Time Range"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                value={shopTimingsTemplate.template2Data?.timeRange || ""}
                onChange={(e) => handleChange("shopTimingsTemplate", "template2Data", "timeRange", e.target.value)}
              />
              <input
                type="text"
                placeholder="Closed Day"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                value={shopTimingsTemplate.template2Data?.closedDay || ""}
                onChange={(e) => handleChange("shopTimingsTemplate", "template2Data", "closedDay", e.target.value)}
              />
              <input
                type="text"
                placeholder="Address Line 1"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                value={shopTimingsTemplate.template2Data?.addressLine1 || ""}
                onChange={(e) => handleChange("shopTimingsTemplate", "template2Data", "addressLine1", e.target.value)}
              />
              <input
                type="text"
                placeholder="Address Line 2"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                value={shopTimingsTemplate.template2Data?.addressLine2 || ""}
                onChange={(e) => handleChange("shopTimingsTemplate", "template2Data", "addressLine2", e.target.value)}
              />
              <input
                type="text"
                placeholder="Website"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                value={shopTimingsTemplate.template2Data?.website || ""}
                onChange={(e) => handleChange("shopTimingsTemplate", "template2Data", "website", e.target.value)}
              />
            </div>
          )}
        </div>
      </div>

      {/* General Information Section */}
      <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-3 border-gray-200">
          General Information
        </h3>
        <div className="space-y-5">
          <input
            type="text"
            placeholder="Business Name"
            className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-teal-200"
            value={businessInfo.general?.businessName || ""}
            onChange={(e) => handleChange("businessInfo", "general", "businessName", e.target.value)}
          />
          <input
            type="text"
            placeholder="Business Type"
            className="w-full px-5 py-3 border border-gray-300 rounded-lg"
            value={businessInfo.general?.businessType || ""}
            onChange={(e) => handleChange("businessInfo", "general", "businessType", e.target.value)}
          />
          <textarea
            placeholder="Business Description"
            rows={4}
            className="w-full px-5 py-3 border border-gray-300 rounded-lg"
            value={businessInfo.general?.description || ""}
            onChange={(e) => handleChange("businessInfo", "general", "description", e.target.value)}
          />
          <input
            type="text"
            placeholder="Shop Timings"
            className="w-full px-5 py-3 border border-gray-300 rounded-lg"
            value={businessInfo.general?.shopTimings || ""}
            onChange={(e) => handleChange("businessInfo", "general", "shopTimings", e.target.value)}
          />
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
            placeholder="Phone Number"
            className="w-full px-5 py-3 border border-gray-300 rounded-lg"
            value={businessInfo.contact?.phone || ""}
            onChange={(e) => handleChange("businessInfo", "contact", "phone", e.target.value)}
          />
          <input
            type="text"
            placeholder="Alternate Phone"
            className="w-full px-5 py-3 border border-gray-300 rounded-lg"
            value={businessInfo.contact?.altPhone || ""}
            onChange={(e) => handleChange("businessInfo", "contact", "altPhone", e.target.value)}
          />
          <input
            type="email"
            placeholder="Email Address"
            className="w-full px-5 py-3 border border-gray-300 rounded-lg"
            value={businessInfo.contact?.email || ""}
            onChange={(e) => handleChange("businessInfo", "contact", "email", e.target.value)}
          />
          <div className="relative">
            <textarea
              placeholder="Full Address"
              rows={3}
              className="w-full px-5 py-3 border border-gray-300 rounded-lg pr-12"
              value={businessInfo.contact?.address || ""}
              onChange={(e) => handleChange("businessInfo", "contact", "address", e.target.value)}
            />
            <button
              type="button"
              onClick={fetchCurrentLocation}
              className="absolute right-2 bottom-2 p-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors"
              title="Get current location"
            >
              <IoLocation size={20} />
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
          {/* Logo Upload */}
          <div className="space-y-2">
            <label className="block text-base font-medium text-gray-700">
              Business Logo
            </label>
            {businessInfo.media?.logo && (
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={typeof businessInfo.media.logo === 'string' 
                      ? businessInfo.media.logo 
                      : URL.createObjectURL(businessInfo.media.logo)}
                    alt="Business Logo"
                    className="h-20 w-20 object-cover rounded-lg"
                    onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/80x80/E0F2F7/008080?text=Logo+Error"; }}
                  />
                  <button
                    onClick={() => removeImage("media", "logo")}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                    title="Remove Logo"
                  >
                    <MdCancel size={18} />
                  </button>
                </div>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              className="w-full file:mr-4 file:py-3 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-600 file:text-white hover:file:bg-teal-700 transition-colors"
              onChange={(e) => handleFileChange("media", "logo", e.target.files)}
            />
          </div>

          {/* Gallery Images */}
          <div className="space-y-2">
            <label className="block text-base font-medium text-gray-700">
              Gallery Images
            </label>
            {businessInfo.media?.galleryImages?.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mb-4">
                {businessInfo.media.galleryImages.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={typeof image === 'string' ? image : URL.createObjectURL(image)}
                      alt={`Gallery ${index + 1}`}
                      className="h-24 w-full object-cover rounded-lg"
                      onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/96x96/E0F2F7/008080?text=Image+Error"; }}
                    />
                    <button
                      onClick={() => removeImage("media", "galleryImages", index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                      title="Remove Image"
                    >
                      <MdCancel size={18} />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              multiple
              className="w-full file:mr-4 file:py-3 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-600 file:text-white hover:file:bg-teal-700 transition-colors"
              onChange={(e) => handleFileChange("media", "galleryImages", e.target.files, true)}
            />
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
            className="w-full px-5 py-3 border border-gray-300 rounded-lg pr-12 focus:ring-4 focus:ring-teal-200"
            value={businessInfo.security?.password || ""}
            onChange={(e) => handleChange("businessInfo", "security", "password", e.target.value)}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-teal-600 hover:text-teal-800 transition-colors"
            onClick={togglePasswordVisibility}
            title={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
        </div>
      </div>

      {/* NFC Modal Section */}
      <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg">
        <NFCModal />
      </div>
      
      {/* Submit Button */}
      <button 
        onClick={handleSubmit}
        disabled={isSubmitting}
        className={`w-full py-3 bg-[#008080] text-white font-semibold rounded-lg hover:bg-[#006666] transition ${
          isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
        } shadow-md hover:shadow-lg`}
      >
        {isSubmitting ? 'Saving...' : 'Submit'}
      </button>
    </div>
  );
};

export default BusinessShopContent;
