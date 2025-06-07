'use client'

import React, { useState } from 'react'
import { Check, HelpCircle } from 'lucide-react'
import Image from 'next/image'

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
      { feature: 'Multi URL QR Code', values: ['\u2713', '\u2713', '\u2713', '\u2713', '\u2713'] },
    ]
  },
  {
    title: 'Digital Business Card (NFC Compatible)',
    items: [
      { feature: 'vCards allowed', values: ['25', '50', '100', '200', 'Custom'] },
      { feature: 'Add a logo / video', values: ['\u2713', '\u2713', '\u2713', '\u2713', '\u2713'] },
      { feature: 'Custom background', values: ['\u2713', '\u2713', '\u2713', '\u2713', '\u2713'] },
      { feature: 'Share vCard via NFC', values: ['\u2713', '\u2713', '\u2713', '\u2713', '\u2713'] },
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
      { feature: '2-Factor Authentication', values: ['\u2713', '\u2713', '\u2713', '\u2713', '\u2713'] },
      { feature: 'Single Sign-on (SSO)', values: ['-', '-', '\u2713', '\u2713', '\u2713'] },
      { feature: 'Data Encryption', values: ['\u2713', '\u2713', '\u2713', '\u2713', '\u2713'] },
    ]
  },
  {
    title: 'Analytics & Reports',
    items: [
      { feature: 'Type of Analytics', values: ['Basic', 'Advanced', 'Advanced', 'Advanced', 'Advanced'] },
      { feature: 'Tracking ID', values: ['-', '\u2713', '\u2713', '\u2713', '\u2713'] },
      { feature: 'Export Reports', values: ['-', '\u2713', '\u2713', '\u2713', '\u2713'] },
    ]
  },
  {
    title: 'White Labeling',
    items: [
      { feature: 'Custom Domain QR', values: ['-', '-', '\u2713', '\u2713', '\u2713'] },
      { feature: 'Remove Branding', values: ['-', '-', '\u2713', '\u2713', '\u2713'] },
    ]
  },
  {
    title: 'Sub Accounts',
    items: [
      { feature: 'Total Sub Accounts', values: ['-', '10', '20', '30', 'Unlimited'] },
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
  const [activeSections, setActiveSections] = useState({})

  const toggleSection = (title) => {
    setActiveSections((prev) => ({ ...prev, [title]: !prev[title] }))
  }

  return (
    <div className="min-h-screen bg-[#f0f4ff] text-black">
      {/* Header */}
      <div className="bg-white sticky top-0 z-10 shadow">
        <div className="flex justify-between items-center p-4 overflow-x-auto">
          <div className="min-w-[180px] font-bold text-sm">Features</div>
          {plans.map((plan, i) => (
            <div key={i} className="text-center min-w-[180px]">
              <div className="text-blue-700 font-semibold">{plan.name}</div>
              <div className="text-gray-700 text-sm">{plan.price}</div>
              <button className={`mt-2 px-4 py-1 rounded-full text-white text-xs ${plan.btn === 'Contact Sales' ? 'bg-blue-400' : 'bg-blue-600'}`}>{plan.btn}</button>
            </div>
          ))}
        </div>
      </div>

      {/* Scrollable Section */}
      <div className="overflow-y-auto">
        {sections.map((section, idx) => (
          <div key={idx} className="border-b border-gray-300">
            <button
              onClick={() => toggleSection(section.title)}
              className="w-full text-left bg-[#dce4ff] px-4 py-2 font-semibold flex justify-between items-center"
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
                      <div key={j} className="min-w-[180px] text-center">
                        {value === '\u2713' ? '✔️' : value === '-' ? '—' : value}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
