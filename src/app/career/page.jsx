'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/context/languageContext/LanguageContext';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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
  Quote,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

const Carousel = dynamic(() => import('@/components/Carousel'), {
  ssr: false,
  loading: () => <p className="text-center text-gray-500">Loading job openings...</p>,
});

const jobOpenings = [
  { title: 'Frontend Developer', icon: '/icons/frontend.png' },
  { title: 'Backend Developer', icon: '/icons/backend.png' },
  { title: 'QA Engineer', icon: '/icons/qa.png' },
  { title: 'DevOps Engineer', icon: '/icons/devops.png' },
  { title: 'Product Manager', icon: '/icons/pm.png' },
];

const teamTestimonials = [
  {
    id: 1,
    name: 'Navya.P',
    role: 'Senior Developer',
    quote: 'Working at ZM has been transformative. The culture of innovation and support has helped me grow both technically and professionally.',
    
  },
  {
    id: 2,
    name: 'Mastan vali.Sk',
    role: 'Product Manager',
    quote: 'The collaborative environment at ZM is unmatched. Every team member\'s voice is heard and valued in our product development process.',
   
  },
  {
    id: 3,
    name: 'krishnaTeja.A',
    role: 'DevOps Engineer',
    quote: 'The challenges we tackle here are cutting-edge. I love that I get to work with the latest technologies every single day.',
    
  },
  {
    id: 4,
    name: 'Shahid.Md',
    role: 'Data Engineer',
    quote: 'ZM fosters creativity like no other place. We\'re encouraged to think outside the box and push boundaries in design.',
    
  },
  {
  id: 5,
  name: 'Pavankrishna.T',
  role: 'Software Engineer',
  quote: "At ZM, I'm not just building software — I'm building impact. Every line of code here has a purpose.",
},

{
  id: 6,
  name: 'Joseph',
  role: 'Team Lead',
  quote: "Leading at ZM means empowering every team member to think big, move fast, and grow together.",
},

{
  id: 7,
  name: 'Bhargavi Krishna.D',
  role: 'Operation Head',
  quote: "ZM gives me the autonomy to streamline and scale operations while keeping people at the center.",
},

{
  id: 8,
  name: 'Mounika',
  role: 'UX Designer',
  quote: "Designing at ZM is all about solving real problems with simplicity and elegance. It’s where creativity meets purpose.",
},

];

const officeImages = [
  '/images/office/office1.jpg',
  '/images/office/office2.jpg',
  '/images/office/office3.jpg',
  '/images/office/office4.jpg',
];

