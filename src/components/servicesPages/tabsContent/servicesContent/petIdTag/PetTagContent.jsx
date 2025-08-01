"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import useServicesContext from "@/components/hooks/useServiceContext";
import useDesignContext from "@/components/hooks/useDesignContext";
import NFCModal from "@/components/modalPopUps/nfcModal";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { MapPin, Check, X } from "lucide-react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setPetIdServices } from "@/redux/slices/servicesSlice";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import LoadingSpinner from "@/components/common/spinner";

// --- Hypothetical PetTagPreview Component ---
// This component displays the data within the confirmation modal.
// Ensure your actual PetTagPreview uses these props correctly.
const PetTagPreview = ({ petData }) => {
  if (!petData) return null; // Defensive check for when petData might be undefined

  return (
    <div className="p-4 bg-gray-50 rounded-lg text-center border border-gray-200">
      <h3 className="font-bold text-xl mb-4 text-gray-800">Pet Tag Preview</h3>

      {petData.selectedTemplate && (
        <div className="mb-6">
          <p className="text-sm text-gray-600 mb-2">Selected Template:</p>
          <Image
            src={`/pet-id/${petData.selectedTemplate}`}
            alt={`Template ${petData.selectedTemplate}`}
            width={300}
            height={180}
            className="object-contain rounded-lg border-2 border-mainGreen shadow-md mx-auto"
            priority
          />
        </div>
      )}

      {petData.previewUrl && (
        <div className="mb-6">
          <p className="text-sm text-gray-600 mb-2">Uploaded Pet Image:</p>
          <Image
            src={petData.previewUrl}
            alt="Uploaded Pet"
            width={120}
            height={120}
            className="rounded-full object-cover mx-auto border-2 border-gray-300 shadow-sm"
          />
        </div>
      )}

      <div className="text-left space-y-3">
        <h4 className="font-semibold text-lg text-gray-700 border-b pb-2 mb-3">Owner Information:</h4>
        {petData.ownerInfo.name && renderPreviewField("Owner Name", petData.ownerInfo.name)}
        {petData.ownerInfo.phone && renderPreviewField("Phone Number", petData.ownerInfo.phone)}
        {petData.ownerInfo.email && renderPreviewField("Email Address", petData.ownerInfo.email)}
        {petData.ownerInfo.address && renderPreviewField("Address", petData.ownerInfo.address)}
        {petData.ownerInfo.password && renderPreviewField("QR Password Set", "Yes")}
        {/* You can optionally show 'visible' status if relevant to the preview */}
        {/* {renderPreviewField("Owner Info Visible", petData.ownerInfo.visible ? "Yes" : "No")} */}


        <h4 className="font-semibold text-lg text-gray-700 border-b pb-2 mt-6 mb-3">Pet Information:</h4>
        {petData.pet.name && renderPreviewField("Pet Name", petData.pet.name)}
        {petData.pet.breed && renderPreviewField("Breed", petData.pet.breed)}
        {petData.pet.color && renderPreviewField("Color", petData.pet.color)}
        {/* You can add pet.images preview here if applicable */}
        {/* {renderPreviewField("Pet Info Visible", petData.pet.visible ? "Yes" : "No")} */}
      </div>
    </div>
  );
};

// Helper function for rendering preview fields (can be moved outside if used elsewhere)
const renderPreviewField = (label, value) => {
  return (
    <div className="mb-2">
      <h5 className="text-sm font-medium text-gray-500">{label}</h5>
      <p className="text-gray-800 break-words">{value || <span className="text-gray-400">Not provided</span>}</p>
    </div>
  );
};


