// app/page.js
'use client';

import React, { useState,useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaArrowRight, FaTag, FaIdCard, FaStar, FaPhone, FaLink, FaTools, FaLightbulb,
    FaShieldAlt, FaSyncAlt, FaChartLine, FaCheckCircle, FaUsers, FaLaptopCode,
    FaEnvelope, FaHeadset, FaChild, FaSchool, FaPills, FaHome, FaPercent, FaDollarSign, FaCalendarAlt,
    FaMoneyBillWave, FaHandshake, FaGraduationCap, FaNetworkWired, FaInfoCircle
} from 'react-icons/fa';

// --- Custom Color Palette ---
const SITE_COLORS = {
    // Main dark background (inspired by the hero section and footer)
    primaryDarkBg: '#001a1a', // A deep green

    // Accent colors for buttons, gradients, icons
    accentTeal: '#008080',      // Base Teal
    accentTealLight: '#339999',  // Lighter Teal
    accentTealDark: '#006666',  // Darker Teal

    // Text colors
    textLight: '#f0fafa',       // Off-white for text on dark backgrounds
    textDark: '#1a202c',        // Dark charcoal for text on light backgrounds
    textMuted: '#64748b',       // Muted gray for secondary text

    // Section backgrounds and borders
    sectionBgLight: '#ffffff',  // Pure white for content sections
    sectionBgSubtle: '#f8fafc', // Very light gray for cards/inner sections
    border: '#e2e8f0',          // Light gray border
};

// --- Reusable Components (simplified for landing page) ---
// Button component for consistent styling
const PrimaryButton = ({ children, onClick, className = '' }) => (
    <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className={`px-8 py-4 rounded-full font-semibold text-lg shadow-lg transition-all duration-300 ${className}`}
        style={{ backgroundColor: SITE_COLORS.accentTeal, color: SITE_COLORS.textLight }}
    >
        {children}
    </motion.button>
);

const SecondaryButton = ({ children, onClick, className = '' }) => (
    <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className={`px-6 py-3 rounded-full font-semibold text-md shadow transition-all duration-300 border-2 ${className}`}
        style={{ borderColor: SITE_COLORS.accentTeal, color: SITE_COLORS.accentTealDark, backgroundColor: 'transparent' }}
    >
        {children}
    </motion.button>
);

// Feature Item (for lists with icons)
const FeatureItem = ({ icon, title, description }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="flex items-start mb-6"
    >
        <div className="flex-shrink-0 p-3 rounded-full mr-4" style={{ backgroundColor: SITE_COLORS.accentTealLight, color: SITE_COLORS.textLight }}>
            {icon}
        </div>
        <div>
            <h3 className="text-xl font-semibold mb-1" style={{ color: SITE_COLORS.textDark }}>{title}</h3>
            <p style={{ color: SITE_COLORS.textMuted }}>{description}</p>
        </div>
    </motion.div>
);

// --- Section Components ---

