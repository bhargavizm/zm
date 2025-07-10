"use client";

import React, { useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";
import useServicesContext from "@/components/hooks/useServiceContext";
import NFCModal from "@/components/modalPopUps/nfcModal";
import { setMenuCardServices } from "@/redux/slices/servicesSlice";
import { useDispatch } from "react-redux";
import useDesignContext from "@/components/hooks/useDesignContext";
import { useParams } from "next/navigation";
import LoadingSpinner from "@/components/common/spinner";

const MenuBookContent = () => {
  const { setActiveTab } = useDesignContext();
  const { slug } = useParams();
  const {
    menuBookFormData,
    setMenuBookFormData,
    servicesDataLoading,
    setServicesDataLoading,
  } = useServicesContext();

  const [showPassword, setShowPassword] = useState(false);
  const [totalSizeMB, setTotalSizeMB] = useState(0);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [validationErrors, setValidationErrors] = useState({
    phone: "",
    email: "",
    link: "",
  });

  const fileInputRef = useRef(null);
  const linkInputRef = useRef(null); // ✅ New ref for link validation
  const dispatch = useDispatch();

  const validateEmail = (email) =>
    /^\w+([\.+-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/.test(email);

  const validatePhone = (phone) => /^\d{10,15}$/.test(phone);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      id: Date.now() + Math.random(),
      file,
      image: URL.createObjectURL(file),
      sizeMB: file.size / (1024 * 1024),
    }));

    const updatedImages = [...menuBookFormData.menuItems, ...newImages];
    const total = updatedImages.reduce((acc, item) => acc + item.sizeMB, 0);

    if (total > 30) {
      toast.error(`Total upload size exceeds 30MB (${total.toFixed(2)} MB)`);
      return;
    }

    const oversize = newImages.find((img) => img.sizeMB > 2);
    if (oversize) {
      toast.error(`${oversize.file.name} exceeds 2MB (${oversize.sizeMB.toFixed(2)} MB)`);
      return;
    }

    setTotalSizeMB(total);
    setMenuBookFormData({ ...menuBookFormData, menuItems: updatedImages });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleRemoveImage = (id) => {
    const updated = menuBookFormData.menuItems.filter((item) => item.id !== id);
    setMenuBookFormData({ ...menuBookFormData, menuItems: updated });

    const newTotal = updated.reduce((acc, item) => acc + item.sizeMB, 0);
    setTotalSizeMB(newTotal);

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleInitialSubmit = (e) => {
    e.preventDefault();

    const { phone, email, link } = menuBookFormData;

    const newErrors = {
      phone: phone && !validatePhone(phone) ? "Phone must be 10 to 15 digits" : "",
      email: email && !validateEmail(email) ? "Invalid email format" : "",
      link: "", // handled via native validation
    };

    setValidationErrors(newErrors);
    const hasErrors = Object.values(newErrors).some((err) => err !== "");

    const allEmpty = !menuBookFormData.restaurantName &&
      !phone &&
      !email &&
      !link &&
      !menuBookFormData.password &&
      (!menuBookFormData.menuItems || menuBookFormData.menuItems.length === 0);

    if (allEmpty) {
      toast.error("Please fill in at least one field before submitting.");
      return;
    }

    if (hasErrors) {
      Object.entries(newErrors).forEach(([key, error]) => {
        if (error) toast.error(error);
      });
      return;
    }

    // ✅ Native browser validation for URL field
    if (link && linkInputRef.current && !linkInputRef.current.checkValidity()) {
      linkInputRef.current.reportValidity();
      return;
    }

    setShowConfirmModal(true);
  };

  const handleSubmit = async () => {
    setServicesDataLoading(true);
    try {
      const formData = new FormData();
      formData.append("restaurantName", menuBookFormData.restaurantName);
      formData.append("phone", menuBookFormData.phone);
      formData.append("email", menuBookFormData.email);
      formData.append("link", menuBookFormData.link);
      formData.append("password", menuBookFormData.password || "");

      menuBookFormData.menuItems.forEach((item) => {
        formData.append("images", item.file);
      });

      const res = await axios.post("/api/services/menuCards", formData);

      if (res.data.success) {
        dispatch(setMenuCardServices(res.data.menuCardData));
        toast.success(res.data.message);
        setActiveTab(slug, "QR Code");

        setMenuBookFormData({
          restaurantName: "",
          menuItems: [],
          phone: "",
          email: "",
          link: "",
          password: "",
        });
        setTotalSizeMB(0);
        if (fileInputRef.current) fileInputRef.current.value = "";
      } else {
        toast.error(res.data.message || "Submission failed");
      }
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.error || "Something went wrong!");
    } finally {
      setServicesDataLoading(false);
    }
  };

  return (
    <>
      {servicesDataLoading && <LoadingSpinner />}


      <form>
        <div className="max-w-xl mx-auto p-6 space-y-6 bg-white rounded">
          <h2 className="text-2xl font-bold text-[#008080]">Create QR Menu</h2>

 <label className="font-medium">Restaurant Name:</label>
          <input
            type="text"
            placeholder="Name of Restaurant"
            value={menuBookFormData.restaurantName}
            onChange={(e) =>
              setMenuBookFormData({
                ...menuBookFormData,
                restaurantName: e.target.value,
              })
            }
            className="w-full border px-4 py-2 rounded"
          />

 <label className="font-medium">Phone Number:</label>
          <input
            type="tel"
            placeholder="Phone"
            value={menuBookFormData.phone}
            onChange={(e) => {
              setMenuBookFormData({ ...menuBookFormData, phone: e.target.value });
              setValidationErrors((prev) => ({ ...prev, phone: "" }));
            }}
            className="w-full border px-4 py-2 rounded"
          />

 <label className="font-medium">Email:</label>
          <input
            type="email"
            placeholder="Email"
            value={menuBookFormData.email}
            onChange={(e) => {
              setMenuBookFormData({ ...menuBookFormData, email: e.target.value });
              setValidationErrors((prev) => ({ ...prev, email: "" }));
            }}
            className="w-full border px-4 py-2 rounded"
          />

          {/* ✅ Updated Link field with ref and required */}
           <label className="font-medium">URL:</label>
          <input
            type="url"
            name="link"
            ref={linkInputRef}
            placeholder="Link (https://...)"
            required={!!menuBookFormData.link}
            value={menuBookFormData.link}
            onChange={(e) => {
              setMenuBookFormData({ ...menuBookFormData, link: e.target.value });
              setValidationErrors((prev) => ({ ...prev, link: "" }));
            }}
            className="w-full border px-4 py-2 rounded"
          />

          {/* Upload input and previews... (no change) */}
           <label className="font-medium">Upload Menu Images:</label>
          <p className="text-sm text-gray-500">Max Single File Size: 2 MB</p>

          <div className="relative mt-1 w-full py-2 px-4 border rounded-md">
            <input
              type="file"
              accept="image/*"
              multiple
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="absolute inset-0 opacity-0 cursor-pointer z-10"
            />
            <button
              type="button"
              className="bg-teal-600 text-white text-sm px-4 py-2 rounded-md font-medium pointer-events-none"
            >
              Choose Files
            </button>
           <span className="ml-3 text-sm text-gray-500">
  {menuBookFormData.menuItems.length > 0
    ? `${menuBookFormData.menuItems.length} file${menuBookFormData.menuItems.length > 1 ? "s" : ""} selected`
    : "No file selected"}
</span>

          </div>

          {/* Previews */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {menuBookFormData.menuItems.map((item) => (
              <div
                key={item.id}
                className="relative w-full h-32 border rounded overflow-hidden"
              >
                <img
                  src={item.image}
                  className="w-full h-full object-center"
                  alt="Menu Item"
                />
                <button
                  onClick={() => handleRemoveImage(item.id)}
                  className="absolute top-1 cursor-pointer right-1 bg-white text-red-600 w-5 h-5 text-xs rounded-full flex items-center justify-center shadow"
                >
                  ❌
                </button>
              </div>
            ))}
          </div>



          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={menuBookFormData.password || ""}
              onChange={(e) =>
                setMenuBookFormData({
                  ...menuBookFormData,
                  password: e.target.value,
                })
              }
              className="w-full border px-4 py-2 rounded pr-10"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FiEye /> : <FiEyeOff />}
            </button>
          </div>

          <NFCModal />

          <button
            type="button"
            onClick={handleInitialSubmit}
            className="w-full cursor-pointer bg-[#008080] text-white py-2 rounded hover:bg-[#006666] transition disabled:opacity-50"
          >
            Submit
          </button>
        </div>
      </form>

      {/* ✅ Confirm Modal — no change needed */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/30">
          <div className="bg-white relative rounded-xl shadow-xl p-6 w-full max-w-xl border border-teal-200 mx-4 sm:mx-auto">
            <button
              onClick={() => setShowConfirmModal(false)}
              className="text-xl absolute right-4 pb-9 text-gray-600 hover:text-red-600"
            >
              ❌
            </button>
            <h2 className="text-2xl py-4 font-semibold text-center text-teal-700">
              Confirm Your Details
            </h2>

           <div className="text-base space-y-2 text-gray-800">
              {menuBookFormData.restaurantName && (
                <p><b>Restaurant:</b> {menuBookFormData.restaurantName}</p>
              )}
              {menuBookFormData.phone && (
                <p><b>Phone:</b> {menuBookFormData.phone}</p>
              )}
              {menuBookFormData.email && (
                <p><b>Email:</b> {menuBookFormData.email}</p>
              )}
             {menuBookFormData.link && (
  <p>
    <b>Link:</b>{" "}
    <a
      href={menuBookFormData.link}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 underline break-all"
    >
      {menuBookFormData.link}
    </a>
  </p>
)}

              {menuBookFormData.password && (
                <p><b>Password:</b> {menuBookFormData.password}</p>
              )}
              {menuBookFormData.menuItems.length > 0 && (
                <div>
                  <p className="font-medium mb-1">Uploaded Images:</p>
                  <div className="grid grid-cols-3 gap-2">
                    {menuBookFormData.menuItems.map((item) => (
                      <img
                        key={item.id}
                        src={item.image}
                        alt="Preview"
                        className="w-full h-24 object-center rounded border"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>



            <div className="flex justify-end gap-3 pt-4">
              <button
                className="px-4 py-2 cursor-pointer bg-gray-300 rounded hover:bg-gray-400 text-sm"
                onClick={() => setShowConfirmModal(false)}
              >
                Back
              </button>
              <button
                className="px-4 py-2 cursor-pointer bg-teal-600 text-white rounded hover:bg-teal-700 text-sm"
                onClick={() => {
                  setShowConfirmModal(false);
                  handleSubmit();
                }}
              >
                Confirm & Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MenuBookContent;


// "use client";

// import React, { useState, useRef } from "react";
// import axios from "axios";
// import { toast } from "react-hot-toast";
// import { FiEye, FiEyeOff } from "react-icons/fi";
// import useServicesContext from "@/components/hooks/useServiceContext";
// import NFCModal from "@/components/modalPopUps/nfcModal";
// import { setMenuCardServices } from "@/redux/slices/servicesSlice";
// import { useDispatch } from "react-redux";
// import useDesignContext from "@/components/hooks/useDesignContext";
// import { useParams } from "next/navigation";
// import LoadingSpinner from "@/components/common/spinner";

// const MenuBookContent = () => {
//   const { setActiveTab } = useDesignContext();
// const { slug } = useParams();
//   const { menuBookFormData, setMenuBookFormData, servicesDataLoading, setServicesDataLoading } = useServicesContext();
//   const [showPassword, setShowPassword] = useState(false);
//   const [totalSizeMB, setTotalSizeMB] = useState(0);
//   const [showConfirmModal, setShowConfirmModal] = useState(false);

//   const fileInputRef = useRef(null);
//   const dispatch = useDispatch();

//   const handleImageUpload = (e) => {
//     const files = Array.from(e.target.files);
//     const newImages = files.map((file) => ({
//       file,
//       image: URL.createObjectURL(file),
//       sizeMB: file.size / (1024 * 1024),
//     }));

//     const updatedImages = [...menuBookFormData.menuItems, ...newImages];
//     const total = updatedImages.reduce((acc, item) => acc + item.sizeMB, 0);

//     if (total > 30) {
//       toast.error(`Total upload size exceeds 30MB (${total.toFixed(2)} MB)`);
//       return;
//     }

//     const oversize = newImages.find((img) => img.sizeMB > 2);
//     if (oversize) {
//       toast.error(
//         `${oversize.file.name} exceeds 2MB (${oversize.sizeMB.toFixed(2)} MB)`
//       );
//       return;
//     }

//     setTotalSizeMB(total);
//     setMenuBookFormData({
//       ...menuBookFormData,
//       menuItems: updatedImages,
//     });

//     // Reset input to allow re-upload of same file
//     if (fileInputRef.current) fileInputRef.current.value = "";
//   };

//   const handleRemoveImage = (index) => {
//     const updated = [...menuBookFormData.menuItems];
//     updated.splice(index, 1);
//     setMenuBookFormData({ ...menuBookFormData, menuItems: updated });

//     // Update size
//     const newTotal = updated.reduce((acc, item) => acc + item.sizeMB, 0);
//     setTotalSizeMB(newTotal);
//   };

//   const handleSubmit = async () => {
//       set  (true);
//     try {
//       const formData = new FormData();
//       formData.append("restaurantName", menuBookFormData.restaurantName);
//       formData.append("phone", menuBookFormData.phone);
//       formData.append("email", menuBookFormData.email);
//       formData.append("link", menuBookFormData.link);
//       formData.append("password", menuBookFormData.password || "");

//       menuBookFormData.menuItems.forEach((item) => {
//         formData.append("images", item.file);
//       });

//       const res = await axios.post("/api/services/menuCards", formData);

//       if (res.data.success) {
//         dispatch(setMenuCardServices(res.data.menuCardData));
//         toast.success(res.data.message);
//         setActiveTab(slug, "QR Code");
//         // Reset form only on success
//         setMenuBookFormData({
//           restaurantName: "",
//           menuItems: [],
//           phone: "",
//           email: "",
//           link: "",
//           password: "",
//         });
//         setTotalSizeMB(0);
//         if (fileInputRef.current) fileInputRef.current.value = "";
//       } else {
//         // If success: false returned by API
//         toast.error(res.data.message || "Submission failed");
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error(err?.response?.data?.error || "Something went wrong!");
//     } finally {
//       setServicesDataLoading(false); // ✅ End loader
//     }
//   };

//   const isFormValid =
//     menuBookFormData.restaurantName &&
//     menuBookFormData.menuItems.length > 0 &&
//     menuBookFormData.phone &&
//     menuBookFormData.email;

//   return (
//     <>
//      {servicesDataLoading && (
//        <LoadingSpinner/>
//       )}

//       <form>
//         <div className="max-w-xl mx-auto p-6 space-y-6 bg-white rounded">
//           <h2 className="text-2xl font-bold text-[#008080]">Create QR Menu</h2>

//           {/* Inputs */}
//           <input
//             type="text"
//             placeholder="Name of Restaurant"
//             value={menuBookFormData.restaurantName}
//             onChange={(e) =>
//               setMenuBookFormData({
//                 ...menuBookFormData,
//                 restaurantName: e.target.value,
//               })
//             }
//             className="w-full border px-4 py-2 rounded"
//           />

//           <input
//             type="text"
//             placeholder="Phone"
//             value={menuBookFormData.phone}
//             onChange={(e) =>
//               setMenuBookFormData({
//                 ...menuBookFormData,
//                 phone: e.target.value,
//               })
//             }
//             className="w-full border px-4 py-2 rounded"
//           />
//           <input
//             type="email"
//             placeholder="Email"
//             value={menuBookFormData.email}
//             onChange={(e) =>
//               setMenuBookFormData({
//                 ...menuBookFormData,
//                 email: e.target.value,
//               })
//             }
//             className="w-full border px-4 py-2 rounded"
//           />
//           <input
//             type="url"
//             placeholder="Link"
//             value={menuBookFormData.link}
//             onChange={(e) =>
//               setMenuBookFormData({ ...menuBookFormData, link: e.target.value })
//             }
//             className="w-full border px-4 py-2 rounded"
//           />

//           {/* Upload Images */}
//           {/* Upload Images */}
//           <label className="font-medium">Upload Menu Images:</label>
//           <p className="text-sm text-gray-500 pt-2">
//             Max Single File Size: 2 MB
//           </p>

//           <input
//             required
//             type="file"
//             accept="image/*"
//             multiple
//             ref={fileInputRef}
//             onChange={handleImageUpload}
//             className="w-full px-3 py-2 cursor-pointer border border-gray-500 rounded-lg text-sm file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:bg-teal-600 file:text-white hover:file:bg-teal-700"
//           />

//           {/* Previews */}
//           <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
//             {menuBookFormData.menuItems.map((item, index) => (
//               <div
//                 key={index}
//                 className="relative w-full h-32 border rounded overflow-hidden"
//               >
//                 <img
//                   src={item.image}
//                   className="w-full h-full object-cover"
//                   alt={`Menu ${index}`}
//                 />
//                 <button
//                   onClick={() => handleRemoveImage(index)}
//                   className="absolute top-1 right-1 bg-white text-red-600 w-5 h-5 text-xs rounded-full flex items-center justify-center shadow"
//                 >
//                   ❌
//                 </button>
//               </div>
//             ))}
//           </div>

//           {/* Password */}
//           <div className="relative">
//             <input
//               type={showPassword ? "text" : "password"}
//               placeholder="Password"
//               value={menuBookFormData.password || ""}
//               onChange={(e) =>
//                 setMenuBookFormData({
//                   ...menuBookFormData,
//                   password: e.target.value,
//                 })
//               }
//               className="w-full border px-4 py-2 rounded pr-10"
//             />
//             <button
//               type="button"
//               className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
//               onClick={() => setShowPassword((prev) => !prev)}
//             >
//               {showPassword ? <FiEye /> : <FiEyeOff />}
//             </button>
//           </div>

//           <NFCModal />

//           <button
//             type="button"
//             onClick={(e) => {
//               e.preventDefault();

//               // If all fields are empty, do not open modal
//               const {
//                 restaurantName,
//                 phone,
//                 email,
//                 link,
//                 password,
//                 menuItems,
//               } = menuBookFormData;
//               const allEmpty =
//                 !restaurantName &&
//                 !phone &&
//                 !email &&
//                 !link &&
//                 !password &&
//                 (!menuItems || menuItems.length === 0);

//               if (allEmpty) {
//                 toast.error(
//                   "Please fill in at least one field before submitting."
//                 );
//                 return;
//               }

//               // Otherwise, open the confirm modal
//               setShowConfirmModal(true);
//             }}
//             className="w-full cursor-pointer bg-[#008080] text-white py-2 rounded hover:bg-[#006666] transition disabled:opacity-50"
//           >
//             Submit
//           </button>
//         </div>
//       </form>
//       {showConfirmModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/30">
//           <div className="bg-white relative rounded-xl shadow-xl p-6 w-full max-w-xl border border-teal-200 mx-4 sm:mx-auto">
//              <button
//               onClick={() => setShowConfirmModal(false)}
//               className="text-xl absolute right-4 pb-9 text-gray-600 hover:text-red-600"
//             >
//               ❌
//             </button>
//             <h2 className="text-2xl py-4 font-semibold text-center text-teal-700">
//               Confirm Your Details
//             </h2>

//             <div className="text-base space-y-2 text-gray-800">
//               {menuBookFormData.restaurantName && (
//                 <p>
//                   <b>Restaurant:</b> {menuBookFormData.restaurantName}
//                 </p>
//               )}
//               {menuBookFormData.phone && (
//                 <p>
//                   <b>Phone:</b> {menuBookFormData.phone}
//                 </p>
//               )}
//               {menuBookFormData.email && (
//                 <p>
//                   <b>Email:</b> {menuBookFormData.email}
//                 </p>
//               )}
//               {menuBookFormData.link && (
//                 <p>
//                   <b>Link:</b> {menuBookFormData.link}
//                 </p>
//               )}
//               {menuBookFormData.password && (
//                 <p>
//                   <b>Password:</b> {menuBookFormData.password}
//                 </p>
//               )}

//               {Array.isArray(menuBookFormData.menuItems) &&
//                 menuBookFormData.menuItems.length > 0 && (
//                   <div>
//                     <p className="font-medium mb-1">Uploaded Images:</p>
//                     <div className="grid grid-cols-3 gap-2">
//                       {menuBookFormData.menuItems.map((item, index) => (
//                         <img
//                           key={index}
//                           src={item.image}
//                           alt={`Image ${index + 1}`}
//                           className="w-full h-24 object-cover rounded border"
//                         />
//                       ))}
//                     </div>
//                   </div>
//                 )}
//             </div>

//             {/* Action Buttons */}
//             <div className="flex justify-end gap-3 pt-4">
//               <button
//                 className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 text-sm cursor-pointer"
//                 onClick={() => setShowConfirmModal(false)}
//               >
//                 Back
//               </button>
//               <button
//                 className="px-4 py-2 bg-teal-600 text-white rounded cursor-pointer hover:bg-teal-700 text-sm"
//                 onClick={() => {
//                   setShowConfirmModal(false);
//                   handleSubmit();
//                 }}
//               >
//                 Confirm & Submit
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default MenuBookContent;
