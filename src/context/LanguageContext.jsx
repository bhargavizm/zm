'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import en from '@/languages/en.json';

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('en');
    const [dictionary, setDictionary] = useState(en);

    useEffect(() => {
        import(`@/languages/${language}.json`).then((module) => {
            setDictionary(module.default);
        });
    }, [language]);

    useEffect(() => {
        const storedLang = localStorage.getItem('language');
        if (storedLang) {
            setLanguage(storedLang);
        }
    }, []);

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