// 1. Home Page (Landing Page for Franchise Acquisition)
const HeroSection = () => {
    return (
        <section className="min-h-screen flex items-center justify-center p-8 relative overflow-hidden" style={{ background: SITE_COLORS.primaryDarkBg }}>
            <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between z-10 text-center lg:text-left">
                {/* Left Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="lg:w-1/2 mb-10 lg:mb-0"
                >
                    <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight" style={{ color: SITE_COLORS.textLight }}>
                        Unlock Digital Business Growth: <br /> Own a <span style={{ color: SITE_COLORS.accentTealLight }}>ZM QR Code Services</span> Franchise!
                    </h1>
                    <p className="mt-6 text-lg lg:text-xl" style={{ color: SITE_COLORS.textMuted }}>
                        Join the Future of Connectivity – Your Path to a Thriving Digital Business Starts Here.
                    </p>
                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-10 justify-center lg:justify-start">

                        <SecondaryButton>Schedule a Discovery Call</SecondaryButton>
                    </div>
                </motion.div>

                {/* Right Visual */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="lg:w-1/2 flex justify-center items-center"
                >
                    <img
                        src="https://placehold.co/600x400/008080/FFFFFF?text=Modern+QR+Applications"
                        alt="Showcasing modern QR code applications"
                        className="rounded-xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
                    />
                </motion.div>
            </div>
        </section>
    );
};

// Why ZM QR? (Scroll-down Section)
const WhyZMQRSection = () => {
    return (
        <section className="py-20 px-8" style={{ backgroundColor: SITE_COLORS.sectionBgLight, color: SITE_COLORS.textDark }}>
            <div className="container mx-auto max-w-4xl text-center">
                <h2 className="text-3xl lg:text-4xl font-bold mb-12">
                    Why <span style={{ color: SITE_COLORS.accentTealDark }}>ZM QR Code</span>?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <FeatureItem
                        icon={<FaChartLine size={24} />}
                        title="Booming Market"
                        description="Tap into the exploding demand for QR Codes."
                    />
                    <FeatureItem
                        icon={<FaCheckCircle size={24} />}
                        title="Proven Model"
                        description="Leverage our tested & profitable business system."
                    />
                    <FeatureItem
                        icon={<FaTools size={24} />}
                        title="Diverse Services"
                        description="Offer a full spectrum of high-demand QR Solutions."
                    />
                    <FeatureItem
                        icon={<FaLaptopCode size={24} />}
                        title="Cutting-Edge Tech"
                        description="Access proprietary, user-friendly platform."
                    />
                    <FeatureItem
                        icon={<FaHeadset size={24} />}
                        title="Dedicated Support"
                        description="Benefit from comprehensive training & ongoing guidance."
                    />
                    <FeatureItem
                        icon={<FaMoneyBillWave size={24} />}
                        title="Recurring Revenue"
                        description="Build a sustainable business with subscription models."
                    />
                </div>
            </div>
        </section>
    );
};

// How QR Codes Transform Businesses (Visual/Infographic)
const HowQRCodesTransformBusinessesSection = () => {
    return (
        <section className="py-20 px-8" style={{ backgroundColor: SITE_COLORS.sectionBgSubtle, color: SITE_COLORS.textDark }}>
            <div className="container mx-auto max-w-4xl text-center">
                <h2 className="text-3xl lg:text-4xl font-bold mb-12">
                    How QR Codes Transform Businesses
                </h2>
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 0.5, scale: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.8 }}
                    className="mb-2 max-w-sm mx-auto" /* Added max-w-sm and mx-auto */
                >
                    <video
                        src="videos/reselling.mp4"
                        alt="Video demonstrating various QR code use cases for ZM QR Code Services"
                        className="rounded-xl shadow-xl w-full h-auto object-cover"
                        autoPlay
                        loop
                        muted
                        playsInline
                        controls
                        poster="your-video-poster.jpg"
                    >
                        Your browser does not support the video tag.
                    </video>
                    <p className="mt-6 text-lg" style={{ color: SITE_COLORS.textMuted }}>
                        From streamlined payments to interactive marketing, QR codes are revolutionizing industries.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

// Testimonials (Scrolling Carousel - Placeholder)
const TestimonialsSection = () => {
    const testimonials = [
        { quote: "Partnering with ZM QR Code Services has been a game-changer for our business. The support is incredible!", author: "Navya L., Franchisee" },
        { quote: "Their platform is so easy to use and our clients love the QR solutions. Highly recommend!", author: "Joseph., Business Owner" },
        { quote: "The recurring revenue model is fantastic. ZM QR Code has helped us achieve significant growth.", author: "Krishna., Entrepreneur" },
    ];

    // State to manage which testimonial is currently active for the simple placeholder
    const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

    // Simple interval to change testimonials (for demonstration, a real carousel would be more complex)
    React.useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTestimonialIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
        }, 5000); // Change every 5 seconds
        return () => clearInterval(interval);
    }, [testimonials.length]);


    return (
        <section className="py-20 px-8" style={{ backgroundColor: SITE_COLORS.sectionBgLight, color: SITE_COLORS.textDark }}>
            <div className="container mx-auto max-w-4xl text-center">
                <h2 className="text-3xl lg:text-4xl font-bold mb-12">
                    What Our <span style={{ color: SITE_COLORS.accentTealDark }}>Partners</span> Say
                </h2>
                <div className="relative overflow-hidden w-full max-w-2xl mx-auto h-48 flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        {/* Only render the current testimonial */}
                        <motion.div
                            key={currentTestimonialIndex} // Key is crucial for AnimatePresence to detect changes
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.5 }}
                            className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-md"
                            style={{ border: `1px solid ${SITE_COLORS.border}` }}
                        >
                            <img src="https://placehold.co/75x75/339999/FFFFFF?text=User" alt="User Photo" className="rounded-full w-16 h-16 object-cover mb-4" />
                            <p className="text-lg font-medium italic mb-2" style={{ color: SITE_COLORS.textDark }}>"{testimonials[currentTestimonialIndex].quote}"</p>
                            <p className="text-sm" style={{ color: SITE_COLORS.textMuted }}>- {testimonials[currentTestimonialIndex].author}</p>
                        </motion.div>
                    </AnimatePresence>
                </div>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-10 justify-center">

                    <SecondaryButton>Schedule a Discovery Call</SecondaryButton>
                </div>
            </div>
        </section>
    );
};

