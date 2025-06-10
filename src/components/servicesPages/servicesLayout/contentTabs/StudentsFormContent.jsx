'use client'

import React, { useState } from 'react'

export default function StudentInfoForm() {
  const [formData, setFormData] = useState({
    schoolName: '',
    schoolAddress: '',
    schoolMap: '',
    studentName: '',
    dob: '',
    grade: '',
    fatherName: '',
    contact: '',
    altContact: '',
    email: '',
    homeAddress: '',
    homeMap: '',
    password: '',
    logo: null,
  })

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFileChange = e => {
    const file = e.target.files[0]
    setFormData(prev => ({
      ...prev,
      logo: file ? URL.createObjectURL(file) : null,
    }))
  }

  return (
    <div className="flex flex-col lg:flex-row justify-around items-start p-4 gap-6">
      {/* Form Section */}
      <form className="w-full lg:w-1/2 space-y-4">
        <h1 className="text-2xl font-bold text-center">QR Code Generator for Students Info Form</h1>

        <div>
          <label>College/School Name</label>
          <input
            type="text"
            name="schoolName"
            className="w-full border p-2"
            value={formData.schoolName}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>College/School Image for Logo</label>
          <input
            type="file"
            accept="image/*"
            className="w-full"
            onChange={handleFileChange}
          />
        </div>

        <div>
          <label>College/School Address</label>
          <textarea
            name="schoolAddress"
            className="w-full border p-2"
            value={formData.schoolAddress}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>College/School Map Link</label>
          <input
            type="url"
            name="schoolMap"
            className="w-full border p-2"
            value={formData.schoolMap}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Student Name</label>
          <input
            type="text"
            name="studentName"
            className="w-full border p-2"
            value={formData.studentName}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Date of Birth</label>
          <input
            type="date"
            name="dob"
            className="w-full border p-2"
            value={formData.dob}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Grade/Class</label>
          <input
            type="text"
            name="grade"
            className="w-full border p-2"
            value={formData.grade}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Father's Name</label>
          <input
            type="text"
            name="fatherName"
            className="w-full border p-2"
            value={formData.fatherName}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Contact Number</label>
          <input
            type="tel"
            name="contact"
            className="w-full border p-2"
            value={formData.contact}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Alternate Contact Number</label>
          <input
            type="text"
            name="altContact"
            className="w-full border p-2"
            value={formData.altContact}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Parent Email</label>
          <input
            type="email"
            name="email"
            className="w-full border p-2"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Home Address</label>
          <textarea
            name="homeAddress"
            className="w-full border p-2"
            value={formData.homeAddress}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Home Map Link</label>
          <input
            type="url"
            name="homeMap"
            className="w-full border p-2"
            value={formData.homeMap}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="w-full border p-2"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
      </form>

      {/* Preview Section */}
      <div className="w-full lg:w-1/3 mt-10 lg:mt-0 border-2 border-gray-300 rounded-2xl p-4 shadow-lg bg-white max-w-xs mx-auto relative overflow-hidden"
        style={{ height: '700px', borderRadius: '40px' }}>
        <div className="absolute top-1 w-full text-center">
          <div className="w-20 h-2 bg-gray-400 rounded-full mx-auto my-3" />
        </div>

        <div className="mt-6 space-y-2 overflow-y-auto h-[630px] p-2">
          <h2 className="text-xl font-bold text-center underline">Preview</h2>

          {formData.logo && (
            <div className="text-center">
              <img src={formData.logo} alt="School Logo" className="mx-auto h-20 w-20 object-cover rounded-full" />
            </div>
          )}
          {formData.schoolName && <p><strong>School Name:</strong> {formData.schoolName}</p>}
          {formData.schoolAddress && <p><strong>Address:</strong> {formData.schoolAddress}</p>}
          {formData.schoolMap && <p><strong>Map Link:</strong> {formData.schoolMap}</p>}
          {formData.studentName && <p><strong>Student Name:</strong> {formData.studentName}</p>}
          {formData.dob && <p><strong>Date of Birth:</strong> {formData.dob}</p>}
          {formData.grade && <p><strong>Grade:</strong> {formData.grade}</p>}
          {formData.fatherName && <p><strong>Father's Name:</strong> {formData.fatherName}</p>}
          {formData.contact && <p><strong>Contact:</strong> {formData.contact}</p>}
          {formData.altContact && <p><strong>Alt Contact:</strong> {formData.altContact}</p>}
          {formData.email && <p><strong>Email:</strong> {formData.email}</p>}
          {formData.homeAddress && <p><strong>Home Address:</strong> {formData.homeAddress}</p>}
          {formData.homeMap && <p><strong>Home Map:</strong> {formData.homeMap}</p>}
          {formData.password && <p><strong>Password:</strong> {formData.password}</p>}
        </div>
      </div>
    </div>
  )
}
