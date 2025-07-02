// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import { useRouter } from "next/navigation";
// import useServicesContext from "@/components/hooks/useServiceContext";
// import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
// import NFCModal from "@/components/modalPopUps/nfcModal";

// const ResumeContent = () => {
//   const { resumeFormData, setResumeFormData } = useServicesContext();
//   const [showPassword, setShowPassword] = useState(false);
//   const router = useRouter();
//   const fileInputRef = useRef(null);

//   useEffect(() => {
//     if (resumeFormData.resumeFile) {
//       const url = URL.createObjectURL(resumeFormData.resumeFile);
//       return () => URL.revokeObjectURL(url);
//     }
//   }, [resumeFormData.resumeFile]);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setResumeFormData((prev) => ({
//       ...prev,
//       [name]: name === "resumeFile" ? files[0] : value,
//     }));
//   };

//   const handleFileRemove = () => {
//   setResumeFormData((prev) => ({ ...prev, resumeFile: null }));
//   if (fileInputRef.current) {
//     fileInputRef.current.value = ""; // <-- clears file input field
//   }
// };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!resumeFormData.resumeFile && !resumeFormData.resumeUrl) {
//       alert("Please upload a resume file or provide a resume URL.");
//       return;
//     }

//     const submittedData = {
//       title: resumeFormData.title,
//       description: resumeFormData.description,
//       resumeFileName: resumeFormData.resumeFile?.name || null,
//       resumeUrl: resumeFormData.resumeUrl || "",
//       password: resumeFormData.password,
//     };

//     localStorage.setItem("resumeQRData", JSON.stringify(submittedData));
//     router.push("/preview");
//   };

//   return (
//     <div className="flex items-center justify-center">
//       <div className="flex w-full max-w-5xl gap-6">
//         <div className="flex-1 bg-white shadow-xl rounded-2xl p-6 space-y-5 max-h-[650px] overflow-auto">
//           <form onSubmit={handleSubmit} className="space-y-4">

//             {/* File Upload */}
//             <div>
//               <label className="block text-xs font-medium text-gray-700 mb-1">
//                 Upload Resume (PDF/Doc)
//               </label>
//               <input
//                ref={fileInputRef}
//                 id="resume-upload"
//                 type="file"
//                 name="resumeFile"
//                 accept=".pdf,.doc,.docx"
//                 className="w-full px-3 py-2 border cursor-pointer border-gray-300 rounded-lg text-sm file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:bg-teal-600 file:text-white hover:file:bg-teal-700"
//                 onChange={handleChange}
//               />
//               {resumeFormData.resumeFile && (
//                 <div className="mt-2 flex items-center justify-between bg-gray-100 px-3 py-2 rounded-md text-sm">
//                   <span className="truncate">{resumeFormData.resumeFile.name}</span>
//                   <button
//                     type="button"
//                     onClick={handleFileRemove}
//                     className="text-red-600 cursor-pointer "
//                   >
//                     ❌
//                   </button>
//                 </div>
//               )}
//             </div>

//             {/* Resume URL */}
//             <div>
//               <label className="block text-xs font-medium text-gray-700 mb-1">
//                 Or Enter Resume URL
//               </label>
//               <input
//                 type="url"
//                 name="resumeUrl"
//                 value={resumeFormData.resumeUrl || ""}
//                 onChange={handleChange}
//                 placeholder="https://example.com/your-resume.pdf"
//                 className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
//               />
//             </div>

//             {/* Password */}
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-1">
//                 Password
//               </label>
//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   name="password"
//                   value={resumeFormData.password || ""}
//                   onChange={handleChange}
//                   placeholder="Set password for resume"
//                   className="w-full px-3 py-2 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
//                 />
//                 <span
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600 hover:text-teal-600"
//                 >
//                   {showPassword ? (
//                     <IoEyeOutline size={18} />
//                   ) : (

//                     <IoEyeOffOutline size={18} />
//                   )}
//                 </span>
//               </div>
//             </div>

//             {/* NFC Modal */}
//             <NFCModal />

//             {/* Submit Button */}
//             <button
//               type="button"

//               className="w-full cursor-pointer bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-lg font-semibold text-sm transition"

//             >
//               Submit
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResumeContent;


"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import useServicesContext from "@/components/hooks/useServiceContext";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import NFCModal from "@/components/modalPopUps/nfcModal";
import toast from "react-hot-toast";
import { setResumeServices } from "@/redux/slices/servicesSlice";

import { useDispatch } from "react-redux";


const ResumeContent = () => {
  const { resumeFormData, setResumeFormData } = useServicesContext();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const dispatch=useDispatch()
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (resumeFormData.resumeFile) {
      const url = URL.createObjectURL(resumeFormData.resumeFile);
      return () => URL.revokeObjectURL(url);
    }
  }, [resumeFormData.resumeFile]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setResumeFormData((prev) => ({
      ...prev,
      [name]: name === "resumeFile" ? files[0] : value,
    }));
  };

  const handleFileRemove = () => {
    setResumeFormData((prev) => ({ ...prev, resumeFile: null }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resumeFormData.resumeFile && !resumeFormData.resumeUrl) {
      toast.error("Please upload a resume file or provide a resume URL.");
      return;
    }

    const formData = new FormData();
    if (resumeFormData.resumeFile) {
      formData.append("resumeFile", resumeFormData.resumeFile);
    }
    formData.append("password", resumeFormData.password || "");
    formData.append("resumeUrl", resumeFormData.resumeUrl || "");

    try {
      const res = await axios.post("http://localhost:3000/api/services/resume", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(res)

      if (res.data.success) {

        dispatch(setResumeServices(res.data.resumeData))

        toast.success("Resume uploaded successfully");

        setResumeFormData({
          resumeFile: null,
          resumeUrl: "",
          password: "",
        })

      } else {
        toast.error("Upload failed.");
      }
    } catch (error) {
      console.error("Upload error:", error.message);
      toast.error("Something went wrong while uploading.");
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="flex w-full max-w-5xl gap-6">
        <div className="flex-1 bg-white shadow-xl rounded-2xl p-6 space-y-5 max-h-[650px] overflow-auto">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* File Upload */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Upload Resume (PDF/Doc)
              </label>
              <input
                ref={fileInputRef}
                id="resume-upload"
                type="file"
                name="resumeFile"
                accept=".pdf,.doc,.docx"
                className="w-full px-3 py-2 border cursor-pointer border-gray-300 rounded-lg text-sm file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:bg-teal-600 file:text-white hover:file:bg-teal-700"
                onChange={handleChange}
              />
              {resumeFormData.resumeFile && (
                <div className="mt-2 flex items-center justify-between bg-gray-100 px-3 py-2 rounded-md text-sm">
                  <span className="truncate">{resumeFormData.resumeFile.name}</span>
                  <button
                    type="button"
                    onClick={handleFileRemove}
                    className="text-red-600 cursor-pointer"
                  >
                    ❌
                  </button>
                </div>
              )}
            </div>

            {/* Resume URL */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Or Enter Resume URL
              </label>
              <input
                type="url"
                name="resumeUrl"
                value={resumeFormData.resumeUrl || ""}
                onChange={handleChange}
                placeholder="https://example.com/your-resume.pdf"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={resumeFormData.password || ""}
                  onChange={handleChange}
                  placeholder="Set password for resume"
                  className="w-full px-3 py-2 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600 hover:text-teal-600"
                >
                  {showPassword ? <IoEyeOutline size={18} /> : <IoEyeOffOutline size={18} />}
                </span>
              </div>
            </div>

            {/* NFC Modal */}
            <NFCModal />

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-lg font-semibold text-sm transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResumeContent;
