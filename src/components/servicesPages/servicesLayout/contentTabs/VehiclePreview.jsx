import React from 'react';
import { Car, CreditCard, FileText, User, Phone, MapPin, Calendar, Video, Link, Image as ImageIcon, Bike, Truck, Wifi } from 'lucide-react';

// --- Color Palette based on #008080 (Teal) ---
const COLORS = {
    primary: '#008080',       // Base Teal
    primaryLight: '#339999',  // Lighter Teal
    primaryDark: '#006666',   // Darker Teal
    primaryBg: '#e0f2f2',     // Very light teal for backgrounds
    textPrimary: '#004d4d',   // Dark teal for text
    textLight: '#f0fafa',     // Off-white for text on dark backgrounds
    border: '#66b2b2',        // Medium teal for borders
};

const VehiclePreview = ({ formData }) => {
    // Helper to get value safely
    const getValue = (key, defaultValue = 'N/A') => formData[key] || defaultValue;

    // Helper to render dynamic fields
    const renderDynamicField = (key, value) => {
        let icon;
        let displayValue = value;
        if (value === null || value === undefined || value === '') {
            return null; // Don't display empty dynamic fields
        }

        switch (key) {
            case 'videoUrl':
                icon = <Video className="w-4 h-4 text-[#008080] mr-2" />;
                displayValue = <a href={value} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Watch Video</a>;
                break;
            case 'imageUrl':
                icon = <ImageIcon className="w-4 h-4 text-[#008080] mr-2" />;
                displayValue = <img src={value} alt="User Upload" className="max-h-24 w-auto object-contain rounded" />;
                break;
            case 'pdfLink':
                icon = <FileText className="w-4 h-4 text-[#008080] mr-2" />;
                displayValue = <a href={value} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View PDF</a>;
                break;
            case 'websiteLink':
                icon = <Link className="w-4 h-4 text-[#008080] mr-2" />;
                displayValue = <a href={value} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{value}</a>;
                break;
            case 'additionalText':
            case 'additionalTextArea':
                icon = <FileText className="w-4 h-4 text-[#008080] mr-2" />;
                break;
            default:
                return null;
        }

        return (
            <div key={key} className="flex items-center text-sm mb-1">
                {icon}
                <span className="text-gray-800">{displayValue}</span>
            </div>
        );
    };


    return (
        <div className="flex justify-center items-center h-full p-4">
            {/* iPhone Frame */}
            <div className="relative border-[10px] border-black rounded-[3rem] shadow-2xl bg-gray-800 p-1 iphone-frame max-w-[375px] w-full">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100px] h-6 bg-black rounded-b-xl z-10"></div>
                {/* Home Button (for visual effect only, no functionality) */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gray-700 border-2 border-gray-600"></div>

                {/* Screen Content */}
                <div
                    className="relative w-full h-[667px] bg-white rounded-[2.5rem] overflow-hidden flex flex-col"
                    style={{
                        backgroundImage: formData.selectedTemplate ? `url(${formData.selectedTemplate})` : 'none',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundColor: !formData.selectedTemplate ? '#f0fafa' : 'transparent', // Fallback color if no template
                    }}
                >
                    {/* Top Status Bar Placeholder */}
                    <div className="p-2 flex justify-between items-center text-xs font-semibold text-gray-700 bg-white bg-opacity-80 backdrop-blur-sm z-10">
                        <span>9:41 AM</span>
                        <div className="flex items-center space-x-1">
                            <span className="text-xs">4G</span>
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5.525 10.995a5.525 5.525 0 1111 0v4.731a2.201 2.201 0 00-1.042 1.835c0 1.21-.986 2.195-2.203 2.195h-5.51a2.201 2.201 0 00-1.042-1.835v-4.731z" />
                            </svg>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-grow p-4 overflow-y-auto custom-scrollbar" style={{ color: COLORS.textPrimary }}>
                        <div className="text-center mb-6">
                            <h2 className="text-2xl font-bold mb-1" style={{ color: COLORS.primaryDark }}>{getValue('vehicleModel', 'Vehicle Model')}</h2>
                            <p className="text-sm italic text-gray-600">{getValue('vehicleDesc', 'Description of Vehicle')}</p>
                        </div>

                        {formData.nfcEnabled && (
                            <div className="flex items-center justify-center bg-green-100 text-green-700 rounded-lg py-2 mb-4">
                                <Wifi className="w-5 h-5 mr-2" />
                                <span className="text-sm font-semibold">NFC Enabled (Premium)</span>
                            </div>
                        )}

                        {/* Vehicle Info */}
                        <div className="mb-4 p-3 rounded-lg" style={{ backgroundColor: COLORS.primaryBg }}>
                            <h3 className="flex items-center text-lg font-semibold mb-2" style={{ color: COLORS.primary }}><Car className="w-5 h-5 mr-2" /> Vehicle Details</h3>
                            <p className="text-sm mb-1"><span className="font-medium">Type:</span> {formData.vehicleType === 'other' ? getValue('customVehicleType', 'Other') : getValue('vehicleType', 'Select Type')}</p>
                            <p className="text-sm mb-1"><span className="font-medium">Purchased On:</span> {getValue('buyingDate', 'Not set')}</p>
                            {formData.vehicleImages && formData.vehicleImages.length > 0 && (
                                <div className="mt-2 grid grid-cols-2 gap-2">
                                    {formData.vehicleImages.slice(0, 2).map((url, idx) => ( // Show first 2 images
                                        <img key={idx} src={url} alt={`Vehicle Image ${idx + 1}`} className="w-full h-20 object-cover rounded-md shadow-sm" />
                                    ))}
                                    {formData.vehicleImages.length > 2 && (
                                        <div className="flex items-center justify-center bg-gray-200 rounded-md h-20 text-gray-600 text-sm">
                                            +{formData.vehicleImages.length - 2} More
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Registration Info */}
                        <div className="mb-4 p-3 rounded-lg" style={{ backgroundColor: COLORS.primaryBg }}>
                            <h3 className="flex items-center text-lg font-semibold mb-2" style={{ color: COLORS.primary }}><CreditCard className="w-5 h-5 mr-2" /> Registration</h3>
                            <p className="text-sm mb-1"><span className="font-medium">RC Number:</span> {getValue('rcNumber', 'Not set')}</p>
                            {/* You might similarly display thumbnails for other document images here */}
                        </div>

                        {/* Owner/Driver Info */}
                        <div className="mb-4 p-3 rounded-lg" style={{ backgroundColor: COLORS.primaryBg }}>
                            <h3 className="flex items-center text-lg font-semibold mb-2" style={{ color: COLORS.primary }}><User className="w-5 h-5 mr-2" /> Owner/Driver</h3>
                            {formData.ownerDriverImage && (
                                <div className="mb-2">
                                    <img src={formData.ownerDriverImage} alt="Owner/Driver" className="w-20 h-20 rounded-full object-cover mx-auto shadow-md" />
                                </div>
                            )}
                            <p className="text-sm mb-1"><span className="font-medium">Driver:</span> {getValue('driverName', 'N/A')}</p>
                            <p className="text-sm mb-1"><span className="font-medium">Owner:</span> {getValue('ownerName', 'N/A')}</p>
                        </div>

                        {/* Contact Info */}
                        <div className="mb-4 p-3 rounded-lg" style={{ backgroundColor: COLORS.primaryBg }}>
                            <h3 className="flex items-center text-lg font-semibold mb-2" style={{ color: COLORS.primary }}><Phone className="w-5 h-5 mr-2" /> Contact</h3>
                            <p className="text-sm mb-1"><span className="font-medium">Mobile:</span> {getValue('contactNumber', 'Not set')}</p>
                            <p className="text-sm mb-1"><span className="font-medium">Alternate:</span> {getValue('alternateContact', 'Not set')}</p>
                        </div>

                        {/* Location Info */}
                        <div className="mb-4 p-3 rounded-lg" style={{ backgroundColor: COLORS.primaryBg }}>
                            <h3 className="flex items-center text-lg font-semibold mb-2" style={{ color: COLORS.primary }}><MapPin className="w-5 h-5 mr-2" /> Location</h3>
                            <p className="text-sm mb-1">{getValue('address', 'Not set')}</p>
                            {getValue('mapLink', '') !== 'N/A' && getValue('mapLink', '') !== '' && (
                                <p className="text-sm">
                                    <span className="font-medium">Map:</span> <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(getValue('mapLink'))}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View on Map</a>
                                </p>
                            )}
                        </div>

                        {/* Dynamically added fields */}
                        {formData.dynamicFields && Object.keys(formData.dynamicFields).length > 0 && (
                            <div className="mb-4 p-3 rounded-lg" style={{ backgroundColor: COLORS.primaryBg }}>
                                <h3 className="flex items-center text-lg font-semibold mb-2" style={{ color: COLORS.primary }}><FileText className="w-5 h-5 mr-2" /> Additional Info</h3>
                                {Object.entries(formData.dynamicFields).map(([key, value]) => (
                                    renderDynamicField(key, value)
                                ))}
                            </div>
                        )}
                        {/* Note: Password field is for security, not displayed in public preview */}
                    </div>

                    {/* Custom Scrollbar for Preview */}
                    <style jsx global>{`
                        .custom-scrollbar::-webkit-scrollbar {
                            width: 6px;
                        }
                        .custom-scrollbar::-webkit-scrollbar-track {
                            background: #f1f1f1;
                            border-radius: 10px;
                        }
                        .custom-scrollbar::-webkit-scrollbar-thumb {
                            background: ${COLORS.primaryLight};
                            border-radius: 10px;
                        }
                        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                            background: ${COLORS.primaryDark};
                        }
                    `}</style>
                </div>
            </div>
        </div>
    );
};

export default VehiclePreview;

