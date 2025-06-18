// 'use client';

// import React, { useEffect, useState } from 'react'
// import { motion } from 'framer-motion'
// import { useLanguage } from '@/context/languageContext/LanguageContext';

// import {
//   TrendingUpIcon,
//   UsersIcon,
//   DollarSignIcon,
//   TargetIcon,
//   MailIcon,
//   PhoneIcon,
//   ExternalLink
// } from 'lucide-react'
// import DemoForm from './demo/demoForm/demoForm';

// // Counter animation for each stat
// const AnimatedStat = ({ icon, label, start, end, suffix }) => {
//   const [count, setCount] = useState(start)
   
  
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCount(prev => {
//         const isFloat = typeof end === 'number' && !Number.isInteger(end)
//         const step = isFloat ? 0.1 : 1
//         const rounded = isFloat ? Math.round((prev + step) * 10) / 10 : prev + step

//         if (rounded < end) return rounded
//         clearInterval(interval)
//         return end
//       })
//     }, 5000)

//     return () => clearInterval(interval)
//   }, [end])

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 30 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.8 }}
//       className="text-center bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-xl"
//     >
//       <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-black">
//         {icon}
//       </div>
//       <h3 className="text-3xl font-bold text-[#008080]">
//         {count}{suffix}
//       </h3>
//       <p className="text-[#008080] mt-2">{label}</p>
//     </motion.div>
//   )
// }

// // InsightCard Component
// const InsightCard = ({ title, value, summary, link, color }) => (
//   <motion.div
//     initial={{ opacity: 0, y: 50 }}
//     whileInView={{ opacity: 1, y: 0 }}
//     transition={{ duration: 0.6 }}
//     className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition"
//   >
//     <h3 className={`text-xl font-bold mb-2 ${color}`}>{title}</h3>
//     <p className="text-gray-800 text-2xl font-semibold mb-2">{value}</p>
//     <p className="text-gray-600 text-sm mb-4">{summary}</p>
//     <a href={link} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 hover:underline text-sm">
//       Learn more <ExternalLink className="w-4 h-4 ml-1" />
//     </a>
//   </motion.div>
// )

// const Investors = () => {
//   const { dictionary } = useLanguage();

//    const [isOpen, setIsOpen] = useState(false);
//   return (
//     <>
//     <div className="w-full bg-[#159999] text-white font-sans pt-30">
//       <div className='bg-[#159292] text-black font-sans max-w-6xl mx-auto px-6 rounded-2xl'>
//         {/* Hero Section */}
//         <motion.section
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 1 }}
//           className="py-20 text-center px-6"
//         >
//           {/* <h1 className="text-5xl font-bold mb-2">Partner with ZM QR Code Services</h1> */}
//           <h1 className="text-5xl font-bold mb-2">{dictionary.investor.partner}</h1>
//           {/* <p className="inline-block bg-white text-[#033f3f] text-lg mb-4 px-3 py-1 rounded">
//             Scan | Store | Connect | Grow
//           </p> */}
//           <p className="inline-block bg-white text-[#033f3f] text-lg mb-4 px-3 py-1 rounded">
//             {dictionary.investor.scan_store_connect_grow}
//           </p>

//           {/* <p className="text-xl mb-8 max-w-3xl mx-auto">
//             Transforming how businesses and individuals use QR codes for digital identity, smart links, and interactive experiences.
//           </p> */}
//           <p className="text-xl mb-8 max-w-3xl mx-auto">
//             {dictionary.investor.hero_description}
//           </p>
//           <div className="flex justify-center gap-4 flex-wrap">
//             {/* <button className="bg-white text-[#008080] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
//               Download Pitch Deck
//             </button> */}
//             <button className="bg-white text-[#008080] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
//               {dictionary.investor.download_pitch}
//             </button>
//             {/* <button className="border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#008080] transition">
//               Schedule Meeting
//             </button> */}
//             <button className="border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#008080] transition">
//               {dictionary.investor.company_growth}
//             </button>
//           </div>
//         </motion.section>
//       </div>

