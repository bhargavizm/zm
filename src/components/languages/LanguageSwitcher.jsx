'use client';

import { useRouter } from 'next/router';
import i18nextConfig from '../i18n';
import { useState } from 'react';

const LANGUAGES = {
    en: 'English',
    hi: 'Hindi',
    ta: 'Tamil',
    te: 'Telugu',
    bn: 'Bengali',
    ml: 'Malayalam',
    gu: 'Gujarati',
    kn: 'Kannada',
    mr: 'Marathi',
    pa: 'Punjabi',
};

export default function LanguageSwitcher() {
    const router = useRouter();
    const [showDropdown, setShowDropdown] = useState(false);

    const changeLanguage = (lng) => {
        const { pathname, asPath, query } = router;
        router.push({ pathname, query }, asPath, { locale: lng });
        setShowDropdown(false);
    };

    return (
        <div className="relative inline-block text-left">
            <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
            >
                🌐 Language
            </button>

            {showDropdown && (
                <div className="absolute mt-2 w-44 bg-white border border-gray-300 shadow-lg rounded-md z-50">
                    {Object.entries(LANGUAGES).map(([code, name]) => (
                        <button
                            key={code}
                            onClick={() => changeLanguage(code)}
                            className="block w-full px-4 py-2 text-left hover:bg-teal-100"
                        >
                            {name}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
