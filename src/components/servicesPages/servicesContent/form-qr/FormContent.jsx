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

    const templateList = [
        "temp1.webp",
        "temp2.webp",
        "temp3.webp",
        "temp4.webp",
    ]

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

    const selectTemplate = (filename) => {
        setFormData((prev) => ({ ...prev, selectedTemplate: filename }))
    }

    return (
<<<<<<< HEAD:src/components/servicesPages/servicesLayout/contentTabs/FormContent.jsx
        <div className="min-h-screen flex text-white font-sans bg-white">
            <div className="w-full h-screen overflow-y-auto text-black p-6 space-y-6">
=======
        <div className=" flex bg-gradient-to-br from-[#008080] to-[#006666] text-white font-sans">
            {/* Left Form Section */}
            <div className="w-full  overflow-y-auto bg-white text-black p-6 space-y-6">
>>>>>>> 8428f6bc963f2b9e53dfee6c6c8b7ce69a225361:src/components/servicesPages/servicesContent/form-qr/FormContent.jsx
                <h1 className="text-2xl font-bold text-[#008080]">Form QR Generator</h1>

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

                <div>
                    <label className="font-semibold">Select a Template</label>
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
                        {templateList.map((filename) => (
                            <div
                                key={filename}
                                onClick={() => selectTemplate(filename)}
                                className={`cursor-pointer border p-1 rounded-lg ${formData.selectedTemplate === filename
                                    ? 'border-teal-600 ring-2 ring-teal-400'
                                    : 'border-gray-300'
                                    }`}
                            >
                                <Image
                                    src={`/form-templates/${filename}`}
                                    alt={`Template ${filename}`}
                                    width={80}
                                    height={80}
                                    className="rounded-md object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>

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
<<<<<<< HEAD:src/components/servicesPages/servicesLayout/contentTabs/FormContent.jsx
=======

>>>>>>> 8428f6bc963f2b9e53dfee6c6c8b7ce69a225361:src/components/servicesPages/servicesContent/form-qr/FormContent.jsx
        </div>
    )
}
