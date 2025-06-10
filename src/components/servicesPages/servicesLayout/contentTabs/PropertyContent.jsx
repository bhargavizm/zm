'use client';

import React, { useState, useMemo } from 'react';
import {
  FaHome, FaCalendarAlt, FaUser, FaEye, FaEyeSlash, FaUserTie, FaEnvelope, FaPhone,
  FaMapMarkerAlt, FaLock, FaUpload, FaLocationArrow, FaPlusCircle, FaTimes,
  FaRulerCombined, FaBed, FaWifi, FaVideo, FaSquare,FaBath
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

function FileInput({ label, name, multiple, onChange, icon, className = '', accept = 'image/*' }) {
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
          type="file"
          name={name}
          multiple={multiple}
          accept={accept}
          onChange={onChange}
          className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-opacity-75 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold`}
          style={{
            borderColor: COLORS.border,
            outlineColor: COLORS.primary,
            '--tw-ring-color': COLORS.primary,
            '--tw-file-bg': COLORS.primaryBg,
            '--tw-file-text': COLORS.primaryDark,
          }}
        />
      </div>
    </div>
  );
}

// --- Main Component ---

export default function PropertyForm() {
  // Define all possible fields for the property form
  const initialFields = useMemo(() => {
    const propertyTypes = [
      'Select property type', 'Residential', 'Commercial', 'Industrial', 'Land', 'Special Purpose', 'Agricultural'
    ];

    return [
      // Property Information Section
      { id: 'propertyTitle', section: 'propertyInfo', label: 'Property Name / Title', name: 'propertyTitle', type: 'text', value: '', icon: <FaHome style={{ color: COLORS.primary }} />, isRemovable: false },
      { id: 'propertyType', section: 'propertyInfo', label: 'Type of Property', name: 'propertyType', type: 'select', options: propertyTypes, value: '', icon: <FaHome style={{ color: COLORS.primary }} />, isRemovable: true },
      { id: 'date', section: 'propertyInfo', label: 'Listing Date', name: 'date', type: 'date', value: '', icon: <FaCalendarAlt style={{ color: COLORS.primary }} />, isRemovable: true },
      { id: 'propertyImages', section: 'propertyInfo', label: 'Property Images (Max 10)', name: 'propertyImages', type: 'file', multiple: true, icon: <FaUpload style={{ color: COLORS.primary }} />, isRemovable: true, fileType: 'propertyImages' },
      { id: 'description', section: 'propertyInfo', label: 'Description of Property', name: 'description', type: 'textarea', value: '', placeholder: 'Detailed description of the property', isRemovable: true },

      // Contact Information Section
      { id: 'agentName', section: 'contactInfo', label: 'Agent Name', name: 'agentName', type: 'text', value: '', icon: <FaUserTie style={{ color: COLORS.primary }} />, isRemovable: false },
      { id: 'ownerName', section: 'contactInfo', label: 'Owner Name', name: 'ownerName', type: 'text', value: '', icon: <FaUser style={{ color: COLORS.primary }} />, isRemovable: true },
      { id: 'email', section: 'contactInfo', label: 'Email Id', name: 'email', type: 'email', value: '', icon: <FaEnvelope style={{ color: COLORS.primary }} />, isRemovable: true },
      { id: 'contact', section: 'contactInfo', label: 'Contact Number', name: 'contact', type: 'tel', value: '', icon: <FaPhone style={{ color: COLORS.primary }} />, isRemovable: false, placeholder: 'e.g., 1234567890' },
      { id: 'altContact', section: 'contactInfo', label: 'Alternate Contact Number', name: 'altContact', type: 'tel', value: '', icon: <FaPhone style={{ color: COLORS.primary }} />, isRemovable: true, placeholder: 'Optional' },

      // Address Information Section
      { id: 'agentAddress', section: 'addressInfo', label: 'Agent Address', name: 'agentAddress', type: 'textarea', value: '', placeholder: 'Address of the agent', isRemovable: true },
      { id: 'propertyAddress', section: 'addressInfo', label: 'Property Address', name: 'propertyAddress', type: 'textarea', value: '', placeholder: 'Full address of the property', isRemovable: true },
      { id: 'mapLink', section: 'addressInfo', label: 'Property Map Link', name: 'mapLink', type: 'text', value: '', icon: <FaMapMarkerAlt style={{ color: COLORS.primary }} />, isRemovable: true, special: 'location' },

      // Security Section
      { id: 'password', section: 'security', label: 'Password', name: 'password', type: 'password', value: '', icon: <FaLock style={{ color: COLORS.primary }} />, isRemovable: true },

      // Template fields for dynamic additions
      { id: 'squareFootage_template', section: 'additional', label: 'Square Footage', name: 'squareFootage', type: 'number', value: '', placeholder: 'e.g., 1500 sq ft', icon: <FaSquare style={{ color: COLORS.primary }} />, isRemovable: true, isTemplate: true },
      { id: 'numBedrooms_template', section: 'additional', label: 'Number of Bedrooms', name: 'numBedrooms', type: 'number', value: '', placeholder: 'e.g., 3', icon: <FaBed style={{ color: COLORS.primary }} />, isRemovable: true, isTemplate: true },
      { id: 'numBathrooms_template', section: 'additional', label: 'Number of Bathrooms', name: 'numBathrooms', type: 'number', value: '', placeholder: 'e.g., 2', icon: <FaBath style={{ color: COLORS.primary }} />, isRemovable: true, isTemplate: true },
      { id: 'amenities_template', section: 'additional', label: 'Amenities', name: 'amenities', type: 'textarea', value: '', placeholder: 'e.g., Pool, Gym, Parking', icon: <FaWifi style={{ color: COLORS.primary }} />, isRemovable: true, isTemplate: true },
      { id: 'virtualTourLink_template', section: 'additional', label: 'Virtual Tour Link', name: 'virtualTourLink', type: 'url', value: '', placeholder: 'Link to virtual tour (e.g., YouTube)', icon: <FaVideo style={{ color: COLORS.primary }} />, isRemovable: true, isTemplate: true },
    ];
  }, []);

  // State to hold the currently active form fields (dynamic array)
  const [fields, setFields] = useState(() => {
    return initialFields
      .filter(field => !field.isTemplate)
      .map(field => ({ ...field, id: `${field.id}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}` }));
  });

  // State to hold actual file objects for upload, keyed by the field's ID
  const [files, setFiles] = useState({});

  // Form submission and location fetching states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [locationStatus, setLocationStatus] = useState({ mapLink: 'idle' }); // Tracks status for property map

  // Handler for changing values in various input types
  const handleFieldChange = (id, value) => {
    setFields(prevFields =>
      prevFields.map(field =>
        field.id === id ? { ...field, value: value } : field
      )
    );
  };

  // Handler for file input changes
  const handleFileChange = (id, e, multiple) => {
    const selectedFiles = multiple ? Array.from(e.target.files).slice(0, 10) : e.target.files[0]; // Limit to 10 files
    setFiles(prevFiles => ({ ...prevFiles, [id]: selectedFiles }));

    // For image previews, update the value in the fields state as an array of URLs
    if (multiple && selectedFiles.length > 0) {
      const urls = selectedFiles.map(file => URL.createObjectURL(file));
      handleFieldChange(id, urls);
    } else if (selectedFiles) {
      handleFieldChange(id, URL.createObjectURL(selectedFiles));
    } else {
      handleFieldChange(id, null);
    }
  };

  // Handler for adding a new field from a template
  const addField = (templateId) => {
    const template = initialFields.find(f => f.id === templateId);
    if (template) {
      const newField = {
        ...template,
        id: `${template.name}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        value: template.type === 'checkbox' ? false : (template.type === 'file' && template.multiple ? [] : ''), // Reset value appropriately
        isTemplate: false
      };
      setFields(prevFields => [...prevFields, newField]);
    }
  };

  // Handler for removing a field
  const removeField = (id) => {
    setFields(prevFields => prevFields.filter(field => field.id !== id));
    // Also remove any associated file data
    setFiles(prevFiles => {
      const newFiles = { ...prevFiles };
      delete newFiles[id];
      return newFiles;
    });
  };

  // Handler for fetching current geolocation for map fields
  const getCurrentLocation = (fieldId) => {
    if (!navigator.geolocation) {
      setLocationStatus(prev => ({ ...prev, [fieldId]: 'error' }));
      alert('Geolocation is not supported by your browser.');
      return;
    }

    setLocationStatus(prev => ({ ...prev, [fieldId]: 'fetching' }));

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
          .then(response => response.json())
          .then(data => {
            const address = data.display_name || `Lat: ${latitude}, Lon: ${longitude}`;
            handleFieldChange(fieldId, address);
            setLocationStatus(prev => ({ ...prev, [fieldId]: 'success' }));
          })
          .catch(() => {
            handleFieldChange(fieldId, `Lat: ${latitude}, Lon: ${longitude}`);
            setLocationStatus(prev => ({ ...prev, [fieldId]: 'success' })); // Still success, but with raw coords
          });
      },
      (error) => {
        console.error(`Error getting location for ${fieldId}:`, error);
        setLocationStatus(prev => ({ ...prev, [fieldId]: 'error' }));
        alert('Unable to retrieve your location. Please enter it manually.');
      }
    );
  };

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formDataToSubmit = {};
    fields.forEach(field => {
      formDataToSubmit[field.name] = field.value;
    });

    // For file fields, we'll log the file name or URL. In a real app, you'd upload these.
    Object.keys(files).forEach(fileId => {
      const fileData = files[fileId];
      if (Array.isArray(fileData)) {
        formDataToSubmit[fileId] = fileData.map(f => f.name).join(', ');
      } else if (fileData) {
        formDataToSubmit[fileId] = fileData.name;
      }
    });

    console.log("Property Form Data:", formDataToSubmit);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Property Information saved successfully!');
    }, 2000);
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

  // Memoized list of fields available for re-addition from the dropdown
  const availableFieldsForDropdown = useMemo(() => {
    const currentFieldNames = new Set(fields.map(f => initialFields.find(template => template.name === f.name)?.id || f.id));

    return initialFields.filter(templateField => {
      const isCurrentlyPresent = currentFieldNames.has(templateField.id);
      return !isCurrentlyPresent && (templateField.isTemplate || templateField.isRemovable);
    });
  }, [fields, initialFields]);


  return (
    <div className="min-h-screen py-8 px-4 flex items-center justify-center" style={{ background: `linear-gradient(to bottom right, ${COLORS.primaryDark}, ${COLORS.primary})` }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl w-full mx-auto"
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
              <FaHome className="text-3xl" style={{ color: COLORS.textLight }} />
              <h1 className="text-2xl font-bold" style={{ color: COLORS.textLight }}>Property QR Code Generator</h1>
            </motion.div>
            <p className="text-center mt-2" style={{ color: COLORS.primaryBg }}>Create QR codes for property listings</p>
          </div>

          {/* Main Form */}
          <motion.form
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            onSubmit={handleSubmit}
            className="p-6 space-y-6"
          >
            {/* Property Information Section */}
            <motion.div variants={itemVariants} className="p-4 rounded-lg" style={{ backgroundColor: COLORS.primaryBg }}>
              <h2 className="text-xl font-semibold flex items-center space-x-2 mb-4" style={{ color: COLORS.textPrimary }}>
                <FaHome style={{ color: COLORS.primaryDark }} />
                <span>Property Information</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AnimatePresence>
                  {fields.filter(f => f.section === 'propertyInfo').map(field => (
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
                      {field.type === 'file' && (
                        <FileInput
                          label={field.label}
                          name={field.name}
                          multiple={field.multiple}
                          onChange={(e) => handleFileChange(field.id, e, field.multiple)}
                          icon={field.icon}
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

            {/* Contact Information Section */}
            <motion.div variants={itemVariants} className="p-4 rounded-lg" style={{ backgroundColor: COLORS.primaryBg }}>
              <h2 className="text-xl font-semibold flex items-center space-x-2 mb-4" style={{ color: COLORS.textPrimary }}>
                <FaUser style={{ color: COLORS.primaryDark }} />
                <span>Contact Information</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AnimatePresence>
                  {fields.filter(f => f.section === 'contactInfo').map(field => (
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
                      {field.type === 'email' && (
                        <Input
                          label={field.label}
                          name={field.name}
                          type="email"
                          value={field.value}
                          onChange={(e) => handleFieldChange(field.id, e.target.value)}
                          icon={field.icon}
                          placeholder={field.placeholder}
                          className="flex-grow"
                        />
                      )}
                      {field.type === 'tel' && (
                        <Input
                          label={field.label}
                          name={field.name}
                          type="tel"
                          value={field.value}
                          onChange={(e) => handleFieldChange(field.id, e.target.value)}
                          icon={field.icon}
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

            {/* Address Information Section */}
            <motion.div variants={itemVariants} className="p-4 rounded-lg" style={{ backgroundColor: COLORS.primaryBg }}>
              <h2 className="text-xl font-semibold flex items-center space-x-2 mb-4" style={{ color: COLORS.textPrimary }}>
                <FaMapMarkerAlt style={{ color: COLORS.primaryDark }} />
                <span>Address Information</span>
              </h2>

              <div className="space-y-4">
                <AnimatePresence>
                  {fields.filter(f => f.section === 'addressInfo').map(field => (
                    <motion.div
                      key={field.id}
                      variants={dynamicFieldVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="flex items-end gap-2"
                    >
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
                      {field.special === 'location' && (
                        <div className="flex-grow">
                          <label className="block text-sm font-medium" style={{ color: COLORS.textPrimary }}>{field.label}</label>
                          <div className="flex">
                            <input
                              type="text"
                              name={field.name}
                              value={field.value}
                              onChange={(e) => handleFieldChange(field.id, e.target.value)}
                              placeholder="Enter location or click to detect"
                              className="flex-1 p-2 border rounded-l-lg focus:ring-2 focus:ring-opacity-75"
                              style={{ borderColor: COLORS.border, outlineColor: COLORS.primary, '--tw-ring-color': COLORS.primary }}
                            />
                            <button
                              type="button"
                              onClick={() => getCurrentLocation(field.id)}
                              disabled={locationStatus[field.id] === 'fetching'}
                              className="px-4 rounded-r-lg flex items-center justify-center disabled:opacity-50"
                              style={{ backgroundColor: COLORS.primaryDark, color: COLORS.textLight, hover: { backgroundColor: COLORS.primary } }}
                            >
                              {locationStatus[field.id] === 'fetching' ? (
                                <svg className="animate-spin h-5 w-5" style={{ color: COLORS.textLight }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                              ) : (
                                < FaLocationDot  className="text-lg" />
                              )}
                            </button>
                          </div>
                          {locationStatus[field.id] === 'success' && (
                            <p className="mt-1 text-sm" style={{ color: COLORS.primaryDark }}>Location added successfully!</p>
                          )}
                          {locationStatus[field.id] === 'error' && (
                            <p className="mt-1 text-sm" style={{ color: COLORS.redDanger }}>Could not get location. Please enter manually.</p>
                          )}
                        </div>
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
            </motion.div>

            {/* Manage Form Fields Section */}
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
                    value=""
                    onChange={(e) => addField(e.target.value)}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-opacity-75"
                    style={{ borderColor: COLORS.border, outlineColor: COLORS.primary, '--tw-ring-color': COLORS.primary }}
                  >
                    <option value="">Select Field to Add</option>
                    {availableFieldsForDropdown.map((field) => (
                      <option key={field.id} value={field.id}>
                        {field.label} {field.section === 'additional' ? '(Additional)' : `(${field.section.charAt(0).toUpperCase() + field.section.slice(1)} Section)`}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Display dynamically added custom fields */}
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
                    {field.type === 'text' || field.type === 'url' || field.type === 'number' || field.type === 'tel' || field.type === 'email' ? (
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
                    ) : field.type === 'textarea' ? (
                      <TextArea
                        label={field.label}
                        name={field.name}
                        value={field.value}
                        onChange={(e) => handleFieldChange(field.id, e.target.value)}
                        placeholder={field.placeholder}
                        className="flex-grow"
                      />
                    ) : field.type === 'file' ? (
                      <FileInput
                        label={field.label}
                        name={field.name}
                        multiple={field.multiple}
                        onChange={(e) => handleFileChange(field.id, e, field.multiple)}
                        icon={field.icon}
                        className="flex-grow"
                      />
                    ) : null}
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
                    Generating QR...
                  </>
                ) : (
                  'Generate Property QR Code'
                )}
              </button>
            </motion.div>
          </motion.form>
        </div>

        {/* Preview Section - Adjusted to display data from the dynamic fields */}
        <div className="w-full lg:w-1/3 mt-10 lg:mt-0 border-2 rounded-2xl p-4 shadow-lg max-w-xs mx-auto relative overflow-hidden"
             style={{ height: '700px', borderRadius: '40px', borderColor: COLORS.border, backgroundColor: COLORS.primaryBg }}>
          <div className="absolute top-1 w-full text-center">
            <div className="w-20 h-2 rounded-full mx-auto my-3" style={{ backgroundColor: COLORS.border }} />
          </div>

          <div className="mt-6 space-y-2 overflow-y-auto h-[630px] p-2" style={{ color: COLORS.textPrimary }}>
            <h2 className="text-xl font-bold text-center underline" style={{ color: COLORS.textPrimary }}>Preview</h2>

            {fields.find(f => f.name === 'propertyImages')?.value && fields.find(f => f.name === 'propertyImages')?.value.length > 0 && (
              <div className="text-center mt-4">
                <p><strong>Property Images:</strong></p>
                <div className="flex flex-wrap justify-center gap-2 mt-2">
                  {fields.find(f => f.name === 'propertyImages')?.value.map((src, index) => (
                    <img key={index} src={src} alt={`Property Image ${index + 1}`} className="h-16 w-16 object-cover rounded-md" />
                  ))}
                </div>
              </div>
            )}
            {fields.filter(f => f.name !== 'propertyImages' && f.name !== 'password').map(field => (
              field.value && (field.value !== '' || field.value !== null) && (
                <p key={field.id}>
                  <strong>{field.label}:</strong> {field.value}
                </p>
              )
            ))}
            {fields.find(f => f.name === 'password')?.value && <p><strong>Password:</strong> {fields.find(f => f.name === 'password')?.value}</p>}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
