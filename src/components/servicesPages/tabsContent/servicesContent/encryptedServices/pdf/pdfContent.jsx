
import { useDispatch } from "react-redux";
import useServicesContext from "@/components/hooks/useServiceContext";
import EncryptedServicesForm from "../common/encryptedServicesForm";
import { setPDFServices } from "@/redux/slices/encryptedServicesSlice";


const PDFContent = () => {
  const { pdfFormData, setPdfFormData } = useServicesContext();
  const dispatch = useDispatch();

  return (
    <div className="max-w-2xl w-full p-6 bg-white shadow-lg rounded-xl">
      <EncryptedServicesForm
        formData={pdfFormData}
        setFormData={setPdfFormData}
          fileKey="file"
        apiRoute="/api/encryptedServices/pdf"
        reduxAction={setPDFServices}
        dispatch={dispatch}
        accept="/*"
        titleLabel="PDF Title"
        fileLabel="Upload PDF Files"
        successMessage="✅ PDFs uploaded successfully"
      />
    </div>
  );
};

export default PDFContent;


// "use client";

// import { useState, useRef } from "react";
// import { FiEye, FiEyeOff } from "react-icons/fi";
// import axios from "axios";
// import { toast } from "react-hot-toast";
// import { useDispatch } from "react-redux";
// import NFCModal from "@/components/modalPopUps/nfcModal";
// import useServicesContext from "@/components/hooks/useServiceContext";
// import { setPDFServices } from "@/redux/slices/servicesSlice";

// const PDFContent = () => {
//   const { pdfFormData, setPdfFormData } = useServicesContext();
//   const dispatch = useDispatch();
//   const fileInputRef = useRef(null);

//   const [showPassword, setShowPassword] = useState(false);
//   const [showPreviewModal, setShowPreviewModal] = useState(false);
//   const [totalSize, setTotalSize] = useState(0);
//   const [sizeWarning, setSizeWarning] = useState("");

//   // 👇 Set user plan here (later fetch from auth)
//   const userPlan = "Basic";

//   const planLimits = {
//     Basic: 1 * 1024 * 1024 * 1024,
//     Starter: 2 * 1024 * 1024 * 1024,
//     Pro: 3 * 1024 * 1024 * 1024,
//     Advanced: 4 * 1024 * 1024 * 1024,
//     Ultima: 5 * 1024 * 1024 * 1024,
//   };

//   const getPlanErrorMessage = (size) => {
//     const maxAllowed = planLimits[userPlan];

//     if (size <= maxAllowed) return "";

//     const totalReadable = formatBytes(size);
//     const currentReadable = formatBytes(maxAllowed);

//     const nextPlan = Object.entries(planLimits).find(([_, limit]) => size <= limit);

//     let msg = `🚫 Total file size (${totalReadable}) exceeds your ${userPlan} plan (${currentReadable}).`;
//     if (nextPlan) {
//       msg += ` Please upgrade to the ${nextPlan[0]} plan (${formatBytes(nextPlan[1])}).`;
//     } else {
//       msg += ` Even the highest plan cannot support this upload.`;
//     }
//     return msg;
//   };

//   const formatBytes = (bytes) => {
//     if (!bytes) return "0 Bytes";
//     const k = 1024;
//     const sizes = ["Bytes", "KB", "MB", "GB"];
//     const i = Math.floor(Math.log(bytes) / Math.log(k));
//     return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
//   };

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;

//     if (name === "file" && files.length) {
//       const newFiles = Array.from(files);
//       const updatedFiles = [...(pdfFormData.file || []), ...newFiles];
//       const updatedSize = updatedFiles.reduce((acc, f) => acc + f.size, 0);

//       setTotalSize(updatedSize);
//       setSizeWarning(getPlanErrorMessage(updatedSize));

