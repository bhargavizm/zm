import { useDispatch } from "react-redux";
import useServicesContext from "@/components/hooks/useServiceContext";
import EncryptedServicesForm from "../common/encryptedServicesForm";
import { setAudioServices } from "@/redux/slices/encryptedServicesSlice";

const AudioContent = () => {
  const { audioFormData, setAudioFormData } = useServicesContext();
  const dispatch = useDispatch();

  return (
    <div className="max-w-2xl w-full p-6 bg-white shadow-lg rounded-xl">
      <EncryptedServicesForm
        formData={audioFormData}
        setFormData={setAudioFormData}
        apiRoute="/api/encryptedServices/audio"
        reduxAction={setAudioServices}
        dispatch={dispatch}
        accept="audio/*"
        titleLabel="Audio Title"
        fileLabel="Upload Audio Files"

        renderPreview={(file) => (
          <audio
            controls
            className="w-full mt-1"
            src={URL.createObjectURL(file)}
          />
        )}
        successMessage="✅ Audio files uploaded successfully"
      />
    </div>
  );
};

export default AudioContent;


// "use client";

// import { useState, useRef } from "react";
// import { useRouter } from "next/navigation";
// import { FiEye, FiEyeOff } from "react-icons/fi";
// import { toast } from "react-hot-toast";
// import useServicesContext from "@/components/hooks/useServiceContext";
// import NFCModal from "@/components/modalPopUps/nfcModal";
// import { useDispatch } from "react-redux";
// import { setAudioServices } from "@/redux/slices/servicesSlice";

// const AudioContent = () => {
//   const { audioFormData, setAudioFormData } = useServicesContext();
//   const [showPassword, setShowPassword] = useState(false);
//   const [showPreviewModal, setShowPreviewModal] = useState(false);
//   const [totalSize, setTotalSize] = useState(0);
//   const [sizeWarning, setSizeWarning] = useState("");

//   const fileInputRef = useRef(null);
//   const dispatch = useDispatch()

//   // Hardcoded user plan — replace with auth later
//   const userPlan = "Basic";
//   const planLimits = {
//     Basic: 1 * 1024 * 1024 * 1024,
//     Starter: 2 * 1024 * 1024 * 1024,
//     Pro: 3 * 1024 * 1024 * 1024,
//   };

//   const formatBytes = (bytes) => {
//     if (!bytes) return "0 Bytes";
//     const k = 1024;
//     const sizes = ["Bytes", "KB", "MB", "GB"];
//     const i = Math.floor(Math.log(bytes) / Math.log(k));
//     return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
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

// const allowedAudioTypes = [
//   "audio/mpeg",
//   "audio/mp3",
//   "audio/wav",
//   "audio/x-wav",
//   "audio/ogg",
//   "audio/webm",
// ];

// const handleChange = (e) => {
//   const { name, value, files } = e.target;

//   if (name === "file" && files.length) {
//     const newFiles = Array.from(files);

//     // ✅ Validate types
//     const invalidFiles = newFiles.filter((f) => !allowedAudioTypes.includes(f.type));
//     if (invalidFiles.length) {
//       toast.error(`🚫 Invalid file(s): ${invalidFiles.map((f) => f.name).join(", ")}`);
//       return;
//     }

//     const updatedFiles = [...(audioFormData.file || []), ...newFiles];
//     const updatedSize = updatedFiles.reduce((acc, f) => acc + f.size, 0);

//     setTotalSize(updatedSize);
//     setSizeWarning(getPlanErrorMessage(updatedSize));

//     setAudioFormData((prev) => ({
//       ...prev,
//       file: updatedFiles,
//     }));
//   } else {
//     setAudioFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   }
// };


//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // if (!audioFormData.title || !audioFormData.file?.length) {
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
//     formData.append("title", audioFormData.title);
//     formData.append("description", audioFormData.description);
//     formData.append("password", audioFormData.password);

//     if (Array.isArray(audioFormData.file)) {
//       audioFormData.file.forEach((file) => {
//         formData.append("file", file);
//       });
//     }

