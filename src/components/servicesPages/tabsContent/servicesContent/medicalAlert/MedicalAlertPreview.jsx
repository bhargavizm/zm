// "use client";

// import React, { useEffect } from "react";
// import { FiLock } from "react-icons/fi";
// import useServicesContext from "@/components/hooks/useServiceContext";
// import useDesignContext from "@/components/hooks/useDesignContext";
// import Image from "next/image";

// const formatLabel = (key) =>
//   key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());

// const MedicalAlertPreview = () => {
//   const { dynamicForms } = useServicesContext();
//   const { bgDesign, setBgDesign, isLoading, setIsLoading } = useDesignContext();

//   const defaultBg = "/services-service/medical-alert.webp";

//   useEffect(() => {
//     setIsLoading(true);
//     setBgDesign(defaultBg);
//   }, []);

//   const medicalAlert = dynamicForms.medicalAlert;

//   const hasData = Object.entries(medicalAlert).some(
//     ([section, fields]) =>
//       section !== "password" &&
//       typeof fields === "object" &&
//       Object.values(fields).some((value) => value?.toString().trim() !== "")
//   );

//  const isVideo = bgDesign?.endsWith(".mp4") || bgDesign?.endsWith(".webm");
//   const isImage = bgDesign && !isVideo;

//   const isBase64 = (str) => typeof str === "string" && str.startsWith("data:");

//   const isImageBase64 = (str) => isBase64(str) && str.startsWith("data:image");

//   const isPdfBase64 = (str) =>
//     isBase64(str) && str.startsWith("data:application/pdf");

//   return (
//     <div className="flex justify-center">
//       <div className="relative w-[350px] h-[650px] rounded-[40px] border-[14px] border-gray-800 shadow-xl overflow-hidden flex flex-col">
//         {/* Background */}
//         {isImage && (
//           <img
//             src={bgDesign}
//             alt="Background"
//             onLoad={() => setTimeout(() => setIsLoading(false), 300)}
//             className="absolute inset-0 w-full h-full object-cover z-0"
//           />
//         )}
//         {isVideo && (
//           <video
//             src={bgDesign}
//             autoPlay
//             loop
//             muted
//             playsInline
//             onLoadedData={() => setTimeout(() => setIsLoading(false), 300)}
//             className="absolute inset-0 w-full h-full object-cover z-0"
//           />
//         )}
//         {!bgDesign && (
//           <img
//             src={defaultBg}
//             alt="Background"
//             onLoad={() => setTimeout(() => setIsLoading(false), 300)}
//             className="absolute inset-0 w-full h-full object-cover z-0"
//           />
//         )}

//         {/* ⏳ Loader */}
//         {isLoading && (
//           <div className="absolute inset-0 z-50 bg-mainGreen backdrop-blur-sm flex justify-center items-center">
//             <Image
//               src="/logos/ZM LOGO.webp"
//               alt="Loading"
//               width={100}
//               height={100}
//               className="w-20 h-20 animate-bounce"
//             />
//           </div>
//         )}

//         {/* Top Bar */}
//         <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-6 bg-gray-800 rounded-b-xl z-10" />

//         {/* Content */}
//         <div className="relative z-10 flex-1 overflow-y-auto bg-white/70 m-2 rounded-xl pt-8 pb-4 px-4">
//           {hasData ? (
//             <div className="space-y-4">
//               <h2 className="text-xl font-bold text-center text-[#008080]">
//                 Medical Alert
//               </h2>

//               {Object.entries(medicalAlert).map(([section, fields]) => {
//                 if (section === "password") return null;

//                 return (
//                   typeof fields === "object" && (
//                     <div
//                       key={section}
//                       className="bg-[#008080]/10 p-3 rounded border border-[#008080]/20 space-y-2"
//                     >
//                       {Object.entries(fields).map(([key, value]) => {
//                         if (!value) return null;

