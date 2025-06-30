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
import { useLanguage } from "@/context/languageContext/LanguageContext";

const Footer = () => {
  const { dictionary } = useLanguage();

  const encryptedServices = [
    { name: "Generate QR Code for PDF", url: "/services/pdf" },
    { name: "Generate QR Code for Audio", url: "/services/audios" },
    { name: "Generate QR Code for Video", url: "/services/videos" },
    { name: "Generate QR Code for Image Gallery", url: "/services/gallery" },
    { name: "Generate QR Code for Business Shop", url: "/services/business-shops" },
    { name: "Generate QR Code for Business Cards", url: "/services/business-cards" },
    { name: "Generate QR Code for Products", url: "/services/product-cards" },
    { name: "Generate QR Code for V Cards", url: "/services/v-cards" },
  ];

  const serviceLinks = [
    { name: "Generate QR Code for Pet Id Tag", url: "/services/Pet-ID-tags" },
    { name: "Generate QR Code for Kids Safety", url: "/services/kids-safety-qr-tags" },
    { name: "Generate QR Code for Vehicle", url: "/services/vehicles" },
    { name: "Generate QR Code for Property", url: "/services/property-qr" },
    { name: "Generate QR Code for Medical Alert", url: "/services/medical-alerts" },
    { name: "Generate QR Code for Location", url: "/services/location" },
    { name: "Generate QR Code for Event", url: "/services/events" },
    { name: "Generate QR Code for Forms", url: "/services/forms" },
  ];

  return (
    <footer className="bg-mainGreen text-white py-16">
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Column 1: Logo & Links */}
        <div className="text-center lg:text-left">
          <Link href="/" className="flex justify-center lg:justify-start items-center gap-3">
            <Image
              src="/logos/logo.webp"
              alt="logo"
              width={180}
              height={80}
              className="object-contain"
            />
          </Link>
          <ul className="space-y-2 pt-6 text-md">
            <li><Link href="/about" className="hover:underline hover:text-gray-300">{dictionary.footer.aboutUs}</Link></li>
            <li><Link href="/prices" className="hover:underline hover:text-gray-300">{dictionary.footer.pricing}</Link></li>
            <li><Link href="/privacy-policies" className="hover:underline hover:text-gray-300">{dictionary.footer.privacy}</Link></li>
            <li><Link href="/terms-conditions" className="hover:underline hover:text-gray-300">{dictionary.footer.terms}</Link></li>
            <li><Link href="/career" className="hover:underline hover:text-gray-300">{dictionary.footer.careers}</Link></li>
            <li><Link href="/investors" className="hover:underline hover:text-gray-300">{dictionary.footer.investors}</Link></li>
            <li><Link href="/franchise" className="hover:underline hover:text-gray-300">{dictionary.footer.Franchise}</Link></li>
            <li><Link href="/faq" className="hover:underline hover:text-gray-300">{dictionary.footer.faq}</Link></li>
            <li><Link href="/refund" className="hover:underline hover:text-gray-300">{dictionary.footer.refundPolicy}</Link></li>
          </ul>
        </div>

        {/* Column 2: Encrypted Services */}
        <div className="text-center lg:text-left">
          <h3 className="text-2xl font-bold pt-4">{dictionary.footer.encryptedServices}</h3>
          <ul className="space-y-2 pt-10 text-md">
            {dictionary.footer.encryptedServicesList.map((service, idx) => (
              <li key={idx}>
                <Link href={encryptedServices[idx]?.url || "#"} className="hover:underline hover:text-gray-300">
                  {service}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Regular Services */}
        <div className="text-center lg:text-left">
          <h3 className="text-2xl font-bold pt-4">{dictionary.footer.servicesTitle}</h3>
          <ul className="space-y-2 pt-10 text-md">
            {dictionary.footer.serviceList.map((service, idx) => (
              <li key={idx}>
                <Link href={serviceLinks[idx]?.url || "#"} className="hover:underline hover:text-gray-300">
                  {service}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Socials & Contact */}
        <div className="text-center ">
          <h3 className="text-2xl font-bold py-4">{dictionary.footer.followUs}</h3>
          <div className="flex justify-center space-x-4 pb-6">
            <Link href="https://www.facebook.com/people/ZMQRCodes/61559950102078/" target="_blank" aria-label="Facebook">
              <FaFacebookSquare className="w-6 h-6 hover:scale-125 transition-transform" />
            </Link>
            <Link href="https://www.instagram.com/zmqrcode/" target="_blank" aria-label="Instagram">
              <FaInstagramSquare className="w-6 h-6 hover:scale-125 transition-transform" />
            </Link>
            <Link href="https://x.com/zmqrcode" target="_blank" aria-label="Twitter">
              <FaXTwitter className="w-6 h-6 hover:scale-125 transition-transform" />
            </Link>
            <Link href="https://www.linkedin.com/company/zm-qr-code-services" target="_blank" aria-label="LinkedIn">
              <FaLinkedin className="w-6 h-6 hover:scale-125 transition-transform" />
            </Link>
          </div>

          <h3 className="text-2xl font-bold py-4">{dictionary.footer.getInTouch}</h3>
          <div className="text-md space-y-2">
            <p>
              <span className="font-bold">{dictionary.footer.emailLabel}:</span>{" "}
              <Link href="mailto:support@zmqrcode.com" className="hover:text-gray-300">support@zmqrcode.com</Link>
            </p>
            <p>
              <span className="font-bold">{dictionary.footer.phoneLabel}:</span>{" "}
              {dictionary.footer.phone}
            </p>
          </div>
        </div>
      </div>

      <hr className="border-slate-600 my-8 mx-auto w-11/12" />

      <p className="flex justify-center items-center gap-2 text-md text-white text-center">
        <FaRegCopyright />
        <span>{dictionary.footer.copyright}</span>
      </p>
    </footer>
  );
};

export default Footer;
