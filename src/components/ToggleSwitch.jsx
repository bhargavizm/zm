import React from 'react'

const ToggleSwitch = ({ active, onToggle }) => {
  return (
    <div className="inline-flex items-center bg-gray-200 rounded-full p-1 shadow-inner">
      <button
        aria-label="Switch to Monthly"
        className={`px-5 py-2 rounded-full font-medium focus:outline-none transition-all duration-300 ${
          active === 'monthly'
            ? 'bg-[#008080] text-white shadow'
            : 'text-gray-700 hover:bg-white'
        }`}
        onClick={() => onToggle('monthly')}
      >
        Monthly
      </button>
      <button
        aria-label="Switch to Yearly"
        className={`px-5 py-2 rounded-full font-medium focus:outline-none transition-all duration-300 ${
          active === 'yearly'
            ? 'bg-[#1d8282] text-white shadow'
            : 'text-gray-700 hover:bg-white'
        }`}
        onClick={() => onToggle('yearly')}
      >
        Yearly <span className="ml-1 text-xs text-[#042020] font-semibold">(Save 20%)</span>
      </button>
    </div>
  )
}

export default ToggleSwitch