//                         return (
//                           <div key={key} className="text-sm">
//                             <span className="font-medium text-[#008080]">
//                               {formatLabel(key)}:
//                             </span>{" "}
//                             {/* Show uploaded file */}
//                             {isImageBase64(value) ? (
//                               <div className="mt-2">
//                                 <img
//                                   src={value}
//                                   alt={key}
//                                   className="w-full rounded shadow"
//                                 />
//                               </div>
//                             ) : isPdfBase64(value) ? (
//                               <a
//                                 href={value}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="text-blue-600 underline ml-1"
//                               >
//                                 View PDF
//                               </a>
//                             ) : (
//                               <span className="text-gray-700 ml-1">
//                                 {value}
//                               </span>
//                             )}
//                           </div>
//                         );
//                       })}
//                     </div>
//                   )
//                 );
//               })}
//             </div>
//           ) : (
//             <div className="h-full flex flex-col items-center justify-center text-center text-gray-400">
//               <FiLock className="text-4xl mb-4 text-[#008080]" />
//               <h3 className="text-lg font-medium">Medical Alert Preview</h3>
//               <p className="mt-2">Fill the form to see the preview</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MedicalAlertPreview;

// "use client";

// import React, { useEffect } from "react";
// import { FiLock } from "react-icons/fi";
// import useServicesContext from "@/components/hooks/useServiceContext";
// import useDesignContext from "@/components/hooks/useDesignContext";
// import Image from "next/image";

// const formatLabel = (key) =>
//   key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());

// const MedicalAlertPreview = () => {
//   const { dynamicForms } = useServicesContext();
//   const { bgDesign, setBgDesign, isLoading, setIsLoading } = useDesignContext();

//   const defaultBg = "/services-service/medical-alert.webp";

//   useEffect(() => {
//     setIsLoading(true);
//     setBgDesign(defaultBg);
//   }, []);

//   const medicalAlert = dynamicForms.medicalAlert || {};

//   const sections = {
//     patientInfo: ["patientName", "age", "bloodType"],
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

//   const isVideo = bgDesign?.endsWith(".mp4") || bgDesign?.endsWith(".webm");
//   const isImage = bgDesign && !isVideo;

//   const isBase64 = (str) => typeof str === "string" && str.startsWith("data:");
//   const isImageBase64 = (str) => isBase64(str) && str.startsWith("data:image");
//   const isPdfBase64 = (str) => isBase64(str) && str.startsWith("data:application/pdf");

//   const hasData = () => {
//     for (const [section, keys] of Object.entries(sections)) {
//       if (keys.some((key) => medicalAlert[section]?.[key]?.toString().trim())) return true;
//     }
//     if (medicalAlert.password?.trim()) return true;
//     for (const field of fileFields) {
//       if (medicalAlert.additional?.[field]?.length) return true;
//     }
//     return false;
//   };

//   return (
//     <div className="flex justify-center">
//       <div className="relative w-[350px] h-[650px] rounded-[40px] border-[14px] border-gray-800 shadow-xl overflow-hidden flex flex-col">
//         {/* Background */}
//         {isImage && (
//           <img
//             src={bgDesign}
//             alt="Background"
//             onLoad={() => setTimeout(() => setIsLoading(false), 300)}
//             className="absolute inset-0 w-full h-full object-cover z-0"
//           />
//         )}
//         {isVideo && (
//           <video
//             src={bgDesign}
//             autoPlay
//             loop
//             muted
//             playsInline
//             onLoadedData={() => setTimeout(() => setIsLoading(false), 300)}
//             className="absolute inset-0 w-full h-full object-cover z-0"
//           />
//         )}
//         {!bgDesign && (
//           <img
//             src={defaultBg}
//             alt="Background"
//             onLoad={() => setTimeout(() => setIsLoading(false), 300)}
//             className="absolute inset-0 w-full h-full object-cover z-0"
//           />
//         )}

//         {/* Loader */}
//         {isLoading && (
//           <div className="absolute inset-0 z-50 bg-mainGreen backdrop-blur-sm flex justify-center items-center">
//             <Image
//               src="/logos/ZM LOGO.webp"
//               alt="Loading"
//               width={100}
//               height={100}
//               className="w-20 h-20 animate-bounce"
//             />
//           </div>
//         )}

//         {/* Top Bar */}
//         <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-6 bg-gray-800 rounded-b-xl z-10" />

//         {/* Content */}
//         <div className="relative z-10 flex-1 overflow-y-auto bg-white/70 m-2 rounded-xl pt-8 pb-4 px-4">
//           {hasData() ? (
//             <div className="space-y-4">
//               <h2 className="text-xl font-bold text-center text-[#008080]">Medical Alert</h2>

