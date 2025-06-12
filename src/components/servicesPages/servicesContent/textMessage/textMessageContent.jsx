'use client';

import React, { useState, useMemo } from 'react';
import {
  FaEnvelope, FaCalendarAlt, FaUser, FaEye, FaEyeSlash, FaCommentAlt,
  FaMapMarkerAlt, FaLock, FaGlobe, FaPlusCircle, FaTimes, FaPaperPlane
,FaPhone} from 'react-icons/fa';
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

// FileInput is not strictly needed for this form, but included for completeness if dynamic fields need it
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

const TextMessageContent =() => {
  // Define all possible fields for the text message form
  const initialFields = useMemo(() => [
    // Message Details Section
    { id: 'senderName', section: 'messageDetails', label: 'Sender Name', name: 'senderName', type: 'text', value: '', icon: <FaUser style={{ color: COLORS.primary }} />, isRemovable: false },
    { id: 'messageType', section: 'messageDetails', label: 'Type of Message', name: 'messageType', type: 'text', value: '', icon: <FaCommentAlt style={{ color: COLORS.primary }} />, isRemovable: true, placeholder: 'e.g., Personal, Business, Alert' },
    { id: 'textMessage', section: 'messageDetails', label: 'Text Message', name: 'textMessage', type: 'textarea', value: '', placeholder: 'Enter your message content here', isRemovable: false },
    { id: 'dateTime', section: 'messageDetails', label: 'Date and Time', name: 'dateTime', type: 'datetime-local', value: '', icon: <FaCalendarAlt style={{ color: COLORS.primary }} />, isRemovable: true },

    // Sender Information Section
    { id: 'senderAddress', section: 'senderInfo', label: 'Sender Address', name: 'senderAddress', type: 'textarea', value: '', placeholder: 'Full address of the sender', isRemovable: true },
    { id: 'senderMap', section: 'senderInfo', label: 'Sender Map Link', name: 'senderMap', type: 'text', value: '', icon: <FaMapMarkerAlt style={{ color: COLORS.primary }} />, isRemovable: true, special: 'location' },

    // Security Section
    { id: 'password', section: 'security', label: 'Password', name: 'password', type: 'password', value: '', icon: <FaLock style={{ color: COLORS.primary }} />, isRemovable: true },

    // Template fields for dynamic additions
    { id: 'senderEmail_template', section: 'additional', label: 'Sender Email', name: 'senderEmail', type: 'email', value: '', placeholder: 'sender@example.com', icon: <FaEnvelope style={{ color: COLORS.primary }} />, isRemovable: true, isTemplate: true },
    { id: 'senderPhone_template', section: 'additional', label: 'Sender Phone', name: 'senderPhone', type: 'tel', value: '', placeholder: 'e.g., 123-456-7890', icon: <FaPhone style={{ color: COLORS.primary }} />, isRemovable: true, isTemplate: true },
  ], []);

  // State to hold the currently active form fields (dynamic array)
  const [fields, setFields] = useState(() => {
    return initialFields
      .filter(field => !field.isTemplate)
      .map(field => ({ ...field, id: `${field.id}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}` }));
  });

  // Form submission and location fetching states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [locationStatus, setLocationStatus] = useState({ senderMap: 'idle' }); // Tracks status for sender map

  // Handler for changing values in various input types
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
      const newField = {
        ...template,
        id: `${template.name}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        value: '', // Reset value for new instances
        isTemplate: false
      };
      setFields(prevFields => [...prevFields, newField]);
    }
  };

  // Handler for removing a field
  const removeField = (id) => {
    setFields(prevFields => prevFields.filter(field => field.id !== id));
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

    console.log("Text Message Form Data:", formDataToSubmit);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Text Message information saved successfully!');
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
    <div className=" flex items-center justify-center" >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl w-full mx-auto"
      >
        <div className="rounded-xl shadow-xl overflow-hidden pt-6" >
          {/* Header Section */}
          {/* <div className="p-6 text-white" style={{ background: `linear-gradient(to right, ${COLORS.primaryDark}, ${COLORS.primary})` }}>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="flex items-center justify-center space-x-3"
            >
              <FaPaperPlane className="text-3xl" style={{ color: COLORS.textLight }} />
              <h1 className="text-2xl font-bold" style={{ color: COLORS.textLight }}>Text Message QR Code Generator</h1>
            </motion.div>
            <p className="text-center mt-2" style={{ color: COLORS.primaryBg }}>Create QR codes for text messages</p>
          </div> */}

          {/* Main Form */}
          <motion.form
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            onSubmit={handleSubmit}
            className="p-6 space-y-6"
          >
            {/* Message Details Section */}
            <motion.div variants={itemVariants} className="p-4 rounded-lg" style={{ backgroundColor: COLORS.primaryBg }}>
              <h2 className="text-xl font-semibold flex items-center space-x-2 mb-4" style={{ color: COLORS.textPrimary }}>
                <FaCommentAlt style={{ color: COLORS.primaryDark }} />
                <span>Message Details</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AnimatePresence>
                  {fields.filter(f => f.section === 'messageDetails').map(field => (
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
                      {field.type === 'datetime-local' && (
                        <Input
                          label={field.label}
                          name={field.name}
                          type="datetime-local"
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
              </div>
            </motion.div>

            {/* Sender Information Section */}
            <motion.div variants={itemVariants} className="p-4 rounded-lg" style={{ backgroundColor: COLORS.primaryBg }}>
              <h2 className="text-xl font-semibold flex items-center space-x-2 mb-4" style={{ color: COLORS.textPrimary }}>
                <FaUser style={{ color: COLORS.primaryDark }} />
                <span>Sender Information</span>
              </h2>

              <div className="space-y-4">
                <AnimatePresence>
                  {fields.filter(f => f.section === 'senderInfo').map(field => (
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
                                <FaLocationDot className="text-lg" />
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
                    {field.type === 'text' || field.type === 'email' || field.type === 'tel' ? (
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
                  'Generate Text Message QR Code'
                )}
              </button>
            </motion.div>
          </motion.form>
        </div>

        {/* Preview Section - Adjusted to display data from the dynamic fields */}
        {/* <div className="w-full lg:w-1/3 mt-10 lg:mt-0 border-2 rounded-2xl p-4 shadow-lg max-w-xs mx-auto relative overflow-hidden"
             style={{ height: '700px', borderRadius: '40px', borderColor: COLORS.border, backgroundColor: COLORS.primaryBg }}>
          <div className="absolute top-1 w-full text-center">
            <div className="w-20 h-2 rounded-full mx-auto my-3" style={{ backgroundColor: COLORS.border }} />
          </div>

          <div className="mt-6 space-y-2 overflow-y-auto h-[630px] p-2" style={{ color: COLORS.textPrimary }}>
            <h2 className="text-xl font-bold text-center underline" style={{ color: COLORS.textPrimary }}>Preview</h2>

            {fields.filter(f => f.name !== 'password').map(field => (
              field.value && (field.value !== '' || field.value !== null) && (
                <p key={field.id}>
                  <strong>{field.label}:</strong> {field.value}
                </p>
              )
            ))}
            {fields.find(f => f.name === 'password')?.value && <p><strong>Password:</strong> {fields.find(f => f.name === 'password')?.value}</p>}
          </div>
        </div> */}
      </motion.div>
    </div>
  );
}

export default TextMessageContent