//       {/* Stats Section */}
//       <section className="py-20">
//         <div className="max-w-6xl mx-auto px-6">
//           {/* <motion.h2
//             initial={{ opacity: 0, scale: 0.95 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.8 }}
//             className="text-4xl font-bold text-center mb-12"
//           >
//             Company Growth Highlights
//           </motion.h2> */}
//           <motion.h2
//             initial={{ opacity: 0, scale: 0.95 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.8 }}
//             className="text-4xl font-bold text-center mb-12"
//           >
//             {dictionary.investor.company_growth}
//           </motion.h2>
//           <div className="grid md:grid-cols-4 gap-10">
//             <div className="bg-white text-black p-6 rounded-xl shadow-md">
//               <AnimatedStat
//                 icon={<TrendingUpIcon className="text-teal-600" />}
//                 label="YoY Growth"
//                 start={300}
//                 end={500}
//                 suffix="%"
//               />
//             </div>
//             <div className="bg-white text-black p-6 rounded-xl shadow-md">
//               <AnimatedStat
//                 icon={<UsersIcon className="text-teal-600" />}
//                 label="Active Users"
//                 start={1}
//                 end={75}
//                 suffix="K+"
//               />
//             </div>
//             <div className="bg-white text-black p-6 rounded-xl shadow-md">
//               <AnimatedStat
//                 icon={<DollarSignIcon className="text-teal-600" />}
//                 label="ARR"
//                 start={1}
//                 end={3.2}
//                 suffix="M"
//               />
//             </div>
//             <div className="bg-white text-black p-6 rounded-xl shadow-md">
//               <AnimatedStat
//                 icon={<TargetIcon className="text-teal-600" />}
//                 label="Enterprise Clients"
//                 start={1}
//                 end={22}
//                 suffix="+"
//               />
//             </div>
//           </div>
//         </div>
//       </section>


//       {/* Investment Opportunity */}
//       <section className="py-16">
//         <div className="max-w-6xl mx-auto px-6">
//           <div className="grid lg:grid-cols-2 gap-12 items-center">
//             <div>
//               <h2 className="text-3xl font-bold mb-6">
//                 Investment Opportunity
//               </h2>
//               {/* <p className="text-lg text-gray-600 mb-6">
//                 We're raising $5M Series A to accelerate our growth, expand our
//                 team, and capture the rapidly growing market opportunity.
//               </p> */}
//               <p className="text-lg text-gray-600 mb-6">
//                 {dictionary.investor.we_are_raising}
//               </p>
//               <div className="space-y-4">
//                 <div className="flex justify-between py-2 border-b">
//                   {/* <span className="font-medium">Funding Round:</span> */}
//                   <span className="font-medium">{dictionary.investor.funding_round}:</span>
//                   <span>Series A</span>
//                 </div>
//                 <div className="flex justify-between py-2 border-b">
//                   {/* <span className="font-medium">Target Amount:</span> */}
//                   <span className="font-medium">{dictionary.investor.target_amount}:</span>
//                   <span>₹ 5,000,000</span>
//                 </div>
//                 <div className="flex justify-between py-2 border-b">
//                   {/* <span className="font-medium">Valuation:</span> */}
//                   <span className="font-medium">{dictionary.investor.valuation}:</span>
//                   <span>₹ 25,000,000</span>
//                 </div>
//                 <div className="flex justify-between py-2 border-b">
//                   {/* <span className="font-medium">Use of Funds:</span> */}
//                   <span className="font-medium">{dictionary.investor.use_of_funds}:</span>
//                   <span>Product Development & Marketing</span>
//                 </div>
//               </div>
//             </div>
//             <div>
//               <img
//                 src="/images/normal/Qrbar.png "
//                 alt="Team collaboration"
//                 className="rounded-lg shadow-lg w-full"
//               />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Why Invest Section */}
//       <section className="py-20">
//         <motion.div
//           initial={{ opacity: 0, y: 50 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1 }}
//           className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center"
//         >
//           {/* <div>
//             <h2 className="text-3xl font-bold mb-6">Why Invest in ZM?</h2>
//             <ul className="space-y-4 text-white/90 text-lg">
//               <li>✅ Booming demand for QR-based smart solutions</li>
//               <li>✅ Unique features like multi-link, analytics, vCard+, and branding</li>
//               <li>✅ Strong customer retention & fast user base expansion</li>
//               <li>✅ Scalable tech infrastructure ready for global deployment</li>
//             </ul>
//           </div> */}
//           <div>
//             <h2 className="text-3xl font-bold mb-6">{dictionary.investor.why_invest_zm}</h2>
//             <ul className="space-y-4 text-white/90 text-lg">
//               <li>✅ {dictionary.investor.bullet_1}</li>
//               <li>✅ {dictionary.investor.bullet_2}</li>
//               <li>✅ {dictionary.investor.bullet_3}</li>
//               <li>✅ {dictionary.investor.bullet_4}</li>
//             </ul>
//           </div>
//           <motion.img
//             initial={{ opacity: 0, scale: 0.8 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.8 }}
//             src="/images/normal/QrUsage.png"
//             alt="Investment Graph"
//             className="rounded-lg shadow-lg w-full"
//           />
//         </motion.div>
//       </section>

