// components/modalPopUps/PremiumModal.jsx
"use client";
import React from "react";
import usePremiumContext from "../hooks/usePremiumContext";


const PremiumModal = () => {
  const {
    premiumEnabled,
    setPremiumEnabled,
    showPremiumModal,
    setShowPremiumModal,
  } = usePremiumContext();

  if (!showPremiumModal) return null;

  const confirmPremium = () => {
    setPremiumEnabled(true);
    setShowPremiumModal(false);
  };

  const cancelPremium = () => {
    setShowPremiumModal(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/30">
      <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full border border-teal-200 relative">
        <button
          onClick={cancelPremium}
          className="absolute cursor-pointer top-3 right-3 text-gray-400 hover:text-gray-600 text-xl"
        >
          &times;
        </button>

        <h2 className="text-xl font-bold text-[#008080] mb-2">
          Premium Feature
        </h2>
        <p className="text-sm text-gray-700">
          You're trying to access <strong>premium content</strong>.<br />
          <span className="text-[#008080] font-semibold">
            Cost: ₹99/year
          </span>
        </p>

        <div className="flex justify-end mt-5 space-x-3">
          <button
            onClick={cancelPremium}
            className="px-4 py-2 cursor-pointer rounded border border-gray-400 text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={confirmPremium}
            className="px-4 py-2 cursor-pointer bg-[#008080] text-white rounded hover:bg-[#006666] transition"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default PremiumModal;
