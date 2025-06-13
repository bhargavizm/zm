import { TiBusinessCard } from 'react-icons/ti';
import { BsFillCartCheckFill } from 'react-icons/bs';
import { SiGoogleforms } from "react-icons/si";
import { BsPersonVcard } from "react-icons/bs";
import { FaFilePdf } from "react-icons/fa6";
import { MdPets } from "react-icons/md";
import { IoIosLink } from "react-icons/io";
import { ImHeadphones } from "react-icons/im";
import { GrGallery } from "react-icons/gr";
import { FaVideo } from "react-icons/fa6";
import { GoFileDirectoryFill } from "react-icons/go";
import { CgWebsite } from "react-icons/cg";
import { FaSms } from "react-icons/fa";
import { FaLink } from "react-icons/fa6";
import { MdDiversity3 } from "react-icons/md";
import { SiGooglemeet } from "react-icons/si";
import { MdOutlineVideoCall } from "react-icons/md";
import { BsMicrosoftTeams } from "react-icons/bs";
import { FaYoutube } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { MdMenuBook } from "react-icons/md";
import { MdMessage } from "react-icons/md";
import { RiDiscountPercentFill } from "react-icons/ri";
import { MdEventNote } from "react-icons/md";
import { FaHandsHoldingChild } from "react-icons/fa6";
import { FaCar } from "react-icons/fa";
import { GiCash } from "react-icons/gi";
import { PiStudent } from "react-icons/pi";
import { FaLocationDot } from "react-icons/fa6";
import { FaWifi } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { GrNotes } from "react-icons/gr";
import { FaHeartCircleExclamation } from "react-icons/fa6";

