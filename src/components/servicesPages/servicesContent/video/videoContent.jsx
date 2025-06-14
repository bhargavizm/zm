"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useServicesContext from "@/components/hooks/useServiceContext";
import { FiEye, FiEyeOff } from "react-icons/fi";

const VedioContent = () => {
  const { titleFormData, setTitleFormData } = useServicesContext(); // Using titleFormData
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

   const [nfcEnabled, setNfcEnabled] = useState(false);
    const [showNfcModal, setShowNfcModal] = useState(false);
  
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


  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setTitleFormData((prev) => ({ // Updated to setTitleFormData
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!titleFormData.file) { // Updated to titleFormData
      alert("Please select an audio file.");
      return;
    }

    const data = {
      title: titleFormData.title, // Updated to titleFormData
      description: titleFormData.description, // Updated to titleFormData
      fileName: titleFormData.file.name, // Updated to titleFormData
      password: titleFormData.password, // Updated to titleFormData
    };

    localStorage.setItem("audioData", JSON.stringify(data));
    router.push("/preview");
  };

  return (
    <>
    <div className="flex w-full max-w-3xl gap-6">
      <div className="flex-1 bg-white shadow-lg rounded-2xl p-6 space-y-5 max-h-[600px] overflow-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={titleFormData.title} // Updated to titleFormData
              onChange={handleChange}
              placeholder="Enter audio title"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              rows="2"
              value={titleFormData.description} // Updated to titleFormData
              onChange={handleChange}
              placeholder="Enter description"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Choose File
            </label>
            <input
              type="file"
              name="file"
              accept="audio/*"
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:bg-teal-600 file:text-white hover:file:bg-teal-700"
            />
          </div>

                   {/* Password Field with Eye Icon */}
                   <div>
                     <label className="block text-sm font-semibold text-gray-700 mb-1">
                       Password
                     </label>
                     <div className="relative">
                       <input
                         type={showPassword ? "text" : "password"}
                         name="password"
                         value={titleFormData.password}
                         onChange={handleChange}
                         placeholder="Enter password"
                         className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                       />
                       <button
                         type="button"
                         onClick={() => setShowPassword(!showPassword)}
                         className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 focus:outline-none"
                       >
                         {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                       </button>
                     </div>
                   </div>
         
         
                   <div className="flex items-center gap-4 px-4 mt-2">
                             <span className="text-sm font-medium text-gray-700">
                               NFC
                             </span>
                             <button
                               type="button"
                               onClick={handleNfcToggle}
                               className={`relative cursor-pointer inline-flex h-8 w-16 items-center rounded-full transition-colors duration-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#008080] ${
                                 nfcEnabled ? "bg-[#008080]" : "bg-gray-300"
                               }`}
                             >
                               <span
                                 className={`absolute left-1 top-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-md transition-all duration-300 ${
                                   nfcEnabled ? "translate-x-8" : "translate-x-0"
                                 }`}
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
         
                   {/* Submit Button */}
                   <button
                     type="submit"
                     className="w-full cursor-pointer bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-lg font-semibold text-sm transition"
                   >
                     Submit
                   </button>
                 </form>
               </div>
             </div>
         
              {showNfcModal && (
                 <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/30">
                   <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full border border-teal-200 relative">
                     {/* Close Button */}
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
                         className="px-4 py-2 cursor-pointer rounded border border-gray-400 text-gray-600 hover:bg-gray-100"
                       >
                         Cancel
                       </button>
                       <button
                         onClick={confirmNfc}
                         className="px-4 py-2 cursor-pointer bg-[#008080] text-white rounded hover:bg-[#006666] transition"
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

export default VedioContent;