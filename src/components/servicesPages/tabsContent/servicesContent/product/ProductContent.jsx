"use client";
import React, { useState } from "react";
import Image from "next/image";
import useServicesContext from "@/components/hooks/useServiceContext";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import NFCModal from "@/components/modalPopUps/nfcModal";
import useDesignContext from "@/components/hooks/useDesignContext";

const ProductContent = () => {
  const { productData, setProductData, setProductImage } = useServicesContext();
  const { setIsLoading, setBgDesign } = useDesignContext();

  const [productImages, setProductImages] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  const templateImages = ["temp1.webp", "temp2.webp", "temp3.webp", "temp4.webp"];

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setProductData((prev) => ({ ...prev, [id]: newValue }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProductImage(imageUrl);
      setProductImages((prev) => [...prev, imageUrl]);
    }
  };

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

  return (
    <div>
      <div className="grid grid-cols-1 gap-10">
        <div className="bg-white shadow-xl rounded-xl p-6 space-y-6">
          {/* Templates */}
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

          {/* Product Image Upload */}
          {/* Product Image Upload */}
<div>
  <label className="block mb-2 font-medium text-gray-700">
    Product Image (500x500)
  </label>
  <input
    type="file"
    accept="image/*"
    onChange={handleFileUpload}
    className="w-full text-sm text-gray-700
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-[#008080] file:text-white
      hover:file:bg-[#006666] transition duration-200 cursor-pointer"
  />

  {productImages.length > 0 && (
  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
    {productImages.map((src, idx) => (
      <div key={idx} className="relative">
        <img
          src={src}
          alt={`Uploaded ${idx}`}
          className="rounded object-cover w-24 h-24 border border-gray-300 shadow-sm"
        />
        <button
          onClick={() =>
            setProductImages((prev) => prev.filter((_, i) => i !== idx))
          }
          className="absolute top-[-8px] left-[86px] bg-white text-red-500 cursor-pointer rounded-full w-5 h-5 text-xs flex items-center justify-center shadow-md"
          title="Remove"
        >
          ✖
        </button>
      </div>
    ))}
  </div>
)}

</div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { id: "heading", placeholder: "Product Name" },
              { id: "description", placeholder: "Product Description" },
              { id: "pageUrl", placeholder: "Product Page URL", type: "url" },
              { id: "videoUrl", placeholder: "Product Video URL", type: "url" },
              { id: "email", placeholder: "Contact Email", type: "email" },
              { id: "phone", placeholder: "Phone Number", type: "tel" },
              { id: "password", placeholder: "QR Code Password", type: "password" },
            ].map(({ id, placeholder, type = "text" }) =>
              id === "password" ? (
                <div key={id} className="relative w-full">
                  <input
                    id={id}
                    type={showPassword ? "text" : "password"}
                    value={productData[id] || ""}
                    onChange={handleInputChange}
                    placeholder={placeholder}
                    className="border p-2 pr-10 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#008080]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible size={20} />
                    ) : (
                      <AiOutlineEye size={20} />
                    )}
                  </button>
                </div>
              ) : (
                <input
                  key={id}
                  id={id}
                  type={type}
                  value={productData[id] || ""}
                  onChange={handleInputChange}
                  placeholder={placeholder}
                  className="border p-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#008080]"
                />
              )
            )}
          </div>

          <NFCModal />

          <button
            type="submit"
            className="mt-4 w-full bg-[#008080] text-white font-semibold py-2 rounded hover:bg-[#006666] transition"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductContent;





// "use client";
// import React, { useState } from "react";
// import Image from "next/image";
// import useServicesContext from "@/components/hooks/useServiceContext";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// import NFCModal from "@/components/modalPopUps/nfcModal";
// import useDesignContext from "@/components/hooks/useDesignContext";
// import { MdCancel } from "react-icons/md";

// const ProductContent = () => {
//   const { productData, setProductData, setProductImage } = useServicesContext();
//   const { setIsLoading, setBgDesign } = useDesignContext();

//   const [items, setItems] = useState([
//     { image: "", heading: "", description: "", videoUrl: "", pageUrl: "" },
//   ]);
//   const [showPassword, setShowPassword] = useState(false);

//   const templateImages = ["temp1.webp", "temp2.webp", "temp3.webp", "temp4.webp"];

//   const handleCommonChange = (e) => {
//     const { id, value } = e.target;
//     setProductData((prev) => ({ ...prev, [id]: value }));
//   };

//   const handleItemChange = (index, field, value) => {
//     const updatedItems = [...items];
//     updatedItems[index][field] = value;
//     setItems(updatedItems);
//   };

