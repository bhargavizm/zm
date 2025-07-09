// "use client";
// import React, { useState } from "react";
// import Image from "next/image";
// import useServicesContext from "@/components/hooks/useServiceContext";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// import NFCModal from "@/components/modalPopUps/nfcModal";
// import useDesignContext from "@/components/hooks/useDesignContext";

// const ProductContent = () => {
//   const { productData, setProductData, setProductImage } = useServicesContext();
//   const { setIsLoading, setBgDesign } = useDesignContext();

//   const [productImages, setProductImages] = useState([]);
//   const [showPassword, setShowPassword] = useState(false);

//   const templateImages = ["temp1.webp", "temp2.webp", "temp3.webp", "temp4.webp"];

//   const handleInputChange = (e) => {
//     const { id, value, type, checked } = e.target;
//     const newValue = type === "checkbox" ? checked : value;
//     setProductData((prev) => ({ ...prev, [id]: newValue }));
//   };

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const imageUrl = URL.createObjectURL(file);
//       setProductImage(imageUrl);
//       setProductImages((prev) => [...prev, imageUrl]);
//     }
//   };

//   const handleTemplateSelect = (filename, index) => {
//     if (productData.selectedTemplate !== index) {
//       setIsLoading(true);
//       setProductData((prev) => ({
//         ...prev,
//         selectedTemplate: index,
//       }));
//       setBgDesign(null);
//       setTimeout(() => setIsLoading(false), 300);
//     }
//   };

//   return (
//     <div>
//       <div className="grid grid-cols-1 gap-10">
//         <div className="bg-white shadow-xl rounded-xl p-6 space-y-6">
//           {/* Templates */}
//           <div>
//             <h2 className="text-xl font-semibold mb-4">
//               Select a Template (click to choose)
//             </h2>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//               {templateImages.map((filename, idx) => (
//                 <div
//                   key={idx}
//                   onClick={() => handleTemplateSelect(filename, idx)}
//                   className={`relative rounded-md border-2 cursor-pointer transition-all p-1 ${
//                     productData.selectedTemplate === idx
//                       ? "border-[#008080] ring-2 ring-[#008080]"
//                       : "border-gray-300"
//                   }`}
//                 >
//                   <Image
//                     src={/product-templates/${filename}}
//                     alt={Template ${idx + 1}}
//                     width={300}
//                     height={180}
//                     className="object-cover rounded w-full h-auto"
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Product Image Upload */}
//           {/* Product Image Upload */}
// <div>
//   <label className="block mb-2 font-medium text-gray-700">
//     Product Image (500x500)
//   </label>
//   <input
//     type="file"
//     accept="image/*"
//     onChange={handleFileUpload}
//     className="w-full text-sm text-gray-700
//       file:mr-4 file:py-2 file:px-4
//       file:rounded-full file:border-0
//       file:text-sm file:font-semibold
//       file:bg-[#008080] file:text-white
//       hover:file:bg-[#006666] transition duration-200 cursor-pointer"
//   />

//   {productImages.length > 0 && (
//   <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
//     {productImages.map((src, idx) => (
//       <div key={idx} className="relative">
//         <img
//           src={src}
//           alt={Uploaded ${idx}}
//           className="rounded object-cover w-24 h-24 border border-gray-300 shadow-sm"
//         />
//         <button
//           onClick={() =>
//             setProductImages((prev) => prev.filter((_, i) => i !== idx))
//           }
//           className="absolute top-[-8px] left-[86px] bg-white text-red-500 cursor-pointer rounded-full w-5 h-5 text-xs flex items-center justify-center shadow-md"
//           title="Remove"
//         >
//           ✖
//         </button>
//       </div>
//     ))}
//   </div>
// )}

// </div>