//       {/* QR Industry Market Stats */}
//       <section className="py-16 bg-[#1b9d9d] shadow-lg text-black">
//         {/* <div className="max-w-6xl mx-auto px-6">
//           <h2 className="text-3xl font-bold text-center mb-12">QR Code Industry Insights</h2>
//           <div className="grid md:grid-cols-3 gap-8">
//             <InsightCard
//               title="QR Industry Growth"
//               value="800% by 2030"
//               color="text-blue-600"
//               link="https://timesofindia.indiatimes.com/blogs/voices/qr-codes-and-the-future-of-marketing/"
//               summary="According to a report by BARC India and Nielsen, QR Code usage in India grew by 550% in 2020 compared to 2019."
//             />
//             <InsightCard
//               title="Mobile-First Future"
//               value="5.3B+ mobile users"
//               color="text-green-600"
//               link="https://www.statista.com/statistics/330695/number-of-smartphone-users-worldwide/"
//               summary="Over 5.3 billion smartphone users rely on mobile scanning, boosting QR code usage."
//             />
//             <InsightCard
//               title="Contactless Revolution"
//               value="Accelerated by COVID"
//               color="text-purple-600"
//               link="https://www.uniqode.com/blog/qr-code-insights/qr-code-report"
//               summary="QR codes became essential post-pandemic for touchless interaction & marketing."
//             />
//           </div>
//         </div> */}
//         <div className="max-w-6xl mx-auto px-6">
//           <h2 className="text-3xl font-bold text-center mb-12">{dictionary.investor.qr_insights}</h2>
//           <div className="grid md:grid-cols-3 gap-8">
//             <InsightCard
//               title={dictionary.investor.qr_industry_growth}
//               value="800% by 2030"
//               color="text-blue-600"
//               link="https://timesofindia.indiatimes.com/blogs/voices/qr-codes-and-the-future-of-marketing/"
//               summary={dictionary.investor.qr_industry_growth_summary}
//             />
//             <InsightCard
//               title={dictionary.investor.mobile_first_future}
//               value="5.3B+ mobile users"
//               color="text-green-600"
//               link="https://www.statista.com/statistics/330695/number-of-smartphone-users-worldwide/"
//               summary={dictionary.investor.mobile_first_summary}
//             />
//             <InsightCard
//               title={dictionary.investor.contactless_revolution}
//               value="Accelerated by COVID"
//               color="text-purple-600"
//               link="https://www.uniqode.com/blog/qr-code-insights/qr-code-report"
//               summary={dictionary.investor.contactless_summary}
//             />
//           </div>
//         </div>
//       </section>

//       {/* Contact Section */}
//       <section className="py-20">
//         <motion.div
//           initial={{ opacity: 0, scale: 0.95 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 1 }}
//           className="max-w-4xl mx-auto px-6 text-center bg-white/10 backdrop-blur-md rounded-2xl p-10 shadow-2xl"
//         >
//           <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
//           <p className="text-xl mb-8">{dictionary.investor.contact_description}</p>
//           {/* <p className="text-xl mb-8">We welcome investors who believe in technology-driven growth. Reach out to explore.</p> */}
//           <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
//             <div className="flex items-center justify-center gap-3">
//               <MailIcon className="w-6 h-6" />
//               <span>invest@zmqrcode.com</span>
//             </div>
//             <div className="flex items-center justify-center gap-3">
//               <PhoneIcon className="w-6 h-6" />
//               <span>+91 90000 12345</span>
//             </div>
//           </div>
//           {/* <button className="mt-8 bg-white text-[#008080] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
//             Contact Investor Relations
//           </button> */}
//           <button className="mt-8 bg-white text-[#008080] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition cursor-pointer" onClick={() => setIsOpen(true)}>
//             {dictionary.investor.contact_ir}
//           </button>
//         </motion.div>
//       </section>

//     </div>

//    {isOpen && <DemoForm onClose={() => setIsOpen(false)} />}
//     </>
//   )
// }

// export default Investors
"use client";

import { useRef, useState, createContext, useContext, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

// Dynamically import Chart.js to avoid SSR issues
const DynamicLineChart = dynamic(() => import('@/components/LineChart'), {
  ssr: false,
});

const DynamicPieChart = dynamic(() => import('@/components/PieChart'), {
  ssr: false,
});

import {
  ArrowDownIcon,
  ChartBarIcon,
  BoltIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  ArrowRightIcon,
  EnvelopeIcon,
  PhoneIcon,
  BuildingOfficeIcon,
  SunIcon,
  MoonIcon,
  CheckIcon
} from '@heroicons/react/24/outline';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend } from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  BarElement, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

// Theme context
const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme') || 
                      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const useTheme = () => useContext(ThemeContext);

