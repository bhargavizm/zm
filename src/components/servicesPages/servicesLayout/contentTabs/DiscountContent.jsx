'use client';

import React, { useState, useMemo } from 'react';
import {
  FaTag, FaPercent, FaDollarSign, FaCalendarAlt, FaCalendarTimes, FaShoppingCart,
  FaRedo, FaBoxOpen, FaFolderOpen, FaUsers, FaPlusCircle, FaTimes, FaFileAlt, FaInfoCircle, FaClipboardCheck
} from 'react-icons/fa';
import { FaLocationDot } from "react-icons/fa6";
import { motion, AnimatePresence } from 'framer-motion';

// --- Color Palette based on #008080 (Teal) ---
const COLORS = {
  primary: '#008080',      // Base Teal
  primaryLight: '#339999',  // Lighter Teal
  primaryDark: '#006666',  // Darker Teal
  primaryBg: '#e0f2f2',    // Very light teal for backgrounds
  textPrimary: '#004d4d',  // Dark teal for text
  textLight: '#f0fafa',    // Off-white for text on dark backgrounds
  border: '#66b2b2',       // Medium teal for borders
  redDanger: '#dc2626',    // Standard red for delete/danger
  redDangerHover: '#b91c1c', // Darker red for hover
};

// --- Reusable Components (from previous forms) ---

