'use client';

import React, { useState, useMemo } from 'react';
import {
  FaCar, FaIdCard, FaFileAlt, FaUser, FaPhone, FaMapMarkerAlt,
  FaLock, FaCalendarAlt, FaUpload, FaLocationArrow, FaEye, FaEyeSlash,
  FaPlusCircle, FaTimes, FaVideo, FaLink, FaRegFilePdf, FaMotorcycle,
  FaTruck, FaCarSide, FaQuestionCircle,
  FaImage
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

// Base Input Component
function Input({ label, name, value, onChange, type = 'text', icon, className = '', placeholder = '' }) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium" style={{ color: COLORS.textPrimary }}>{label}</label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon}
        </div>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="pl-10 w-full p-2 border rounded-lg focus:ring-2 focus:ring-opacity-75"
          style={{ borderColor: COLORS.border, outlineColor: COLORS.primary, '--tw-ring-color': COLORS.primary }}
        />
      </div>
    </div>
  );
}

// Password Input Component with show/hide toggle
function PasswordInput({ label, name, value, onChange, icon, className = '' }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={className}>
      <label className="block text-sm font-medium" style={{ color: COLORS.textPrimary }}>{label}</label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon}
        </div>
        <input
          type={showPassword ? 'text' : 'password'}
          name={name}
          value={value}
          onChange={onChange}
          className="pl-10 pr-10 w-full p-2 border rounded-lg focus:ring-2 focus:ring-opacity-75"
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

// Text Area Component
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

// File Input Component
function FileInput({ label, name, multiple, onChange, icon, className = '' }) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium" style={{ color: COLORS.textPrimary }}>{label}</label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon}
        </div>
        <input
          type="file"
          name={name}
          multiple={multiple}
          onChange={onChange}
          className="pl-10 w-full p-2 border rounded-lg focus:ring-2 focus:ring-opacity-75 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold"
          style={{
            borderColor: COLORS.border,
            outlineColor: COLORS.primary,
            '--tw-ring-color': COLORS.primary,
            '--tw-file-bg': COLORS.primaryBg, // Custom properties for Tailwind's file input styling
            '--tw-file-text': COLORS.primaryDark,
          }}
        />
      </div>
    </div>
  );
}

// --- Main Component ---