//               {/* Standard Fields */}
//               {Object.entries(sections).map(([section, keys]) => (
//                 <div
//                   key={section}
//                   className="bg-[#008080]/10 p-3 rounded border border-[#008080]/20 space-y-2"
//                 >
//                   {keys.map((key) => {
//                     const value = medicalAlert?.[section]?.[key];
//                     if (!value) return null;

//                     return (
//                       <div key={key} className="text-sm">
//                         <span className="font-medium text-[#008080]">
//                           {formatLabel(key)}:
//                         </span>{" "}
//                         <span className="text-gray-700 ml-1">{value}</span>
//                       </div>
//                     );
//                   })}
//                 </div>
//               ))}

//               {/* File Previews */}
//               {fileFields.map((field) => {
//                 const files = medicalAlert.additional?.[field];
//                 if (!files || !Array.isArray(files) || files.length === 0) return null;

//                 return (
//                   <div
//                     key={field}
//                     className="bg-[#008080]/10 p-3 rounded border border-[#008080]/20 space-y-2"
//                   >
//                     <div className="text-sm font-medium text-[#008080]">
//                       {formatLabel(field)}:
//                     </div>
//                     <div className="space-y-2">
//                       {files.map((file, index) => {
//                         if (!file || !file._id || !file.fileType || !file.fileName) return null;
//                         const fileUrl = `/api/services/medicalAlert/file/${file._id}`;
//                         const isImage = file.fileType.startsWith("image/");
//                         const isPDF = file.fileType === "application/pdf";

//                         return (
//                           <div key={index}>
//                             {isImage ? (
//                               <img
//                                 src={fileUrl}
//                                 alt={file.fileName}
//                                 className="w-full rounded shadow"
//                               />
//                             ) : isPDF ? (
//                               <a
//                                 href={fileUrl}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="text-blue-600 underline"
//                               >
//                                 {file.fileName}
//                               </a>
//                             ) : (
//                               <a
//                                 href={fileUrl}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="text-blue-600 underline"
//                               >
//                                 {file.fileName}
//                               </a>
//                             )}
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           ) : (
//             <div className="h-full flex flex-col items-center justify-center text-center text-gray-400">
//               <FiLock className="text-4xl mb-4 text-[#008080]" />
//               <h3 className="text-lg font-medium">Medical Alert Preview</h3>
//               <p className="mt-2">Fill the form to see the preview</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MedicalAlertPreview;


"use client";

import React, { useEffect } from "react";
import { FiLock } from "react-icons/fi";
import useServicesContext from "@/components/hooks/useServiceContext";
import useDesignContext from "@/components/hooks/useDesignContext";
import Image from "next/image";

const formatLabel = (key) =>
  key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());

