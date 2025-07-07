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
import React, { useState, useEffect } from "react";
import Image from "next/image";
import useServicesContext from "@/components/hooks/useServiceContext";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { MdCancel, MdDeleteForever } from "react-icons/md";
import axios from "axios";
import useDesignContext from "@/components/hooks/useDesignContext";

const ProductContent = () => {
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

  const { setIsLoading } = useDesignContext();
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const templateImages = [
    "temp1.webp",
    "temp2.webp",
    "temp3.webp",
    "temp4.webp",
  ];

  useEffect(() => {
    if (!items || items.length === 0) {
      setItems([
        { images: [], heading: "", description: "", videoUrl: "", pageUrl: "" },
      ]);
    }
  }, [items, setItems]);

  const validateForm = () => {
    const errors = {};
    
    // if (!productData.brandName?.trim()) {
    //   errors.brandName = "Brand name is required";
    // }
    
    // if (!productData.password?.trim()) {
    //   errors.password = "Password is required";
    // }

    if (productData.phone && !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(productData.phone)) {
      errors.phone = "Please enter a valid phone number";
    }
    
    if (!items || items.length === 0) {
      errors.items = "At least one product item is required";
    } 
    // else {
    //   items.forEach((item, index) => {
    //     if (!item.heading?.trim()) {
    //       errors[`item_${index}_heading`] = "Product name is required";
    //     }
    //     if (!item.description?.trim()) {
    //       errors[`item_${index}_description`] = "Description is required";
    //     }
    //     if (item.pageUrl && !isValidUrl(item.pageUrl)) {
    //       errors[`item_${index}_pageUrl`] = "Invalid URL format";
    //     }
    //     if (item.videoUrl && !isValidUrl(item.videoUrl)) {
    //       errors[`item_${index}_videoUrl`] = "Invalid URL format";
    //     }
    //   });
    // }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValidUrl = (url) => {
    try {
      const parsed = new URL(url);
      return ["http:", "https:"].includes(parsed.protocol);
    } catch {
      return false;
    }
  };

  const handleCommonChange = (e) => {
    const { id, value } = e.target;
    setProductData((prev) => ({ ...prev, [id]: value }));
  };

  const handleItemChange = (index, field, value) => {
    setItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[index] = { ...updatedItems[index], [field]: value };
      return updatedItems;
    });
  };

  const handleItemImagesUpload = (index, files) => {
    if (!files || files.length === 0) return;
    
    for (let i = 0; i < files.length; i++) {
      if (files[i].size > 2 * 1024 * 1024) {
        alert(`Image ${files[i].name} exceeds 2MB limit`);
        return;
      }
    }
    
    const imageUrls = Array.from(files).map(file => URL.createObjectURL(file));
    setItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[index] = { 
        ...updatedItems[index], 
        images: [...(updatedItems[index].images || []), ...imageUrls] 
      };
      return updatedItems;
    });
    
    if (index === 0 && imageUrls.length > 0) {
      setProductImage(imageUrls[0]);
    }
  };

  const handleRemoveItemImage = (index, imageIndex) => {
    setItems((prevItems) => {
      const updatedItems = [...prevItems];
      if (updatedItems[index]?.images?.[imageIndex]) {
        URL.revokeObjectURL(updatedItems[index].images[imageIndex]);
        updatedItems[index] = { 
          ...updatedItems[index], 
          images: updatedItems[index].images.filter((_, i) => i !== imageIndex) 
        };
      }
      return updatedItems;
    });
    
    if (index === 0) {
      setItems(prevItems => {
        if (prevItems[0]?.images?.length > 0) {
          setProductImage(prevItems[0].images[0]);
        } else {
          setProductImage(null);
        }
        return prevItems;
      });
    }
  };

  const handleProductLogoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    if (file.size > 2 * 1024 * 1024) {
      alert("Logo size should be less than 2MB");
      return;
    }
    
    const logoUrl = URL.createObjectURL(file);
    setProductLogo(logoUrl);
  };

  const handleRemoveProductLogo = () => {
    if (productLogo) {
      URL.revokeObjectURL(productLogo);
    }
    setProductLogo(null);
  };

  const handleTemplateSelect = (filename, index) => {
    if (productData.selectedTemplate !== index) {
      setIsLoading(true);
      setProductData((prev) => ({
        ...prev,
        selectedTemplate: index,
      }));
      setTimeout(() => setIsLoading(false), 300);
    }
  };

  const addNewItem = () => {
    setItems((prevItems) => [
      ...prevItems,
      { images: [], heading: "", description: "", videoUrl: "", pageUrl: "" },
    ]);
  };

  const removeItem = (index) => {
    setItems((prevItems) => {
      const itemsToRemove = prevItems.filter((_, i) => i !== index);
      if (index === 0 && itemsToRemove.length > 0 && itemsToRemove[0]?.images?.length > 0) {
        setProductImage(itemsToRemove[0].images[0]);
      } else if (itemsToRemove.length === 0) {
        setProductImage(null);
      }
      return itemsToRemove;
    });
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsPreviewModalOpen(true);
  };

  const convertImageToBase64 = async (imageUrl) => {
    try {
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

  const confirmSubmission = async () => {
    setIsSubmitting(true);
    try {
      // Prepare the data object
      const submissionData = {
        brandName: productData.brandName,
        email: productData.email || '',
        phone: productData.phone || '',
        address: productData.address || '',
        password: productData.password,
        selectedTemplate: productData.selectedTemplate || 0,
        productLogo: productLogo ? await convertImageToBase64(productLogo) : null,
        items: []
      };

      // Process items and their images
      for (const item of items) {
        const processedItem = {
          heading: item.heading,
          description: item.description,
          videoUrl: item.videoUrl || '',
          pageUrl: item.pageUrl || '',
          images: []
        };

        // Convert images to base64
        if (item.images && item.images.length > 0) {
          for (const imageUrl of item.images) {
            const base64Image = await convertImageToBase64(imageUrl);
            if (base64Image) {
              processedItem.images.push(base64Image);
            }
          }
        }

        submissionData.items.push(processedItem);
      }

      const response = await axios.post('/api/services/product', submissionData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.status === 201) {
        setIsPreviewModalOpen(false);
        setIsSuccessModalOpen(true);
        resetForm();
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert(`Failed to submit form: ${error.response?.data?.message || error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setProductData({
      brandName: "",
      email: "",
      phone: "",
      address: "",
      password: "",
      selectedTemplate: null,
    });
    
    if (productLogo) {
      URL.revokeObjectURL(productLogo);
      setProductLogo(null);
    }
    
    setItems([
      { images: [], heading: "", description: "", videoUrl: "", pageUrl: "" },
    ]);
    
    setFormErrors({});
  };

  const handleEdit = () => {
    setIsPreviewModalOpen(false);
  };

  const handleSuccessClose = () => {
    setIsSuccessModalOpen(false);
  };

  return (
    <div className="relative">
      {/* Blur effect when modals are open */}
      {(isPreviewModalOpen || isSuccessModalOpen) && (
        <div className="fixed inset-0 bg-white bg-opacity-70 backdrop-blur-sm z-10"></div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-10">
          <div className="bg-white shadow-xl rounded-xl p-6 space-y-6">
            {/* Template Selection Section */}
            <div>
              <h2 className="text-xl font-semibold mb-4">
                Select a Template (click to choose)
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {templateImages.map((filename, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleTemplateSelect(filename, idx)}
                    className={`relative rounded-md border-2 cursor-pointer transition-all p-1 ${
                      productData.selectedTemplate === idx
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

            {/* Brand Logo and Brand Name Input */}
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
                    type="button"
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
                Brand Name
              </label>
              <input
                id="brandName"
                type="text"
                value={productData.brandName || ""}
                onChange={handleCommonChange}
                placeholder="Your Brand Name"
                className={`border p-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#008080] ${
                  formErrors.brandName ? "border-red-500" : ""
                }`}
              />
              {formErrors.brandName && (
                <p className="text-red-500 text-sm mt-1">{formErrors.brandName}</p>
              )}
            </div>

            {/* Dynamic Section for Multiple Product Items */}
            {items && items.length > 0 ? (
              items.map((item, index) => (
                <div
                  key={index}
                  className="p-4 border rounded-xl shadow-md bg-gray-50 relative space-y-4"
                >
                  {items.length > 1 && (
                    <button
                      type="button"
                      className="absolute top-2 right-2 text-red-500 font-bold text-xl"
                      onClick={() => removeItem(index)}
                      title="Remove item"
                    >
                      <MdCancel />
                    </button>
                  )}
                  <div>
                    <label className="block font-medium text-gray-700 mb-2">
                      Product Images (500x500, max 5 images)
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) =>
                        handleItemImagesUpload(index, e.target.files)
                      }
                      className="w-full text-sm text-gray-700
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-[#008080] file:text-white
                        hover:file:bg-[#006666] transition duration-200 cursor-pointer"
                    />
                    {item.images?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {item.images.map((image, imgIndex) => (
                          <div key={imgIndex} className="relative">
                            <img
                              src={image}
                              alt={`Product ${index + 1} image ${imgIndex + 1}`}
                              className="rounded object-cover w-24 h-24 border border-gray-300 shadow-sm"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveItemImage(index, imgIndex)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 text-sm hover:bg-red-600 transition"
                              title="Remove image"
                            >
                              <MdDeleteForever size={18} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        placeholder="Product Name"
                        value={item.heading}
                        onChange={(e) =>
                          handleItemChange(index, "heading", e.target.value)
                        }
                        className={`border p-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#008080] ${
                          formErrors[`item_${index}_heading`] ? "border-red-500" : ""
                        }`}
                      />
                      {formErrors[`item_${index}_heading`] && (
                        <p className="text-red-500 text-sm mt-1">
                          {formErrors[`item_${index}_heading`]}
                        </p>
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
                        className={`border p-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#008080] ${
                          formErrors[`item_${index}_description`] ? "border-red-500" : ""
                        }`}
                      />
                      {formErrors[`item_${index}_description`] && (
                        <p className="text-red-500 text-sm mt-1">
                          {formErrors[`item_${index}_description`]}
                        </p>
                      )}
                    </div>
                    <div>
                      <input
                        type="url"
                        placeholder="Product Page URL"
                        value={item.pageUrl}
                        onChange={(e) =>
                          handleItemChange(index, "pageUrl", e.target.value)
                        }
                        className={`border p-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#008080] ${
                          formErrors[`item_${index}_pageUrl`] ? "border-red-500" : ""
                        }`}
                      />
                      {formErrors[`item_${index}_pageUrl`] && (
                        <p className="text-red-500 text-sm mt-1">
                          {formErrors[`item_${index}_pageUrl`]}
                        </p>
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
                        className={`border p-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#008080] ${
                          formErrors[`item_${index}_videoUrl`] ? "border-red-500" : ""
                        }`}
                      />
                      {formErrors[`item_${index}_videoUrl`] && (
                        <p className="text-red-500 text-sm mt-1">
                          {formErrors[`item_${index}_videoUrl`]}
                        </p>
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

            <button
              type="button"
              onClick={addNewItem}
              className="w-full bg-white text-[#008080] border border-[#008080] font-semibold py-2 rounded hover:bg-[#f0fdfa] transition"
            >
              + Add Another Product
            </button>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <input
                id="email"
                type="email"
                value={productData.email || ""}
                onChange={handleCommonChange}
                placeholder="Contact Email"
                className="border p-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#008080]"
              />
              <div>
                <input
                  id="phone"
                  type="tel"
                  value={productData.phone || ""}
                  onChange={handleCommonChange}
                  placeholder="Phone Number (e.g., +1234567890)"
                  className={`border p-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#008080] ${
                    formErrors.phone ? "border-red-500" : ""
                  }`}
                />
                {formErrors.phone && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>
                )}
              </div>
            </div>
            <div className="md:col-span-1">
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

            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={productData.password || ""}
                onChange={handleCommonChange}
                placeholder="QR Code Password"
                className={`border p-2 pr-10 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#008080] ${
                  formErrors.password ? "border-red-500" : ""
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <AiOutlineEye size={20} />
                ) : (
                  <AiOutlineEyeInvisible size={20} />
                )}
              </button>
              {formErrors.password && (
                <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>
              )}
            </div>  

            <button
            onClick={handleSubmit}
              type="submit"
              className="mt-6 w-full bg-[#008080] text-white font-semibold py-2 rounded hover:bg-[#006666] transition"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      </form>

      {/* Preview Modal */}
      {isPreviewModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-20">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl mx-4 max-h-[80vh] overflow-y-auto">
            {/* <h2 className="text-2xl font-bold text-[#008080] mb-4">Review Your Submission</h2>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Brand Information</h3>
              <p><span className="font-medium">Brand Name:</span> {productData.brandName || "Not provided"}</p>
              {productLogo && (
                <div className="mt-2">
                  <p className="font-medium">Logo:</p>
                  <img 
                    src={productLogo} 
                    alt="Brand Logo" 
                    className="h-20 mt-1"
                  />
                </div>
              )}
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
              <p><span className="font-medium">Email:</span> {productData.email || "Not provided"}</p>
              <p><span className="font-medium">Phone:</span> {productData.phone || "Not provided"}</p>
              <p><span className="font-medium">Address:</span> {productData.address || "Not provided"}</p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Products ({items.length})</h3>
              {items.map((item, index) => (
                <div key={index} className="mb-4 p-3 border rounded">
                  <p className="font-medium">{item.heading || "Untitled Product"}</p>
                  <p>{item.description || "No description"}</p>
                  {item.images?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {item.images.map((image, imgIndex) => (
                        <img 
                          key={imgIndex}
                          src={image} 
                          alt={`Product ${index + 1} image ${imgIndex + 1}`} 
                          className="h-20 object-cover"
                        />
                      ))}
                    </div>
                  )}
                  {item.pageUrl && <p className="mt-1">Page URL: {item.pageUrl}</p>}
                  {item.videoUrl && <p className="mt-1">Video URL: {item.videoUrl}</p>}
                </div>
              ))}
            </div> */}

            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={handleEdit}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
              >
                Edit
              </button>
              <button
                onClick={confirmSubmission}
                className="px-4 py-2 bg-[#008080] text-white rounded hover:bg-[#006666] transition"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-20">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <svg
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="mt-3 text-xl font-bold text-gray-900">Success!</h2>
              <div className="mt-2">
                <p className="text-gray-600">
                  Your product information has been successfully submitted.
                </p>
              </div>
              <div className="mt-4">
                <button
                  onClick={handleSuccessClose}
                  className="px-4 py-2 bg-[#008080] text-white rounded hover:bg-[#006666] transition"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductContent;