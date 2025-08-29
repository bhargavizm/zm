"use client";

import React from "react";
import toast from "react-hot-toast";
import useRazorpayPayment from "../../servicesData/rozorpayPayments";
import LoadingSpinner from "@/components/common/spinner";
import useServicesContext from "@/components/hooks/useServiceContext";
import { useRouter } from "next/navigation";

const EncryptedPricesModalPopUp = ({ open, onClose, userMeta = {}, onConfirm }) => {
  if (!open) return null;

  const { priceDetails, serviceName, serviceId, userId, qrImageUrl } = userMeta;
  if (!priceDetails) return null;

  const { servicesDataLoading, setServicesDataLoading } = useServicesContext();
  const { startPayment } = useRazorpayPayment();
  const router = useRouter();

  const handleBuy = async () => {
    if (!userId || !serviceId || !serviceName) {
      toast.error("User ID, Service ID, or Service Name missing.");
      return;
    }

    setServicesDataLoading(true);

    try {
      // Free plan → direct verification
      if (priceDetails.plan === "Free") {
        const res = await fetch(
          `/api/verify-payments/${userId}/${serviceName}/${serviceId}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              plan: priceDetails.plan,
              price: 0,
              validityDays: Number(priceDetails.validityDays || 30),
                qrImageUrl: qrImageUrl || "",
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

      // Paid plan → Razorpay
      const planForRazorpay = {
        title: priceDetails.plan,
        price: priceDetails.price,
        duration: `${priceDetails.validityDays} Days`,
        validityDays: priceDetails.validityDays,
      };

        onClose();

      const success = await startPayment({
        userId,
        serviceName,
        serviceId,
        qrImageUrl: qrImageUrl || "",
        plan: planForRazorpay,
      });

      if (success) {
        onClose();
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
        <div className="bg-white rounded-xl shadow-xl p-9 max-w-lg w-full max-h-[60vh] overflow-y-auto scrollbar-hide flex flex-col justify-between relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            disabled={servicesDataLoading}
            className="absolute top-4 right-4 text-md text-gray-600 cursor-pointer"
          >
            ❌
          </button>

          <h2 className="text-2xl font-bold text-center text-mainGreen mb-6">
            Selected Plan
          </h2>

          {servicesDataLoading && (
            <div className="fixed inset-0 flex items-center justify-center  z-50">
              <LoadingSpinner />
            </div>
          )}

          <div className="border rounded-xl text-lg p-4 flex flex-col items-center justify-center gap-2">
            <h3 className=" font-semibold">{priceDetails.plan}</h3>
            <p>{priceDetails.price}</p>
            {priceDetails.storage && (
              <p>Storage:Upto {Math.round(priceDetails.storage / (1024 ** 3))} GB</p>
            )}
            {/* <p>Validity: {priceDetails.validityDays} Days</p> */}

            <button
              onClick={handleBuy}
              disabled={servicesDataLoading}
              className={`mt-4 px-6 py-2 rounded-lg cursor-pointer font-semibold text-white transition duration-200 ${
                servicesDataLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-teal-600 hover:bg-teal-700"
              }`}
            >
              {servicesDataLoading ? "Processing..." : "Buy Now"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EncryptedPricesModalPopUp;
