
// "use client";

// import React, { useEffect } from "react";
// import { FiLock } from "react-icons/fi";
// import useDesignContext from "@/components/hooks/useDesignContext";
// import BgDesignRenderer from "./bgDesignRender";

// const formatLabel = (key) =>
//   key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());

// const MedicalAlertPreview = ({ data }) => {
//   const defaultBg = "/services-service/medical-alert.webp";
//   const { bgDesign, setBgDesign } = useDesignContext();

//   // Check if any meaningful user data exists (non-empty strings or non-empty objects)
//   const hasData = data && Object.keys(data).length > 0 &&
//     Object.values(data).some(section => {
//       if (typeof section === "object" && section !== null) {
//         return Object.values(section).some(value => {
//           if (typeof value === "string") return value.trim() !== "";
//           if (typeof value === "object" && value !== null) return Object.keys(value).length > 0;
//           return !!value;
//         });
//       }
//       if (typeof section === "string") return section.trim() !== "";
//       return false;
//     });

//   useEffect(() => {
//     if (data?.bgDesign) setBgDesign(data.bgDesign);
//     else setBgDesign(defaultBg);
//   }, [data, setBgDesign]);

//   if (!hasData) {
//     return (
//       <div className="w-full px-6">
//         <BgDesignRenderer bgDesign={defaultBg} defaultBg={defaultBg} />
//         <div className="relative flex-1 w-full bg-white/70 m-2 rounded-xl p-6 text-center text-gray-400">
//           <FiLock className="text-4xl mb-4 text-[#004d4d] mx-auto" />
//           <h3 className="text-lg font-medium">Medical Alert Preview</h3>
//           <p className="mt-2">Fill the form to see the preview</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full px-6">
//       <BgDesignRenderer bgDesign={bgDesign} defaultBg={defaultBg} />
//       <div className="relative flex-1 w-full bg-white/70 m-2 rounded-xl p-6 overflow-y-auto max-h-[600px]">
//         <h2 className="text-xl font-bold text-center text-[#004d4d] mb-6">
//           Medical Alert Preview
//         </h2>

//         {Object.entries(data).map(([sectionKey, sectionValue]) => {
//           if (!sectionValue || typeof sectionValue !== "object") return null;

//           // Filter out empty fields
//           const filledFields = Object.entries(sectionValue).filter(([_, val]) => {
//             if (typeof val === "string") return val.trim() !== "";
//             if (typeof val === "object" && val !== null) {
//               // Special handling for nested location object
//               if (
//                 val.latitude !== undefined &&
//                 val.longitude !== undefined &&
//                 val.address !== undefined
//               ) {
//                 // Check if any location field is filled
//                 return (
//                   val.latitude !== null ||
//                   val.longitude !== null ||
//                   (val.address && val.address.trim() !== "")
//                 );
//               }
//               return Object.values(val).some(v => v && v.toString().trim() !== "");
//             }
//             return !!val;
//           });

//           if (filledFields.length === 0) return null;

//           return (
//             <section
//               key={sectionKey}
//               className="mb-6 p-4 bg-[#004d4d]/10 rounded border border-[#004d4d]/30"
//             >
//               <h3 className="text-[#004d4d] font-semibold mb-3 capitalize">
//                 {formatLabel(sectionKey)}
//               </h3>
//               {filledFields.map(([fieldKey, fieldValue]) => {
//                 // Special render for location object inside qrCodeDetails maybe
//                 if (
//                   typeof fieldValue === "object" &&
//                   fieldValue !== null &&
//                   "latitude" in fieldValue &&
//                   "longitude" in fieldValue &&
//                   "address" in fieldValue
//                 ) {
//                   return (
//                     <div key={fieldKey} className="mb-2">
//                       <strong>{formatLabel(fieldKey)}:</strong>
//                       <div className="pl-4 mt-1 text-gray-700">
//                         <p>Latitude: {fieldValue.latitude ?? "N/A"}</p>
//                         <p>Longitude: {fieldValue.longitude ?? "N/A"}</p>
//                         <p>Address: {fieldValue.address || "N/A"}</p>
//                       </div>
//                     </div>
//                   );
//                 }

//                 // For any other object - stringify safely
//                 if (typeof fieldValue === "object" && fieldValue !== null) {
//                   return (
//                     <p key={fieldKey} className="mb-2">
//                       <strong>{formatLabel(fieldKey)}:</strong>{" "}
//                       {JSON.stringify(fieldValue)}
//                     </p>
//                   );
//                 }

