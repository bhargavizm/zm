'use client'

import React, { useState } from 'react'
import TextMessagePreview from './TextMsgPre'

export default function TextMessageForm() {
  const [formData, setFormData] = useState({
    senderName: '',
    messageType: '',
    textMessage: '',
    dateTime: '',
    senderAddress: '',
    senderMap: '',
    password: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className="flex flex-col lg:flex-row justify-between gap-6 p-4">
      {/* Form */}
      <form className="w-full lg:w-1/2 space-y-4">
        <h1 className="text-2xl font-bold text-center">QR Code Generator for Text Message</h1>

        {[
          ['Sender Name', 'senderName'],
          ['Type of Message', 'messageType'],
          ['Text Message', 'textMessage', 'textarea'],
          ['Date and Time', 'dateTime', 'datetime-local'],
          ['Sender Address', 'senderAddress', 'textarea'],
          ['Sender Map Link', 'senderMap'],
          ['Password', 'password', 'password'],
        ].map(([label, name, type = 'text']) => (
          <div key={name}>
            <label>{label}</label>
            {type === 'textarea' ? (
              <textarea
                name={name}
                className="w-full border p-2"
                placeholder={`Enter the ${label}`}
                value={formData[name]}
                onChange={handleChange}
              />
            ) : (
              <input
                type={type}
                name={name}
                className="w-full border p-2"
                placeholder={`Enter the ${label}`}
                value={formData[name]}
                onChange={handleChange}
              />
            )}
          </div>
        ))}

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
      </form>

      {/* Preview */}
      <TextMessagePreview data={formData} />
    </div>
  )
}