//           {/* Form Fields */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {[
//               { id: "heading", placeholder: "Product Name" },
//               { id: "description", placeholder: "Product Description" },
//               { id: "pageUrl", placeholder: "Product Page URL", type: "url" },
//               { id: "videoUrl", placeholder: "Product Video URL", type: "url" },
//               { id: "email", placeholder: "Contact Email", type: "email" },
//               { id: "phone", placeholder: "Phone Number", type: "tel" },
//               { id: "password", placeholder: "QR Code Password", type: "password" },
//             ].map(({ id, placeholder, type = "text" }) =>
//               id === "password" ? (
//                 <div key={id} className="relative w-full">
//                   <input
//                     id={id}
//                     type={showPassword ? "text" : "password"}
//                     value={productData[id] || ""}
//                     onChange={handleInputChange}
//                     placeholder={placeholder}
//                     className="border p-2 pr-10 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#008080]"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword((prev) => !prev)}
//                     className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
//                   >
//                     {showPassword ? (
//                       <AiOutlineEyeInvisible size={20} />
//                     ) : (
//                       <AiOutlineEye size={20} />
//                     )}
//                   </button>
//                 </div>
//               ) : (
//                 <input
//                   key={id}
//                   id={id}
//                   type={type}
//                   value={productData[id] || ""}
//                   onChange={handleInputChange}
//                   placeholder={placeholder}
//                   className="border p-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#008080]"
//                 />
//               )
//             )}
//           </div>

//           <NFCModal />

//           <button
//             type="submit"
//             className="mt-4 w-full bg-[#008080] text-white font-semibold py-2 rounded hover:bg-[#006666] transition"
//           >
//             Submit
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };



"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import useServicesContext from "@/components/hooks/useServiceContext";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import NFCModal from "@/components/modalPopUps/nfcModal";
import useDesignContext from "@/components/hooks/useDesignContext";
import { MdCancel, MdDeleteForever } from "react-icons/md";
import { toast } from 'react-hot-toast';
import { useParams } from "next/navigation";

