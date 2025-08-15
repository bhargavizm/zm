// // "use client";

// // import React, { useEffect } from "react";
// // import { FiLock } from "react-icons/fi";
// // import useServicesContext from "@/components/hooks/useServiceContext";
// // import useDesignContext from "@/components/hooks/useDesignContext";
// // import Image from "next/image";

// // const formatLabel = (key) =>
// //   key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());

// // const MedicalAlertPreview = () => {
// //   const { dynamicForms } = useServicesContext();
// //   const { bgDesign, setBgDesign, isLoading, setIsLoading } = useDesignContext();

// //   const defaultBg = "/services-service/medical-alert.webp";

// //   useEffect(() => {
// //     setIsLoading(true);
// //     setBgDesign(defaultBg);
// //   }, []);

// //   const medicalAlert = dynamicForms.medicalAlert;

// //   const hasData = Object.entries(medicalAlert).some(
// //     ([section, fields]) =>
// //       section !== "password" &&
// //       typeof fields === "object" &&
// //       Object.values(fields).some((value) => value?.toString().trim() !== "")
// //   );

// //  const isVideo = bgDesign?.endsWith(".mp4") || bgDesign?.endsWith(".webm");
// //   const isImage = bgDesign && !isVideo;

// //   const isBase64 = (str) => typeof str === "string" && str.startsWith("data:");

// //   const isImageBase64 = (str) => isBase64(str) && str.startsWith("data:image");

// //   const isPdfBase64 = (str) =>
// //     isBase64(str) && str.startsWith("data:application/pdf");

// //   return (
// //     <div className="flex justify-center">
// //       <div className="relative w-[350px] h-[650px] rounded-[40px] border-[14px] border-gray-800 shadow-xl overflow-hidden flex flex-col">
// //         {/* Background */}
// //         {isImage && (
// //           <img
// //             src={bgDesign}
// //             alt="Background"
// //             onLoad={() => setTimeout(() => setIsLoading(false), 300)}
// //             className="absolute inset-0 w-full h-full object-cover z-0"
// //           />
// //         )}
// //         {isVideo && (
// //           <video
// //             src={bgDesign}
// //             autoPlay
// //             loop
// //             muted
// //             playsInline
// //             onLoadedData={() => setTimeout(() => setIsLoading(false), 300)}
// //             className="absolute inset-0 w-full h-full object-cover z-0"
// //           />
// //         )}
// //         {!bgDesign && (
// //           <img
// //             src={defaultBg}
// //             alt="Background"
// //             onLoad={() => setTimeout(() => setIsLoading(false), 300)}
// //             className="absolute inset-0 w-full h-full object-cover z-0"
// //           />
// //         )}

// //         {/* ⏳ Loader */}
// //         {isLoading && (
// //           <div className="absolute inset-0 z-50 bg-mainGreen backdrop-blur-sm flex justify-center items-center">
// //             <Image
// //               src="/logos/ZM LOGO.webp"
// //               alt="Loading"
// //               width={100}
// //               height={100}
// //               className="w-20 h-20 animate-bounce"
// //             />
// //           </div>
// //         )}

// //         {/* Top Bar */}
// //         <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-6 bg-gray-800 rounded-b-xl z-10" />

// //         {/* Content */}
// //         <div className="relative z-10 flex-1 overflow-y-auto bg-white/70 m-2 rounded-xl pt-8 pb-4 px-4">
// //           {hasData ? (
// //             <div className="space-y-4">
// //               <h2 className="text-xl font-bold text-center text-[#008080]">
// //                 Medical Alert
// //               </h2>

// //               {Object.entries(medicalAlert).map(([section, fields]) => {
// //                 if (section === "password") return null;

// //                 return (
// //                   typeof fields === "object" && (
// //                     <div
// //                       key={section}
// //                       className="bg-[#008080]/10 p-3 rounded border border-[#008080]/20 space-y-2"
// //                     >
// //                       {Object.entries(fields).map(([key, value]) => {
// //                         if (!value) return null;

