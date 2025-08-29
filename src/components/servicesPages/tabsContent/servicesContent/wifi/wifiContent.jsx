"use client";

import React, { useState } from "react";
import { Lock, Wifi, Eye, EyeOff, Shield } from "lucide-react";
import useServicesContext from "@/components/hooks/useServiceContext";
import NFCModal from "@/components/modalPopUps/nfcModal";
import { useDispatch } from "react-redux";
import { setWifiServices } from "@/redux/slices/servicesSlice";
import useDesignContext from "@/components/hooks/useDesignContext";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import LoadingSpinner from "@/components/common/spinner";

const WifiContent = () => {
  const { setActiveTab } = useDesignContext();
  const { slug } = useParams();
  const {
    wifiFormData,
    setWifiFormData,
    servicesDataLoading,
  } = useServicesContext();

  const [showPassword, setShowPassword] = useState(false);
  const [showQRPassword, setShowQRPassword] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [submissionStep, setSubmissionStep] = useState("confirm");
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();


  // const handleChange = (field, value) => {
  //   if (value.length > 7) {
  //     toast.error("Please make your name and password within 7 characters");
  //     return; // ignore input beyond 7 chars
  //   }
  const validateField = (field, value) => {
    let error = "";
    if (!value.trim() && (field === "ssid" || field === "password")) {
      error = `${field === "ssid" ? "SSID" : "Password"} is required.`;
    } else if (value.length > 7) {
      error = "Must be within 7 characters.";
    } else if (field === "password" && value.length < 4) {
      error = "Password must be at least 4 characters.";

    }
    return error;
  };

  const handleChange = (field, value) => {
    const error = validateField(field, value);

    setErrors((prev) => ({
      ...prev,
      [field]: error,
    }));

    setWifiFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

const handleSubmit = (e) => {
  e.preventDefault();

  const newErrors = {};

  // SSID check
  if (!wifiFormData.ssid || !wifiFormData.ssid.trim()) {
    newErrors.ssid = "SSID is required.";
  }

  // Security dropdown check
  if (
    !wifiFormData.security ||
    wifiFormData.security === "select"
  ) {
    newErrors.security = "Please select a Security type.";
  }

  // Password check (only if security is not "NoPassword")
  if (wifiFormData.security !== "NoPassword") {
    if (!wifiFormData.password) {
      newErrors.password = "Password is required.";
    } else if (wifiFormData.password.length < 4) {
      newErrors.password = "Password must be at least 4 characters.";
    }
  }

  // If errors exist, block next step
  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    toast.error("Please fix the errors before continuing.");
    return;
  }

  // ✅ All good → show confirm modal
  setSubmissionStep("confirm");
  setModalVisible(true);
};


  const handleEdit = () => {
    setModalVisible(false);
  };

  const handleConfirm = async () => {
    setActiveTab(slug, "Backdrop Designs");
  };

  return (
    <>
      {servicesDataLoading && <LoadingSpinner />}

      <div className="flex items-center justify-center py-8 relative">
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6 w-full max-w-md">
          <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-800">
            <p>Please keep your WiFi name and password within 7 characters for optimal compatibility.</p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* SSID */}
            <div>
              <label className="text-sm font-medium text-gray-600 mb-1 block">
                WiFi SSID *<span className="text-gray-400 text-xs">(Max 7 characters)</span>

              </label>
              <div className="relative">
                <input
                  type="text"
                  value={wifiFormData.ssid || ""}
                  onChange={(e) => handleChange("ssid", e.target.value)}
                  placeholder="Enter WiFi name"
                  maxLength={7}

                  className={`w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none ${
                    errors.ssid ? "border-red-500" : "border-gray-300"
                  }`}
                  required
                />
                <Wifi className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              </div>
              {errors.ssid && (
                <p className="text-xs text-red-500 mt-1">{errors.ssid}</p>
              )}
            </div>

            {/* Security Type */}
         <div>
  <label className="text-sm font-medium text-gray-600 mb-1 block">
    Security Type *
  </label>
  <div className="relative">
    <select
      value={wifiFormData.security}
      onChange={(e) => handleChange("security", e.target.value)}
      className={`w-full pl-10 pr-4 py-2 border rounded-lg text-sm bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none ${
        errors.security ? "border-red-500" : "border-gray-300"
      }`}
      required
    >
      <option value="select">Select an Option</option>
      <option value="WPA">WPA/WPA2</option>
      <option value="WEP">WEP</option>
      <option value="NoPassword">No Password</option>
    </select>
    <Shield className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
  </div>
  {errors.security && (
    <p className="text-xs text-red-500 mt-1">{errors.security}</p>
  )}
</div>

            {/* Password */}
            {wifiFormData.security !== "NoPassword" && (
              <div>
                <label className="text-sm font-medium text-gray-600 mb-1 block">

                  Wifi Password * <span className="text-gray-400 text-xs">(Max 7 characters)</span>

                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={wifiFormData.password || ""}
                    onChange={(e) => handleChange("password", e.target.value)}
                    placeholder="Enter password "
                    className={`w-full pl-10 pr-10 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    }`}
                    minLength={4}
                    maxLength={7}
                    required
                  />
                  <Lock className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <Eye className="w-5 h-5" />
                    ) : (
                      <EyeOff className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-red-500 mt-1">{errors.password}</p>
                )}
              </div>
            )}

            <div className="flex justify-center items-center pt-6">
              <button
                type="submit"
                className="font-bold px-4 cursor-pointer bg-[#008080] text-white py-2 rounded transition-effects text-lg"
              >
                Next →
              </button>
            </div>
          </form>
        </div>

        {/* Modal */}
        {modalVisible && (
          <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-white/10">
            <div className="bg-white p-6 rounded-xl shadow-2xl max-w-sm w-full text-center">
              {submissionStep === "confirm" ? (
                <>
                  <h2 className="text-xl font-semibold mb-4 text-gray-800">
                    Confirm WiFi Details
                  </h2>
                  <div className="space-y-3 mb-4 text-left">
                    <p>
                      <strong>SSID:</strong> {wifiFormData.ssid || "Not provided"}
                    </p>
                    <p>
                      <strong>Security:</strong> {wifiFormData.security || "WPA"}
                    </p>
                    {wifiFormData.security !== "NoPassword" && (
                      <p>
                        <strong>Password:</strong>{" "}
                        {wifiFormData.password || "Not provided"}
                      </p>
                    )}
                  </div>
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={handleEdit}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleConfirm}
                      className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition"
                    >
                      Continue
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-xl font-semibold mb-4 text-mainGreen">
                    ✅ Submitted Successfully!
                  </h2>
                  <p className="text-gray-600 mb-4">
                    Your WiFi details have been saved.
                  </p>
                  <button
                    onClick={() => setModalVisible(false)}
                    className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition"
                  >
                    Close
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default WifiContent;
