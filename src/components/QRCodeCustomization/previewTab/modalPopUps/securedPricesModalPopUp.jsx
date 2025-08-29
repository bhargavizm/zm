"use client";

import useDesignContext from "@/components/hooks/useDesignContext";
import React, { useState, useEffect } from "react";
import useServicesContext from "@/components/hooks/useServiceContext";
import toast from "react-hot-toast";
import LoadingSpinner from "@/components/common/spinner";
import useRazorpayPayment from "../../servicesData/rozorpayPayments";
import { useRouter } from "next/navigation";

const securedPlans = [
  { title: "Free", price: "₹0", duration: "90 Days" },
  { title: "Silver", price: "₹99", duration: "30 Days" },
  { title: "Gold", price: "₹499", duration: "180 Days" },
  { title: "Diamond", price: "₹899", duration: "365 Days" },
  { title: "Platinum", price: "₹1599", duration: "730 Days" },
];

const SecuredPricesModalPopUp = ({ open, onClose, userMeta = {}, onConfirm }) => {
  console.log("secured modal userMeta", userMeta.qrImageUrl);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const { freePlanCount, setFreePlanCount } = useDesignContext();
  const { servicesDataLoading, setServicesDataLoading } = useServicesContext();
  const { startPayment } = useRazorpayPayment();
const router = useRouter();
  // Load free plan count
  useEffect(() => {
    if (userMeta?.userId && userMeta?.firstLoginDate) {
      fetch(`/api/freePlanCount/${userMeta.userId}/${userMeta.firstLoginDate}`)
        .then((res) => res.json())
        .then((data) => {
          if (typeof data.totalFreePlansCount === "number") {
            setFreePlanCount(data.totalFreePlansCount);
          }
        })
        .catch((err) => console.error("❌ Fetch error:", err));
    }
  }, [userMeta?.userId, userMeta?.firstLoginDate, setFreePlanCount]);

  if (!open) return null;

  const handleCheckboxChange = (index) => {
    if (servicesDataLoading) return;
    setSelectedIndex(index === selectedIndex ? null : index);
  };

  const handleBuy = async (plan) => {
    if (!userMeta?.userId || !userMeta?.serviceId || !userMeta?.serviceName) {
      toast.error("User ID, Service ID, or Service Name missing.");
      return;
    }

    setServicesDataLoading(true);

    try {
      // 🆓 Free plan flow
      if (plan.title === "Free") {
        if (freePlanCount >= 5) {
          toast.error("You have already used your 5 Free plan limit.");
          return;
        }

        const res = await fetch(
          `/api/verify-payments/${userMeta.userId}/${userMeta.serviceName}/${userMeta.serviceId}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              plan: plan.title,
              price: 0,
              validityDays: Number(plan.duration.match(/\d+/)?.[0] || 90),
                qrImageUrl: userMeta.qrImageUrl || "",
            }),
          }
        );

        const data = await res.json();
        if (data.success) {
          toast.success(data.message || "Free plan activated!");
          onClose();
          if (onConfirm) onConfirm();
            // router.push("/user-dashboard/qrCodesLists/");
        } else {
          toast.error(data.message || "Failed to activate free plan");
        }

        return;
      }



      // 💳 Paid plans → Razorpay

       onClose();
      const success = await startPayment({
        userId: userMeta.userId,
        serviceName: userMeta.serviceName,
        serviceId: userMeta.serviceId,
        qrImageUrl: userMeta.qrImageUrl || "",
        plan,
      });

      if (success) {
        onClose();
        if (onConfirm) onConfirm();
          // router.push("/user-dashboard/qrCodesLists/");
      }
    } catch (err) {
      toast.error(err?.message || "Something went wrong during payment");
    } finally {
      setServicesDataLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md ">
      <div className="bg-white rounded-xl shadow-xl p-6 max-w-5xl w-full h-[90vh] overflow-y-auto scrollbar-hide relative">
        <button
          onClick={onClose}
          disabled={servicesDataLoading}
          className="absolute top-4 right-4 text-2xl cursor-pointer"
        >
          ❌
        </button>

        <div className="p-6">
          <h1 className="text-2xl font-bold text-center text-mainGreen mb-4">
            Secured Services Prices
          </h1>

          {servicesDataLoading && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
              <LoadingSpinner />
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {securedPlans.map((plan, idx) => {
              const isFreePlanDisabled = plan.title === "Free" && freePlanCount >= 5;

              return (
                <div
                  key={idx}
                  className="border border-gray-300 rounded-lg p-6 flex flex-col items-center justify-between relative bg-white"
                >
                  <label className="absolute top-4 left-4">
                    <input
                      type="checkbox"
                      checked={selectedIndex === idx}
                      onChange={() => handleCheckboxChange(idx)}
                      disabled={isFreePlanDisabled || servicesDataLoading}
                      className="accent-teal-600 w-5 h-5"
                    />
                  </label>

                  <h2 className="text-xl font-semibold mt-4">{plan.title}</h2>
                  <p className="text-lg font-bold text-teal-600">{plan.price}</p>
                  <p className="text-gray-600 mb-4">{plan.duration}</p>

                  <button
                    disabled={
                      selectedIndex !== idx || isFreePlanDisabled || servicesDataLoading
                    }
                    onClick={() => handleBuy(plan)}
                    className={`px-4 py-2 rounded-md font-semibold w-full text-white transition duration-200 ${
                      selectedIndex === idx &&
                      !isFreePlanDisabled &&
                      !servicesDataLoading
                        ? "bg-mainGreen hover:bg-teal-700 cursor-pointer font-bold"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {isFreePlanDisabled
                      ? "Limit Reached"
                      : servicesDataLoading
                      ? "Processing..."
                      : "Buy Now"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuredPricesModalPopUp;
