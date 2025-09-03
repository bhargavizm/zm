"use client";

import React, { useState, useRef } from "react";
import { toast } from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";
import useServicesContext from "@/components/hooks/useServiceContext";
import { useDispatch } from "react-redux";
import useDesignContext from "@/components/hooks/useDesignContext";
import { useParams } from "next/navigation";
import LoadingSpinner from "@/components/common/spinner";

const MenuBookContent = () => {
  const { setActiveTab, bgDesign } = useDesignContext();
  const { slug } = useParams();
  const { menuBookFormData, setMenuBookFormData, servicesDataLoading } =
    useServicesContext();

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

    // ✅ Only check total 30MB
    if (total > 30) {
      toast.error(`Total upload size exceeds 30MB`);
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

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setMenuBookFormData((prev) => ({ ...prev, phone: value }));

    if (value && !validatePhone(value)) {
      setValidationErrors((prev) => ({
        ...prev,
        phone: "Phone must be 10 to 15 digits",
      }));
    } else {
      setValidationErrors((prev) => ({ ...prev, phone: "" }));
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setMenuBookFormData((prev) => ({ ...prev, email: value }));

    if (value && !validateEmail(value)) {
      setValidationErrors((prev) => ({
        ...prev,
        email: "Invalid email format",
      }));
    } else {
      setValidationErrors((prev) => ({ ...prev, email: "" }));
    }
  };

  const handleLinkChange = (e) => {
    const value = e.target.value;
    setMenuBookFormData((prev) => ({ ...prev, link: value }));

    if (
      value &&
      linkInputRef.current &&
      !linkInputRef.current.checkValidity()
    ) {
      setValidationErrors((prev) => ({
        ...prev,
        link: "Invalid URL format",
      }));
    } else {
      setValidationErrors((prev) => ({ ...prev, link: "" }));
    }
  };

  const handleInitialSubmit = (e) => {
    e.preventDefault();

    const { phone, email, link } = menuBookFormData;

    // 🔹 Check if there are any errors already present
    const hasLiveErrors = Object.values(validationErrors).some(
      (error) => error && error.trim() !== ""
    );

    if (hasLiveErrors) {
      toast.error("Please fix the highlighted errors before continuing.");
      return; // ❌ Stop, don't open modal
    }

    // 🔹 Check if form is completely empty
    const allEmpty =
      !menuBookFormData.restaurantName &&
      !phone &&
      !email &&
      !link &&
      !menuBookFormData.password &&
      (!menuBookFormData.menuItems || menuBookFormData.menuItems.length === 0);

    if (allEmpty) {
      toast.error("Please fill in at least one field before submitting.");
      return;
    }

    // 🔹 Native browser validation for URL
    if (link && linkInputRef.current && !linkInputRef.current.checkValidity()) {
      linkInputRef.current.reportValidity();
      return;
    }

    // ✅ No errors → Open confirmation modal
    setShowConfirmModal(true);
  };

  //  useSubmitForm(activeService, menuBookFormData, bgDesign);

  const handleSubmit = async () => {
    setActiveTab(slug, "Backdrop Designs");
  };

  return (
    <>
      {servicesDataLoading && <LoadingSpinner />}

      <form>
        <div className="max-w-xl mx-auto p-6 space-y-6 bg-white rounded">
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
            onChange={handlePhoneChange}
            className="w-full border px-4 py-2 rounded"
          />
          {validationErrors.phone && (
            <p className="text-red-500 text-sm">{validationErrors.phone}</p>
          )}

          <label className="font-medium">Email:</label>
          <input
            type="email"
            placeholder="Email"
            value={menuBookFormData.email}
            onChange={handleEmailChange}
            className="w-full border px-4 py-2 rounded"
          />
          {validationErrors.email && (
            <p className="text-red-500 text-sm">{validationErrors.email}</p>
          )}

          {/* ✅ Updated Link field with ref and required */}
          <label className="font-medium">URL:</label>
          <input
            type="url"
            name="link"
            ref={linkInputRef}
            placeholder="Link (https://...)"
            value={menuBookFormData.link}
            onChange={handleLinkChange}
            className="w-full border px-4 py-2 rounded"
          />
          {validationErrors.link && (
            <p className="text-red-500 text-sm">{validationErrors.link}</p>
          )}

          {/* Upload input and previews... (no change) */}
          <label className="font-medium">Upload Menu Images:</label>

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
                ? `${menuBookFormData.menuItems.length} file${
                    menuBookFormData.menuItems.length > 1 ? "s" : ""
                  } selected`
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



          <div className="flex justify-center items-center">
            <button
              type="button"
              onClick={handleInitialSubmit}
              className="font-bold px-4 cursor-pointer bg-[#008080] text-white py-2 rounded transition-effects text-lg"
            >
              Next →
            </button>
          </div>
        </div>
      </form>

      {/* ✅ Confirm Modal — no change needed */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/30">
          <div className="bg-white relative rounded-xl shadow-xl p-6 w-full max-w-4xl max-h-[90vh] border border-teal-200 mx-4 sm:mx-auto">
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
                <p>
                  <b>Restaurant:</b> {menuBookFormData.restaurantName}
                </p>
              )}
              {menuBookFormData.phone && (
                <p>
                  <b>Phone:</b> {menuBookFormData.phone}
                </p>
              )}
              {menuBookFormData.email && (
                <p>
                  <b>Email:</b> {menuBookFormData.email}
                </p>
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
                <p>
                  <b>Password:</b> {menuBookFormData.password}
                </p>
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
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MenuBookContent;
