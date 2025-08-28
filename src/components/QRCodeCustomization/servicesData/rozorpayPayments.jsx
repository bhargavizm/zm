"use client";

import useServicesContext from "@/components/hooks/useServiceContext";
import toast from "react-hot-toast";

const useRazorpayPayment = () => {
  const { servicesDataLoading, setServicesDataLoading } = useServicesContext();

  // Dynamically load Razorpay SDK
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (document.getElementById("razorpay-script")) return resolve(true);

      const script = document.createElement("script");
      script.id = "razorpay-script";
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const startPayment = async ({ userId, serviceName, serviceId,qrImageUrl, plan }) => {
    try {
      setServicesDataLoading(true); // ✅ Use shared loading state

      // 1️⃣ Create order
      const res = await fetch(
        `/api/payments/${userId}/${serviceName}/${serviceId}/create-order`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            plan: plan.title,
            price: plan.price.replace("₹", ""),
            validityDays: plan.duration.match(/\d+/)?.[0] || "30",
          }),
        }
      );

      const result = await res.json();
      if (!result.success) {
        toast.error(result.message || "Failed to create order.");
        return false;
      }
      const { order } = result;

      // 2️⃣ Load Razorpay
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        toast.error("Failed to load Razorpay SDK.");
        return false;
      }

      // 3️⃣ Open Razorpay
      return new Promise((resolve) => {
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: order.amount,
          currency: order.currency,
          name: "My App",
          description: `${plan.title} Plan`,
          order_id: order.id,
          handler: async (response) => {
            // 4️⃣ Verify payment
            const verifyRes = await fetch(
              `/api/verify-payments/${userId}/${serviceName}/${serviceId}`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  ...response,
                  plan: plan.title,
                  price: plan.price.replace("₹", ""),
                  validityDays: Number(plan.duration.match(/\d+/)?.[0] || 30),
                     qrImageUrl: qrImageUrl || "",
                }),
              }
            );

            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              toast.success(verifyData.message || "Payment successful!");
              resolve(true);
            } else {
              toast.error(verifyData.message || "Payment verification failed");
              resolve(false);
            }
          },
          theme: { color: "#0f766e" },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      });
    } catch (err) {
      console.error("❌ Payment error:", err);
      toast.error("Something went wrong.");
      return false;
    } finally {
      setServicesDataLoading(false); // ✅ Reset loading
    }
  };

  return { startPayment, servicesDataLoading }; // ✅ Use servicesDataLoading
};

export default useRazorpayPayment;