function Input({ label, name, value, onChange, type = 'text', icon, className = '', placeholder = '' }) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium" style={{ color: COLORS.textPrimary }}>{label}</label>
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-opacity-75 ${icon ? 'pl-10' : ''}`}
          style={{ borderColor: COLORS.border, outlineColor: COLORS.primary, '--tw-ring-color': COLORS.primary }}
        />
      </div>
    </div>
  );
}

function TextArea({ label, name, value, onChange, className = '', placeholder = '' }) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium" style={{ color: COLORS.textPrimary }}>{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={3}
        placeholder={placeholder}
        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-opacity-75"
        style={{ borderColor: COLORS.border, outlineColor: COLORS.primary, '--tw-ring-color': COLORS.primary }}
      ></textarea>
    </div>
  );
}

// --- Main Component ---

export default function DiscountCouponForm() {
  // Define all possible fields for the coupon form
  const initialFields = useMemo(() => [
    // Coupon Details Section Fields
    { id: 'couponCode', section: 'couponDetails', label: 'Coupon Code', name: 'couponCode', type: 'text', value: '', icon: <FaTag style={{ color: COLORS.primary }} />, isRemovable: false },
    { id: 'discountType', section: 'couponDetails', label: 'Discount Type', name: 'discountType', type: 'select', options: ['Select type', 'Percentage', 'Fixed Amount', 'Free Shipping', 'Buy X Get Y'], value: '', icon: <FaPercent style={{ color: COLORS.primary }} />, isRemovable: true },
    { id: 'discountValue', section: 'couponDetails', label: 'Discount Value', name: 'discountValue', type: 'number', value: '', placeholder: 'e.g., 10 (for 10% or $10)', icon: <FaDollarSign style={{ color: COLORS.primary }} />, isRemovable: true },
    { id: 'couponDescription', section: 'couponDetails', label: 'Description', name: 'couponDescription', type: 'textarea', value: '', placeholder: 'Short description of the coupon', isRemovable: true },

    // Validity & Usage Section Fields
    { id: 'startDate', section: 'validityUsage', label: 'Start Date', name: 'startDate', type: 'date', value: '', icon: <FaCalendarAlt style={{ color: COLORS.primary }} />, isRemovable: true },
    { id: 'endDate', section: 'validityUsage', label: 'End Date', name: 'endDate', type: 'date', value: '', icon: <FaCalendarTimes style={{ color: COLORS.primary }} />, isRemovable: true },
    { id: 'minimumPurchase', section: 'validityUsage', label: 'Minimum Purchase Amount', name: 'minimumPurchase', type: 'number', value: '', placeholder: 'e.g., 50.00', icon: <FaShoppingCart style={{ color: COLORS.primary }} />, isRemovable: true },
    { id: 'usageLimit', section: 'validityUsage', label: 'Usage Limit per Customer', name: 'usageLimit', type: 'number', value: '', placeholder: 'e.g., 1 (for one time use)', icon: <FaRedo style={{ color: COLORS.primary }} />, isRemovable: true },

    // Template fields for dynamic additions (Targeting)
    { id: 'applicableProducts_template', section: 'additional', label: 'Applicable Products (SKUs)', name: 'applicableProducts', type: 'textarea', value: '', placeholder: 'Comma-separated SKUs (e.g., PROD001, PROD002)', icon: <FaBoxOpen style={{ color: COLORS.primary }} />, isRemovable: true, isTemplate: true },
    { id: 'applicableCategories_template', section: 'additional', label: 'Applicable Categories', name: 'applicableCategories', type: 'textarea', value: '', placeholder: 'Comma-separated categories (e.g., Electronics, Apparel)', icon: <FaFolderOpen style={{ color: COLORS.primary }} />, isRemovable: true, isTemplate: true },
    { id: 'customerEligibility_template', section: 'additional', label: 'Customer Eligibility (Emails)', name: 'customerEligibility', type: 'textarea', value: '', placeholder: 'Comma-separated emails (e.g., user@example.com)', icon: <FaUsers style={{ color: COLORS.primary }} />, isRemovable: true, isTemplate: true },
    { id: 'isActive_template', section: 'additional', label: 'Is Active', name: 'isActive', type: 'checkbox', value: false, icon: <FaClipboardCheck style={{ color: COLORS.primary }} />, isRemovable: true, isTemplate: true },
  ], []);

  // State to hold the currently active form fields (dynamic array)
  const [fields, setFields] = useState(() => {
    // Initialize fields with non-template fields, each given a unique instance ID
    return initialFields
      .filter(field => !field.isTemplate)
      .map(field => ({ ...field, id: `${field.id}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}` }));
  });

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handler for changing values in inputs
  const handleFieldChange = (id, value) => {
    setFields(prevFields =>
      prevFields.map(field =>
        field.id === id ? { ...field, value: value } : field
      )
    );
  };

  // Handler for adding a new field from a template
  const addField = (templateId) => {
    const template = initialFields.find(f => f.id === templateId);
    if (template) {
      // Create a new unique ID for the added field instance and reset its value
      const newField = {
        ...template,
        id: `${template.name}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        value: template.type === 'checkbox' ? false : '', // Reset value appropriately
        isTemplate: false
      };
      setFields(prevFields => [...prevFields, newField]);
    }
  };

  // Handler for removing a field
  const removeField = (id) => {
    setFields(prevFields => prevFields.filter(field => field.id !== id));
  };

  // Handler for form submission (simulated)
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Consolidate all form data from the 'fields' state
    const formDataToSubmit = {};
    fields.forEach(field => {
      formDataToSubmit[field.name] = field.value;
    });

    console.log("Discount Coupon Form Data:", formDataToSubmit);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Discount Coupon saved successfully!');
    }, 2000);
  };

  // Framer Motion animation variants for sections and individual items
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  // Framer Motion variants for dynamic field entry/exit animations
  const dynamicFieldVariants = {
    initial: { opacity: 0, height: 0, marginTop: 0, marginBottom: 0 },
    animate: { opacity: 1, height: 'auto', marginTop: '0.75rem', marginBottom: '0.75rem' },
    exit: { opacity: 0, height: 0, marginTop: 0, marginBottom: 0, transition: { duration: 0.2 } },
  };

  // Memoized list of fields available for re-addition from the dropdown
  const availableFieldsForDropdown = useMemo(() => {
    // Get the names/IDs of fields currently present in the form to exclude them
    const currentFieldInstanceNames = new Set(fields.map(f => initialFields.find(template => template.name === f.name)?.id || f.id));

    return initialFields.filter(templateField => {
      const isCurrentlyPresent = currentFieldInstanceNames.has(templateField.id);
      // Show templates OR fields that were initially present and are removable but not currently in the form
      return !isCurrentlyPresent && (templateField.isTemplate || templateField.isRemovable);
    });
  }, [fields, initialFields]);


  return (
    // Main container with full height and background gradient
    <div className="min-h-screen py-8 px-4 flex items-center justify-center" style={{ background: `linear-gradient(to bottom right, ${COLORS.primaryDark}, ${COLORS.primary})` }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full mx-auto"
      >
        <div className="rounded-xl shadow-2xl overflow-hidden" style={{ backgroundColor: 'white' }}>
          {/* Header Section */}
          <div className="p-6 text-white" style={{ background: `linear-gradient(to right, ${COLORS.primaryDark}, ${COLORS.primary})` }}>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="flex items-center justify-center space-x-3"
            >
              <FaTag className="text-3xl" style={{ color: COLORS.textLight }} />
              <h1 className="text-2xl font-bold" style={{ color: COLORS.textLight }}>Discount Coupon Creator</h1>
            </motion.div>
            <p className="text-center mt-2" style={{ color: COLORS.primaryBg }}>Define your new discount coupon</p>
          </div>

          {/* Main Form */}
          <motion.form
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            onSubmit={handleSubmit}
            className="p-6 space-y-6"
          >
            {/* Coupon Details Section */}
            <motion.div variants={itemVariants} className="p-4 rounded-lg" style={{ backgroundColor: COLORS.primaryBg }}>
              <h2 className="text-xl font-semibold flex items-center space-x-2 mb-4" style={{ color: COLORS.textPrimary }}>
                <FaTag style={{ color: COLORS.primaryDark }} />
                <span>Coupon Details</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AnimatePresence>
                  {fields.filter(f => f.section === 'couponDetails').map(field => (
                    <motion.div
                      key={field.id}
                      variants={dynamicFieldVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="flex items-end gap-2"
                    >
                      {field.type === 'text' && (
                        <Input
                          label={field.label}
                          name={field.name}
                          value={field.value}
                          onChange={(e) => handleFieldChange(field.id, e.target.value)}
                          icon={field.icon}
                          className="flex-grow"
                        />
                      )}
                      {field.type === 'number' && (
                        <Input
                          label={field.label}
                          name={field.name}
                          type="number"
                          value={field.value}
                          onChange={(e) => handleFieldChange(field.id, e.target.value)}
                          placeholder={field.placeholder}
                          icon={field.icon}
                          className="flex-grow"
                        />
                      )}
                      {field.type === 'select' && (
                        <div className="flex-grow">
                          <label className="block text-sm font-medium" style={{ color: COLORS.textPrimary }}>{field.label}</label>
                          <div className="relative">
                            {field.icon && (
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                {field.icon}
                              </div>
                            )}
                            <select
                              name={field.name}
                              value={field.value}
                              onChange={(e) => handleFieldChange(field.id, e.target.value)}
                              className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-opacity-75 ${field.icon ? 'pl-10' : ''}`}
                              style={{ borderColor: COLORS.border, outlineColor: COLORS.primary, '--tw-ring-color': COLORS.primary }}
                            >
                              {field.options.map(option => (
                                <option key={option} value={option === field.options[0] ? '' : option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      )}
                      {field.type === 'textarea' && (
                        <TextArea
                          label={field.label}
                          name={field.name}
                          value={field.value}
                          onChange={(e) => handleFieldChange(field.id, e.target.value)}
                          placeholder={field.placeholder}
                          className="flex-grow"
                        />
                      )}
                      {field.isRemovable && (
                        <button
                          type="button"
                          onClick={() => removeField(field.id)}
                          className="flex items-center justify-center h-6 w-6 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500"
                          style={{ color: COLORS.redDanger }}
                          aria-label={`Remove ${field.label}`}
                        >
                          <FaTimes className="h-4 w-4" />
                        </button>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Validity & Usage Section */}
            <motion.div variants={itemVariants} className="p-4 rounded-lg" style={{ backgroundColor: COLORS.primaryBg }}>
              <h2 className="text-xl font-semibold flex items-center space-x-2 mb-4" style={{ color: COLORS.textPrimary }}>
                <FaCalendarAlt style={{ color: COLORS.primaryDark }} />
                <span>Validity & Usage</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AnimatePresence>
                  {fields.filter(f => f.section === 'validityUsage').map(field => (
                    <motion.div
                      key={field.id}
                      variants={dynamicFieldVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="flex items-end gap-2"
                    >
                      {field.type === 'date' && (
                        <Input
                          label={field.label}
                          name={field.name}
                          type="date"
                          value={field.value}
                          onChange={(e) => handleFieldChange(field.id, e.target.value)}
                          icon={field.icon}
                          className="flex-grow"
                        />
                      )}
                      {field.type === 'number' && (
                        <Input
                          label={field.label}
                          name={field.name}
                          type="number"
                          value={field.value}
                          onChange={(e) => handleFieldChange(field.id, e.target.value)}
                          placeholder={field.placeholder}
                          icon={field.icon}
                          className="flex-grow"
                        />
                      )}
                      {field.isRemovable && (
                        <button
                          type="button"
                          onClick={() => removeField(field.id)}
                          className="flex items-center justify-center h-6 w-6 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500"
                          style={{ color: COLORS.redDanger }}
                          aria-label={`Remove ${field.label}`}
                        >
                          <FaTimes className="h-4 w-4" />
                        </button>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Manage Form Fields Section (for Additional/Targeting fields) */}
            <motion.div variants={itemVariants} className="p-4 rounded-lg" style={{ backgroundColor: COLORS.primaryBg }}>
              <h2 className="text-xl font-semibold flex items-center space-x-2 mb-4" style={{ color: COLORS.textPrimary }}>
                <FaPlusCircle style={{ color: COLORS.primaryDark }} />
                <span>Manage Form Fields</span>
              </h2>

              <div className="flex items-end space-x-2 mb-4">
                <div className="flex-grow">
                  <label htmlFor="newFieldAddDropdown" className="block text-sm font-medium" style={{ color: COLORS.textPrimary }}>Add Removed/Additional Field</label>
                  <select
                    id="newFieldAddDropdown"
                    value="" // Controlled empty value to allow re-selection
                    onChange={(e) => addField(e.target.value)}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-opacity-75"
                    style={{ borderColor: COLORS.border, outlineColor: COLORS.primary, '--tw-ring-color': COLORS.primary }}
                  >
                    <option value="">Select Field to Add</option>
                    {/* Render fields that are templates or currently not displayed */}
                    {availableFieldsForDropdown.map((field) => (
                      <option key={field.id} value={field.id}>
                        {field.label} {field.section === 'additional' ? '(Additional)' : `(${field.section.charAt(0).toUpperCase() + field.section.slice(1)} Section)`}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Display dynamically added custom fields from the 'additional' section */}
              <AnimatePresence>
                {fields.filter(f => f.section === 'additional').map(field => (
                  <motion.div
                    key={field.id}
                    variants={dynamicFieldVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="flex items-end gap-2"
                  >
                    {field.type === 'text' && (
                      <Input
                        label={field.label}
                        name={field.name}
                        value={field.value}
                        onChange={(e) => handleFieldChange(field.id, e.target.value)}
                        icon={field.icon}
                        placeholder={field.placeholder}
                        className="flex-grow"
                      />
                    )}
                     {field.type === 'number' && (
                      <Input
                        label={field.label}
                        name={field.name}
                        type="number"
                        value={field.value}
                        onChange={(e) => handleFieldChange(field.id, e.target.value)}
                        icon={field.icon}
                        placeholder={field.placeholder}
                        className="flex-grow"
                      />
                    )}
                    {field.type === 'textarea' && (
                      <TextArea
                        label={field.label}
                        name={field.name}
                        value={field.value}
                        onChange={(e) => handleFieldChange(field.id, e.target.value)}
                        placeholder={field.placeholder}
                        className="flex-grow"
                      />
                    )}
                     {field.type === 'checkbox' && (
                      <div className="flex-grow flex items-center pt-2">
                        <input
                          type="checkbox"
                          id={field.id}
                          name={field.name}
                          checked={field.value}
                          onChange={(e) => handleFieldChange(field.id, e.target.checked)}
                          className="h-4 w-4 rounded"
                          style={{ borderColor: COLORS.border, accentColor: COLORS.primary }}
                        />
                        <label htmlFor={field.id} className="ml-2 block text-sm font-medium" style={{ color: COLORS.textPrimary }}>
                          {field.label}
                        </label>
                      </div>
                    )}
                    {/* Delete button for dynamically added fields */}
                    <button
                      type="button"
                      onClick={() => removeField(field.id)}
                      className="flex items-center justify-center h-6 w-6 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500"
                      style={{ color: COLORS.redDanger }}
                      aria-label={`Remove ${field.label}`}
                    >
                      <FaTimes className="h-4 w-4" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Submit Button */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="pt-4"
            >
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-4 rounded-lg text-white font-semibold flex items-center justify-center disabled:opacity-50`}
                style={{
                  backgroundColor: isSubmitting ? COLORS.primaryLight : COLORS.primaryDark,
                  color: COLORS.textLight,
                  transition: 'background-color 300ms',
                }}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5" style={{ color: COLORS.textLight }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  'Save Coupon'
                )}
              </button>
            </motion.div>
          </motion.form>
        </div>
      </motion.div>
    </div>
  );
}