// Chart components with theme-aware colors
const RevenueChart = ({ darkMode }) => {
  const textColor = darkMode ? '#e5e7eb' : '#111827';
  const gridColor = darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';

  const data = {
    labels: ['2024', '2025', '2026', '2027','2028','2029','2030P'],
    datasets: [{
      label: 'Revenue ($M)',
      data: [0.5, 2.1, 5.3, 12.0,18.0,25.0,35.0,],
      backgroundColor: '#008080',
      borderColor: '#006666',
      borderWidth: 2,
      borderRadius: 4
    }]
  };

  const options = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      y: { 
        beginAtZero: true,
        grid: { color: gridColor },
        ticks: { color: textColor }
      },
      x: {
        grid: { display: false },
        ticks: { color: textColor }
      }
    }
  };

  return <Bar data={data} options={options} />;
};

const UserGrowthChart = ({ darkMode }) => {
  const textColor = darkMode ? '#e5e7eb' : '#111827';
  const gridColor = darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';

  const data = {
    labels: ['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024', 'Q1 2025', 'Q2 2025'],
    datasets: [{
      label: 'Monthly Active Users',
      data: [50000, 95000, 150000, 220000, 350000, 500000],
      borderColor: '#008080',
      backgroundColor: 'rgba(0, 128, 128, 0.1)',
      borderWidth: 3,
      tension: 0.4,
      fill: true
    }]
  };

  const options = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      y: { 
        grid: { color: gridColor },
        ticks: { color: textColor }
      },
      x: {
        grid: { display: false },
        ticks: { color: textColor }
      }
    }
  };

  return <Line data={data} options={options} />;
};

const MarketGrowthChart = ({ darkMode }) => {
  const textColor = darkMode ? '#e5e7eb' : '#111827';
  const gridColor = darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';

  const data = {
    labels: ['2023', '2024', '2025', '2026', '2027', '2030'],
    datasets: [{
      label: 'Global QR Market ($B)',
      data: [8.2, 10.5, 13.1, 16.7, 20.4, 26.0],
      borderColor: '#008080',
      backgroundColor: 'rgba(0, 128, 128, 0.1)',
      borderWidth: 3,
      tension: 0.3,
      fill: true
    }]
  };

  const options = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      y: { 
        grid: { color: gridColor },
        ticks: { color: textColor }
      },
      x: {
        grid: { display: false },
        ticks: { color: textColor }
      }
    }
  };

  return <Line data={data} options={options} />;
};

const AllocationChart = ({ darkMode }) => {
  const textColor = darkMode ? '#e5e7eb' : '#111827';

  const data = {
    labels: ['Product Dev', 'Marketing', 'Expansion', 'Operations'],
    datasets: [{
      data: [40, 30, 20, 10],
      backgroundColor: [
        '#008080',
        '#006666',
        '#004c4c',
        '#003333'
      ],
      borderWidth: 0
    }]
  };

  const options = {
    plugins: {
      legend: {
        position: 'right',
        labels: { color: textColor }
      }
    }
  };

  return <Pie data={data} options={options} />;
};