// 2. Why Franchise with ZM? (Detailed Benefits Page)
const WhyFranchiseWithZMSection = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const advantageBlocks = [
        {
            title: "The Market Opportunity",
            description: "Tap into the explosive growth of QR code usage across various industries. Consumers are increasingly relying on QR codes for everything from contactless payments to interactive content.",
            points: [
                "QR code usage surged by X% last year.",
                "Y% of consumers prefer QR for payments and information access.",
                "Diverse industries (retail, F&B, healthcare, events, marketing) demand QR solutions."
            ]
        },
        {
            title: "Our Proven Business Model",
            description: "Leverage a low-overhead, scalable business model designed for recurring revenue. Our system focuses on efficiency and automation to maximize your profitability.",
            points: [
                "Recurring revenue potential from dynamic QR codes and platform subscriptions.",
                "Low overhead and high scalability.",
                "Efficient and automated system for streamlined operations."
            ]
        },
        {
            title: "Comprehensive Service Portfolio",
            description: "Offer a full spectrum of high-demand QR solutions to cater to diverse client needs.",
            points: [
                "Dynamic & Static QR Codes",
                "Custom Design & Branding",
                "Advanced Management Platform & Analytics",
                "API Integration for seamless workflows",
                "Industry-Specific Solutions (e.g., Digital Menus, Event Check-in)"
            ]
        },
        {
            title: "Cutting-Edge Technology",
            description: "Gain access to the proprietary ZM platform, designed for ease of use, robust features, and continuous innovation.",
            points: [
                "Intuitive, user-friendly interface",
                "Powerful analytics dashboard",
                "Secure and reliable infrastructure",
                "Regular updates and new feature releases"
            ]
        },
        {
            title: "Unrivaled Support & Training",
            description: "Benefit from comprehensive training and ongoing guidance to ensure your success.",
            points: [
                "Intensive initial training: sales, tech, operations, marketing.",
                "Dedicated support team and extensive resource library.",
                "Ready-to-use marketing & sales collateral.",
                "Exclusive territory and a strong community network."
            ]
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prevIndex) =>
                (prevIndex + 1) % advantageBlocks.length
            );
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(interval); // Clear interval on component unmount
    }, [advantageBlocks.length]);

    const currentBlock = advantageBlocks[activeIndex];

    return (
        <section className="py-20 px-8" style={{ backgroundColor: SITE_COLORS.sectionBgSubtle, color: SITE_COLORS.textDark }}>
            <div className="container mx-auto max-w-6xl">
                <h2 className="text-3xl lg:text-4xl font-bold text-center mb-6">
                    Your Blueprint for Success: The <span style={{ color: SITE_COLORS.accentTealDark }}>ZM QR Code</span> Advantage
                </h2>
                <p className="text-lg leading-relaxed text-center mb-12" style={{ color: SITE_COLORS.textMuted }}>
                    Discover the unmatched benefits of partnering with a leader in digital connectivity.
                </p>

                <div className="relative overflow-hidden min-h-[300px] flex items-center justify-center"> {/* Added min-h to prevent layout shift */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeIndex} // Key is crucial for AnimatePresence to detect changes
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.8 }}
                            className="absolute w-full px-4" // Ensures the block takes full width and is centered
                        >
                            <div className="bg-white p-8 rounded-lg shadow-lg"> {/* Added a wrapper div for styling */}
                                <h3 className="text-2xl font-bold mb-4" style={{ color: SITE_COLORS.accentTealDark }}>{currentBlock.title}</h3>
                                <p className="mb-4" style={{ color: SITE_COLORS.textDark }}>
                                    {currentBlock.description}
                                </p>
                                <ul className="list-disc list-inside space-y-2" style={{ color: SITE_COLORS.textMuted }}>
                                    {currentBlock.points.map((point, idx) => (
                                        <li key={idx}>{point}</li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="text-center mt-12">
                    <PrimaryButton>Ready to make your mark? Explore Our Investment Details</PrimaryButton>
                </div>
            </div>
        </section>
    );
};

// 3. Investment & Support (Financials and What You Get Page)
const InvestmentAndSupportSection = () => {
    return (
        <section className="py-20 px-8" style={{ backgroundColor: SITE_COLORS.sectionBgLight, color: SITE_COLORS.textDark }}>
            <div className="container mx-auto max-w-4xl">
                <h2 className="text-3xl lg:text-4xl font-bold text-center mb-6">
                    Your Zero Investment, Our Commitment: <br /> Building Success Together
                </h2>
                <p className="text-lg leading-relaxed text-center mb-12" style={{ color: SITE_COLORS.textMuted }}>
                    Understand the financial roadmap and the extensive support network you'll receive.
                </p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6 }}
                    className="bg-white rounded-lg shadow-md p-6 mb-10"
                    style={{ border: `1px solid ${SITE_COLORS.border}` }}
                >
                    <h3 className="text-2xl font-bold mb-4" style={{ color: SITE_COLORS.accentTealDark }}>Franchise Investment Overview</h3>
                    <p className="mb-4" style={{ color: SITE_COLORS.textDark }}>
                        The estimated initial investment for a ZM QR Code Services franchise ranges from:
                    </p>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white rounded-lg">
                            <thead>
                                <tr style={{ backgroundColor: SITE_COLORS.primaryBg, color: SITE_COLORS.textPrimary }}>
                                    <th className="py-2 px-4 text-left text-sm font-semibold">Item</th>
                                    <th className="py-2 px-0 text-left text-sm font-semibold">Estimated Cost Range</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b" style={{ borderColor: SITE_COLORS.border }}>
                                    <td className="py-2 px-6">Initial Franchise Fee</td>
                                    <td className="py-2 px-10">0/-</td>
                                </tr>
                                <tr className="border-b" style={{ borderColor: SITE_COLORS.border }}>
                                    <td className="py-2 px-4">Training & Travel Expenses</td>
                                    <td className="py-2 px-10">0/-</td>
                                </tr>
                                <tr className="border-b" style={{ borderColor: SITE_COLORS.border }}>
                                    <td className="py-2 px-4">Initial Marketing Spend</td>
                                    <td className="py-2 px-10">0/-</td>
                                </tr>
                                <tr className="border-b" style={{ borderColor: SITE_COLORS.border }}>
                                    <td className="py-2 px-4">Technology Setup & Software</td>
                                    <td className="py-2 px-10">0/-</td>
                                </tr>
                                <tr className="border-b" style={{ borderColor: SITE_COLORS.border }}>
                                    <td className="py-2 px-4">Additional Working Capital (3 months)</td>
                                    <td className="py-2 px-10">0/-</td>
                                </tr>

                                <tr style={{ backgroundColor: SITE_COLORS.primaryBg, color: SITE_COLORS.textPrimary, fontWeight: 'bold' }}>
                                    <td className="py-2 px-4">Total Estimated Initial Investment</td>
                                    <td className="py-2 px-10">0/-</td>
                                </tr>

                                <tr className="border-b " style={{ borderColor: SITE_COLORS.border, fontWeight:'bold' }}>
                                    <td className="py-2 px-4">Marketing & Sales Toolkit</td>
                                    <td className="py-2 px-2 text-center">Depends</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p className="mt-6 text-sm italic" style={{ color: SITE_COLORS.textMuted }}>
                        * This is an estimated range. Please refer to our Franchise Disclosure Document (FDD) for detailed financial requirements and legal disclosures.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="bg-white rounded-lg shadow-md p-6 mb-10"
                    style={{ border: `1px solid ${SITE_COLORS.border}` }}
                >
                    <h3 className="text-2xl font-bold mb-4" style={{ color: SITE_COLORS.accentTealDark }}>What You Get with Your ZM Franchise</h3>
                    <ul className="list-disc list-inside space-y-2" style={{ color: SITE_COLORS.textDark }}>
                        <li><span className="font-semibold">Comprehensive Training Program:</span> Initial intensive training covering sales, technology, and operations.</li>
                        {/* Corrected line 349: Ensured no syntax errors */}
                        <li><span className="font-semibold">Dedicated Support Team:</span> Ongoing assistance and guidance, and extensive resource library.</li>
                        <li><span className="font-semibold">ZM Proprietary Platform Access:</span> Cutting-edge software and analytics dashboard.</li>

                        <li><span className="font-semibold">Operational Manuals & Best Practices:</span> Detailed guides for day-to-day management.</li>
                        <li><span className="font-semibold">Research & Development Updates:</span> Continuous innovation to keep you ahead.</li>
                    </ul>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-white rounded-lg shadow-md p-6"
                    style={{ border: `1px solid ${SITE_COLORS.border}` }}
                >
                    <h3 className="text-2xl font-bold mb-4" style={{ color: SITE_COLORS.accentTealDark }}>Ideal Candidate Profile</h3>
                    <p className="mb-4" style={{ color: SITE_COLORS.textDark }}>
                        ZM QR Code Services is looking for individuals who are:
                    </p>
                    <ul className="list-disc list-inside space-y-2" style={{ color: SITE_COLORS.textMuted }}>
                        <li>Entrepreneurial and driven</li>
                        <li>Sales-oriented with strong communication skills</li>
                        <li>Tech-curious and adaptable to new technologies</li>
                        <li>Customer-focused with a commitment to service excellence</li>
                    </ul>
                    <p className="mt-4 text-md font-semibold" style={{ color: SITE_COLORS.accentTeal }}>
                        Do you have what it takes? Learn more about who succeeds with ZM.
                    </p>
                </motion.div>


            </div>
        </section>
    );
};

