'use client';

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/context/languageContext/LanguageContext';

import {
  TrendingUpIcon,
  UsersIcon,
  DollarSignIcon,
  TargetIcon,
  MailIcon,
  PhoneIcon,
  ExternalLink
} from 'lucide-react'

// Counter animation for each stat
const AnimatedStat = ({ icon, label, start, end, suffix }) => {
  const [count, setCount] = useState(start)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => {
        const isFloat = typeof end === 'number' && !Number.isInteger(end)
        const step = isFloat ? 0.1 : 1
        const rounded = isFloat ? Math.round((prev + step) * 10) / 10 : prev + step

        if (rounded < end) return rounded
        clearInterval(interval)
        return end
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [end])

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-xl"
    >
      <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-black">
        {icon}
      </div>
      <h3 className="text-3xl font-bold text-[#008080]">
        {count}{suffix}
      </h3>
      <p className="text-[#008080] mt-2">{label}</p>
    </motion.div>
  )
}

// InsightCard Component
const InsightCard = ({ title, value, summary, link, color }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition"
  >
    <h3 className={`text-xl font-bold mb-2 ${color}`}>{title}</h3>
    <p className="text-gray-800 text-2xl font-semibold mb-2">{value}</p>
    <p className="text-gray-600 text-sm mb-4">{summary}</p>
    <a href={link} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 hover:underline text-sm">
      Learn more <ExternalLink className="w-4 h-4 ml-1" />
    </a>
  </motion.div>
)

