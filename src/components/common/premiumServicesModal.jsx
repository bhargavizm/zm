"use client";
import React from "react";
import useDesignContext from "../hooks/useDesignContext";

const PremiumModal = () => {
  const {
    premiumEnabled,
    setPremiumEnabled,
    showPremiumModal,
    setShowPremiumModal,
  } = useDesignContext();

  if (!showPremiumModal) return null;

  const confirmPremium = () => {
    setPremiumEnabled(true); // ✅ just mark intent
    setShowPremiumModal(false);
  };

  const cancelPremium = () => {
    setPremiumEnabled(false); // ✅ ensure toggle is off
    setShowPremiumModal(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/30">
      <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full border border-teal-200 relative">
        {/* ❌ close button */}
        <button
          onClick={cancelPremium}
          className="absolute cursor-pointer top-3 right-3 text-gray-400 hover:text-gray-600 text-xl"
        >
          &times;
        </button>

        {/* Modal Title */}
        <h2 className="text-xl font-bold text-[#008080] mb-2">
          Premium Designs
        </h2>

        {/* Updated Text */}
        <p className="text-sm text-gray-700 leading-relaxed">
          You’re trying to use{" "}
          <span className="font-semibold text-[#008080]">premium Designs</span>.
          <br />
          <span className="text-[#008080] font-semibold">
            Cost: ₹99 / QR Code (Lifetime)
          </span>
          <br />
          This will be <strong>added in checkout</strong>.
        </p>

        {/* Buttons */}
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
            Enable Premium
          </button>
        </div>
      </div>
    </div>
  );
};

export default PremiumModal;