// 4. Our Process (How to Become a Franchisee Page)
const OurProcessSection = () => {
    const steps = [
        { number: 1, title: "Inquiry & Information Request", description: "Fill out the online form and download our comprehensive Franchise Info Packet." },
        { number: 2, title: "Initial Discovery Call", description: "Engage in a brief, no-obligation chat with our Franchise Development Team to answer your preliminary questions." },
        { number: 3, title: "Review Franchise Disclosure Document (FDD)", description: "Dive deep into the legal and financial details of the ZM QR Code Services franchise opportunity." },
        { number: 4, title: "Territory Agreement & Franchise Agreement", description: "Finalize your exclusive territory and sign the official franchise agreement." },
        { number: 5, title: "Comprehensive Training", description: "Participate in our intensive training program designed to prepare you for a successful launch." },
        { number: 6, title: "Grand Opening & Ongoing Support", description: "Launch your ZM franchise with our continued guidance and support every step of the way." },
    ];

    return (
        <section className="py-20 px-8" style={{ backgroundColor: SITE_COLORS.sectionBgSubtle, color: SITE_COLORS.textDark }}>
            <div className="container mx-auto max-w-4xl">
                <h2 className="text-3xl lg:text-4xl font-bold text-center mb-6">
                    Your Journey to Becoming a <span style={{ color: SITE_COLORS.accentTealDark }}>ZM Franchisee</span>
                </h2>
                <p className="text-lg leading-relaxed text-center mb-12" style={{ color: SITE_COLORS.textMuted }}>
                    A simple, transparent process to launch your own successful QR Code business.
                </p>

                <div className="space-y-6">
                    {steps.map((step) => (
                        <motion.div
                            key={step.number}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.4 }}
                            transition={{ duration: 0.6, delay: (step.number - 1) * 0.1 }}
                            className="flex items-start bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:scale-[1.01]"
                            style={{ border: `1px solid ${SITE_COLORS.border}` }}
                        >
                            <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full font-bold text-lg mr-4" style={{ backgroundColor: SITE_COLORS.accentTeal, color: SITE_COLORS.textLight }}>
                                {step.number}
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-1" style={{ color: SITE_COLORS.accentTealDark }}>{step.title}</h3>
                                <p style={{ color: SITE_COLORS.textMuted }}>{step.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <PrimaryButton>Ready to start your journey? Contact Our Franchise Team</PrimaryButton>
                </div>
            </div>
        </section>
    );
};

// 5. Contact Us / Inquiry Form
const ContactUsSection = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        region: '',
        bestTime: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Contact Form Submission:", formData);
        alert("Thank you for your inquiry! We will get back to you shortly.");
        // In a real application, you'd send this data to a backend API
        setFormData({ // Clear form
            name: '',
            email: '',
            phone: '',
            region: '',
            bestTime: '',
            message: ''
        });
    };

    return (
        <section className="py-20 px-8" style={{ backgroundColor: SITE_COLORS.sectionBgLight, color: SITE_COLORS.textDark }}>
            <div className="container mx-auto max-w-4xl text-center">
                <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                    Connect with Our <span style={{ color: SITE_COLORS.accentTealDark }}>Franchise Development Team</span>
                </h2>
                <p className="text-lg leading-relaxed mb-10" style={{ color: SITE_COLORS.textMuted }}>
                    We're here to answer your questions and guide you through the ZM opportunity.
                </p>

                <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                    onSubmit={handleSubmit}
                    className="bg-white p-8 rounded-xl shadow-lg space-y-6 text-left mx-auto max-w-2xl"
                    style={{ border: `1px solid ${SITE_COLORS.border}` }}
                >
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium" style={{ color: SITE_COLORS.textPrimary }}>Name</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required
                            className="mt-1 block w-full p-3 border rounded-lg focus:ring-2"
                            style={{ borderColor: SITE_COLORS.border, outlineColor: SITE_COLORS.accentTeal, '--tw-ring-color': SITE_COLORS.accentTeal }}
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium" style={{ color: SITE_COLORS.textPrimary }}>Email</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required
                            className="mt-1 block w-full p-3 border rounded-lg focus:ring-2"
                            style={{ borderColor: SITE_COLORS.border, outlineColor: SITE_COLORS.accentTeal, '--tw-ring-color': SITE_COLORS.accentTeal }}
                        />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium" style={{ color: SITE_COLORS.textPrimary }}>Phone Number</label>
                        <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required
                            className="mt-1 block w-full p-3 border rounded-lg focus:ring-2"
                            style={{ borderColor: SITE_COLORS.border, outlineColor: SITE_COLORS.accentTeal, '--tw-ring-color': SITE_COLORS.accentTeal }}
                        />
                    </div>
                    <div>
                        <label htmlFor="region" className="block text-sm font-medium" style={{ color: SITE_COLORS.textPrimary }}>Preferred Region/City for Franchise</label>
                        <input type="text" id="region" name="region" value={formData.region} onChange={handleChange}
                            className="mt-1 block w-full p-3 border rounded-lg focus:ring-2"
                            style={{ borderColor: SITE_COLORS.border, outlineColor: SITE_COLORS.accentTeal, '--tw-ring-color': SITE_COLORS.accentTeal }}
                        />
                    </div>
                    <div>
                        <label htmlFor="bestTime" className="block text-sm font-medium" style={{ color: SITE_COLORS.textPrimary }}>Best Time to Call</label>
                        <input type="text" id="bestTime" name="bestTime" value={formData.bestTime} onChange={handleChange}
                            className="mt-1 block w-full p-3 border rounded-lg focus:ring-2"
                            style={{ borderColor: SITE_COLORS.border, outlineColor: SITE_COLORS.accentTeal, '--tw-ring-color': SITE_COLORS.accentTeal }}
                            placeholder="e.g., Weekdays, 10 AM - 2 PM"
                        />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium" style={{ color: SITE_COLORS.textPrimary }}>Message/Questions</label>
                        <textarea id="message" name="message" rows="4" value={formData.message} onChange={handleChange}
                            className="mt-1 block w-full p-3 border rounded-lg focus:ring-2"
                            style={{ borderColor: SITE_COLORS.border, outlineColor: SITE_COLORS.accentTeal, '--tw-ring-color': SITE_COLORS.accentTeal }}
                        ></textarea>
                    </div>
                    <div className="text-center">
                        <PrimaryButton type="submit" className="w-full sm:w-auto">Submit Inquiry</PrimaryButton>
                    </div>
                </motion.form>

                <div className="mt-10 text-lg" style={{ color: SITE_COLORS.textDark }}>
                    <p className="mb-4">
                        Email: <a href="mailto:franchise@zmqrcodeservices.com" className="font-semibold" style={{ color: SITE_COLORS.accentTeal }}>franchise@zmqrcodeservices.com</a>
                    </p>
                    <p>
                        Phone: <a href="tel:[Your Franchise Contact Number]" className="font-semibold" style={{ color: SITE_COLORS.accentTeal }}>[Your Franchise Contact Number]</a>
                    </p>
                </div>

                <p className="mt-10 text-sm" style={{ color: SITE_COLORS.textMuted }}>
                    &copy; {new Date().getFullYear()} ZM QR Code Services. All rights reserved. | <a href="#" style={{ color: SITE_COLORS.accentTeal }}>Privacy Policy</a> | <a href="#" style={{ color: SITE_COLORS.accentTeal }}>Terms of Service</a> | <a href="#" style={{ color: SITE_COLORS.accentTeal }}>Franchise Disclaimer</a>
                </p>
            </div>
        </section>
    );
};


// Main Home Page Component
export default function Home() {
    return (
        <div className="font-sans antialiased">
            <HeroSection />
            <WhyZMQRSection />
            <HowQRCodesTransformBusinessesSection />
            <TestimonialsSection />
            <WhyFranchiseWithZMSection />
            <InvestmentAndSupportSection />
            <OurProcessSection />
            <ContactUsSection />
        </div>
    );
}
