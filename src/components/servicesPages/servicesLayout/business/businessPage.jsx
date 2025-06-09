'use client';
import React, { useState } from 'react';
import BusinessForm from './BusinessForm';
import BusinessPreview from './BusinessPreview';

const BusinessContent = () => {
  const [form, setForm] = useState({
    name: '',
    heading: '',
    subheading: '',
    businessName: '',
    mobile: '',
    designation: '',
    address: '',
    mapLink: '',
    email: '',
    password: '',
    socialLink: '',
  });

  const [profileImage, setProfileImage] = useState(null);
  const [brandLogo, setBrandLogo] = useState(null);

  return (
    <div className="min-h-screen bg-[#f8f9fa] p-6">
      <h1 className="text-3xl font-bold text-center text-[#008080] mb-8">Digital Business Cards</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <BusinessForm form={form} setForm={setForm} setProfileImage={setProfileImage} setBrandLogo={setBrandLogo} />
        <div className="flex justify-center items-start">
          <BusinessPreview form={form} profileImage={profileImage} brandLogo={brandLogo} />
        </div>
      </div>
    </div>
  );
};

export default BusinessContent;
