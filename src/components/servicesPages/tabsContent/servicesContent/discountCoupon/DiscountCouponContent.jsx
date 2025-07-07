// FRONTEND: DiscountCouponContent.jsx

'use client';

import React, { useRef, useState } from 'react';
import useServicesContext from '@/components/hooks/useServiceContext';
import { Eye, EyeOff, X } from 'lucide-react';
import NFCModal from '@/components/modalPopUps/nfcModal';
import { useDispatch } from 'react-redux';
import { setDiscountServices } from '@/redux/slices/servicesSlice';
import axios from 'axios';
import CryptoJS from 'crypto-js';

const DiscountCouponContent = () => {
  const { dynamicForms, updateDynamicForm } = useServicesContext();
  const discountCoupon = dynamicForms.discountCoupon || {};
  const [showPassword, setShowPassword] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [fileSizeError, setFileSizeError] = useState(false);
  const dispatch = useDispatch();

  const brandLogoInputRef = useRef(null);
  const couponImageInputRef = useRef(null);

  const MAX_FILE_SIZE = 2 * 1024 * 1024;

  const handleChange = (fieldKey, value) => {
    updateDynamicForm('discountCoupon', null, fieldKey, value);
  };

  const handleFileChange = (fieldKey, files) => {
    if (files && files[0]) {
      const file = files[0];
      if (file.size > MAX_FILE_SIZE) {
        setFileSizeError(true);
        return;
      }
      handleChange(fieldKey, file);
    }
  };

  const removeImage = (fieldKey) => {
    handleChange(fieldKey, null);
    if (fieldKey === 'brandLogo' && brandLogoInputRef.current) brandLogoInputRef.current.value = '';
    if (fieldKey === 'couponImage' && couponImageInputRef.current) couponImageInputRef.current.value = '';
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const getPreviewUrl = (fileOrUrl) => {
    if (!fileOrUrl) return null;
    if (fileOrUrl instanceof File) return URL.createObjectURL(fileOrUrl);
    if (typeof fileOrUrl === 'string') return fileOrUrl;
    return null;
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      if (!file) return resolve(null);
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = () => setShowPreview(true);

  const handleConfirm = async () => {
    const brandLogoBase64 = await fileToBase64(discountCoupon.brandLogo);
    const couponImageBase64 = await fileToBase64(discountCoupon.couponImage);

    const encryptedPassword = discountCoupon.password
      ? CryptoJS.AES.encrypt(discountCoupon.password, 'secret-key').toString()
      : '';

    const payload = {
      nameOfBusiness: discountCoupon.nameOfBusiness,
      code: discountCoupon.code,
      password: encryptedPassword,
      brandLogo: brandLogoBase64,
      couponImage: couponImageBase64,
    };

    try {
      const response = await axios.post('/api/services/discount', payload, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.data?.success) {
        dispatch(setDiscountServices(response.data.data));
        setShowPreview(false);
        setShowSuccessPopup(true);
        updateDynamicForm('discountCoupon', null, null, {});
      } else {
        alert(response.data.message || 'Failed to save coupon');
      }
    } catch (error) {
      console.error('Request failed:', error);
      alert('Something went wrong');
    }
  };

  return (
    <div className="relative">
      {/* ... Include your form UI here ... */}
    </div>
  );
};

export default DiscountCouponContent;

// BACKEND: /api/services/discount/route.js

import { connectDB } from '@/lib/mongoDB';
import DiscountModal from '@/models/services/discountSchema';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { nameOfBusiness, code, brandLogo, couponImage, password } = body;

    if (!nameOfBusiness || !code) {
      return NextResponse.json({
        success: false,
        message: 'Missing required fields: nameOfBusiness, code',
      }, { status: 400 });
    }

    const newCoupon = new DiscountModal({
      nameOfBusiness,
      code,
      brandLogo,
      couponImage,
      password,
    });

    await newCoupon.save();

    return NextResponse.json({
      success: true,
      message: 'Coupon saved',
      data: newCoupon,
    }, { status: 201 });

  } catch (err) {
    console.error('Error saving coupon:', err);
    return NextResponse.json({
      success: false,
      message: 'Server error',
    }, { status: 500 });
  }
}

// SCHEMA: models/services/discountSchema.js

import mongoose from 'mongoose';

const discountCouponSchema = new mongoose.Schema({
  brandLogo: { type: String, required: false },
  nameOfBusiness: { type: String, required: true, trim: true },
  code: { type: String, required: true, trim: true, uppercase: true },
  couponImage: { type: String, required: false },
  password: { type: String, required: false },
}, {
  timestamps: true,
});

const DiscountModal = mongoose.models.DiscountCoupon || mongoose.model('DiscountCoupon', discountCouponSchema);

export default DiscountModal;
