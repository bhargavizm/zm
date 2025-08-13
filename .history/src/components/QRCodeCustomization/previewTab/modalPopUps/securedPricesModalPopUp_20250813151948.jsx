import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const securedPlans = [
  { title: "Free", price: "₹0", duration: "90 Days Free Trial" },
  { title: "Silver", price: "₹99", duration: "30 Days" },
  { title: "Gold", price: "₹499", duration: "180 Days" },
  { title: "Diamond", price: "₹899", duration: "365 Days" },
  { title: "Platinum", price: "₹1599", duration: "730 Days" },
];

const SecuredPricesModalPopUp = ({ open, onClose, userMeta = {} }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [freePlanCount, setFreePlanCount] = useState(0);

  // Load user's current count from backend (optional)
  // useEffect(() => {
  //   if (userMeta?.userId) {
  //     fetch(/api/welcome-offer/${userMeta.userId})
  //       .then((res) => res.json())
  //       .then((data) => setFreePlanCount(data.count || 0))
  //       .catch((err) => console.error("Failed to fetch count", err));
  //   }
  // }, [userMeta?.userId]);

  if (!open) return null;

  const handleCheckboxChange = (index) => {
    setSelectedIndex(index === selectedIndex ? null : index);
  };

  const servicesRequiringFormData = [
    "business-cards",
    "v-cards",
    "menu-cards",
    "medical-alerts",
    "kids-safety-qr-tags",
    "discounts",
    "property-qr",
    "product-cards",
    "resume"
  ];

  const handleBuy = async (plan) => {
    if (!userMeta?.userId || !userMeta?.serviceId || !userMeta?.serviceName) {
      alert("User ID, Service ID, or Service Name missing.");
      return;
    }

    // Restrict Free plan usage
    if (plan.title === "Free" && freePlanCount >= 5) {
      toast.error("You have already used your 5 Free plan limit.");
      return;
    }

    const needsFormData = servicesRequiringFormData.includes(
      userMeta.serviceName?.toLowerCase()
    );

    const payload = {
      plan: plan.title,
      price: plan.price.replace(/[^\d]/g, ""),
      validityDays: plan.duration.match(/\d+/)?.[0] || "30",
      startDate: new Date().toISOString(),
      freePlanCount: plan.title === "Free" ? freePlanCount + 1 : freePlanCount,
    };

    let body, headers;
    if (needsFormData) {
      body = new FormData();
      Object.entries(payload).forEach(([k, v]) => body.append(k, v));
      headers = undefined;
    } else {
      headers = { "Content-Type": "application/json" };
      body = JSON.stringify(payload);
    }

    try {
      const res = await fetch(
        `/api/services/${userMeta.serviceName}/${userMeta.userId}/${userMeta.serviceId}`,
        { method: "PATCH", headers, body }
      );

      const result = await res.json();
      if (!result.success) {
        toast.error(result.message || "Failed to update plan.");
      } else {
        toast.success(`${plan.title} plan updated successfully!`);
        if (plan.title === "Free") {
          setFreePlanCount((prev) => prev + 1); // Update local state
        }
      }
    } catch (err) {
      console.error("❌ API call failed:", err);
      toast.error(err?.response?.data?.error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/30">
      <div className="bg-white rounded-xl shadow-xl p-6 max-w-5xl w-full h-[90vh] overflow-y-auto scrollbar-hide relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl cursor-pointer"
        >
          ❌
        </button>
        <div className="p-6">
          <h1 className="text-2xl font-bold text-center text-mainGreen mb-4">
            Secured Services Prices
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {securedPlans.map((plan, idx) => {
              const isFreePlanDisabled =
                plan.title === "Free" && freePlanCount >= 5;

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
                      disabled={isFreePlanDisabled}
                      className="accent-teal-600 w-5 h-5"
                    />
                  </label>

                  <h2 className="text-xl font-semibold mt-4">{plan.title}</h2>
                  <p className="text-lg font-bold text-teal-600">
                    {plan.price}
                  </p>
                  <p className="text-gray-600 mb-4">{plan.duration}</p>

                  <button
                    disabled={selectedIndex !== idx || isFreePlanDisabled}
                    onClick={() => handleBuy(plan)}
                    className={`px-4 py-2 rounded-md font-semibold w-full text-white transition duration-200 ${
                      selectedIndex === idx && !isFreePlanDisabled
                        ? "bg-mainGreen hover:bg-teal-700 cursor-pointer font-bold"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {isFreePlanDisabled ? "Limit Reached" : "Buy Now"}
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


// import React, { useState } from "react";
// import toast from "react-hot-toast";

// const securedPlans = [
//   { title: "Free", price: "₹0", duration: "90 Days Free Trial" },
//   { title: "Silver", price: "₹99", duration: "30 Days" },
//   { title: "Gold", price: "₹499", duration: "180 Days" },
//   { title: "Diamond", price: "₹899", duration: "365 Days" },
//   { title: "Platinum", price: "₹1599", duration: "730 Days" },
// ];

// const SecuredPricesModalPopUp = ({ open, onClose, userMeta = {} }) => {
//   const [selectedIndex, setSelectedIndex] = useState(null);
//   if (!open) return null;
//   const handleCheckboxChange = (index) => {
//     setSelectedIndex(index === selectedIndex ? null : index);
//   };

//   const servicesRequiringFormData = ["business-cards", "v-cards", "menu-cards","medical-alerts","kids-safety-qr-tags","discounts"]; // extend list

//   const handleBuy = async (plan) => {
//     if (!userMeta?.userId || !userMeta?.serviceId || !userMeta?.serviceName) {
//       alert("User ID, Service ID, or Service Name missing.");
//       return;
//     }

//     const needsFormData = servicesRequiringFormData.includes(
//       userMeta.serviceName?.toLowerCase()
//     );

//     const payload = {
//       plan: plan.title,
//       price: plan.price.replace(/[^\d]/g, ""), // numeric only
//       validityDays: plan.duration.match(/\d+/)?.[0] || "30", // extract days
//       startDate: new Date().toISOString(),
//     };
//     console.log(payload);
//     let body, headers;
//     if (needsFormData) {
//       body = new FormData();
//       Object.entries(payload).forEach(([k, v]) => body.append(k, v));
//       headers = undefined; // browser will set automatically
//     } else {
//       headers = { "Content-Type": "application/json" };
//       body = JSON.stringify(payload);
//     }

//     try {
//       const res = await fetch(
//         /api/services/${userMeta.serviceName}/${userMeta.userId}/${userMeta.serviceId},
//         { method: "PATCH", headers, body }
//       );

//       const result = await res.json();
//       console.log(result);
//       if (!result.success) {
//         toast.error(result.message || "Failed to update plan.");
//       } 
//       // else {
//       //   toast.success(${plan.title} plan updated successfully!);
//       // }
//     } catch (err) {
//       console.error("❌ API call failed:", err);
//         toast.error(err?.response?.data?.error);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/30">
//       <div className="bg-white rounded-xl shadow-xl p-6 max-w-5xl w-full h-[90vh] overflow-y-auto scrollbar-hide relative">
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-2xl cursor-pointer"
//         >
//           ❌
//         </button>
//         <div className="p-6">
//           <h1 className="text-2xl font-bold text-center text-mainGreen mb-4">
//             Secured Services Prices
//           </h1>

//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//             {securedPlans.map((plan, idx) => (
//               <div
//                 key={idx}
//                 className="border border-gray-300 rounded-lg p-6 flex flex-col items-center justify-between relative bg-white"
//               >
//                 <label className="absolute top-4 left-4">
//                   <input
//                     type="checkbox"
//                     checked={selectedIndex === idx}
//                     onChange={() => handleCheckboxChange(idx)}
//                     className="accent-teal-600 w-5 h-5"
//                   />
//                 </label>

//                 <h2 className="text-xl font-semibold mt-4">{plan.title}</h2>
//                 <p className="text-lg font-bold text-teal-600">{plan.price}</p>
//                 <p className="text-gray-600 mb-4">{plan.duration}</p>

//                 <button
//                   disabled={selectedIndex !== idx}
//                   onClick={() => handleBuy(plan)}
//                   className={`px-4 py-2 rounded-md font-semibold w-full text-white transition duration-200 ${
//                     selectedIndex === idx
//                       ? "bg-mainGreen hover:bg-teal-700 cursor-pointer font-bold"
//                       : "bg-gray-400 cursor-not-allowed"
//                   }`}
//                 >
//                   Buy Now
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SecuredPricesModalPopUp;