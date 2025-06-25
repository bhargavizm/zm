// 'use client'

// import React, { useState } from 'react'
// import PricingCard from '@/components/PricingCard'
// import ToggleSwitch from '@/components/ToggleSwitch'
// import { HelpCircle } from 'lucide-react'

// // Pricing Plans Data
// const pricingData = {
//   monthly: [
//     { title: 'Free', price: '₹0', features: ['Basic QR codes', 'Limited analytics'], button: 'Sign Up', highlighted: false },
//     { title: 'Starter', price: '₹399', features: ['Dynamic QR codes', 'Basic design options'], button: 'Buy Now', highlighted: false },
//     { title: 'Pro', price: '₹999', features: ['Advanced analytics', 'More scans/month'], button: 'Buy Now', highlighted: true },
//     { title: 'Ultima', price: '₹1999', features: ['Unlimited scans', 'White-label', 'Priority support'], button: 'Buy Now', highlighted: false },
//   ],
//   yearly: [
//     { title: 'Free', price: '₹0', features: ['Basic QR codes', 'Limited analytics'], button: 'Sign Up', highlighted: false },
//     { title: 'Starter', price: '₹3990', features: ['Dynamic QR codes', 'Basic design options'], button: 'Buy Now', highlighted: false },
//     { title: 'Pro', price: '₹9990', features: ['Advanced analytics', 'More scans/month'], button: 'Buy Now', highlighted: true },
//     { title: 'Ultima', price: '₹19990', features: ['Unlimited scans', 'White-label', 'Priority support'], button: 'Buy Now', highlighted: false },
//   ]
// }

// // Comparison Table Data
// const plans = [
//   { name: 'ULTIMA 25', price: 'USD 69', btn: 'Sign Up' },
//   { name: 'ULTIMA 50', price: 'USD 104', btn: 'Sign Up' },
//   { name: 'ULTIMA 100', price: 'USD 139', btn: 'Sign Up' },
//   { name: 'ULTIMA 200', price: 'USD 174', btn: 'Sign Up' },
//   { name: 'Enterprise Plan', price: '', btn: 'Contact Sales' },
// ]

// const sections = [
//   {
//     title: 'QR Code Basics',
//     items: [
//       { feature: 'Static QR Codes', values: ['Unlimited', 'Unlimited', 'Unlimited', 'Unlimited', 'Unlimited'] },
//       { feature: 'Dynamic QR Codes', values: ['50', '100', '200', '500', 'Custom'] },
//       { feature: 'Multi URL QR Code', values: ['✔️', '✔️', '✔️', '✔️', '✔️'] },
//     ]
//   },
//   {
//     title: 'Digital Business Card (NFC Compatible)',
//     items: [
//       { feature: 'vCards allowed', values: ['25', '50', '100', '200', 'Custom'] },
//       { feature: 'Add a logo / video', values: ['✔️', '✔️', '✔️', '✔️', '✔️'] },
//       { feature: 'Custom background', values: ['✔️', '✔️', '✔️', '✔️', '✔️'] },
//       { feature: 'Share vCard via NFC', values: ['✔️', '✔️', '✔️', '✔️', '✔️'] },
//     ]
//   },
//   {
//     title: 'Forms',
//     items: [
//       { feature: 'Form creation limit', values: ['5', '1000', '2000', 'Unlimited', 'Unlimited'] },
//       { feature: 'Limit respondents', values: ['100', '2000', '3000', 'Unlimited', 'Unlimited'] },
//     ]
//   },
//   {
//     title: 'Security',
//     items: [
//       { feature: '2-Factor Authentication', values: ['✔️', '✔️', '✔️', '✔️', '✔️'] },
//       { feature: 'Single Sign-on (SSO)', values: ['—', '—', '✔️', '✔️', '✔️'] },
//       { feature: 'Data Encryption', values: ['✔️', '✔️', '✔️', '✔️', '✔️'] },
//     ]
//   },
//   {
//     title: 'Analytics & Reports',
//     items: [
//       { feature: 'Type of Analytics', values: ['Basic', 'Advanced', 'Advanced', 'Advanced', 'Advanced'] },
//       { feature: 'Tracking ID', values: ['—', '✔️', '✔️', '✔️', '✔️'] },
//       { feature: 'Export Reports', values: ['—', '✔️', '✔️', '✔️', '✔️'] },
//     ]
//   },
//   {
//     title: 'White Labeling',
//     items: [
//       { feature: 'Custom Domain QR', values: ['—', '—', '✔️', '✔️', '✔️'] },
//       { feature: 'Remove Branding', values: ['—', '—', '✔️', '✔️', '✔️'] },
//     ]
//   },
//   {
//     title: 'Sub Accounts',
//     items: [
//       { feature: 'Total Sub Accounts', values: ['—', '10', '20', '30', 'Unlimited'] },
//     ]
//   },
//   {
//     title: 'Support',
//     items: [
//       { feature: 'Initial Response', values: ['High', 'High Priority', 'High Priority', 'High Priority', 'High Priority'] },
//     ]
//   }
// ]