//       setPdfFormData((prev) => ({
//         ...prev,
//         file: updatedFiles,
//       }));
//     } else {
//       setPdfFormData((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // if (!pdfFormData.title || !pdfFormData.file?.length) {
//     //   toast.error("Title and at least one file are required!");
//     //   return;
//     // }

//     if (sizeWarning) {
//       toast.error("Please resolve size warning before submitting.");
//       return;
//     }

//     setShowPreviewModal(true);
//   };

//   const confirmUpload = async () => {
//     const formData = new FormData();
//     formData.append("title", pdfFormData.title);
//     formData.append("description", pdfFormData.description);
//     formData.append("password", pdfFormData.password);

//     if (Array.isArray(pdfFormData.file)) {
//       pdfFormData.file.forEach((file) => {
//         formData.append("file", file);
//       });
//     }

//     try {
//       const res = await axios.post("/api/services/pdf", formData);
//       if (res.data.success) {
//         dispatch(setPDFServices(res.data.pdfData));
//         toast.success("✅ File(s) uploaded successfully!");
//         setPdfFormData({ title: "", description: "", password: "", file: [] });
//         setTotalSize(0);
//         setSizeWarning("");
//         if (fileInputRef.current) fileInputRef.current.value = "";
//         setShowPreviewModal(false);
//       } else {
//         toast.error(res.data.error || "Upload failed");
//       }
//     } catch (error) {
//       toast.error("❌ Upload error");
//     }
//   };

//   return (
//     <>
//       <div className="max-w-2xl w-full p-6 bg-white shadow-lg rounded-xl">
//         <form onSubmit={handleSubmit} className="space-y-5">
//           {/* Title */}
//           <div>
//             <label className="text-sm font-semibold">Title</label>
//             <input
//               type="text"
//               name="title"
//               value={pdfFormData.title}
//               onChange={handleChange}
//               className="w-full border px-3 py-2 rounded-md text-sm"
//               placeholder="Enter title"
//             />
//           </div>

//           {/* Description */}
//           <div>
//             <label className="text-sm font-semibold">Description</label>
//             <textarea
//               name="description"
//               rows="2"
//               value={pdfFormData.description}
//               onChange={handleChange}
//               className="w-full border px-3 py-2 rounded-md text-sm"
//               placeholder="Write description"
//             />
//           </div>

//           {/* File Upload */}
//           <div>
//             <label className="text-sm font-semibold">Upload PDF Files</label>
//             <input
//               type="file"
//               name="file"
//               multiple
//               accept="application/pdf"
//               ref={fileInputRef}
//               onChange={handleChange}
//               className="w-full text-sm mt-1 border rounded-md px-3 py-2 file:mr-3 file:py-1 file:px-3 file:border-0 file:bg-teal-600 file:text-white hover:file:bg-teal-700"
//               required
//             />

//             {/* Total Size */}
//             {totalSize > 0 && (
//               <p className="text-xs text-gray-600 mt-1">
//                 📦 Total Size: {formatBytes(totalSize)}
//               </p>
//             )}

//             {/* Size Error */}
//             {sizeWarning && (
//               <p className="text-sm text-red-600 mt-1">{sizeWarning}</p>
//             )}

//             {/* File List */}
//             {Array.isArray(pdfFormData.file) && pdfFormData.file.length > 0 && (
//               <div className="mt-3 space-y-2">
//                 {pdfFormData.file.map((f, i) => (
//                   <div
//                     key={i}
//                     className="flex justify-between items-center bg-gray-100 px-3 py-2 rounded-md text-sm"
//                   >
//                     <div>
//                       <p className="truncate">{f.name}</p>
//                       <p className="text-xs text-gray-500">
//                         📄 {formatBytes(f.size)}
//                       </p>
//                     </div>
//                     <button
//                       type="button"
//                       onClick={() => {
//                         const updatedFiles = [...pdfFormData.file];
//                         updatedFiles.splice(i, 1);
//                         const updatedSize = updatedFiles.reduce((acc, f) => acc + f.size, 0);

