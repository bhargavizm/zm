'use client';

import React, { useState } from 'react';
import { FaHome, FaCalendarAlt, FaUser, FaEye, FaUserTie, FaEnvelope, FaPhone, FaMapMarkerAlt, FaLock, FaUpload, FaLocationArrow } from 'react-icons/fa';

export default function PropertyForm() {
  const [formData, setFormData] = useState({
    propertyTitle: '',
    propertyType: '',
    date: '',
    description: '',
    agentName: '',
    ownerName: '',
    email: '',
    contact: '',
    altContact: '',
    agentAddress: '',
    propertyAddress: '',
    mapLink: '',
    password: '',
  });

  const [propertyImages, setPropertyImages] = useState([]);
  const [locationStatus, setLocationStatus] = useState('idle');
  const [showPassword, setShowPassword] = useState(false);
  const [additionalFields, setAdditionalFields] = useState([]);

  const propertyTypes = [
    'Residential',
    'Commercial',
    'Industrial',
    'Land',
    'Special Purpose',
    'Agricultural'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 10); // Limit to 10 files
    setPropertyImages(files);
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus('error');
      return;
    }

    setLocationStatus('fetching');
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
          .then(response => response.json())
          .then(data => {
            const address = data.display_name || `${latitude}, ${longitude}`;
            setFormData(prev => ({
              ...prev,
              mapLink: address
            }));
            setLocationStatus('success');
          })
          .catch(() => {
            setFormData(prev => ({
              ...prev,
              mapLink: `${latitude}, ${longitude}`
            }));
            setLocationStatus('success');
          });
      },
      (error) => {
        console.error("Error getting location:", error);
        setLocationStatus('error');
      }
    );
  };

  const addAdditionalField = () => {
    setAdditionalFields([...additionalFields, { name: '', value: '' }]);
  };

  const handleAdditionalFieldChange = (index, field, value) => {
    const updatedFields = [...additionalFields];
    updatedFields[index][field] = value;
    setAdditionalFields(updatedFields);
  };

  const removeAdditionalField = (index) => {
    const updatedFields = additionalFields.filter((_, i) => i !== index);
    setAdditionalFields(updatedFields);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submissionData = {
      ...formData,
      propertyImages,
      additionalFields: additionalFields.filter(field => field.name && field.value)
    };
    console.log('Form Data:', submissionData);
    // Submit to backend here if needed
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gradient-to-br from-teal-50 to-teal-100 shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold text-center mb-6 text-teal-800">QR Code Generator for Properties</h2>
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Property Information Section */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-teal-700 mb-4 flex items-center">
            <FaHome className="mr-2" /> Property Information
          </h3>
          
          <Input 
            label="Property Name / Title" 
            name="propertyTitle" 
            value={formData.propertyTitle} 
            onChange={handleChange}
            icon={<FaHome className="text-teal-500" />}
          />

          <div>
            <label className="block font-medium mb-1">Type of Property</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaHome className="text-teal-500" />
              </div>
              <select
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
                className="pl-10 w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              >
                <option value="">Select property type</option>
                {propertyTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          <Input 
            label="Date" 
            name="date" 
            type="date" 
            value={formData.date} 
            onChange={handleChange}
            icon={<FaCalendarAlt className="text-teal-500" />}
          />

          <FileInput 
            label="Add Maximum 10 Images" 
            name="propertyImages" 
            onChange={handleFileChange} 
            multiple
            icon={<FaUpload className="text-teal-500" />}
          />

          <TextArea 
            label="Description of Property" 
            name="description" 
            value={formData.description} 
            onChange={handleChange}
          />
        </div>

        {/* Contact Information Section */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-teal-700 mb-4 flex items-center">
            <FaUser className="mr-2" /> Contact Information
          </h3>
          
          <Input 
            label="Agent Name" 
            name="agentName" 
            value={formData.agentName} 
            onChange={handleChange}
            icon={<FaUserTie className="text-teal-500" />}
          />

          <Input 
            label="Owner Name" 
            name="ownerName" 
            value={formData.ownerName} 
            onChange={handleChange}
            icon={<FaUser className="text-teal-500" />}
          />

          <Input 
            label="Email Id" 
            name="email" 
            type="email" 
            value={formData.email} 
            onChange={handleChange}
            icon={<FaEnvelope className="text-teal-500" />}
          />

          <Input 
            label="Contact Number" 
            name="contact" 
            value={formData.contact} 
            onChange={handleChange}
            icon={<FaPhone className="text-teal-500" />}
          />

          <Input 
            label="Alternate Contact Number" 
            name="altContact" 
            value={formData.altContact} 
            onChange={handleChange}
            icon={<FaPhone className="text-teal-500" />}
          />
        </div>

        {/* Address Information Section */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-teal-700 mb-4 flex items-center">
            <FaMapMarkerAlt className="mr-2" /> Address Information
          </h3>
          
          <TextArea 
            label="Owner / Agent Address" 
            name="agentAddress" 
            value={formData.agentAddress} 
            onChange={handleChange}
          />

          <TextArea 
            label="Property Address" 
            name="propertyAddress" 
            value={formData.propertyAddress} 
            onChange={handleChange}
          />

          <div className="relative">
            <label className="block font-medium mb-1">Property Map Link</label>
            <div className="flex">
              <input
                type="text"
                name="mapLink"
                value={formData.mapLink}
                onChange={handleChange}
                placeholder="Enter location or click the button to detect"
                className="flex-1 p-2 border rounded-l-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
              <button
                type="button"
                onClick={getCurrentLocation}
                disabled={locationStatus === 'fetching'}
                className="bg-teal-600 hover:bg-teal-700 text-white px-4 rounded-r-lg flex items-center justify-center disabled:opacity-50"
              >
                {locationStatus === 'fetching' ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <FaLocationArrow className="text-lg" />
                )}
              </button>
            </div>
            {locationStatus === 'success' && (
              <p className="mt-1 text-sm text-green-600">Location added successfully!</p>
            )}
            {locationStatus === 'error' && (
              <p className="mt-1 text-sm text-red-600">Could not get location. Please enter manually.</p>
            )}
          </div>
        </div>

        {/* Additional Fields Section */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-teal-700 mb-4">Additional Information</h3>
          
          {additionalFields.map((field, index) => (
            <div key={index} className="grid grid-cols-12 gap-2 mb-3">
              <div className="col-span-5">
                <input
                  type="text"
                  placeholder="Field name"
                  value={field.name}
                  onChange={(e) => handleAdditionalFieldChange(index, 'name', e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="col-span-6">
                <input
                  type="text"
                  placeholder="Field value"
                  value={field.value}
                  onChange={(e) => handleAdditionalFieldChange(index, 'value', e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="col-span-1 flex items-center">
                <button
                  type="button"
                  onClick={() => removeAdditionalField(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </div>
            </div>
          ))}
          
          <button
            type="button"
            onClick={addAdditionalField}
            className="text-teal-600 hover:text-teal-800 text-sm font-medium flex items-center"
          >
            + Add Custom Field
          </button>
        </div>

        {/* Security Section */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-teal-700 mb-4 flex items-center">
            <FaLock className="mr-2" /> Security
          </h3>
          
          <div className="relative">
            <label className="block font-medium mb-1">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="text-teal-500" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="pl-10 w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <FaEyeSlash className="text-teal-500" />
                ) : (
                  <FaEye className="text-teal-500" />
                )}
              </button>
            </div>
          </div>
        </div>

        <button 
          type="submit" 
          className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition-colors font-medium"
        >
          Generate Property QR Code
        </button>
      </form>
    </div>
  );
}

function Input({ label, name, value, onChange, type = 'text', icon }) {
  return (
    <div className="mb-4">
      <label className="block font-medium mb-1">{label}</label>
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
          className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${icon ? 'pl-10' : ''}`}
        />
      </div>
    </div>
  );
}

function TextArea({ label, name, value, onChange }) {
  return (
    <div className="mb-4">
      <label className="block font-medium mb-1">{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={3}
        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
      ></textarea>
    </div>
  );
}

function FileInput({ label, name, multiple, onChange, icon }) {
  return (
    <div className="mb-4">
      <label className="block font-medium mb-1">{label}</label>
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
          onChange={onChange}
          className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100 ${icon ? 'pl-10' : ''}`}
        />
      </div>
    </div>
  );
}