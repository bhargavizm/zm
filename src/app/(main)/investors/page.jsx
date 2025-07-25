"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Head from "next/head";
import dynamic from "next/dynamic";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { useLanguage } from '@/context/languageContext/LanguageContext';

// Dynamically import Chart.js to avoid SSR issues
const DynamicLineChart = dynamic(() => import("@/components/LineChart"), {
  ssr: false,
});

const DynamicPieChart = dynamic(() => import("@/components/PieChart"), {
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
  CheckIcon,
} from "@heroicons/react/24/outline";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line, Pie } from "react-chartjs-2";

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

// Chart components with light mode colors
const RevenueChart = () => {
  const textColor = "#111827";
  const gridColor = "rgba(0, 0, 0, 0.1)";

  const data = {
    labels: ["2024", "2025", "2026", "2027", "2028", "2029", "2030P"],
    datasets: [
      {
        label: "Revenue ($M)",
        data: [0.5, 2.1, 5.3, 12.0, 18.0, 25.0, 35.0],
        backgroundColor: "#008080",
        borderColor: "#006666",
        borderWidth: 2,
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: gridColor },
        ticks: { color: textColor },
      },
      x: {
        grid: { display: false },
        ticks: { color: textColor },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

const UserGrowthChart = () => {
  const textColor = "#111827";
  const gridColor = "rgba(0, 0, 0, 0.1)";

  const data = {
    labels: ["Q1 2024", "Q2 2024", "Q3 2024", "Q4 2024", "Q1 2025", "Q2 2025"],
    datasets: [
      {
        label: "Monthly Active Users",
        data: [50000, 95000, 150000, 220000, 350000, 500000],
        borderColor: "#008080",
        backgroundColor: "rgba(0, 128, 128, 0.1)",
        borderWidth: 3,
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      y: {
        grid: { color: gridColor },
        ticks: { color: textColor },
      },
      x: {
        grid: { display: false },
        ticks: { color: textColor },
      },
    },
  };

  return <Line data={data} options={options} />;
};

const MarketGrowthChart = () => {
  const textColor = "#111827";
  const gridColor = "rgba(0, 0, 0, 0.1)";

  const data = {
    labels: ["2023", "2024", "2025", "2026", "2027", "2030"],
    datasets: [
      {
        label: "Global QR Market ($B)",
        data: [8.2, 10.5, 13.1, 16.7, 20.4, 26.0],
        borderColor: "#008080",
        backgroundColor: "rgba(0, 128, 128, 0.1)",
        borderWidth: 3,
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      y: {
        grid: { color: gridColor },
        ticks: { color: textColor },
      },
      x: {
        grid: { display: false },
        ticks: { color: textColor },
      },
    },
  };

  return <Line data={data} options={options} />;
};

const AllocationChart = () => {
  const textColor = "#111827";

  const data = {
    labels: ["Product Dev", "Marketing", "Expansion", "Operations"],
    datasets: [
      {
        data: [40, 30, 20, 10],
        backgroundColor: ["#008080", "#006666", "#004c4c", "#003333"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "right",
        labels: { color: textColor },
      },
    },
  };

  return <Pie data={data} options={options} />;
};

const InvestorsPage = () => {
  const { dictionary } = useLanguage();
  const containerRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
    phone: "",
    inquiryType: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const { width, height } = useWindowSize();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Parallax effects
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.5]);

  // Teal gradient
  const tealGradient = "bg-gradient-to-r from-teal-600 to-teal-800";

  // Stats data
  const stats = [
    {
      value: "10M+",
      label: "QR Codes Generated",
      icon: <BoltIcon className="h-8 w-8 text-teal-400" />,
    },
    {
      value: "500K+",
      label: "Active Users",
      icon: <UserGroupIcon className="h-8 w-8 text-teal-400" />,
    },
    {
      value: "85%",
      label: "Retention Rate",
      icon: <ShieldCheckIcon className="h-8 w-8 text-teal-400" />,
    },
    {
      value: "$5M",
      label: "Annual Revenue",
      icon: <CurrencyDollarIcon className="h-8 w-8 text-teal-400" />,
    },
  ];

  // Funding rounds
  const rounds = [
    {
      name: "Series B",
      date: "Q4 2024",
      amount: "$15M",
      valuation: "$120M",
      lead: "Sequoia Capital",
    },
    {
      name: "Series A",
      date: "Q2 2023",
      amount: "$10M",
      valuation: "$60M",
      lead: "Andreessen Horowitz",
    },
    {
      name: "Seed",
      date: "Q3 2022",
      amount: "$2M",
      valuation: "$12M",
      lead: "Y Combinator",
    },
  ];

  // Technology stack
  const technologies = [
    {
      name: "Dynamic QR Generation",
      description: "Real-time QR code creation with advanced customization",
      icon: <BoltIcon className="h-8 w-8 text-teal-400" />,
    },
    {
      name: "Analytics Dashboard",
      description: "Comprehensive scan tracking and user insights",
      icon: <ChartBarIcon className="h-8 w-8 text-teal-400" />,
    },
    {
      name: "Enterprise API",
      description: "Seamless integration with existing systems",
      icon: <ShieldCheckIcon className="h-8 w-8 text-teal-400" />,
    },
    {
      name: "AI Optimization",
      description: "Machine learning for scan prediction",
      icon: <UserGroupIcon className="h-8 w-8 text-teal-400" />,
    },
  ];

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 10000);
  };

  return (
    <div className="bg-gray-50 text-gray-900 md:pt-12 pt-14 overflow-x-hidden" ref={containerRef}>
      <Head>
        <title>Invest in ZM QR Code Services | Next-Gen QR Solutions</title>
        <meta
          name="description"
          content="Join ZM QR's growth journey with our innovative QR technology"
        />
      </Head>

      {/* Hero Section with Video Background */}
      <motion.section
        className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-gray-50"
        style={{ y: backgroundY }}
      >
        {/* Video Background */}
        <motion.div className="absolute inset-0 z-0" style={{ opacity: 1 }}>
          {/* <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            style={{ backgroundColor: "#f3f4f6" }}
          >
            <source src="/videos/investmentbg.webm" type="video/mp4" />
            Your browser does not support the video tag.
          </video> */}
          <img src="/investor.webp" alt=""  className="w-full h-full object-center"/>
        </motion.div>

        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            {/* <span className="bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-transparent">
              Invest in the Future
            </span> */}
            <span className="bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-transparent">
              {dictionary.investor.hero.heading}
            </span>
            <br />
            {/* <span className="bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-transparent">
              of Digital Engagement
            </span> */}
            <span className="bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-transparent">
              {dictionary.investor.hero.subheading}
            </span>
          </motion.h1>
          {/* <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto"
          >
            ZM QR is transforming connections through next-generation QR
            technology.
          </motion.p> */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl md:text-2xl text-white mb-10 max-w-3xl mx-auto"
          >
            {dictionary.investor.hero.description}
          </motion.p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {/* <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-transparent border-2 border-teal-500 px-8 py-4 rounded-full font-semibold text-lg hover:bg-teal-900/30 transition-all text-teal-600"
            >
              Contact Our Team
            </motion.a> */}
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-transparent border-2 border-teal-500 px-8 py-4 rounded-full font-semibold text-lg hover:bg-teal-900/30 transition-all text-white"
            >
              {dictionary.investor.hero.contactButton}
            </motion.a>
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <section id="overview" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
          >
            {/* <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why <span className="text-teal-400">ZM QR</span>?
            </h2> */}
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {dictionary.investor.stats.Why} <span className="text-teal-400">ZM QR</span>?
            </h2>
            {/* <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Industry-leading QR technology with proven adoption metrics.
            </p> */}
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {dictionary.investor.stats.paragraph}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white backdrop-blur-md rounded-2xl p-8 border border-teal-300 hover:border-teal-400 transition-all shadow-lg"
              >
                <div className="text-teal-400 mb-4">{stat.icon}</div>
                <h3 className="text-4xl font-bold mb-2">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Market Opportunity */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="lg:w-1/2"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                <span className="text-teal-400">{dictionary.investor.marketOpportunity.valueIncome}</span> {dictionary.investor.marketOpportunity.heading}
              </h2>
              {/* <p className="text-xl text-gray-600 mb-8">
                The global QR code market is growing at 18.7% CAGR through 2030.
              </p> */}
              <p className="text-xl text-gray-600 mb-8">
                {dictionary.investor.marketOpportunity.description}
              </p>
              {/* <ul className="space-y-4">
                {[
                  "Contactless payments adoption",
                  "Digital marketing transformation",
                  "Supply chain digitization",
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
              </ul> */}
              <ul className="space-y-4">
                {dictionary.investor.marketOpportunity.items.map((item, index) => (
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
              className="w-full lg:w-1/2 bg-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg"
            >
              {/* Chart Container */}
              <div className="h-60 sm:h-72 md:h-80 w-full">
                <MarketGrowthChart />
              </div>

              {/* Market Stats */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-center">
                {[
                  { value: "18.7%", label: "CAGR" },
                  { value: "$8.2B", label: "2023 Market" },
                  { value: "$26B", label: "2030 Projection" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="bg-teal-100 p-3 rounded-lg border border-teal-300"
                  >
                    <p className="text-xl font-bold text-teal-400">{item.value}</p>
                    <p className="text-gray-600">{item.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Traction Section */}
      <section id="traction" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-20"
          >
            {/* <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Our <span className="text-teal-400">Traction</span>
            </h2> */}
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {dictionary.investor.traction.Our} <span className="text-teal-400">{dictionary.investor.traction.heading}</span>
            </h2>
            {/* <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Consistent growth across all key metrics.
            </p> */}
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {dictionary.investor.traction.description}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-white backdrop-blur-md rounded-2xl p-8 border border-teal-300 shadow-lg"
            >
              {/* <h3 className="text-2xl font-bold mb-6">
                Expected Revenue Growth
              </h3> */}
              <h3 className="text-2xl font-bold mb-6">
                {dictionary.investor.traction.userGrowth.heading}
              </h3>
              <div className="h-64 w-full">
                <RevenueChart />
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
                  <div
                    key={index}
                    className="bg-teal-100  rounded-lg border border-teal-300"
                  >
                    <p className="text-sm text-gray-600">
                      {item.year}
                    </p>
                    <p className="font-semibold">{item.revenue}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white backdrop-blur-md rounded-2xl p-8 border border-teal-300 shadow-lg"
            >
              {/* <h3 className="text-2xl font-bold mb-6">Expected User Growth</h3> */}
              <h3 className="text-2xl font-bold mb-6">{dictionary.investor.traction.userGrowth.heading}</h3>
              <div className="h-64 w-full">
                <UserGrowthChart />
              </div>
              <div className="mt-6 grid grid-cols-3 gap-4">
                {[
                  { metric: "500K+", label: "Active Users" },
                  { metric: "85%", label: "Retention" },
                  { metric: "4.8/5", label: "Rating" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="bg-teal-100 p-3 rounded-lg border border-teal-300"
                  >
                    <p className="text-lg font-semibold text-teal-400">
                      {item.metric}
                    </p>
                    <p className="text-sm text-gray-600">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section id="technology" className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-20"
          >
            {/* <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Our <span className="text-teal-400">Technology</span>
            </h2> */}
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {dictionary.investor.technology.Our} <span className="text-teal-400">{dictionary.investor.technology.heading}</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {dictionary.investor.technology.description}
            </p>
            {/* <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Cutting-edge infrastructure powering the next generation of QR
              solutions
            </p> */}
          </motion.div>

          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white backdrop-blur-md rounded-2xl p-8 border border-teal-300 hover:border-teal-400 transition-all shadow-lg"
              >
                <div className="text-teal-400 mb-4">{tech.icon}</div>
                <h3 className="text-2xl font-bold mb-3">{tech.name}</h3>
                <p className="text-gray-600">{tech.description}</p>
              </motion.div>
            ))}
          </div> */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {dictionary.investor.technology.features.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white backdrop-blur-md rounded-2xl p-8 border border-teal-300 hover:border-teal-400 transition-all shadow-lg"
              >
                {/* Optional icon placeholder if needed */}
                <div className="text-teal-400 mb-4">
                  {/* You can insert a default icon here if desired */}
                  {/* Example: <YourIconComponent /> */}
                </div>
                <h3 className="text-2xl font-bold mb-3">{tech.name}</h3>
                <p className="text-gray-600">{tech.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Invest in Us Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            {/* <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why <span className="text-teal-400">Invest</span> in Us?
            </h2> */}
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {dictionary.investor.investment.Why} <span className="text-teal-400">{dictionary.investor.investment.heading}</span> {dictionary.investor.investment.inUs}
            </h2>
            {/* <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Back a company that's shaping the future with real traction,
              scalable growth, and visionary leadership.
            </p> */}
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {dictionary.investor.investment.description}
            </p>
          </motion.div>

          {/* Value Propositions */}
          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {[
              {
                icon: "🚀",
                title: "Rapid Growth",
                desc: "Achieved 300% revenue growth in the past 12 months.",
              },
              {
                icon: "🌍",
                title: "Global Reach",
                desc: "Presence in over 15 countries and expanding rapidly.",
              },
              {
                icon: "💡",
                title: "Innovative Tech",
                desc: "Built using scalable cloud and AI-powered architecture.",
              },
              {
                icon: "🤝",
                title: "Trusted Partners",
                desc: "Collaborated with industry leaders and unicorns.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-xl border shadow-lg text-center bg-white border-teal-300"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div> */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {dictionary.investor.investment.propositions.map((item, i) => {
              const icons = ["🚀", "🌍", "💡", "🤝"]; // static icons matching order
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 rounded-xl border shadow-lg text-center bg-white border-teal-300"
                >
                  <div className="text-4xl mb-4">{icons[i]}</div>
                  <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>


          {/* Mission & Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white border-teal-300 p-8 rounded-xl border shadow-md"
            >
              {/* <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-gray-600">
                To transform how people connect, transact, and experience
                services using technology that scales with their dreams.
              </p> */}
              <h3 className="text-2xl font-bold mb-4">{dictionary.investor.investment.mission.heading}</h3>
              <p className="text-gray-600">
                {dictionary.investor.investment.mission.text}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white border-teal-300 p-8 rounded-xl border shadow-md"
            >
              {/* <h3 className="text-2xl font-bold mb-4">Our Vision</h3> */}
              {/* <p className="text-gray-600">
                To be a global leader in tech innovation, empowering millions
                through seamless digital experiences and impactful solutions.
              </p> */}
              <h3 className="text-2xl font-bold mb-4">{dictionary.investor.investment.vision.heading}</h3>
              <p className="text-gray-600">
                {dictionary.investor.investment.vision.text}
              </p>
            </motion.div>
          </div>

          {/* CTA */}
          {/* <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <h4 className="text-2xl font-bold mb-4">Join Our Journey</h4>
            <p className="mb-6 max-w-xl mx-auto text-gray-600">
              Be part of a revolution. Help us scale globally and build a
              future-driven ecosystem.
            </p>
            <a
              href="#contact"
              className="inline-block px-6 mt-10 py-2 text-white bg-teal-500 hover:bg-teal-600 rounded-lg font-medium transition"
            >
              Let's Talk Investment
            </a>
          </motion.div> */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <h4 className="text-2xl font-bold mb-4">{dictionary.investor.journey.heading}</h4>
            <p className="mb-6 max-w-xl mx-auto text-gray-600">
              {dictionary.investor.journey.descrption}
            </p>
            <a
              href="#contact"
              className="inline-block px-6 mt-10 py-2 text-white bg-teal-500 hover:bg-teal-600 rounded-lg font-medium transition"
            >
              {dictionary.investor.journey.cta.text}
            </a>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          {/* <h1 className="text-3xl lg:text-4xl font-bold mb-20 text-center">
            Let discuss for <span className="text-teal-500">Investment</span>
          </h1> */}
          <h1 className="text-3xl lg:text-4xl font-bold mb-20 text-center">
            {dictionary.investor.contact.heading} <span className="text-teal-500">{dictionary.investor.contact.investment}</span>
          </h1>
          <div className="flex flex-col lg:flex-row gap-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="lg:w-1/2"
            >
              <video
                className="mb-10 rounded-3xl object-cover"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src="/videos/HandShaking.webm" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              <h2 className="text-2xl md:text-2xl font-bold mb-8">
                {dictionary.investor.contact.getIn}<span className="text-teal-400">{dictionary.investor.contact.touch}</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                {dictionary.investor.contact.description}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="lg:w-1/2"
            >
              <div className="bg-white backdrop-blur-md rounded-2xl p-8 border border-teal-300 shadow-lg">
                <h3 className="text-2xl font-bold mb-6">Enter Details</h3>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Full Name:
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Email Address:
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Phone No:
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        pattern="[789][0-9]{9}"
                        placeholder="Ex-987654321"
                        className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Inquiry Type:
                      </label>
                      <select
                        name="inquiryType"
                        value={formData.inquiryType}
                        onChange={handleInputChange}
                        className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        required
                      >
                        <option value="">-- Please select an option --</option>
                        <option value="Investment Inquiry">
                          Investment Inquiry
                        </option>
                        <option value="Ready to Invest">Ready to Invest</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Describe
                      </label>
                      <textarea
                        rows="2"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      ></textarea>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-lg transition-all"
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
            colors={["#008080", "#006666", "#0d9488", "#0f766e", "#115e59"]}
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
              transition={{ type: "spring", damping: 25 }}
              className="relative bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl z-10 border border-teal-200"
            >
              <div className="text-center">
                {/* Animated checkmark circle */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-teal-500/10 mb-6"
                >
                  <motion.div
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <CheckIcon
                      className="h-10 w-10 text-teal-500"
                      strokeWidth={2}
                    />
                  </motion.div>
                </motion.div>

                {/* Title with gradient text */}
                <h3 className="text-3xl font-bold bg-gradient-to-r from-teal-500 to-teal-700 bg-clip-text text-transparent mb-4">
                  Congratulations!
                </h3>

                {/* Beautifully styled message */}
                <div className="prose prose-lg mb-6 text-left">
                  <p className="text-gray-700 leading-relaxed">
                    Thank you for expressing your interest in investing in our
                    organization.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    We truly appreciate your confidence in our vision and
                    commitment. Our investment team will contact you within 48
                    hours to:
                  </p>
                  <ul className="space-y-2 text-gray-700">
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
                  className="px-8 py-3 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white rounded-lg font-medium transition-all shadow-lg"
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

export default InvestorsPage;