export default function VehicleContent() {
  // State for vehicle type dropdown and custom entry
  const [vehicleTypeOption, setVehicleTypeOption] = useState('select');
  const [customVehicleType, setCustomVehicleType] = useState('');

  // Define all possible fields, including templates for dynamic additions
  // useMemo ensures this array is not re-created on every render unless dependencies change
  const initialFields = useMemo(() => [
    // Vehicle Information Section Fields
    { id: 'vehicleModel', section: 'vehicle', label: 'Vehicle Brand Name', name: 'vehicleModel', type: 'text', value: '', icon: <FaCar style={{ color: COLORS.primary }} />, isRemovable: false }, // Not removable
    { id: 'buyingDate', section: 'vehicle', label: 'Date of Buying', name: 'buyingDate', type: 'date', value: '', icon: <FaCalendarAlt style={{ color: COLORS.primary }} />, isRemovable: true },
    { id: 'vehicleImages', section: 'vehicle', label: 'Vehicle Images (Max 4)', name: 'vehicleImages', type: 'file', multiple: true, icon: <FaUpload style={{ color: COLORS.primary }} />, isRemovable: true, fileType: 'vehicleImages' },
    { id: 'vehicleDesc', section: 'vehicle', label: 'Description of Vehicle', name: 'vehicleDesc', type: 'textarea', value: '', isRemovable: true },

    // Registration Details Section Fields
    { id: 'rcNumber', section: 'registration', label: 'RC Number', name: 'rcNumber', type: 'text', value: '', icon: <FaIdCard style={{ color: COLORS.primary }} />, isRemovable: true },
    { id: 'rcImages', section: 'registration', label: 'RC Images (Max 2)', name: 'rcImages', type: 'file', multiple: true, icon: <FaUpload style={{ color: COLORS.primary }} />, isRemovable: true, fileType: 'rcImages' },
    { id: 'licenseImages', section: 'registration', label: 'Driving License (Max 3)', name: 'licenseImages', type: 'file', multiple: true, icon: <FaUpload style={{ color: COLORS.primary }} />, isRemovable: true, fileType: 'licenseImages' },
    { id: 'insuranceImages', section: 'registration', label: 'Insurance (Max 6)', name: 'insuranceImages', type: 'file', multiple: true, icon: <FaUpload style={{ color: COLORS.primary }} />, isRemovable: true, fileType: 'insuranceImages' },
    { id: 'pollutionImages', section: 'registration', label: 'Pollution Cert (Max 3)', name: 'pollutionImages', type: 'file', multiple: true, icon: <FaUpload style={{ color: COLORS.primary }} />, isRemovable: true, fileType: 'pollutionImages' },
    { id: 'permitImages', section: 'registration', label: 'Permit Cert (Max 2)', name: 'permitImages', type: 'file', multiple: true, icon: <FaUpload style={{ color: COLORS.primary }} />, isRemovable: true, fileType: 'permitImages' },

    // Owner/Driver Details Section Fields
    { id: 'driverName', section: 'ownerDriver', label: 'Driver Name', name: 'driverName', type: 'text', value: '', icon: <FaUser style={{ color: COLORS.primary }} />, isRemovable: true },
    { id: 'ownerName', section: 'ownerDriver', label: 'Owner Name', name: 'ownerName', type: 'text', value: '', icon: <FaUser style={{ color: COLORS.primary }} />, isRemovable: true },
    { id: 'ownerDriverImage', section: 'ownerDriver', label: 'Owner/Driver Image', name: 'ownerDriverImage', type: 'file', multiple: false, icon: <FaUpload style={{ color: COLORS.primary }} />, isRemovable: true, fileType: 'ownerDriverImage' },

    // Contact Information Section Fields
    { id: 'contactNumber', section: 'contact', label: 'Contact Number', name: 'contactNumber', type: 'text', value: '', icon: <FaPhone style={{ color: COLORS.primary }} />, isRemovable: true },
    { id: 'alternateContact', section: 'contact', label: 'Alternate Contact', name: 'alternateContact', type: 'text', value: '', icon: <FaPhone style={{ color: COLORS.primary }} />, isRemovable: true },

    // Location Details Section Fields
    { id: 'address', section: 'location', label: 'Owner/Driver Address', name: 'address', type: 'textarea', value: '', isRemovable: true },
    { id: 'mapLink', section: 'location', label: 'Location', name: 'mapLink', type: 'text', value: '', icon: <FaMapMarkerAlt style={{ color: COLORS.primary }} />, isRemovable: true, special: 'location' }, // Special handling for location button

    // Security Section Fields
    { id: 'password', section: 'security', label: 'Password', name: 'password', type: 'password', value: '', icon: <FaLock style={{ color: COLORS.primary }} />, isRemovable: true },

    // Template fields for dynamic additions (these are not initially in the form, but can be added)
    { id: 'videoUrl_template', section: 'additional', label: 'Video URL', type: 'text', name: 'videoUrl', icon: <FaVideo style={{ color: COLORS.primary }} />, isRemovable: true, isTemplate: true },
    { id: 'imageUrl_template', section: 'additional', label: 'image URL', type: 'text', name: 'imageUrl', icon: <FaImage style={{ color: COLORS.primary }} />, isRemovable: true, isTemplate: true },
    { id: 'pdfLink_template', section: 'additional', label: 'PDF Link', type: 'text', name: 'pdfLink', icon: <FaRegFilePdf style={{ color: COLORS.primary }} />, isRemovable: true, isTemplate: true },
    { id: 'websiteLink_template', section: 'additional', label: 'Website Link', type: 'text', name: 'websiteLink', icon: <FaLink style={{ color: COLORS.primary }} />, isRemovable: true, isTemplate: true },
    { id: 'additionalText_template', section: 'additional', label: 'Additional Text Field', type: 'text', name: 'additionalText', icon: <FaFileAlt style={{ color: COLORS.primary }} />, isRemovable: true, isTemplate: true },
    { id: 'additionalTextArea_template', section: 'additional', label: 'Additional Text Area', type: 'textarea', name: 'additionalTextArea', icon: <FaFileAlt style={{ color: COLORS.primary }} />, isRemovable: true, isTemplate: true },
  ], []);

  // State to hold the currently active form fields (dynamic array)
  const [fields, setFields] = useState(() => {
    // Initialize fields with non-template fields, each given a unique instance ID
    return initialFields
      .filter(field => !field.isTemplate)
      .map(field => ({ ...field, id: `${field.id}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}` }));
  });

  // State to hold actual file objects, keyed by the field's ID (or name for simplicity if no multiple instances)
  const [files, setFiles] = useState({});

  // Form submission and location fetching states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [locationStatus, setLocationStatus] = useState('idle'); // idle | fetching | success | error

  // Handler for changing values in text/date/password/textarea inputs
  const handleFieldChange = (id, value) => {
    setFields(prevFields =>
      prevFields.map(field =>
        field.id === id ? { ...field, value: value } : field
      )
    );
  };

  // Handler for file input changes
  const handleFileChange = (id, e, multiple) => {
    const fileList = multiple ? Array.from(e.target.files) : e.target.files[0];
    setFiles(prevFiles => ({ ...prevFiles, [id]: fileList }));
  };

  // Handler for adding a new field from a template
  const addField = (templateId) => {
    const template = initialFields.find(f => f.id === templateId);
    if (template) {
      // Create a new unique ID for the added field instance
      const newField = { ...template, id: `${template.name}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`, value: '', isTemplate: false };
      setFields(prevFields => [...prevFields, newField]);
    }
  };

  // Handler for removing a field
  const removeField = (id) => {
    setFields(prevFields => prevFields.filter(field => field.id !== id));
  };

  // Handler for fetching current geolocation
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus('error');
      alert('Geolocation is not supported by your browser.'); // Using alert as per previous pattern
      return;
    }

    setLocationStatus('fetching');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        // Use OpenStreetMap Nominatim for reverse geocoding
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
          .then(response => response.json())
          .then(data => {
            const address = data.display_name || `${latitude}, ${longitude}`;
            // Update the mapLink field's value
            handleFieldChange(fields.find(f => f.name === 'mapLink')?.id, address);
            setLocationStatus('success');
          })
          .catch(() => {
            // Fallback to lat/lon if reverse geocoding fails
            handleFieldChange(fields.find(f => f.name === 'mapLink')?.id, `${latitude}, ${longitude}`);
            setLocationStatus('success');
          });
      },
      (error) => {
        console.error("Error getting location:", error);
        setLocationStatus('error');
        alert('Unable to retrieve your location. Please enter it manually.'); // Using alert
      }
    );
  };

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Consolidate all form data from the 'fields' state
    const formDataToSubmit = {};
    fields.forEach(field => {
      formDataToSubmit[field.name] = field.value;
    });

    // Add vehicle type based on dropdown/custom entry
    if (vehicleTypeOption === 'other') {
      formDataToSubmit.vehicleType = customVehicleType;
    } else if (vehicleTypeOption !== 'select') {
      formDataToSubmit.vehicleType = vehicleTypeOption;
    }

    console.log("Final Form Data:", formDataToSubmit);
    console.log("Attached Files:", files);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Form submitted! Check console for data.'); // Using alert
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
  }, [fields, initialFields]); // Re-calculate when fields or initialFields change


  return (
    // Main container with full height and background gradient
    <div className="min-h-screen py-8 px-4" style={{ background: `linear-gradient(to bottom right, ${COLORS.primaryDark}, ${COLORS.primary})` }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
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
              <FaCar className="text-3xl" style={{ color: COLORS.textLight }} />
              <h1 className="text-2xl font-bold" style={{ color: COLORS.textLight }}>Vehicle QR Code Generator</h1>
            </motion.div>
            <p className="text-center mt-2" style={{ color: COLORS.primaryBg }}>Fill in your vehicle details to generate a QR code</p>
          </div>

          {/* Main Form */}
          <motion.form
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            onSubmit={handleSubmit}
            className="p-6 space-y-6"
          >
            {/* Vehicle Information Section */}
            <motion.div variants={itemVariants} className="p-4 rounded-lg" style={{ backgroundColor: COLORS.primaryBg }}>
              <h2 className="text-xl font-semibold flex items-center space-x-2 mb-4" style={{ color: COLORS.textPrimary }}>
                <FaCar style={{ color: COLORS.primaryDark }} />
                <span>Vehicle Information</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Dynamically render fields belonging to the 'vehicle' section */}
                <AnimatePresence>
                  {fields.filter(f => f.section === 'vehicle').map(field => (
                    <motion.div
                      key={field.id} // Use unique instance ID as key
                      variants={dynamicFieldVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="flex items-end gap-2"
                    >
                      {/* Render different input types based on field.type */}
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
                          className="flex-grow"
                        />
                      )}
                      {/* Delete button, only if field is removable */}
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

                {/* Type of Vehicle Dropdown (separate as it controls a state not directly in 'fields') */}
                <div>
                  <label htmlFor="vehicleTypeDropdown" className="block text-sm font-medium" style={{ color: COLORS.textPrimary }}>Type of Vehicle</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      {/* Dynamic icon based on selected vehicle type */}
                      {vehicleTypeOption === '2wheeler' && <FaMotorcycle style={{ color: COLORS.primary }} />}
                      {vehicleTypeOption === '3wheeler' && <FaTruck style={{ color: COLORS.primary }} />}
                      {vehicleTypeOption === '4wheeler' && <FaCarSide style={{ color: COLORS.primary }} />}
                      {(vehicleTypeOption === 'other' || vehicleTypeOption === 'select') && <FaQuestionCircle style={{ color: COLORS.primary }} />}
                    </div>
                    <select
                      id="vehicleTypeDropdown"
                      value={vehicleTypeOption}
                      onChange={(e) => setVehicleTypeOption(e.target.value)}
                      className="pl-10 w-full p-2 border rounded-lg focus:ring-2 focus:ring-opacity-75"
                      style={{ borderColor: COLORS.border, outlineColor: COLORS.primary, '--tw-ring-color': COLORS.primary }}
                    >
                      <option value="select">Select Type</option>
                      <option value="2wheeler">2 Wheeler</option>
                      <option value="3wheeler">3 Wheeler</option>
                      <option value="4wheeler">4 Wheeler</option>
                      <option value="other">Other (Manual Entry)</option>
                    </select>
                  </div>
                </div>

                {/* Conditional input for custom vehicle type */}
                {vehicleTypeOption === 'other' && (
                  <Input
                    label="Enter Vehicle Type Manually"
                    name="customVehicleType"
                    value={customVehicleType}
                    onChange={(e) => setCustomVehicleType(e.target.value)}
                    icon={<FaFileAlt style={{ color: COLORS.primary }} />}
                  />
                )}
              </div>
            </motion.div>

            {/* Registration Details Section */}
            <motion.div variants={itemVariants} className="p-4 rounded-lg" style={{ backgroundColor: COLORS.primaryBg }}>
              <h2 className="text-xl font-semibold flex items-center space-x-2 mb-4" style={{ color: COLORS.textPrimary }}>
                <FaIdCard style={{ color: COLORS.primaryDark }} />
                <span>Registration Details</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AnimatePresence>
                  {fields.filter(f => f.section === 'registration').map(field => (
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

            {/* Owner/Driver Section */}
            <motion.div variants={itemVariants} className="p-4 rounded-lg" style={{ backgroundColor: COLORS.primaryBg }}>
              <h2 className="text-xl font-semibold flex items-center space-x-2 mb-4" style={{ color: COLORS.textPrimary }}>
                <FaUser style={{ color: COLORS.primaryDark }} />
                <span>Owner/Driver Details</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AnimatePresence>
                  {fields.filter(f => f.section === 'ownerDriver').map(field => (
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
                <FaPhone style={{ color: COLORS.primaryDark }} />
                <span>Contact Information</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AnimatePresence>
                  {fields.filter(f => f.section === 'contact').map(field => (
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
                        value={field.value}
                        onChange={(e) => handleFieldChange(field.id, e.target.value)}
                        icon={field.icon}
                        className="flex-grow"
                      />
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

            {/* Location Details Section */}
            <motion.div variants={itemVariants} className="p-4 rounded-lg" style={{ backgroundColor: COLORS.primaryBg }}>
              <h2 className="text-xl font-semibold flex items-center space-x-2 mb-4" style={{ color: COLORS.textPrimary }}>
                <FaMapMarkerAlt style={{ color: COLORS.primaryDark }} />
                <span>Location Details</span>
              </h2>

              <div className="space-y-4">
                <AnimatePresence>
                  {fields.filter(f => f.section === 'location').map(field => (
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
                          className="flex-grow"
                        />
                      )}
                      {/* Special rendering for the mapLink field with a location button */}
                      {field.name === 'mapLink' && (
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
                              onClick={getCurrentLocation}
                              disabled={locationStatus === 'fetching'}
                              className="px-4 rounded-r-lg flex items-center justify-center disabled:opacity-50"
                              style={{ backgroundColor: COLORS.primaryDark, color: COLORS.textLight, hover: { backgroundColor: COLORS.primary } }}
                            >
                              {locationStatus === 'fetching' ? (
                                <svg className="animate-spin h-5 w-5" style={{ color: COLORS.textLight }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                              ) : (
                                <FaLocationDot className="text-lg" />
                              )}
                            </button>
                          </div>
                          {locationStatus === 'success' && (
                            <p className="mt-1 text-sm" style={{ color: COLORS.primaryDark }}>Location added successfully!</p>
                          )}
                          {locationStatus === 'error' && (
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

            {/* Add/Remove Fields Section */}
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
                        className="flex-grow"
                      />
                    )}
                    {field.type === 'textarea' && (
                      <TextArea
                        label={field.label}
                        name={field.name}
                        value={field.value}
                        onChange={(e) => handleFieldChange(field.id, e.target.value)}
                        className="flex-grow"
                      />
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
                  // Tailwind's hover classes are more robust, but if using inline for all colors:
                  // For hover effect, you'd typically handle this with a custom CSS class or Tailwind config
                  // For a simple inline hover, it's often done with a pseudo-class in CSS
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
                  'Generate QR Code'
                )}
              </button>
            </motion.div>
          </motion.form>
        </div>
      </motion.div>
    </div>
  );
}