//     try {
//       const res = await fetch("/api/services/audio", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await res.json();
// console.log("Upload response:", data);
//       if (data.success) {
//         dispatch(setAudioServices(data?.audioData))
//         toast.success("✅ Audio files uploaded successfully!");
//         setAudioFormData({ title: "", description: "", password: "", file: [] });
//         setTotalSize(0);
//         setSizeWarning("");
//         if (fileInputRef.current) fileInputRef.current.value = "";
//         setShowPreviewModal(false);
//         //router.push("/preview");
//       } else {
//         toast.error(data.error || "Upload failed");
//       }
//     } catch (err) {
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
//               value={audioFormData.title}
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
//               value={audioFormData.description}
//               onChange={handleChange}
//               className="w-full border px-3 py-2 rounded-md text-sm"
//               placeholder="Write description"
//             />
//           </div>

//           {/* File Upload */}
//           <div>
//             <label className="text-sm font-semibold">Upload Audio Files</label>
//             <input
//               type="file"
//               name="file"
//               multiple
//               accept="audio/*"
//               ref={fileInputRef}
//               onChange={handleChange}
//               className="w-full text-sm mt-1 border rounded-md px-3 py-2 file:mr-3 file:py-1 file:px-3 file:border-0 file:bg-teal-600 file:text-white hover:file:bg-teal-700"
//               required
//             />

//             {totalSize > 0 && (
//               <p className="text-xs text-gray-600 mt-1">
//                 📦 Total Size: {formatBytes(totalSize)}
//               </p>
//             )}

//             {sizeWarning && (
//               <p className="text-sm text-red-600 mt-1">{sizeWarning}</p>
//             )}

//             {Array.isArray(audioFormData.file) && audioFormData.file.length > 0 && (
//               <div className="mt-3 space-y-2">
//                 {audioFormData.file.map((f, i) => (
//                   <div
//                     key={i}
//                     className="flex justify-between items-center bg-gray-100 px-3 py-2 rounded-md text-sm"
//                   >
//                     <div>
//                       <p className="truncate">{f.name}</p>
//                       <p className="text-xs text-gray-500">🎵 {formatBytes(f.size)}</p>
//                     </div>
//                     <button
//                       type="button"
//                       onClick={() => {
//                         const updatedFiles = [...audioFormData.file];
//                         updatedFiles.splice(i, 1);
//                         const updatedSize = updatedFiles.reduce((acc, f) => acc + f.size, 0);

//                         setTotalSize(updatedSize);
//                         setSizeWarning(getPlanErrorMessage(updatedSize));

//                         if (updatedFiles.length === 0 && fileInputRef.current) {
//                           fileInputRef.current.value = "";
//                         }

//                         setAudioFormData((prev) => ({
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
//                 value={audioFormData.password}
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

//           <NFCModal />

//           <button
//             type="submit"
//             className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-md text-sm font-semibold"
//           >
//             Submit
//           </button>
//         </form>
//       </div>

//       {/* Preview Modal */}
//       {showPreviewModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/30">
//           <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-xl border border-teal-200 mx-4 sm:mx-auto">
//             <h2 className="text-2xl text-center pb-6 text-mainGreen font-bold">🎧 Confirm Your Submission</h2>
//            {audioFormData.title && (
//   <p><strong>Title:</strong> {audioFormData.title}</p>
// )}

// {audioFormData.description && (
//   <p><strong>Description:</strong> {audioFormData.description}</p>
// )}

// {audioFormData.password && (
//   <p><strong>Password:</strong> {audioFormData.password}</p>
// )}


//             <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
//   {audioFormData.file.map((f, i) => (
//     <li key={i} className="break-all flex flex-col">
//       <span className="mb-1">🎵 {f.name} — {formatBytes(f.size)}</span>

//       {/* Audio player */}
//       <audio controls className="w-full mt-1">
//         <source src={URL.createObjectURL(f)} type={f.type || "audio/mpeg"} />
//         Your browser does not support the audio element.
//       </audio>
//     </li>
//   ))}
// </ul>