const MedicalAlertPreview = () => {
  const { dynamicForms } = useServicesContext();
  const { bgDesign, setBgDesign, isLoading, setIsLoading } = useDesignContext();

  const defaultBg = "/services-service/medical-alert.webp";

  useEffect(() => {
    setIsLoading(true);
    setBgDesign(defaultBg);
  }, []);

  const medicalAlert = dynamicForms.medicalAlert || {};

  const sections = {
    patientInfo: ["patientName", "age", "bloodType"],
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

  const isVideo = bgDesign?.endsWith(".mp4") || bgDesign?.endsWith(".webm");
  const isImage = bgDesign && !isVideo;

  const hasData = () => {
    for (const [section, keys] of Object.entries(sections)) {
      if (keys.some((key) => medicalAlert[section]?.[key]?.toString().trim()))
        return true;
    }
    if (medicalAlert.password?.trim()) return true;
    for (const field of fileFields) {
      if (medicalAlert.additional?.[field]?.length) return true;
    }
    return false;
  };

  return (
    <div className="flex justify-center">
      <div className="relative w-[350px] h-[650px] rounded-[40px] border-[14px] border-gray-800 shadow-xl overflow-hidden flex flex-col">
        {/* Background */}
        {isImage && (
          <img
            src={bgDesign}
            alt="Background"
            onLoad={() => setTimeout(() => setIsLoading(false), 300)}
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
        )}
        {isVideo && (
          <video
            src={bgDesign}
            autoPlay
            loop
            muted
            playsInline
            onLoadedData={() => setTimeout(() => setIsLoading(false), 300)}
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
        )}
        {!bgDesign && (
          <img
            src={defaultBg}
            alt="Background"
            onLoad={() => setTimeout(() => setIsLoading(false), 300)}
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
        )}

        {/* Loader */}
        {isLoading && (
          <div className="absolute inset-0 z-50 bg-mainGreen backdrop-blur-sm flex justify-center items-center">
            <Image
              src="/logos/ZM LOGO.webp"
              alt="Loading"
              width={100}
              height={100}
              className="w-20 h-20 animate-bounce "
            />
          </div>
        )}

        {/* Top Bar */}
        {/* <div className="relative z-20 bg-[#008080] flex justify-center items-center h-12 text-white font-bold text-lg rounded-t-[25px]">
          Medical Alert Preview
          <FiLock className="ml-2" />
        </div> */}

        {/* Content Scroll */}
        <div className="relative z-20 overflow-y-auto scrollbar-hide my-3 m-2 flex-1 p-4 py-6 space-y-6 text-[#333] bg-white/80 rounded-xl">
          {/* Sections */}
          {Object.entries(sections).map(([section, keys]) => {
            // Filter keys with non-empty values
            const filledKeys = keys.filter(
              (key) => medicalAlert[section]?.[key]?.toString().trim() !== ""
            );
            if (filledKeys.length === 0) return null;

            return (
              <div key={section}>
                <h2 className="text-lg font-semibold text-[#008080] mb-2">
                  {formatLabel(section)}
                </h2>
                <ul className="pl-4 space-y-1">
                  {filledKeys.map((key) => (
                    <li key={key}>
                      <strong>{formatLabel(key)}: </strong>
                      {medicalAlert[section][key]}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}

          {/* Password */}
          {/* {medicalAlert.password && medicalAlert.password.trim() !== "" && (
            <div>
              <h2 className="text-lg font-semibold text-[#008080] mb-2">
                Password
              </h2>
              <p className="text-sm">{medicalAlert.password}</p>
            </div>
          )} */}

          {/* File Fields */}
          {fileFields.map((field) => {
            const fieldFiles = medicalAlert.additional?.[field];

            if (!fieldFiles || fieldFiles.length === 0) return null;

            // Separate backend saved files (with _id) and live files (File objects)
            const backendFiles = fieldFiles.filter(
              (f) => f && f._id && f.fileType && f.fileName
            );
            const liveFiles = fieldFiles.filter(
              (f) => f instanceof File || (f && f.name && f.type)
            );

            return (
              <div
                key={field}
                className="bg-[#008080]/10 p-3 rounded border border-[#008080]/20 space-y-2"
              >
                <h3 className="text-sm font-medium text-[#008080]">
                  {formatLabel(field)}:
                </h3>

                {/* Backend files preview */}
                {backendFiles.map((file, i) => {
                  const fileUrl = `/api/services/medicalAlert/file/${file._id}`;
                  const isImage = file.fileType.startsWith("image/");
                  const isPDF = file.fileType === "application/pdf";

                  return (
                    <div key={`backend-${i}`} className="mb-2">
                      {isImage ? (
                        <img
                          src={fileUrl}
                          alt={file.fileName}
                          className="w-full rounded shadow max-h-48 object-contain"
                        />
                      ) : isPDF ? (
                        <a
                          href={fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-700 underline"
                        >
                          📄 {file.fileName}
                        </a>
                      ) : (
                        <a
                          href={fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-700 underline"
                        >
                          {file.fileName}
                        </a>
                      )}
                    </div>
                  );
                })}

                {/* Live uploaded files preview */}
                {liveFiles.map((file, i) => {
                  const isImage = file.type?.startsWith("image/");
                  const isPDF = file.type === "application/pdf";
                  const objectUrl = URL.createObjectURL(file);

                  return (
                    <div key={`live-${i}`} className="mb-2">
                      {isImage ? (
                        <img
                          src={objectUrl}
                          alt={file.name}
                          className="w-full rounded shadow max-h-48 object-contain"
                          onLoad={() => URL.revokeObjectURL(objectUrl)}
                        />
                      ) : isPDF ? (
                        <a
                          href={objectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-700 underline"
                          onClick={() => URL.revokeObjectURL(objectUrl)}
                        >
                          📄 {file.name}
                        </a>
                      ) : (
                        <a
                          href={objectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-700 underline"
                          onClick={() => URL.revokeObjectURL(objectUrl)}
                        >
                          {file.name}
                        </a>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MedicalAlertPreview;



