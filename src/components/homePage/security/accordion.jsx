'use client';

import { useState } from 'react';

  const items = [
    {
      id: 1,
      title: "ISO 27001 Certified",
      content: "We are audited and certified for top-level data safety protocols.",
    },
    {
      id: 2,
      title: "Data Encryption",
      content: "our data security is our priority — it is fully encrypted during transfer and storage.",
    },
    {
      id: 3,
      title: "Multi-factor Authentication",
      content: "Enabling Multi-factor Authentication (MFA) on your main account and any subaccounts provides an additional level of security.",
    },
    {
      id: 4,
      title: "Passcode Protection",
      content: "Our exclusive 'Passcode Protection' feature allows you to secure any landing page, like Digital Business Cards, by tightly controlling access.",
    }
  ];

const Accordion = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleItem = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 space-y-4 ">
      {items.map((item, index) => (
        <div key={item.id} className="border border-gray-300 rounded-xl overflow-hidden shadow-sm">
          <button
            onClick={() => toggleItem(index)}
            className={`w-full px-6 py-4 flex justify-between items-center transition-all duration-300 ease-in-out cursor-pointer text-xl font-bold hover:scale-100 ${
              activeIndex === index
                ? 'bg-skyBlue text-white shadow-lg'
                : 'bg-white text-green-700 hover:bg-skyBlue hover:text-white'
            }`}
          >
            {item.title}
            <span className="text-xl font-bold">{activeIndex === index ? '−' : '+'}</span>
          </button>

          <div
            className={`text-lg transition-all duration-300 ease-in-out text-slate-600 bg-white ${
              activeIndex === index
                ? 'max-h-[160px] px-6 py-4'
                : 'max-h-0 px-6 py-0'
            }`}
          >
            {item.content}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
