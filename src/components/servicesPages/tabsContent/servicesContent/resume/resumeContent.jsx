"use client";

import React, { useState, useRef } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { IoEyeOutline, IoEyeOffOutline, IoClose } from "react-icons/io5";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import useServicesContext from "@/components/hooks/useServiceContext";
import useDesignContext from "@/components/hooks/useDesignContext";
import NFCModal from "@/components/modalPopUps/nfcModal";
import { setResumeServices } from "@/redux/slices/servicesSlice";
import LoadingSpinner from "@/components/common/spinner";

const MAX_FILE_SIZE_MB = 2;
const MAX_TOTAL_SIZE_MB = 30;

const ResumeContent = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const router = useRouter();
  const fileInputRef = useRef();

  const { setActiveTab } = useDesignContext();
  const {
    resumeFormData,
    setResumeFormData,
    servicesDataLoading,
    setServicesDataLoading,
  } = useServicesContext();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleChange = (e) => {
    const { files } = e.target;

    if (files) {
      const newFiles = Array.from(files);
      const existingFiles = resumeFormData.resumeFiles || [];

      for (let file of newFiles) {
        if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
          toast.error(`${file.name} exceeds ${MAX_FILE_SIZE_MB}MB limit.`);
          return;
        }
      }

      const uniqueFiles = newFiles.filter(
        (file) =>
          !existingFiles.some(
            (f) => f.name === file.name && f.size === file.size
          )
      );

      const totalSize = [...existingFiles, ...uniqueFiles].reduce(
        (acc, file) => acc + file.size,
        0
      );
      if (totalSize > MAX_TOTAL_SIZE_MB * 1024 * 1024) {
        toast.error("Total size exceeds 30MB limit.");
        return;
      }

      setResumeFormData((prev) => ({
        ...prev,
        resumeFiles: [...existingFiles, ...uniqueFiles],
      }));

      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleFileRemove = (index) => {
    setResumeFormData((prev) => {
      const updated = [...(prev.resumeFiles || [])];
      updated.splice(index, 1);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return { ...prev, resumeFiles: updated };
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setResumeFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const hasFiles = resumeFormData.resumeFiles?.length > 0;
    const hasUrl = resumeFormData.resumeUrl?.trim();
    const hasPassword = resumeFormData.password?.trim();

    if (!hasFiles && !hasUrl && !hasPassword) {
      toast.error("Please fill at least one field before submitting.");
      return;
    }

    setShowConfirmModal(true);
  };

  const submitToServer = async () => {
    const formData = new FormData();

    (resumeFormData.resumeFiles || []).forEach((file) => {
      formData.append("resumeFiles", file);
    });

    formData.append("resumeUrl", resumeFormData.resumeUrl || "");
    formData.append("password", resumeFormData.password || "");

    setServicesDataLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:3000/api/services/resume",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setResumeServices(res.data));
        setActiveTab(slug, "QR Code");

        setResumeFormData({ resumeFiles: [], resumeUrl: "", password: "" });
        if (fileInputRef.current) fileInputRef.current.value = "";
        setShowConfirmModal(false);
        toast.success("Uploaded successfully!");
      }
    } catch (err) {
      console.error("Upload failed:", err);
      toast.error(err?.response?.data?.error || "Something went wrong!");
      if (error.response?.status === 401) {
        window.location.href = "/login"; // ✅ Auto logout on expiry
        return;
      }
    } finally {
      setServicesDataLoading(false); // ✅ End loader
    }
  };

  return (
    <>
      {servicesDataLoading && <LoadingSpinner />}

      <div className="flex items-center justify-center">
        <div className="flex w-full max-w-5xl gap-6">
          <div className="flex-1 bg-white shadow-xl rounded-2xl p-6 space-y-5 max-h-[600px] overflow-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Resume File Upload */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Upload Resumes (PDF/Doc) - Multiple files allowed
                </label>

                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md text-sm"
                  >
                    Choose Files
                  </button>

                  <span className="text-sm text-gray-600">
                    {resumeFormData.resumeFiles?.length || 0} file
                    {resumeFormData.resumeFiles?.length === 1 ? "" : "s"}{" "}
                    selected
                  </span>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  name="resumeFiles"
                  multiple
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  onChange={handleChange}
                />

                {resumeFormData.resumeFiles?.length > 0 && (
                  <div className="mt-2 space-y-2">
                    {resumeFormData.resumeFiles.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded-md text-sm"
                      >
                        <span className="truncate flex-1">{file.name}</span>
                        <span className="ml-2 text-gray-500 text-xs">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </span>
                        <button
                          type="button"
                          onClick={() => handleFileRemove(index)}
                          className="text-red-600 cursor-pointer ml-2"
                        >
                          <IoClose size={16} />
                        </button>
                      </div>
                    ))}
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
                  onChange={handleInputChange}
                  placeholder="https://example.com/your-resume.pdf"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                />
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={resumeFormData.password || ""}
                    onChange={handleInputChange}
                    placeholder="Set password for resume"
                    className="w-full px-3 py-2 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600 hover:text-teal-600"
                  >
                    {showPassword ? (
                      <IoEyeOutline size={18} />
                    ) : (
                      <IoEyeOffOutline size={18} />
                    )}
                  </span>
                </div>
              </div>

              <NFCModal />

              <button
                type="submit"
                className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-lg font-semibold text-sm transition"
              >
                Submit
              </button>
            </form>
          </div>
        </div>

        {/* Confirmation Modal */}
        {showConfirmModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm">
            <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl space-y-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Confirm Submission
              </h2>
              <div className="text-md text-gray-700 space-y-2">
                {resumeFormData.resumeFiles?.length > 0 && (
                  <div>
                    <strong>Files:</strong>
                    <ul className="list-disc pl-5 mt-1">
                      {resumeFormData.resumeFiles.map((file, index) => (
                        <li key={index} className="truncate">
                          <a
                            href={file.url || URL.createObjectURL(file)} // assuming you have a URL or createObjectURL
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline cursor-pointer"
                            onClick={(e) => {
                              // If using a File object and want to revoke URL after open:
                              if (!file.url) {
                                const fileURL = URL.createObjectURL(file);
                                e.currentTarget.href = fileURL;
                                setTimeout(
                                  () => URL.revokeObjectURL(fileURL),
                                  1000
                                );
                              }
                            }}
                          >
                            {file.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {resumeFormData.resumeUrl && (
                  <p>
                    <strong>URL:</strong>{" "}
                    <a
                      href={resumeFormData.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline cursor-pointer"
                    >
                      {resumeFormData.resumeUrl}
                    </a>
                  </p>
                )}
                {resumeFormData.password && (
                  <p>
                    <strong>Password:</strong> {resumeFormData.password}
                  </p>
                )}
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 cursor-pointer"
                >
                  Back
                </button>
                <button
                  onClick={submitToServer}
                  className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 cursor-pointer transition duration-150"
                >
                  Confirm & Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ResumeContent;



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
//         <div className="flex-1 bg-white shadow-xl rounded-2xl p-6 space-y-5 max-h-[600px] overflow-auto">
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

// "use client"; pavan code

// import React, { useState, useRef } from "react";
// import axios from "axios";
// import { useParams, useRouter } from "next/navigation";
// import { IoEyeOutline, IoEyeOffOutline, IoClose } from "react-icons/io5";
// import { useDispatch } from "react-redux";
// import toast from "react-hot-toast";

// import useServicesContext from "@/components/hooks/useServiceContext";
// import useDesignContext from "@/components/hooks/useDesignContext";
// import NFCModal from "@/components/modalPopUps/nfcModal";
// import { setResumeServices } from "@/redux/slices/servicesSlice";

// const MAX_FILE_SIZE_MB = 2;
// const MAX_TOTAL_SIZE_MB = 30;

// const ResumeContent = () => {
//   const { slug } = useParams();
//   const dispatch = useDispatch();
//   const router = useRouter();
//   const fileInputRef = useRef();

//   const { setActiveTab } = useDesignContext();
//   const { resumeFormData, setResumeFormData } = useServicesContext();

//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmModal, setShowConfirmModal] = useState(false);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;

//     if (name === "resumeFiles" && files) {
//       const newFiles = Array.from(files);
//       const existingFiles = resumeFormData.resumeFiles || [];

//       // Check size of each file
//       for (let file of newFiles) {
//         if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
//           toast.error(`${file.name} exceeds ${MAX_FILE_SIZE_MB}MB limit.`);
//           return;
//         }
//       }

//       // Prevent duplicate files
//       const uniqueFiles = newFiles.filter(
//         file => !existingFiles.some(f => f.name === file.name && f.size === file.size)
//       );

//       const totalSize = [...existingFiles, ...uniqueFiles].reduce((acc, file) => acc + file.size, 0);
//       if (totalSize > MAX_TOTAL_SIZE_MB * 1024 * 1024) {
//         toast.error("Total size exceeds 30MB limit.");
//         return;
//       }

//       setResumeFormData(prev => ({
//         ...prev,
//         resumeFiles: [...existingFiles, ...uniqueFiles],
//       }));
//     } else {
//       setResumeFormData(prev => ({
//         ...prev,
//         [name]: value,
//       }));
//     }
//   };

//   const handleFileRemove = (index) => {
//     setResumeFormData(prev => {
//       const updated = [...(prev.resumeFiles || [])];
//       updated.splice(index, 1);
//       return { ...prev, resumeFiles: updated };
//     });
//   };

//   const handleSubmit = (e) => {
//   e.preventDefault();

//   const hasFiles = resumeFormData.resumeFiles?.length > 0;
//   const hasUrl = resumeFormData.resumeUrl?.trim();
//   const hasPassword = resumeFormData.password?.trim();

//   if (!hasFiles && !hasUrl && !hasPassword) {
//     toast.error("Please fill at least one field before submitting.");
//     return;
//   }

//   setShowConfirmModal(true);
// };

//   const submitToServer = async () => {
//     const formData = new FormData();

//     (resumeFormData.resumeFiles || []).forEach(file => {
//       formData.append("resumeFiles", file);
//     });

//     formData.append("resumeUrl", resumeFormData.resumeUrl || "");
//     formData.append("password", resumeFormData.password || "");

//     try {
//       const res = await axios.post("/api/services/resume", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//         withCredentials: true,
//       });

//       if (res.data.success) {
//         dispatch(setResumeServices(res.data));
//         setActiveTab(slug, "QR Code");

//         setResumeFormData({ resumeFiles: [], resumeUrl: "", password: "" });
//         if (fileInputRef.current) fileInputRef.current.value = "";
//         setShowConfirmModal(false);
//         console.log(res.data)
//         toast.success("Uploaded successfully!");
//       }
//     } catch (err) {
//       console.error("Upload failed:", err);
//       toast.error("Upload failed. Please try again.");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center">
//       <div className="flex w-full max-w-5xl gap-6">
//         <div className="flex-1 bg-white shadow-xl rounded-2xl p-6 space-y-5 max-h-[600px] overflow-auto">
//           <form onSubmit={handleSubmit} className="space-y-4">
//             {/* Resume Files Upload */}
//             <div>
//               <label className="block text-xs font-medium text-gray-700 mb-1">
//                 Upload Resumes (PDF/Doc) - Multiple files allowed
//               </label>
//               <input
//                 ref={fileInputRef}
//                 type="file"
//                 name="resumeFiles"
//                 multiple
//                 accept=".pdf,.doc,.docx"
//                 className="w-full px-3 py-2 border cursor-pointer border-gray-300 rounded-lg text-sm file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:bg-teal-600 file:text-white hover:file:bg-teal-700"
//                 onChange={handleChange}
//               />
//               {resumeFormData.resumeFiles?.length > 0 && (
//                 <div className="mt-2 space-y-2">
//                   {resumeFormData.resumeFiles.map((file, index) => (
//                     <div
//                       key={index}
//                       className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded-md text-sm"
//                     >
//                       <span className="truncate flex-1">{file.name}</span>
//                       <span className="ml-2 text-gray-500 text-xs">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
//                       <button
//                         type="button"
//                         onClick={() => handleFileRemove(index)}
//                         className="text-red-600 cursor-pointer ml-2"
//                       >
//                         <IoClose size={16} />
//                       </button>
//                     </div>
//                   ))}
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

//             {/* Password Field */}
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
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
//                   {showPassword ? <IoEyeOutline size={18} /> : <IoEyeOffOutline size={18} />}
//                 </span>
//               </div>
//             </div>

//             <NFCModal />

//             <button
//               type="submit"
//               className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-lg font-semibold text-sm transition"

//             >
//               Submit
//             </button>
//           </form>
//         </div>
//       </div>

//       {/* Confirmation Modal */}
//       {showConfirmModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm">
//           <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl space-y-4">
//             <h2 className="text-lg font-semibold text-gray-800">Confirm Submission</h2>
//             <div className="text-md text-gray-700 space-y-2">
//               {resumeFormData.resumeFiles?.length > 0 && (
//                 <div>
//                   <strong>Files:</strong>
//                   <ul className="list-disc pl-5 mt-1">
//                     {resumeFormData.resumeFiles.map((file, index) => (
//                       <li key={index} className="truncate">{file.name}</li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//               {resumeFormData.resumeUrl && (
//                 <p><strong>URL:</strong> {resumeFormData.resumeUrl}</p>
//               )}
//               {resumeFormData.password && (
//                 <p><strong>Password:</strong> {resumeFormData.password}</p>
//               )}
//             </div>

//             <div className="flex justify-end gap-3 pt-4">
//               <button
//                 onClick={() => setShowConfirmModal(false)}
//                 className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 cursor-pointer"
//               >
//                 Back
//               </button>
//               <button
//                 onClick={submitToServer}
//                 className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 cursor-pointer transition duration-150"
//               >
//                 Confirm & Submit
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ResumeContent;


