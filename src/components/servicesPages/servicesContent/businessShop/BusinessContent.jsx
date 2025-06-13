'use client';

import React from 'react';
import useServicesContext from '@/components/hooks/useServiceContext';

const BusinessContent = () => {
  const { dynamicForms, updateDynamicForm } = useServicesContext();
  const businessInfo = dynamicForms.businessInfo;

  const handleChange = (section, field, value) => {
    updateDynamicForm('businessInfo', section, field, value);
  };

  const handleFileChange = (section, field, files, isMultiple = false) => {
    const fileValue = isMultiple ? Array.from(files) : files[0];
    updateDynamicForm('businessInfo', section, field, fileValue);
  };

  return (
    <div className="space-y-4">
      {/* General Section */}
      <input type="text" placeholder="Business Name" className="w-full border p-2 rounded"
        value={businessInfo.general.businessName}
        onChange={(e) => handleChange('general', 'businessName', e.target.value)} />

      <input type="text" placeholder="Business Type" className="w-full border p-2 rounded"
        value={businessInfo.general.businessType}
        onChange={(e) => handleChange('general', 'businessType', e.target.value)} />

      <textarea placeholder="Business Description" className="w-full border p-2 rounded"
        value={businessInfo.general.description}
        onChange={(e) => handleChange('general', 'description', e.target.value)} />

      <input type="date" className="w-full border p-2 rounded"
        value={businessInfo.general.establishedDate}
        onChange={(e) => handleChange('general', 'establishedDate', e.target.value)} />

      <input type="text" placeholder="Shop Timings" className="w-full border p-2 rounded"
        value={businessInfo.general.shopTimings}
        onChange={(e) => handleChange('general', 'shopTimings', e.target.value)} />

      {/* Contact Section */}
      <input type="text" placeholder="Phone" className="w-full border p-2 rounded"
        value={businessInfo.contact.phone}
        onChange={(e) => handleChange('contact', 'phone', e.target.value)} />

      <input type="email" placeholder="Email" className="w-full border p-2 rounded"
        value={businessInfo.contact.email}
        onChange={(e) => handleChange('contact', 'email', e.target.value)} />

      <textarea placeholder="Address" className="w-full border p-2 rounded"
        value={businessInfo.contact.address}
        onChange={(e) => handleChange('contact', 'address', e.target.value)} />

      {/* Media Section */}
      <div>
        <label>Upload Business Logo</label>
        <input type="file" accept="image/*" className="w-full border p-2 rounded"
          onChange={(e) => handleFileChange('media', 'logo', e.target.files)} />
      </div>

      <div>
        <label>Upload Business Video</label>
        <input type="file" accept="video/*" className="w-full border p-2 rounded"
          onChange={(e) => handleFileChange('media', 'video', e.target.files)} />
      </div>

      <div>
        <label>Upload Gallery Images</label>
        <input type="file" accept="image/*" multiple className="w-full border p-2 rounded"
          onChange={(e) => handleFileChange('media', 'galleryImages', e.target.files, true)} />
      </div>

      {/* Security */}
      <input type="password" placeholder="Password" className="w-full border p-2 rounded"
        value={businessInfo.security.password}
        onChange={(e) => handleChange('security', 'password', e.target.value)} />
    </div>
  );
};

export default BusinessContent;
