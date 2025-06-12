'use client';

import React, { useState, useMemo, useCallback } from 'react';
import {
    Car, CreditCard, FileText, User, Phone, MapPin,
    Lock, Calendar, Upload, Eye, EyeOff,
    PlusCircle, X, Video, Link, Image as ImageIcon, HelpCircle,
    Bike, Truck
} from 'lucide-react'; // Switched to lucide-react for icons

import { motion, AnimatePresence } from 'framer-motion';

// --- Color Palette based on #008080 (Teal) ---
const COLORS = {
    primary: '#008080',       // Base Teal
    primaryLight: '#339999',  // Lighter Teal
    primaryDark: '#006666',   // Darker Teal
    primaryBg: '#e0f2f2',     // Very light teal for backgrounds
    textPrimary: '#004d4d',   // Dark teal for text
    textLight: '#f0fafa',     // Off-white for text on dark backgrounds
    border: '#66b2b2',        // Medium teal for borders
    redDanger: '#dc2626',     // Standard red for delete/danger
    redDangerHover: '#b91c1c', // Darker red for hover
};

// --- Reusable Components ---

// Simple Image component fallback for environments without Next.js Image optimization
const Image = ({ src, alt, width, height, className }) => (
    <img src={src} alt={alt} width={width} height={height} className={className} />
);

// Base Input Component
function Input({ label, name, value, onChange, type = 'text', icon, className = '', placeholder = '' }) {
    return (
        <div className={className}>
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
                    placeholder={placeholder}
                    className="pl-10 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent"
                />
            </div>
        </div>
    );
}

// Password Input Component with show/hide toggle
function PasswordInput({ label, name, value, onChange, icon, className = '' }) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className={className}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {icon}
                </div>
                <input
                    type={showPassword ? 'text' : 'password'}
                    name={name}
                    value={value}
                    onChange={onChange}
                    className="pl-10 pr-10 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent"
                />
                <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
            </div>
        </div>
    );
}

// Text Area Component
function TextArea({ label, name, value, onChange, className = '', placeholder = '' }) {
    return (
        <div className={className}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <textarea
                name={name}
                value={value}
                onChange={onChange}
                rows={3}
                placeholder={placeholder}
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent"
            ></textarea>
        </div>
    );
}

// File Input Component
function FileInput({ label, name, multiple, onChange, icon, className = '' }) {
    return (
        <div className={className}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {icon}
                </div>
                <input
                    type="file"
                    name={name}
                    multiple={multiple}
                    onChange={onChange}
                    className="pl-10 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#e0f2f2] file:text-[#006666] hover:file:bg-[#cce5e5] hover:file:cursor-pointer"
                />
            </div>
        </div>
    );
}

