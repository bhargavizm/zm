import React from 'react'
import { Check } from 'lucide-react'

const PricingCard = ({ title, price, features, button, highlighted }) => {
  return (
    <div className={`relative border rounded-2xl p-6 shadow-md bg-white transition-transform duration-300 hover:shadow-xl ${
      highlighted ? 'border-[#008080] ring-2 ring-green-200 scale-105' : 'border-gray-200'
    }`}>
      {/* Most Popular Badge */}
      {highlighted && (
        <div className="absolute top-[-12px] right-[-12px] bg-[#008080] text-white text-xs px-3 py-1 rounded-full shadow">
          Most Popular
        </div>
      )}

      {/* Title */}
      <h3 className="text-2xl font-semibold text-gray-900 mb-2 text-center">{title}</h3>

      {/* Price */}
      <p className="text-center text-4xl font-bold text-[#008080] mb-1">
        {price}
        <span className="text-base font-medium text-gray-500"> /mo</span>
      </p>

      {/* Features List */}
      <ul className="space-y-3 my-6 text-sm text-gray-700">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-2">
            <Check className="w-4 h-4 text-[#008080] mt-1" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      {/* Button */}
      <button className="w-full py-2 text-sm font-medium bg-[#008080] text-white rounded-xl hover:bg-[#4d8787] transition-all">
        {button}
      </button>
    </div>
  )
}

export default PricingCard
