"use client";

import { useState, useRef } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { toast } from "react-hot-toast";
import NFCModal from "@/components/modalPopUps/nfcModal";
import useDesignContext from "@/components/hooks/useDesignContext";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import useServicesContext from "@/components/hooks/useServiceContext";
import LoadingSpinner from "@/components/common/spinner";

const planPrices = {
  Basic: "₹999",
  Starter: "₹1799",
  Pro: "₹2499",
  Advanced: "₹2999",
  Ultima: "₹3299",
};

const planLimits = {
  Basic: 1 * 1024 * 1024 * 1024, // 1 GB
  Starter: 2 * 1024 * 1024 * 1024, // 2 GB
  Pro: 3 * 1024 * 1024 * 1024, // 3 GB
  Advanced: 4 * 1024 * 1024 * 1024, // 4 GB
  Ultima: 5 * 1024 * 1024 * 1024, // 5 GB
};

const getRequiredPlan = (size) => {
  const matchedPlan = Object.entries(planLimits).find(
    ([_, limit]) => size <= limit
  );
  return matchedPlan ? matchedPlan[0] : "Exceeds all plans";
};

const EncryptedServicesForm = ({
  formData,
  setFormData,
  apiRoute,
  reduxAction,
  dispatch,
  accept,
  userPlan = "Basic",
  titleLabel = "Title",
  fileLabel = "Upload Files",
   fileKey = "file",
  successMessage = "✅ Uploaded successfully",
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [totalSize, setTotalSize] = useState(0);
  const [sizeWarning, setSizeWarning] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const fileInputRef = useRef(null);
  const { servicesDataLoading, setServicesDataLoading } = useServicesContext();
  const { setActiveTab } = useDesignContext();
  const { slug } = useParams();

  const formatBytes = (bytes) => {
    if (!bytes) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getPlanErrorMessage = (size) => {
    const currentLimit = planLimits[userPlan];
    if (size <= currentLimit) return "";

    const totalReadable = formatBytes(size);
    const currentReadable = formatBytes(currentLimit);
    const nextPlan = Object.entries(planLimits).find(
      ([plan, limit]) => size <= limit
    );

    let msg = `🚫 Total size (${totalReadable}) exceeds your ${userPlan} plan (${currentReadable}).`;
    if (nextPlan) {
      msg += ` Please upgrade to ${nextPlan[0]} (${formatBytes(nextPlan[1])}).`;
    } else {
      msg += ` Even the highest plan (Ultima) cannot support this upload.`;
    }
    return msg;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "files" && files.length) {
      const newFiles = Array.from(files);
      const invalidFile = newFiles.find(
        (file) => accept && !file.type.match(accept)
      );
      if (invalidFile) {
        toast.error(`Unsupported file type: ${invalidFile.name}`);
        return;
      }

      const updatedFiles = [...(formData[fileKey] || []), ...newFiles];
      const updatedSize = updatedFiles.reduce((acc, f) => acc + f.size, 0);
      setTotalSize(updatedSize);
      const warning = getPlanErrorMessage(updatedSize);
      setSizeWarning(warning);
     setFormData((prev) => ({ ...prev, [fileKey]: updatedFiles }));

      if (warning) {
         setShowUpgradeModal(true); // show modal on exceeding plan
       }
    } else {
      // ✅ Add this block for other fields
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const confirmUpload = async () => {
    const fd = new FormData();
    // ✅ Always upload files under key "files"
    if (Array.isArray(formData[fileKey])) {
      formData[fileKey].forEach((f) => fd.append("files", f));
    }
    ["title", "description", "password"].forEach((key) => {
      if (formData[key]) fd.append(key, formData[key]);
    });

    setServicesDataLoading(true);

    try {
      const res = await fetch(apiRoute, {
        method: "POST",
        body: fd,
      });

      const data = await res.json();
      if (data.success) {
        dispatch(reduxAction(data));
        toast.success(successMessage);
        setActiveTab(slug, "QR Code");
        setFormData({ title: "", description: "", password: "", file: [] });
        setTotalSize(0);
        setSizeWarning("");
        fileInputRef.current && (fileInputRef.current.value = "");
        setShowConfirm(false);
      } else if (data.type === "upgrade") {
        toast((t) => <span>{data.error}</span>, { icon: "📈" });
      } else {
        toast.error(data.error || "Upload failed");
      }
    } catch (error) {
      toast.error(err?.response?.data?.error || "Something went wrong!");

        if (error.response?.status === 401) {
        window.location.href = "/login"; // ✅ Auto logout on expiry
        return;
      }
      
    } finally {
      setServicesDataLoading(false); // ✅ End loader
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const hasFiles = formData[fileKey]?.length > 0;
    if (!hasFiles) {
      toast.error("❌ Please upload at least one file.");
      return;
    }

    // if (sizeWarning) {
    //   setShowUpgradeModal(true);
    //   return;
    // }

    setShowConfirm(true);
  };

  return (
    <>
      {servicesDataLoading && <LoadingSpinner />}

      <div className="bg-white rounded-xl p-6 my-6">
        <form onSubmit={handleSubmit} className="space-y-4 ">
          {/* Title */}
          <div>
            <label className="text-sm font-semibold">{titleLabel}</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md text-sm"
              placeholder="Enter title"
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="text-sm font-semibold">{fileLabel}: {"       "}<span className="font-normal"> (Max File Size limit : 5 GB)</span></label>
            <div className="relative mt-1 w-full py-2 px-4 border">
              <input
                type="file"
                name="files"
                multiple
                ref={fileInputRef}
                onChange={handleChange}
                accept={accept}
                className="absolute inset-0 opacity-0 cursor-pointer z-10"
              />
              <button
                type="button"
                className="bg-teal-600  text-white text-sm px-4 py-2 rounded-md font-medium pointer-events-none"
              >
                Choose Files
              </button>
              <span className="ml-3 text-sm text-gray-500">
                {formData[fileKey]?.length > 0
                  ? `${formData[fileKey].length} file${
                      formData[fileKey].length > 1 ? "s" : ""
                    } selected`
                  : "No file selected"}
              </span>
            </div>

            {/* {totalSize > 0 && (
              <p className="text-sm mt-2 font-semibold text-teal-700">
                📦 Total Upload Size:{" "}
                <span className="font-bold">{formatBytes(totalSize)}</span>
              </p>
            )} */}
            {/* {sizeWarning && (
              <p className="text-sm text-red-600 mt-1">{sizeWarning}</p>
            )} */}

            {formData[fileKey]?.map((f, i) => (
              <div
                key={i}
                className="flex justify-between items-center bg-gray-100 px-3 py-2 mt-2 rounded-md text-sm"
              >
                <div>
                  <p className="truncate">{f.name}</p>
                  <p className="text-xs text-gray-500">{formatBytes(f.size)}</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const updatedFiles = [...formData[fileKey]];
                    updatedFiles.splice(i, 1);
                    const newSize = updatedFiles.reduce(
                      (acc, f) => acc + f.size,
                      0
                    );
                   setFormData((prev) => ({ ...prev, [fileKey]: updatedFiles }));
                    setTotalSize(newSize);
                    setSizeWarning(getPlanErrorMessage(newSize));
                    // if (!updatedFiles.length && fileInputRef.current) {
                    //   fileInputRef.current.value = "";
                    // }
                    //                     if (fileInputRef.current) {
                    //   fileInputRef.current.value = "";
                    // }
                  }}
                  className="text-red-600 cursor-pointer"
                >
                  ❌
                </button>
              </div>
            ))}
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-semibold">Description</label>
            <textarea
              name="description"
              rows="2"
              value={formData.description}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md text-sm text-black"
              placeholder="Enter description"
            />
          </div>

          {/* Password */}
          <div className="pb-6">
            <label className="text-sm font-semibold">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md text-sm"
                placeholder="Enter password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <FiEye /> : <FiEyeOff />}
              </button>
            </div>
          </div>

          <NFCModal />

          {/* Submit Button */}
          <div className="pt-6">
          <button
            type="submit"
            className="w-full cursor-pointer bg-teal-600 text-white py-2 rounded-md font-semibold"
          >
            Submit
          </button>
          </div>
        </form>
      </div>

      {/* Confirm Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/30">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-xl  overflow-y-auto scrollbar-hide p-6 border border-teal-200 mx-auto">
            {/* <div className="flex justify-between items-center pb-4"> */}
               <div className="text-right pb-2">
              {/* <button
                onClick={() => {
                  setShowConfirm(false);
                  setShowUpgradeModal(true);
                }}
                className="text-md  text-darkGreen hover:underline font-semibold hover:text-mainGreen cursor-pointer  transition"
              >
                ← Back to storage limit check
              </button> */}

              <button
                onClick={() => setShowConfirm(false)}
                className="text-md pb-2 cursor-pointer  text-gray-600 hover:text-red-600"
              >
                ❌
              </button>
            </div>
            <h2 className="text-2xl font-bold text-mainGreen text-center">
              Confirm Submission
            </h2>
            <div className="mt-4 space-y-2 text-lg text-gray-800">
              {formData.title && (
                <p>
                  <strong>Title:</strong> {formData.title}
                </p>
              )}
              {formData.description && (
                <p>
                  <strong>Description:</strong> {formData.description}
                </p>
              )}
              {formData.password && (
                <p>
                  <strong>Password:</strong> {formData.password}
                </p>
              )}

              <p className="pt-2 font-semibold">Uploaded Files:</p>
              {/* <ul className="list-none grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 mt-2">
                {formData[fileKey]?.map((f, i) => {
                  const previewUrl = URL.createObjectURL(f);
                  const fileType = f.type;
                  return (
                    <li key={i} className="relative group cursor-pointer">
                      <a
                        href={previewUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full h-24 border rounded-lg flex items-center justify-center bg-gray-100 overflow-hidden"
                      >
                        {fileType.startsWith("image") ? (
                          <img
                            src={previewUrl}
                            alt={f.name}
                            className="h-full w-full object-cover"
                          />
                        ) : fileType.startsWith("video") ? (
                          <video src={previewUrl} className="h-full" controls />
                        ) : fileType.startsWith("audio") ? (
                          <audio src={previewUrl} className="w-full" controls />
                        ) : (
                          <div className="text-center px-2 text-sm text-gray-700">
                            📄 {f.name}
                          </div>
                        )}
                      </a>
                      <p className="text-xs text-center mt-1 truncate">
                        {f.name}
                      </p>
                    </li>
                  );
                })}
              </ul> */}
              <ul className="list-none grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 mt-2">
  {formData[fileKey]?.map((f, i) => {
    const previewUrl = URL.createObjectURL(f);
    const fileType = f.type;

    const isImage = fileType.startsWith("image");
    const isVideo = fileType.startsWith("video");

    return (
      <li key={i} className="relative group cursor-pointer">
        {isImage || isVideo ? (
          <a
            href={previewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full h-24 border rounded-lg flex items-center justify-center bg-gray-100 overflow-hidden"
          >
            {isImage ? (
              <img
                src={previewUrl}
                alt={f.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <video src={previewUrl} className="h-full" controls />
            )}
          </a>
        ) : (
          <a
            href={previewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-300 underline text-sm"
          >
            📄 {f.name}
          </a>
        )}

        <p className="text-xs text-center mt-1 truncate">{f.name}</p>
      </li>
    );
  })}
</ul>

            </div>
            <div className="flex justify-end flex-wrap gap-3 pt-4 text-md">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-1.5 border rounded-lg cursor-pointer"
              >
                Back To Form
              </button>
              <button
                onClick={confirmUpload}
                className="px-4 py-1.5 bg-teal-600 text-white rounded-lg cursor-pointer"
              >
                Confirm & Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white relative rounded-xl p-6 w-full max-w-md shadow-xl border border-teal-200 animate-fade-in">
            {/* <button
              onClick={() => setShowUpgradeModal(false)}
              className="absolute cursor-pointer top-2 right-3 text-md pb-4 text-gray-600 hover:text-red-600"
            >
              ❌
            </button> */}

            <h2 className="text-xl font-bold text-center  text-red-600">
              ⚠️ Storage Limit 
            </h2>

            <div className="my-4 space-y-4 text-gray-800 text-md  leading-relaxed">
              <p>
                Your total upload size is <b>{formatBytes(totalSize)}</b>.
              </p>
              <p>{/* You are currently on the <b>{userPlan}</b> plan. */}</p>
              <p>
                You are currently on the {"  "}
                <b className="text-green-700">
                  {getRequiredPlan(totalSize)} Plan
                </b>
              </p>
            </div>

            <div className=" mt-4 text-end">
              {/* <button
          onClick={() => setShowUpgradeModal(false)}
          className="px-5 py-2 text-lg border rounded-lg"
        >
          Cancel
        </button> */}
              <button
                onClick={() => {
                  setShowUpgradeModal(false)
                }}
                className="px-5 py-2 bg-teal-600 text-white text-md rounded-lg hover:bg-teal-700 transition"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}



    </>
  );
};

export default EncryptedServicesForm;

// "use client";

// import { useState, useRef } from "react";
// import { FiEye, FiEyeOff } from "react-icons/fi";
// import { toast } from "react-hot-toast";
// import NFCModal from "@/components/modalPopUps/nfcModal";

// const planLimits = {
//   Basic: 1 * 1024 * 1024 * 1024,
//   Starter: 2 * 1024 * 1024 * 1024,
//   Pro: 3 * 1024 * 1024 * 1024,
//   Advanced: 4 * 1024 * 1024 * 1024,
//   Ultima: 5 * 1024 * 1024 * 1024,
// };

// const EncryptedServicesForm = ({
//   formData,
//   setFormData,
//   apiRoute,
//   reduxAction,
//   dispatch,
//   accept,
//   userPlan = "Basic",
//   titleLabel = "Title",
//   fileLabel = "Upload Files",
//   successMessage = "✅ Uploaded successfully",
// }) => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [totalSize, setTotalSize] = useState(0);
//   const [sizeWarning, setSizeWarning] = useState("");
//   const [showConfirm, setShowConfirm] = useState(false);
//   const fileInputRef = useRef(null);

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

//     let msg = `🚫 Total size (${totalReadable}) exceeds your ${userPlan} plan (${currentReadable}).`;
//     if (nextPlan) {
//       msg += ` Please upgrade to ${nextPlan[0]} (${formatBytes(nextPlan[1])}).`;
//     } else {
//       msg += ` Even the highest plan cannot support this upload.`;
//     }
//     return msg;
//   };

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;

//     if (name === "file" && files.length) {
//       const newFiles = Array.from(files);
//       const updatedFiles = [...(formData[fileKey] || []), ...newFiles];
//       const updatedSize = updatedFiles.reduce((acc, f) => acc + f.size, 0);

//       setTotalSize(updatedSize);
//       setSizeWarning(getPlanErrorMessage(updatedSize));

//       setFormData((prev) => ({ ...prev, file: updatedFiles }));
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const confirmUpload = async () => {
//     const fd = new FormData();
//     Object.entries(formData).forEach(([key, value]) => {
//       if (key === "file" && Array.isArray(value)) {
//         value.forEach((f) => fd.append("file", f));
//       } else {
//         fd.append(key, value);
//       }
//     });

//     try {
//       const res = await fetch(apiRoute, {
//         method: "POST",
//         body: fd,
//       });

//       const data = await res.json();
//       if (data.success) {
//         dispatch(
//           reduxAction(
//             data?.pdfData ||
//               data?.videoData ||
//               data?.audioData ||
//               data?.galleryData
//           )
//         );
//         toast.success(successMessage);
//         setFormData({ title: "", description: "", password: "", file: [] });
//         setTotalSize(0);
//         setSizeWarning("");
//         if (fileInputRef.current) fileInputRef.current.value = "";
//         setShowConfirm(false);
//       } else {
//         toast.error(data.error || "Upload failed");
//       }
//     } catch (error) {
//       toast.error("❌ Upload error");
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const { title, description, password, file } = formData;
//     const allEmpty =
//       (!title?.trim() && !description?.trim() && !password?.trim()) ||
//       !file?.length;

//     if (allEmpty) {
//       toast.error("❌ Please fill in at least one field before submitting.");
//       return;
//     }

//     if (sizeWarning) {
//       toast.error("❌ File size exceeds your plan limit.");
//       return;
//     }

//     setShowConfirm(true);
//   };

//   return (
//     <>
//       <div className="bg-white rounded-xl p-6 shadow-lg">
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Title */}
//           <div>
//             <label className="text-sm font-semibold">{titleLabel}</label>
//             <input
//               type="text"
//               name="title"
//               value={formData.title}
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
//               value={formData.description}
//               onChange={handleChange}
//               className="w-full border px-3 py-2 rounded-md text-sm"
//               placeholder="Enter description"
//             />
//           </div>

//           {/* File Upload */}
//           <div>
//             <label className="text-sm font-semibold">{fileLabel}</label>
//             <input
//               type="file"
//               name="file"
//               multiple
//               ref={fileInputRef}
//               onChange={handleChange}
//               accept={accept}
//               className="w-full mt-1 text-sm border px-4 py-2 file:bg-teal-600 file:text-white file:px-3 file:py-1 file:rounded-md"
//             />

//             {totalSize > 0 && (
//               <p className="text-xs mt-1">📦 Total Size: {formatBytes(totalSize)}</p>
//             )}
//             {sizeWarning && (
//               <p className="text-sm text-red-600">{sizeWarning}</p>
//             )}

//             {/* File List */}
//             {Array.isArray(formData[fileKey]) &&
//               formData[fileKey].map((f, i) => (
//                 <div
//                   key={i}
//                   className="flex justify-between items-center bg-gray-100 px-3 py-2 mt-2 rounded-md text-sm"
//                 >
//                   <div>
//                     <p className="truncate">{f.name}</p>
//                     <p className="text-xs text-gray-500">{formatBytes(f.size)}</p>
//                   </div>
//                   <button
//                     type="button"
//                     onClick={() => {
//                       const newFiles = [...formData[fileKey]];
//                       newFiles.splice(i, 1);
//                       const updatedSize = newFiles.reduce(
//                         (acc, f) => acc + f.size,
//                         0
//                       );
//                       setFormData((prev) => ({ ...prev, file: newFiles }));
//                       setTotalSize(updatedSize);
//                       setSizeWarning(getPlanErrorMessage(updatedSize));
//                       if (
//                         newFiles.length === 0 &&
//                         fileInputRef.current
//                       )
//                         fileInputRef.current.value = "";
//                     }}
//                     className="text-red-600"
//                   >
//                     ❌
//                   </button>
//                 </div>
//               ))}
//           </div>

//           {/* Password */}
//           <div>
//             <label className="text-sm font-semibold">Password</label>
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 className="w-full border px-3 py-2 rounded-md text-sm"
//                 placeholder="Enter password"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
//               >
//                 {showPassword ? <FiEye /> : <FiEyeOff />}
//               </button>
//             </div>
//           </div>

//           <NFCModal />

//           {/* Submit */}
//           <button
//             type="submit"
//             className="w-full cursor-pointer bg-teal-600 text-white py-2 rounded-md font-semibold"
//           >
//             Submit
//           </button>
//         </form>
//       </div>

//       {/* Confirm Modal */}
//       {showConfirm && (
//          <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/30">
//     <div className="bg-white rounded-xl shadow-xl  w-full max-w-4xl max-h-[80vh] overflow-y-auto scrollbar-hide p-9 border border-teal-200 mx-auto">
//             <h2 className="text-2xl font-bold text-mainGreen text-center">
//               Confirm Submission
//             </h2>
//             <div className="mt-4 space-y-1 text-sm text-gray-800">
//               {formData.title && (
//                 <p>
//                   <strong>Title:</strong> {formData.title}
//                 </p>
//               )}
//               {formData.description && (
//                 <p>
//                   <strong>Description:</strong> {formData.description}
//                 </p>
//               )}
//               {formData.password && (
//                 <p>
//                   <strong>Password:</strong> {formData.password}
//                 </p>
//               )}
//               <p className="pt-2 font-semibold">Uploaded Files:</p>
//               {/* <ul className="list-disc list-inside">
//                 {Array.isArray(formData[fileKey]) &&
//                   formData[fileKey].map((f, i) => {
//                     const previewUrl = URL.createObjectURL(f);
//                     return (
//                       <li
//                         key={i}
//                         className="cursor-pointer hover:underline text-blue-600"
//                         onClick={() =>
//                           window.open(previewUrl, "_blank", "noopener,noreferrer")
//                         }
//                       >
//                         📎 {f.name} — {formatBytes(f.size)}
//                       </li>
//                     );
//                   })}
//               </ul> */}
//               <ul className="list-none grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 mt-2">
//   {Array.isArray(formData[fileKey]) &&
//     formData[fileKey].map((f, i) => {
//       const previewUrl = URL.createObjectURL(f);
//       const isImage = f.type.startsWith("image");

//       return (
//         <li key={i} className="relative group">
//           {isImage ? (
//             <>
//               <img
//                 src={previewUrl}
//                 alt="preview"
//                 className="w-full h-32 object-cover rounded-lg cursor-pointer border"
//                 onClick={() =>
//                   window.open(previewUrl, "_blank", "noopener,noreferrer")
//                 }
//               />
//               <p className="text-xs text-center mt-1 truncate">{f.name}</p>
//             </>
//           ) : (
//             <div className="text-sm">
//               📎 {f.name} — {formatBytes(f.size)}
//             </div>
//           )}
//         </li>
//       );
//     })}
// </ul>

//             </div>
//             <div className="flex justify-end gap-3 pt-4 text-2xl">
//               <button
//                 onClick={() => setShowConfirm(false)}
//                 className="px-4 py-1.5 border rounded-lg"
//               >
//                 Back
//               </button>
//               <button
//                 onClick={confirmUpload}
//                 className="px-4 py-1.5 bg-teal-600 text-white rounded-lg"
//               >
//                 Confirm
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default EncryptedServicesForm;