// //                         return (
// //                           <div key={key} className="text-sm">
// //                             <span className="font-medium text-[#008080]">
// //                               {formatLabel(key)}:
// //                             </span>{" "}
// //                             {/* Show uploaded file */}
// //                             {isImageBase64(value) ? (
// //                               <div className="mt-2">
// //                                 <img
// //                                   src={value}
// //                                   alt={key}
// //                                   className="w-full rounded shadow"
// //                                 />
// //                               </div>
// //                             ) : isPdfBase64(value) ? (
// //                               <a
// //                                 href={value}
// //                                 target="_blank"
// //                                 rel="noopener noreferrer"
// //                                 className="text-blue-600 underline ml-1"
// //                               >
// //                                 View PDF
// //                               </a>
// //                             ) : (
// //                               <span className="text-gray-700 ml-1">
// //                                 {value}
// //                               </span>
// //                             )}
// //                           </div>
// //                         );
// //                       })}
// //                     </div>
// //                   )
// //                 );
// //               })}
// //             </div>
// //           ) : (
// //             <div className="h-full flex flex-col items-center justify-center text-center text-gray-400">
// //               <FiLock className="text-4xl mb-4 text-[#008080]" />
// //               <h3 className="text-lg font-medium">Medical Alert Preview</h3>
// //               <p className="mt-2">Fill the form to see the preview</p>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default MedicalAlertPreview;


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

//   // Enhanced hasData check to properly detect if there's any meaningful data
//   const hasData = Object.entries(medicalAlert).some(
//     ([section, fields]) =>
//       section !== "password" &&
//       typeof fields === "object" &&
//       Object.values(fields).some((value) => {
//         if (!value) return false;
//         if (typeof value === "object" && value.files) {
//           return value.files.length > 0;
//         }
//         if (typeof value === "string") {
//           return value.trim() !== "";
//         }
//         return true;
//       })
//   );

//   const isVideo = bgDesign?.endsWith(".mp4") || bgDesign?.endsWith(".webm");
//   const isImage = bgDesign && !isVideo;

//   return (
//     <div className="flex justify-center">
//       <div className="relative w-[350px] h-[650px] rounded-[40px] border-[14px] border-gray-800 shadow-xl scrollbar-hide overflow-y-auto ">
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
//           {hasData ? (
//             <div className="space-y-4">
//               <h2 className="text-xl font-bold text-center text-[#008080]">
//                 Medical Alert
//               </h2>

//               {Object.entries(medicalAlert).map(([section, fields]) => {
//                 if (section === "password" || typeof fields !== "object") return null;

//                 // Filter out empty fields for this section
//                 const nonEmptyFields = Object.entries(fields).filter(([key, value]) => {
//                   if (!value) return false;
//                   if (typeof value === "object" && value.files) {
//                     return value.files.length > 0;
//                   }
//                   if (typeof value === "string") {
//                     return value.trim() !== "";
//                   }
//                   return true;
//                 });

//                 // Don't render section if all fields are empty
//                 if (nonEmptyFields.length === 0) return null;

//                 return (
//                   <div
//                     key={section}
//                     className="bg-[#008080]/10 p-3 rounded border border-[#008080]/20 space-y-2"
//                   >
//                     <h3 className="font-medium text-[#008080] capitalize">
//                       {section.replace(/([A-Z])/g, " $1")}
//                     </h3>
                    
//                     {nonEmptyFields.map(([key, value]) => {
//                       let content = null;

//                       // Handle file uploads
//                       if (typeof value === "object" && value.files) {
//                         content = value.files.map((file, idx) => {
//                           const fileURL = URL.createObjectURL(file);