const InvestorsPage = () => {
  const containerRef = useRef(null);
  const { theme, toggleTheme } = useTheme();
  const darkMode = theme === 'dark';
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    phone: '',
    inquiryType: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const { width, height } = useWindowSize();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Parallax effects
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.5]);

  // Teal gradient
  const tealGradient = 'bg-gradient-to-r from-teal-600 to-teal-800';

  // Stats data
  const stats = [
    { value: "10M+", label: "QR Codes Generated", icon: <BoltIcon className="h-8 w-8 text-teal-400" /> },
    { value: "500K+", label: "Active Users", icon: <UserGroupIcon className="h-8 w-8 text-teal-400" /> },
    { value: "85%", label: "Retention Rate", icon: <ShieldCheckIcon className="h-8 w-8 text-teal-400" /> },
    { value: "$5M", label: "Annual Revenue", icon: <CurrencyDollarIcon className="h-8 w-8 text-teal-400" /> },
  ];

  // Funding rounds
  const rounds = [
    { name: "Series B", date: "Q4 2024", amount: "$15M", valuation: "$120M", lead: "Sequoia Capital" },
    { name: "Series A", date: "Q2 2023", amount: "$10M", valuation: "$60M", lead: "Andreessen Horowitz" },
    { name: "Seed", date: "Q3 2022", amount: "$2M", valuation: "$12M", lead: "Y Combinator" }
  ];

  // Technology stack
  const technologies = [
    {
      name: "Dynamic QR Generation",
      description: "Real-time QR code creation with advanced customization",
      icon: <BoltIcon className="h-8 w-8 text-teal-400" />
    },
    {
      name: "Analytics Dashboard",
      description: "Comprehensive scan tracking and user insights",
      icon: <ChartBarIcon className="h-8 w-8 text-teal-400" />
    },
    {
      name: "Enterprise API",
      description: "Seamless integration with existing systems",
      icon: <ShieldCheckIcon className="h-8 w-8 text-teal-400" />
    },
    {
      name: "AI Optimization",
      description: "Machine learning for scan prediction",
      icon: <UserGroupIcon className="h-8 w-8 text-teal-400" />
    }
  ];

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 10000);
  };

  // Theme-aware background colors
  const bgColor = darkMode ? 'bg-gray-900' : 'bg-gray-50';
  const secondaryBgColor = darkMode ? 'bg-gray-800' : 'bg-white';
  const textColor = darkMode ? 'text-white' : 'text-gray-900';
  const secondaryTextColor = darkMode ? 'text-gray-300' : 'text-gray-600';
  const borderColor = darkMode ? 'border-gray-700' : 'border-gray-200';

  return (
    <div className={`min-h-screen ${bgColor} ${textColor} pt-20`} ref={containerRef} >
      <Head>
        <title>Invest in ZM QR Code Services | Next-Gen QR Solutions</title>
        <meta name="description" content="Join ZM QR's growth journey with our innovative QR technology" />
      </Head>

      {/* Navigation */}
      <nav className={`fixed w-full z-50 ${secondaryBgColor} bg-opacity-90 backdrop-blur-md border-b ${borderColor}`}>
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
         
          <div className="flex items-center space-x-8">
            <div className="hidden md:flex space-x-8">
              {['Overview', 'Traction', 'Technology', 'Contact'].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  whileHover={{ scale: 1.05 }}
                  className={`${secondaryTextColor} hover:text-teal-400 transition-colors`}
                >
                  {item}
                </motion.a>
              ))}
            </div>
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-700'}`}
              aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
            >
              {darkMode ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section 
        className={`relative h-screen w-full overflow-hidden flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}
        style={{ y: backgroundY }}
      >
        <motion.div 
          className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center"
          style={{ opacity }}
        />
        <div className={`absolute inset-0 ${darkMode ? 'bg-gray-900/70' : 'bg-white/70'} bg-gradient-to-t ${darkMode ? 'via-gray-900/70' : 'via-white/70'} to-transparent`} />
        
        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            <span className={`${tealGradient} bg-clip-text text-transparent`}>
              Invest in the Future
            </span>
            <br />
            of Digital Engagement
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className={`text-xl md:text-2xl ${secondaryTextColor} mb-10 max-w-3xl mx-auto`}
          >
            ZM QR is transforming connections through next-generation QR technology.
          </motion.p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`bg-transparent border-2 border-teal-500 ${textColor} px-8 py-4 rounded-full font-semibold text-lg hover:bg-teal-900/30 transition-all`}
            >
              Contact Our Team
            </motion.a>
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <section id="overview" className={`py-24 ${secondaryBgColor}`}>
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why <span className="text-teal-400">ZM QR</span>?
            </h2>
            <p className={`text-xl ${secondaryTextColor} max-w-3xl mx-auto`}>
              Industry-leading QR technology with proven adoption metrics.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`${secondaryBgColor} backdrop-blur-md rounded-2xl p-8 border ${darkMode ? 'border-teal-500/20' : 'border-teal-300'} hover:${darkMode ? 'border-teal-500/40' : 'border-teal-400'} transition-all shadow-lg`}
              >
                <div className="text-teal-400 mb-4">
                  {stat.icon}
                </div>
                <h3 className="text-4xl font-bold mb-2">{stat.value}</h3>
                <p className={secondaryTextColor}>{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Market Opportunity */}
      <section className={`py-24 ${bgColor}`}>
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="lg:w-1/2"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                <span className="text-teal-400">$26B</span> Market Opportunity
              </h2>
              <p className={`text-xl ${secondaryTextColor} mb-8`}>
                The global QR code market is growing at 18.7% CAGR through 2030.
              </p>
              <ul className="space-y-4">
                {[
                  "Contactless payments adoption",
                  "Digital marketing transformation",
                  "Supply chain digitization"
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start"
                  >
                    <span className="text-teal-400 mr-3 mt-1">
                      <ArrowRightIcon className="h-5 w-5" />
                    </span>
                    <span className="text-lg">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className={`lg:w-1/2 ${secondaryBgColor} rounded-2xl p-8 h-full shadow-lg`}
            >
              <div className="h-80 w-full">
                <MarketGrowthChart darkMode={darkMode} />
              </div>
              <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                {[
                  { value: "18.7%", label: "CAGR" },
                  { value: "$8.2B", label: "2023 Market" },
                  { value: "$26B", label: "2030 Projection" }
                ].map((item, index) => (
                  <div key={index} className={`${darkMode ? 'bg-teal-900/30' : 'bg-teal-100'} p-3 rounded-lg border ${darkMode ? 'border-teal-500/20' : 'border-teal-300'}`}>
                    <p className="text-xl font-bold text-teal-400">{item.value}</p>
                    <p className={secondaryTextColor}>{item.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Traction Section */}
      <section id="traction" className={`py-24 ${secondaryBgColor}`}>
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Our <span className="text-teal-400">Traction</span>
            </h2>
            <p className={`text-xl ${secondaryTextColor} max-w-3xl mx-auto`}>
              Consistent growth across all key metrics.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              className={`${secondaryBgColor} backdrop-blur-md rounded-2xl p-8 border ${darkMode ? 'border-teal-500/20' : 'border-teal-300'} shadow-lg`}
            >
              <h3 className="text-2xl font-bold mb-6">Expected Revenue Growth</h3>
              <div className="h-64 w-full">
                <RevenueChart darkMode={darkMode} />
              </div>
              <div className="mt-6 grid grid-cols-4 gap-4">
                {[
                  { year: "2024", revenue: "$0.5M" },
                  { year: "2025", revenue: "$2.1M" },
                  { year: "2026", revenue: "$5.3M" },
                  { year: "2027", revenue: "$12M" },
                  { year: "2028", revenue: "$18M" },
                  { year: "2029", revenue: "$25M" },
                  { year: "2030P", revenue: "$35M" },
                ].map((item, index) => (
                  <div key={index} className={`${darkMode ? 'bg-teal-900/30' : 'bg-teal-100'} p-3 rounded-lg border ${darkMode ? 'border-teal-500/20' : 'border-teal-300'}`}>
                    <p className={`text-sm ${secondaryTextColor}`}>{item.year}</p>
                    <p className="font-semibold">{item.revenue}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`${secondaryBgColor} backdrop-blur-md rounded-2xl p-8 border ${darkMode ? 'border-teal-500/20' : 'border-teal-300'} shadow-lg`}
            >
              <h3 className="text-2xl font-bold mb-6">Expected User Growth</h3>
              <div className="h-64 w-full">
                <UserGrowthChart darkMode={darkMode} />
              </div>
              <div className="mt-6 grid grid-cols-3 gap-4">
                {[
                  { metric: "500K+", label: "Active Users" },
                  { metric: "85%", label: "Retention" },
                  { metric: "4.8/5", label: "Rating" }
                ].map((item, index) => (
                  <div key={index} className={`${darkMode ? 'bg-teal-900/30' : 'bg-teal-100'} p-3 rounded-lg border ${darkMode ? 'border-teal-500/20' : 'border-teal-300'}`}>
                    <p className="text-lg font-semibold text-teal-400">{item.metric}</p>
                    <p className={`text-sm ${secondaryTextColor}`}>{item.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section id="technology" className={`py-24 ${bgColor}`}>
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Our <span className="text-teal-400">Technology</span>
            </h2>
            <p className={`text-xl ${secondaryTextColor} max-w-3xl mx-auto`}>
              Cutting-edge infrastructure powering the next generation of QR solutions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`${secondaryBgColor} backdrop-blur-md rounded-2xl p-8 border ${darkMode ? 'border-teal-500/20' : 'border-teal-300'} hover:${darkMode ? 'border-teal-500/40' : 'border-teal-400'} transition-all shadow-lg`}
              >
                <div className="text-teal-400 mb-4">
                  {tech.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3">{tech.name}</h3>
                <p className={secondaryTextColor}>{tech.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Invest in Us Section */}
      <section className={`py-24 ${secondaryBgColor}`}>
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why <span className="text-teal-400">Invest</span> in Us?
            </h2>
            <p className={`text-lg ${secondaryTextColor} max-w-2xl mx-auto`}>
              Back a company that's shaping the future with real traction, scalable growth, and visionary leadership.
            </p>
          </motion.div>

          {/* Value Propositions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {[
              { icon: "🚀", title: "Rapid Growth", desc: "Achieved 300% revenue growth in the past 12 months." },
              { icon: "🌍", title: "Global Reach", desc: "Presence in over 15 countries and expanding rapidly." },
              { icon: "💡", title: "Innovative Tech", desc: "Built using scalable cloud and AI-powered architecture." },
              { icon: "🤝", title: "Trusted Partners", desc: "Collaborated with industry leaders and unicorns." }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className={`p-6 rounded-xl border shadow-lg text-center ${
                  darkMode ? 'bg-teal-900/30 border-teal-500/20' : 'bg-white border-teal-300'
                }`}
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                <p className={`text-sm ${secondaryTextColor}`}>{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Mission & Vision */}
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-10 mb-20`}>
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className={`${darkMode ? 'bg-teal-900/30 border-teal-500/20' : 'bg-white border-teal-300'} p-8 rounded-xl border shadow-md`}
            >
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className={secondaryTextColor}>
                To transform how people connect, transact, and experience services using technology that scales with their dreams.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className={`${darkMode ? 'bg-teal-900/30 border-teal-500/20' : 'bg-white border-teal-300'} p-8 rounded-xl border shadow-md`}
            >
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className={secondaryTextColor}>
                To be a global leader in tech innovation, empowering millions through seamless digital experiences and impactful solutions.
              </p>
            </motion.div>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <h4 className="text-2xl font-bold mb-4">Join Our Journey</h4>
            <p className={`mb-6 max-w-xl mx-auto ${secondaryTextColor}`}>
              Be part of a revolution. Help us scale globally and build a future-driven ecosystem.
            </p>
            <a
              href="#contact"
              className="inline-block px-6 mt-10 py-2 text-white bg-teal-500 hover:bg-teal-600 rounded-lg font-medium transition"
            >
              Let's Talk Investment
            </a>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`py-24 ${secondaryBgColor}`}>
        <div className="container mx-auto px-6">
          <h1 className='text-3xl lg:text-4xl font-bold mb-20 text-center'>Let discuss for <span className='text-teal-500'>Investment</span></h1>
          <div className="flex flex-col lg:flex-row gap-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="lg:w-1/2"
            >
              <img src="/images/normal/business-form-handshake.jpeg" className='mb-10  w-400 h-140 rounded-3xl'/>
              <h2 className="text-2xl md:text-2xl font-bold mb-8">
                Get in <span className="text-teal-400">Touch</span>
              </h2>
              <p className={`text-xl ${secondaryTextColor} mb-8`}>
                Contact our investment team for more information.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="lg:w-1/2"
            >
              <div className={`${secondaryBgColor} backdrop-blur-md rounded-2xl p-8 border ${darkMode ? 'border-teal-500/20' : 'border-teal-300'} shadow-lg`}>
                <h3 className="text-2xl font-bold mb-6">Enter Details</h3>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    <div>
                      <label className={`block text-sm font-medium ${secondaryTextColor} mb-1`}>
                        Full Name:
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} border ${darkMode ? 'border-gray-600' : 'border-gray-300'} rounded-lg px-4 py-3 ${textColor} focus:outline-none focus:ring-2 focus:ring-teal-500`}
                        required
                      />
                    </div>
                    
                    <div>
                      <label className={`block text-sm font-medium ${secondaryTextColor} mb-1`}>
                        Email Address:
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} border ${darkMode ? 'border-gray-600' : 'border-gray-300'} rounded-lg px-4 py-3 ${textColor} focus:outline-none focus:ring-2 focus:ring-teal-500`}
                        required
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium ${secondaryTextColor} mb-1`}>
                        Phone No:
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        pattern="[789][0-9]{9}"
                        placeholder='Ex-987654321'
                        className={`w-full ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} border ${darkMode ? 'border-gray-600' : 'border-gray-300'} rounded-lg px-4 py-3 ${textColor} focus:outline-none focus:ring-2 focus:ring-teal-500`}
                        required
                      />
                    </div>
                    
                    <div>
                      <label className={`block text-sm font-medium ${secondaryTextColor} mb-1`}>
                        Inquiry Type:
                      </label>
                      <select
                        name="inquiryType"
                        value={formData.inquiryType}
                        onChange={handleInputChange}
                        className={`w-full ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} border ${darkMode ? 'border-gray-600' : 'border-gray-300'} rounded-lg px-4 py-3 ${textColor} focus:outline-none focus:ring-2 focus:ring-teal-500`}
                        required
                      >
                        <option value="">-- Please select an option --</option>
                        <option value="Investment Inquiry">Investment Inquiry</option>
                        <option value="Ready to Invest">Ready to Invest</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className={`block text-sm font-medium ${secondaryTextColor} mb-1`}>
                        Describe
                      </label>
                      <textarea
                        rows="2"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        className={`w-full ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} border ${darkMode ? 'border-gray-600' : 'border-gray-300'} rounded-lg px-4 py-3 ${textColor} focus:outline-none focus:ring-2 focus:ring-teal-500`}
                      ></textarea>
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className={`w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-lg transition-all`}
                    >
                      Submit
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {showSuccess && (
  <>
    <Confetti
      width={width}
      height={height}
      recycle={false}
      numberOfPieces={500}
      colors={['#008080', '#006666', '#0d9488', '#0f766e', '#115e59']}
    />
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Blurred background overlay */}
      <div 
        className="absolute inset-0 bg-black/30 backdrop-blur-md"
        onClick={() => setShowSuccess(false)}
      />
      
      {/* Popup card */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 25 }}
        className={`relative ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl z-10 border ${darkMode ? 'border-teal-500/20' : 'border-teal-200'}`}
      >
        <div className="text-center">
          {/* Animated checkmark circle */}
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-teal-500/10 mb-6"
          >
            <motion.div
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <CheckIcon className="h-10 w-10 text-teal-500" strokeWidth={2} />
            </motion.div>
          </motion.div>

          {/* Title with gradient text */}
          <h3 className={`text-3xl font-bold bg-gradient-to-r from-teal-500 to-teal-700 bg-clip-text text-transparent mb-4`}>
            Congratulations!
          </h3>
          
          {/* Beautifully styled message */}
          <div className={`prose prose-lg ${darkMode ? 'prose-invert' : ''} mb-6 text-left`}>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
              Thank you for expressing your interest in investing in our organization. 
            </p>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
              We truly appreciate your confidence in our vision and commitment. Our investment team will contact you within 48 hours to:
            </p>
            <ul className={`space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <li className="flex items-start">
                <ArrowRightIcon className="h-5 w-5 text-teal-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Share detailed investment materials</span>
              </li>
              <li className="flex items-start">
                <ArrowRightIcon className="h-5 w-5 text-teal-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Answer any questions you may have</span>
              </li>
              <li className="flex items-start">
                <ArrowRightIcon className="h-5 w-5 text-teal-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Discuss next steps</span>
              </li>
            </ul>
          </div>

          {/* Action button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowSuccess(false)}
            className={`px-8 py-3 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white rounded-lg font-medium transition-all shadow-lg`}
          >
            Got it, thank you!
          </motion.button>
        </div>
      </motion.div>
    </div>
  </>
)}
    </div>
  );
};

export default function AppWrapper() {
  return (
    <ThemeProvider>
      <InvestorsPage />
    </ThemeProvider>
  );
}




// 'use client';





// const canvasRef = useRef(null);
// useEffect(() => {
//     // QR code background animation
//     if (typeof window !== 'undefined' && canvasRef.current) {
//       const canvas = canvasRef.current;
//       const ctx = canvas.getContext('2d');
//       canvas.width = window.innerWidth;
//       canvas.height = window.innerHeight;

//       // Create floating QR code elements
//       const elements = [];
//       const colors = ['#4F46E5', '#10B981', '#3B82F6', '#F59E0B', '#EF4444'];
//       const shapes = ['square', 'circle', 'triangle'];

//       for (let i = 0; i < 50; i++) {
//         elements.push({
//           x: Math.random() * canvas.width,
//           y: Math.random() * canvas.height,
//           size: Math.random() * 30 + 10,
//           speedX: Math.random() * 2 - 1,
//           speedY: Math.random() * 2 - 1,
//           color: colors[Math.floor(Math.random() * colors.length)],
//           shape: shapes[Math.floor(Math.random() * shapes.length)],
//           rotation: Math.random() * 360,
//           rotationSpeed: Math.random() * 2 - 1
//         });
//       }

//       function animate() {
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
        
//         elements.forEach(el => {
//           ctx.save();
//           ctx.translate(el.x, el.y);
//           ctx.rotate(el.rotation * Math.PI / 180);
//           ctx.fillStyle = el.color + '20'; // Add transparency
          
//           if (el.shape === 'square') {
//             ctx.fillRect(-el.size/2, -el.size/2, el.size, el.size);
//           } else if (el.shape === 'circle') {
//             ctx.beginPath();
//             ctx.arc(0, 0, el.size/2, 0, Math.PI * 2);
//             ctx.fill();
//           } else if (el.shape === 'triangle') {
//             ctx.beginPath();
//             ctx.moveTo(0, -el.size/2);
//             ctx.lineTo(el.size/2, el.size/2);
//             ctx.lineTo(-el.size/2, el.size/2);
//             ctx.closePath();
//             ctx.fill();
//           }
          
//           ctx.restore();
          
//           // Update position
//           el.x += el.speedX;
//           el.y += el.speedY;
//           el.rotation += el.rotationSpeed;
          
//           // Bounce off edges
//           if (el.x < 0 || el.x > canvas.width) el.speedX *= -1;
//           if (el.y < 0 || el.y > canvas.height) el.speedY *= -1;
//         });
        
//         requestAnimationFrame(animate);
//       }
      
//       animate();

//       // Handle resize
//       const handleResize = () => {
//         canvas.width = window.innerWidth;
//         canvas.height = window.innerHeight;
//       };
      
//       window.addEventListener('resize', handleResize);
//       return () => window.removeEventListener('resize', handleResize);
//     }
//   }, []);