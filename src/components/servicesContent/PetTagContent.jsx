'use client'

import React, { useState, useEffect } from 'react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const Toggle = ({ checked, onChange }) => (
    <label className="inline-flex items-center cursor-pointer">
        <input
            type="checkbox"
            className="sr-only peer"
            checked={checked}
            onChange={onChange}
        />
        <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-[#008080] relative transition-all">
            <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-5" />
        </div>
    </label>
)

const DropdownSelect = ({ options, value, onChange, placeholder }) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="relative">
            <button
                className="w-full flex justify-between items-center border px-3 py-2 rounded bg-white"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className={value ? '' : 'text-gray-400'}>
                    {value || placeholder}
                </span>
                <svg
                    className={`w-4 h-4 ml-2 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            {isOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border rounded shadow-lg">
                    {options.map((option) => (
                        <div
                            key={option.value}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                                onChange(option.value)
                                setIsOpen(false)
                            }}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default function PetIDTagPage() {
    const [formData, setFormData] = useState({
        tagTitle: '',
        mainImage: null,
        ownerInfo: {
            name: '',
            phone: '',
            email: '',
            address: '',
            visible: true
        },
        pet: {
            name: '',
            breed: '',
            species: '',
            gender: '',
            birthDate: '',
            color: '',
            microchip: '',
            specialNeeds: '',
            vetInfo: '',
            diet: '',
            images: [],
            visible: true
        },
        emergencyContacts: [
            { name: '', relationship: '', phone: '', visible: true }
        ],
        additionalInfo: [
            { type: '', label: '', value: '', visible: true, placeholder: '' }
        ]
    })

    const [isAnimating, setIsAnimating] = useState(false)

    const additionalInfoOptions = [
        { value: 'phone', label: 'Phone Number' },
        { value: 'email', label: 'Email Address' },
        { value: 'address', label: 'Physical Address' },
        { value: 'link', label: 'Website Link' },
        { value: 'video', label: 'Video Message' },
        { value: 'medical', label: 'Medical Records' }
    ]

    // Pre-defined templates with images
    const templates = [
        {
            label: "Blank Form",
            image: null,
            data: {
                tagTitle: '',
                mainImage: null,
                ownerInfo: {
                    name: '',
                    phone: '',
                    email: '',
                    address: '',
                    visible: true
                },
                pet: {
                    name: '',
                    breed: '',
                    species: '',
                    gender: '',
                    birthDate: '',
                    color: '',
                    microchip: '',
                    specialNeeds: '',
                    vetInfo: '',
                    diet: '',
                    images: [],
                    visible: true
                },
                emergencyContacts: [
                    { name: '', relationship: '', phone: '', visible: true }
                ],
                additionalInfo: [
                    { type: '', label: '', value: '', visible: true, placeholder: '' }
                ]
            }
        },
        {
            label: "Dog Template",
            image: "https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
            data: {
                tagTitle: 'Lost Dog: [Pet Name]',
                ownerInfo: {
                    name: 'John Doe',
                    phone: '9876543210',
                    email: 'john.doe@example.com',
                    address: '123 Main St, Anytown',
                    visible: true
                },
                pet: {
                    name: 'Buddy',
                    breed: 'Golden Retriever',
                    species: 'Dog',
                    gender: 'Male',
                    birthDate: '2022-03-15',
                    color: 'Golden, white paws',
                    microchip: 'ABC123456789',
                    specialNeeds: 'Friendly with kids, afraid of loud noises.',
                    vetInfo: 'Happy Tails Vet Clinic, Dr. Smith, 0123456789',
                    diet: 'Grain-free kibble, no chicken.',
                    images: [],
                    visible: true
                },
                emergencyContacts: [
                    { name: 'Jane Doe', relationship: 'Spouse', phone: '9876543211', visible: true }
                ],
                additionalInfo: []
            }
        },
        {
            label: "Cat Template",
            image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
            data: {
                tagTitle: 'Missing Cat: [Pet Name]',
                ownerInfo: {
                    name: 'Alice Wonderland',
                    phone: '9988776655',
                    email: 'alice@example.com',
                    address: '456 Wonderland Ave, Catville',
                    visible: true
                },
                pet: {
                    name: 'Whiskers',
                    breed: 'Siamese',
                    species: 'Cat',
                    gender: 'Female',
                    birthDate: '2023-01-01',
                    color: 'Cream with brown points',
                    microchip: 'XYZ987654321',
                    specialNeeds: 'Indoor cat only, timid around strangers.',
                    vetInfo: 'Purrfect Care Clinic, Dr. Jones, 0987654321',
                    diet: 'Wet food twice a day, sensitive stomach formula.',
                    images: [],
                    visible: true
                },
                emergencyContacts: [],
                additionalInfo: []
            }
        },
        {
            label: "Bird Template",
            image: "https://images.unsplash.com/photo-1551085254-e96b210db58a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
            data: {
                tagTitle: 'Lost Bird: [Pet Name]',
                ownerInfo: {
                    name: 'Sam Wilson',
                    phone: '9876543222',
                    email: 'sam.wilson@example.com',
                    address: '789 Sky Lane, Birdtown',
                    visible: true
                },
                pet: {
                    name: 'Sky',
                    breed: 'Parrot',
                    species: 'Bird',
                    gender: 'Female',
                    birthDate: '2021-07-20',
                    color: 'Green with red highlights',
                    microchip: 'BIRD123456',
                    specialNeeds: 'Needs daily interaction, can mimic speech.',
                    vetInfo: 'Avian Specialists, Dr. Feather, 0123456788',
                    diet: 'Seeds, fruits, and vegetables daily.',
                    images: [],
                    visible: true
                },
                emergencyContacts: [],
                additionalInfo: []
            }
        }
    ]

    const handleMainImageChange = (event) => {
        const file = event.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = () => {
                setIsAnimating(true)
                setFormData(prev => ({
                    ...prev,
                    mainImage: reader.result
                }))
                setTimeout(() => setIsAnimating(false), 1000)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleToggleChange = (section, index) => {
        const updated = [...formData[section]]
        updated[index].visible = !updated[index].visible
        setFormData({ ...formData, [section]: updated })
    }

    const handleOwnerToggle = () => {
        setFormData(prev => ({
            ...prev,
            ownerInfo: {
                ...prev.ownerInfo,
                visible: !prev.ownerInfo.visible
            }
        }))
    }

    const handlePetToggle = () => {
        setFormData(prev => ({
            ...prev,
            pet: {
                ...prev.pet,
                visible: !prev.pet.visible
            }
        }))
    }

    const handleAdditionalInfoChange = (index, field, value) => {
        const updated = [...formData.additionalInfo]
        updated[index][field] = value

        // Set placeholder based on type
        if (field === 'type') {
            updated[index].placeholder = getPlaceholder(value)
            updated[index].label = additionalInfoOptions.find(opt => opt.value === value)?.label || ''
        }

        setFormData({ ...formData, additionalInfo: updated })
    }

    const getPlaceholder = (type) => {
        switch (type) {
            case 'phone': return '+91-0000000000'
            case 'email': return 'example@mail.com'
            case 'address': return 'Enter physical address'
            case 'link': return 'https://yourlink.com'
            case 'video': return 'Upload video'
            case 'medical': return 'Enter medical info'
            default: return ''
        }
    }

    const handlePetChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            pet: {
                ...prev.pet,
                [field]: value
            }
        }))
    }

    const handleOwnerChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            ownerInfo: {
                ...prev.ownerInfo,
                [field]: value
            }
        }))
    }

    const handleEmergencyContactChange = (index, field, value) => {
        const updated = [...formData.emergencyContacts]
        updated[index][field] = value
        setFormData({ ...formData, emergencyContacts: updated })
    }

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files)
        if (!files.length) return

        const readers = files.map(file => {
            const reader = new FileReader()
            return new Promise(resolve => {
                reader.onload = () => resolve(reader.result)
                reader.readAsDataURL(file)
            })
        })

        Promise.all(readers).then(newImages => {
            setFormData(prev => ({
                ...prev,
                pet: {
                    ...prev.pet,
                    images: [...prev.pet.images, ...newImages]
                }
            }))
        })
    }

    const removeImage = (index) => {
        setFormData(prev => ({
            ...prev,
            pet: {
                ...prev.pet,
                images: prev.pet.images.filter((_, i) => i !== index)
            }
        }))
    }

    const handleVideoUpload = (e, index) => {
        const file = e.target.files[0]
        if (!file) return

        const reader = new FileReader()
        reader.onload = () => {
            const updated = [...formData.additionalInfo]
            updated[index].value = reader.result
            setFormData({ ...formData, additionalInfo: updated })
        }
        reader.readAsDataURL(file)
    }

    const addAdditionalInfoField = () => {
        setFormData(prev => ({
            ...prev,
            additionalInfo: [
                ...prev.additionalInfo,
                { type: '', label: '', value: '', visible: true, placeholder: '' }
            ]
        }))
    }

    const removeAdditionalInfoField = (index) => {
        const updated = [...formData.additionalInfo]
        updated.splice(index, 1)
        setFormData({ ...formData, additionalInfo: updated })
    }

    const handleApplyTemplate = (templateLabel) => {
        const selectedTemplate = templates.find(t => t.label === templateLabel)
        if (selectedTemplate) {
            setFormData(prev => ({
                ...prev,
                ...selectedTemplate.data,
                // Do not override mainImage if it exists, or clear it if the template doesn't have one
                mainImage: prev.mainImage || selectedTemplate.data.mainImage,
                // Ensure images array is not null if template has none
                pet: {
                    ...prev.pet,
                    ...selectedTemplate.data.pet,
                    images: selectedTemplate.data.pet.images || []
                },
                // Ensure emergencyContacts array is not null if template has none
                emergencyContacts: selectedTemplate.data.emergencyContacts || [],
                // Ensure additionalInfo array is not null if template has none
                additionalInfo: selectedTemplate.data.additionalInfo || []
            }))
        }
    }

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        adaptiveHeight: true
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-50 to-teal-100 text-gray-800 font-sans">
            <nav className="bg-teal-700 text-white py-4 px-6 sticky top-0 z-50 shadow-md">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <h1 className="text-xl font-bold">Pet ID Tag Creator</h1>
                </div>
            </nav>

            <div className="max-w-4xl mx-auto px-4 py-6">
                <div className="bg-white p-6 rounded-xl shadow-lg space-y-6">
                    <h2 className="text-2xl font-bold text-teal-700">Create Pet ID Tag</h2>

                    {/* --- Templates Section --- */}
                    <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                        <h3 className="text-lg font-semibold text-teal-700 mb-3">Choose a Template</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {templates.map((template) => (
                                <div 
                                    key={template.label}
                                    onClick={() => handleApplyTemplate(template.label)}
                                    className="cursor-pointer transition-all hover:scale-105"
                                >
                                    <div className="relative aspect-square rounded-lg overflow-hidden border-2 border-gray-200 hover:border-teal-400">
                                        {template.image ? (
                                            <img 
                                                src={template.image} 
                                                alt={template.label}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                                <div className="text-center p-4">
                                                    <svg className="w-10 h-10 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                    </svg>
                                                    <p className="mt-2 text-sm text-gray-500">Blank Template</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <p className="mt-2 text-sm font-medium text-center">{template.label}</p>
                                </div>
                            ))}
                        </div>
                        <p className="text-sm text-gray-500 mt-3">Click on a template to pre-fill the form. Your current inputs might be overwritten.</p>
                    </div>
                    {/* --- End Templates Section --- */}

                    {/* Main Image Upload Card */}
                    <div className="p-5 bg-gray-50 rounded-lg border border-gray-200">
                        <label className="block mb-3 text-sm font-medium text-gray-700">
                            Main Pet Image (Displayed as Profile)
                        </label>
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                {formData.mainImage ? (
                                    <div className={`w-20 h-20 rounded-full overflow-hidden border-2 border-teal-300 shadow-md ${isAnimating ? 'animate-pulse' : ''}`}>
                                        <img
                                            src={formData.mainImage}
                                            alt="Main Pet"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ) : (
                                    <div className="w-20 h-20 rounded-full bg-gray-200 border-2 border-dashed border-gray-400 flex items-center justify-center">
                                        <span className="text-gray-500 text-xs text-center">No Image</span>
                                    </div>
                                )}
                            </div>
                            <div className="flex-1">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleMainImageChange}
                                    className="block w-full text-sm text-gray-500
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-md file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-teal-100 file:text-teal-700
                                    hover:file:bg-teal-200"
                                />
                                <p className="text-xs text-gray-500 mt-1">This will be displayed as the main profile image</p>
                            </div>
                        </div>
                    </div>

                    {/* Tag Title Card */}
                    <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                        <h3 className="text-lg font-semibold text-teal-700 mb-3">Tag Information</h3>
                        <input
                            value={formData.tagTitle}
                            onChange={(e) => setFormData({ ...formData, tagTitle: e.target.value })}
                            placeholder="Give your pet tag a title"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                        />
                    </div>

                    {/* Owner Information Card */}
                    <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="text-lg font-semibold text-teal-700">Owner Information</h3>
                            <Toggle checked={formData.ownerInfo.visible} onChange={handleOwnerToggle} />
                        </div>
                        {formData.ownerInfo.visible && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                    <input
                                        placeholder="Your name"
                                        value={formData.ownerInfo.name}
                                        onChange={(e) => handleOwnerChange('name', e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                    <input
                                        placeholder="Phone number"
                                        value={formData.ownerInfo.phone}
                                        onChange={(e) => handleOwnerChange('phone', e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input
                                        placeholder="Email address"
                                        value={formData.ownerInfo.email}
                                        onChange={(e) => handleOwnerChange('email', e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                    <input
                                        placeholder="Your address"
                                        value={formData.ownerInfo.address}
                                        onChange={(e) => handleOwnerChange('address', e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Pet Information Card */}
                    <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="text-lg font-semibold text-teal-700">Pet Information</h3>
                            <Toggle checked={formData.pet.visible} onChange={handlePetToggle} />
                        </div>

                        {formData.pet.visible && (
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Pet Name*</label>
                                        <input
                                            placeholder="Buddy"
                                            value={formData.pet.name}
                                            onChange={(e) => handlePetChange('name', e.target.value)}
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Species</label>
                                        <input
                                            placeholder="Dog, Cat, etc"
                                            value={formData.pet.species}
                                            onChange={(e) => handlePetChange('species', e.target.value)}
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Breed</label>
                                        <input
                                            placeholder="Golden Retriever"
                                            value={formData.pet.breed}
                                            onChange={(e) => handlePetChange('breed', e.target.value)}
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                                        <input
                                            placeholder="Male/Female"
                                            value={formData.pet.gender}
                                            onChange={(e) => handlePetChange('gender', e.target.value)}
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Birth Date</label>
                                        <input
                                            type="date"
                                            value={formData.pet.birthDate}
                                            onChange={(e) => handlePetChange('birthDate', e.target.value)}
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Color/Markings</label>
                                        <input
                                            placeholder="Golden, white paws"
                                            value={formData.pet.color}
                                            onChange={(e) => handlePetChange('color', e.target.value)}
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Microchip ID</label>
                                        <input
                                            placeholder="Microchip number"
                                            value={formData.pet.microchip}
                                            onChange={(e) => handlePetChange('microchip', e.target.value)}
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Special Needs/Medical Conditions</label>
                                        <textarea
                                            placeholder="Any special care requirements"
                                            value={formData.pet.specialNeeds}
                                            onChange={(e) => handlePetChange('specialNeeds', e.target.value)}
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                                            rows="3"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Veterinarian Information</label>
                                        <textarea
                                            placeholder="Vet name and contact"
                                            value={formData.pet.vetInfo}
                                            onChange={(e) => handlePetChange('vetInfo', e.target.value)}
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                                            rows="2"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Dietary Requirements</label>
                                        <textarea
                                            placeholder="Special diet or feeding instructions"
                                            value={formData.pet.diet}
                                            onChange={(e) => handlePetChange('diet', e.target.value)}
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                                            rows="2"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Additional Pet Photos</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        multiple
                                        className="block w-full text-sm text-gray-500
                                        file:mr-4 file:py-2 file:px-4
                                        file:rounded-md file:border-0
                                        file:text-sm file:font-semibold
                                        file:bg-teal-100 file:text-teal-700
                                        hover:file:bg-teal-200"
                                    />
                                    {formData.pet.images.length > 0 && (
                                        <div className="mt-3 grid grid-cols-3 gap-3">
                                            {formData.pet.images.map((img, index) => (
                                                <div key={index} className="relative group">
                                                    <img src={img} alt={`pet-${index}`} className="h-24 w-full object-cover rounded-lg" />
                                                    <button
                                                        onClick={() => removeImage(index)}
                                                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        ×
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Emergency Contacts Card */}
                    <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                        <h3 className="text-lg font-semibold text-teal-700 mb-3">Emergency Contacts</h3>
                        {formData.emergencyContacts.map((contact, index) => (
                            <div key={index} className="mb-4 last:mb-0 border-b pb-4 last:border-b-0 last:pb-0">
                                <div className="flex justify-between items-center mb-3">
                                    <h4 className="font-medium text-teal-600">Contact #{index + 1}</h4>
                                    <div className="flex items-center">
                                        <Toggle checked={contact.visible} onChange={() => handleToggleChange('emergencyContacts', index)} />
                                        {formData.emergencyContacts.length > 1 && (
                                            <button
                                                onClick={() => {
                                                    const updated = [...formData.emergencyContacts]
                                                    updated.splice(index, 1)
                                                    setFormData({ ...formData, emergencyContacts: updated })
                                                }}
                                                className="ml-3 text-red-500 hover:text-red-700 transition-colors"
                                            >
                                                Remove
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {contact.visible && (
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                            <input
                                                placeholder="Contact name"
                                                value={contact.name}
                                                onChange={(e) => handleEmergencyContactChange(index, 'name', e.target.value)}
                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Relationship</label>
                                            <input
                                                placeholder="Vet, family, etc"
                                                value={contact.relationship}
                                                onChange={(e) => handleEmergencyContactChange(index, 'relationship', e.target.value)}
                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                            <input
                                                placeholder="Phone number"
                                                value={contact.phone}
                                                onChange={(e) => handleEmergencyContactChange(index, 'phone', e.target.value)}
                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                        <button
                            onClick={() => setFormData(prev => ({
                                ...prev,
                                emergencyContacts: [...prev.emergencyContacts, {
                                    name: '', relationship: '', phone: '', visible: true
                                }]
                            }))}
                            className="mt-3 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Add Emergency Contact
                        </button>
                    </div>

                    {/* Additional Information Card */}
                    <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                        <h3 className="text-lg font-semibold text-teal-700 mb-3">Additional Information</h3>
                        {formData.additionalInfo.map((field, index) => (
                            <div key={index} className="mb-4 last:mb-0">
                                <div className="flex justify-between items-center mb-2">
                                    <div className="w-full">
                                        <DropdownSelect
                                            options={additionalInfoOptions}
                                            value={field.type}
                                            onChange={(value) => handleAdditionalInfoChange(index, 'type', value)}
                                            placeholder="Select information type"
                                        />
                                    </div>
                                    <div className="ml-3 flex items-center">
                                        <Toggle checked={field.visible} onChange={() => handleToggleChange('additionalInfo', index)} />
                                        {formData.additionalInfo.length > 1 && (
                                            <button
                                                onClick={() => removeAdditionalInfoField(index)}
                                                className="ml-3 text-red-500 hover:text-red-700 transition-colors"
                                            >
                                                ×
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {field.type && (
                                    <div className="mt-2">
                                        {field.type === 'video' ? (
                                            <div>
                                                <input
                                                    type="file"
                                                    accept="video/*"
                                                    onChange={(e) => handleVideoUpload(e, index)}
                                                    className="block w-full text-sm text-gray-500
                                                    file:mr-4 file:py-2 file:px-4
                                                    file:rounded-md file:border-0
                                                    file:text-sm file:font-semibold
                                                    file:bg-teal-100 file:text-teal-700
                                                    hover:file:bg-teal-200"
                                                />
                                                {field.value && (
                                                    <div className="mt-2">
                                                        <video controls className="w-full rounded-lg">
                                                            <source src={field.value} type="video/mp4" />
                                                        </video>
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                                                <input
                                                    value={field.value}
                                                    onChange={(e) => handleAdditionalInfoChange(index, 'value', e.target.value)}
                                                    placeholder={field.placeholder}
                                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                                                />
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                        <button
                            onClick={addAdditionalInfoField}
                            className="mt-3 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Add More Information
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}