//             <div className="flex justify-end gap-3 pt-6">
//               <button
//                 onClick={() => setShowPreviewModal(false)}
//                 className="px-4 cursor-pointer py-1.5 border rounded-lg text-sm"
//               >
//                 Back
//               </button>
//               <button
//                 onClick={confirmUpload}
//                 className="px-4 cursor-pointer py-1.5 bg-teal-600 text-white rounded-lg text-sm"
//               >
//                 Confirm & Upload
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default AudioContent;



// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { FiEye, FiEyeOff } from "react-icons/fi";
// import useServicesContext from "@/components/hooks/useServiceContext";
// import NFCModal from "@/components/modalPopUps/nfcModal";
// import { useRef } from "react";

// const AudioContent = () => {
//   const {audioFormData, setAudioFormData } = useServicesContext();
//   const [showPassword, setShowPassword] = useState(false);
//   const router = useRouter();

//   const fileInputRef = useRef(null);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setAudioFormData((prev) => ({
//       ...prev,
//       [name]: files ? files[0] : value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!titleFormData.file) {
//       alert("Please select an audio file.");
//       return;
//     }

//     const data = {
//       title: audioFormData.title,
//       description: audioFormData.description,
//       fileName: audioFormData.file.name,
//       password: audioFormData.password,
//     };

//     localStorage.setItem("audioData", JSON.stringify(data));
//     router.push("/preview");
//   };

//   return (
//     <>
//     <div className="flex w-full max-w-3xl gap-6">
//       <div className="flex-1 bg-white shadow-lg rounded-2xl p-6 space-y-5 ">
//         <form className="space-y-4">
//           {/* Title Field */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-1">
//               Title
//             </label>
//             <input
//               type="text"
//               name="title"
//               value={audioFormData.title}
//               onChange={handleChange}
//               placeholder="Enter audio title"
//               className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
//             />
//           </div>

//           {/* Description Field */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-1">
//               Description
//             </label>
//             <textarea
//               name="description"
//               rows="2"
//               value={audioFormData.description}
//               onChange={handleChange}
//               placeholder="Enter description"
//               className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
//             />
//           </div>

//           {/* File Upload Field */}
//           {/* File Upload Field with Preview and Remove */}
// <div>
//   <label className="block text-sm font-semibold text-gray-700 mb-1">
//     Choose File
//   </label>
//   <input
//     ref={fileInputRef}
//     type="file"
//     name="file"
//     accept="audio/*"
//     onChange={handleChange}
//     className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:bg-teal-600 file:text-white hover:file:bg-teal-700 cursor-pointer"
//   />

//   {audioFormData.file && (
//     <div className="flex items-center justify-between mt-2 bg-gray-50 border border-gray-200 rounded px-3 py-2 text-sm">
//       <span className="truncate max-w-[80%]">{audioFormData.file.name}</span>
//       <button
//         type="button"
//         onClick={() => {
//           setAudioFormData((prev) => ({ ...prev, file: null }));
//           if (fileInputRef.current) {
//             fileInputRef.current.value = ""; // 👈 this clears the input
//           }
//         }}
//         className="text-red-600 hover:text-red-800 font-bold ml-4"
//         aria-label="Remove file"
//       >
//         ✕
//       </button>
//     </div>
//   )}
// </div>


//           {/* Password Field with Eye Icon */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-1">
//               Password
//             </label>
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 value={audioFormData.password}
//                 onChange={handleChange}
//                 placeholder="Enter password"
//                 className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 focus:outline-none"
//               >
//                 {showPassword ?  <FiEye size={18} /> : <FiEyeOff size={18} />}
//               </button>
//             </div>
//           </div>

//         <NFCModal/>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full cursor-pointer bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-lg font-semibold text-sm transition"
//           >
//             Submit
//           </button>
//         </form>
//       </div>
//     </div>
//     </>
//   );
// };

// export default AudioContent;
