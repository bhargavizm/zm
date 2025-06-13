// components/smsContent/SmsContent.jsx
'use client'

import React from 'react'
import useServicesContext from "@/components/hooks/useServiceContext";
import { FiEye, FiEyeOff, FiLock, FiCalendar, FiMessageSquare } from 'react-icons/fi'

const SmsContent = () => {
  const {
    smsForm,
    setSmsForm,
    showPassword,
    setShowPassword,
  } = useServicesContext()

  const handleChange = (e) => {
    const { name, value } = e.target
    setSmsForm({ ...smsForm, [name]: value })
  }

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev)

  return (
    <div className="space-y-6">
      {/* Header */}
      <h1 className="text-3xl font-bold pb-6 text-[#008080]">QR Code Generator for SMS</h1>

      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="genderName"
          placeholder="Enter Name"
          value={smsForm.genderName}
          onChange={handleChange}
          className="border p-2 rounded shadow-sm w-full"
        />
        <input
          type="text"
          name="messageType"
          placeholder="Type of Message"
          value={smsForm.messageType}
          onChange={handleChange}
          className="border p-2 rounded shadow-sm w-full"
        />
        <textarea
          name="textMessage"
          placeholder="Enter Message"
          value={smsForm.textMessage}
          onChange={handleChange}
          rows={3}
          className="border p-2 rounded shadow-sm w-full md:col-span-2"
        />
        <input
          type="date"
          name="date"
          value={smsForm.date}
          onChange={handleChange}
          className="border p-2 rounded shadow-sm w-full"
        />
        <div className="relative w-full">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Enter Password"
            value={smsForm.password}
            onChange={handleChange}
            className="border p-2 rounded shadow-sm w-full pr-10"
          />
          <button
            type="button"
            className="absolute right-3 top-2 text-gray-600"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="mt-4 w-full bg-[#008080] text-white font-semibold py-2 rounded hover:bg-[#006666] transition"
      >
        Submit
      </button>
    </div>
  )
}

export default SmsContent
