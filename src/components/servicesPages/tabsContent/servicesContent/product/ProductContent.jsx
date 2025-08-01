"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import useServicesContext from "@/components/hooks/useServiceContext";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import NFCModal from "@/components/modalPopUps/nfcModal";
import useDesignContext from "@/components/hooks/useDesignContext";
import { MdCancel, MdDeleteForever } from "react-icons/md";
import { toast } from "react-hot-toast";
import { useParams } from "next/navigation";
import LoadingSpinner from "@/components/common/spinner";

const ProductContent = () => {
  const { setActiveTab, setIsLoading, setBgDesign } = useDesignContext();
  const { slug } = useParams();
  // Context states
  const {
    productData,
    setProductData,

    servicesDataLoading,
    setServicesDataLoading,
  } = useServicesContext();

  // State variables
  const [showPassword, setShowPassword] = useState(false);
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
  const logoInputRef = useRef(null);

  // Constants
  const MAX_SINGLE_FILE_SIZE = 2 * 1024 * 1024; // 2MB
  const MAX_TOTAL_SIZE = 30 * 1024 * 1024; // 30MB
  const templateImages = [
    "temp1.webp",
    "temp2.webp",
    "temp3.webp",
    "temp4.webp",
  ];

  // Initialize items array if empty
  useEffect(() => {
    if (!productData.items || productData.items.length === 0) {
      setProductData((prev) => ({
        ...prev,
        items: [
          {
            productImage: "",
            heading: "",
            description: "",
            pageUrl: "",
            videoUrl: "",
          },
        ],
      }));
      setFieldErrors((prev) => ({
        ...prev,
        items: [
          {
            heading: "",
            pageUrl: "",
            videoUrl: "",
          },
        ],
      }));
    }
  }, [productData.items, setProductData]);

  // Validate email format
  const validateEmail = (email) => {
    if (!email) return true; // Not required
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

  // Check if at least one field is filled
  const hasAtLeastOneFieldFilled = () => {
    // Check product data fields
    if (
      productData.brandName ||
      productData.email ||
      productData.phone ||
      productData.address ||
      productData.password
    ) {
      return true;
    }

    // Check items
    return productData?.items.some(
      (item) =>
        item.heading ||
        item.description ||
        item.pageUrl ||
        item.videoUrl ||
        item.image
    );
  };

  // Handle common input changes with validation
  const handleCommonChange = (e) => {
    const { id, value } = e.target;
    setProductData((prev) => ({ ...prev, [id]: value }));

    // Validate in real-time
    if (id === "email") {
      setFieldErrors((prev) => ({
        ...prev,
        email: value && !validateEmail(value) ? "Invalid email format" : "",
      }));
    } else if (id === "phone") {
      setFieldErrors((prev) => ({
        ...prev,
        phone:
          value && !validatePhone(value)
            ? "Invalid phone number (10-15 digits)"
            : "",
      }));
    }
  };

  // Handle item field changes with validation
  const handleItemChange = (index, field, value) => {
    const updatedItems = [...productData.items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setProductData((prev) => ({ ...prev, items: updatedItems }));

    if (field === "pageUrl" || field === "videoUrl") {
      const isValid = validateUrl(value);
      setFieldErrors((prev) => {
        const newItemsErrors = [...prev.items];
        newItemsErrors[index] = {
          ...newItemsErrors[index],
          [field]: !isValid ? "Invalid URL format" : "",
        };
        return { ...prev, items: newItemsErrors };
      });
    }
  };

  // Handle product logo upload with validation
  const handleProductLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > MAX_SINGLE_FILE_SIZE) {
      showFileSizeError();
      e.target.value = "";
      return;
    }

    const totalSize = calculateTotalImageSize(file);
    if (totalSize > MAX_TOTAL_SIZE) {
      setValidationError("Total image size exceeds 30MB limit");
      setShowValidationModal(true);
      e.target.value = "";
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setProductData((prev) => ({
      ...prev,
      productLogo: {
        preview: previewUrl,
        file: file, // store actual File
      },
    }));
  };

  // Handle item image upload with validation
  const handleItemImageUpload = async (index, e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > MAX_SINGLE_FILE_SIZE) {
      showFileSizeError();
      e.target.value = "";
      return;
    }

    const totalSize = calculateTotalImageSize(file);
    if (totalSize > MAX_TOTAL_SIZE) {
      setValidationError("Total image size exceeds 30MB limit");
      setShowValidationModal(true);
      e.target.value = "";
      return;
    }

    const previewUrl = URL.createObjectURL(file);

    const updatedItems = [...productData.items];
    updatedItems[index].productImage = {
      preview: previewUrl,
      file: file, // store actual File
    };

    setProductData((prev) => ({
      ...prev,
      items: updatedItems,
    }));
  };

  // Calculate total size of all uploaded images
  const calculateTotalImageSize = (newFile) => {
    let totalSize = newFile ? newFile.size : 0;

    if (productData.productLogo?.file)
      totalSize += productData.productLogo.file.size;

    productData.items.forEach((item) => {
      if (item.productImage?.file) {
        totalSize += item.productImage.file.size;
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
    if (productData.productLogo?.preview) {
      URL.revokeObjectURL(productData.productLogo.preview);
    }

    setProductData((prev) => ({
      ...prev,
      productLogo: null,
    }));

    if (logoInputRef.current) logoInputRef.current.value = "";
  };

  // Remove item image
  const handleRemoveItemImage = (index) => {
    const updatedItems = [...productData.items];

    if (updatedItems[index]?.productImage?.preview) {
      URL.revokeObjectURL(updatedItems[index].productImage.preview);
    }

    updatedItems[index].productImage = null;

    setProductData((prev) => ({
      ...prev,
      items: updatedItems,
    }));

    if (fileInputRefs.current[index]) {
      fileInputRefs.current[index].value = "";
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
    setProductData((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          productImage: "",
          heading: "",
          description: "",
          videoUrl: "",
          pageUrl: "",
        },
      ],
    }));
    setFieldErrors((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          heading: "",
          pageUrl: "",
          videoUrl: "",
        },
      ],
    }));
  };

  const removeItem = (index) => {
    const updatedItems = [...productData.items];
    if (updatedItems[index].productImage) {
      URL.revokeObjectURL(updatedItems[index].productImage);
    }
    updatedItems.splice(index, 1);

    setProductData((prev) => ({
      ...prev,
      items: updatedItems,
    }));
    setFieldErrors((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
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
      email: "",
      phone: "",
      items: productData?.items.map((item) => ({
        pageUrl: "",
        videoUrl: "",
      })),
    };

    // Validate email format if provided
    if (productData.email && !validateEmail(productData.email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    // Validate phone format if provided
    if (productData.phone && !validatePhone(productData.phone)) {
      newErrors.phone = "Invalid phone number (10-15 digits)";
      isValid = false;
    }

    // Validate URLs in items
    productData?.items.forEach((item, index) => {
      if (item.pageUrl && !validateUrl(item.pageUrl)) {
        newErrors.items[index].pageUrl = "Invalid URL format";
        isValid = false;
      }
      if (item.videoUrl && !validateUrl(item.videoUrl)) {
        newErrors.items[index].videoUrl = "Invalid URL format";
        isValid = false;
      }
    });

    setFieldErrors(newErrors);

    // Check if at least one field is filled
    if (!hasAtLeastOneFieldFilled()) {
      toast.error("Please fill at least one field");
      // setShowValidationModal(true);
      return false;
    }

    return isValid;
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    setShowSubmitModal(true);
  };

  // Confirm submission
  const confirmSubmit = async () => {
    setActiveTab(slug, "Backdrop Designs");
    setShowSubmitModal(false);

    const submissionData = {
      ...productData,
    };
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
    <>
      {servicesDataLoading && <LoadingSpinner />}

      <div>
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
                ref={logoInputRef}
                className="w-full text-sm text-gray-700
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-[#008080] file:text-white
                    hover:file:bg-[#006666] transition duration-200 cursor-pointer mb-4"
              />
              {productData?.productLogo && (
                <div className="relative w-fit">
                  <img
                    src={productData?.productLogo?.preview}
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
                Brand Name
              </label>
              <input
                id="brandName"
                type="text"
                value={productData.brandName || ""}
                onChange={handleCommonChange}
                placeholder="Your Brand Name"
                className="border p-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#008080]"
              />
            </div>

            {/* Product Items */}
            {productData?.items && productData?.items.length > 0 ? (
              productData?.items.map((item, index) => (
                <div
                  key={index}
                  className="p-4 border rounded-xl shadow-md bg-gray-50 relative space-y-4"
                >
                  {productData?.items.length > 1 && (
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
                      Product Image{" "}
                      <span className="font-normal text-gray-700 mb-2">
                        (Max 2MB)
                      </span>
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleItemImageUpload(index, e)}
                      ref={(el) => (fileInputRefs.current[index] = el)}
                      className="w-full text-sm text-gray-700
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-[#008080] file:text-white
                      hover:file:bg-[#006666] transition duration-200 cursor-pointer"
                    />
                    {item.productImage && (
                      <div className="relative w-fit">
                        <img
                          src={item.productImage?.preview}
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
                        placeholder="Product Name"
                        value={item.heading}
                        onChange={(e) =>
                          handleItemChange(index, "heading", e.target.value)
                        }
                        className="border p-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#008080]"
                      />
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
                        className={`border p-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 ${
                          fieldErrors.items[index]?.pageUrl
                            ? "border-red-500 focus:ring-red-500"
                            : "focus:ring-[#008080]"
                        }`}
                      />
                      {fieldErrors.items[index]?.pageUrl && (
                        <p className="text-red-500 text-sm mt-1">
                          {fieldErrors.items[index].pageUrl}
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
                        className={`border p-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 ${
                          fieldErrors.items[index]?.videoUrl
                            ? "border-red-500 focus:ring-red-500"
                            : "focus:ring-[#008080]"
                        }`}
                      />
                      {fieldErrors.items[index]?.videoUrl && (
                        <p className="text-red-500 text-sm mt-1">
                          {fieldErrors.items[index].videoUrl}
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
                <label className="block font-medium text-gray-700 mb-2">
                  Contact Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={productData.email || ""}
                  onChange={handleCommonChange}
                  placeholder="Contact Email"
                  className={`border p-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 ${
                    fieldErrors.email
                      ? "border-red-500 focus:ring-red-500"
                      : "focus:ring-[#008080]"
                  }`}
                />
                {fieldErrors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {fieldErrors.email}
                  </p>
                )}
              </div>
              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={productData.phone || ""}
                  onChange={handleCommonChange}
                  placeholder="Phone Number"
                  className={`border p-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 ${
                    fieldErrors.phone
                      ? "border-red-500 focus:ring-red-500"
                      : "focus:ring-[#008080]"
                  }`}
                />
                {fieldErrors.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {fieldErrors.phone}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label className="block font-medium text-gray-700 mb-2">
                Address
              </label>
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
              <label className="block font-medium text-gray-700 mb-2">
                QR Code Password
              </label>
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

            {/* Submit Button */}
            <div className="flex justify-center items-center">
              <button
                type="button"
                onClick={handleSubmit}
                className="font-bold px-4 cursor-pointer bg-[#008080] text-white py-2 rounded transition-effects text-lg"
              >
                Next →
              </button>
            </div>
          </div>
        </div>

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
              <p className="mb-6">
                Are you sure you want to submit this product information?
              </p>
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
                  Continue
                </button>
              </div>
            </div>
          </ModalBackdrop>
        )}

        {/* Success Modal */}
        {showSuccessModal && (
          <ModalBackdrop onClose={() => setShowSuccessModal(false)}>
            <div className="p-4 text-center">
              <p className="text-mainGreen font-medium mb-4">
                Product submitted successfully!
              </p>
              <button
                onClick={() => setShowSuccessModal(false)}
                className="px-4 py-2 bg-[#008080] text-white rounded hover:bg-[#006666] transition"
              >
                OK
              </button>
            </div>
          </ModalBackdrop>
        )}
      </div>
    </>
  );
};

export default ProductContent;
