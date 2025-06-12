'use client';

import { useLanguage } from '@/context/languageContext/LanguageContext';

const languageOptions = [
    { code: 'en', label: 'English - English' },
    { code: 'hi', label: 'Hindi - हिन्दी' },
    { code: 'bn', label: 'Bengali - বাংলা' },
    { code: 'te', label: 'Telugu - తెలుగు' },
    { code: 'mr', label: 'Marathi - मराठी' },
    { code: 'ta', label: 'Tamil - தமிழ்' },
    { code: 'gu', label: 'Gujarati - ગુજરાતી' },
    { code: 'kn', label: 'Kannada - ಕನ್ನಡ' },
    { code: 'ml', label: 'Malayalam - മലയാളം' },
    { code: 'or', label: 'Odia - ଓଡ଼ିଆ' },
    { code: 'pa', label: 'Punjabi - ਪੰਜਾਬੀ' },
    { code: 'ur', label: 'Urdu - اُردُو' }
];

const LanguageSelector = () => {
    const { setLanguage, language } = useLanguage();

    const handleChange = (e) => {
        const selectedLang = e.target.value;
        setLanguage(selectedLang);
        localStorage.setItem('language', selectedLang); // ✅ optional persistence
    };

    return (
        <select
            value={language}
            onChange={handleChange}
            className="bg-transparent border border-white rounded px-2 py-1 text-white"
        >
            {languageOptions.map(({ code, label }) => (
                <option key={code} value={code} className="text-black">
                    {label}
                </option>
            ))}
        </select>
    );
};

export default LanguageSelector;
