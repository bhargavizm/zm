"use client";

import React from "react";
import { CheckIcon, MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function PricingPage() {
  const [expandedSections, setExpandedSections] = useState({});
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [currency, setCurrency] = useState("INR");

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const currencySymbol = currency === "INR" ? "₹" : "$";

  const convertPrice = (inrPrice) => {
    const conversionRate = 0.012; // 1 INR = 0.012 USD
    return currency === "USD"
      ? (inrPrice * conversionRate).toFixed(2)
      : inrPrice;
  };

  const basicPlans = {
    monthly: [
      {
        name: "Free",
        price: 0,
        description: "90 Days Free Trail",
        popular: false,
      },
      { name: "Silver", price: 99, description: "30 Days", popular: false },
      { name: "Gold", price: 499, description: "180 Days", popular: false },
      { name: "Daimond", price: 899, description: "365 Days", popular: false },
      {
        name: "Platinum",
        price: 1599,
        description: "730 Days",
        popular: false,
      },
    ],
  };

  const specialPlans = {
    monthly: [
      { name: "Basic", price: 999, description: "Upto 1GB", popular: false },
      { name: "Starter", price: 1799, description: "Upto 2GB", popular: false },
      { name: "Pro", price: 2499, description: "Upto 3GB", popular: false },
      {
        name: "Advanced",
        price: 2999,
        description: "Upto 4GB",
        popular: false,
      },
      { name: "Ultima", price: 3299, description: "Upto 5GB", popular: false },
    ],
  };

  const features = [
    {
      category: "QR Code Features",
      items: [
        {
          name: "Static QR Codes",
          values: ["Basic", "Unlimited", "Unlimited", "Unlimited", "Unlimited"],
        },
        {
          name: "Total Scans per Month",
          values: ["50,000", "1,00,000", "3,00,000", "5,00,000", "Unlimited"],
        },
      ],
    },
    {
      category: "Bulk Uploads",
      items: [
        {
          name: "Bulk Upload (Coming Soon)",
          values: ["Yes", "Yes", "Yes", "Yes", "Yes"],
        },
      ],
    },
    {
      category: "Security",
      items: [
        {
          name: "2-Factor Authentication (MFA)",
          values: ["Yes", "Yes", "Yes", "Yes", "Yes"],
        },
        {
          name: "SSO(Single Sign-On)",
          values: ["Yes", "Yes", "Yes", "Yes", "Yes"],
        },
        {
          name: "Data Encryption",
          values: ["Yes", "Yes", "Yes", "Yes", "Yes"],
        },
        {
          name: "Passcode Protection",
          values: ["Yes", "Yes", "Yes", "Yes", "Yes"],
        },
      ],
    },
    {
      category: "Analytics & Reports",
      items: [
        {
          name: "Tracking",
          values: ["Yes", "Yes", "Yes", "Yes", "Yes"],
        },
        {
          name: "Daily Analytics Report in Email",
          values: ["Yes", "Yes", "Yes", "Yes", "Yes"],
        },
      ],
    },
    {
      category: "Customization / White Labeling",
      items: [
        {
          name: "QR Code with Logo",
          values: ["Yes", "Yes", "Yes", "Yes", "Yes"],
        },
      ],
    },
    {
      category: "QR Code Management / Sub Accounts",
      items: [
        {
          name: "Max Folders Allowed",
          values: ["30MB", "30MB", "30MB", "30MB", "30MB"],
        },
        {
          name: "Total Accounts (Main & Sub)",
          values: [
            "Unlimited",
            "Unlimited",
            "Unlimited",
            "Unlimited",
            "Unlimited",
          ],
        },
      ],
    },
    {
      category: "Support",
      items: [
        {
          name: "Email Support",
          values: [
            "Basic",
            "Standard",
            "Priority",
            "Priority 24/7",
            "Dedicated",
          ],
        },
        {
          name: "Priority Support",
          values: ["Yes", "Yes", "Yes", "Yes", "Yes"],
        },
      ],
    },
    {
      category: "File Upload / QR Download",
      items: [
        {
          name: "Max Download Resolution",
          values: [
            "1024x1024",
            "1024x1024",
            "1024x1024",
            "1024x1024",
            "1024x1024",
          ],
        },
        {
          name: "Max Upload Size of a Single File / PDF",
          values: ["2MB", "2MB", "2MB", "2MB", "2MB"],
        },
      ],
    },
    {
      category: "QR Code Customization",
      items: [
        {
          name: "3D QRs",
          values: ["Yes", "Yes", "Yes", "Yes", "Yes"],
        },
        {
          name: "QR Codes Shapes",
          values: ["Yes", "Yes", "Yes", "Yes", "Yes"],
        },
        {
          name: "Stickers",
          values: ["Yes", "Yes", "Yes", "Yes", "Yes"],
        },
        {
          name: "Pre-designed QRs",
          values: ["Yes", "Yes", "Yes", "Yes", "Yes"],
        },
      ],
    },
    {
      category: "Notifications",
      items: [
        {
          name: "Email me on Scan",
          values: ["Yes", "Yes", "Yes", "Yes", "Yes"],
        },
        {
          name: "Email me on Form Submission",
          values: ["Yes", "Yes", "Yes", "Yes", "Yes"],
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
          values: [
            "Unlimited",
            "Unlimited",
            "Unlimited",
            "Unlimited",
            "Unlimited",
          ],
        },
        {
          name: "Total Scans per Month",
          values: ["1,00,000", "2,00,000", "3,00,000", "4,00,000", "Unlimited"],
        },
      ],
    },
    {
      category: "Bulk Uploads",
      items: [
        {
          name: "Bulk Upload (Coming Soon)",
          values: ["Yes", "Yes", "Yes", "Yes", "Yes"],
        },
      ],
    },
    {
      category: "Security",
      items: [
        {
          name: "2-Factor Authentication (MFA)",
          values: ["Yes", "Yes", "Yes", "Yes", "Yes"],
        },
        {
          name: "SSO(Single Sign-On)",
          values: ["Yes", "Yes", "Yes", "Yes", "Yes"],
        },
        {
          name: "Data Encryption",
          values: ["Yes", "Yes", "Yes", "Yes", "Yes"],
        },
        {
          name: "Passcode Protection",
          values: ["Yes", "Yes", "Yes", "Yes", "Yes"],
        },
      ],
    },
    {
      category: "Analytics & Reports",
      items: [
        {
          name: "Tracking",
          values: ["Yes", "Yes", "Yes", "Yes", "Yes"],
        },
        {
          name: "Daily Analytics Report in Email",
          values: ["Yes", "Yes", "Yes", "Yes", "Yes"],
        },
      ],
    },
    {
      category: "Customization / White Labeling",
      items: [
        {
          name: "QR Code with Logo",
          values: ["Yes", "Yes", "Yes", "Yes", "Yes"],
        },
      ],
    },
    {
      category: "QR Code Management / Sub Accounts",
      items: [
        {
          name: "Max Folders Allowed",
          values: ["1GB", "2GB", "3GB", "4GB", "5GB"],
        },
        {
          name: "Total Accounts (Main & Sub)",
          values: [
            "Unlimited",
            "Unlimited",
            "Unlimited",
            "Unlimited",
            "Unlimited",
          ],
        },
      ],
    },
    {
      category: "Support",
      items: [
        {
          name: "Email Support",
          values: ["Yes", "Yes", "Yes", "Yes", "Yes"],
        },
        {
          name: "Priority Support",
          values: ["Yes", "Yes", "Yes", "Yes", "Yes"],
        },
      ],
    },
    {
      category: "File Upload / QR Download",
      items: [
        {
          name: "Max Download Resolution",
          values: [
            "1024x1024",
            "1024x1024",
            "1024x1024",
            "1024x1024",
            "1024x1024",
          ],
        },
        {
          name: "Max Upload Size of a Single File / PDF",
          values: ["Upto 1GB", "Upto 2GB", "Upto 3GB", "Upto 4GB", "Upto 5GB"],
        },
      ],
    },
    {
      category: "QR Code Customization",
      items: [
        {
          name: "3D QRs",
          values: ["Yes", "Yes", "Yes", "Yes", "Yes"],
        },
        {
          name: "QR Codes Shapes",
          values: ["Yes", "Yes", "Yes", "Yes", "Yes"],
        },
        {
          name: "Stickers",
          values: ["Yes", "Yes", "Yes", "Yes", "Yes"],
        },
        {
          name: "Pre-designed QRs",
          values: ["Yes", "Yes", "Yes", "Yes", "Yes"],
        },
      ],
    },
    {
      category: "Notifications",
      items: [
        {
          name: "Email me on Scan",
          values: ["Yes", "Yes", "Yes", "Yes", "Yes"],
        },
        {
          name: "Email me on Form Submission",
          values: ["Yes", "Yes", "Yes", "Yes", "Yes"],
        },
      ],
    },
  ];

  const renderCellValue = (value) => {
    if (value === "Yes")
      return <CheckIcon className="w-5 h-5 mx-auto text-green-500" />;
    if (value === "No")
      return <MinusIcon className="w-5 h-5 mx-auto text-gray-400" />;
    return <span className="text-sm text-gray-700">{value}</span>;
  };

  return (
    <div className="bg-[#008080] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-white">Plans for Everyone</h1>
          <p className="mt-2 text-white">
            Whether you're an individual or a growing business, choose a plan
            that fits your goals — simple, flexible, and affordable.
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={() => setCurrency(currency === "INR" ? "USD" : "INR")}
              className="ml-4 px-4 py-2 text-xl border bg-white border-gray-300 rounded-md text-gray-700 hover:bg-teal-500"
            >
              {currency === "INR" ? "Show in USD" : "Show in INR"}
            </button>
          </div>
        </div>

        {/* Basic Plans Table */}
        <div className="mb-16 bg-white p-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Basic Plans ( Secure )
          </h2>

          <div className="overflow-x-auto rounded-lg border border-teal-600">
            <table className="min-w-full border-collapse">
              <thead>
                <tr>
                  <th className="flex items-end h-40 px-4 py-3 text-2xl font-semibold bg-white text-teal-600 border-r border-teal-500">
                    Features
                  </th>
                  {basicPlans[billingCycle].map((plan, index) => (
                    <th
                      key={plan.name}
                      className={`text-center px-4 py-3 text-sm font-bold bg-white ${
                        index < basicPlans[billingCycle].length - 1
                          ? "border-r border-teal-500"
                          : ""
                      }`}
                    >
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-lg text-gray-900">
                          {plan.name}
                        </span>
                        <span className="text-2xl font-extrabold text-teal-600">
                          {currencySymbol}
                          {convertPrice(plan.price)}
                        </span>
                        <span className="text-xs text-gray-600">
                          {plan.description}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white">
                {features.map((section) => (
                  <React.Fragment key={section.category}>
                    <tr
                      onClick={() => toggleSection(section.category)}
                      className="bg-gray-100 cursor-pointer"
                    >
                      <td
                        colSpan={6}
                        className="px-4 py-2 text-sm font-semibold text-gray-900"
                      >
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
                      section.items.map((feature) => (
                        <tr key={feature.name} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-gray-900 border-r border-teal-100">
                            {feature.name}
                          </td>
                          {feature.values.map((value, index) => (
                            <td
                              key={index}
                              className="text-center border-r border-teal-100 py-3"
                            >
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Special Plans ( Encrypted )
          </h2>
          <div className="overflow-x-auto rounded-lg border border-teal-600">
            <table className="min-w-full border-collapse bg-teal-600">
              <thead>
                <tr>
                  <th className="flex items-end h-40 px-4 py-3 text-2xl font-semibold bg-white text-teal-600 border-r border-teal-500">
                    Features
                  </th>
                  {specialPlans[billingCycle].map((plan, index) => (
                    <th
                      key={plan.name}
                      className={`text-center px-4 py-3 text-sm font-bold bg-white ${
                        index < specialPlans[billingCycle].length - 1
                          ? "border-r border-teal-500"
                          : ""
                      }`}
                    >
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-lg text-gray-900">
                          {plan.name}
                        </span>
                        <span className="text-2xl font-extrabold text-teal-600">
                          {currencySymbol}
                          {convertPrice(plan.price)}
                        </span>
                        <span className="text-xs text-gray-600">
                          {plan.description}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white">
                {specialfeatures.map((section) => (
                  <React.Fragment key={section.category}>
                    <tr
                      onClick={() => toggleSection(section.category)}
                      className="bg-gray-100 cursor-pointer"
                    >
                      <td
                        colSpan={6}
                        className="px-4 py-2 text-sm font-semibold text-gray-900"
                      >
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
                      section.items.map((feature) => (
                        <tr key={feature.name} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-gray-900 border-r border-teal-100">
                            {feature.name}
                          </td>
                          {feature.values.map((value, index) => (
                            <td
                              key={index}
                              className="text-center border-r border-teal-100 py-3"
                            >
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
