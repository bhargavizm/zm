'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import en from '@/languages/en.json';

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('en');
    const [dictionary, setDictionary] = useState(en);

    // Load stored language on initial mount
    useEffect(() => {
        const storedLang = localStorage.getItem('language');
        if (storedLang) {
            setLanguage(storedLang);
        }
    }, []);

    // Dynamically import dictionary based on language
    useEffect(() => {
        localStorage.setItem('language', language);
        import(`@/languages/${language}.json`).then((module) => {
            setDictionary(module.default);
        });
    }, [language]);

    return (
        <LanguageContext.Provider value={{ dictionary, setLanguage, language }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
