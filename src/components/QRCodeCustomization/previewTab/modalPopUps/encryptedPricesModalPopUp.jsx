import React, { useState } from "react";
import toast from "react-hot-toast";

const plans = [
  { title: "Free", price: "₹0 (First 3 Months)", storage: "" },
  { title: "Basic", price: "₹999", storage: "Upto 1GB" },
  { title: "Starter", price: "₹1799", storage: "Upto 2GB" },
  { title: "Pro", price: "₹2499", storage: "Upto 3GB" },
  { title: "Advanced", price: "₹2999", storage: "Upto 4GB" },
  { title: "Ultima", price: "₹3299", storage: "Upto 5GB" },
];

const EncryptedPricesModalPopUp = ({ open, onClose, userMeta = {} }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  if (!open) return null;

  const handleCheckboxChange = (index) => {
    setSelectedIndex((prev) => (prev === index ? null : index)); // Toggle if same, switch if different
  };

  const handleBuy = async (plan) => {
    if (!userMeta?.userId || !userMeta?.serviceId) {
      alert("User ID or Service ID missing.");
      return;
    }

    const formData = new FormData();
    formData.append("plan", plan.title);
    formData.append("price", plan.price.replace(/[^\d]/g, "")); // Remove ₹ or text
    formData.append("storage", plan.storage.replace(/[^\d]/g, "")); // extract numeric MB
    formData.append("validityDays", "30"); // Default or calculate
    formData.append("startDate", new Date().toISOString());

    try {
      const response = await fetch(
        `/api/encryptedServices/${userMeta.serviceName}/${userMeta.userId}/${userMeta.serviceId}`,
        {
          method: "PATCH",
          body: formData,
        }
      );

      const result = await response.json();

      if (response.ok) {
        toast.success(` ${result.message}`);
        onClose();
      } else {
        toast.error(` Failed: ${result.message}`);
      }
    } catch (err) {
      console.error("Error updating plan:", err);
      toast.error(err?.response?.data?.error || "Something went wrong!");
    }
  };

  return (
    <section>
      <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/30">
        <div className="bg-white rounded-xl shadow-xl p-6 max-w-5xl w-full h-[90vh] overflow-y-auto scrollbar-hide relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-2xl text-gray-600 cursor-pointer"
          >
            ❌
          </button>

          <div className="p-6">
            <h1 className="text-center text-2xl font-bold text-mainGreen mb-2">
              Encrypted Services Prices
            </h1>
            <p className="text-gray-700 text-center mb-6">
              Choose a plan that suits your encrypted storage needs. All plans
              are secure, private, and designed to protect your sensitive data.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {plans.map((plan, idx) => (
                <div
                  key={idx}
                  className="border border-teal-300 rounded-lg p-6 flex flex-col items-center justify-between bg-white hover:shadow-md transition duration-300 relative"
                >
                  {/* Single Checkbox */}
                  <label className="absolute top-4 left-4">
                    <input
                      type="checkbox"
                      checked={selectedIndex === idx}
                      onChange={() => handleCheckboxChange(idx)}
                      className="accent-teal-600 w-5 h-5"
                    />
                  </label>

                  <h2 className="text-lg font-semibold text-gray-800 mt-6 mb-1">
                    {plan.title}
                  </h2>
                  <p className="text-lg font-bold text-teal-600 mb-1">
                    {plan.price}
                  </p>
                  <p className="text-gray-600 mb-2">{plan.storage}</p>

                  <button
                    disabled={selectedIndex !== idx}
                    onClick={() => handleBuy(plan)}
                    className={`px-4 py-2 rounded-md font-semibold w-full text-white transition duration-200 ${
                      selectedIndex === idx
                        ? "bg-mainGreen hover:bg-teal-700 cursor-pointer font-bold"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Buy Now
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EncryptedPricesModalPopUp;