//                 // Plain text fields
//                 return (
//                   <p key={fieldKey} className="mb-2">
//                     <strong>{formatLabel(fieldKey)}:</strong> {fieldValue.toString()}
//                   </p>
//                 );
//               })}
//             </section>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default MedicalAlertPreview;

// "use client"; Ali

// import React, { useEffect } from "react";
// import { FiLock } from "react-icons/fi";
// import useDesignContext from "@/components/hooks/useDesignContext";
// import BgDesignRenderer from "./bgDesignRender";

// const formatLabel = (key) =>
//   key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());

// const MedicalAlertPreview = ({ data }) => {
//   const defaultBg = "/services-service/medical-alert.webp";
//   const { bgDesign, setBgDesign } = useDesignContext();

//   const excludedSections = ["user", "userId", "status", "qrCodeDetails"];
//   useEffect(() => {
//     setBgDesign(data?.bgDesign || defaultBg);
//   }, [data, setBgDesign]);

//   const hasData =
//     data &&
//     Object.entries(data).some(([key, value]) => {
//       if (excludedSections.includes(key)) return false;
//       if (typeof value === "string") return value.trim() !== "";
//       if (typeof value === "object" && value !== null) {
//         return Object.values(value).some(
//           (val) =>
//             typeof val === "string"
//               ? val.trim() !== ""
//               : val && typeof val === "object"
//               ? Object.keys(val).length > 0
//               : !!val
//         );
//       }
//       return !!value;
//     });

//   if (!hasData) {
//     return (
//       <div className="w-full px-6">
//         <BgDesignRenderer bgDesign={defaultBg} defaultBg={defaultBg} />
//         <div className="relative flex-1 w-full bg-white/70 m-2 rounded-xl p-6 text-center text-gray-400">
//           <FiLock className="text-4xl mb-4 text-[#004d4d] mx-auto" />
//           <h3 className="text-lg font-medium">Medical Alert Preview</h3>
//           <p className="mt-2">Fill the form to see the preview</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full px-6">
//       <BgDesignRenderer bgDesign={bgDesign} defaultBg={defaultBg} />
//       <div className="relative flex-1 w-full bg-white/70 m-2 rounded-xl p-6  ">
//         <h2 className="text-xl font-bold text-center text-[#004d4d] mb-6">
//           Medical Alert Preview
//         </h2>

//         {Object.entries(data).map(([sectionKey, sectionValue]) => {
//   if (excludedSections.includes(sectionKey)) return null;

//   // ✅ Handle direct file arrays at root level
//   if (
//     Array.isArray(sectionValue) &&
//     sectionValue.length > 0 &&
//     sectionValue[0]?.fileName &&
//     sectionValue[0]?.fileType
//   ) {
//     return (
//       <section
//         key={sectionKey}
//         className="mb-6 p-4 bg-[#004d4d]/10 rounded border border-[#004d4d]/30"
//       >
//         <h3 className="text-[#004d4d] font-semibold mb-3 capitalize">
//           {formatLabel(sectionKey)}
//         </h3>
//         <ul className="text-sm space-y-1">
//           {sectionValue.map((file, index) => {
//             const fileName = file?.fileName || "File";
//             const fileUrl = `/uploads/medical-alert/${fileName}`;
//             return (
//               <li key={index}>
//                 <button
//                   type="button"
//                   onClick={() => window.open(fileUrl, "_blank")}
//                   className="text-blue-600 underline break-words"
//                 >
//                   📄 {fileName}
//                 </button>
//               </li>
//             );
//           })}
//         </ul>
//       </section>
//     );
//   }

//   // ✅ Handle nested objects (original logic)
//   if (
//     typeof sectionValue === "object" &&
//     sectionValue !== null
//   ) {
//     const filledFields = Object.entries(sectionValue).filter(([key, val]) => {
//       if (typeof val === "string") return val.trim() !== "";
//       if (typeof val === "object" && val !== null) {
//         return Object.values(val).some((v) => v && v.toString().trim() !== "");
//       }
//       return !!val;
//     });

//     if (filledFields.length === 0) return null;

