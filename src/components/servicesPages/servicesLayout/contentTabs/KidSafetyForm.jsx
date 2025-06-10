'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaChild, FaSchool, FaUser, FaPhone, FaMapMarkerAlt, FaLock, FaCalendarAlt, FaUpload, FaLocationArrow, FaEye, FaEyeSlash } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function KidSafetyForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    childName: '',
    dob: '',
    image: null,
    grade: '',
    schoolName: '',
    schoolAddress: '',
    parentName: '',
    contactNumber: '',
    alternateNumber: '',
    homeAddress: '',
    mapLink: '',
    password: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [locationStatus, setLocationStatus] = useState('idle'); // idle | fetching | success | error
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
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
        // Get human-readable address using reverse geocoding
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const previewData = { ...formData, image: formData.image?.name || '' };
    localStorage.setItem('kidFormData', JSON.stringify(previewData));
    
    // Simulate processing before navigation
    setTimeout(() => {
      router.push('/kidsSafetyPre');
      setIsSubmitting(false);
    }, 1500);
  };

  // Animation variants
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900 to-teal-700 py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto"
      >
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-teal-600 to-teal-500 p-6 text-white">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="flex items-center justify-center space-x-3"
            >
              <FaChild className="text-3xl" />
              <h1 className="text-2xl font-bold">Child Safety QR Code Generator</h1>
            </motion.div>
            <p className="text-teal-100 text-center mt-2">Keep your child safe with our identification system</p>
          </div>

          {/* Form */}
          <motion.form
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            onSubmit={handleSubmit}
            className="p-6 space-y-6"
          >
            {/* Child Information Section */}
            <motion.div variants={itemVariants} className="bg-teal-50 p-4 rounded-lg">
              <h2 className="text-xl font-semibold text-teal-800 flex items-center space-x-2 mb-4">
                <FaChild className="text-teal-600" />
                <span>Child Information</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input 
                  label="Child Name" 
                  name="childName" 
                  value={formData.childName} 
                  onChange={handleChange} 
                  icon={<FaUser className="text-teal-500" />}
                />
                <Input 
                  label="Date of Birth" 
                  name="dob" 
                  type="date" 
                  value={formData.dob} 
                  onChange={handleChange} 
                  icon={<FaCalendarAlt className="text-teal-500" />}
                />
                <FileInput 
                  label="Child Photo" 
                  name="image" 
                  accept="image/*"
                  multiple={false}
                  onChange={handleChange} 
                  icon={<FaUpload className="text-teal-500" />}
                />
                <Input 
                  label="Grade/Class" 
                  name="grade" 
                  value={formData.grade} 
                  onChange={handleChange} 
                  icon={<FaSchool className="text-teal-500" />}
                />
              </div>
            </motion.div>

            {/* School Information Section */}
            <motion.div variants={itemVariants} className="bg-teal-50 p-4 rounded-lg">
              <h2 className="text-xl font-semibold text-teal-800 flex items-center space-x-2 mb-4">
                <FaSchool className="text-teal-600" />
                <span>School Information</span>
              </h2>
              
              <div className="space-y-4">
                <Input 
                  label="School Name" 
                  name="schoolName" 
                  value={formData.schoolName} 
                  onChange={handleChange} 
                  icon={<FaSchool className="text-teal-500" />}
                />
                <TextArea 
                  label="School Address" 
                  name="schoolAddress" 
                  value={formData.schoolAddress} 
                  onChange={handleChange} 
                />
              </div>
            </motion.div>

            {/* Parent Information Section */}
            <motion.div variants={itemVariants} className="bg-teal-50 p-4 rounded-lg">
              <h2 className="text-xl font-semibold text-teal-800 flex items-center space-x-2 mb-4">
                <FaUser className="text-teal-600" />
                <span>Parent Information</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input 
                  label="Parent Name" 
                  name="parentName" 
                  value={formData.parentName} 
                  onChange={handleChange} 
                  icon={<FaUser className="text-teal-500" />}
                />
                <Input 
                  label="Contact Number" 
                  name="contactNumber" 
                  value={formData.contactNumber} 
                  onChange={handleChange} 
                  icon={<FaPhone className="text-teal-500" />}
                />
                <Input 
                  label="Alternate Number" 
                  name="alternateNumber" 
                  value={formData.alternateNumber} 
                  onChange={handleChange} 
                  icon={<FaPhone className="text-teal-500" />}
                />
              </div>
            </motion.div>

            {/* Home Information Section */}
            <motion.div variants={itemVariants} className="bg-teal-50 p-4 rounded-lg">
              <h2 className="text-xl font-semibold text-teal-800 flex items-center space-x-2 mb-4">
                <FaMapMarkerAlt className="text-teal-600" />
                <span>Home Information</span>
              </h2>
              
              <div className="space-y-4">
                <TextArea 
                  label="Home Address" 
                  name="homeAddress" 
                  value={formData.homeAddress} 
                  onChange={handleChange} 
                />
                
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Home Location</label>
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
            </motion.div>

            {/* Security Section */}
            <motion.div variants={itemVariants} className="bg-teal-50 p-4 rounded-lg">
              <h2 className="text-xl font-semibold text-teal-800 flex items-center space-x-2 mb-4">
                <FaLock className="text-teal-600" />
                <span>Security</span>
              </h2>
              
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
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
                className={`w-full py-3 px-4 rounded-lg text-white font-semibold ${isSubmitting ? 'bg-teal-400' : 'bg-teal-600 hover:bg-teal-700'} transition-colors duration-300 flex items-center justify-center`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating QR...
                  </>
                ) : (
                  'Generate Safety QR Code'
                )}
              </button>
            </motion.div>
          </motion.form>
        </div>
      </motion.div>
    </div>
  );
}

function Input({ label, name, value, onChange, type = 'text', icon }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon}
        </div>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="pl-10 w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
        />
      </div>
    </div>
  );
}

function TextArea({ label, name, value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
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

function FileInput({ label, name, multiple, onChange, icon, accept }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon}
        </div>
        <input
          type="file"
          name={name}
          multiple={multiple}
          accept={accept}
          onChange={onChange}
          className="pl-10 w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
        />
      </div>
    </div>
  );
}