//                         setTotalSize(updatedSize);
//                         setSizeWarning(getPlanErrorMessage(updatedSize));

//                         if (updatedFiles.length === 0 && fileInputRef.current) {
//                           fileInputRef.current.value = "";
//                         }

//                         setPdfFormData((prev) => ({
//                           ...prev,
//                           file: updatedFiles,
//                         }));
//                       }}
//                       className="text-red-600 text-lg"
//                     >
//                       ❌
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Password */}
//           <div>
//             <label className="text-sm font-semibold">Password</label>
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 value={pdfFormData.password}
//                 onChange={handleChange}
//                 className="w-full border px-3 py-2 rounded-md text-sm"
//                 placeholder="password"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
//               >
//                 {showPassword ? <FiEyeOff /> : <FiEye />}
//               </button>
//             </div>
//           </div>

//           {/* NFC Modal */}
//           <NFCModal />

//           {/* Submit */}
//           <button
//             type="submit"
//             className="w-full cursor-pointer bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-md text-sm font-semibold"
//           >
//             Submit
//           </button>
//         </form>
//       </div>

//       {/* Preview Modal */}
//       {showPreviewModal && (
//   <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/30">
//     <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-xl border border-teal-200 mx-4 sm:mx-auto">
//       <h2 className="text-2xl text-center text-mainGreen font-bold">📄 Confirm Your Submission</h2>

//       <div className="space-y-2 text-sm text-gray-800 mt-4">
//         {pdfFormData.title && (
//           <p>
//             <strong>Title:</strong> {pdfFormData.title}
//           </p>
//         )}
//         {pdfFormData.description && (
//           <p>
//             <strong>Description:</strong> {pdfFormData.description}
//           </p>
//         )}
//         {pdfFormData.password && (
//           <p>
//             <strong>Password:</strong> {pdfFormData.password}
//           </p>
//         )}
//         {Array.isArray(pdfFormData.file) && pdfFormData.file.length > 0 && (
//           <div>
//             <p className="font-semibold mb-1"> Uploaded Files:</p>
//             <ul className="list-disc list-inside text-gray-700 space-y-1">
//               {pdfFormData.file.map((f, i) => (
//                 <li key={i} className="break-all list-none pb-2">
//                   <a
//                     href={URL.createObjectURL(f)}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-blue-600 underline"
//                   >
//                     {f.name}
//                   </a>{" "}
//                   — {formatBytes(f.size)}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>

//       <div className="flex justify-end gap-3 pt-4">
//         <button
//           onClick={() => setShowPreviewModal(false)}
//           className="px-4 py-1.5 border rounded-lg text-sm"
//         >
//           Back
//         </button>
//         <button
//           onClick={confirmUpload}
//           className="px-4 py-1.5 bg-teal-600 text-white rounded-lg text-sm"
//         >
//           Confirm & Upload
//         </button>
//       </div>
//     </div>
//   </div>
// )}

//     </>
//   );
// };

// export default PDFContent;



// "use client";
// import { useState, useRef } from "react"; // ← include useRef
// import { useRouter } from "next/navigation";
// import { FiEye, FiEyeOff } from "react-icons/fi";
// import useServicesContext from "@/components/hooks/useServiceContext";
// import NFCModal from "@/components/modalPopUps/nfcModal";
// import axios from "axios";
// import { toast } from "react-hot-toast";
// import { useDispatch, useSelector } from "react-redux";
// import { setPDFServices } from "@/redux/slices/servicesSlice";

// const PDFContent = () => {
//   const { pdfFormData, setPdfFormData } = useServicesContext();
//   const [showPassword, setShowPassword] = useState(false);

//   const pdfData = useSelector((state) => state?.services?.pdfServiceData)
//   console.log('redux data',pdfData)

//   const dispatch = useDispatch()
//   const router = useRouter();

//   // 👇 Ref to reset file input
//   const fileInputRef = useRef(null);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setPdfFormData((prev) => ({
//       ...prev,
//       [name]: files ? files[0] : value,
//     }));
//   };




