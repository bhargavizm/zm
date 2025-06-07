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
        "description": "Craft standout digital business cards in a snap with sleek templates, effortlessly sparking connections that resonate.",
        "image": "https://images.unsplash.com/photo-1683313101534-6c2e604771a4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGlnaXRhbCUyMGNhcmR8ZW58MHwwfDB8fHwy",
        "scanner": "https://scanner.example.com/pdf"
    },
    {
        "icon": <BsFillCartCheckFill className="text-[#001a1a]" />,
        "serviceName": "Product QR Code",
        "description": "Create a stunning Product QR Code to effortlessly connect customers and elevate your brand's accessibility.",
        "image": "https://images.unsplash.com/photo-1530745342582-0795f23ec976?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZHVjdHN8ZW58MHwwfDB8fHwy",
        "scanner": "https://scanner.example.com/invoice"
    },
    {
        "icon": <SiGoogleforms className="text-[#001a1a]" />,
        "serviceName": "Form QR",
        "description": "Create Google Forms QR Codes for seamless offline responses and manage comprehensive analytics effortlessly at your fingertips.",
        "image": "https://images.unsplash.com/photo-1530745342582-0795f23ec976?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZHVjdHN8ZW58MHwwfDB8fHwy",
        "scanner": "https://scanner.example.com/invoice"
    },
    {
        "icon": <BsPersonVcard className="text-[#001a1a]" />,
        "serviceName": "vCard Plus",
        "description": "Effortlessly create vCard Plus QR Codes to share your contact information and boost networking opportunities instantly!",
        "image": "https://images.unsplash.com/photo-1530745342582-0795f23ec976?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZHVjdHN8ZW58MHwwfDB8fHwy",
        "scanner": "https://scanner.example.com/invoice"
    },
    {
        "icon": <FaFilePdf className="text-[#001a1a]" />,
        "serviceName": "PDF",
        "description": "Generate scannable QR Codes for PDF files, ensuring easy access and sharing of important documents digitally.",
        "image": "https://images.unsplash.com/photo-1530745342582-0795f23ec976?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZHVjdHN8ZW58MHwwfDB8fHwy",
        "scanner": "https://scanner.example.com/invoice"
    },
    {
        "icon": <MdPets className="text-[#001a1a]" />,
        "serviceName": "Pet ID Tags",
        "description": "Ensure your pet's safe return with QR Code Pet ID Tags that provide instant access to information.",
        "image": "https://images.unsplash.com/photo-1530745342582-0795f23ec976?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZHVjdHN8ZW58MHwwfDB8fHwy",
        "scanner": "https://scanner.example.com/invoice"
    },
    {
        "icon": <IoIosLink className="text-[#001a1a]" />,
        "serviceName": "Multi URL",
        "description": "Effortlessly combine multiple URLs into one QR Code, streamlining access and enhancing user experience seamlessly.",
        "image": "https://images.unsplash.com/photo-1530745342582-0795f23ec976?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZHVjdHN8ZW58MHwwfDB8fHwy",
        "scanner": "https://scanner.example.com/invoice"
    },
    {
        "icon": <IoIosLink className="text-[#001a1a]" />,
        "serviceName": "Image to QR",
        "description": "Effortlessly transform images into QR codes, connecting visuals to digital content in an instant.",
        "image": "https://images.unsplash.com/photo-1530745342582-0795f23ec976?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZHVjdHN8ZW58MHwwfDB8fHwy",
        "scanner": "https://scanner.example.com/invoice"
    },
    {
        "icon": <ImHeadphones className="text-[#001a1a]" />,
        "serviceName": "Audio",
        "description": "Generate QR Codes that link to audio content, enhancing experiences with instant access to captivating sound.",
        "image": "https://images.unsplash.com/photo-1530745342582-0795f23ec976?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZHVjdHN8ZW58MHwwfDB8fHwy",
        "scanner": "https://scanner.example.com/invoice"
    },
    {
        "icon": <GrGallery className="text-[#001a1a]" />,
        "serviceName": "Gallery",
        "description": "Showcase your visual creations in a dynamic Gallery, effortlessly accessed through QR Codes for instant viewing.",
        "image": "https://images.unsplash.com/photo-1530745342582-0795f23ec976?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZHVjdHN8ZW58MHwwfDB8fHwy",
        "scanner": "https://scanner.example.com/invoice"
    },
    {
        "icon": <FaVideo className="text-[#001a1a]" />,
        "serviceName": "Video",
        "description": "Generate engaging QR Codes for videos, allowing instant access to your captivating content from anywhere, anytime.",
        "image": "/services/video.jpg",
        "scanner": "https://scanner.example.com/invoice"
    },
    {
        "icon": <GoFileDirectoryFill className="text-[#001a1a]" />,
        "serviceName": "Resume",
        "description": "Generate a QR Code for your resume, making job applications accessible and shareable with a simple scan.",
        "image": "https://images.unsplash.com/photo-1530745342582-0795f23ec976?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZHVjdHN8ZW58MHwwfDB8fHwy",
        "scanner": "https://scanner.example.com/invoice"
    },
    {
        "icon": <CgWebsite className="text-[#001a1a]" />,
        "serviceName": "Landing Page",
        "description": "Design engaging landing pages with QR Code integration, enhancing user experience and driving conversions for businesses.",
        "image": "https://images.unsplash.com/photo-1530745342582-0795f23ec976?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZHVjdHN8ZW58MHwwfDB8fHwy",
        "scanner": "https://scanner.example.com/invoice"
    },
    {
        "icon": <FaSms className="text-[#001a1a]" />,
        "serviceName": "SMS",
        "description": "Generate QR Codes for SMS notifications, allowing instant communication and seamless engagement with your audience.",
        "image": "https://images.unsplash.com/photo-1530745342582-0795f23ec976?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZHVjdHN8ZW58MHwwfDB8fHwy",
        "scanner": "https://scanner.example.com/invoice"
    },
    {
        "icon": <FaLink className="text-[#001a1a]" />,
        "serviceName": "URL",
        "description": "Generate a unique QR Code URL to effortlessly connect users with your content and enhance engagement.",
        "image": "https://images.unsplash.com/photo-1530745342582-0795f23ec976?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZHVjdHN8ZW58MHwwfDB8fHwy",
        "scanner": "https://scanner.example.com/invoice"
    },
    {
        "icon": <SiGoogleforms className="text-[#001a1a]" />,
        "serviceName": "Forms",
        "description": "Design intuitive QR Code forms that streamline data collection, enhance user engagement, and simplify analysis effortlessly.",
        "image": "https://images.unsplash.com/photo-1530745342582-0795f23ec976?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZHVjdHN8ZW58MHwwfDB8fHwy",
        "scanner": "https://scanner.example.com/invoice"
    },
    {
        "icon": <MdDiversity3 className="text-[#001a1a]" />,
        "serviceName": "Meeting",
        "description": "Generate QR Codes for meetings that allow instant access to schedules and essential details for participants.",
        "image": "https://images.unsplash.com/photo-1530745342582-0795f23ec976?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZHVjdHN8ZW58MHwwfDB8fHwy",
        "scanner": "https://scanner.example.com/invoice"
    },
    {
        "icon": <SiGooglemeet className="text-[#001a1a]" />,
        "serviceName": "Google Meet",
        "description": "Generate QR Codes for Google Meet links, making virtual meetings accessible with a simple scan.",
        "image": "https://images.unsplash.com/photo-1530745342582-0795f23ec976?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZHVjdHN8ZW58MHwwfDB8fHwy",
        "scanner": "https://scanner.example.com/invoice"
    },
    {
        "icon": <MdOutlineVideoCall className="text-[#001a1a]" />,
        "serviceName": "Zoom Meet",
        "description": "Generate a Zoom Meet QR Code for instant access to meetings, enhancing convenience and seamless participation.",
        "image": "https://images.unsplash.com/photo-1530745342582-0795f23ec976?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZHVjdHN8ZW58MHwwfDB8fHwy",
        "scanner": "https://scanner.example.com/invoice"
    },
    {
        "icon": <BsMicrosoftTeams className="text-[#001a1a]" />,
        "serviceName": "MS Teams",
        "description": "Generate QR Codes for MS Teams to connect instantly, enhancing collaboration and communication in your organization.",
        "image": "https://images.unsplash.com/photo-1530745342582-0795f23ec976?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZHVjdHN8ZW58MHwwfDB8fHwy",
        "scanner": "https://scanner.example.com/invoice"
    },
    {
        "icon": <FaYoutube className="text-[#001a1a]" />,
        "serviceName": "Youtube",
        "description": "Generate unique QR Codes for your YouTube channel, enhancing viewer access and boosting your video engagement.",
        "image": "https://images.unsplash.com/photo-1530745342582-0795f23ec976?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZHVjdHN8ZW58MHwwfDB8fHwy",
        "scanner": "https://scanner.example.com/invoice"
    },
    {
        "icon": <FaFacebook className="text-[#001a1a]" />,
        "serviceName": "Facebook",
        "description": "Generate dynamic QR Codes for Facebook to connect easily, share content, and expand your online community.",
        "image": "https://images.unsplash.com/photo-1530745342582-0795f23ec976?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZHVjdHN8ZW58MHwwfDB8fHwy",
        "scanner": "https://scanner.example.com/invoice"
    },
    {
        "icon": <FaInstagram className="text-[#001a1a]" />,
        "serviceName": "Instagram",
        "description": "Generate Instagram QR Codes effortlessly, connecting you with followers and enhancing engagement for your brand online.",
        "image": "https://images.unsplash.com/photo-1530745342582-0795f23ec976?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZHVjdHN8ZW58MHwwfDB8fHwy",
        "scanner": "https://scanner.example.com/invoice"
    },
    {
        "icon": <FaXTwitter className="text-[#001a1a]" />,
        "serviceName": "Twitter",
        "description": "Generate Twitter QR Codes effortlessly, allowing instant connections and sharing of your profile with everyone.",
        "image": "https://images.unsplash.com/photo-1530745342582-0795f23ec976?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZHVjdHN8ZW58MHwwfDB8fHwy",
        "scanner": "https://scanner.example.com/invoice"
    },
    {
        "icon": <FaLinkedin className="text-[#001a1a]" />,
        "serviceName": "Linkedin",
        "description": "Generate a dynamic QR Code for LinkedIn, effortlessly sharing your professional profile and expanding your network.",
        "image": "https://images.unsplash.com/photo-1530745342582-0795f23ec976?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZHVjdHN8ZW58MHwwfDB8fHwy",
        "scanner": "https://scanner.example.com/invoice"
    },
    {
        "icon": <MdMenuBook className="text-[#001a1a]" />,
        "serviceName": "MenuBook",
        "description": "Discover curated recipes and personalized menus with MenuBook—your digital dining companion, powered by QR Code innovation.",
        "image": "https://images.unsplash.com/photo-1530745342582-0795f23ec976?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZHVjdHN8ZW58MHwwfDB8fHwy",
        "scanner": "https://scanner.example.com/invoice"
    },
    {
        "icon": <MdMessage className="text-[#001a1a]" />,
        "serviceName": "Text Message",
        "description": "Instantly send messages through QR Codes, streamlining communication and connecting people effortlessly with just a scan.",
        "image": "https://images.unsplash.com/photo-1530745342582-0795f23ec976?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZHVjdHN8ZW58MHwwfDB8fHwy",
        "scanner": "https://scanner.example.com/invoice"
    },
    {
        "icon": <RiDiscountPercentFill className="text-[#001a1a]" />,
        "serviceName": "Discount",
        "description": "Unlock exclusive discounts with our QR Code generator—share savings and elevate your customer engagement effortlessly!",
        "image": "https://images.unsplash.com/photo-1530745342582-0795f23ec976?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZHVjdHN8ZW58MHwwfDB8fHwy",
        "scanner": "https://scanner.example.com/invoice"
    },
    {
        "icon": <MdEventNote className="text-[#001a1a]" />,
        "serviceName": "Event",
        "description": "Generate event QR Codes to effortlessly share details, enhance attendance, and engage participants with instant access.",
        "image": "https://images.unsplash.com/photo-1530745342582-0795f23ec976?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZHVjdHN8ZW58MHwwfDB8fHwy",
        "scanner": "https://scanner.example.com/invoice"
    },
    {
        "icon": <FaHandsHoldingChild className="text-[#001a1a]" />,
        "serviceName": "Kids Safety QR Tag",
        "description": "Ensure kids' safety with our Kids Safety QR Tag, providing instant access to emergency contacts and information.",
        "image": "https://images.unsplash.com/photo-1530745342582-0795f23ec976?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZHVjdHN8ZW58MHwwfDB8fHwy",
        "scanner": "https://scanner.example.com/invoice"
    },
    {
        "icon": <FaCar className="text-[#001a1a]" />,
        "serviceName": "Vehicle",
        "description": "Discover the ideal vehicle with our QR Code—unlock digital specifications and instant access to details effortlessly.",
        "image": "https://images.unsplash.com/photo-1530745342582-0795f23ec976?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZHVjdHN8ZW58MHwwfDB8fHwy",
        "scanner": "https://scanner.example.com/invoice"
    },
    {
        "icon": <GiCash className="text-[#001a1a]" />,
        "serviceName": "Property QR",
        "description": "Boost your property listings with Property QR Codes, connecting potential buyers to essential digital details instantly.",
        "image": "https://images.unsplash.com/photo-1530745342582-0795f23ec976?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZHVjdHN8ZW58MHwwfDB8fHwy",
        "scanner": "https://scanner.example.com/invoice"
    },
    {
        "icon": <PiStudent className="text-[#001a1a]" />,
        "serviceName": "Student Form",
        "description": "Effortlessly create a Student Form QR Code that simplifies data collection and enhances engagement with students.",
        "image": "https://images.unsplash.com/photo-1530745342582-0795f23ec976?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZHVjdHN8ZW58MHwwfDB8fHwy",
        "scanner": "https://scanner.example.com/invoice"
    },
    {
        "icon": <FaLocationDot className="text-[#001a1a]" />,
        "serviceName": "Location",
        "description": "Generate Location QR Codes to share precise directions, making it easy for others to find you.",
        "image": "https://images.unsplash.com/photo-1530745342582-0795f23ec976?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZHVjdHN8ZW58MHwwfDB8fHwy",
        "scanner": "https://scanner.example.com/invoice"
    },
    {
        "icon": <FaWifi className="text-[#001a1a]" />,
        "serviceName": "Wifi",
        "description": "Generate QR Codes for Wifi access, enabling instant connectivity and hassle-free internet access for everyone.",
        "image": "https://images.unsplash.com/photo-1530745342582-0795f23ec976?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZHVjdHN8ZW58MHwwfDB8fHwy",
        "scanner": "https://scanner.example.com/invoice"
    },
    {
        "icon": <FaGithub className="text-[#001a1a]" />,
        "serviceName": "Github",
        "description": "Elevate your projects with GitHub QR Codes, sharing repositories and code seamlessly with a simple scan.",
        "image": "https://images.unsplash.com/photo-1530745342582-0795f23ec976?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZHVjdHN8ZW58MHwwfDB8fHwy",
        "scanner": "https://scanner.example.com/invoice"
    },
    {
        "icon": <GrNotes className="text-[#001a1a]" />,
        "serviceName": "Personal Notes",
        "description": "Capture and organize your thoughts easily with Personal Notes—share insights through scannable QR Codes effortlessly.",
        "image": "https://images.unsplash.com/photo-1530745342582-0795f23ec976?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZHVjdHN8ZW58MHwwfDB8fHwy",
        "scanner": "https://scanner.example.com/invoice"
    },
    {
        "icon": <FaHeartCircleExclamation className="text-[#001a1a]" />,
        "serviceName": "Medical Alert",
        "description": "Enhance safety with Medical Alert QR Codes, providing immediate access to critical health information in emergencies.",
        "image": "https://images.unsplash.com/photo-1530745342582-0795f23ec976?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZHVjdHN8ZW58MHwwfDB8fHwy",
        "scanner": "https://scanner.example.com/invoice"
    },
    {
        "icon": <FaHeartCircleExclamation className="text-[#001a1a]" />,
        "serviceName": "Others",
        "description": "Explore unique possibilities with Others—custom QR Code solutions tailored to diverse needs and creative applications.",
        "image": "https://images.unsplash.com/photo-1530745342582-0795f23ec976?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZHVjdHN8ZW58MHwwfDB8fHwy",
        "scanner": "https://scanner.example.com/invoice"
    },
    
]

export default services;