const PetTagContent = () => {
  const { setActiveTab, setIsLoading, setBgDesign } = useDesignContext();
  const { slug } = useParams();
  // Destructure petIDFormData directly from context
  const { petIDFormData, setPetIDFormData, servicesDataLoading, setServicesDataLoading } = useServicesContext();

  const [showPassword, setShowPassword] = useState(false);
  const [file, setFile] = useState(null); // Stores the actual File object for submission
  const [submitting, setSubmitting] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const templateImages = ["pet1.webp", "pet2.webp", "pet3.webp", "pet4.webp"];

  // Effect to clean up URL.createObjectURL when component unmounts or previewUrl changes
  useEffect(() => {
    return () => {
      // Check if previewUrl exists and is a string URL
      if (petIDFormData.previewUrl && typeof petIDFormData.previewUrl === 'string') {
        URL.revokeObjectURL(petIDFormData.previewUrl);
      }
    };
  }, [petIDFormData.previewUrl]);


  const handleInputChange = (e) => {
    const { id, value } = e.target;
    // This handler would be for root-level fields if you had any
    // Currently, all inputs are nested under ownerInfo or pet
    setPetIDFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleOwnerChange = (e) => {
    const { id, value } = e.target;

    // Phone number validation
    if (id === "phone") {
      const phoneRegex = /^[0-9]{10,15}$/;
      if (value && !phoneRegex.test(value)) {
        setPhoneError("Please enter a valid phone number (10-15 digits)");
      } else {
        setPhoneError("");
      }
    }

    setPetIDFormData((prev) => ({
      ...prev,
      ownerInfo: {
        ...prev.ownerInfo,
        [id]: value,
      },
    }));
  };

  const handlePetChange = (e) => {
    const { id, value } = e.target;
    setPetIDFormData((prev) => ({
      ...prev,
      pet: {
        ...prev.pet,
        [id]: value,
      },
    }));
  };

  const handleImageUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      // Clean up previous URL if it exists
      if (petIDFormData.previewUrl && typeof petIDFormData.previewUrl === 'string') {
        URL.revokeObjectURL(petIDFormData.previewUrl);
      }
      const previewUrl = URL.createObjectURL(uploadedFile);
      setFile(uploadedFile); // Store the actual File object for potential submission
      setPetIDFormData((prev) => ({
        ...prev,
        mainImage: uploadedFile, // You might send this file directly in FormData
        previewUrl: previewUrl,  // This is the string URL for display
      }));
    } else {
      // If user cancels file selection or clears it via the browser's file input
      if (petIDFormData.previewUrl && typeof petIDFormData.previewUrl === 'string') {
        URL.revokeObjectURL(petIDFormData.previewUrl);
      }
      setFile(null);
      setPetIDFormData((prev) => ({
        ...prev,
        mainImage: null,
        previewUrl: "", // Reset to empty string
      }));
    }
  };

  const clearImage = () => {
    if (petIDFormData.previewUrl && typeof petIDFormData.previewUrl === 'string') {
      URL.revokeObjectURL(petIDFormData.previewUrl); // Clean up the object URL
    }
    setFile(null);
    setPetIDFormData((prev) => ({
      ...prev,
      mainImage: null, // Clear the file object
      previewUrl: "",  // Clear the preview URL
    }));
    // Reset the input field value to allow re-uploading the same file
    const imageInput = document.getElementById("imageInput");
    if (imageInput) {
      imageInput.value = "";
    }
  };

  const handleTemplateSelect = (selectedTemplate) => {
    // Only update if a new template is selected to avoid unnecessary re-renders/loading
    if (petIDFormData.selectedTemplate !== selectedTemplate) {
      setIsLoading(true); // Show loading spinner
      setPetIDFormData((prev) => ({
        ...prev,
        selectedTemplate,
      }));
      setBgDesign(null); // Assuming setBgDesign is used to clear/update background design
      setTimeout(() => setIsLoading(false), 300); // Simulate a short loading time
    }
  };

  const fetchCurrentLocation = async () => {
    if (navigator.geolocation) {
      try {
        setServicesDataLoading(true); // Show global loading spinner
        const pos = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
          });
        });

        const { latitude, longitude } = pos.coords;
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
        );
        const data = await response.json();
        const fullAddress = data.display_name || "Address not found";

        setPetIDFormData((prev) => ({
          ...prev,
          ownerInfo: {
            ...prev.ownerInfo,
            address: fullAddress,
          },
        }));
        toast.success("Current location fetched successfully!");
      } catch (err) {
        console.error("Error fetching current location:", err.message);
        let errorMessage = "Failed to fetch location.";
        if (err.code === 1) { // PERMISSION_DENIED
          errorMessage += " Please enable location permissions for your browser.";
        } else if (err.code === 2) { // POSITION_UNAVAILABLE
          errorMessage += " Location information is unavailable.";
        } else if (err.code === 3) { // TIMEOUT
          errorMessage += " The request to get user location timed out.";
        }
        toast.error(errorMessage);
      } finally {
        setServicesDataLoading(false); // Hide global loading spinner
      }
    } else {
      toast.error("Geolocation not supported by your browser.");
    }
  };

  const handlePreviewSubmit = (e) => {
    e.preventDefault();

    // Prevent submission if phone number has a validation error
    if (petIDFormData.ownerInfo.phone && phoneError) {
      toast.error(phoneError);
      return;
    }

    const { selectedTemplate, mainImage, ownerInfo, pet } = petIDFormData;

    // Check if at least one meaningful field is filled
    const isAnyOwnerInfoFilled = Object.values(ownerInfo).some(
      (v) => (v !== null && v !== undefined && v.toString().trim() !== "") && v !== true // Exclude boolean `visible`
    );
    const isAnyPetInfoFilled = Object.values(pet).some(
      (v) => (v !== null && v !== undefined && v.toString().trim() !== "") && v !== true && !Array.isArray(v) // Exclude boolean `visible` and `images` array
    );
    const isTemplateSelected = !!selectedTemplate; // Check if a template is selected
    const isImageUploaded = !!mainImage; // Check if a file object is present

    if (!isAnyOwnerInfoFilled && !isAnyPetInfoFilled && !isTemplateSelected && !isImageUploaded) {
      toast.error("Please fill at least one information field, select a template, or upload an image before submitting.");
      return;
    }

    setShowPreviewModal(true);
  };

  const handleFinalSubmit = async () => {
    setActiveTab(slug, "Backdrop Designs");
    // setSubmitting(true);
    // setServicesDataLoading(true); // Show global loading spinner

    // try {
    //     const formData = new FormData();
    //     // Append all string/primitive values from petIDFormData
    //     formData.append("selectedTemplate", petIDFormData.selectedTemplate || "");
    //     formData.append("ownerName", petIDFormData.ownerInfo.name);
    //     formData.append("ownerPhone", petIDFormData.ownerInfo.phone);
    //     formData.append("ownerEmail", petIDFormData.ownerInfo.email);
    //     formData.append("ownerAddress", petIDFormData.ownerInfo.address);
    //     formData.append("qrPassword", petIDFormData.ownerInfo.password); // Correct path
    //     formData.append("ownerVisible", petIDFormData.ownerInfo.visible); // Send boolean as string or convert
    //     formData.append("petName", petIDFormData.pet.name);
    //     formData.append("petBreed", petIDFormData.pet.breed);
    //     formData.append("petColor", petIDFormData.pet.color);
    //     formData.append("petVisible", petIDFormData.pet.visible); // Send boolean as string or convert

    //     // Append the actual image file if it exists
    //     if (file) {
    //         formData.append("petImage", file); // 'file' state holds the File object
    //     }

    //     // Handle pet.images if you plan to upload multiple images
    //     // petIDFormData.pet.images.forEach((img, index) => {
    //     //   formData.append(`petImages[${index}]`, img);
    //     // });


    //     // Replace with your actual API endpoint for submitting pet tag data
    //     const response = await axios.post("/api/pet-tags", formData, {
    //         headers: {
    //             "Content-Type": "multipart/form-data", // Important for FormData
    //         },
    //     });

    //     if (response.data.success) {
    //         toast.success("Pet ID Tag has been created successfully!");
    //         setShowPreviewModal(false); // Close the preview modal
    //         setShowSuccessModal(true); // Show the success message modal

    //         // Dispatch to Redux (if needed, e.g., storing the new pet ID tag's ID)
    //         dispatch(setPetIdServices(response.data.petTagId));

    //         // Optional: Reset form after successful submission
    //         // You'll need to define initialPetIDFormData in this file too if you want to use it directly
    //         // Otherwise, set individual fields or get from context's initial state if possible
    //         // setPetIDFormData(getInitialPetIDFormDataFromContext()); // Example

    //         // After a short delay, hide success modal and navigate/change tab
    //         setTimeout(() => {
    //             setShowSuccessModal(false);
    //             // Example: Navigate to another tab/section of your service creation flow
    //             setActiveTab(slug, "Backdrop Designs");
    //             // Or navigate to a confirmation/view page:
    //             // router.push(`/services/${slug}/pet-tag-confirmation/${response.data.petTagId}`);
    //         }, 2000); // Display success message for 2 seconds

    //     } else {
    //         toast.error(response.data.message || "Failed to create Pet ID Tag. Please try again.");
    //     }
    // } catch (error) {
    //     console.error("Error submitting pet tag:", error);
    //     toast.error("An unexpected error occurred during submission. Please check your network and try again.");
    // } finally {
    //     setSubmitting(false);
    //     setServicesDataLoading(false); // Hide global loading spinner
    // }
  };


  return (
    <>
      {servicesDataLoading && <LoadingSpinner />}

      <form onSubmit={handlePreviewSubmit}>
        <div className="grid grid-cols-1 gap-10">
          <div className="bg-white shadow-xl rounded-xl p-6 space-y-6">
            {/* Pet Tag Templates */}
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Pet Tag Templates (click to select)
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {templateImages.map((filename, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleTemplateSelect(filename)}
                    className={`relative rounded-md border-2 cursor-pointer transition-all p-1 ${
                      petIDFormData.selectedTemplate === filename
                        ? "border-[#008080] ring-2 ring-[#008080]"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <Image
                      src={`/pet-id/${filename}`}
                      alt={`Template ${idx + 1}`}
                      width={300}
                      height={180}
                      className="object-cover rounded w-full h-auto"
                      priority
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Pet Image Upload */}
            <div>
              <label htmlFor="imageInput" className="block mb-2 font-medium text-gray-800">
                Upload Pet Image
              </label>
              <input
                id="imageInput"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#008080] file:text-white hover:file:bg-[#006666] transition duration-200 cursor-pointer"
              />
              {petIDFormData.previewUrl && (
                <div className="mt-3 relative w-max">
                  <Image
                    src={petIDFormData.previewUrl}
                    alt="Pet preview"
                    width={100}
                    height={100}
                    className="rounded object-cover"
                  />
                  <button
                    onClick={clearImage}
                    type="button"
                    className="absolute top-[-8px] right-[-8px] bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center hover:bg-red-600 transition"
                    aria-label="Clear image"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>

            {/* Owner Information */}
            <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-800 border-b pb-2">Owner Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        id="name"
                        value={petIDFormData.ownerInfo.name}
                        onChange={handleOwnerChange}
                        placeholder="Owner Name"
                        className="border p-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#008080]"
                    />
                    <div>
                        <input
                            type="tel"
                            id="phone"
                            value={petIDFormData.ownerInfo.phone}
                            onChange={handleOwnerChange}
                            placeholder="Phone Number"
                            className={`border p-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 ${phoneError ? "focus:ring-red-500 border-red-500" : "focus:ring-[#008080]"}`}
                        />
                        {phoneError && (
                            <p className="mt-1 text-sm text-red-600">{phoneError}</p>
                        )}
                    </div>
                    <input
                        type="email"
                        id="email"
                        value={petIDFormData.ownerInfo.email}
                        onChange={handleOwnerChange}
                        placeholder="Email Address"
                        className="border p-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#008080]"
                    />

                    <div className="space-y-2 col-span-1 md:col-span-2">
                        <textarea
                            id="address"
                            value={petIDFormData.ownerInfo.address}
                            onChange={handleOwnerChange}
                            placeholder="Address"
                            rows={3}
                            className="border p-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#008080] resize-none"
                        />
                        <button
                            type="button"
                            onClick={fetchCurrentLocation}
                            className="flex items-center justify-center w-full py-2 px-3 bg-mainGreen text-white text-sm rounded-lg hover:bg-[#006666] transition-colors duration-200 cursor-pointer"
                        >
                            <MapPin size={16} className="mr-2" />
                            Use Current Location
                        </button>
                    </div>
                </div>
            </div>

            {/* Pet Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-800 border-b pb-2">
                Pet Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {["name", "breed", "color"].map((field) => (
                  <input
                    key={field}
                    type="text"
                    id={field}
                    value={petIDFormData.pet[field]}
                    onChange={handlePetChange}
                    placeholder={`Pet ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                    className="border p-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#008080]"
                  />
                ))}
              </div>
            </div>

            {/* QR Password */}
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={petIDFormData.ownerInfo.password} // Corrected path to ownerInfo.password
                onChange={handleOwnerChange} // Now uses ownerInfo handler
                placeholder="QR Password"
                className="border p-2 pr-10 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#008080]"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <AiOutlineEye size={20} />
                ) : (
                  <AiOutlineEyeInvisible size={20} />
                )}
              </button>
            </div>

            <NFCModal /> {/* Your NFC modal component */}

            <button
              type="submit"
              disabled={submitting || servicesDataLoading} 
              className="mt-4 w-full bg-[#008080] text-white font-semibold py-3 rounded-lg hover:bg-[#006666] transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      </form>

      {/* Preview/Confirm Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transform scale-95 animate-scaleIn">
            <div className="p-6">
              <div className="mb-6 px-4 py-3 flex justify-between items-start gap-4 border-b pb-4">
                {/* Heading and Subtext */}
                <div className="flex flex-col">
                  <h2 className="text-2xl font-bold text-gray-800">Confirm Submission</h2>
                  <p className="text-sm text-gray-600 mt-1 max-w-md">
                    Please review all details carefully before confirming your pet tag information.
                  </p>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setShowPreviewModal(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                  aria-label="Close modal"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Display the PetTagPreview component inside the modal */}
              <div className="p-4">
                <PetTagPreview petData={petIDFormData} />
              </div>

              <div className="mt-8 flex flex-col sm:flex-row justify-end gap-3 px-4">
                <button
                  type="button"
                  onClick={() => setShowPreviewModal(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition duration-200"
                >
                  Edit Information
                </button>
                <button
                  type="button"
                  onClick={handleFinalSubmit}
                  disabled={submitting}
                  className="px-6 py-2 bg-[#008080] text-white rounded-lg hover:bg-[#006666] disabled:opacity-70 disabled:cursor-not-allowed transition flex items-center justify-center min-w-[180px]"
                >
                  {submitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Check className="mr-1" size={18} />
                      Confirm and Submit
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md animate-scaleIn">
            <div className="p-6 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <Check className="h-6 w-6 text-mainGreen" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Success!</h3>
              <p className="text-gray-600">Your Pet ID Tag has been created successfully.</p>
              <div className="mt-6">
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  {/* Tailwind CSS keyframes for animation (add to your tailwind.config.js if not present) */}
                  {/* @keyframes countdown { from { width: 0%; } to { width: 100%; } } */}
                  <div className="bg-mainGreen h-1.5 rounded-full animate-[countdown_2s_linear_forwards]" />
                </div>
                <p className="mt-2 text-sm text-gray-500">Redirecting...</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PetTagContent;