//   const handleSubmit = async (e) => {
//     console.log('submit')

//     e.preventDefault()
//     const formData = new FormData();
//     formData.append("title", pdfFormData.title);
//     formData.append("description", pdfFormData.description);
//     formData.append("password", pdfFormData.password);
//     if (pdfFormData.file) {
//       formData.append("file", pdfFormData.file);
//     }
//     console.log('submit', formData)
//     try {
//       const response = await axios.post("http://localhost:3000/api/services/pdf", formData); // ✅ Make sure it's a valid API path
//       console.log('submit', response)
//       if (response.data.success) {
//         dispatch(setPDFServices(response.data.fileData));
//         toast.success("✅ File uploaded successfully!");


//         // Reset form
//         setPdfFormData({
//           title: "",
//           description: "",
//           password: "",
//           file: null,
//         });

//         if (fileInputRef.current) fileInputRef.current.value = "";
//       } else {
//         toast.error("❌ Upload failed: " + response.data.error);
//       }
//     } catch (error) {
//       const errMsg =
//         error?.response?.data?.error || "An unexpected error occurred.";
//       toast.error(`❌ ${errMsg}`);
//       console.error("Submit Error:", error);
//     }
//   };





//   return (
//     <>
//       <div className="flex w-full max-w-3xl gap-6">
//         <div className="flex-1 bg-white shadow-lg rounded-2xl p-6 space-y-5 max-h-[650px] overflow-auto">
//           <form className="space-y-4" >
//             {/* Title */}
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-1">
//                 Title
//               </label>
//               <input
//                 type="text"
//                 name="title"
//                 value={pdfFormData.title}
//                 onChange={handleChange}
//                 placeholder="Enter PDF title"
//                 className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
//               />
//             </div>

//             {/* Description */}
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-1">
//                 Description
//               </label>
//               <textarea
//                 name="description"
//                 rows="2"
//                 value={pdfFormData.description}
//                 onChange={handleChange}
//                 placeholder="Enter description"
//                 className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
//               />
//             </div>

//             {/* PDF File Upload */}
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-1">
//                 Choose PDF File
//               </label>
//               <input
//                 ref={fileInputRef}
//                 type="file"
//                 name="file"
//                 accept="application/pdf"
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 cursor-pointer border border-gray-300 rounded-lg text-sm file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:bg-teal-600 file:text-white hover:file:bg-teal-700"
//               />

//               {pdfFormData.file && (
//                 <div className="mt-2 flex items-center justify-between bg-gray-100 px-3 py-2 text-sm">
//                   <span className="truncate">{pdfFormData.file.name}</span>
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setPdfFormData((prev) => ({ ...prev, file: null }));
//                       if (fileInputRef.current) {
//                         fileInputRef.current.value = ""; // 👈 reset file input
//                       }
//                     }}
//                     className="text-red-600 text-sm cursor-pointer"
//                   >
//                     ❌
//                   </button>
//                 </div>
//               )}
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
//                   value={pdfFormData.password}
//                   onChange={handleChange}
//                   placeholder="Enter password"
//                   className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 focus:outline-none"
//                 >
//                   {showPassword ? <FiEye size={18} /> : <FiEyeOff size={18} />}
//                 </button>
//               </div>
//             </div>

//             {/* NFC Modal */}
//             <NFCModal />

//             {/* Submit */}
//             <button
//               type="submit"
//               onClick={handleSubmit}
//               className="w-full cursor-pointer bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-lg font-semibold text-sm transition"
//             >
//               Submit
//             </button>
//           </form>
//         </div>
//       </div>

