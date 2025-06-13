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

const Footer = () => {
    return (
        <footer className="py-16 text-white bg-mainGreen">
            <div className=" lg:px-40 md:px-20 items-center px-6 mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-10">
                <div>
                    <Link href="/" className="flex items-center justify-center gap-3 ">
                        <Image src="/logos/logo.webp" alt="logo" width={200} height={100} />
                    </Link>
                    <ul className="space-y-2  pl-22 pt-6 text-md">
                        <li>
                            <Link href="#" className="hover:underline hover:text-gray-400">
                                About Us
                            </Link>
                        </li>
                        {/* <li>
                            <Link href="#" className="hover:underline hover:text-gray-400">
                                Blogs
                            </Link>
                        </li> */}
                        <li>
                            <Link href="/#" className="hover:underline hover:text-gray-400">
                                Pricing
                            </Link>
                        </li>
                        <li>
                            <Link href="/#" className="hover:underline hover:text-gray-400">
                                Privacy
                            </Link>
                        </li>
                        <li>
                            <Link href="/#" className="hover:underline hover:text-gray-400">
                                Terms & Conditions
                            </Link>
                        </li>
                        <li>
                            <Link href="/#" className="hover:underline hover:text-gray-400">
                                Careers
                            </Link>
                        </li>
                        <li>
                            <Link href="/#" className="hover:underline hover:text-gray-400">
                                Investors
                            </Link>
                        </li>
                        <li>
                            <Link href="/#" className="hover:underline hover:text-gray-400">
                                FAQ
                            </Link>
                        </li>
                        <li>
                            <Link href="/#" className="hover:underline hover:text-gray-400">
                                Refund Policy
                            </Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-2xl font-bold items-center pt-2">Services</h3>
                    <ul className="space-y-2 pt-10 text-md">
                        <li>
                            <Link href="/#" className="hover:underline hover:text-gray-400">
                                Generate QR Code for Business Cards
                            </Link>
                        </li>
                        <li>
                            <Link href="/#" className="hover:underline hover:text-gray-400">
                                Generate QR Code for Products
                            </Link>
                        </li>
                        <li>
                            <Link href="/#" className="hover:underline hover:text-gray-400">
                                Generate QR Code for V Cards
                            </Link>
                        </li>
                        <li>
                            <Link href="/#" className="hover:underline hover:text-gray-400">
                                Generate QR Code for Form QR Code
                            </Link>
                        </li>
                        <li>
                            <Link href="/#" className="hover:underline hover:text-gray-400">
                                Generate QR Code for Pet Id Tag
                            </Link>
                        </li>
                        <li>
                            <Link href="/#" className="hover:underline hover:text-gray-400">
                                Generate QR Code for PDF
                            </Link>
                        </li>
                        <li>
                            <Link href="/#" className="hover:underline hover:text-gray-400">
                                Generate QR Code for Audio
                            </Link>
                        </li>
                        <li>
                            <Link href="/#" className="hover:underline hover:text-gray-400">
                                Generate QR Code for Video
                            </Link>
                        </li>
                        <li>
                            <Link href="/#" className="hover:underline hover:text-gray-400">
                                Generate QR Code for Image Gallery
                            </Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-2xl font-bold text-center pt-2 pb-4">
                        Follow Us
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
                            Get In Touch{" "}
                        </h3>
                        <div className="text-md text-center">
                            <p>
                                {" "}
                                <span className="font-bold">Email : </span>{" "}
                                <Link
                                    href="mailto:officalzmqrcodeservices@zmqrcode.com"
                                    className="hover:text-gray-400"
                                >
                                    support@zmqrcode.com
                                </Link>
                            </p>
                            <p>
                                <span className="font-bold">Phone : </span>+91 10000 00000
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <hr className=" border-black my-9" />

            <p className="flex justify-center items-center gap-2 mt-4 text-md text-white">
                <FaRegCopyright />
                <span>ZM QR Code Services © 2025. All Rights Reserved.</span>
            </p>
        </footer>
    );
};

export default Footer;
