'use client'

import React, { useState } from 'react'
import Image from 'next/image'

export default function FormContent() {
    const [formData, setFormData] = useState({
        formName: '',
        formDescription: '',
        formUrl: '',
        videoUrl: '',
        manual: null,
        contactEmail: '',
        contactPhone: '',
        password: '',
        selectedTemplate: null,
    })

    const [formImage, setFormImage] = useState(null)

    const handleChange = (e) => {
        const { id, value, type, files } = e.target
        if (type === 'file') {
            const file = files[0]
            if (file && id === 'formImage') {
                setFormImage(URL.createObjectURL(file))
            } else if (file && id === 'manual') {
                setFormData((prev) => ({ ...prev, manual: file }))
            }
        } else {
            setFormData((prev) => ({ ...prev, [id]: value }))
        }
    }

    const selectTemplate = (index) => {
        setFormData((prev) => ({ ...prev, selectedTemplate: index }))
    }

    return (
        <div className="min-h-screen flex bg-gradient-to-br from-[#008080] to-[#006666] text-white font-sans">
            {/* Left Form Section */}
            <div className="w-full md:w-1/2 h-screen overflow-y-auto bg-white text-black p-6 space-y-6">
                <h1 className="text-2xl font-bold text-[#008080]">Form QR Generator</h1>

                {/* Image Upload */}
                <div>
                    <label className="font-semibold">Form Image (500×500)</label>
                    <input
                        type="file"
                        id="formImage"
                        accept="image/*"
                        onChange={handleChange}
                        className="border border-gray-300 px-3 py-2 rounded w-full"
                    />
                </div>

                {/* Template Selector */}
                <div>
                    <label className="font-semibold">Select a Template</label>
                    <div className="grid grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div
                                key={i}
                                onClick={() => selectTemplate(i)}
                                className={`cursor-pointer border p-1 rounded-lg ${formData.selectedTemplate === i
                                        ? 'border-teal-600 ring-2 ring-teal-400'
                                        : 'border-gray-300'
                                    }`}
                            >
                                <Image
                                    src={`/templates/template${i}.png`}
                                    alt={`Template ${i}`}
                                    width={80}
                                    height={80}
                                    className="rounded-md object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>
                {/* Input Fields */}
                <input
                    id="formName"
                    type="text"
                    value={formData.formName}
                    onChange={handleChange}
                    placeholder="Form Name"
                    className="border border-gray-300 px-3 py-2 rounded w-full"
                />
                <textarea
                    id="formDescription"
                    value={formData.formDescription}
                    onChange={handleChange}
                    placeholder="Form Description"
                    rows={3}
                    className="border border-gray-300 px-3 py-2 rounded w-full"
                />
                <input
                    id="formUrl"
                    type="url"
                    value={formData.formUrl}
                    onChange={handleChange}
                    placeholder="Form URL"
                    className="border border-gray-300 px-3 py-2 rounded w-full"
                />
                <input
                    id="videoUrl"
                    type="url"
                    value={formData.videoUrl}
                    onChange={handleChange}
                    placeholder="Video URL"
                    className="border border-gray-300 px-3 py-2 rounded w-full"
                />
                {/* Manual PDF */}
                <div>
                    <label className="font-semibold">Form Manual</label>
                    <input
                        type="file"
                        id="manual"
                        onChange={handleChange}
                        className="border border-gray-300 px-3 py-2 rounded w-full"
                    />
                </div>
                <input
                    id="contactEmail"
                    type="email"
                    value={formData.contactEmail}
                    onChange={handleChange}
                    placeholder="Contact Email"
                    className="border border-gray-300 px-3 py-2 rounded w-full"
                />
                <input
                    id="contactPhone"
                    type="tel"
                    value={formData.contactPhone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className="border border-gray-300 px-3 py-2 rounded w-full"
                />
                <input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="QR Code Password"
                    className="border border-gray-300 px-3 py-2 rounded w-full"
                />
                <button className="w-full bg-[#008080] text-white py-2 rounded hover:bg-[#006666] transition">
                    Generate QR Code
                </button>
            </div>
            {/* Right Preview Section */}
            <div className="hidden md:flex w-1/3 items-center justify-center relative">
                <div
                    className="fixed mr-0 mt-12 w-[300px] h-[550px] bg-black rounded-[40px] border-[12px] border-gray-900 shadow-2xl"
                    style={{
                        backgroundImage: formData.selectedTemplate
                            ? `url(/templates/template${formData.selectedTemplate}.png)`
                            : 'none',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-b-xl z-30"></div>
                    <div className="absolute inset-0 bg-white overflow-y-auto p-4 text-black rounded-[28px] space-y-4">
                        {formImage && (
                            <Image
                                src={formImage}
                                alt="Form Preview"
                                width={280}
                                height={280}
                                className="rounded-md w-full object-cover"
                            />
                        )}
                        <h2 className="text-xl font-bold text-[#008080] mt-10 text-center">{formData.formName}</h2>
                        <p className="text-sm text-gray-700">{formData.formDescription}</p>

                        {formData.formUrl && (
                            <a
                                href={formData.formUrl}
                                target="_blank"
                                className="text-teal-600 underline block"
                            >
                                🔗 Form Link
                            </a>
                        )}
                        {formData.videoUrl && (
                            <a
                                href={formData.videoUrl}
                                target="_blank"
                                className="text-teal-600 underline block"
                            >
                                🎥 Video Link
                            </a>
                        )}
                        <p className="text-sm">📧 {formData.contactEmail}</p>
                        <p className="text-sm">📞 {formData.contactPhone}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