// export default function PricingPage() {
//   const [plan, setPlan] = useState('monthly')
//   const [activeSections, setActiveSections] = useState(() => {
//   const initial = {}
//   sections.forEach(section => {
//     initial[section.title] = true  // ✅ Initially all sections open
//   })
//   return initial
// })
//   const currentPlans = pricingData[plan]

//   const toggleSection = (title) => {
//   setActiveSections(prev => ({
//     ...prev,
//     [title]: !prev[title] // ✅ Toggle current section's visibility
//   }))
// }

//   return (
//     <div className="min-h-screen bg-white text-black">
//       {/* Pricing Cards Section */}
//       <section className="py-12 px-6 lg:px-20">
//         <div className="text-center mb-10">
//           <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
//           <p className="text-gray-600">Start for free, upgrade as you grow</p>
//         </div>

//         <div className="flex justify-center mb-10">
//           <ToggleSwitch active={plan} onToggle={setPlan} />
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {currentPlans.map((p, i) => (
//             <PricingCard key={i} {...p} />
//           ))}
//         </div>
//       </section>

//       {/* Comparison Table Section */}
//       <section className="bg-[#f0f4ff]">
//         <div className="bg-white sticky top-0 z-10 shadow">
//           <div className="flex justify-between items-center p-4 overflow-x-auto">
//             <div className="min-w-[180px] font-bold text-sm">Features</div>
//             {plans.map((plan, i) => (
//               <div key={i} className="text-center min-w-[180px]">
//                 <div className="text-[#008080] font-semibold">{plan.name}</div>
//                 <div className="text-gray-700 text-sm">{plan.price}</div>
//                 <button className={`mt-2 px-4 py-1 rounded-full text-white text-xs ${plan.btn === 'Contact Sales' ? 'bg-[#57caca]' : 'bg-[#008080]'}`}>
//                   {plan.btn}
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="overflow-y-auto">
//           {sections.map((section, idx) => (
//             <div key={idx} className="border-b border-gray-300">
//               <button
//                 onClick={() => toggleSection(section.title)}
//                 className="w-full text-left bg-[#10aeb9] px-4 py-2 font-semibold flex justify-between items-center"
//               >
//                 <span>{section.title}</span>
//                 <span>{activeSections[section.title] ? '-' : '+'}</span>
//               </button>
//               {activeSections[section.title] && (
//                 <div className="divide-y divide-gray-200">
//                   {section.items.map((item, i) => (
//                     <div key={i} className="flex px-4 py-2 text-sm">
//                       <div className="min-w-[180px] flex items-center">
//                         {item.feature}
//                         <HelpCircle className="w-3 h-3 ml-1 text-gray-400" />
//                       </div>
//                       {item.values.map((value, j) => (
//                         <div key={j} className="min-w-[180px] text-center">{value}</div>
//                       ))}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </section>
//     </div>
//   )
// }


// app/pricing/page.tsx
// import { CheckIcon, MinusIcon } from "@heroicons/react/24/outline";

// export default function PricingPage() {
//   const plans = [
//     {
//       name: "Free",
//       price: "$0",
//       description: "Perfect for getting started",
//       cta: "Get Started",
//       popular: false,
//     },
//     {
//       name: "Starter",
//       price: "$9",
//       description: "For small businesses",
//       cta: "Start Trial",
//       popular: false,
//     },
//     {
//       name: "Pro",
//       price: "$29",
//       description: "For growing businesses",
//       cta: "Start Trial",
//       popular: true,
//     },
//     {
//       name: "Ultima",
//       price: "$99",
//       description: "Enterprise solutions",
//       cta: "Contact Sales",
//       popular: false,
//     },
//   ];

//   const features = [
//     {
//       category: "QR Code Features",
//       items: [
//         { name: "Dynamic QR Codes", free: true, starter: true, pro: true, ultima: true },
//         { name: "Static QR Codes", free: true, starter: true, pro: true, ultima: true },
//         { name: "QR Code Analytics", free: false, starter: true, pro: true, ultima: true },
//         { name: "Custom Domains", free: false, starter: false, pro: true, ultima: true },
//         { name: "Bulk Generation", free: false, starter: false, pro: true, ultima: true },
//       ],
//     },
//     {
//       category: "Customization",
//       items: [
//         { name: "Color Customization", free: true, starter: true, pro: true, ultima: true },
//         { name: "Logo Customization", free: false, starter: true, pro: true, ultima: true },
//         { name: "Pattern Customization", free: false, starter: false, pro: true, ultima: true },
//         { name: "Frame Customization", free: false, starter: false, pro: false, ultima: true },
//       ],
//     },
//     {
//       category: "Support",
//       items: [
//         { name: "Email Support", free: false, starter: true, pro: true, ultima: true },
//         { name: "Priority Support", free: false, starter: false, pro: true, ultima: true },
//         { name: "Dedicated Account Manager", free: false, starter: false, pro: false, ultima: true },
//       ],
//     },
//   ];

//   return (
//     <div className="bg-white py-12 sm:py-16">
//       <div className="mx-auto max-w-7xl px-6 lg:px-8">
//         <div className="mx-auto max-w-4xl text-center">
//           <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
//             Simple, transparent pricing
//           </h1>
//           <p className="mt-4 text-lg leading-8 text-gray-600">
//             Choose the perfect plan for your business needs
//           </p>
//         </div>

//         {/* Unified Pricing & Features Table */}
//         <div className="mt-16 flow-root">
//           <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
//             <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
//               <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
//                 <table className="min-w-full divide-y divide-gray-300">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
//                         Plans & Features
//                       </th>
//                       {plans.map((plan) => (
//                         <th key={plan.name} scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
//                           <div className={`${plan.popular ? 'relative' : ''}`}>
//                             {plan.popular && (
//                               <span className="absolute -top-5 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-50 px-2 py-1 rounded-full text-xs font-medium text-amber-600">
//                                 Most popular
//                               </span>
//                             )}
//                             <div className={`${plan.popular ? 'ring-2 ring-indigo-600 rounded-t-lg px-4 py-2 bg-gray-50' : ''}`}>
//                               <div className="font-bold text-lg">{plan.name}</div>
//                               <div className="text-2xl font-bold my-1">{plan.price}</div>
//                               <div className="text-xs text-gray-500">{plan.description}</div>
//                               <a
//                                 href="#"
//                                 className={`mt-2 inline-block rounded-md py-1 px-2 text-xs font-semibold leading-5 ${
//                                   plan.popular 
//                                     ? 'bg-indigo-600 text-white hover:bg-indigo-500' 
//                                     : 'text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300'
//                                 }`}
//                               >
//                                 {plan.cta}
//                               </a>
//                             </div>
//                           </div>
//                         </th>
//                       ))}
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-gray-200 bg-white">
//                     {features.map((section) => (
//                       <>
//                         <tr key={section.category} className="border-t border-gray-200">
//                           <th
//                             colSpan={5}
//                             scope="colgroup"
//                             className="bg-gray-50 px-4 py-2 text-left text-sm font-semibold text-gray-900 sm:px-6"
//                           >
//                             {section.category}
//                           </th>
//                         </tr>
//                         {section.items.map((feature) => (
//                           <tr key={feature.name}>
//                             <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
//                               {feature.name}
//                             </td>
//                             <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
//                               {feature.free ? <CheckIcon className="h-5 w-5 text-green-500 mx-auto" /> : <MinusIcon className="h-5 w-5 text-gray-400 mx-auto" />}
//                             </td>
//                             <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
//                               {feature.starter ? <CheckIcon className="h-5 w-5 text-green-500 mx-auto" /> : <MinusIcon className="h-5 w-5 text-gray-400 mx-auto" />}
//                             </td>
//                             <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
//                               {feature.pro ? <CheckIcon className="h-5 w-5 text-green-500 mx-auto" /> : <MinusIcon className="h-5 w-5 text-gray-400 mx-auto" />}
//                             </td>
//                             <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
//                               {feature.ultima ? <CheckIcon className="h-5 w-5 text-green-500 mx-auto" /> : <MinusIcon className="h-5 w-5 text-gray-400 mx-auto" />}
//                             </td>
//                           </tr>
//                         ))}
//                       </>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// app/prices/page.jsx

'use client';

import React from "react";
import { CheckIcon, MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function PricingPage() {
  const [expandedSections, setExpandedSections] = useState({});
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [currency, setCurrency] = useState('INR');

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const currencySymbol = currency === 'INR' ? '₹' : '$';

  const convertPrice = (inrPrice) => {
    const conversionRate = 0.012; // 1 INR = 0.012 USD
    return currency === 'USD' ? (inrPrice * conversionRate).toFixed(2) : inrPrice;
  };

  const basicPlans = {
    monthly: [
      { name: "Free", price: 0, description: "90 Days Free Trail", cta: "Start Trial", popular: false },
      { name: "Silver", price: 99, description: "30 Days", cta: "Buy Now", popular: false },
      { name: "Gold", price: 499, description: "180 Days", cta: "Buy Now", popular: true },
      { name: "Daimond", price: 899, description: "365 Days", cta: "Buy Now", popular: false },
      { name: "Platinum", price: 1599, description: "730 Days", cta: "Buy Now", popular: false },
    ],
  };

  const specialPlans = {
    monthly: [
      { name: "Basic", price: 999, description: "Upto 1GB", cta: "Buy Now", popular: false },
      { name: "Starter", price:1799 , description: "Upto 2GB", cta: "Buy Now", popular: false },
      { name: "Pro", price: 2499, description: "Upto 3GB", cta: "Buy Now", popular: true },
      { name: "Advanced", price: 2999, description: "Upto 4GB", cta: "Buy Now", popular: false },
      { name: "Ultima", price: 3299, description: "Upto 5GB", cta: "Buy Now", popular: false },
    ],
  };

  const features = [
    {
      category: "QR Code Features",
      items: [
        { 
          name: "Static QR Codes", 
          values: ["Basic", "Unlimited", "Unlimited", "Unlimited", "Unlimited"] 
        },
        { 
          name: "Total Scans per Month", 
          values: ["50,000", "1,00,000", "3,00,000", "5,00,000", "Unlimited"] 
        },
      ],
    },
    {
      category: "Bulk Uploads",
      items: [
        { 
          name: "Bulk Upload (Coming Soon)", 
          values: ["Yes", "Yes", "Yes", "Yes", "Yes"] 
        },
      ],
    },
    {
      category: "Security",
      items: [
        { 
          name: "2-Factor Authentication (MFA)", 
          values: ["Yes", "Yes", "Yes", "Yes", "Yes"] 
        },
        { 
          name: "SSO(Single Sign-On)", 
          values: ["Yes", "Yes", "Yes", "Yes", "Yes"] 
        },
        { 
          name: "Data Encryption", 
          values: ["Yes", "Yes", "Yes", "Yes", "Yes"]
        },
        { 
          name: "Passcode Protection", 
          values: ["Yes", "Yes", "Yes", "Yes", "Yes"] 
        },
      ],
    },
    {
      category: "Analytics & Reports",
      items: [
        { 
          name: "Tracking", 
          values: ["Yes", "Yes", "Yes", "Yes", "Yes"]
        },
        { 
          name: "Daily Analytics Report in Email", 
          values: ["Yes", "Yes", "Yes", "Yes", "Yes"] 
        },
      ],
    },
    {
      category: "Customization / White Labeling",
      items: [
        
        { 
          name: "QR Code with Logo", 
          values: ["Yes", "Yes", "Yes", "Yes", "Yes"] 
        },
      ],
    },
    {
      category: "QR Code Management / Sub Accounts",
      items: [
        { 
          name: "Max Folders Allowed", 
          values: ["30MB", "30MB", "30MB", "30MB", "30MB"] 
        },
        { 
          name: "Total Accounts (Main & Sub)", 
          values: ["Unlimited", "Unlimited", "Unlimited", "Unlimited", "Unlimited"] 
        },
      ],
    },
    {
      category: "Support",
      items: [
        { 
          name: "Email Support", 
          values: ["Basic", "Standard", "Priority", "Priority 24/7", "Dedicated"] 
        },
        { 
          name: "Priority Support", 
          values: ["Yes", "Yes", "Yes", "Yes", "Yes"] 
        },
      ],
    },
    {
      category: "File Upload / QR Download",
      items: [
        { 
          name: "Max Download Resolution", 
          values: ["1024x1024", "1024x1024", "1024x1024", "1024x1024", "1024x1024"] 
        },
        { 
          name: "Max Upload Size of a Single File / PDF", 
          values: ["2MB", "2MB", "2MB", "2MB", "2MB"] 
        },
      ],
    },
    {
      category: "QR Code Customization",
      items: [
        { 
          name: "3D QRs", 
          values: ["Yes", "Yes", "Yes", "Yes", "Yes"]
        },
        { 
          name: "QR Codes Shapes", 
          values: ["Yes", "Yes", "Yes", "Yes", "Yes"] 
        },
        { 
          name: "Stickers", 
          values: ["Yes", "Yes", "Yes", "Yes", "Yes"]
        },
        { 
          name: "Pre-designed QRs", 
          values: ["Yes", "Yes", "Yes", "Yes", "Yes"] 
        },
      ],
    },
    {
      category: "Notifications",
      items: [
        { 
          name: "Email me on Scan", 
          values: ["Yes", "Yes", "Yes", "Yes", "Yes"] 
        },
        { 
          name: "Email me on Form Submission", 
          values: ["Yes", "Yes", "Yes", "Yes", "Yes"] 
        },
      ],
    },
  ];

  const specialfeatures = [
    {
      category: "QR Code Features",
      items: [
        { 
          name: "Static QR Codes", 
          values: ["Unlimited", "Unlimited", "Unlimited", "Unlimited", "Unlimited"] 
        },
        { 
          name: "Total Scans per Month", 
          values: ["1,00,000", "2,00,000", "3,00,000", "4,00,000", "Unlimited"] 
        },
      ],
    },
    {
      category: "Bulk Uploads",
      items: [
        { 
          name: "Bulk Upload (Coming Soon)", 
          values: ["Yes", "Yes", "Yes", "Yes", "Yes"] 
        },
      ],
    },
    {
      category: "Security",
      items: [
        { 
          name: "2-Factor Authentication (MFA)", 
          values: ["Yes", "Yes", "Yes", "Yes", "Yes"] 
        },
        { 
          name: "SSO(Single Sign-On)", 
          values: ["Yes", "Yes", "Yes", "Yes", "Yes"] 
        },
        { 
          name: "Data Encryption", 
          values: ["Yes", "Yes", "Yes", "Yes", "Yes"] 
        },
        { 
          name: "Passcode Protection", 
          values: ["Yes", "Yes", "Yes", "Yes", "Yes"]
        },
      ],
    },
    {
      category: "Analytics & Reports",
      items: [
        { 
          name: "Tracking", 
          values: ["Yes", "Yes", "Yes", "Yes", "Yes"]
        },
        { 
          name: "Daily Analytics Report in Email", 
          values: ["Yes", "Yes", "Yes", "Yes", "Yes"] 
        },
      ],
    },
    {
      category: "Customization / White Labeling",
      items: [
        
        { 
          name: "QR Code with Logo", 
          values: ["Yes", "Yes", "Yes", "Yes", "Yes"] 
        },
      ],
    },
    {
      category: "QR Code Management / Sub Accounts",
      items: [
        { 
          name: "Max Folders Allowed", 
          values: ["1GB", "2GB", "3GB", "4GB", "5GB"] 
        },
        { 
          name: "Total Accounts (Main & Sub)", 
          values: ["Unlimited", "Unlimited", "Unlimited", "Unlimited", "Unlimited"] 
        },
      ],
    },
    {
      category: "Support",
      items: [
        { 
          name: "Email Support", 
          values: ["Yes", "Yes", "Yes", "Yes", "Yes"]
        },
        { 
          name: "Priority Support", 
          values: ["Yes", "Yes", "Yes", "Yes", "Yes"] 
        },
      ],
    },
    {
      category: "File Upload / QR Download",
      items: [
        { 
          name: "Max Download Resolution", 
          values: ["1024x1024", "1024x1024", "1024x1024", "1024x1024", "1024x1024"] 
        },
        { 
          name: "Max Upload Size of a Single File / PDF", 
          values: ["Upto 5GB", "Upto 5GB", "Upto 5GB", "Upto 5GB", "Upto 5GB"] 
        },
      ],
    },
    {
      category: "QR Code Customization",
      items: [
        { 
          name: "3D QRs", 
          values: ["Yes", "Yes", "Yes", "Yes", "Yes"]
        },
        { 
          name: "QR Codes Shapes", 
          values: ["Yes", "Yes", "Yes", "Yes", "Yes"] 
        },
        { 
          name: "Stickers", 
          values: ["Yes", "Yes", "Yes", "Yes", "Yes"] 
        },
        { 
          name: "Pre-designed QRs", 
          values: ["Yes", "Yes", "Yes", "Yes", "Yes"] 
        },
      ],
    },
    {
      category: "Notifications",
      items: [
        { 
          name: "Email me on Scan", 
          values: ["Yes", "Yes", "Yes", "Yes", "Yes"] 
        },
        { 
          name: "Email me on Form Submission", 
          values: ["Yes", "Yes", "Yes", "Yes", "Yes"] 
        },
      ],
    },
  ];

  const renderCellValue = (value) => {
    if (value === "Yes") return <CheckIcon className="w-5 h-5 mx-auto text-green-500" />;
    if (value === "No") return <MinusIcon className="w-5 h-5 mx-auto text-gray-400" />;
    return <span className="text-sm text-gray-700">{value}</span>;
  };

  return (
    <div className="bg-[#008080] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-white">Plans for Everyone</h1>
          <p className="mt-2 text-white">Whether you're an individual or a growing business, choose a plan that fits your goals — simple, flexible, and affordable.</p>
          <div className="flex justify-center gap-4 mt-4">
            <div className="inline-flex rounded-md shadow-sm">
              <button
                onClick={() => setBillingCycle('monthly')}
                className="px-4 py-2 text-sm font-medium rounded-l-lg text-white"
              >Monthly</button>
            </div>
            <button
              onClick={() => setCurrency(currency === 'INR' ? 'USD' : 'INR')}
              className="ml-4 px-4 py-2 text-sm border bg-white border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
            >
              {currency === 'INR' ? 'Show in USD' : 'Show in INR'}
            </button>
          </div>
        </div>

        {/* Basic Plans Table */}
        <div className="mb-16 bg-white p-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Basic Plans ( Secure )</h2>
          <div className="overflow-x-auto rounded-lg border border-teal-600">
            <table className="min-w-full border-collapse">
              <thead>
                <tr>
                  <th className="flex items-end h-40 px-4 py-3 text-2xl font-semibold bg-white text-teal-600 border-r border-teal-500">Features</th>
                  {basicPlans[billingCycle].map((plan, index) => (
                    <th
                      key={plan.name}
                      className={`text-center px-4 py-3 text-sm font-bold bg-white ${
                        index < basicPlans[billingCycle].length - 1 ? 'border-r border-teal-500' : ''
                      }`}
                    >
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-lg text-gray-900">{plan.name}</span>
                        <span className="text-2xl font-extrabold text-teal-600">
                          {currencySymbol}{convertPrice(plan.price)}
                        </span>
                        <span className="text-xs text-gray-600">{plan.description}</span>
                        <a
                          href="#"
                          className={`mt-1 inline-block px-3 py-1 rounded-md text-xs font-semibold ${
                            plan.popular
                              ? 'bg-teal-600 text-white hover:bg-teal-700'
                              : 'text-teal-600 ring-1 ring-inset ring-teal-400 hover:bg-teal-50'
                          }`}
                        >
                          {plan.cta}
                        </a>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white">
                {features.map(section => (
                  <React.Fragment key={section.category}>
                    <tr onClick={() => toggleSection(section.category)} className="bg-gray-100 cursor-pointer">
                      <td colSpan={6} className="px-4 py-2 text-sm font-semibold text-gray-900">
                        <div className="flex items-center justify-between">
                          {section.category}
                          {!expandedSections[section.category] ? (
                            <MinusIcon className="h-4 w-4 mr-2" />
                          ) : (
                            <PlusIcon className="h-4 w-4 mr-2" />
                          )}
                        </div>
                      </td>
                    </tr>
                    {!expandedSections[section.category] &&
                      section.items.map(feature => (
                        <tr key={feature.name} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-gray-900 border-r border-teal-100">{feature.name}</td>
                          {feature.values.map((value, index) => (
                            <td key={index} className="text-center border-r border-teal-100 py-3">
                              {renderCellValue(value)}
                            </td>
                          ))}
                        </tr>
                      ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Special Plans Table */}
        <div className="bg-white p-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Special Plans ( Encrypted )</h2>
          <div className="overflow-x-auto rounded-lg border border-teal-600">
            <table className="min-w-full border-collapse bg-teal-600">
              <thead>
                <tr>
                  <th className="flex items-end h-40 px-4 py-3 text-2xl font-semibold bg-white text-teal-600 border-r border-teal-500">Features</th>
                  {specialPlans[billingCycle].map((plan, index) => (
                    <th
                      key={plan.name}
                      className={`text-center px-4 py-3 text-sm font-bold bg-white ${
                        index < specialPlans[billingCycle].length - 1 ? 'border-r border-teal-500' : ''
                      }`}
                    >
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-lg text-gray-900">{plan.name}</span>
                        <span className="text-2xl font-extrabold text-teal-600">
                          {currencySymbol}{convertPrice(plan.price)}
                        </span>
                        <span className="text-xs text-gray-600">{plan.description}</span>
                        <a
                          href="#"
                          className={`mt-1 inline-block px-3 py-1 rounded-md text-xs font-semibold ${
                            plan.popular
                              ? 'bg-teal-600 text-white hover:bg-teal-700'
                              : 'text-teal-600 ring-1 ring-inset ring-teal-400 hover:bg-teal-50'
                          }`}
                        >
                          {plan.cta}
                        </a>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white">
                {specialfeatures.map(section => (
                  <React.Fragment key={section.category}>
                    <tr onClick={() => toggleSection(section.category)} className="bg-gray-100 cursor-pointer">
                      <td colSpan={6} className="px-4 py-2 text-sm font-semibold text-gray-900">
                        <div className="flex items-center justify-between">
                          {section.category}
                          {!expandedSections[section.category] ? (
                            <MinusIcon className="h-4 w-4 mr-2" />
                          ) : (
                            <PlusIcon className="h-4 w-4 mr-2" />
                          )}
                        </div>
                      </td>
                    </tr>
                    {!expandedSections[section.category] &&
                      section.items.map(feature => (
                        <tr key={feature.name} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-gray-900 border-r border-teal-100">{feature.name}</td>
                          {feature.values.map((value, index) => (
                            <td key={index} className="text-center border-r border-teal-100 py-3">
                              {renderCellValue(value)}
                            </td>
                          ))}
                        </tr>
                      ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}