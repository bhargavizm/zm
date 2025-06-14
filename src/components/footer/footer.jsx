"use client";

import Image from "next/image";
import Link from "next/link";
import {
    FaFacebookSquare,
    FaInstagramSquare,
    FaLinkedin,
    FaRegCopyright,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useLanguage } from '@/context/languageContext/LanguageContext';

const serviceLinks = [
    { name: "Generate QR Code for Business Cards", url: "/services/business-cards" },
    { name: "Generate QR Code for Products", url: "/services/product-cards" },
    { name: "Generate QR Code for V Cards", url: "/services/v-cards" },
    { name: "Generate QR Code for Form QR Code", url: "/services/form-qr" },
    { name: "Generate QR Code for Pet Id Tag", url: "/services/Pet-ID-tags" },
    { name: "Generate QR Code for PDF", url: "/services/pdf" },
    { name: "Generate QR Code for Audio", url: "/services/audios" },
    { name: "Generate QR Code for Video", url: "/services/videos" },
    { name: "Generate QR Code for Image Gallery", url: "/services/gallery" },
];

const Footer = () => {
    const { dictionary } = useLanguage();

    return (
        <footer className="py-16 text-white bg-mainGreen">
            <div className=" lg:px-40 md:px-20 items-center px-6 mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-10">
                <div>
                    <Link href="/" className="flex items-center justify-center gap-3 ">
                        <Image src="/logos/logo.webp" alt="logo" width={200} height={100} />
                    </Link>
                    <ul className="space-y-2 pl-22 pt-6 text-md">
                        <li>
                            <Link href="/about" className="hover:underline hover:text-gray-400">
                                {dictionary.footer.aboutUs}
                            </Link>
                        </li>
                        {/* <li>
                            <Link href="#" className="hover:underline hover:text-gray-400">
                                {dictionary.footer.blogs}
                            </Link>
                        </li> */}
                        <li>
                            <Link href="/prices" className="hover:underline hover:text-gray-400">
                                {dictionary.footer.pricing}
                            </Link>
                        </li>
                        <li>
                            <Link href="/#" className="hover:underline hover:text-gray-400">
                                {dictionary.footer.privacy}
                            </Link>
                        </li>
                        <li>
                            <Link href="/#" className="hover:underline hover:text-gray-400">
                                {dictionary.footer.terms}
                            </Link>
                        </li>
                        <li>
                            <Link href="/career" className="hover:underline hover:text-gray-400">
                                {dictionary.footer.careers}
                            </Link>
                        </li>
                        <li>
                            <Link href="/investors" className="hover:underline hover:text-gray-400">
                                {dictionary.footer.investors}
                            </Link>
                        </li>
                        <li>
                            <Link href="/faq" className="hover:underline hover:text-gray-400">
                                {dictionary.footer.faq}
                            </Link>
                        </li>
                        <li>
                            <Link href="/refund" className="hover:underline hover:text-gray-400">
                                {dictionary.footer.refundPolicy}
                            </Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-2xl font-bold items-center pt-2">
                        {dictionary.footer.servicesTitle}
                    </h3>
                    <ul className="space-y-2 pt-10 text-md">
                        {dictionary.footer.serviceList.map((service, idx) => (
                            <li key={service}>
                                <Link
                                    href={serviceLinks[idx]?.url || "#"}
                                    className="hover:underline hover:text-gray-400"
                                >
                                    {service}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3 className="text-2xl font-bold text-center pt-2 pb-4">
                        {dictionary.footer.followUs}
                    </h3>
                    <div className="flex items-center justify-center space-x-3 text-lg">
                        <Link
                            href="https://www.facebook.com/people/ZMQRCodes/61559950102078/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Visit our Facebook page"
                        >
                            <FaFacebookSquare className="w-6 h-6 transition-transform duration-300 hover:scale-125" />
                        </Link>

                        <Link
                            href="https://www.instagram.com/zmqrcode/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Visit our Instagram page"
                        >
                            <FaInstagramSquare className="w-6 h-6 transition-transform duration-300 hover:scale-125" />
                        </Link>

                        <Link
                            href="https://x.com/zmqrcode"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Visit our Twitter page"
                        >
                            <FaXTwitter className="w-6 h-6 transition-transform duration-300 hover:scale-125" />
                        </Link>

                        <Link
                            href="https://www.linkedin.com/company/zm-qr-code-services"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Visit our LinkedIn page"
                        >
                            <FaLinkedin className="w-6 h-6 transition-transform duration-300 hover:scale-125" />
                        </Link>
                    </div>

                    <div>
                        <h3 className="text-2xl font-bold pt-6 pb-4 text-center">
                            {dictionary.footer.getInTouch}{" "}
                        </h3>
                        <div className="text-md text-center">
                            <p>
                                <span className="font-bold">{dictionary.footer.emailLabel} :  
                                </span>{" "}
                                <Link
                                    href="mailto:officalzmqrcodeservices@zmqrcode.com"
                                    className="hover:text-gray-400"
                                >
                                    support@zmqrcode.com
                                </Link>
                            </p>
                            <p>
                                <span className="font-bold">{dictionary.footer.phoneLabel} : </span>
                                {dictionary.footer.phone}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <hr className=" border-black my-9" />

            <p className="flex justify-center items-center gap-2 mt-4 text-md text-white">
                <FaRegCopyright />
                <span>{dictionary.footer.copyright}</span>
            </p>
        </footer>
    );
};

export default Footer;