// Modal/Popup Component
function Modal({ show, onClose, title, message, children }) {
    if (!show) return null;

    return (
        <AnimatePresence>
            {show && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm relative"
                    >
                        <h3 className="text-xl font-bold mb-4" style={{ color: COLORS.textPrimary }}>{title}</h3>
                        <p className="text-gray-700 mb-6">{message}</p>
                        {children}
                        <button
                            onClick={onClose}
                            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                            aria-label="Close modal"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

// --- Main Component ---

export default function App() { // Renamed to App as it's the main component for the immersive
    const [vehicleTypeOption, setVehicleTypeOption] = useState('select');
    const [customVehicleType, setCustomVehicleType] = useState('');
    const [nfcEnabled, setNfcEnabled] = useState(false);
    const [showNfcPopup, setShowNfcPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [popupTitle, setPopupTitle] = useState('');
    const [isGeolocationError, setIsGeolocationError] = useState(false); // New state to differentiate popup messages

    // Placeholder template images for vehicle QR code design
    const templateImages = [
        "https://placehold.co/100x120/008080/ffffff?text=Style+1",
        "https://placehold.co/100x120/006666/ffffff?text=Style+2",
        "https://placehold.co/100x120/339999/ffffff?text=Style+3",
        "https://placehold.co/100x120/004d4d/ffffff?text=Style+4",
    ];
    const [selectedTemplate, setSelectedTemplate] = useState(templateImages[0]);

    const initialFields = useMemo(() => [
        { id: 'vehicleModel', section: 'vehicle', label: 'Vehicle Brand Name', name: 'vehicleModel', type: 'text', value: '', icon: <Car className="w-5 h-5 text-[#008080]" />, isRemovable: false, placeholder: 'e.g., Tesla Model 3' },
        { id: 'buyingDate', section: 'vehicle', label: 'Date of Buying', name: 'buyingDate', type: 'date', value: '', icon: <Calendar className="w-5 h-5 text-[#008080]" />, isRemovable: true },
        { id: 'vehicleImages', section: 'vehicle', label: 'Vehicle Images (Max 4)', name: 'vehicleImages', type: 'file', multiple: true, icon: <Upload className="w-5 h-5 text-[#008080]" />, isRemovable: true, fileType: 'vehicleImages' },
        { id: 'vehicleDesc', section: 'vehicle', label: 'Description of Vehicle', name: 'vehicleDesc', type: 'textarea', value: '', isRemovable: true, placeholder: 'Brief description of your vehicle...' },

        { id: 'rcNumber', section: 'registration', label: 'RC Number', name: 'rcNumber', type: 'text', value: '', icon: <CreditCard className="w-5 h-5 text-[#008080]" />, isRemovable: true, placeholder: 'Vehicle Registration No.' },
        { id: 'rcImages', section: 'registration', label: 'RC Images (Max 2)', name: 'rcImages', type: 'file', multiple: true, icon: <Upload className="w-5 h-5 text-[#008080]" />, isRemovable: true, fileType: 'rcImages' },
        { id: 'licenseImages', section: 'registration', label: 'Driving License (Max 3)', name: 'licenseImages', type: 'file', multiple: true, icon: <Upload className="w-5 h-5 text-[#008080]" />, isRemovable: true, fileType: 'licenseImages' },
        { id: 'insuranceImages', section: 'registration', label: 'Insurance (Max 6)', name: 'insuranceImages', type: 'file', multiple: true, icon: <Upload className="w-5 h-5 text-[#008080]" />, isRemovable: true, fileType: 'insuranceImages' },
        { id: 'pollutionImages', section: 'registration', label: 'Pollution Cert (Max 3)', name: 'pollutionImages', type: 'file', multiple: true, icon: <Upload className="w-5 h-5 text-[#008080]" />, isRemovable: true, fileType: 'pollutionImages' },
        { id: 'permitImages', section: 'registration', label: 'Permit Cert (Max 2)', name: 'permitImages', type: 'file', multiple: true, icon: <Upload className="w-5 h-5 text-[#008080]" />, isRemovable: true, fileType: 'permitImages' },

        { id: 'driverName', section: 'ownerDriver', label: 'Driver Name', name: 'driverName', type: 'text', value: '', icon: <User className="w-5 h-5 text-[#008080]" />, isRemovable: true, placeholder: 'Full Name' },
        { id: 'ownerName', section: 'ownerDriver', label: 'Owner Name', name: 'ownerName', type: 'text', value: '', icon: <User className="w-5 h-5 text-[#008080]" />, isRemovable: true, placeholder: 'Full Name' },
        { id: 'ownerDriverImage', section: 'ownerDriver', label: 'Owner/Driver Image', name: 'ownerDriverImage', type: 'file', multiple: false, icon: <Upload className="w-5 h-5 text-[#008080]" />, isRemovable: true, fileType: 'ownerDriverImage' },

        { id: 'contactNumber', section: 'contact', label: 'Contact Number', name: 'contactNumber', type: 'text', value: '', icon: <Phone className="w-5 h-5 text-[#008080]" />, isRemovable: true, placeholder: 'e.g., +91 9876543210' },
        { id: 'alternateContact', section: 'contact', label: 'Alternate Contact', name: 'alternateContact', type: 'text', value: '', icon: <Phone className="w-5 h-5 text-[#008080]" />, isRemovable: true, placeholder: 'Optional secondary number' },

        { id: 'address', section: 'location', label: 'Owner/Driver Address', name: 'address', type: 'textarea', value: '', isRemovable: true, placeholder: 'Full Address' },
        { id: 'mapLink', section: 'location', label: 'Location', name: 'mapLink', type: 'text', value: '', icon: <MapPin className="w-5 h-5 text-[#008080]" />, isRemovable: true, special: 'location', placeholder: 'Enter location or click to detect' },

        { id: 'password', section: 'security', label: 'Password', name: 'password', type: 'password', value: '', icon: <Lock className="w-5 h-5 text-[#008080]" />, isRemovable: true, placeholder: 'Set password for sensitive data' },

        // Template fields for dynamic additions
        { id: 'videoUrl_template', section: 'additional', label: 'Video URL', type: 'text', name: 'videoUrl', icon: <Video className="w-5 h-5 text-[#008080]" />, isRemovable: true, isTemplate: true, placeholder: 'Link to a promotional video' },
        { id: 'imageUrl_template', section: 'additional', label: 'Image URL', type: 'text', name: 'imageUrl', icon: <ImageIcon className="w-5 h-5 text-[#008080]" />, isRemovable: true, isTemplate: true, placeholder: 'Link to an external image' },
        { id: 'pdfLink_template', section: 'additional', label: 'PDF Link', type: 'text', name: 'pdfLink', icon: <FileText className="w-5 h-5 text-[#008080]" />, isRemovable: true, isTemplate: true, placeholder: 'Link to a PDF document' },
        { id: 'websiteLink_template', section: 'additional', label: 'Website Link', type: 'text', name: 'websiteLink', icon: <Link className="w-5 h-5 text-[#008080]" />, isRemovable: true, isTemplate: true, placeholder: 'Link to your website' },
        { id: 'additionalText_template', section: 'additional', label: 'Additional Text Field', type: 'text', name: 'additionalText', icon: <FileText className="w-5 h-5 text-[#008080]" />, isRemovable: true, isTemplate: true, placeholder: 'Custom text field' },
        { id: 'additionalTextArea_template', section: 'additional', label: 'Additional Text Area', type: 'textarea', name: 'additionalTextArea', icon: <FileText className="w-5 h-5 text-[#008080]" />, isRemovable: true, isTemplate: true, placeholder: 'Custom multi-line text area' },
    ], []);

    const [fields, setFields] = useState(() => {
        return initialFields
            .filter(field => !field.isTemplate)
            .map(field => ({ ...field, id: `${field.id}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}` }));
    });

    const [files, setFiles] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [locationStatus, setLocationStatus] = useState('idle'); // idle | fetching | success | error

    const handleFieldChange = useCallback((id, value) => {
        setFields(prevFields =>
            prevFields.map(field =>
                field.id === id ? { ...field, value: value } : field
            )
        );
    }, []);

    const handleFileChange = useCallback((id, e, multiple) => {
        const fileList = multiple ? Array.from(e.target.files) : e.target.files[0];
        setFiles(prevFiles => ({ ...prevFiles, [id]: fileList }));
    }, []);

    const addField = useCallback((templateId) => {
        const template = initialFields.find(f => f.id === templateId);
        if (template) {
            const newField = { ...template, id: `${template.name}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`, value: '', isTemplate: false };
            setFields(prevFields => [...prevFields, newField]);
        }
    }, [initialFields]);

    const removeField = useCallback((id) => {
        setFields(prevFields => prevFields.filter(field => field.id !== id));
    }, []);

    const getCurrentLocation = useCallback(() => {
        if (!navigator.geolocation) {
            setPopupTitle('Geolocation Error');
            setPopupMessage('Geolocation is not supported by your browser.');
            setIsGeolocationError(true);
            setShowNfcPopup(true);
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
                        const mapLinkField = fields.find(f => f.name === 'mapLink');
                        if (mapLinkField) {
                            handleFieldChange(mapLinkField.id, address);
                        }
                        setLocationStatus('success');
                    })
                    .catch(() => {
                        const mapLinkField = fields.find(f => f.name === 'mapLink');
                        if (mapLinkField) {
                            handleFieldChange(mapLinkField.id, `${latitude}, ${longitude}`);
                        }
                        setLocationStatus('success');
                    });
            },
            (error) => {
                console.error("Error getting location:", error);
                setPopupTitle('Geolocation Error');
                setPopupMessage('Unable to retrieve your location. Please ensure location services are enabled and try again, or enter it manually.');
                setIsGeolocationError(true);
                setShowNfcPopup(true);
                setLocationStatus('error');
            }
        );
    }, [fields, handleFieldChange]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formDataToSubmit = {};
        fields.forEach(field => {
            formDataToSubmit[field.name] = field.value;
        });

        if (vehicleTypeOption === 'other') {
            formDataToSubmit.vehicleType = customVehicleType;
        } else if (vehicleTypeOption !== 'select') {
            formDataToSubmit.vehicleType = vehicleTypeOption;
        }

        formDataToSubmit.nfcEnabled = nfcEnabled;
        formDataToSubmit.selectedTemplate = selectedTemplate; // Add selected template

        console.log("Final Form Data:", formDataToSubmit);
        console.log("Attached Files:", files);

        setTimeout(() => {
            setIsSubmitting(false);
            setPopupTitle('Submission Successful!');
            setPopupMessage('Your vehicle QR code details have been submitted. Check the console for the form data.');
            setIsGeolocationError(false); // Reset to false for submission success
            setShowNfcPopup(true);
        }, 2000);
    };

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

    const dynamicFieldVariants = {
        initial: { opacity: 0, height: 0, marginTop: 0, marginBottom: 0 },
        animate: { opacity: 1, height: 'auto', marginTop: '0.75rem', marginBottom: '0.75rem', transition: { duration: 0.3 } },
        exit: { opacity: 0, height: 0, marginTop: 0, marginBottom: 0, transition: { duration: 0.2 } },
    };

    const availableFieldsForDropdown = useMemo(() => {
        const currentFieldInstanceNames = new Set(fields.map(f => f.name));

        return initialFields.filter(templateField => {
            if (templateField.name === 'vehicleModel' && !templateField.isRemovable) {
                return false; // Mandatory field, never in dropdown to add
            }
            // Only show template fields or removable fields that are currently not in the form
            return templateField.isTemplate || (templateField.isRemovable && !currentFieldInstanceNames.has(templateField.name));
        });
    }, [fields, initialFields]);

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4 font-sans antialiased">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto"
            >
                <div>
                    <h1 className="text-3xl font-bold pb-6 text-[#008080]">
                        Vehicle QR Code Generator
                    </h1>
                    <div className="grid grid-cols-1 gap-10">
                        {/* Main Form Content Area */}
                        <div className="bg-white shadow-xl rounded-xl p-6 space-y-6">

                            {/* Page Templates Section */}
                            <div>
                                <h2 className="text-xl font-semibold mb-4 text-[#004d4d]">
                                    Page Templates (click to select)
                                </h2>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {templateImages.map((src, idx) => (
                                        <div
                                            key={idx}
                                            className={`border-2 rounded-md p-2 cursor-pointer transition hover:shadow-lg ${selectedTemplate === src
                                                ? "border-[#008080]"
                                                : "border-gray-300"
                                                }`}
                                            onClick={() => setSelectedTemplate(src)}
                                        >
                                            <Image
                                                src={src}
                                                alt={`Template ${idx + 1}`}
                                                width={100}
                                                height={120}
                                                className="object-cover rounded w-full h-auto"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* NFC Toggle */}
                                <div className="flex items-center justify-between p-4 rounded-lg bg-[#e0f2f2] border border-gray-200">
                                    <span className="text-lg font-medium text-[#004d4d]">Enable NFC (Premium Service)</span>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (!nfcEnabled) { // Only show popup if turning ON
                                                setPopupTitle('NFC Premium Service');
                                                setPopupMessage('Enabling NFC will activate premium services, which may incur an additional charge of up to ₹500.');
                                                setIsGeolocationError(false); // Not a geolocation error
                                                setShowNfcPopup(true);
                                            } else {
                                                setNfcEnabled(false);
                                            }
                                        }}
                                        className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-[#008080] ${nfcEnabled ? 'bg-[#008080]' : 'bg-gray-300'
                                            }`}
                                        aria-label={nfcEnabled ? 'NFC enabled' : 'NFC disabled'}
                                    >
                                        <span
                                            className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform duration-300 ${nfcEnabled ? 'translate-x-5' : 'translate-x-1'
                                                }`}
                                        >
                                            {/* Adjusted SVG to be generic check/cross */}
                                            <svg
                                                className="h-6 w-6 text-[#008080] transition-opacity duration-300"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                {nfcEnabled ? (
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                ) : (
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                )}
                                            </svg>
                                        </span>
                                    </button>
                                </div>

                                {/* Vehicle Information Section */}
                                <div className="p-4 rounded-lg bg-[#e0f2f2] border border-gray-200">
                                    <h2 className="text-xl font-semibold flex items-center space-x-2 mb-4 text-[#004d4d]">
                                        <Car className="w-6 h-6 text-[#006666]" /> {/* Adjusted icon size if needed */}
                                        <span>Vehicle Information</span>
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <AnimatePresence>
                                            {fields.filter(f => f.section === 'vehicle').map(field => (
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
                                                            placeholder={field.placeholder}
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
                                                    {field.type === 'file' && (
                                                        <FileInput
                                                            label={field.label}
                                                            name={field.name}
                                                            multiple={field.multiple}
                                                            onChange={(e) => handleFileChange(field.id, e, field.multiple)}
                                                            icon={field.icon}
                                                            className="flex-grow"
                                                        />
                                                    )}
                                                    {field.type === 'textarea' && (
                                                        <TextArea
                                                            label={field.label}
                                                            name={field.name}
                                                            value={field.value}
                                                            onChange={(e) => handleFieldChange(field.id, e.target.value)}
                                                            className="flex-grow"
                                                            placeholder={field.placeholder}
                                                        />
                                                    )}
                                                    {field.isRemovable && (
                                                        <button
                                                            type="button"
                                                            onClick={() => removeField(field.id)}
                                                            className="flex items-center justify-center h-8 w-8 rounded-full bg-red-100 text-red-600 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors shrink-0"
                                                            aria-label={`Remove ${field.label}`}
                                                        >
                                                            <X className="h-4 w-4" />
                                                        </button>
                                                    )}
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>

                                        {/* Type of Vehicle Dropdown */}
                                        <div className="flex-grow">
                                            <label htmlFor="vehicleTypeDropdown" className="block text-sm font-medium text-gray-700 mb-1">Type of Vehicle</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    {/* Using Lucide icons for vehicle types */}
                                                    {vehicleTypeOption === '2wheeler' && <Bike className="w-5 h-5 text-[#008080]" />}
                                                    {vehicleTypeOption === '3wheeler' && <Truck className="w-5 h-5 text-[#008080]" />} {/* No direct 3-wheeler, using truck for now */}
                                                    {vehicleTypeOption === '4wheeler' && <Car className="w-5 h-5 text-[#008080]" />}
                                                    {(vehicleTypeOption === 'other' || vehicleTypeOption === 'select') && <HelpCircle className="w-5 h-5 text-[#008080]" />}
                                                </div>
                                                <select
                                                    id="vehicleTypeDropdown"
                                                    value={vehicleTypeOption}
                                                    onChange={(e) => setVehicleTypeOption(e.target.value)}
                                                    className="pl-10 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent"
                                                >
                                                    <option value="select">Select Type</option>
                                                    <option value="2wheeler">2 Wheeler</option>
                                                    <option value="3wheeler">3 Wheeler</option>
                                                    <option value="4wheeler">4 Wheeler</option>
                                                    <option value="other">Other (Manual Entry)</option>
                                                </select>
                                            </div>
                                        </div>

                                        {/* Conditional input for custom vehicle type */}
                                        {vehicleTypeOption === 'other' && (
                                            <motion.div
                                                variants={dynamicFieldVariants}
                                                initial="initial"
                                                animate="animate"
                                                exit="exit"
                                                className="flex items-end gap-2"
                                            >
                                                <Input
                                                    label="Enter Vehicle Type Manually"
                                                    name="customVehicleType"
                                                    value={customVehicleType}
                                                    onChange={(e) => setCustomVehicleType(e.target.value)}
                                                    icon={<FileText className="w-5 h-5 text-[#008080]" />}
                                                    className="flex-grow"
                                                    placeholder="e.g., Bicycle, Bus"
                                                />
                                            </motion.div>
                                        )}
                                    </div>
                                </div>

                                {/* Registration Details Section */}
                                <div className="p-4 rounded-lg bg-[#e0f2f2] border border-gray-200">
                                    <h2 className="text-xl font-semibold flex items-center space-x-2 mb-4 text-[#004d4d]">
                                        <CreditCard className="w-6 h-6 text-[#006666]" />
                                        <span>Registration Details</span>
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <AnimatePresence>
                                            {fields.filter(f => f.section === 'registration').map(field => (
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
                                                            placeholder={field.placeholder}
                                                        />
                                                    )}
                                                    {field.type === 'file' && (
                                                        <FileInput
                                                            label={field.label}
                                                            name={field.name}
                                                            multiple={field.multiple}
                                                            onChange={(e) => handleFileChange(field.id, e, field.multiple)}
                                                            icon={field.icon}
                                                            className="flex-grow"
                                                        />
                                                    )}
                                                    {field.isRemovable && (
                                                        <button
                                                            type="button"
                                                            onClick={() => removeField(field.id)}
                                                            className="flex items-center justify-center h-8 w-8 rounded-full bg-red-100 text-red-600 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors shrink-0"
                                                            aria-label={`Remove ${field.label}`}
                                                        >
                                                            <X className="h-4 w-4" />
                                                        </button>
                                                    )}
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>
                                    </div>
                                </div>

                                {/* Owner/Driver Section */}
                                <div className="p-4 rounded-lg bg-[#e0f2f2] border border-gray-200">
                                    <h2 className="text-xl font-semibold flex items-center space-x-2 mb-4 text-[#004d4d]">
                                        <User className="w-6 h-6 text-[#006666]" />
                                        <span>Owner/Driver Details</span>
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <AnimatePresence>
                                            {fields.filter(f => f.section === 'ownerDriver').map(field => (
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
                                                            placeholder={field.placeholder}
                                                        />
                                                    )}
                                                    {field.type === 'file' && (
                                                        <FileInput
                                                            label={field.label}
                                                            name={field.name}
                                                            multiple={field.multiple}
                                                            onChange={(e) => handleFileChange(field.id, e, field.multiple)}
                                                            icon={field.icon}
                                                            className="flex-grow"
                                                        />
                                                    )}
                                                    {field.isRemovable && (
                                                        <button
                                                            type="button"
                                                            onClick={() => removeField(field.id)}
                                                            className="flex items-center justify-center h-8 w-8 rounded-full bg-red-100 text-red-600 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors shrink-0"
                                                            aria-label={`Remove ${field.label}`}
                                                        >
                                                            <X className="h-4 w-4" />
                                                        </button>
                                                    )}
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>
                                    </div>
                                </div>

                                {/* Contact Information Section */}
                                <div className="p-4 rounded-lg bg-[#e0f2f2] border border-gray-200">
                                    <h2 className="text-xl font-semibold flex items-center space-x-2 mb-4 text-[#004d4d]">
                                        <Phone className="w-6 h-6 text-[#006666]" />
                                        <span>Contact Information</span>
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <AnimatePresence>
                                            {fields.filter(f => f.section === 'contact').map(field => (
                                                <motion.div
                                                    key={field.id}
                                                    variants={dynamicFieldVariants}
                                                    initial="initial"
                                                    animate="animate"
                                                    exit="exit"
                                                    className="flex items-end gap-2"
                                                >
                                                    <Input
                                                        label={field.label}
                                                        name={field.name}
                                                        value={field.value}
                                                        onChange={(e) => handleFieldChange(field.id, e.target.value)}
                                                        icon={field.icon}
                                                        className="flex-grow"
                                                        placeholder={field.placeholder}
                                                    />
                                                    {field.isRemovable && (
                                                        <button
                                                            type="button"
                                                            onClick={() => removeField(field.id)}
                                                            className="flex items-center justify-center h-8 w-8 rounded-full bg-red-100 text-red-600 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors shrink-0"
                                                            aria-label={`Remove ${field.label}`}
                                                        >
                                                            <X className="h-4 w-4" />
                                                        </button>
                                                    )}
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>
                                    </div>
                                </div>

                                {/* Location Details Section */}
                                <div className="p-4 rounded-lg bg-[#e0f2f2] border border-gray-200">
                                    <h2 className="text-xl font-semibold flex items-center space-x-2 mb-4 text-[#004d4d]">
                                        <MapPin className="w-6 h-6 text-[#006666]" />
                                        <span>Location Details</span>
                                    </h2>
                                    <div className="space-y-4">
                                        <AnimatePresence>
                                            {fields.filter(f => f.section === 'location').map(field => (
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
                                                            className="flex-grow"
                                                            placeholder={field.placeholder}
                                                        />
                                                    )}
                                                    {field.name === 'mapLink' && (
                                                        <div className="flex-grow">
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                                                            <div className="flex rounded-md shadow-sm">
                                                                <input
                                                                    type="text"
                                                                    name={field.name}
                                                                    value={field.value}
                                                                    onChange={(e) => handleFieldChange(field.id, e.target.value)}
                                                                    placeholder={field.placeholder}
                                                                    className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent"
                                                                />
                                                                <button
                                                                    type="button"
                                                                    onClick={getCurrentLocation}
                                                                    disabled={locationStatus === 'fetching'}
                                                                    className="px-4 py-2 bg-[#006666] text-white rounded-r-md flex items-center justify-center disabled:opacity-50 hover:bg-[#008080] transition-colors shrink-0"
                                                                >
                                                                    {locationStatus === 'fetching' ? (
                                                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                                        </svg>
                                                                    ) : (
                                                                        <MapPin className="w-5 h-5" />
                                                                    )}
                                                                </button>
                                                            </div>
                                                            {locationStatus === 'success' && (
                                                                <p className="mt-1 text-sm text-[#006666]">Location added successfully!</p>
                                                            )}
                                                            {locationStatus === 'error' && (
                                                                <p className="mt-1 text-sm text-[#dc2626]">Could not get location. Please enter manually.</p>
                                                            )}
                                                        </div>
                                                    )}
                                                    {field.isRemovable && (
                                                        <button
                                                            type="button"
                                                            onClick={() => removeField(field.id)}
                                                            className="flex items-center justify-center h-8 w-8 rounded-full bg-red-100 text-red-600 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors shrink-0"
                                                            aria-label={`Remove ${field.label}`}
                                                        >
                                                            <X className="h-4 w-4" />
                                                        </button>
                                                    )}
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>
                                    </div>
                                </div>

                                {/* Security Section */}
                                <div className="p-4 rounded-lg bg-[#e0f2f2] border border-gray-200">
                                    <h2 className="text-xl font-semibold flex items-center space-x-2 mb-4 text-[#004d4d]">
                                        <Lock className="w-6 h-6 text-[#006666]" />
                                        <span>Security</span>
                                    </h2>
                                    <AnimatePresence>
                                        {fields.filter(f => f.section === 'security').map(field => (
                                            <motion.div
                                                key={field.id}
                                                variants={dynamicFieldVariants}
                                                initial="initial"
                                                animate="animate"
                                                exit="exit"
                                                className="flex items-end gap-2"
                                            >
                                                {field.type === 'password' && (
                                                    <PasswordInput
                                                        label={field.label}
                                                        name={field.name}
                                                        value={field.value}
                                                        onChange={(e) => handleFieldChange(field.id, e.target.value)}
                                                        icon={field.icon}
                                                        className="flex-grow"
                                                        placeholder={field.placeholder}
                                                    />
                                                )}
                                                {field.isRemovable && (
                                                    <button
                                                        type="button"
                                                        onClick={() => removeField(field.id)}
                                                        className="flex items-center justify-center h-8 w-8 rounded-full bg-red-100 text-red-600 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors shrink-0"
                                                        aria-label={`Remove ${field.label}`}
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </button>
                                                )}
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>

                                {/* Add/Remove Fields Section */}
                                <div className="p-4 rounded-lg bg-[#e0f2f2] border border-gray-200">
                                    <h2 className="text-xl font-semibold flex items-center space-x-2 mb-4 text-[#004d4d]">
                                        <PlusCircle className="w-6 h-6 text-[#006666]" />
                                        <span>Manage Form Fields</span>
                                    </h2>
                                    <div className="flex items-end space-x-2 mb-4">
                                        <div className="flex-grow">
                                            <label htmlFor="newFieldAddDropdown" className="block text-sm font-medium text-gray-700 mb-1">Add Removed/Additional Field</label>
                                            <select
                                                id="newFieldAddDropdown"
                                                value="" // Controlled empty value to allow re-selection
                                                onChange={(e) => addField(e.target.value)}
                                                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent"
                                            >
                                                <option value="">Select Field to Add</option>
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
                                                        className="flex-grow"
                                                        placeholder={field.placeholder}
                                                    />
                                                )}
                                                {field.type === 'textarea' && (
                                                    <TextArea
                                                        label={field.label}
                                                        name={field.name}
                                                        value={field.value}
                                                        onChange={(e) => handleFieldChange(field.id, e.target.value)}
                                                        className="flex-grow"
                                                        placeholder={field.placeholder}
                                                    />
                                                )}
                                                <button
                                                    type="button"
                                                    onClick={() => removeField(field.id)}
                                                    className="flex items-center justify-center h-8 w-8 rounded-full bg-red-100 text-red-600 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors shrink-0"
                                                    aria-label={`Remove ${field.label}`}
                                                >
                                                    <X className="h-4 w-4" />
                                                </button>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>

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
                                        className={`w-full py-3 px-4 rounded-lg text-white font-semibold flex items-center justify-center disabled:opacity-50
                                            ${isSubmitting ? 'bg-[#339999]' : 'bg-[#008080] hover:bg-[#006666]'} transition-colors`}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Processing...
                                            </>
                                        ) : (
                                            'Generate QR Code'
                                        )}
                                    </button>
                                </motion.div>
                            </form>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* NFC Premium Service / Geolocation Error Modal */}
            <Modal
                show={showNfcPopup}
                onClose={() => setShowNfcPopup(false)} // Close button will only close modal
                title={popupTitle}
                message={popupMessage}
            >
                <div className="flex justify-end mt-4">
                    {!isGeolocationError && ( // Show Cancel only if not a geolocation error
                        <button
                            onClick={() => {
                                setShowNfcPopup(false);
                                setNfcEnabled(false); // User declines NFC
                            }}
                            className="ml-2 bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition"
                        >
                            Cancel
                        </button>
                    )}
                    <button
                        onClick={() => {
                            setShowNfcPopup(false);
                            if (!isGeolocationError) {
                                setNfcEnabled(true); // User accepts NFC
                            }
                        }}
                        className={`ml-2 px-4 py-2 rounded-md transition ${isGeolocationError ? 'bg-[#008080] hover:bg-[#006666] text-white' : 'bg-[#008080] hover:bg-[#006666] text-white'}`}
                    >
                        {isGeolocationError ? 'Got It' : 'Proceed'}
                    </button>
                </div>
            </Modal>
        </div>
    );
}
