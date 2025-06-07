'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import {
  Facebook,
  Instagram,
  Linkedin,
  MapPin,
  Search,
  Twitter,
  ShieldCheck,
  Wand2,
  BarChart3,
  ScanLine,
} from 'lucide-react';

const Carousel = dynamic(() => import('@/components/Carousel'), {
  ssr: false,
  loading: () => <p className="text-center text-gray-500">Loading job openings...</p>,
});

const navItems = [
  { name: 'Home', href: '#' },
  { name: 'About Us', href: '#' },
  { name: 'Services', href: '#' },
  { name: 'Blogs', href: '#' },
  { name: 'Contact Us', href: '#' },
  { name: 'CAREER', href: '#', active: true },
  { name: 'Pricing', href: '#' },
];

const workBenefits = [
  {
    title: 'Innovative Work Environment',
    description:
      'Work on cutting-edge projects that blend QR technology, A.I. integration, and IoT automation.',
  },
  {
    title: 'Growth-Focused Culture',
    description:
      'We support learning, experimentation, and professional development at every level.',
  },
  {
    title: 'Impactful Roles',
    description:
      'Your ideas won’t sit on the sidelines. At ZM, your work directly shapes the customer experience.',
  },
];

const jobOpenings = [
  { title: 'Frontend Developer', icon: '/icons/frontend.png' },
  { title: 'Backend Developer', icon: '/icons/backend.png' },
  { title: 'QA Engineer', icon: '/icons/qa.png' },
  { title: 'DevOps Engineer', icon: '/icons/devops.png' },
  { title: 'Product Manager', icon: '/icons/pm.png' },
];

