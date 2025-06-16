// src/components/BusinessContent.jsx
'use client';

import React, { useState } from 'react';
import useServicesContext from '@/components/hooks/useServiceContext'; // Adjust path

import { Eye, EyeOff } from 'lucide-react'; // Assuming lucide-react is installed
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

const BusinessContent = () => {
  const { dynamicForms, updateDynamicForm } = useServicesContext();
  const businessInfo = dynamicForms.businessInfo;

    const [showPassword, setShowPassword] = useState(false);
    const [nfcEnabled, setNfcEnabled] = useState(false);
    const [showNfcModal, setShowNfcModal] = useState(false);
  const shopTimingsTemplate = dynamicForms.shopTimingsTemplate;


  // Consolidated handleChange for all dynamic forms
  const handleChange = (formKey, sectionKey, fieldKey, value) => {
    // The previous 'if' condition is fine, but simplified here for clarity.
    // updateDynamicForm handles nesting as long as the path is correct.
    updateDynamicForm(formKey, sectionKey, fieldKey, value);
  };

  const handleFileChange = (section, field, files, isMultiple = false) => {
    const fileValue = isMultiple ? Array.from(files) : files[0];
    updateDynamicForm('businessInfo', section, field, fileValue);
  };

  const handleNfcToggle = () => {
    if (!nfcEnabled) {
      setShowNfcModal(true);
    } else {
      setNfcEnabled(false);
    }
  };

  const confirmNfc = () => {
    setNfcEnabled(true);
    setShowNfcModal(false);
  };

  const cancelNfc = () => {
    setShowNfcModal(false);
  };

  // Handler for image/video template selection
  const handleTemplateSelect = (templateName) => {
    // Update the selectedTemplate in the state
    updateDynamicForm('shopTimingsTemplate', null, 'selectedTemplate', templateName);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
    <div className="space-y-8 p-4 md:p-8 lg:p-12 bg-gray-50 rounded-xl shadow-lg h-[550px] overflow-auto hide-scrollbar">

      {/* New Template Selection and Editing Section */}
      <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-3 border-gray-200">Shop Timings Template</h3>

        <div className="space-y-5">
          <label className="block text-base font-medium text-gray-700 mb-2">Choose a Template:</label>

          {/* Template Image/Video Selection Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            {/* Template 1 Image */}
            <div
              className={`relative cursor-pointer rounded-lg overflow-hidden border-2 ${
                shopTimingsTemplate.selectedTemplate === 'template1' ? 'border-teal-500 ring-2 ring-teal-300' : 'border-gray-300 hover:border-gray-400'
              } transition-all duration-200 shadow-sm hover:shadow-md`}
              onClick={() => handleTemplateSelect('template1')}
            >
              <img
                src="/images/templates/businessShop1.jpg"
                alt="Template 1: Opening Hours"
                className="w-full h-auto object-cover"
              />
              
            </div>

            {/* Template 2 Image */}
            <div
              className={`relative cursor-pointer rounded-lg overflow-hidden border-2 ${
                shopTimingsTemplate.selectedTemplate === 'template2' ? 'border-teal-500 ring-2 ring-teal-300' : 'border-gray-300 hover:border-gray-400'
              } transition-all duration-200 shadow-sm hover:shadow-md`}
              onClick={() => handleTemplateSelect('template2')}
            >
              <img
                src="/images/templates/businessShop2.jpg"
                alt="Template 2: We're Open"
                className="w-full h-auto object-cover"
              />
             
            </div>

            {/* Template 3 Video */}
             <div
              className={`relative cursor-pointer rounded-lg overflow-hidden border-2 ${
                shopTimingsTemplate.selectedTemplate === 'template3' ? 'border-teal-500 ring-2 ring-teal-300' : 'border-gray-300 hover:border-gray-400'
              } transition-all duration-200 shadow-sm hover:shadow-md`}
              onClick={() => handleTemplateSelect('template3')}
            >
              <img
                src="/images/templates/businessShop3.jpg"
                alt="Template 2: We're Open"
                className="w-full h-auto object-cover"
              />
             
            </div>

            {/* Clear Selection / No Template Option */}
            <div
              className={`relative cursor-pointer rounded-lg overflow-hidden border-2 ${
                shopTimingsTemplate.selectedTemplate === 'none' ? 'border-teal-500 ring-2 ring-teal-300' : 'border-gray-300 hover:border-gray-400'
              } transition-all duration-200 shadow-sm hover:shadow-md`}
              onClick={() => handleTemplateSelect('none')}
            >
              <h1>Manuall</h1>
              
            </div>

          </div>

          {/* Conditional rendering for Template 1 editing */}
          {shopTimingsTemplate.selectedTemplate === "template1" && (
            <div className="mt-6 p-4 border border-gray-200 rounded-lg bg-gray-50 space-y-4">
              <h4 className="text-xl font-medium text-gray-700">Template 1 Content (Opening Hours)</h4>
              <input
                type="text"
                placeholder="Title (e.g., Opening Hours)"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-teal-200"
                value={shopTimingsTemplate.template1Data.title || ''}
                onChange={(e) =>
                  handleChange('shopTimingsTemplate', 'template1Data', 'title', e.target.value)
                }
              />
              {/* Iterating over days for Template 1 */}
              {(shopTimingsTemplate.template1Data.days || []).map((dayData, index) => (
                <div key={index} className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Day (e.g., MONDAY)"
                    className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-teal-200"
                    value={dayData.day || ''}
                    onChange={(e) => {
                      const newDays = [...(shopTimingsTemplate.template1Data.days || [])];
                      newDays[index] = { ...newDays[index], day: e.target.value };
                      handleChange('shopTimingsTemplate', 'template1Data', 'days', newDays);
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Time (e.g., 10AM - 10PM)"
                    className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-teal-200"
                    value={dayData.time || ''}
                    onChange={(e) => {
                      const newDays = [...(shopTimingsTemplate.template1Data.days || [])];
                      newDays[index] = { ...newDays[index], time: e.target.value };
                      handleChange('shopTimingsTemplate', 'template1Data', 'days', newDays);
                    }}
                  />
                </div>
              ))}
              <input
                type="text"
                placeholder="About Us Link Text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-teal-200"
                value={shopTimingsTemplate.template1Data.aboutUsLink || ''}
                onChange={(e) =>
                  handleChange('shopTimingsTemplate', 'template1Data', 'aboutUsLink', e.target.value)
                }
              />
              <input
                type="text"
                placeholder="Site Link Text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-teal-200"
                value={shopTimingsTemplate.template1Data.siteLink || ''}
                onChange={(e) =>
                  handleChange('shopTimingsTemplate', 'template1Data', 'siteLink', e.target.value)
                }
              />
            </div>
          )}

          {/* Conditional rendering for Template 2 editing */}
          {shopTimingsTemplate.selectedTemplate === "template2" && (
            <div className="mt-6 p-4 border border-gray-200 rounded-lg bg-gray-50 space-y-4">
              <h4 className="text-xl font-medium text-gray-700">Template 2 Content (We're Open)</h4>
              <input
                type="text"
                placeholder="Logo Text (e.g., GIGGLING PLATYPUS)"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-teal-200"
                value={shopTimingsTemplate.template2Data.logoText || ''}
                onChange={(e) =>
                  handleChange('shopTimingsTemplate', 'template2Data', 'logoText', e.target.value)
                }
              />
              <input
                type="text"
                placeholder="Main Heading (e.g., WE'RE OPEN)"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-teal-200"
                value={shopTimingsTemplate.template2Data.mainHeading || ''}
                onChange={(e) =>
                  handleChange('shopTimingsTemplate', 'template2Data', 'mainHeading', e.target.value)
                }
              />
              <input
                type="text"
                placeholder="Sub Heading (e.g., TUESDAY TO SUNDAY)"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-teal-200"
                value={shopTimingsTemplate.template2Data.subHeading || ''}
                onChange={(e) =>
                  handleChange('shopTimingsTemplate', 'template2Data', 'subHeading', e.target.value)
                }
              />
              <input
                type="text"
                placeholder="Time Range (e.g., 12 AM - 10 PM)"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-teal-200"
                value={shopTimingsTemplate.template2Data.timeRange || ''}
                onChange={(e) =>
                  handleChange('shopTimingsTemplate', 'template2Data', 'timeRange', e.target.value)
                }
              />
              <input
                type="text"
                placeholder="Closed Day (e.g., CLOSED MONDAY)"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-teal-200"
                value={shopTimingsTemplate.template2Data.closedDay || ''}
                onChange={(e) =>
                  handleChange('shopTimingsTemplate', 'template2Data', 'closedDay', e.target.value)
                }
              />
              <input
                type="text"
                placeholder="Address Line 1"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-teal-200"
                value={shopTimingsTemplate.template2Data.addressLine1 || ''}
                onChange={(e) =>
                  handleChange('shopTimingsTemplate', 'template2Data', 'addressLine1', e.target.value)
                }
              />
              <input
                type="text"
                placeholder="Address Line 2"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-teal-200"
                value={shopTimingsTemplate.template2Data.addressLine2 || ''}
                onChange={(e) =>
                  handleChange('shopTimingsTemplate', 'template2Data', 'addressLine2', e.target.value)
                }
              />
              <input
                type="text"
                placeholder="Website (e.g., www.reallygreatsite.com)"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-teal-200"
                value={shopTimingsTemplate.template2Data.website || ''}
                onChange={(e) =>
                  handleChange('shopTimingsTemplate', 'template2Data', 'website', e.target.value)
                }
              />
            </div>
          )}

          {/* Conditional rendering for Template 3 editing (Video Template) */}
          
        </div>
      </div>

      {/* General Section */}
      <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-3 border-gray-200">General Information</h3>
        <div className="space-y-5">
          <input
            type="text"
            placeholder="Business Name"
            className="w-full px-5 py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-teal-500 transition-all duration-200"
            value={businessInfo.general.businessName || ''}
            onChange={(e) => handleChange('businessInfo', 'general', 'businessName', e.target.value)}
          />

          <input
            type="text"
            placeholder="Business Type"
            className="w-full px-5 py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-teal-500 transition-all duration-200"
            value={businessInfo.general.businessType || ''}
            onChange={(e) => handleChange('businessInfo', 'general', 'businessType', e.target.value)}
          />

          <textarea
            placeholder="Business Description"
            rows={4}
            className="w-full px-5 py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-teal-500 transition-all duration-200 resize-y"
            value={businessInfo.general.description || ''}
            onChange={(e) => handleChange('businessInfo', 'general', 'description', e.target.value)}
          />

          <div className="flex flex-col">
            <label htmlFor="establishedDate" className="text-sm font-medium text-gray-700 mb-2">Established Date</label>
            <input
              id="establishedDate"
              type="date"
              className="w-full px-5 py-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-teal-500 transition-all duration-200"
              value={businessInfo.general.establishedDate || ''}
              onChange={(e) => handleChange('businessInfo', 'general', 'establishedDate', e.target.value)}
            />
          </div>

          <input
            type="text"
            placeholder="Shop Timings (e.g., 9:00 AM - 6:00 PM)"
            className="w-full px-5 py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-teal-500 transition-all duration-200"
            value={businessInfo.general.shopTimings || ''}
            onChange={(e) => handleChange('businessInfo', 'general', 'shopTimings', e.target.value)}
          />
        </div>
      </div>

      {/* Contact Section */}
      <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-3 border-gray-200">Contact Information</h3>
        <div className="space-y-5">
          <input
            type="text"
            placeholder="Phone Number"
            className="w-full px-5 py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-teal-500 transition-all duration-200"
            value={businessInfo.contact.phone || ''}
            onChange={(e) => handleChange('businessInfo', 'contact', 'phone', e.target.value)}
          />

          <input
            type="email"
            placeholder="Email Address"
            className="w-full px-5 py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-teal-500 transition-all duration-200"
            value={businessInfo.contact.email || ''}
            onChange={(e) => handleChange('businessInfo', 'contact', 'email', e.target.value)}
          />

          <textarea
            placeholder="Full Address"
            rows={3}
            className="w-full px-5 py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-teal-500 transition-all duration-200 resize-y"
            value={businessInfo.contact.address || ''}
            onChange={(e) => handleChange('businessInfo', 'contact', 'address', e.target.value)}
          />
        </div>
      </div>

      {/* Media Section */}
      <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-3 border-gray-200">Media</h3>
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="block text-base font-medium text-gray-700">Business Logo</label>
            <input
              type="file"
              accept="image/*"
              className="w-full text-gray-700 file:mr-4 file:py-3 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-600 file:text-white hover:file:bg-teal-700 file:transition-colors file:duration-200 cursor-pointer border border-gray-300 rounded-lg py-2"
              onChange={(e) => handleFileChange('media', 'logo', e.target.files)}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-base font-medium text-gray-700">Business Video</label>
            <input
              type="file"
              accept="video/*"
              className="w-full text-gray-700 file:mr-4 file:py-3 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-600 file:text-white hover:file:bg-teal-700 file:transition-colors file:duration-200 cursor-pointer border border-gray-300 rounded-lg py-2"
              onChange={(e) => handleFileChange('media', 'video', e.target.files)}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-base font-medium text-gray-700">Gallery Images</label>
            <input
              type="file"
              accept="image/*"
              multiple
              className="w-full text-gray-700 file:mr-4 file:py-3 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-600 file:text-white hover:file:bg-teal-700 file:transition-colors file:duration-200 cursor-pointer border border-gray-300 rounded-lg py-2"
              onChange={(e) => handleFileChange('media', 'galleryImages', e.target.files, true)}
            />
          </div>
        </div>
      </div>

      {/* Security Section */}
      <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-3 border-gray-200">Security</h3>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full px-5 py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-teal-500 pr-12 transition-all duration-200"
            value={businessInfo.security.password || ''}
            onChange={(e) => handleChange('businessInfo', 'security', 'password', e.target.value)}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-teal-600 hover:text-teal-800 transition-colors duration-200"
            onClick={togglePasswordVisibility}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      {/* Security */}
      {/* <input type="password" placeholder="Password" className="w-full border p-2 rounded"
        value={businessInfo.security.password}
        onChange={(e) => handleChange('security', 'password', e.target.value)} /> */}


   
    </div>

     {/* ✅ NFC Toggle with Icon */}
              <div className="flex items-center gap-4 my-9 justify-end">
                <span className="text-sm font-medium text-gray-700">NFC</span>
                <button
                  type="button"
                  onClick={handleNfcToggle}
                  className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors duration-500 cursor-pointer
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#008080]
                    ${nfcEnabled ? "bg-[#008080]" : "bg-gray-300"}`}
                >
                  <span
                    className={`absolute left-1 top-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-md transition-all duration-300
                    ${nfcEnabled ? "translate-x-8" : "translate-x-0"}`}
                  >
                    {nfcEnabled ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-[#008080]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    )}
                  </span>
                </button>
              </div>


        <button className="w-full py-2 cursor-pointer bg-[#008080] text-white font-semibold rounded hover:bg-[#006666] transition">
          Submit
        </button>
{/* ✅ NFC Modal */}
      {showNfcModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/30">
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full border border-teal-200 relative">
            {/* Close Button */}
            <button
              onClick={cancelNfc}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl"
            >
              &times;
            </button>

            <h2 className="text-xl font-bold text-[#008080] mb-2">
              NFC Activated
            </h2>
            <p className="text-sm text-gray-700">
              You're trying to enable <strong>NFC</strong> features.
              <br />
              This is a <strong>premium service</strong>.
              <br />
              <span className="text-[#008080] font-semibold">
                Cost: ₹499/year
              </span>
            </p>

            <div className="flex justify-end mt-5 space-x-3">
              <button
                onClick={cancelNfc}
                className="px-4 py-2 cursor-pointer rounded border border-gray-400 text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={confirmNfc}
                className="px-4 py-2 cursor-pointer bg-[#008080] text-white rounded hover:bg-[#006666] transition"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BusinessContent;