const services = [
    {
        "icon": <TiBusinessCard className="text-[#001a1a]" />,
        "serviceName": "Business Card",
        slug: "business-cards",
        "description": "Craft standout digital business cards in a snap with sleek templates, effortlessly sparking connections that resonate.",
        "image": "/services/BusinessCard.webp",
    },
    {
        "icon": <BsFillCartCheckFill className="text-[#001a1a]" />,
        "serviceName": "Product QR Code",
        slug: "product-cards",
        "description": "Create a stunning Product QR Code to effortlessly connect customers and elevate your brand's accessibility.",
        "image": "/services/Product.webp",
    },
    {
        "icon": <SiGoogleforms className="text-[#001a1a]" />,
        "serviceName": "Form QR",
        slug: "form-qr",
        "description": "Create Google Forms QR Codes for seamless offline responses and manage comprehensive analytics effortlessly at your fingertips.",
        "image": "/services/Form-qr.webp",
    },
    {
        "icon": <BsPersonVcard className="text-[#001a1a]" />,
        "serviceName": "vCard Plus",
        slug: "v-cards",
        "description": "Effortlessly create vCard Plus QR Codes to share your contact information and boost networking opportunities instantly!",
        "image": "/services/vCard.webp",
    },
    {
        "icon": <FaFilePdf className="text-[#001a1a]" />,
        "serviceName": "PDF",
        slug: "pdf",
        "description": "Generate scannable QR Codes for PDF files, ensuring easy access and sharing of important documents digitally.",
        "image": "/services/PDF-to-qr.webp",
    },
    {
        "icon": <MdPets className="text-[#001a1a]" />,
        "serviceName": "Pet ID Tags",
        slug: "Pet-ID-tags",
        "description": "Ensure your pet's safe return with QR Code Pet ID Tags that provide instant access to information.",
        "image": "/services/pet-id.webp",
    },
    {
        "icon": <IoIosLink className="text-[#001a1a]" />,
        "serviceName": "Multi URL",
        slug: "multi-urls",
        "description": "Effortlessly combine multiple URLs into one QR Code, streamlining access and enhancing user experience seamlessly.",
        "image": "/services/url-to-qr.webp",
    },
    {
        "icon": <IoIosLink className="text-[#001a1a]" />,
        "serviceName": "Business Shop",
        slug: "business-shops",
        "description": "Effortlessly transform images into QR codes, connecting visuals to digital content in an instant.",
        "image": "/services/bussiness-shop-qr.webp",
    },
    {
        "icon": <ImHeadphones className="text-[#001a1a]" />,
        "serviceName": "Audio",
        slug: "audios",
        "description": "Generate QR Codes that link to audio content, enhancing experiences with instant access to captivating sound.",
        "image": "/services/audio-qr.webp",
    },
    {
        "icon": <GrGallery className="text-[#001a1a]" />,
        "serviceName": "Gallery",
        slug: "gallery",
        "description": "Showcase your visual creations in a dynamic Gallery, effortlessly accessed through QR Codes for instant viewing.",
        "image": "/services/gallery-to-qr.webp",
    },
    {
        "icon": <FaVideo className="text-[#001a1a]" />,
        "serviceName": "Video",
        slug: "videos",
        "description": "Generate engaging QR Codes for videos, allowing instant access to your captivating content from anywhere, anytime.",
        "image": "/services/video-qr.webp",
    },
    {
        "icon": <GoFileDirectoryFill className="text-[#001a1a]" />,
        "serviceName": "Resume",
        slug: "resumes",
        "description": "Generate a QR Code for your resume, making job applications accessible and shareable with a simple scan.",
        "image": "/services/resume-qr.webp",
    },
    {
        "icon": <CgWebsite className="text-[#001a1a]" />,
        "serviceName": "Landing Page",
        slug: "landing-page",
        "description": "Design engaging landing pages with QR Code integration, enhancing user experience and driving conversions for businesses.",
        "image": "/services/landing-page-qr.webp",
    },
    {
        "icon": <FaSms className="text-[#001a1a]" />,
        "serviceName": "SMS",
        slug: "sms",
        "description": "Generate QR Codes for SMS notifications, allowing instant communication and seamless engagement with your audience.",
        "image": "/services/sms-qr.webp",
    },
    {
        "icon": <FaLink className="text-[#001a1a]" />,
        "serviceName": "URL",
        slug: "urls",
        "description": "Generate a unique QR Code URL to effortlessly connect users with your content and enhance engagement.",
        "image": "/services/url-qr.webp",
    },
    {
        "icon": <SiGoogleforms className="text-[#001a1a]" />,
        "serviceName": "Forms",
        slug: "forms",
        "description": "Design intuitive QR Code forms that streamline data collection, enhance user engagement, and simplify analysis effortlessly.",
        "image": "/services/forms-qr.webp",
    },
    {
        "icon": <MdDiversity3 className="text-[#001a1a]" />,
        "serviceName": "Meeting",
        slug: "meetings",
        "description": "Generate QR Codes for meetings that allow instant access to schedules and essential details for participants.",
        "image": "/services/meet-qr.webp",
    },
    {
        "icon": <SiGooglemeet className="text-[#001a1a]" />,
        "serviceName": "Google Meet",
        slug: "google-meets",
        "description": "Generate QR Codes for Google Meet links, making virtual meetings accessible with a simple scan.",
        "image": "/services/gmeet-qr.webp",
    },
    {
        "icon": <MdOutlineVideoCall className="text-[#001a1a]" />,
        "serviceName": "Zoom Meet",
        slug: "zoom-meets",
        "description": "Generate a Zoom Meet QR Code for instant access to meetings, enhancing convenience and seamless participation.",
        "image": "/services/zoom-qr.webp",
    },
    {
        "icon": <BsMicrosoftTeams className="text-[#001a1a]" />,
        "serviceName": "MS Teams",
        slug: "microsoft-teams",
        "description": "Generate QR Codes for MS Teams to connect instantly, enhancing collaboration and communication in your organization.",
        "image": "/services/ms-teams-qr.webp",
    },
    {
        "icon": <FaYoutube className="text-[#001a1a]" />,
        "serviceName": "Youtube",
        slug: "youtube",
        "description": "Generate unique QR Codes for your YouTube channel, enhancing viewer access and boosting your video engagement.",
        "image": "/services/yt-qr.webp",
    },
    {
        "icon": <FaFacebook className="text-[#001a1a]" />,
        "serviceName": "Facebook",
        slug: "facebook",
        "description": "Generate dynamic QR Codes for Facebook to connect easily, share content, and expand your online community.",
        "image": "/services/fb-qr.webp",
    },
    {
        "icon": <FaInstagram className="text-[#001a1a]" />,
        "serviceName": "Instagram",
        slug: "instagram",
        "description": "Generate Instagram QR Codes effortlessly, connecting you with followers and enhancing engagement for your brand online.",
        "image": "/services/insta-qr.webp",
    },
    {
        "icon": <FaXTwitter className="text-[#001a1a]" />,
        "serviceName": "Twitter",
        slug: "twitter",
        "description": "Generate Twitter QR Codes effortlessly, allowing instant connections and sharing of your profile with everyone.",
        "image": "/services/twitter-qr.webp",
    },
    {
        "icon": <FaLinkedin className="text-[#001a1a]" />,
        "serviceName": "Linkedin",
        slug: "linkedin",
        "description": "Generate a dynamic QR Code for LinkedIn, effortlessly sharing your professional profile and expanding your network.",
        "image": "/services/linkedin-qr.webp",
    },
    {
        "icon": <MdMenuBook className="text-[#001a1a]" />,
        "serviceName": "MenuBook",
        slug: "menu-books",
        "description": "Discover curated recipes and personalized menus with MenuBook—your digital dining companion, powered by QR Code innovation.",
        "image": "/services/menu-book-qr.webp",
    },
    {
        "icon": <MdMessage className="text-[#001a1a]" />,
        "serviceName": "Text Message",
        slug: "text-messages",
        "description": "Instantly send messages through QR Codes, streamlining communication and connecting people effortlessly with just a scan.",
        "image": "/services/text-msg-qr.webp",
    },
    {
        "icon": <RiDiscountPercentFill className="text-[#001a1a]" />,
        "serviceName": "Discount",
        slug: "discounts",
        "description": "Unlock exclusive discounts with our QR Code generator—share savings and elevate your customer engagement effortlessly!",
        "image": "/services/discount-qr.webp",
    },
    {
        "icon": <MdEventNote className="text-[#001a1a]" />,
        "serviceName": "Event",
        slug: "events",
        "description": "Generate event QR Codes to effortlessly share details, enhance attendance, and engage participants with instant access.",
        "image": "/services/event-qr.webp",
    },
    {
        "icon": <FaHandsHoldingChild className="text-[#001a1a]" />,
        "serviceName": "Kids Safety QR",
        slug: "kids-safety-qr-tags",
        "description": "Ensure kids' safety with our Kids Safety QR Tag, providing instant access to emergency contacts and information.",
        "image": "/services/kids-safety-qr.webp",
    },
    {
        "icon": <FaCar className="text-[#001a1a]" />,
        "serviceName": "Vehicle",
        slug: "vehicles",
        "description": "Discover the ideal vehicle with our QR Code—unlock digital specifications and instant access to details effortlessly.",
        "image": "/services/vehicle-qr.webp",
    },
    {
        "icon": <GiCash className="text-[#001a1a]" />,
        "serviceName": "Property QR",
        slug: "property-qr",
        "description": "Boost your property listings with Property QR Codes, connecting potential buyers to essential digital details instantly.",
        "image": "/services/property-qr.webp",
    },
    {
        "icon": <PiStudent className="text-[#001a1a]" />,
        "serviceName": "Student Form",
        slug: "student-forms",
        "description": "Effortlessly create a Student Form QR Code that simplifies data collection and enhances engagement with students.",
        "image": "/services/student-qr.webp",
    },
    {
        "icon": <FaLocationDot className="text-[#001a1a]" />,
        "serviceName": "Location",
        slug: "location",
        "description": "Generate Location QR Codes to share precise directions, making it easy for others to find you.",
        "image": "/services/location-qr.webp",
    },
    {
        "icon": <FaWifi className="text-[#001a1a]" />,
        "serviceName": "Wifi",
        slug: "wifi",
        "description": "Generate QR Codes for Wifi access, enabling instant connectivity and hassle-free internet access for everyone.",
        "image": "/services/wifi-qr.webp",
    },
    {
        "icon": <FaGithub className="text-[#001a1a]" />,
        "serviceName": "Github",
        slug: "github",
        "description": "Elevate your projects with GitHub QR Codes, sharing repositories and code seamlessly with a simple scan.",
        "image": "/services/github-qr.webp",
    },
    {
        "icon": <GrNotes className="text-[#001a1a]" />,
        "serviceName": "Personal Notes",
        slug: "personal-notes",
        "description": "Capture and organize your thoughts easily with Personal Notes—share insights through scannable QR Codes effortlessly.",
        "image": "/services/notes-qr.webp",
    },
    {
        "icon": <FaHeartCircleExclamation className="text-[#001a1a]" />,
        "serviceName": "Medical Alert",
        slug: "medical-alerts",
        "description": "Enhance safety with Medical Alert QR Codes, providing immediate access to critical health information in emergencies.",
        "image": "/services/medical-alert-qr.webp",
    },
]

export default services;