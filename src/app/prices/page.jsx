'use client'

import React, { useState } from 'react'
import PricingCard from '@/components/PricingCard'
import ToggleSwitch from '@/components/ToggleSwitch'
import { HelpCircle } from 'lucide-react'

// Pricing Plans Data
const pricingData = {
  monthly: [
    { title: 'Free', price: '₹0', features: ['Basic QR codes', 'Limited analytics'], button: 'Sign Up', highlighted: false },
    { title: 'Starter', price: '₹399', features: ['Dynamic QR codes', 'Basic design options'], button: 'Buy Now', highlighted: false },
    { title: 'Pro', price: '₹999', features: ['Advanced analytics', 'More scans/month'], button: 'Buy Now', highlighted: true },
    { title: 'Ultima', price: '₹1999', features: ['Unlimited scans', 'White-label', 'Priority support'], button: 'Buy Now', highlighted: false },
  ],
  yearly: [
    { title: 'Free', price: '₹0', features: ['Basic QR codes', 'Limited analytics'], button: 'Sign Up', highlighted: false },
    { title: 'Starter', price: '₹3990', features: ['Dynamic QR codes', 'Basic design options'], button: 'Buy Now', highlighted: false },
    { title: 'Pro', price: '₹9990', features: ['Advanced analytics', 'More scans/month'], button: 'Buy Now', highlighted: true },
    { title: 'Ultima', price: '₹19990', features: ['Unlimited scans', 'White-label', 'Priority support'], button: 'Buy Now', highlighted: false },
  ]
}

// Comparison Table Data
const plans = [
  { name: 'ULTIMA 25', price: 'USD 69', btn: 'Sign Up' },
  { name: 'ULTIMA 50', price: 'USD 104', btn: 'Sign Up' },
  { name: 'ULTIMA 100', price: 'USD 139', btn: 'Sign Up' },
  { name: 'ULTIMA 200', price: 'USD 174', btn: 'Sign Up' },
  { name: 'Enterprise Plan', price: '', btn: 'Contact Sales' },
]

const sections = [
  {
    title: 'QR Code Basics',
    items: [
      { feature: 'Static QR Codes', values: ['Unlimited', 'Unlimited', 'Unlimited', 'Unlimited', 'Unlimited'] },
      { feature: 'Dynamic QR Codes', values: ['50', '100', '200', '500', 'Custom'] },
      { feature: 'Multi URL QR Code', values: ['✔️', '✔️', '✔️', '✔️', '✔️'] },
    ]
  },
  {
    title: 'Digital Business Card (NFC Compatible)',
    items: [
      { feature: 'vCards allowed', values: ['25', '50', '100', '200', 'Custom'] },
      { feature: 'Add a logo / video', values: ['✔️', '✔️', '✔️', '✔️', '✔️'] },
      { feature: 'Custom background', values: ['✔️', '✔️', '✔️', '✔️', '✔️'] },
      { feature: 'Share vCard via NFC', values: ['✔️', '✔️', '✔️', '✔️', '✔️'] },
    ]
  },
  {
    title: 'Forms',
    items: [
      { feature: 'Form creation limit', values: ['5', '1000', '2000', 'Unlimited', 'Unlimited'] },
      { feature: 'Limit respondents', values: ['100', '2000', '3000', 'Unlimited', 'Unlimited'] },
    ]
  },
  {
    title: 'Security',
    items: [
      { feature: '2-Factor Authentication', values: ['✔️', '✔️', '✔️', '✔️', '✔️'] },
      { feature: 'Single Sign-on (SSO)', values: ['—', '—', '✔️', '✔️', '✔️'] },
      { feature: 'Data Encryption', values: ['✔️', '✔️', '✔️', '✔️', '✔️'] },
    ]
  },
  {
    title: 'Analytics & Reports',
    items: [
      { feature: 'Type of Analytics', values: ['Basic', 'Advanced', 'Advanced', 'Advanced', 'Advanced'] },
      { feature: 'Tracking ID', values: ['—', '✔️', '✔️', '✔️', '✔️'] },
      { feature: 'Export Reports', values: ['—', '✔️', '✔️', '✔️', '✔️'] },
    ]
  },
  {
    title: 'White Labeling',
    items: [
      { feature: 'Custom Domain QR', values: ['—', '—', '✔️', '✔️', '✔️'] },
      { feature: 'Remove Branding', values: ['—', '—', '✔️', '✔️', '✔️'] },
    ]
  },
  {
    title: 'Sub Accounts',
    items: [
      { feature: 'Total Sub Accounts', values: ['—', '10', '20', '30', 'Unlimited'] },
    ]
  },
  {
    title: 'Support',
    items: [
      { feature: 'Initial Response', values: ['High', 'High Priority', 'High Priority', 'High Priority', 'High Priority'] },
    ]
  }
]

export default function PricingPage() {
  const [plan, setPlan] = useState('monthly')
  const [activeSections, setActiveSections] = useState(() => {
  const initial = {}
  sections.forEach(section => {
    initial[section.title] = true  // ✅ Initially all sections open
  })
  return initial
})
  const currentPlans = pricingData[plan]

  const toggleSection = (title) => {
  setActiveSections(prev => ({
    ...prev,
    [title]: !prev[title] // ✅ Toggle current section's visibility
  }))
}

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Pricing Cards Section */}
      <section className="py-12 px-6 lg:px-20">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
          <p className="text-gray-600">Start for free, upgrade as you grow</p>
        </div>

        <div className="flex justify-center mb-10">
          <ToggleSwitch active={plan} onToggle={setPlan} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentPlans.map((p, i) => (
            <PricingCard key={i} {...p} />
          ))}
        </div>
      </section>

      {/* Comparison Table Section */}
      <section className="bg-[#f0f4ff]">
        <div className="bg-white sticky top-0 z-10 shadow">
          <div className="flex justify-between items-center p-4 overflow-x-auto">
            <div className="min-w-[180px] font-bold text-sm">Features</div>
            {plans.map((plan, i) => (
              <div key={i} className="text-center min-w-[180px]">
                <div className="text-[#008080] font-semibold">{plan.name}</div>
                <div className="text-gray-700 text-sm">{plan.price}</div>
                <button className={`mt-2 px-4 py-1 rounded-full text-white text-xs ${plan.btn === 'Contact Sales' ? 'bg-[#57caca]' : 'bg-[#008080]'}`}>
                  {plan.btn}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="overflow-y-auto">
          {sections.map((section, idx) => (
            <div key={idx} className="border-b border-gray-300">
              <button
                onClick={() => toggleSection(section.title)}
                className="w-full text-left bg-[#10aeb9] px-4 py-2 font-semibold flex justify-between items-center"
              >
                <span>{section.title}</span>
                <span>{activeSections[section.title] ? '-' : '+'}</span>
              </button>
              {activeSections[section.title] && (
                <div className="divide-y divide-gray-200">
                  {section.items.map((item, i) => (
                    <div key={i} className="flex px-4 py-2 text-sm">
                      <div className="min-w-[180px] flex items-center">
                        {item.feature}
                        <HelpCircle className="w-3 h-3 ml-1 text-gray-400" />
                      </div>
                      {item.values.map((value, j) => (
                        <div key={j} className="min-w-[180px] text-center">{value}</div>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