export default function Career() {
  const [role, setRole] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = () => {
    if (typeof window !== 'undefined') {
      const query = new URLSearchParams();
      if (role) query.append('role', role);
      if (location) query.append('location', location);
      window.location.href = `/jobs?${query.toString()}`;
    }
  };

  const handleClear = () => {
    setRole('');
    setLocation('');
  };

  return (
    <div className="bg-white text-gray-800 font-sans">
      <header className="bg-gradient-to-r from-[#20eaea] to-[#128888] p-4 md:p-6 flex justify-between items-center">
        <button className="bg-[#011010] text-white px-5 py-2 rounded-lg font-semibold hover:scale-105 transition-transform">
          LOGIN
        </button>
      </header>

      <section className="relative h-screen overflow-hidden flex items-center justify-center px-4 md:px-16">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          <source
            src="/videos/vecteezy_visual-representation-of-cloud-computing-technology-with_51092811.mov"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/40 z-0" />
        <div className="relative z-10 bg-[#eff4f4] bg-opacity-90 p-8 rounded-xl text-center text-black max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold text-[#15a6b6] mb-4">
            Find Your DREAM JOB Here
          </h1>
          <p className="mb-6">
            At ZM QR Code Services, we’re more than a leading QR code solutions provider — we’re a place where innovation meets opportunity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="relative w-full sm:w-64">
              <Search className="absolute top-3 left-3 text-gray-400" />
              <input
                className="pl-10 pr-3 py-2 rounded-full w-full text-[#008080]"
                placeholder="Software Engineer"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
            </div>
            <div className="relative w-full sm:w-64">
              <MapPin className="absolute top-3 left-3 text-gray-400" />
              <input
                className="pl-10 pr-3 py-2 rounded-full w-full text-gray-700"
                placeholder="Guntur"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <button
              onClick={handleSearch}
              className="bg-[#0f5656] text-white px-5 py-2 rounded-full font-medium hover:scale-105 transition-transform"
            >
              Search
            </button>
            <button
              onClick={handleClear}
              className="bg-gray-300 text-black px-5 py-2 rounded-full font-medium hover:scale-105 transition-transform"
            >
              Clear
            </button>
          </div>
        </div>
      </section>

      <section className="bg-[#8acad1] py-6 text-center px-4">
        <p className="text-lg text-black max-w-3xl mx-auto">
          "To Gain Global Leadership in providing Technical Solutions through Sustained Innovation."
        </p>
        <h2 className="text-2xl font-bold text-black mt-2">
          Power Your Brand with ZM's Advanced QR Code Features
        </h2>
      </section>

      <section className="py-12 px-6 md:px-16 bg-white">
        <h2 className="text-3xl font-bold text-center text-[#128888] mb-8">
          Current Openings
        </h2>
        <Carousel items={jobOpenings} />
      </section>

      {/* Premium QR Services */}
      <section className="bg-[#0d5258] text-white py-12 px-6 md:px-16 text-center">
        <h2 className="text-3xl font-bold mb-4">
          “Elevate Your Business with ZM’s Premium QR Code Services”
        </h2>
        <p className="max-w-3xl mx-auto mb-6">
          We empower businesses with dynamic QR solutions that include AI,
          analytics, branding and customer engagement tools.
        </p>
        <div className="flex justify-center mb-6">
          <Image src="/images/desk-3139127_1280.jpg" alt="Team Working Illustration" width={240} height={200} />
        </div>
        <button className="bg-[#15a6b6] text-black px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-transform">
          Start your journey now
        </button>
      </section>

      {/* Features Grid */}
      <section className="bg-white py-12 px-6 md:px-16 text-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center">
            <ScanLine size={40} className="text-[#128888] mb-4" aria-label="Static QR Creation" />
            <p className="font-medium">Static QR Creation</p>
          </div>
          <div className="flex flex-col items-center">
            <Wand2 size={40} className="text-[#128888] mb-4" aria-label="AI Features" />
            <p className="font-medium">AI-Enhanced Features</p>
          </div>
          <div className="flex flex-col items-center">
            <BarChart3 size={40} className="text-[#128888] mb-4" aria-label="Analytics" />
            <p className="font-medium">Real-time Analytics</p>
          </div>
          <div className="flex flex-col items-center">
            <ShieldCheck size={40} className="text-[#128888] mb-4" aria-label="Security" />
            <p className="font-medium">Secure & Scalable</p>
          </div>
        </div>
      </section>

      {/* Innovate Section */}
      <section className="relative bg-cover bg-center text-white py-16 px-6 md:px-20" style={{ backgroundImage: "url('/images/tech-bg.jpg')" }}>
        <div className="bg-[#008080] absolute inset-0 opacity-80" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Innovate with Cutting-Edge Technologies</h2>
          <p className="mb-6">
            Join our team of passionate developers, designers, and thinkers to craft the future of QR technology with AI and automation.
          </p>
          <button className="bg-[#15a6b6] text-black px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-transform">
            See Open Roles
          </button>
        </div>
      </section>

      {/* Why Work With ZM */}
      <section className="bg-[#094b4f] text-white py-12 px-6 md:px-16">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-4">Why Work With ZM?</h2>
            <p className="mb-6">
              At ZM QR Code Services, we're redefining how businesses and consumers connect through smart, secure, and scalable QR solutions.
            </p>
            <ul className="space-y-4">
              {workBenefits.map((item, idx) => (
                <li key={idx}>
                  <p>
                    <span className="text-[#15a6b6] font-semibold">{item.title}:</span> {item.description}
                  </p>
                </li>
              ))}
            </ul>
            <button className="mt-6 bg-[#2bc6c6] text-black px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-transform">
              Start your journey now
            </button>
          </div>
          <div className="flex-1">
            <Image
              src="/images/people-8577398_1280.jpg"
              alt="ZM Careers Team"
              width={500}
              height={400}
              className="rounded-lg shadow-md"
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-[#128888] text-white py-12 px-6 md:px-16 text-center">
        <h2 className="text-2xl font-bold mb-6">Life at ZM – What Our Team Says</h2>
        <div className="flex flex-col md:flex-row items-center gap-6 justify-center">
          <Image
            src="/images/team-8233881_1280.png"
            alt="Team Member"
            width={160}
            height={160}
            className="rounded-full object-cover"
          />
          <p className="max-w-xl text-white text-lg">
            “Working at ZM is more than a job – it’s a place to grow, innovate, and make a real impact.”
          </p>
        </div>
      </section>

      {/* Blog Coming Soon */}
      <section className="py-6 bg-gray-100 text-center text-gray-700">
        <div className="bg-white border border-dashed border-gray-400 rounded-md p-6 shadow-sm italic text-sm">
          Career Blogs & Interactive Pop-ups – Coming Soon!
        </div>
      </section>
    </div>
  )
}