//     return (
//       <section
//         key={sectionKey}
//         className="mb-6 p-4 bg-[#004d4d]/10 rounded border border-[#004d4d]/30"
//       >
//         <h3 className="text-[#004d4d] font-semibold mb-3 capitalize">
//           {formatLabel(sectionKey)}
//         </h3>

//         {filledFields.map(([fieldKey, fieldValue]) => {
//           if (
//             typeof fieldValue === "object" &&
//             fieldValue !== null &&
//             "latitude" in fieldValue &&
//             "longitude" in fieldValue &&
//             "address" in fieldValue
//           ) {
//             return (
//               <div key={fieldKey} className="mb-2">
//                 <strong>{formatLabel(fieldKey)}:</strong>
//                 <div className="pl-4 mt-1 text-gray-700">
//                   <p>Latitude: {fieldValue.latitude ?? "N/A"}</p>
//                   <p>Longitude: {fieldValue.longitude ?? "N/A"}</p>
//                   <p>Address: {fieldValue.address || "N/A"}</p>
//                 </div>
//               </div>
//             );
//           }

//           if (
//             Array.isArray(fieldValue) &&
//             fieldValue.length > 0 &&
//             fieldValue[0]?.fileName &&
//             fieldValue[0]?.fileType
//           ) {
//             return (
//               <div key={fieldKey} className="mb-4">
//                 <strong className="block mb-2">{formatLabel(fieldKey)}:</strong>
//                 <ul className="text-sm space-y-1">
//                   {fieldValue.map((file, index) => {
//                     const fileUrl = `/uploads/medical-alert/${file.fileName}`;
//                     return (
//                       <li key={index}>
//                         <button
//                           type="button"
//                           onClick={() => window.open(fileUrl, "_blank")}
//                           className="text-blue-600 underline break-words"
//                         >
//                           📄 {file.fileName}
//                         </button>
//                       </li>
//                     );
//                   })}
//                 </ul>
//               </div>
//             );
//           }

//           if (typeof fieldValue === "object" && fieldValue !== null) {
//             return (
//               <p key={fieldKey} className="mb-2">
//                 <strong>{formatLabel(fieldKey)}:</strong>{" "}
//                 {JSON.stringify(fieldValue)}
//               </p>
//             );
//           }

//           return (
//             <p key={fieldKey} className="mb-2">
//               <strong>{formatLabel(fieldKey)}:</strong> {fieldValue}
//             </p>
//           );
//         })}
//       </section>
//     );
//   }

//   return null;
// })}

//       </div>
//     </div>
//   );
// };

// export default MedicalAlertPreview;
"use client";

import React, { useEffect } from "react";
import { FiLock } from "react-icons/fi";
import useDesignContext from "@/components/hooks/useDesignContext";
import BgDesignRenderer from "./bgDesignRender";

const formatLabel = (key) =>
  key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());