// {pdfData?.title && (
//   <div className="mt-8 space-y-4">
//     <h2 className="text-lg font-semibold text-gray-800">Uploaded PDF</h2>
//     <div className="p-4 border border-gray-200 rounded-lg shadow-sm bg-gray-50">
//       <div className="flex justify-between items-center">
//         <div>
//           <p className="font-medium text-sm text-gray-900">📄 {pdfData.title}</p>
//           <p className="text-xs text-gray-500 mt-1">{pdfData.description}</p>
//    <iframe
//  src={`${pdfData.pdfFileName}?fl_attachment:false`}
//   width="100%"
//   height="60px"
//   title="PDF Viewer"
// />

// {/* <a
//   href={pdfData.pdfFileName}
//   target="_blank"
//   rel="noopener noreferrer"
//   className="text-teal-600 text-sm font-medium hover:underline"
// >
//   Open in New Tab
// </a> */}



//     <p className="text-xs text-gray-400 mt-1">🔐 {pdfData.password}</p>
//         </div>
       
//      <a
//   href={pdfData.pdfFileName}
//   target="_blank"
//   rel="noopener noreferrer"
//   className="text-teal-600 text-sm font-medium hover:underline"
// >
//   View PDF
// </a>





//       </div>
//     </div>
//   </div>
// )}



// {/* {pdfData.title} */}

//       {/* <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/30">
//         <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full border border-teal-200 relative">
        
          
//         </div>
//       </div> */}
//     </>
//   );
// };

// export default PDFContent;

// "use client";
// import { useState, useRef } from "react";
// import { useRouter } from "next/navigation";
// import { FiEye, FiEyeOff } from "react-icons/fi";
// import useServicesContext from "@/components/hooks/useServiceContext";
// import NFCModal from "@/components/modalPopUps/nfcModal";
// import axios from "axios";
// import { toast } from "react-hot-toast";
// import { useDispatch, useSelector } from "react-redux";
// import { setPDFServices } from "@/redux/slices/servicesSlice";

// const PDFContent = () => {
//   const { pdfFormData, setPdfFormData } = useServicesContext();
//   const [showPassword, setShowPassword] = useState(false);

//   const [showPreviewModal, setShowPreviewModal] = useState(false);
// const [previewFile, setPreviewFile] = useState(null); // for blob URL before upload


//   const pdfData = useSelector((state) => state?.services?.pdfServiceData);
//   console.log("redux data", pdfData);


//   const [showConfirmModal, setShowConfirmModal] = useState(false);
//   const [pdfPreviewUrl, setPdfPreviewUrl] = useState(null);


//   //const pdfData = useSelector((state) => state?.services?.pdfServiceData);

//   const dispatch = useDispatch();
//   const router = useRouter();
//   const fileInputRef = useRef(null);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (files && files[0] && name === "file") {
//     const file = files[0];
//     const previewUrl = URL.createObjectURL(file);
//     setPdfPreviewUrl(previewUrl);
//   }
//     setPdfFormData((prev) => ({
//       ...prev,
//       [name]: files ? files[0] : value,
//     }));
//   };


//   const handleSubmit = (e) => {
//   e.preventDefault();

//   // show modal instead of uploading
//   if (pdfFormData.file) {
//     const blobURL = URL.createObjectURL(pdfFormData.file);
//     setPreviewFile(blobURL);
//   }

//   setShowPreviewModal(true); // open modal
// };
// const confirmUpload = async () => {
//   const formData = new FormData();
//   formData.append("title", pdfFormData.title);
//   formData.append("description", pdfFormData.description);
//   formData.append("password", pdfFormData.password);
//   if (pdfFormData.file) {
//     formData.append("file", pdfFormData.file);
//   }

//   try {
//     const response = await axios.post("/api/services/pdf", formData);
//     if (response.data.success) {
//       dispatch(setPDFServices(response.data.fileData));
//       toast.success("✅ File uploaded successfully!");
//       setPdfFormData({
//         title: "",
//         description: "",
//         password: "",
//         file: null,
//       });
//       if (fileInputRef.current) fileInputRef.current.value = "";
//       setShowPreviewModal(false); // close modal
//     } else {
//       toast.error("❌ Upload failed: " + response.data.error);
//     }
//   } catch (error) {
//     const errMsg = error?.response?.data?.error || "Unexpected error";
//     toast.error(`❌ ${errMsg}`);
//   }
// };


