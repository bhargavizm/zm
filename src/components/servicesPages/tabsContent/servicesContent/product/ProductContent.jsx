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
import NFCModal from "@/components/modalPopUps/nfcModal";
import useDesignContext from "@/components/hooks/useDesignContext";
import { MdCancel, MdDeleteForever } from "react-icons/md"; // Import MdDeleteForever for the remove image icon

/**
 * ProductContent component allows users to input details for multiple products,
 * select a template, and provide common contact information. It updates the
 * shared state in ServicesContext.
 */
const ProductContent = () => {
  // Destructure states and setters from ServicesContext
  const {
    productData,
    productLogo, // Specific logo for product section
    setProductLogo,
    setProductData,
    setProductImage, // For a potential main product image preview
    items,
    setItems,
  } = useServicesContext();

  // Destructure design-related state from DesignContext
  const { setIsLoading, setBgDesign } = useDesignContext();

  // Local state for password visibility
  const [showPassword, setShowPassword] = useState(false);
  // State to control NFCModal visibility
  const [isNFCModalOpen, setIsNFCModalOpen] = useState(false);

  // Array of template image filenames
  const templateImages = ["temp1.webp", "temp2.webp", "temp3.webp", "temp4.webp"];

  /**
   * Initializes the 'items' array in context if it's empty, ensuring
   * there's always at least one input field for a product when the component mounts.
   */
  useEffect(() => {
    if (!items || items.length === 0) {
      setItems([{ image: "", heading: "", description: "", videoUrl: "", pageUrl: "" }]);
    }
  }, [items, setItems]); // Dependencies to re-run only when items or setItems change

  /**
   * Handles changes for common product data fields (e.g., brandName, email, phone, address, password).
   * @param {Event} e - The change event object.
   */
  const handleCommonChange = (e) => {
    const { id, value } = e.target;
    setProductData((prev) => ({ ...prev, [id]: value }));
  };

  /**
   * Handles changes for individual product item fields (e.g., heading, description).
   * Updates the specific item within the 'items' array in ServicesContext.
   * @param {number} index - The index of the item being changed.
   * @param {string} field - The field name (e.g., 'heading', 'description').
   * @param {string} value - The new value for the field.
   */
  const handleItemChange = (index, field, value) => {
    setItems((prevItems) => {
      const updatedItems = [...prevItems]; // Create a shallow copy for immutability
      updatedItems[index] = { ...updatedItems[index], [field]: value };
      return updatedItems;
    });
  };

  /**
   * Handles image file uploads for individual product items.
   * Creates a URL for the uploaded image and updates the 'image' field for the specific item.
   * @param {number} index - The index of the item whose image is being uploaded.
   * @param {File} file - The image file object.
   */
  const handleItemImageUpload = (index, file) => {
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Create a URL for the file blob
      setItems((prevItems) => {
        const updatedItems = [...prevItems];
        updatedItems[index] = { ...updatedItems[index], image: imageUrl };
        return updatedItems;
      });
      // Optionally set the global productImage if it's the first item's image
      if (index === 0) {
        setProductImage(imageUrl);
      }
    }
  };

  /**
   * Handles removing an uploaded image for a specific product item.
   * @param {number} index - The index of the item whose image is to be removed.
   */
  const handleRemoveItemImage = (index) => {
    setItems((prevItems) => {
      const updatedItems = [...prevItems];
      if (updatedItems[index]) {
        if (updatedItems[index].image) {
          URL.revokeObjectURL(updatedItems[index].image); // Clean up the object URL
        }
        updatedItems[index] = { ...updatedItems[index], image: "" }; // Set image to empty string
      }
      return updatedItems;
    });
    // If the removed image was the one used for the main productImage, clear that too
    if (index === 0) {
      setProductImage(null);
    }
  };

  /**
   * Handles brand logo file upload specifically for the product section.
   * Creates a URL for the uploaded logo and sets it to the productLogo state.
   * @param {Event} e - The change event object.
   */
  const handleProductLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const logoUrl = URL.createObjectURL(file);
      setProductLogo(logoUrl); // Update the productLogo state
    }
  };

  /**
   * Handles removing the uploaded product logo.
   */
  const handleRemoveProductLogo = () => {
    if (productLogo) {
      URL.revokeObjectURL(productLogo); // Clean up the object URL
    }
    setProductLogo(null);
  };

  /**
   * Handles selection of a product template.
   * Updates selectedTemplate in productData and manages loading state.
   * @param {string} filename - The filename of the selected template image.
   * @param {number} index - The index of the selected template.
   */
  const handleTemplateSelect = (filename, index) => {
    if (productData.selectedTemplate !== index) {
      setIsLoading(true); // Start loading animation
      setProductData((prev) => ({
        ...prev,
        selectedTemplate: index,
      }));
      setBgDesign(null); // Clear background design if template changes (optional, depending on UX)
      setTimeout(() => setIsLoading(false), 300); // Stop loading after a short delay
    }
  };

  /**
   * Adds a new empty product item to the 'items' array, creating new input fields.
   */
  const addNewItem = () => {
    setItems((prevItems) => [
      ...prevItems,
      { image: "", heading: "", description: "", videoUrl: "", pageUrl: "" },
    ]);
  };

  /**
   * Removes a product item from the 'items' array based on its index.
   * @param {number} index - The index of the item to be removed.
   */
  const removeItem = (index) => {
    setItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  // Prepares data for the NFC Modal
  const getNFCData = () => {
    const allProductDetails = items.map(item => ({
      heading: item.heading,
      description: item.description,
      pageUrl: item.pageUrl,
      videoUrl: item.videoUrl,
    }));
    return JSON.stringify({
      brandName: productData.brandName || "N/A",
      contactEmail: productData.email || "N/A",
      contactPhone: productData.phone || "N/A",
      contactAddress: productData.address || "N/A",
      qrPassword: productData.password || "N/A",
      products: allProductDetails
    }, null, 2); // Pretty print JSON
  };

  return (
    <div>
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
                    src={/product-templates/${filename}}
                    alt={Template ${idx + 1}}
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
                  src={productLogo} // Using the productLogo state
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
            <label htmlFor="brandName" className="block font-medium text-gray-700 mb-2 mt-4">Brand Name</label>
            <input
              id="brandName"
              type="text"
              value={productData.brandName || ""}
              onChange={handleCommonChange}
              placeholder="Your Brand Name"
              className="border p-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#008080]"
            />
          </div>

          {/* Dynamic Section for Multiple Product Items */}
          {items && items.length > 0 ? (
            items.map((item, index) => (
              <div
                key={index}
                className="p-4 border rounded-xl shadow-md bg-gray-50 relative space-y-4"
              >
                {/* Remove button for product item */}
                {items.length > 1 && (
                  <button
                    className="absolute top-2 right-2 text-red-500 font-bold text-xl"
                    onClick={() => removeItem(index)}
                    title="Remove item"
                  >
                    <MdCancel />
                  </button>
                )}
                {/* Image Upload for individual product item */}
                <div>
                  <label className="block font-medium text-gray-700 mb-2">
                    Product Image (500x500)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleItemImageUpload(index, e.target.files[0])}
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
                        alt={Uploaded ${index}}
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

                {/* Input Fields for each product item */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Product Name"
                    value={item.heading}
                    onChange={(e) => handleItemChange(index, "heading", e.target.value)}
                    className="border p-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#008080]"
                  />
                  <input
                    type="text"
                    placeholder="Product Description"
                    value={item.description}
                    onChange={(e) => handleItemChange(index, "description", e.target.value)}
                    className="border p-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#008080]"
                  />
                  <input
                    type="url"
                    placeholder="Product Page URL"
                    value={item.pageUrl}
                    onChange={(e) => handleItemChange(index, "pageUrl", e.target.value)}
                    className="border p-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#008080]"
                  />
                  <input
                    type="url"
                    placeholder="Product Video URL"
                    value={item.videoUrl}
                    onChange={(e) => handleItemChange(index, "videoUrl", e.target.value)}
                    className="border p-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#008080]"
                  />
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-4">Add your first product to get started!</p>
          )}

          {/* Button to Add Another Product */}
          <button
            type="button"
            onClick={addNewItem}
            className="w-full bg-white text-[#008080] border border-[#008080] font-semibold py-2 rounded hover:bg-[#f0fdfa] transition"
          >
            + Add Another Product
          </button>

          {/* Common Contact Fields (Email, Phone, Address, Password) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <input
              id="email"
              type="email"
              value={productData.email || ""}
              onChange={handleCommonChange}
              placeholder="Contact Email"
              className="border p-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#008080]"
            />
            <input
              id="phone"
              type="tel"
              value={productData.phone || ""}
              onChange={handleCommonChange}
              placeholder="Phone Number"
              className="border p-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#008080]"
            />
            <input
              id="address"
              type="text"
              value={productData.address || ""}
              onChange={handleCommonChange}
              placeholder="Address"
              className="border p-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#008080]"
            />
            {/* QR Code Password Field with Toggle */}
            <div className="relative">
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
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
              </button>
            </div>
          </div>

          

          {/* NFC Modal Component */}
          <NFCModal
            isOpen={isNFCModalOpen}
            onClose={() => setIsNFCModalOpen(false)}
            qrCodeData={getNFCData()} // Pass combined data to the modal
          />

          {/* Submit Button (Placeholder for actual form submission) */}
          <button
            type="submit"
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