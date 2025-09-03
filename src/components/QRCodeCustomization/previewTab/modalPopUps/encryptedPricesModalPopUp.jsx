"use client";

import React from "react";
import toast from "react-hot-toast";
import useRazorpayPayment from "../../servicesData/rozorpayPayments";
import LoadingSpinner from "@/components/common/spinner";
import useServicesContext from "@/components/hooks/useServiceContext";
import { useRouter } from "next/navigation";
import useDesignContext from "@/components/hooks/useDesignContext";

const formatDate = (dateStr) => {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const EncryptedPricesModalPopUp = ({
  open,
  onClose,
  userMeta = {},
  onConfirm,
}) => {
  if (!open) return null;

  const { priceDetails, serviceName, serviceId, userId, qrImageUrl } = userMeta;
  if (!priceDetails) return null;

  const { selectedPremiumItem } = useDesignContext();
  const { servicesDataLoading, setServicesDataLoading } = useServicesContext();
  const { startPayment } = useRazorpayPayment();
  const router = useRouter();

  // ✅ Price handling
  const basePrice =
    priceDetails.plan === "Free"
      ? 0
      : Number((priceDetails.price || "0").toString().replace(/₹/g, ""));
  // If free plan → premium addon is shown but cost = 0
  const premiumAddon =
    priceDetails.plan === "Free"
      ? selectedPremiumItem
        ? 0
        : 0
      : selectedPremiumItem
      ? 99
      : 0;
  const finalPrice = basePrice + premiumAddon;

  const handleBuy = async () => {
    if (!userId || !serviceId || !serviceName) {
      toast.error("User ID, Service ID, or Service Name missing.");
      return;
    }

    setServicesDataLoading(true);

    try {
      const planForRazorpay = {
        title: priceDetails.plan,
        price: basePrice.toString(),
        duration:
          priceDetails.plan === "Free"
            ? "Lifetime"
            : `${priceDetails.validityDays} Days`,
        validityDays:
          priceDetails.plan === "Free" ? 90 : priceDetails.validityDays,
        premiumStickerPlan: premiumAddon.toString(),
        totalAmount: finalPrice.toString(),
      };

      // ✅ Free without premium → directly activate
      if (finalPrice === 0) {
        const res = await fetch(
          `/api/verify-payments/${userId}/${serviceName}/${serviceId}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              plan: planForRazorpay.title,
              price: basePrice, // ⬅️ base only
              validityDays: planForRazorpay.validityDays,
              qrImageUrl: qrImageUrl || "",
              premiumStickerPlan: !!premiumAddon, // true/false
              totalAmount: finalPrice,
            }),
          }
        );

        const data = await res.json();
        if (data.success) {
          toast.success(data.message || "Free plan activated!");
          onClose();
          if (onConfirm) onConfirm();
          router.push("/user-dashboard/qrCodesLists/");
        } else {
          toast.error(data.message || "Failed to activate free plan");
        }
        return;
      }

      // ✅ Otherwise → Razorpay checkout
      onClose();
      const success = await startPayment({
        userId,
        serviceName,
        serviceId,
        qrImageUrl: qrImageUrl || "",
        plan: planForRazorpay,
      });

      if (success) {
        if (onConfirm) onConfirm();
        router.push("/user-dashboard/qrCodesLists/");
      }
    } catch (err) {
      toast.error(err?.message || "Something went wrong during payment");
    } finally {
      setServicesDataLoading(false);
    }
  };

  return (
    <section>
      <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            disabled={servicesDataLoading}
            className="absolute top-4 right-4 text-lg text-gray-600 hover:text-gray-800"
          >
            ❌
          </button>

          <h2 className="text-2xl font-bold text-center text-mainGreen mb-6">
            Checkout Summary
          </h2>

          {servicesDataLoading && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <LoadingSpinner />
            </div>
          )}

          {/* Itemized cart */}
          <div className="border rounded-lg divide-y divide-gray-200">
            {/* Base Plan */}
            <div className="space-y-2 p-4">
              {/* Plan */}
              <div className="flex justify-between">
                <span className="font-medium">Plan: {priceDetails.plan}</span>
                <span>₹{basePrice}</span>
              </div>

              {/* Storage */}
              {priceDetails.storage && (
                <div className="flex justify-between">
                  <span className="font-medium">Storage</span>
                  <span>
                    Upto {Math.round(priceDetails.storage / 1024 ** 3)} GB
                  </span>
                </div>
              )}
            </div>

            {/* Premium Add-on */}
            {/* {premiumAddon > 0 && (
              <div className="flex justify-between mt-2 mx-4">
                <span className="font-medium text-gray-600">
                  Premium Add-on (Stickers & Shapes)
                </span>
                <span>₹{premiumAddon}</span>
              </div>
            )} */}

            {/* Premium Add-on */}
            {selectedPremiumItem && (
              <div className="flex justify-between mt-2 mx-4">
                <span className="font-medium text-gray-600">
                  Premium Add-on (Stickers & Shapes)
                </span>
                <span>₹{premiumAddon}</span>
              </div>
            )}

            {/* Total */}
            <div className="flex justify-between p-4 font-bold text-lg">
              <span>Total</span>
              <span>₹{finalPrice}</span>
            </div>
          </div>

          {/* Checkout button */}
          <button
            onClick={handleBuy}
            disabled={servicesDataLoading}
            className={`w-full mt-6 px-6 py-3 cursor-pointer rounded-lg font-semibold text-white transition duration-200 ${
              servicesDataLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-teal-600 hover:bg-teal-700"
            }`}
          >
            {servicesDataLoading
              ? "Processing..."
              : finalPrice === 0
              ? "Activate Free Plan"
              : "Proceed to Checkout"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default EncryptedPricesModalPopUp;
