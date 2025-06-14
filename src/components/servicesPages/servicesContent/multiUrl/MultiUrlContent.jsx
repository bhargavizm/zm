// "use client";

// import React, { useState } from "react";
// import useServicesContext from "@/components/hooks/useServiceContext";
// import { FaYoutube, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
// import { MdOutlineArrowDropDown } from "react-icons/md";

// const platformIcons = {
//   youtube: <FaYoutube className="text-red-600" />,
//   instagram: <FaInstagram className="text-pink-500" />,
//   twitter: (
//     <svg
//       className="w-5 h-5 text-black"
//       viewBox="0 0 24 24"
//       fill="currentColor"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <path d="M17.53 3H21L13.62 10.88L22.36 21H15.87L10.78 14.88L4.94 21H1.49L9.34 12.58L1 3H7.65L12.24 8.7L17.53 3ZM16.35 19H18.19L7.72 5H5.76L16.35 19Z" />
//     </svg>
//   ),
//   linkedin: <FaLinkedin className="text-blue-700" />,
// };


// const MultiUrlContent = () => {
//   const {
//     dynamicForms,
//     updateDynamicForm,
//     addTemplateField,
//     removeTemplateField,
//   } = useServicesContext();

//   const [selectedPlatform, setSelectedPlatform] = useState("");
//   const [customLabel, setCustomLabel] = useState("");
//   const [customUrl, setCustomUrl] = useState("");

//   const [nfcEnabled, setNfcEnabled] = useState(false);
//   const [showNfcModal, setShowNfcModal] = useState(false);

//   const socialLinks = dynamicForms?.multiUrl?.socialLinks || {};
//   const customLinks = dynamicForms?.multiUrl?.customLinks || [];

 

//   const handleCustomLinkChange = (index, key, value) => {
//     const updatedLinks = [...customLinks];
//     updatedLinks[index][key] = value;
//     updateDynamicForm("multiUrl", "customLinks", index, updatedLinks[index]);
//   };

//   const handleNfcToggle = () => {
//     if (!nfcEnabled) {
//       setShowNfcModal(true);
//     } else {
//       setNfcEnabled(false);
//     }
//   };

//   const confirmNfc = () => {
//     setNfcEnabled(true);
//     setShowNfcModal(false);
//   };

//   const cancelNfc = () => {
//     setShowNfcModal(false);
//   };

//   return (
//     <>
//       <div className="space-y-6">
//         <div className="p-4 border rounded-lg">
//           <h2 className="text-lg font-semibold mb-2">Social Media Links</h2>

//           <div className="relative w-full max-w-sm mb-4">
//             <select
//               className="w-full p-2 border rounded appearance-none"
//               value={selectedPlatform}
//               onChange={(e) => setSelectedPlatform(e.target.value)}
//             >
//               <option value="">Select Platform</option>
//               <option value="youtube">YouTube</option>
//               <option value="instagram">Instagram</option>
//               <option value="twitter">Twitter (X)</option>
//               <option value="linkedin">LinkedIn</option>
//             </select>
//             <MdOutlineArrowDropDown className="absolute top-2.5 right-3 text-xl pointer-events-none" />
//           </div>

//           {selectedPlatform && (
//             <div className="flex items-center space-x-2">
//               <span>{platformIcons[selectedPlatform]}</span>
//               <input
//                 type="text"
//                 className="w-full p-2 border rounded"
//                 placeholder={`Enter ${selectedPlatform} URL`}
//                 value={socialLinks[selectedPlatform]}
//                 onChange={(e) =>
//                   updateDynamicForm(
//                     "multiUrl",
//                     "socialLinks",
//                     selectedPlatform,
//                     e.target.value
//                   )
//                 }
//               />
//             </div>
//           )}

//           {/* Render existing social links */}
//           <div className="mt-4 space-y-2">
//             {Object.entries(socialLinks).map(
//               ([platform, url]) =>
//                 url && (
//                   <div key={platform} className="flex items-center space-x-2">
//                     <span>{platformIcons[platform]}</span>
//                     <span className="text-sm">{url}</span>
//                   </div>
//                 )
//             )}
//           </div>
//         </div>
//       </div>
//       <div>

//         <input type="text" placeholder="custom link"/>
//       </div>
//       <button>Submit</button>

      
//     </div>

//         <div className="p-4 border rounded-lg">
//           <h2 className="text-lg font-semibold mb-2">Custom Links</h2>

//           {customLinks.map((link, index) => (
//             <div key={index} className="mb-3 space-y-1">
//               <input
//                 type="text"
//                 className="w-full p-2 border rounded"
//                 placeholder="Label"
//                 value={link.label}
//                 onChange={(e) =>
//                   handleCustomLinkChange(index, "label", e.target.value)
//                 }
//               />
//               <input
//                 type="text"
//                 className="w-full p-2 border rounded"
//                 placeholder="URL"
//                 value={link.url}
//                 onChange={(e) =>
//                   handleCustomLinkChange(index, "url", e.target.value)
//                 }
//               />
//               <button
//                 className="text-red-500 text-sm underline"
//                 onClick={() =>
//                   removeTemplateField("multiUrl", "customLinks", "", index)
//                 }
//               >
//                 Remove
//               </button>
//             </div>
//           ))}

