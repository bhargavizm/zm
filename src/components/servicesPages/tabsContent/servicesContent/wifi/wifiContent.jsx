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

const WifiContent = () => {
  const { setActiveTab } = useDesignContext();
  const { slug } = useParams();
  const { wifiFormData, setWifiFormData } = useServicesContext();
  const [showPassword, setShowPassword] = useState(false);
  const [showQRPassword, setShowQRPassword] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [submissionStep, setSubmissionStep] = useState("confirm");
  const dispatch = useDispatch();

  const handleChange = (index, field, value) => {
    const updatedData = [...wifiFormData];
    updatedData[index] = { ...updatedData[index], [field]: value };
    setWifiFormData(updatedData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form before showing modal
    if (!wifiFormData[0]?.ssid) {
      toast.error("WiFi SSID is required");
      return;
    }
    
    if (wifiFormData[0]?.security !== "nopass" && (!wifiFormData[0]?.password || wifiFormData[0]?.password.length < 4)) {
      toast.error("Password must be at least 4 characters");
      return;
    }
    
    setSubmissionStep("confirm");
    setModalVisible(true);
  };

  const handleEdit = () => {
    setModalVisible(false);
  };

  const handleConfirm = async () => {
    const formData = wifiFormData[0];

    try {
      const response = await fetch("/api/services/wifi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ssid: formData.ssid,
          security: formData.security,
          password: formData.security === "nopass" ? "" : formData.password,
          qrPassword: formData.qrPassword || ""
        }),
        credentials: "include" // Required for auth cookies
      });

      const result = await response.json();

      if (response.ok) {
        setSubmissionStep("success");
        toast.success("WiFi data submitted successfully!");
        setActiveTab(slug, "QR Code");
        
        // Dispatch action to update Redux state with the form data
        dispatch(setWifiServices(formData));
        
        // Clear the form
        setWifiFormData([{ 
          ssid: "", 
          password: "", 
          security: "WPA", 
          qrPassword: "" 
        }]);

        // Auto-close modal after 2 seconds
        setTimeout(() => {
          setModalVisible(false);
        }, 2000);
      } else {
        toast.error(result.error || "Something went wrong");
        setModalVisible(false);
      }
    } catch (error) {
      console.error("Error submitting WiFi data:", error);
      toast.error("Error submitting data. Please try again.");
      setModalVisible(false);
    }
  };

  return (
    <div className="flex items-center justify-center py-8 relative">
      <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6 w-full max-w-md">
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* SSID */}
          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">
              WiFi SSID *
            </label>
            <div className="relative">
              <input
                type="text"
                value={wifiFormData[0]?.ssid || ""}
                onChange={(e) => handleChange(0, "ssid", e.target.value)}
                placeholder="Enter WiFi name"
                className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm border-gray-300 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                required
              />
              <Wifi className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Security Type */}
          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">
              Security Type *
            </label>
            <div className="relative">
              <select
                value={wifiFormData[0]?.security || "WPA"}
                onChange={(e) => handleChange(0, "security", e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm border-gray-300 bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                required
              >
                <option value="WPA">WPA/WPA2</option>
                <option value="WEP">WEP</option>
                <option value="NoPassword">No Password</option>
              </select>
              <Shield className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Password */}
          {wifiFormData[0]?.security !== "NoPassword" && (
            <div>
              <label className="text-sm font-medium text-gray-600 mb-1 block">
                Password *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={wifiFormData[0]?.password || ""}
                  onChange={(e) => handleChange(0, "password", e.target.value)}
                  placeholder="Enter password (min 4 characters)"
                  className="w-full pl-10 pr-10 py-2 border rounded-lg text-sm border-gray-300 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  minLength={4}
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
            </div>
          )}

          {/* QR Password */}
          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">
              QR Password (optional)
            </label>
            <div className="relative">
              <input
                type={showQRPassword ? "text" : "password"}
                value={wifiFormData[0]?.qrPassword || ""}
                onChange={(e) => handleChange(0, "qrPassword", e.target.value)}
                placeholder="Enter QR Password"
                className="w-full pl-10 pr-10 py-2 border rounded-lg text-sm border-gray-300 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
              <Lock className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              <button
                type="button"
                onClick={() => setShowQRPassword(!showQRPassword)}
                className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
              >
                {showQRPassword ? (
                  <Eye className="w-5 h-5" />
                ) : (
                  <EyeOff className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <NFCModal />

          <button
            type="submit"
            className="w-full cursor-pointer bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-lg font-semibold text-sm transition"
          >
            Submit
          </button>
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
                    <strong>SSID:</strong> {wifiFormData[0]?.ssid || "Not provided"}
                  </p>
                  <p>
                    <strong>Security:</strong> {wifiFormData[0]?.security || "WPA"}
                  </p>
                  {wifiFormData[0]?.security !== "nopass" && (
                    <p>
                      <strong>Password:</strong> {wifiFormData[0]?.password || "Not provided"}
                    </p>
                  )}
                  {wifiFormData[0]?.qrPassword && (
                    <p>
                      <strong>QR Password:</strong> {wifiFormData[0]?.qrPassword}
                    </p>
                  )}
                </div>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={handleEdit}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={handleConfirm}
                    className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition"
                  >
                    Confirm & Submit
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-xl font-semibold mb-4 text-green-700">
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
  );
};

export default WifiContent;