export default function Career() {
  const [role, setRole] = useState('');
  const [location, setLocation] = useState('');
  const { dictionary } = useLanguage();
  const router = useRouter();

  const careerDictionary = dictionary?.career || {};
  const headerDictionary = careerDictionary.header || {};
  const searchDictionary = careerDictionary.search || {};
  const section1Dictionary = careerDictionary.section1 || {};
  const currentOpeningsDictionary = careerDictionary.currentOpenings || {};
  const premiumSectionDictionary = careerDictionary.premiumSection || {};
  const featuresDictionary = careerDictionary.features || {};
  const innovateDictionary = careerDictionary.innovate || {};
  const whyWorkDictionary = careerDictionary.whyWork || {};
  const testimonialsDictionary = careerDictionary.testimonials || {};
  const testimonialQuote = careerDictionary.testimonial?.quote || '';
  const comingSoonDictionary = careerDictionary.comingSoon || {};

  const workBenefits = [
    whyWorkDictionary.benefits?.innovative || { title: 'Innovative Work Environment', description: 'Work on cutting-edge projects that blend QR technology, A.I. integration, and IoT automation.' },
    whyWorkDictionary.benefits?.growth || { title: 'Growth-Focused Culture', description: 'We support learning, experimentation, and professional development at every level.' },
    whyWorkDictionary.benefits?.impact || { title: 'Impactful Roles', description: 'Your ideas wont sit on the sidelines. At ZM, your work directly shapes the customer experience.' },
  ];

  const handleSearch = () => {
    const query = new URLSearchParams();
    if (role) query.append('role', role);
    if (location) query.append('location', location);
    router.push(`/career/jobs?${query.toString()}`);
  };

  const handleClear = () => {
    setRole('');
    setLocation('');
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    adaptiveHeight: true,
  };

  return (
    <div className="bg-white text-gray-800 font-sans">
      {/* Hero Search Section */}
      <section className="relative h-screen overflow-hidden flex items-center justify-center px-4 md:px-16 pt-28 md:pt-0">
        <video autoPlay muted loop playsInline className="absolute top-5 left-0 w-full h-full object-cover z-0">
          <source src="/videos/EarthData.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/40 z-0" />
        <div className="relative z-10 bg-[#eff4f4] bg-opacity-90 p-8 rounded-xl text-center text-black max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold text-[#15a6b6] mb-4">
            {searchDictionary.findJob}
          </h1>
          <p className="mb-6">{searchDictionary.description}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="relative w-full sm:w-64">
              <Search className="absolute top-3 left-3 text-gray-400" />
              <input
                className="pl-10 pr-3 py-2 rounded-full w-full text-[#008080]"
                placeholder={searchDictionary.placeholderRole}
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
            </div>
            <div className="relative w-full sm:w-64">
              <MapPin className="absolute top-3 left-3 text-gray-400" />
              <input
                className="pl-10 pr-3 py-2 rounded-full w-full text-gray-700"
                placeholder={searchDictionary.placeholderLocation}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <button
              onClick={handleSearch}
              className="bg-[#0f5656] cursor-pointer text-white px-5 py-2 rounded-full font-medium hover:scale-105 transition-transform"
            >
              {searchDictionary.buttonSearch}
            </button>
            <button
              onClick={handleClear}
              className="bg-gray-300 text-black px-5 py-2 rounded-full font-medium hover:scale-105 transition-transform"
            >
              {searchDictionary.buttonClear}
            </button>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="bg-[#8acad1] py-6 text-center px-4 padding-lr">
        <p className="text-lg text-black text-center px-4">
          {section1Dictionary.quote}
        </p>
        <h2 className="text-2xl font-bold text-black mt-2">
          {section1Dictionary.subtitle}
        </h2>
      </section>

      {/* Current Openings */}
      <section className="py-12 px-6 md:px-16 bg-white padding-lr" id='carousel'>
        <h2 className="text-3xl font-bold text-center text-[#128888] mb-8">
          {currentOpeningsDictionary.title}
        </h2>
        <Carousel onClick={handleSearch}  items={jobOpenings} />
      </section>

      {/* Premium Section */}
      <section className="bg-[#0d5258] text-white py-12 px-6 md:px-16 text-center">
        <h2 className="text-3xl font-bold mb-4">
          {premiumSectionDictionary.title}
        </h2>
        <p className="max-w-3xl mx-auto mb-6">
          {premiumSectionDictionary.description}
        </p>
        <div className="flex justify-center mb-6">
          <Image src="/images/normal/careerPa.png" alt="Team Working Illustration" width={280} height={200} className='bg-white rounded-2xl'/>
        </div>
        <div className='flex justify-center pt-8'>
          <button className="px-6 py-2 cursor-pointer text-xl text-white font-bold rounded-lg flex justify-center items-center gap-2 bg-[linear-gradient(to_right,#008080,#001a1a)]" onClick={handleSearch}>
            {premiumSectionDictionary.button}
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-12 px-6 md:px-16 text-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center">
            <ScanLine size={40} className="text-[#128888] mb-4" aria-label="Static QR Creation" />
            <p className="font-medium">{featuresDictionary.staticQR}</p>
          </div>
          <div className="flex flex-col items-center">
            <Wand2 size={40} className="text-[#128888] mb-4" aria-label="AI Features" />
            <p className="font-medium">{featuresDictionary.aiFeatures}</p>
          </div>
          <div className="flex flex-col items-center">
            <BarChart3 size={40} className="text-[#128888] mb-4" aria-label="Analytics" />
            <p className="font-medium">{featuresDictionary.analytics}</p>
          </div>
          <div className="flex flex-col items-center">
            <ShieldCheck size={40} className="text-[#128888] mb-4" aria-label="Security" />
            <p className="font-medium">{featuresDictionary.security}</p>
          </div>
        </div>
      </section>

      {/* Innovate Section */}
      <section className="relative bg-cover bg-center text-white py-16 px-6 md:px-20" style={{ backgroundImage: "url('/images/tech-bg.jpg')" }}>
        <div className="bg-[#008080] absolute inset-0 opacity-80" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">{innovateDictionary.title}</h2>
          <p className="mb-6">{innovateDictionary.description}</p>
          <div className="flex justify-center pt-4">
            <Link href="#carousel" scroll={true}>
              <button className="px-6 py-2 cursor-pointer text-xl text-white font-bold rounded-lg flex justify-center items-center gap-2 bg-[linear-gradient(to_right,#008080,#001a1a)]">
                {innovateDictionary.button}
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Work With ZM Section */}
      <section className="bg-[#094b4f] text-white py-12 px-6 md:px-16 padding-lr">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-4">{whyWorkDictionary.title}</h2>
            <p className="mb-6">
              {whyWorkDictionary.description}
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
            <div className='pt-8'>
              <button className="px-6 py-2 cursor-pointer text-xl text-white font-bold rounded-lg flex justify-center items-center gap-2 bg-[linear-gradient(to_right,#008080,#001a1a)]" onClick={handleSearch}>
                {whyWorkDictionary.button}
              </button>
            </div>
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

      {/* Life at ZM - Team Testimonials */}
<section className="py-16 px-6 md:px-16 bg-gray-50">
  <div className="max-w-6xl mx-auto flex flex-col items-center">
    
    {/* Section Heading */}
    <h2 className="text-3xl font-bold text-center text-[#128888] mb-12">
      Life at ZM – What Our Team Says
    </h2>

    {/* Group Image */}
    <div className="mb-10">
      <Image
        src="/images/normal/empGroup.png"
        alt="Team Member Group"
        width={400}
        height={400}
        className="object-cover rounded-xl shadow-md"
      />
    </div>

    {/* Testimonials Carousel */}
    <div className="bg-white rounded-xl shadow-lg md:p-10 w-full max-w-4xl">
      <Slider {...sliderSettings}>
        {teamTestimonials.map((testimonial) => (
          <div key={testimonial.id} className="px-2">
            <div className="flex flex-col md:flex-row items-center gap-8">
              
              {/* Testimonial Text */}
              <div className="text-center md:text-left">
                <Quote className="text-[#128888] w-8 h-8 mb-4 mx-auto md:mx-0" />
                <p className="text-lg italic mb-4 text-gray-700 leading-relaxed">
                  {testimonial.quote}
                </p>
                <div>
                  <p className="font-bold text-[#128888]">{testimonial.name}</p>
                  <p className="text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  </div>
</section>


      
    </div>
  );
}