//                           if (file.type.startsWith("image/")) {
//                             return (
//                               <div key={idx} className="mt-2">
//                                 <p className="text-xs text-gray-500 mb-1">{file.name}</p>
//                                 <img
//                                   src={fileURL}
//                                   alt={file.name}
//                                   className="w-full rounded shadow"
//                                 />
//                               </div>
//                             );
//                           } else if (file.type === "application/pdf") {
//                             return (
//                               <div key={idx} className="mt-2">
//                                 <p className="text-xs text-gray-500 mb-1">{file.name}</p>
//                                 <iframe
//                                   src={fileURL}
//                                   title={file.name}
//                                   className="w-full h-64 rounded border"
//                                 />
//                               </div>
//                             );
//                           }
//                           return null;
//                         });
//                       }
//                       // Handle simple strings
//                       else if (typeof value === "string") {
//                         content = <span className="text-gray-700">{value}</span>;
//                       }

//                       return (
//   <div key={key} className="text-sm w-full flex-col space-y-1">
//     {content && (
//       <>
//         <p className="font-medium w-full text-[#008080]">
//           {formatLabel(key)}:
//         </p>
//         <div className="space-y-2">{content}</div>
//       </>
//     )}
//   </div>
// );

//                     })}
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


// "use client"; ali

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

//   const hasData = Object.entries(medicalAlert).some(
//     ([section, fields]) =>
//       section !== "password" &&
//       typeof fields === "object" &&
//       Object.values(fields).some((value) => {
//         if (!value) return false;

//         if (typeof value === "object" && Array.isArray(value.files)) {
//           return value.files.length > 0;
//         }

//         if (typeof value === "string") {
//           return value.trim() !== "";
//         }

//         return true;
//       })
//   );

//   const isVideo = bgDesign?.endsWith(".mp4") || bgDesign?.endsWith(".webm");
//   const isImage = bgDesign && !isVideo;

//   return (
//     <div className="flex justify-center">
//       <div className="relative w-[350px] h-[650px] rounded-[40px] border-[14px] border-gray-800 shadow-xl scrollbar-hide overflow-y-auto">
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
//         <div className="relative z-10 flex-1 overflow-y-auto scrollbar-hide h-full bg-white/70 m-2 rounded-xl pt-8 pb-4 px-4">
//           {hasData ? (
//             <div className="space-y-4">
//               <h2 className="text-xl font-bold text-center text-[#008080]">
//                 Medical Alert
//               </h2>

//               {Object.entries(medicalAlert).map(([section, fields]) => {
//                 if (section === "password" || typeof fields !== "object") return null;

//                 const nonEmptyFields = Object.entries(fields).filter(([_, value]) => {
//                   if (!value) return false;

//                   if (typeof value === "object" && Array.isArray(value?.files)) {
//                     return value.files.length > 0;
//                   }

//                   if (typeof value === "string") {
//                     return value.trim() !== "";
//                   }

//                   return true;
//                 });

//                 if (nonEmptyFields.length === 0) return null;

//                 return (
//                   <div
//                     key={section}
//                     className="bg-[#008080]/10 p-3 rounded border border-[#008080]/20 space-y-2"
//                   >
                  
//                     {nonEmptyFields.map(([key, value]) => {
//                       let content = null;

//                       if (typeof value === "object" && Array.isArray(value?.files) && value.files.length > 0) {
//                         content = value.files.map((file, idx) => {
//                           const fileURL = URL.createObjectURL(file);

//                           if (file.type.startsWith("image/")) {
//                             return (
//                               <div key={idx} className="mt-2">
//                                 <p className="text-xs text-gray-500 mb-1">{file.name}</p>
//                                 <img
//                                   src={fileURL}
//                                   alt={file.name}
//                                   className="w-full rounded shadow"
//                                 />
//                               </div>
//                             );
//                           } else if (file.type === "application/pdf") {
//                             return (
//                               <div key={idx} className="mt-2">
//                                 <p className="text-xs text-gray-500 mb-1">{file.name}</p>
//                                 <iframe
//                                   src={fileURL}
//                                   title={file.name}
//                                   className="w-full h-64 rounded border"
//                                 />
//                               </div>
//                             );
//                           }