//   const handleItemImageUpload = (index, file) => {
//     if (file) {
//       const imageUrl = URL.createObjectURL(file);
//       const updatedItems = [...items];
//       updatedItems[index].image = imageUrl;
//       setItems(updatedItems);
//       setProductImage(imageUrl); // Optional: used if needed globally
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

//   const addNewItem = () => {
//     setItems([
//       ...items,
//       { image: "", heading: "", description: "", videoUrl: "", pageUrl: "" },
//     ]);
//   };

//   const removeItem = (index) => {
//     setItems((prev) => prev.filter((_, i) => i !== index));
//   };

//   return (
//     <div>
//       <div className="grid grid-cols-1 gap-10">
//         <div className="bg-white shadow-xl rounded-xl p-6 space-y-6">
//           {/* Template Selection */}
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
//                     src={`/product-templates/${filename}`}
//                     alt={`Template ${idx + 1}`}
//                     width={300}
//                     height={180}
//                     className="object-cover rounded w-full h-auto"
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Multiple Items */}
//           {items.map((item, index) => (
//             <div
//               key={index}
//               className="p-4 border rounded-xl shadow-md bg-gray-50 relative space-y-4"
//             >
//               {items.length > 1 && (
//                 <button
//                   className="absolute top-2 right-2 text-red-500 font-bold text-xl"
//                   onClick={() => removeItem(index)}
//                   title="Remove item"
//                 >
//                   <MdCancel/>
//                 </button>
//               )}
//               {/* Image Upload */}
//               <div>
//                 <label className="block font-medium text-gray-700 mb-2">
//                   Product Image (500x500)
//                 </label>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={(e) => handleItemImageUpload(index, e.target.files[0])}
//                   className="w-full text-sm text-gray-700
//                     file:mr-4 file:py-2 file:px-4
//                     file:rounded-full file:border-0
//                     file:text-sm file:font-semibold
//                     file:bg-[#008080] file:text-white
//                     hover:file:bg-[#006666] transition duration-200 cursor-pointer"
//                 />
//                 {item.image && (
//                   <img
//                     src={item.image}
//                     alt={`Uploaded ${index}`}
//                     className="mt-4 rounded object-cover w-24 h-24 border border-gray-300 shadow-sm"
//                   />
//                 )}
//               </div>

//               {/* Fields for each product */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <input
//                   type="text"
//                   placeholder="Product Name"
//                   value={item.heading}
//                   onChange={(e) => handleItemChange(index, "heading", e.target.value)}
//                   className="border p-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#008080]"
//                 />
//                 <input
//                   type="text"
//                   placeholder="Product Description"
//                   value={item.description}
//                   onChange={(e) => handleItemChange(index, "description", e.target.value)}
//                   className="border p-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#008080]"
//                 />
//                 <input
//                   type="url"
//                   placeholder="Product Page URL"
//                   value={item.pageUrl}
//                   onChange={(e) => handleItemChange(index, "pageUrl", e.target.value)}
//                   className="border p-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#008080]"
//                 />
//                 <input
//                   type="url"
//                   placeholder="Product Video URL"
//                   value={item.videoUrl}
//                   onChange={(e) => handleItemChange(index, "videoUrl", e.target.value)}
//                   className="border p-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#008080]"
//                 />
//               </div>
//             </div>
//           ))}

//           {/* Add Item Button */}
//           <button
//             type="button"
//             onClick={addNewItem}
//             className="w-full bg-white text-[#008080] border border-[#008080] font-semibold py-2 rounded hover:bg-[#f0fdfa] transition"
//           >
//             + Add Another Product
//           </button>

//           {/* Common Fields */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
//             <input
//               id="email"
//               type="email"
//               value={productData.email || ""}
//               onChange={handleCommonChange}
//               placeholder="Contact Email"
//               className="border p-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#008080]"
//             />
//             <input
//               id="phone"
//               type="tel"
//               value={productData.phone || ""}
//               onChange={handleCommonChange}
//               placeholder="Phone Number"
//               className="border p-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#008080]"
//             />
//             <div className="relative">
//               <input
//                 id="password"
//                 type={showPassword ? "text" : "password"}
//                 value={productData.password || ""}
//                 onChange={handleCommonChange}
//                 placeholder="QR Code Password"
//                 className="border p-2 pr-10 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#008080]"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword((prev) => !prev)}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
//               >
//                 {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
//               </button>
//             </div>
//           </div>

//           <NFCModal />

//           {/* Submit */}
//           <button
//             type="submit"
//             className="mt-6 w-full bg-[#008080] text-white font-semibold py-2 rounded hover:bg-[#006666] transition"
//           >
//             Submit
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductContent;