const Investors = () => {
  const { dictionary } = useLanguage();
  return (
    <div className="w-full min-h-screen bg-[#159999] text-white font-sans">
      <div className='bg-[#159292] text-black font-sans max-w-6xl mx-auto px-6 rounded-2xl'>
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="py-20 text-center px-6"
        >
          {/* <h1 className="text-5xl font-bold mb-2">Partner with ZM QR Code Services</h1> */}
          <h1 className="text-5xl font-bold mb-2">{dictionary.investor.partner}</h1>
          {/* <p className="inline-block bg-white text-[#033f3f] text-lg mb-4 px-3 py-1 rounded">
            Scan | Store | Connect | Grow
          </p> */}
          <p className="inline-block bg-white text-[#033f3f] text-lg mb-4 px-3 py-1 rounded">
            {dictionary.investor.scan_store_connect_grow}
          </p>

          {/* <p className="text-xl mb-8 max-w-3xl mx-auto">
            Transforming how businesses and individuals use QR codes for digital identity, smart links, and interactive experiences.
          </p> */}
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            {dictionary.investor.hero_description}
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            {/* <button className="bg-white text-[#008080] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              Download Pitch Deck
            </button> */}
            <button className="bg-white text-[#008080] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              {dictionary.investor.download_pitch}
            </button>
            {/* <button className="border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#008080] transition">
              Schedule Meeting
            </button> */}
            <button className="border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#008080] transition">
              {dictionary.investor.company_growth}
            </button>
          </div>
        </motion.section>
      </div>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          {/* <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-center mb-12"
          >
            Company Growth Highlights
          </motion.h2> */}
          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-center mb-12"
          >
            {dictionary.investor.company_growth}
          </motion.h2>
          <div className="grid md:grid-cols-4 gap-10">
            <div className="bg-white text-black p-6 rounded-xl shadow-md">
              <AnimatedStat
                icon={<TrendingUpIcon className="text-teal-600" />}
                label="YoY Growth"
                start={300}
                end={500}
                suffix="%"
              />
            </div>
            <div className="bg-white text-black p-6 rounded-xl shadow-md">
              <AnimatedStat
                icon={<UsersIcon className="text-teal-600" />}
                label="Active Users"
                start={1}
                end={75}
                suffix="K+"
              />
            </div>
            <div className="bg-white text-black p-6 rounded-xl shadow-md">
              <AnimatedStat
                icon={<DollarSignIcon className="text-teal-600" />}
                label="ARR"
                start={1}
                end={3.2}
                suffix="M"
              />
            </div>
            <div className="bg-white text-black p-6 rounded-xl shadow-md">
              <AnimatedStat
                icon={<TargetIcon className="text-teal-600" />}
                label="Enterprise Clients"
                start={1}
                end={22}
                suffix="+"
              />
            </div>
          </div>
        </div>
      </section>


      {/* Investment Opportunity */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Investment Opportunity
              </h2>
              {/* <p className="text-lg text-gray-600 mb-6">
                We're raising $5M Series A to accelerate our growth, expand our
                team, and capture the rapidly growing market opportunity.
              </p> */}
              <p className="text-lg text-gray-600 mb-6">
                {dictionary.investor.we_are_raising}
              </p>
              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b">
                  {/* <span className="font-medium">Funding Round:</span> */}
                  <span className="font-medium">{dictionary.investor.funding_round}:</span>
                  <span>Series A</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  {/* <span className="font-medium">Target Amount:</span> */}
                  <span className="font-medium">{dictionary.investor.target_amount}:</span>
                  <span>₹ 5,000,000</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  {/* <span className="font-medium">Valuation:</span> */}
                  <span className="font-medium">{dictionary.investor.valuation}:</span>
                  <span>₹ 25,000,000</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  {/* <span className="font-medium">Use of Funds:</span> */}
                  <span className="font-medium">{dictionary.investor.use_of_funds}:</span>
                  <span>Product Development & Marketing</span>
                </div>
              </div>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Team collaboration"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Invest Section */}
      <section className="py-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* <div>
            <h2 className="text-3xl font-bold mb-6">Why Invest in ZM?</h2>
            <ul className="space-y-4 text-white/90 text-lg">
              <li>✅ Booming demand for QR-based smart solutions</li>
              <li>✅ Unique features like multi-link, analytics, vCard+, and branding</li>
              <li>✅ Strong customer retention & fast user base expansion</li>
              <li>✅ Scalable tech infrastructure ready for global deployment</li>
            </ul>
          </div> */}
          <div>
            <h2 className="text-3xl font-bold mb-6">{dictionary.investor.why_invest_zm}</h2>
            <ul className="space-y-4 text-white/90 text-lg">
              <li>✅ {dictionary.investor.bullet_1}</li>
              <li>✅ {dictionary.investor.bullet_2}</li>
              <li>✅ {dictionary.investor.bullet_3}</li>
              <li>✅ {dictionary.investor.bullet_4}</li>
            </ul>
          </div>
          <motion.img
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            src="https://www.thebusinessresearchcompany.com/graphimages/QR_Code_Payments_Market_2025_Graph.webp"
            alt="Investment Graph"
            className="rounded-lg shadow-lg w-full"
          />
        </motion.div>
      </section>

      {/* QR Industry Market Stats */}
      <section className="py-16 bg-[#1b9d9d] shadow-lg text-black">
        {/* <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">QR Code Industry Insights</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <InsightCard
              title="QR Industry Growth"
              value="800% by 2030"
              color="text-blue-600"
              link="https://timesofindia.indiatimes.com/blogs/voices/qr-codes-and-the-future-of-marketing/"
              summary="According to a report by BARC India and Nielsen, QR Code usage in India grew by 550% in 2020 compared to 2019."
            />
            <InsightCard
              title="Mobile-First Future"
              value="5.3B+ mobile users"
              color="text-green-600"
              link="https://www.statista.com/statistics/330695/number-of-smartphone-users-worldwide/"
              summary="Over 5.3 billion smartphone users rely on mobile scanning, boosting QR code usage."
            />
            <InsightCard
              title="Contactless Revolution"
              value="Accelerated by COVID"
              color="text-purple-600"
              link="https://www.uniqode.com/blog/qr-code-insights/qr-code-report"
              summary="QR codes became essential post-pandemic for touchless interaction & marketing."
            />
          </div>
        </div> */}
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">{dictionary.investor.qr_insights}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <InsightCard
              title={dictionary.investor.qr_industry_growth}
              value="800% by 2030"
              color="text-blue-600"
              link="https://timesofindia.indiatimes.com/blogs/voices/qr-codes-and-the-future-of-marketing/"
              summary={dictionary.investor.qr_industry_growth_summary}
            />
            <InsightCard
              title={dictionary.investor.mobile_first_future}
              value="5.3B+ mobile users"
              color="text-green-600"
              link="https://www.statista.com/statistics/330695/number-of-smartphone-users-worldwide/"
              summary={dictionary.investor.mobile_first_summary}
            />
            <InsightCard
              title={dictionary.investor.contactless_revolution}
              value="Accelerated by COVID"
              color="text-purple-600"
              link="https://www.uniqode.com/blog/qr-code-insights/qr-code-report"
              summary={dictionary.investor.contactless_summary}
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto px-6 text-center bg-white/10 backdrop-blur-md rounded-2xl p-10 shadow-2xl"
        >
          <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
          <p className="text-xl mb-8">{dictionary.investor.contact_description}</p>
          {/* <p className="text-xl mb-8">We welcome investors who believe in technology-driven growth. Reach out to explore.</p> */}
          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-3">
              <MailIcon className="w-6 h-6" />
              <span>invest@zmqrcode.com</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <PhoneIcon className="w-6 h-6" />
              <span>+91 90000 12345</span>
            </div>
          </div>
          {/* <button className="mt-8 bg-white text-[#008080] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
            Contact Investor Relations
          </button> */}
          <button className="mt-8 bg-white text-[#008080] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
            {dictionary.investor.contact_ir}
          </button>
        </motion.div>
      </section>

    </div>
  )
}

export default Investors
