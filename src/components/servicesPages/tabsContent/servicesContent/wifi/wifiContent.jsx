"use client";

import React, { useState } from "react";
import { Lock, Wifi, Eye, EyeOff, Shield } from "lucide-react";
import useServicesContext from "@/components/hooks/useServiceContext";
import NFCModal from "@/components/modalPopUps/nfcModal";
import { useDispatch } from "react-redux";
import { setWifiServices } from "@/redux/slices/servicesSlice";

const WifiContent = () => {
  const { wifiFormData, setWifiFormData } = useServicesContext();
  const [showPassword, setShowPassword] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [submissionStep, setSubmissionStep] = useState("confirm");
  const dispatch = useDispatch();

  const handleChange = (index, field, value) => {
    const updatedData = [...wifiFormData];
    updatedData[index][field] = value;
    setWifiFormData(updatedData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmissionStep("success");
        console.log("WiFi data submitted successfully:", result, response);
        // Dispatch action to update Redux state
        dispatch(setWifiServices(response))
        // Clear the form
        setWifiFormData([{ ssid: "", password: "", security: "WPA" }]);

        // Auto-close modal after 2 seconds
        setTimeout(() => {
          setModalVisible(false);
        }, 2000);
      } else {
        alert(result.error || "Something went wrong");
        setModalVisible(false);
      }
    } catch (error) {
      console.error("Error submitting WiFi data:", error);
      alert("Error submitting data.");
      setModalVisible(false);
    }
  };

  return (
    <div className="flex items-center justify-center py-8 relative">
      <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6 w-full">
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* SSID */}
          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">
              WiFi SSID
            </label>
            <div className="relative">
              <input
                type="text"
                value={wifiFormData[0].ssid}
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
              Security Type
            </label>
            <div className="relative">
              <select
                value={wifiFormData[0].security}
                onChange={(e) => handleChange(0, "security", e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm border-gray-300 bg-white focus:ring-2 focus:ring-teal-500"
              >
                <option value="WPA">WPA/WPA2</option>
                <option value="WEP">WEP</option>
                <option value="nopass">No Password</option>
              </select>
              <Shield className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={wifiFormData[0].password}
                onChange={(e) => handleChange(0, "password", e.target.value)}
                placeholder="Enter password"
                className="w-full pl-10 pr-10 py-2 border rounded-lg text-sm border-gray-300 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                required={wifiFormData[0].security !== "nopass"}
              />
              <Lock className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5"
              >
                {showPassword ? (
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
                <p className="mb-2">
                  <strong>SSID:</strong> {wifiFormData[0].ssid}
                </p>
                <p className="mb-2">
                  <strong>Security:</strong> {wifiFormData[0].security}
                </p>
                {wifiFormData[0].security !== "nopass" && (
                  <p className="mb-4">
                    <strong>Password:</strong> {wifiFormData[0].password}
                  </p>
                )}
                <div className="flex justify-center gap-4">
                  <button
                    onClick={handleEdit}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                  >
                    Edit
                  </button>
                  <button
                    onClick={handleConfirm}
                    className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
                  >
                    OK
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-xl font-semibold mb-4 text-green-700">
                  ✅ Submitted Successfully!
                </h2>

              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WifiContent;