//   // const handleSubmit = async (e) => {
//   //   console.log("submit");

//   //   e.preventDefault();
//   //   const formData = new FormData();
//   //   formData.append("title", pdfFormData.title);
//   //   formData.append("description", pdfFormData.description);
//   //   formData.append("password", pdfFormData.password);
//   //   if (pdfFormData.file) {
//   //     formData.append("file", pdfFormData.file);
//   //   }
//   //   console.log("submit", formData);
//   //   try {
//   //     const response = await axios.post(
//   //       "http://localhost:3000/api/services/pdf",
//   //       formData
//   //     ); // ✅ Make sure it's a valid API path
//   //     console.log("submit", response);
//   //     if (response.data.success) {
//   //       dispatch(setPDFServices(response.data.fileData));
//   //       toast.success("✅ File uploaded successfully!");

//   //       // Reset form
//   //       setPdfFormData({
//   //         title: "",
//   //         description: "",
//   //         password: "",
//   //         file: null,
//   //       });

//   //       if (fileInputRef.current) fileInputRef.current.value = "";
//   //     } else {
//   //       toast.error("❌ Upload failed: " + response.data.error);
//   //     }
//   //   } catch (error) {
//   //     const errMsg =
//   //       error?.response?.data?.error || "An unexpected error occurred.";
//   //     toast.error(`❌ ${errMsg}`);
//   //     console.error("Submit Error:", error);
//   //   }
//   // };

//   // Step 1: First submit triggers confirmation modal
//   const handleInitialSubmit = (e) => {
//     e.preventDefault();
//     setShowConfirmModal(true);
//   };

//   // Step 2: Final submission on confirmation
//   const handleConfirmedSubmit = async () => {
//     const formData = new FormData();
//     formData.append("title", pdfFormData.title);
//     formData.append("description", pdfFormData.description);
//     formData.append("password", pdfFormData.password);
//     if (pdfFormData.file) {
//       formData.append("file", pdfFormData.file);
//     }

//     try {
//       const response = await axios.post("http://localhost:3000/api/services/pdf", formData);
//       if (response.data.success) {
//         dispatch(setPDFServices(response.data.fileData));
//         toast.success("✅ File uploaded successfully!");
//         setShowConfirmModal(false);

//         // Reset form
//         setPdfFormData({
//           title: "",
//           description: "",
//           password: "",
//           file: null,
//         });
//         if (fileInputRef.current) fileInputRef.current.value = "";
//       } else {
//         toast.error("❌ Upload failed: " + response.data.error);
//       }
//     } catch (error) {
//       const errMsg = error?.response?.data?.error || "An unexpected error occurred.";
//       toast.error(`❌ ${errMsg}`);
//       console.error("Submit Error:", error);
//     }
//   };


//   return (
//     <>
//       <div className="flex w-full max-w-3xl gap-6">
//         <div className="flex-1 bg-white shadow-lg rounded-2xl p-6 space-y-5 max-h-[650px] overflow-auto">

//           <form className="space-y-4" onSubmit={handleInitialSubmit}>

//             {/* Title */}
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-1">Title</label>
//               <input
//                 type="text"
//                 name="title"
//                 value={pdfFormData.title}
//                 onChange={handleChange}
//                 placeholder="Enter PDF title"
//                 className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
//               />
//             </div>

//             {/* Description */}
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
//               <textarea
//                 name="description"
//                 rows="2"
//                 value={pdfFormData.description}
//                 onChange={handleChange}
//                 placeholder="Enter description"
//                 className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
//               />
//             </div>

