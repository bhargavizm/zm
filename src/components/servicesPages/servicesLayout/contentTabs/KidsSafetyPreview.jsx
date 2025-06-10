'use client';

import { useEffect, useState } from 'react';
import { FaChild, FaSchool, FaUser, FaPhone, FaMapMarkerAlt, FaLock } from 'react-icons/fa';

export default function KidSafetyPreview() {
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    // Get data from localStorage
    const savedData = localStorage.getItem('kidFormData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  if (!formData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center p-6 bg-white rounded-lg shadow-md max-w-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">No Data Available</h2>
          <p className="text-gray-600">Please fill out the form first to see the preview.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 flex items-center justify-center">
      {/* iPhone Outline */}
      <div className="relative w-80 bg-black rounded-3xl p-4 shadow-2xl border-8 border-gray-900">
        {/* iPhone Notch */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-6 bg-gray-900 rounded-b-lg z-10"></div>
        
        {/* Screen Content */}
        <div className="bg-white rounded-lg h-[600px] overflow-y-auto p-4">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <FaChild className="text-teal-500 text-2xl" />
              <h1 className="text-xl font-bold text-teal-700">Child Safety ID</h1>
            </div>
            <div className="h-1 bg-gradient-to-r from-teal-400 to-teal-600 rounded-full"></div>
          </div>

          {/* Child Photo */}
          {formData.image && (
            <div className="flex justify-center mb-4">
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-2 border-teal-400">
                <span className="text-gray-500">Photo Preview</span>
              </div>
            </div>
          )}

          {/* Child Info Section */}
          {(formData.childName || formData.dob || formData.grade) && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-teal-700 flex items-center mb-2">
                <FaUser className="mr-2" /> Child Information
              </h2>
              <div className="space-y-1 pl-6">
                {formData.childName && (
                  <p><span className="font-medium">Name:</span> {formData.childName}</p>
                )}
                {formData.dob && (
                  <p><span className="font-medium">DOB:</span> {new Date(formData.dob).toLocaleDateString()}</p>
                )}
                {formData.grade && (
                  <p><span className="font-medium">Grade:</span> {formData.grade}</p>
                )}
              </div>
            </div>
          )}

          {/* School Info Section */}
          {(formData.schoolName || formData.schoolAddress) && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-teal-700 flex items-center mb-2">
                <FaSchool className="mr-2" /> School Information
              </h2>
              <div className="space-y-1 pl-6">
                {formData.schoolName && (
                  <p><span className="font-medium">School:</span> {formData.schoolName}</p>
                )}
                {formData.schoolAddress && (
                  <p><span className="font-medium">Address:</span> {formData.schoolAddress}</p>
                )}
              </div>
            </div>
          )}

          {/* Parent Info Section */}
          {(formData.parentName || formData.contactNumber || formData.alternateNumber) && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-teal-700 flex items-center mb-2">
                <FaUser className="mr-2" /> Parent Information
              </h2>
              <div className="space-y-1 pl-6">
                {formData.parentName && (
                  <p><span className="font-medium">Parent:</span> {formData.parentName}</p>
                )}
                {formData.contactNumber && (
                  <p><span className="font-medium">Phone:</span> {formData.contactNumber}</p>
                )}
                {formData.alternateNumber && (
                  <p><span className="font-medium">Alt. Phone:</span> {formData.alternateNumber}</p>
                )}
              </div>
            </div>
          )}

          {/* Home Info Section */}
          {(formData.homeAddress || formData.mapLink) && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-teal-700 flex items-center mb-2">
                <FaMapMarkerAlt className="mr-2" /> Home Information
              </h2>
              <div className="space-y-1 pl-6">
                {formData.homeAddress && (
                  <p><span className="font-medium">Address:</span> {formData.homeAddress}</p>
                )}
                {formData.mapLink && (
                  <p><span className="font-medium">Location:</span> {formData.mapLink}</p>
                )}
              </div>
            </div>
          )}

          {/* QR Code Placeholder */}
          <div className="mt-8 text-center">
            <div className="flex justify-center mb-2">
              <div className="w-32 h-32 bg-gray-200 flex items-center justify-center rounded">
                <span className="text-gray-500">QR Code</span>
              </div>
            </div>
            <p className="text-sm text-gray-600">Scan this code for emergency contact</p>
          </div>
        </div>

        {/* Home Button */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-1/3 h-1 bg-gray-300 rounded-full"></div>
      </div>
    </div>
  );
}