//                           return null;
//                         });
//                       } else if (typeof value === "string" && value.trim() !== "") {
//                         content = <span className="text-gray-700">{value}</span>;
//                       }

//                       if (!content || (Array.isArray(content) && content.length === 0)) {
//                         return null;
//                       }

//                       return (
//                         <div key={key} className="text-sm w-full flex-col space-y-1">
//                           <span className="font-medium w-full text-[#008080]">
//                             {formatLabel(key)} : {content}
//                           </span>
                          
//                         </div>
//                       );
//                     })}
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

  const hasData = Object.entries(medicalAlert).some(
    ([section, fields]) =>
      section !== "password" &&
      typeof fields === "object" &&
      Object.values(fields).some((value) => {
        if (!value) return false;

        if (typeof value === "object" && Array.isArray(value.files)) {
          return value.files.length > 0;
        }

        if (typeof value === "string") {
          return value.trim() !== "";
        }

        return true;
      })
  );

  const isVideo = bgDesign?.endsWith(".mp4") || bgDesign?.endsWith(".webm");
  const isImage = bgDesign && !isVideo;

  return (
    <div className="flex justify-center">
      <div className="relative w-[350px] h-[650px] rounded-[40px] border-[14px] border-gray-800 shadow-xl scrollbar-hide overflow-y-auto">
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
              className="w-20 h-20 animate-bounce"
            />
          </div>
        )}

        {/* Top Bar */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-6 bg-gray-800 rounded-b-xl z-10" />

        {/* Content */}
        <div className="relative z-10 flex-1 overflow-y-auto scrollbar-hide h-full bg-white/70 m-2 rounded-xl pt-8 pb-4 px-4">
          {hasData ? (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-center text-[#008080]">
                Medical Alert
              </h2>

              {Object.entries(medicalAlert).map(([section, fields]) => {
                if (section === "password" || typeof fields !== "object") return null;

                const nonEmptyFields = Object.entries(fields).filter(([_, value]) => {
                  if (!value) return false;

                  if (typeof value === "object" && Array.isArray(value?.files)) {
                    return value.files.length > 0;
                  }

                  if (typeof value === "string") {
                    return value.trim() !== "";
                  }

                  return true;
                });

                if (nonEmptyFields.length === 0) return null;

                return (
                  <div
                    key={section}
                    className="bg-[#008080]/10 p-3 rounded border border-[#008080]/20 space-y-2"
                  >
                    {nonEmptyFields.map(([key, value]) => {
                      let content = null;

                      // ✅ Images inline, PDFs as links
                      if (typeof value === "object" && Array.isArray(value?.files) && value.files.length > 0) {
                        content = value.files.map((file, idx) => {
                          const fileURL = URL.createObjectURL(file);

                          if (file.type.startsWith("image/")) {
                            return (
                              <div key={idx} className="mt-2">
                                <p className="text-xs text-gray-500 mb-1">{file.name}</p>
                                <img
                                  src={fileURL}
                                  alt={file.name}
                                  className="w-full rounded shadow"
                                />
                              </div>
                            );
                          } else if (file.type === "application/pdf") {
                            return (
                              <div key={idx} className="mt-2">
                                <a
                                  href={fileURL}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 underline text-sm"
                                >
                                  📄 {file.name}
                                </a>
                              </div>
                            );
                          }

                          return null;
                        });
                      } else if (typeof value === "string" && value.trim() !== "") {
                        content = <span className="text-gray-700">{value}</span>;
                      }

                      if (!content || (Array.isArray(content) && content.length === 0)) {
                        return null;
                      }

                      return (
                        <div key={key} className="text-sm w-full flex-col space-y-1">
                          <span className="font-medium w-full text-[#008080]">
                            {formatLabel(key)} : {content}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center text-gray-400">
              <FiLock className="text-4xl mb-4 text-[#008080]" />
              <h3 className="text-lg font-medium">Medical Alert Preview</h3>
              <p className="mt-2">Fill the form to see the preview</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicalAlertPreview;
