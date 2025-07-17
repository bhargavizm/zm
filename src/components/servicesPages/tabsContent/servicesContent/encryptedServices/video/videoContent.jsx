
import useServicesContext from "@/components/hooks/useServiceContext";
import { useDispatch } from "react-redux";
import EncryptedServicesForm from "../common/encryptedServicesForm";
import { setVideoServices } from "@/redux/slices/encryptedServicesSlice";

const VideoContent = () => {
  const { videoFormData, setVideoFormData } = useServicesContext();
  const dispatch = useDispatch();

  return (
    <div className="max-w-2xl w-full p-6 bg-white shadow-lg rounded-xl">
      <EncryptedServicesForm
        formData={videoFormData}
        setFormData={setVideoFormData}
        apiRoute="/api/encryptedServices/video"
        reduxAction={setVideoServices}
        dispatch={dispatch}
          fileKey="file"
        accept="video/*" // Accepts any video format
        titleLabel="Video Title"
        fileLabel="Upload Video Files"
        successMessage="✅ Video files uploaded successfully"
        renderPreview={(file) => (
          <video
            controls
            className="w-full mt-2 rounded-md"
            src={URL.createObjectURL(file)}
          />
        )}
      />
    </div>
  );
};

export default VideoContent;



// "use client";

// import { useState, useRef } from "react";
// import { useRouter } from "next/navigation";
// import useServicesContext from "@/components/hooks/useServiceContext";
// import { FiEye, FiEyeOff } from "react-icons/fi";
// import NFCModal from "@/components/modalPopUps/nfcModal";

// const VideoContent = () => {
//   const { videoFormData, setVideoFormData } = useServicesContext();
//   const [showPassword, setShowPassword] = useState(false);
//   const router = useRouter();

//   // 👇 Add ref for file input
//   const fileInputRef = useRef(null);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setVideoFormData((prev) => ({
//       ...prev,
//       [name]: files ? files[0] : value,
//     }));
//   };

//   const handleFileRemove = () => {
//     setVideoFormData((prev) => ({ ...prev, file: null }));
//     if (fileInputRef.current) {
//       fileInputRef.current.value = ""; // 👈 Reset file input
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!videoFormData.file) {
//       alert("Please select a video file.");
//       return;
//     }

//     const data = {
//       title: videoFormData.title,
//       description: videoFormData.description,
//       fileName: videoFormData.file.name,
//       password: videoFormData.password,
//     };

//     localStorage.setItem("videoData", JSON.stringify(data));
//     router.push("/preview");
//   };

//   return (
//     <div className="flex w-full max-w-3xl gap-6">
//       <div className="flex-1 bg-white shadow-lg rounded-2xl p-6 space-y-5">
//         <form className="space-y-4" onSubmit={handleSubmit}>
//           {/* Title */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-1">
//               Title
//             </label>
//             <input
//               type="text"
//               name="title"
//               value={videoFormData.title}
//               onChange={handleChange}
//               placeholder="Enter video title"
//               className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
//             />
//           </div>

//           {/* Description */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-1">
//               Description
//             </label>
//             <textarea
//               name="description"
//               rows="2"
//               value={videoFormData.description}
//               onChange={handleChange}
//               placeholder="Enter description"
//               className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
//             />
//           </div>

//           {/* File Upload */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-1">
//               Choose Video File
//             </label>
//             <input
//               ref={fileInputRef}
//               type="file"
//               name="file"
//               accept="video/*"
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:bg-teal-600 file:text-white hover:file:bg-teal-700"
//             />
//             {videoFormData.file && (
//               <div className="mt-2 flex items-center justify-between bg-gray-100 px-3 py-2 rounded-md text-sm">
//                 <span className="truncate">{videoFormData.file.name}</span>
//                 <button
//                   type="button"
//                   onClick={handleFileRemove}
//                   className="text-red-600 cursor-pointer"
//                 >
//                   ❌
//                 </button>
//               </div>
//             )}
//           </div>

//           {/* Password */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-1">
//               Password
//             </label>
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 value={videoFormData.password}
//                 onChange={handleChange}
//                 placeholder="Enter password"
//                 className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 focus:outline-none"
//               >
//                 {showPassword ?  <FiEye size={18} /> :  <FiEyeOff size={18} />}
//               </button> 
//             </div>
//           </div>

//           {/* NFC Modal */}
//           <NFCModal />

//           {/* Submit */}
//           <button
//             type=""
//             className="w-full cursor-pointer bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-lg font-semibold text-sm transition"
//           >
//             Submit
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default VideoContent;