//           <div className="flex flex-col space-y-2 mt-4">
//             <input
//               type="text"
//               className="p-2 border rounded"
//               placeholder="New Custom Label"
//               value={customLabel}
//               onChange={(e) => setCustomLabel(e.target.value)}
//             />
//             <input
//               type="text"
//               className="p-2 border rounded"
//               placeholder="New Custom URL"
//               value={customUrl}
//               onChange={(e) => setCustomUrl(e.target.value)}
//             />
//             <button
//               onClick={handleAddCustomLink}
//               className="bg-[#137e7e] text-white px-4 py-2 rounded hover:bg-[#008080]"
//             >
//               Add Custom Link
//             </button>
//           </div>
//         </div>

//         <div className="flex items-center gap-4 mt-2">
//           <span className="text-sm font-medium text-gray-700">NFC</span>
//           <button
//             type="button"
//             onClick={handleNfcToggle}
//             className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors duration-500 cursor-pointer
//                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#008080]
//                     ${nfcEnabled ? "bg-[#008080]" : "bg-gray-300"}`}
//           >
//             <span
//               className={`absolute left-1 top-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-md transition-all duration-300
//                     ${nfcEnabled ? "translate-x-8" : "translate-x-0"}`}
//             >
//               {nfcEnabled ? (
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-4 w-4 text-[#008080]"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                   strokeWidth={2}
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M5 13l4 4L19 7"
//                   />
//                 </svg>
//               ) : (
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-4 w-4 text-gray-500"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                   strokeWidth={2}
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 </svg>
//               )}
//             </span>
//           </button>
//         </div>

//         <div className="text-center">
//           <button className="bg-[#137e7e] text-white px-4 py-2 rounded hover:bg-[#008080]">
//             Submit
//           </button>
//         </div>
//       </div>

//       {/* ✅ NFC Modal */}
//       {showNfcModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/30">
//           <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full border border-teal-200 relative">
//             {/* Close Button */}
//             <button
//               onClick={cancelNfc}
//               className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl"
//             >
//               &times;
//             </button>

//             <h2 className="text-xl font-bold text-[#008080] mb-2">
//               NFC Activated
//             </h2>
//             <p className="text-sm text-gray-700">
//               You're trying to enable <strong>NFC</strong> features.
//               <br />
//               This is a <strong>premium service</strong>.
//               <br />
//               <span className="text-[#008080] font-semibold">
//                 Cost: ₹499/year
//               </span>
//             </p>

//             <div className="flex justify-end mt-5 space-x-3">
//               <button
//                 onClick={cancelNfc}
//                 className="px-4 py-2 cursor-pointer rounded border border-gray-400 text-gray-600 hover:bg-gray-100"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={confirmNfc}
//                 className="px-4 py-2 cursor-pointer bg-[#008080] text-white rounded hover:bg-[#006666] transition"
//               >
//                 Accept
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default MultiUrlContent;

"use client";

import React, { useState } from "react";
import useServicesContext from "@/components/hooks/useServiceContext";
import { FaYoutube, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import { MdOutlineArrowDropDown } from "react-icons/md";

const platformIcons = {
  youtube: <FaYoutube className="text-red-600" />,
  instagram: <FaInstagram className="text-pink-500" />,
  twitter: <FaTwitter className="text-blue-400" />,
  linkedin: <FaLinkedin className="text-blue-700" />,
};

const MultiUrlContent = () => {
  const {
    dynamicForms,
    updateDynamicForm,
    addTemplateField,
    removeTemplateField,
  } = useServicesContext();

  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [customLabel, setCustomLabel] = useState("");
  const [customUrl, setCustomUrl] = useState("");

  const [nfcEnabled, setNfcEnabled] = useState(false);
  const [showNfcModal, setShowNfcModal] = useState(false);

  const socialLinks = dynamicForms?.multiUrl?.socialLinks || {};
  const customLinks = dynamicForms?.multiUrl?.customLinks || [];

  const handleCustomLinkChange = (index, key, value) => {
    const updatedLinks = [...customLinks];
    updatedLinks[index][key] = value;
    updateDynamicForm("multiUrl", "customLinks", index, updatedLinks[index]);
  };

  const handleAddCustomLink = () => {
    if (!customLabel || !customUrl) return;
    const newLink = { label: customLabel, url: customUrl };
    addTemplateField("multiUrl", "customLinks", "", newLink);
    setCustomLabel("");
    setCustomUrl("");
  };

  const handleNfcToggle = () => {
    if (!nfcEnabled) {
      setShowNfcModal(true);
    } else {
      setNfcEnabled(false);
    }
  };

  const confirmNfc = () => {
    setNfcEnabled(true);
    setShowNfcModal(false);
  };

  const cancelNfc = () => {
    setShowNfcModal(false);
  };

  return (
    <>
      <div className="space-y-6">
        {/* 🔗 Social Media Links */}
        <div className="p-4 border rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Social Media Links</h2>
          <div className="relative w-full max-w-sm mb-4">
            <select
              className="w-full p-2 border rounded appearance-none"
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
            >
              <option value="">Select Platform</option>
              <option value="youtube">YouTube</option>
              <option value="instagram">Instagram</option>
              <option value="twitter">Twitter (X)</option>
              <option value="linkedin">LinkedIn</option>
            </select>
            <MdOutlineArrowDropDown className="absolute top-2.5 right-3 text-xl pointer-events-none" />
          </div>

          {selectedPlatform && (
            <div className="flex items-center space-x-2">
              <span>{platformIcons[selectedPlatform]}</span>
              <input
                type="text"
                className="w-full p-2 border rounded"
                placeholder={`Enter ${selectedPlatform} URL`}
                value={socialLinks[selectedPlatform] || ""}
                onChange={(e) =>
                  updateDynamicForm(
                    "multiUrl",
                    "socialLinks",
                    selectedPlatform,
                    e.target.value
                  )
                }
              />
            </div>
          )}

          <div className="mt-4 space-y-2">
            {Object.entries(socialLinks).map(
              ([platform, url]) =>
                url && (
                  <div key={platform} className="flex items-center space-x-2">
                    <span>{platformIcons[platform]}</span>
                    <span className="text-sm">{url}</span>
                  </div>
                )
            )}
          </div>
        </div>

        {/* 🌐 Custom Links */}
        <div className="p-4 border rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Custom Links</h2>

          {customLinks.map((link, index) => (
            <div key={index} className="mb-3 space-y-1">
              <input
                type="text"
                className="w-full p-2 border rounded"
                placeholder="Label"
                value={link.label}
                onChange={(e) =>
                  handleCustomLinkChange(index, "label", e.target.value)
                }
              />
              <input
                type="text"
                className="w-full p-2 border rounded"
                placeholder="URL"
                value={link.url}
                onChange={(e) =>
                  handleCustomLinkChange(index, "url", e.target.value)
                }
              />
              <button
                className="text-red-500 text-sm underline"
                onClick={() =>
                  removeTemplateField("multiUrl", "customLinks", "", index)
                }
              >
                Remove
              </button>
            </div>
          ))}

          <div className="flex flex-col space-y-2 mt-4">
            <input
              type="text"
              className="p-2 border rounded"
              placeholder="New Custom Label"
              value={customLabel}
              onChange={(e) => setCustomLabel(e.target.value)}
            />
            <input
              type="text"
              className="p-2 border rounded"
              placeholder="New Custom URL"
              value={customUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
            />
            <button
              onClick={handleAddCustomLink}
              className="bg-[#137e7e] text-white px-4 py-2 rounded hover:bg-[#008080]"
            >
              Add Custom Link
            </button>
          </div>
        </div>

        {/* 📶 NFC Toggle */}
        <div className="flex items-center gap-4 mt-2">
          <span className="text-sm font-medium text-gray-700">NFC</span>
          <button
            type="button"
            onClick={handleNfcToggle}
            className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors duration-500 cursor-pointer
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#008080]
                    ${nfcEnabled ? "bg-[#008080]" : "bg-gray-300"}`}
          >
            <span
              className={`absolute left-1 top-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-md transition-all duration-300
                    ${nfcEnabled ? "translate-x-8" : "translate-x-0"}`}
            >
              {nfcEnabled ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-[#008080]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </span>
          </button>
        </div>

        {/* ✅ Submit Button */}
        <div className="text-center mt-4">
          <button className="bg-[#137e7e] text-white px-6 py-2 rounded hover:bg-[#008080]">
            Submit
          </button>
        </div>
      </div>

      {/* 🔒 NFC Modal */}
      {showNfcModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/30">
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full border border-teal-200 relative">
            <button
              onClick={cancelNfc}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold text-[#008080] mb-2">
              NFC Activated
            </h2>
            <p className="text-sm text-gray-700">
              You're trying to enable <strong>NFC</strong> features.
              <br />
              This is a <strong>premium service</strong>.
              <br />
              <span className="text-[#008080] font-semibold">
                Cost: ₹499/year
              </span>
            </p>
            <div className="flex justify-end mt-5 space-x-3">
              <button
                onClick={cancelNfc}
                className="px-4 py-2 rounded border border-gray-400 text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={confirmNfc}
                className="px-4 py-2 bg-[#008080] text-white rounded hover:bg-[#006666] transition"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MultiUrlContent;

