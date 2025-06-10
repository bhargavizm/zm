'use client';

import React, { useState, useMemo } from 'react';
import {
  FaUser, FaCalendarAlt, FaNotesMedical, FaAllergies, FaPills, FaTint,
  FaPhone, FaExclamationTriangle, FaPlusCircle, FaTimes, FaUserMd, FaFileMedicalAlt,
  FaHospitalSymbol, FaIdCardAlt, FaFileAlt
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

// --- Color Palette based on #008080 (Teal) ---
// Copied from the Vehicle QR Code Generator Form for consistency
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

// --- Reusable Components (Adapted from Vehicle Form) ---

function Input({ label, name, value, onChange, type = 'text', icon, className = '', placeholder = '' }) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium" style={{ color: COLORS.textPrimary }}>{label}</label>
      <div className="relative">
        {icon && ( // Render icon only if provided
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

// Note: PasswordInput and FileInput are not strictly needed for this form based on current fields
// but are included in the original component structure, so they are not directly copied here
// to keep this file concise. If new field types require them, they can be added from the VehicleContent.

// --- Main Component ---

export default function MedicalAlertForm() {
  // Define all possible fields, including templates for dynamic additions
  const initialFields = useMemo(() => [
    // Patient Information Section Fields
    { id: 'patientName', section: 'patientInfo', label: 'Patient Full Name', name: 'patientName', type: 'text', value: '', icon: <FaUser style={{ color: COLORS.primary }} />, isRemovable: false }, // Not removable
    { id: 'birthDate', section: 'patientInfo', label: 'Date of Birth', name: 'birthDate', type: 'date', value: '', icon: <FaCalendarAlt style={{ color: COLORS.primary }} />, isRemovable: true },
    { id: 'bloodType', section: 'patientInfo', label: 'Blood Type', name: 'bloodType', type: 'select', options: ['Select blood type', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], value: '', icon: <FaTint style={{ color: COLORS.primary }} />, isRemovable: true },

    // Medical History Section Fields
    { id: 'medicalConditions', section: 'medicalHistory', label: 'Medical Conditions', name: 'medicalConditions', type: 'textarea', value: '', placeholder: 'List all relevant medical conditions (e.g., diabetes, heart disease)', icon: <FaNotesMedical style={{ color: COLORS.primary }} />, isRemovable: false }, // Not removable
    { id: 'allergies', section: 'medicalHistory', label: 'Allergies', name: 'allergies', type: 'textarea', value: '', placeholder: 'List any known allergies (e.g., penicillin, nuts)', icon: <FaAllergies style={{ color: COLORS.primary }} />, isRemovable: true },
    { id: 'medications', section: 'medicalHistory', label: 'Current Medications', name: 'medications', type: 'textarea', value: '', placeholder: 'List current medications with dosages if possible', icon: <FaPills style={{ color: COLORS.primary }} />, isRemovable: true },
    { id: 'additionalNotes', section: 'medicalHistory', label: 'Additional Notes', name: 'additionalNotes', type: 'textarea', value: '', placeholder: 'Any other important medical information', icon: <FaFileAlt style={{ color: COLORS.primary }} />, isRemovable: true },

    // Emergency Contact Section Fields
    { id: 'emergencyContact', section: 'emergencyContact', label: 'Emergency Contact Name', name: 'emergencyContact', type: 'text', value: '', icon: <FaUser style={{ color: COLORS.primary }} />, isRemovable: false }, // Not removable
    { id: 'contactPhone', section: 'emergencyContact', label: 'Emergency Contact Phone', name: 'contactPhone', type: 'tel', value: '', placeholder: '1234567890', icon: <FaPhone style={{ color: COLORS.primary }} />, isRemovable: false }, // Not removable

    // Template fields for dynamic additions
    { id: 'familyDoctorName_template', section: 'additional', label: 'Family Doctor Name', name: 'familyDoctorName', type: 'text', value: '', icon: <FaUserMd style={{ color: COLORS.primary }} />, isRemovable: true, isTemplate: true },
    { id: 'familyDoctorPhone_template', section: 'additional', label: 'Family Doctor Phone', name: 'familyDoctorPhone', type: 'tel', value: '', icon: <FaPhone style={{ color: COLORS.primary }} />, isRemovable: true, isTemplate: true },
    { id: 'emergencyInstructions_template', section: 'additional', label: 'Emergency Instructions', name: 'emergencyInstructions', type: 'textarea', value: '', icon: <FaExclamationTriangle style={{ color: COLORS.primary }} />, isRemovable: true, isTemplate: true },
    { id: 'insuranceProvider_template', section: 'additional', label: 'Insurance Provider', name: 'insuranceProvider', type: 'text', value: '', icon: <FaHospitalSymbol style={{ color: COLORS.primary }} />, isRemovable: true, isTemplate: true },
    { id: 'policyNumber_template', section: 'additional', label: 'Policy Number', name: 'policyNumber', type: 'text', value: '', icon: <FaIdCardAlt style={{ color: COLORS.primary }} />, isRemovable: true, isTemplate: true },
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

  // Handler for changing values in text/date/textarea/select inputs
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
      const newField = { ...template, id: `${template.name}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`, value: '', isTemplate: false };
      setFields(prevFields => [...prevFields, newField]);
    }
  };

  // Handler for removing a field
  const removeField = (id) => {
    setFields(prevFields => prevFields.filter(field => field.id !== id));
  };

  // Handler for form submission (simulated as per previous Canvas)
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Consolidate all form data from the 'fields' state
    const formDataToSubmit = {};
    fields.forEach(field => {
      formDataToSubmit[field.name] = field.value;
    });

    console.log("Medical Alert Form Data:", formDataToSubmit);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Medical Alert Information submitted successfully!');
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
    const currentFieldNames = new Set(fields.map(f => initialFields.find(template => template.name === f.name)?.id || f.id));

    return initialFields.filter(templateField => {
      const isCurrentlyPresent = currentFieldNames.has(templateField.id);
      // Show templates OR fields that were initially present and are removable but not currently in the form
      return !isCurrentlyPresent && (templateField.isTemplate || templateField.isRemovable);
    });
  }, [fields, initialFields]); // Re-calculate when fields or initialFields change

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
              <FaExclamationTriangle className="text-3xl" style={{ color: COLORS.textLight }} />
              <h1 className="text-2xl font-bold" style={{ color: COLORS.textLight }}>Medical Alert Information</h1>
            </motion.div>
            <p className="text-center mt-2" style={{ color: COLORS.primaryBg }}>Please fill out all relevant medical details</p>
          </div>

          {/* Main Form */}
          <motion.form
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            onSubmit={handleSubmit}
            className="p-6 space-y-6"
          >
            {/* Patient Information Section */}
            <motion.div variants={itemVariants} className="p-4 rounded-lg" style={{ backgroundColor: COLORS.primaryBg }}>
              <h2 className="text-xl font-semibold flex items-center space-x-2 mb-4" style={{ color: COLORS.textPrimary }}>
                <FaUser style={{ color: COLORS.primaryDark }} />
                <span>Patient Information</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AnimatePresence>
                  {fields.filter(f => f.section === 'patientInfo').map(field => (
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

            {/* Medical History Section */}
            <motion.div variants={itemVariants} className="p-4 rounded-lg" style={{ backgroundColor: COLORS.primaryBg }}>
              <h2 className="text-xl font-semibold flex items-center space-x-2 mb-4" style={{ color: COLORS.textPrimary }}>
                <FaNotesMedical style={{ color: COLORS.primaryDark }} />
                <span>Medical History</span>
              </h2>

              <div className="space-y-4">
                <AnimatePresence>
                  {fields.filter(f => f.section === 'medicalHistory').map(field => (
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

            {/* Emergency Contact Section */}
            <motion.div variants={itemVariants} className="p-4 rounded-lg" style={{ backgroundColor: COLORS.primaryBg }}>
              <h2 className="text-xl font-semibold flex items-center space-x-2 mb-4" style={{ color: COLORS.textPrimary }}>
                <FaPhone style={{ color: COLORS.primaryDark }} />
                <span>Emergency Contact</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AnimatePresence>
                  {fields.filter(f => f.section === 'emergencyContact').map(field => (
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
                  'Save Medical Alert'
                )}
              </button>
            </motion.div>
          </motion.form>
        </div>
      </motion.div>
    </div>
  );
}
