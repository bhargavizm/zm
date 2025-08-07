import React, { useState } from 'react';

const securedPlans = [
  { title: 'Free', price: '₹0', duration: '90 Days Free Trial' },
  { title: 'Silver', price: '₹99', duration: '30 Days' },
  { title: 'Gold', price: '₹499', duration: '180 Days' },
  { title: 'Diamond', price: '₹899', duration: '365 Days' },
  { title: 'Platinum', price: '₹1599', duration: '730 Days' },
];


const SecuredPricesModalPopUp = ({ open, onClose }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleCheckboxChange = (index) => {
    setSelectedIndex(index === selectedIndex ? null : index);
  };

  const handleBuy = (plan) => {
    alert(`Buying: ${plan.title} at ${plan.price}`);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/30">
      <div className="bg-white rounded-xl shadow-xl p-6 max-w-5xl w-full h-[90vh] overflow-y-auto scrollbar-hide relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-2xl cursor-pointer">❌</button>
        <div className="p-6">
          <h1 className="text-2xl font-bold text-center text-mainGreen mb-4">
            Secured Services Prices
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {securedPlans.map((plan, idx) => (
              <div
                key={idx}
                className="border border-gray-300 rounded-lg p-6 flex flex-col items-center justify-between relative bg-white"
              >
                <label className="absolute top-4 left-4">
                  <input
                    type="checkbox"
                    checked={selectedIndex === idx}
                    onChange={() => handleCheckboxChange(idx)}
                    className="accent-teal-600 w-5 h-5"
                  />
                </label>

                <h2 className="text-xl font-semibold mt-4">{plan.title}</h2>
                <p className="text-lg font-bold text-teal-600">{plan.price}</p>
                <p className="text-gray-600 mb-4">{plan.duration}</p>

                <button
                  disabled={selectedIndex !== idx}
                  onClick={() => handleBuy(plan)}
                  className={`px-4 py-2 rounded-md w-full text-white transition duration-200 ${
                    selectedIndex === idx
                      ? 'bg-mainGreen hover:bg-teal-700 cursor-pointer font-bold'
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
                >
                  {plan.title === 'Free' ? 'Start Trial' : 'Buy Now'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuredPricesModalPopUp;

