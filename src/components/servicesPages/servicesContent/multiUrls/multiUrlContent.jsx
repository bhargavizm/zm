'use client';

import React, { useState, useMemo } from 'react';
import {
  FaLink, FaGlobe, FaPlusCircle, FaTimes, FaLock, FaEye, FaEyeSlash,
  FaInstagram, FaFacebook, FaYoutube, FaTwitter // Specific icons for social media
} from 'react-icons/fa';
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

// --- Reusable Components ---

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

function PasswordInput({ label, name, value, onChange, icon, className = '' }) {
  const [showPassword, setShowPassword] = useState(false);

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
          type={showPassword ? 'text' : 'password'}
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-opacity-75 ${icon ? 'pl-10' : ''}`}
          style={{ borderColor: COLORS.border, outlineColor: COLORS.primary, '--tw-ring-color': COLORS.primary }}
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
          style={{ color: COLORS.primaryDark }}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
    </div>
  );
}

// --- Main Component ---

const MultiUrlContent =  () => {
  // Define all possible URL templates
  const initialUrlTemplates = useMemo(() => [
    { id: 'instagram_template', label: 'Instagram URL', name: 'instagramUrl', type: 'url', icon: <FaInstagram style={{ color: COLORS.primary }} />, isRemovable: true, placeholder: 'https://instagram.com/yourprofile' },
    { id: 'facebook_template', label: 'Facebook URL', name: 'facebookUrl', type: 'url', icon: <FaFacebook style={{ color: COLORS.primary }} />, isRemovable: true, placeholder: 'https://facebook.com/yourpage' },
    { id: 'youtube_template', label: 'YouTube URL', name: 'youtubeUrl', type: 'url', icon: <FaYoutube style={{ color: COLORS.primary }} />, isRemovable: true, placeholder: 'https://youtube.com/yourchannel' },
    { id: 'x_template', label: 'X (Twitter) URL', name: 'xUrl', type: 'url', icon: <FaTwitter style={{ color: COLORS.primary }} />, isRemovable: true, placeholder: 'https://x.com/yourhandle' },
    { id: 'manualLink_template', label: 'Custom Link', name: 'customLink', type: 'url', icon: <FaLink style={{ color: COLORS.primary }} />, isRemovable: true, placeholder: 'https://yourcustomlink.com' },
  ], []);

  // State for dynamic URL fields and the static password field
  const [fields, setFields] = useState(() => {
    // Start with just the password field and no URLs
    return [
      { id: 'password', section: 'security', label: 'Password', name: 'password', type: 'password', value: '', icon: <FaLock style={{ color: COLORS.primary }} />, isRemovable: false },
    ];
  });

  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handler for changing values in inputs
  const handleFieldChange = (id, value) => {
    setFields(prevFields =>
      prevFields.map(field =>
        field.id === id ? { ...field, value: value } : field
      )
    );
  };

  // Handler for adding a new URL field based on selected type
  // This function is now called directly from the dropdown's onChange
  const addUrlField = (event) => {
    const selectedTemplateId = event.target.value;
    if (!selectedTemplateId) return; // Do nothing if no type is selected

    const template = initialUrlTemplates.find(t => t.id === selectedTemplateId);
    if (template) {
      let newField;
      if (template.id === 'manualLink_template') {
        // For custom links, allow multiple instances with unique names
        const customLinkCount = fields.filter(f => f.name.startsWith('customLink_')).length;
        newField = {
          ...template,
          id: `customLink_${customLinkCount + 1}_${Date.now()}`,
          name: `customLink_${customLinkCount + 1}`, // Unique name for each custom link
          isTemplate: false,
        };
      } else {
        // For social media, only one instance per type (to avoid duplicates of same social type)
        // Check if an instance of this social media type already exists
        const isSocialTypeAlreadyPresent = fields.some(f => f.name === template.name);
        if (isSocialTypeAlreadyPresent) {
          // You might want to provide user feedback here, e.g., a toast message
          alert(`${template.label} is already added.`);
          event.target.value = ''; // Reset dropdown
          return;
        }
        newField = {
          ...template,
          id: `${template.name}_${Date.now()}`, // Ensure unique ID for React's key
          isTemplate: false,
        };
      }
      setFields(prevFields => [...prevFields, newField]);
      event.target.value = ''; // Reset dropdown after adding
    }
  };

  // Handler for removing a field
  const removeField = (id) => {
    setFields(prevFields => prevFields.filter(field => field.id !== id));
  };

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formDataToSubmit = {};
    const urls = [];

    // Collect all URL fields (social media and custom links)
    fields.forEach(field => {
      if (field.type === 'url' && field.value) {
        urls.push({ label: field.label, url: field.value });
      } else if (field.name === 'password') {
        formDataToSubmit.password = field.value;
      }
    });
    formDataToSubmit.urls = urls; // Store all URLs in an array of objects

    console.log("Multi-URL Form Data:", formDataToSubmit);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Multi-URL information saved successfully!');
    }, 1500);
  };

  // Framer Motion animation variants
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

  const dynamicFieldVariants = {
    initial: { opacity: 0, height: 0, marginTop: 0, marginBottom: 0 },
    animate: { opacity: 1, height: 'auto', marginTop: '0.75rem', marginBottom: '0.75rem' },
    exit: { opacity: 0, height: 0, marginTop: 0, marginBottom: 0, transition: { duration: 0.2 } },
  };

  // Memoized list of URL types available to add from the dropdown
  const availableUrlTypesForDropdown = useMemo(() => {
    const currentUrlNames = new Set(fields.filter(f => f.type === 'url').map(f => f.name));

    return initialUrlTemplates.filter(template => {
      // Always allow adding 'manualLink_template'
      if (template.id === 'manualLink_template') return true;
      // For social media, only show if not already present
      return !currentUrlNames.has(template.name);
    });
  }, [fields, initialUrlTemplates]);

  return (
    <div className=" py-6 flex items-center justify-center" >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl w-full mx-auto"
      >
        <div className="rounded-xl shadow-xl overflow-hidden" style={{ backgroundColor: 'white' }}>
          {/* Header Section */}
          {/* <div className="p-6 text-white" >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="flex items-center justify-center space-x-3"
            >
              <FaGlobe className="text-3xl" style={{ color: COLORS.textLight }} />
              <h1 className="text-2xl font-bold" style={{ color: COLORS.textLight }}>Multi-URL QR Code Generator</h1>
            </motion.div>
            <p className="text-center mt-2" style={{ color: COLORS.primaryBg }}>Generate QR codes for multiple web links.</p>
          </div> */}

          {/* Main Form */}
          <motion.form
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            onSubmit={handleSubmit}
            className="p-6 space-y-6"
          >
            {/* Dynamic URLs Section */}
            <motion.div variants={itemVariants} className="p-4 rounded-lg" style={{ backgroundColor: COLORS.primaryBg }}>
              <h2 className="text-xl font-semibold flex items-center space-x-2 mb-4" style={{ color: COLORS.textPrimary }}>
                <FaLink style={{ color: COLORS.primaryDark }} />
                <span>Your URLs</span>
              </h2>

              <div className="space-y-4">
                <AnimatePresence>
                  {fields.filter(f => f.type === 'url').map(field => (
                    <motion.div
                      key={field.id}
                      variants={dynamicFieldVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="flex items-end gap-2"
                    >
                      <Input
                        label={field.label}
                        name={field.name}
                        type={field.type}
                        value={field.value}
                        onChange={(e) => handleFieldChange(field.id, e.target.value)}
                        icon={field.icon}
                        placeholder={field.placeholder}
                        className="flex-grow"
                      />
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
              </div>

              {/* Dropdown for adding new URL types */}
              <div className="flex items-end space-x-2 mt-4">
                <div className="flex-grow">
                  <label htmlFor="addUrlType" className="block text-sm font-medium" style={{ color: COLORS.textPrimary }}>Add New URL Type</label>
                  <select
                    id="addUrlType"
                    value="" // Value always empty to allow re-selection
                    onChange={addUrlField} // Call addUrlField directly
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-opacity-75"
                    style={{ borderColor: COLORS.border, outlineColor: COLORS.primary, '--tw-ring-color': COLORS.primary }}
                  >
                    <option value="">Select URL Type to Add</option>
                    {availableUrlTypesForDropdown.map((template) => (
                      <option key={template.id} value={template.id}>
                        {template.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>


            {/* Security Section */}
            <motion.div variants={itemVariants} className="p-4 rounded-lg" style={{ backgroundColor: COLORS.primaryBg }}>
              <h2 className="text-xl font-semibold flex items-center space-x-2 mb-4" style={{ color: COLORS.textPrimary }}>
                <FaLock style={{ color: COLORS.primaryDark }} />
                <span>Security</span>
              </h2>

              <AnimatePresence>
                {fields.filter(f => f.section === 'security').map(field => (
                  <motion.div
                    key={field.id}
                    variants={dynamicFieldVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="flex items-end gap-2"
                  >
                    {field.type === 'password' && (
                      <PasswordInput
                        label={field.label}
                        name={field.name}
                        value={field.value}
                        onChange={(e) => handleFieldChange(field.id, e.target.value)}
                        icon={field.icon}
                        className="flex-grow"
                      />
                    )}
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
                    Generating QR...
                  </>
                ) : (
                  'Generate Multi-URL QR Code'
                )}
              </button>
            </motion.div>
          </motion.form>
        </div>

        
      </motion.div>
    </div>
  );
}

export default MultiUrlContent;