const ProductContent = () => {
  const { setActiveTab } = useDesignContext();
  const { slug } = useParams();
  // Context states
  const {
    productData,
    productLogo,
    setProductLogo,
    setProductData,
    setProductImage,
    items,
    setItems,
  } = useServicesContext();
  const { setIsLoading, setBgDesign } = useDesignContext();

  // State variables
  const [showPassword, setShowPassword] = useState(false);
  const [isNFCModalOpen, setIsNFCModalOpen] = useState(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [showValidationModal, setShowValidationModal] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({
    brandName: "",
    email: "",
    phone: "",
    items: [],
  });
  const fileInputRefs = useRef([]);

  // Constants
  const MAX_SINGLE_FILE_SIZE = 2 * 1024 * 1024; // 2MB
  const MAX_TOTAL_SIZE = 30 * 1024 * 1024; // 30MB
  const templateImages = ["temp1.webp", "temp2.webp", "temp3.webp", "temp4.webp"];

  // Initialize items array if empty
  useEffect(() => {
    if (!items || items.length === 0) {
      setItems([
        { image: "", heading: "", description: "", videoUrl: "", pageUrl: "" },
      ]);
      setFieldErrors(prev => ({
        ...prev,
        items: [{
          heading: "",
          pageUrl: "",
          videoUrl: ""
        }]
      }));
    }
  }, [items, setItems]);

  // Validate email format
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Validate URL format
  const validateUrl = (url) => {
    if (!url) return true; // Empty is valid (not required)
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  // Validate phone number format
  const validatePhone = (phone) => {
    if (!phone) return true; // Empty is valid (not required)
    const re = /^[0-9]{10,15}$/;
    return re.test(phone);
  };

  // Handle common input changes with validation
  const handleCommonChange = (e) => {
    const { id, value } = e.target;
    setProductData((prev) => ({ ...prev, [id]: value }));

    // Validate in real-time
    if (id === "email") {
      setFieldErrors(prev => ({
        ...prev,
        email: value && !validateEmail(value) ? "Invalid email format" : ""
      }));
    } else if (id === "phone") {
      setFieldErrors(prev => ({
        ...prev,
        phone: value && !validatePhone(value) ? "Invalid phone number (10-15 digits)" : ""
      }));
    } else if (id === "brandName") {
      setFieldErrors(prev => ({
        ...prev,
        brandName: !value.trim() ? "Brand name is required" : ""
      }));
    }
  };

  // Handle item field changes with validation
  const handleItemChange = (index, field, value) => {
    setItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[index] = { ...updatedItems[index], [field]: value };
      return updatedItems;
    });

    // Validate URLs in real-time
    if (field === "pageUrl" || field === "videoUrl") {
      const isValid = validateUrl(value);
      setFieldErrors(prev => {
        const newItemsErrors = [...prev.items];
        newItemsErrors[index] = {
          ...newItemsErrors[index],
          [field]: !isValid ? "Invalid URL format" : ""
        };
        return { ...prev, items: newItemsErrors };
      });
    }

    // Validate required heading
    if (field === "heading") {
      setFieldErrors(prev => {
        const newItemsErrors = [...prev.items];
        newItemsErrors[index] = {
          ...newItemsErrors[index],
          heading: !value.trim() ? "Product name is required" : ""
        };
        return { ...prev, items: newItemsErrors };
      });
    }
  };

  // Convert image URL to base64 for database storage
  const convertImageToBase64 = async (imageUrl) => {
    if (!imageUrl) return null;

    try {
      // If it's already a base64 string (data URL), return it
      if (imageUrl.startsWith('data:')) {
        return imageUrl;
      }

      // If it's a blob URL, convert it to base64
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error("Error converting image to base64:", error);
      return null;
    }
  };

  // Handle product logo upload with validation
  const handleProductLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > MAX_SINGLE_FILE_SIZE) {
      showFileSizeError();
      e.target.value = ""; // Clear the file input
      return;
    }

    const logoUrl = URL.createObjectURL(file);
    setProductLogo(logoUrl);
  };

  // Handle item image upload with validation
  const handleItemImageUpload = async (index, file) => {
    if (!file) return;

    // Check single file size limit
    if (file.size > MAX_SINGLE_FILE_SIZE) {
      showFileSizeError();
      fileInputRefs.current[index].value = ""; // Clear the file input
      return;
    }

    // Check total size limit (logo + all item images)
    const totalSize = calculateTotalImageSize(file);
    if (totalSize > MAX_TOTAL_SIZE) {
      setValidationError("Total size of all images exceeds 30MB limit");
      setShowValidationModal(true);
      fileInputRefs.current[index].value = ""; // Clear the file input
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    setItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[index] = { ...updatedItems[index], image: imageUrl };
      return updatedItems;
    });

    if (index === 0) {
      setProductImage(imageUrl);
    }
  };

  // Calculate total size of all uploaded images
  const calculateTotalImageSize = (newFile) => {
    let totalSize = newFile ? newFile.size : 0;

    if (productLogo) {
      totalSize += MAX_SINGLE_FILE_SIZE; // Approximate
    }

    items.forEach(item => {
      if (item.image) {
        totalSize += MAX_SINGLE_FILE_SIZE; // Approximate
      }
    });

    return totalSize;
  };

  // Show file size error modal
  const showFileSizeError = () => {
    setValidationError("Image size exceeds 2MB limit");
    setShowValidationModal(true);
    setTimeout(() => setShowValidationModal(false), 500);
  };

  // Remove product logo
  const handleRemoveProductLogo = () => {
    if (productLogo) {
      URL.revokeObjectURL(productLogo);
    }
    setProductLogo(null);
  };

  // Remove item image
  const handleRemoveItemImage = (index) => {
    setItems((prevItems) => {
      const updatedItems = [...prevItems];
      if (updatedItems[index].image) {
        URL.revokeObjectURL(updatedItems[index].image);
      }
      updatedItems[index] = { ...updatedItems[index], image: "" };
      return updatedItems;
    });

    if (index === 0) {
      setProductImage(null);
    }
  };

  // Handle template selection
  const handleTemplateSelect = (filename, index) => {
    if (productData.selectedTemplate !== index) {
      setIsLoading(true);
      setProductData((prev) => ({
        ...prev,
        selectedTemplate: index,
      }));
      setBgDesign(null);
      setTimeout(() => setIsLoading(false), 300);
    }
  };

  // Add new product item
  const addNewItem = () => {
    setItems((prevItems) => [
      ...prevItems,
      { image: "", heading: "", description: "", videoUrl: "", pageUrl: "" },
    ]);
    setFieldErrors(prev => ({
      ...prev,
      items: [
        ...prev.items,
        { heading: "", pageUrl: "", videoUrl: "" }
      ]
    }));
  };

  // Remove product item
  const removeItem = (index) => {
    if (items[index].image) {
      URL.revokeObjectURL(items[index].image);
    }
    setItems((prevItems) => prevItems.filter((_, i) => i !== index));
    setFieldErrors(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  // Prepare NFC data
  const getNFCData = () => {
    const allProductDetails = items.map((item) => ({
      heading: item.heading,
      description: item.description,
      pageUrl: item.pageUrl,
      videoUrl: item.videoUrl,
    }));
    return JSON.stringify(
      {
        brandName: productData.brandName || "",
        contactEmail: productData.email || "",
        contactPhone: productData.phone || "",
        contactAddress: productData.address || "",
        qrPassword: productData.password || "",
        products: allProductDetails,
      },
      null,
      2
    );
  };

  // Fetch current location
  const fetchCurrentLocation = async () => {
    setIsLoadingLocation(true);
    try {
      const position = await new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        })
      );

      const { latitude, longitude } = position.coords;
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
      );
      const data = await response.json();
      const fullAddress = data.display_name || "Address not found";

      setProductData((prev) => ({
        ...prev,
        address: fullAddress,
      }));
    } catch (error) {
      console.error("Location fetch failed:", error);
      alert("Failed to fetch address. Please check location permissions.");
    } finally {
      setIsLoadingLocation(false);
    }
  };

  // Validate form before submission
  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      brandName: "",
      email: "",
      phone: "",
      items: items.map(item => ({
        heading: "",
        pageUrl: "",
        videoUrl: ""
      }))
    };

    // Validate brand name
    // if (!productData.brandName?.trim()) {
    //   newErrors.brandName = "Brand name is required";
    //   isValid = false;
    // }

    // Validate email
    // if (!productData.email?.trim()) {
    //   newErrors.email = "Email is required";
    //   isValid = false;
    // } else 
    if (!validateEmail(productData.email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    // Validate phone
    if (productData.phone && !validatePhone(productData.phone)) {
      newErrors.phone = "Invalid phone number (10-15 digits)";
      isValid = false;
    }

    // Validate items
    items.forEach((item, index) => {
      // if (!item.heading?.trim()) {
      //   newErrors.items[index].heading = "Product name is required";
      //   isValid = false;
      // }
      // if (item.pageUrl && !validateUrl(item.pageUrl)) {
      //   newErrors.items[index].pageUrl = "Invalid URL format";
      //   isValid = false;
      // }
      // if (item.videoUrl && !validateUrl(item.videoUrl)) {
      //   newErrors.items[index].videoUrl = "Invalid URL format";
      //   isValid = false;
      // }
    });

    setFieldErrors(newErrors);
    return isValid;
  };

  // Handle form submission
const handleSubmit = async () => {
    if (!validateForm()) {
      setValidationError("Please fill the necessary details in the form");
      setShowValidationModal(true);
      return;
    }

    setShowSubmitModal(true);

  };
  // Confirm submission
  const confirmSubmit = async () => {
    setShowSubmitModal(false);

    try {
      // Convert all images to base64 for database storage
      const logoBase64 = await convertImageToBase64(productLogo);

      const itemsWithBase64Images = await Promise.all(
        items.map(async (item) => ({
          ...item,
          image: await convertImageToBase64(item.image)
        }))
      );

      const submissionData = {
        brandName: productData.brandName,
        email: productData.email,
        phone: productData.phone,
        address: productData.address,
        password: productData.password,
        selectedTemplate: productData.selectedTemplate,
        productLogo: logoBase64,
        items: itemsWithBase64Images,
      };

      const response = await fetch("/api/services/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });


      const responseData = await response.json();
      console.log("Submission response:", responseData);
      if (response.ok) {
        toast.success("Product Data Successfully Submitted..");
        setActiveTab(slug, "QR Code");
        // Reset all form data
      setProductData({
        brandName: "",
        email: "",
        phone: "",
        address: "",
        password: "",
        selectedTemplate: null,
      });
      
      setProductLogo(null);
      setItems([
        { 
          image: "", 
          heading: "", 
          description: "", 
          videoUrl: "", 
          pageUrl: "" 
        }
      ]);
      
      }
      if (!response.ok) {
        toast.warn("Product Data Submission Failed..");
        throw new Error(responseData.message || "Failed to submit product");
      }

      setShowSuccessModal(true);
      setTimeout(() => setShowSuccessModal(false), 2000);
    } catch (error) {
      console.error("Submission error:", error);
      setValidationError(error.message || "Failed to submit product. Please try again.");
      setShowValidationModal(true);
    }
  };

  // Modal backdrop component
  const ModalBackdrop = ({ children, onClose }) => {
    return (
      <div className="fixed inset-0 bg-white-70 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
          {children}
        </div>
      </div>
    );
  };

  return (
    <div>
      {/* Validation Error Modal */}
      {showValidationModal && (
        <ModalBackdrop onClose={() => setShowValidationModal(false)}>
          <div className="p-4 text-center">
            <p className="text-red-500 font-medium">{validationError}</p>
            <button
              onClick={() => setShowValidationModal(false)}
              className="mt-4 px-4 py-2 bg-[#008080] text-white rounded hover:bg-[#006666] transition"
            >
              OK
            </button>
          </div>
        </ModalBackdrop>
      )}

      {/* Submit Confirmation Modal */}
      {showSubmitModal && (
        <ModalBackdrop onClose={() => setShowSubmitModal(false)}>
          <div className="p-4 text-center">
            <h3 className="text-lg font-semibold mb-4">Confirm Submission</h3>
            <p className="mb-6">Are you sure you want to submit this product information?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
              >
                Edit
              </button>
              <button
                onClick={confirmSubmit}
                className="px-4 py-2 bg-[#008080] text-white rounded hover:bg-[#006666] transition"
              >
                Submit
              </button>
            </div>
          </div>
        </ModalBackdrop>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <ModalBackdrop onClose={() => setShowSuccessModal(false)}>
          <div className="p-4 text-center">
            <p className="text-mainGreen font-medium mb-4">Product submitted successfully!</p>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="px-4 py-2 bg-[#008080] text-white rounded hover:bg-[#006666] transition"
            >
              OK
            </button>
          </div>
        </ModalBackdrop>
      )}

      {/* Main Form Content */}
      <div className="grid grid-cols-1 gap-10">
        <div className="bg-white shadow-xl rounded-xl p-6 space-y-6">
          {/* Template Selection */}
          <div>
            <h2 className="text-xl font-semibold mb-4">
              Select a Template (click to choose)
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {templateImages.map((filename, idx) => (
                <div
                  key={idx}
                  onClick={() => handleTemplateSelect(filename, idx)}
                  className={`relative rounded-md border-2 cursor-pointer transition-all p-1 ${productData.selectedTemplate === idx
                    ? "border-[#008080] ring-2 ring-[#008080]"
                    : "border-gray-300"
                    }`}
                >
                  <Image
                    src={`/product-templates/${filename}`}
                    alt={`Template ${idx + 1}`}
                    width={300}
                    height={180}
                    className="object-cover rounded w-full h-auto"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Brand Information */}
          <div>
            <h1 className="text-lg font-semibold mb-2">Brand Information</h1>
            <label className="block font-medium text-gray-700 mb-2">
              Brand Logo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleProductLogoUpload}
              className="w-full text-sm text-gray-700
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-[#008080] file:text-white
                    hover:file:bg-[#006666] transition duration-200 cursor-pointer mb-4"
            />
            {productLogo && (
              <div className="relative w-fit">
                <img
                  src={productLogo}
                  alt="Brand Logo Preview"
                  className="mt-2 rounded-md object-contain h-20 w-auto max-w-[150px] border border-gray-300 shadow-sm"
                />
                <button
                  onClick={handleRemoveProductLogo}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 text-sm hover:bg-red-600 transition"
                  title="Remove logo"
                >
                  <MdDeleteForever size={18} />
                </button>
              </div>
            )}
            <label
              htmlFor="brandName"
              className="block font-medium text-gray-700 mb-2 mt-4"
            >
              Brand Name *
            </label>
            <input
              id="brandName"
              type="text"
              value={productData.brandName || ""}
              onChange={handleCommonChange}
              placeholder="Your Brand Name"
              className={`border p-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 ${fieldErrors.brandName ? "border-red-500 focus:ring-red-500" : "focus:ring-[#008080]"
                }`}
              required
            />
            {fieldErrors.brandName && (
              <p className="text-red-500 text-sm mt-1">{fieldErrors.brandName}</p>
            )}
          </div>

          {/* Product Items */}
          {items && items.length > 0 ? (
            items.map((item, index) => (
              <div
                key={index}
                className="p-4 border rounded-xl shadow-md bg-gray-50 relative space-y-4"
              >
                {items.length > 1 && (
                  <button
                    className="absolute top-2 right-2 text-red-500 font-bold text-xl"
                    onClick={() => removeItem(index)}
                    title="Remove item"
                  >
                    <MdCancel />
                  </button>
                )}

                {/* Product Image Upload */}
                <div>
                  <label className="block font-medium text-gray-700 mb-2">
                    Product Image <span className="font-normal text-gray-700 mb-2">(Max 2MB)</span>
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleItemImageUpload(index, e.target.files[0])}
                    ref={el => fileInputRefs.current[index] = el}
                    className="w-full text-sm text-gray-700
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-[#008080] file:text-white
                      hover:file:bg-[#006666] transition duration-200 cursor-pointer"
                  />
                  {item.image && (
                    <div className="relative w-fit">
                      <img
                        src={item.image}
                        alt={`Uploaded ${index}`}
                        className="mt-4 rounded object-cover w-24 h-24 border border-gray-300 shadow-sm"
                      />
                      <button
                        onClick={() => handleRemoveItemImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 text-sm hover:bg-red-600 transition"
                        title="Remove image"
                      >
                        <MdDeleteForever size={18} />
                      </button>
                    </div>
                  )}
                </div>

                {/* Product Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Product Name *"
                      value={item.heading}
                      onChange={(e) =>
                        handleItemChange(index, "heading", e.target.value)
                      }
                      className={`border p-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 ${fieldErrors.items[index]?.heading ? "border-red-500 focus:ring-red-500" : "focus:ring-[#008080]"
                        }`}
                      required
                    />
                    {fieldErrors.items[index]?.heading && (
                      <p className="text-red-500 text-sm mt-1">{fieldErrors.items[index].heading}</p>
                    )}
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Product Description"
                      value={item.description}
                      onChange={(e) =>
                        handleItemChange(index, "description", e.target.value)
                      }
                      className="border p-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#008080]"
                    />
                  </div>
                  <div>
                    <input
                      type="url"
                      placeholder="Product Page URL"
                      value={item.pageUrl}
                      onChange={(e) =>
                        handleItemChange(index, "pageUrl", e.target.value)
                      }
                      className={`border p-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 ${fieldErrors.items[index]?.pageUrl ? "border-red-500 focus:ring-red-500" : "focus:ring-[#008080]"
                        }`}
                    />
                    {fieldErrors.items[index]?.pageUrl && (
                      <p className="text-red-500 text-sm mt-1">{fieldErrors.items[index].pageUrl}</p>
                    )}
                  </div>
                  <div>
                    <input
                      type="url"
                      placeholder="Product Video URL"
                      value={item.videoUrl}
                      onChange={(e) =>
                        handleItemChange(index, "videoUrl", e.target.value)
                      }
                      className={`border p-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 ${fieldErrors.items[index]?.videoUrl ? "border-red-500 focus:ring-red-500" : "focus:ring-[#008080]"
                        }`}
                    />
                    {fieldErrors.items[index]?.videoUrl && (
                      <p className="text-red-500 text-sm mt-1">{fieldErrors.items[index].videoUrl}</p>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-4">
              Add your first product to get started!
            </p>
          )}

          {/* Add Another Product Button */}
          <button
            type="button"
            onClick={addNewItem}
            className="w-full bg-white text-[#008080] border border-[#008080] font-semibold py-2 rounded hover:bg-[#f0fdfa] transition"
          >
            + Add Another Product
          </button>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div>
              <label className="block font-medium text-gray-700 mb-2">Contact Email *</label>
              <input
                id="email"
                type="email"
                value={productData.email || ""}
                onChange={handleCommonChange}
                placeholder="Contact Email"
                className={`border p-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 ${fieldErrors.email ? "border-red-500 focus:ring-red-500" : "focus:ring-[#008080]"
                  }`}
                required
              />
              {fieldErrors.email && (
                <p className="text-red-500 text-sm mt-1">{fieldErrors.email}</p>
              )}
            </div>
            <div>
              <label className="block font-medium text-gray-700 mb-2">Phone Number</label>
              <input
                id="phone"
                type="tel"
                value={productData.phone || ""}
                onChange={handleCommonChange}
                placeholder="Phone Number"
                className={`border p-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 ${fieldErrors.phone ? "border-red-500 focus:ring-red-500" : "focus:ring-[#008080]"
                  }`}
              />
              {fieldErrors.phone && (
                <p className="text-red-500 text-sm mt-1">{fieldErrors.phone}</p>
              )}
            </div>

          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-2">Address</label>
            <textarea
              id="address"
              rows={3}
              value={productData.address || ""}
              onChange={handleCommonChange}
              placeholder="Enter full address"
              className="border p-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#008080]"
            />
            <button
              type="button"
              onClick={fetchCurrentLocation}
              disabled={isLoadingLocation}
              className="mt-2 w-full flex items-center justify-center px-4 py-2 bg-[#008080] text-white rounded-lg hover:bg-[#006666] transition-colors"
            >
              {isLoadingLocation
                ? "Detecting Location..."
                : "Use Current Location"}
            </button>
          </div>
          {/* QR Code Password */}
          <div className="relative">
            <label className="block font-medium text-gray-700 mb-2">QR Code Password</label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={productData.password || ""}
              onChange={handleCommonChange}
              placeholder="QR Code Password"
              className="border p-2 pr-10 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#008080]"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-9 text-gray-600"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <AiOutlineEye size={20} />
              ) : (
                <AiOutlineEyeInvisible size={20} />
              )}
            </button>
          </div>

          {/* NFC Modal */}
          <NFCModal
            isOpen={isNFCModalOpen}
            onClose={() => setIsNFCModalOpen(false)}
            qrCodeData={getNFCData()}
          />

          {/* Submit Button */}
          <button
            type="button"
            onClick={handleSubmit}
            className="mt-6 w-full bg-[#008080] text-white font-semibold py-2 rounded hover:bg-[#006666] transition"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductContent;