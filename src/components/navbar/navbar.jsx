'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/languageContext/LanguageContext';
import LanguageSelector from './LanguageSelector';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { dictionary } = useLanguage();

    return (
        <nav className="bg-mainGreen h-[10vh] py-2 text-white fixed top-0 left-0 right-0 w-full z-50">
            <div className="flex justify-between items-center mx-auto md:px-10 px-20">
                <Link href="/" className="flex items-center gap-3">
                    <Image src="/logos/logo.webp" alt="logo" width={170} height={50} priority />
                </Link>

                <div className="hidden lg:flex items-center space-x-6 font-semibold text-xl">
                    <Link href="/" className="hover:text-gray-300">{dictionary.generateQR}</Link>
                    <Link href="/services" className="hover:text-gray-300">{dictionary.services}</Link>
                    <Link href="/prices" className="hover:text-gray-300">{dictionary.prices}</Link>
                    <Link href="/blogs" className="hover:text-gray-300">{dictionary.blogs}</Link>
                    <Link href="/faq" className="hover:text-gray-300">{dictionary.support}</Link>
                    <LanguageSelector />
                    <Link href="/login" className="border border-white px-5 py-2 rounded-lg transition-effects bg-[linear-gradient(to_right,#008080,#001a1a)]">
                        {dictionary.login}
                    </Link>
                </div>

                <button
                    className="lg:hidden flex flex-col gap-[3px]"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle mobile menu"
                >
                    <div className="w-6 h-1 bg-white"></div>
                    <div className="w-6 h-1 bg-white"></div>
                    <div className="w-6 h-1 bg-white"></div>
                </button>
            </div>

            {isOpen && (
                <div className="lg:hidden text-xl flex flex-col bg-mainGreen mx-auto md:px-10 px-20 py-6 font-semibold space-y-4 text-white">
                    <Link href="/" onClick={() => setIsOpen(false)}>{dictionary.generateQR}</Link>
                    <Link href="/services" onClick={() => setIsOpen(false)}>{dictionary.services}</Link>
                    <Link href="/prices" onClick={() => setIsOpen(false)}>{dictionary.prices}</Link>
                    <Link href="/blogs" onClick={() => setIsOpen(false)}>{dictionary.blogs}</Link>
                    <Link href="/faq" onClick={() => setIsOpen(false)}>{dictionary.support}</Link>
                    <LanguageSelector />
                    <Link href="/login" className="border border-white px-5 py-2 rounded-lg w-26 transition-effects bg-[linear-gradient(to_right,#008080,#001a1a)]">
                        {dictionary.login}
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