const MedicalAlertPreview = ({ data }) => {
  const defaultBg = "/services-service/medical-alert.webp";
  const { bgDesign, setBgDesign } = useDesignContext();
  const excludedSections = ["user", "userId", "status", "qrCodeDetails","priceDetails", ];

  useEffect(() => {
    setBgDesign(data?.bgDesign || defaultBg);
  }, [data, setBgDesign]);

  const hasData =
    data &&
    Object.entries(data).some(([key, value]) => {
      if (excludedSections.includes(key)) return false;

      if (typeof value === "string") return value.trim() !== "";
      if (typeof value === "object" && value !== null) {
        return Object.values(value).some((val) =>
          typeof val === "string"
            ? val.trim() !== ""
            : val && typeof val === "object"
            ? Object.keys(val).length > 0
            : !!val
        );
      }
      return !!value;
    });

  if (!hasData) {
    return (
      <div className="w-full px-6">
        <BgDesignRenderer bgDesign={defaultBg} defaultBg={defaultBg} />
        <div className="relative flex-1 w-full bg-white/70 m-2 rounded-xl p-6 text-center text-gray-400">
          <FiLock className="text-4xl mb-4 text-[#004d4d] mx-auto" />
          <h3 className="text-lg font-medium">Medical Alert Preview</h3>
          <p className="mt-2">Fill the form to see the preview</p>
        </div>
      </div>
    );
  }

  const renderFile = (file) => {
    const fileUrl = `/uploads/medical-alert/${file.fileName}`;
    const isImage = file.fileType.startsWith("image/");

    return isImage ? (
      <img
        key={file.fileName}
        src={fileUrl}
        alt={file.fileName}
        className="w-24 h-24 object-center rounded border"
      />
    ) : (
      <button
        key={file.fileName}
        type="button"
        onClick={() => window.open(fileUrl, "_blank")}
        className="text-blue-600 underline break-words"
      >
        📄 {file.fileName}
      </button>
    );
  };

  const renderFields = (sectionValue) => {
    return Object.entries(sectionValue)
      .filter(([_, val]) => {
        if (typeof val === "string") return val.trim() !== "";
        if (typeof val === "object" && val !== null) {
          return Object.values(val).some((v) => v && v.toString().trim() !== "");
        }
        return !!val;
      })
      .map(([fieldKey, fieldValue]) => {
        // Location object
        if (
          typeof fieldValue === "object" &&
          fieldValue !== null &&
          "latitude" in fieldValue &&
          "longitude" in fieldValue &&
          "address" in fieldValue
        ) {
          return (
            <div key={fieldKey} className="mb-2">
              <strong>{formatLabel(fieldKey)}:</strong>
              <div className="pl-4 mt-1 text-gray-700">
                <p>Latitude: {fieldValue.latitude ?? "N/A"}</p>
                <p>Longitude: {fieldValue.longitude ?? "N/A"}</p>
                <p>Address: {fieldValue.address || "N/A"}</p>
              </div>
            </div>
          );
        }

        // File array
        if (Array.isArray(fieldValue) && fieldValue.length > 0 && fieldValue[0]?.fileName && fieldValue[0]?.fileType) {
          return (
            <div key={fieldKey} className="mb-4 flex flex-wrap gap-2">
              <strong className="w-full mb-2">{formatLabel(fieldKey)}:</strong>
              {fieldValue.map((file) => renderFile(file))}
            </div>
          );
        }

        // Nested object
        if (typeof fieldValue === "object" && fieldValue !== null) {
          return (
            <p key={fieldKey} className="mb-2">
              <strong>{formatLabel(fieldKey)}:</strong> {JSON.stringify(fieldValue)}
            </p>
          );
        }

        // Primitive value
        return (
          <p key={fieldKey} className="mb-2">
            <strong>{formatLabel(fieldKey)}:</strong> {fieldValue}
          </p>
        );
      });
  };

  return (
    <div className="w-full px-6">
      <BgDesignRenderer bgDesign={bgDesign} defaultBg={defaultBg} />
      <div className="relative flex-1 w-full bg-white/70 m-2 rounded-xl p-6">
        <h2 className="text-xl font-bold text-center text-[#004d4d] mb-6">
          Medical Alert Preview
        </h2>

        {Object.entries(data).map(([sectionKey, sectionValue]) => {
          if (excludedSections.includes(sectionKey)) return null;

          // Root-level file array
          if (
            Array.isArray(sectionValue) &&
            sectionValue.length > 0 &&
            sectionValue[0]?.fileName &&
            sectionValue[0]?.fileType
          ) {
            return (
              <section
                key={sectionKey}
                className="mb-6 p-4 bg-[#004d4d]/10 rounded border border-[#004d4d]/30 flex flex-wrap gap-2"
              >
                <h3 className="text-[#004d4d] font-semibold mb-3 w-full capitalize">
                  {formatLabel(sectionKey)}
                </h3>
                {sectionValue.map((file) => renderFile(file))}
              </section>
            );
          }

          // Nested object
          if (typeof sectionValue === "object" && sectionValue !== null) {
            const filledFields = Object.entries(sectionValue).filter(([_, val]) => {
              if (typeof val === "string") return val.trim() !== "";
              if (typeof val === "object" && val !== null) {
                return Object.values(val).some((v) => v && v.toString().trim() !== "");
              }
              return !!val;
            });

            if (filledFields.length === 0) return null;

            return (
              <section
                key={sectionKey}
                className="mb-6 p-4 bg-[#004d4d]/10 rounded border border-[#004d4d]/30"
              >
                <h3 className="text-[#004d4d] font-semibold mb-3 capitalize">
                  {formatLabel(sectionKey)}
                </h3>
                {renderFields(sectionValue)}
              </section>
            );
          }

          return null;
        })}
      </div>
    </div>
  );
};

export default MedicalAlertPreview;