//             {/* PDF File Upload */}
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-1">Choose PDF File</label>
//               <input
//                 ref={fileInputRef}
//                 type="file"
//                 name="file"
//                 accept="application/pdf"
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 cursor-pointer border border-gray-300 rounded-lg text-sm file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:bg-teal-600 file:text-white hover:file:bg-teal-700"
//               />
//               {pdfFormData.file && (
//                 <div className="mt-2 flex items-center justify-between bg-gray-100 px-3 py-2 text-sm">
//                   <span className="truncate">{pdfFormData.file.name}</span>
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setPdfFormData((prev) => ({ ...prev, file: null }));
//                       if (fileInputRef.current) {
//                         fileInputRef.current.value = "";
//                       }
//                     }}
//                     className="text-red-600 text-sm cursor-pointer"
//                   >
//                     ❌
//                   </button>
//                 </div>
//               )}
//             </div>

//             {/* Password */}
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   name="password"
//                   value={pdfFormData.password}
//                   onChange={handleChange}
//                   placeholder="Enter password"
//                   className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 focus:outline-none"
//                 >
//                   {showPassword ? <FiEye size={18} /> : <FiEyeOff size={18} />}
//                 </button>
//               </div>
//             </div>

//             <NFCModal />

//             {/* Submit */}
//             <button
//               type="submit"
//               className="w-full cursor-pointer bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-lg font-semibold text-sm transition"
//             >
//               Submit
//             </button>
//           </form>
//         </div>
//       </div>

//       {showPreviewModal && (
//    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/30">
//         <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full border border-teal-200 relative">
        
   
//       <h2 className="text-lg font-semibold">📄 Confirm Submission</h2>

//       <div className="space-y-1 text-sm text-gray-700">
//         <p><strong>Title:</strong> {pdfFormData.title}</p>
//         <p><strong>Description:</strong> {pdfFormData.description}</p>
//         <p><strong>Password:</strong> {pdfFormData.password}</p>
//         {previewFile && (
//           <a
//             href={previewFile}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-teal-600 underline text-sm"
//           >
//             🔗 Open Selected File
//           </a>
//         )}
//       </div>

//       <div className="flex justify-end gap-3 pt-4">
//         <button
//           onClick={() => setShowPreviewModal(false)}
//           className="px-4 py-1.5 rounded-lg text-sm border border-gray-300 text-gray-700 hover:bg-gray-100"
//         >
//           Back
//         </button>
//         <button
//           onClick={confirmUpload}
//           className="px-4 py-1.5 rounded-lg text-sm bg-teal-600 text-white hover:bg-teal-700"
//         >
//           Confirm & Submit
//         </button>
//       </div>
//     </div>
//   </div>
// )}


//       {/* {pdfData.title} */}

//       {/* <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/30">
// =======
//       {/* Confirmation Modal */}
//       {showConfirmModal && (
//          <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/30">

//         <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full border border-teal-200 relative">
        
//             <h2 className="text-lg font-semibold text-gray-800">Confirm Submission</h2>
//             <div className="text-sm text-gray-700 space-y-2">
//               <p><strong>Title:</strong> {pdfFormData.title}</p>
//               <p><strong>Description:</strong> {pdfFormData.description}</p>
//               <p><strong>Password:</strong> {pdfFormData.password}</p>
//             <p><strong>File:</strong> {pdfFormData.file ? (
//               <a
//                 href={pdfPreviewUrl}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-teal-600 underline hover:text-teal-800"
//               >
//                 {pdfFormData.file.name} 🔗
//               </a>
//             ) : (
//               "No file selected"
//             )}</p>
              
//             </div>
//             <div className="flex justify-end gap-4 pt-4">
//               <button
//                 onClick={() => setShowConfirmModal(false)}
//                 className="px-4 py-2 rounded-lg text-gray-600 border border-gray-300 hover:bg-gray-100"
//               >
//                 Back
//               </button>
//               <button
//                 onClick={handleConfirmedSubmit}
//                 className="px-4 py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700"
//               >
//                 Confirm Submit
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

    
//     </>
//   );
// };

// export default PDFContent;
