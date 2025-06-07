'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search } from 'lucide-react';

const allJobs = [
  {
    id: '123456',
    title: 'MERN Stack Developer',
    posted: 'May 25, 2025',
    experience: 'Fresher',
    location: 'Hyderabad',
    type: 'Full-time',
    qualifications: [
      '1+ years of hands-on experience in Full Stack Development (Freshers also)',
      'Strong experience in JavaScript, ReactJS, NodeJS, and ExpressJS.',
      'Proven experience with Tailwind CSS, Material-UI (MUI), and SQL.'
    ]
  },
  {
    id: '123457',
    title: 'Frontend Developer',
    posted: 'May 23, 2025',
    experience: 'Entry Level',
    location: 'Bangalore',
    type: 'Internship',
    qualifications: [
      'Good understanding of HTML, CSS, and JavaScript.',
      'Experience with React or Vue.js preferred.',
      'Basic understanding of responsive design.'
    ]
  },
  {
    id: '123458',
    title: 'Backend Engineer',
    posted: 'May 20, 2025',
    experience: 'Mid Level',
    location: 'Mumbai',
    type: 'Part-time',
    qualifications: [
      '2+ years experience in NodeJS and SQL.',
      'Experience building RESTful APIs.',
      'Familiarity with cloud platforms like AWS or Azure.'
    ]
  },
  {
    id: '123459',
    title: 'Full Stack Engineer',
    posted: 'May 18, 2025',
    experience: 'Senior Level',
    location: 'Chennai',
    type: 'Full-time',
    qualifications: [
      '5+ years of full-stack development experience.',
      'Expertise in MERN stack and system architecture.',
      'Strong leadership and code review skills.'
    ]
  }
];

export default function JobSearchPage() {
  const [experienceFilter, setExperienceFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredJobs = allJobs.filter(
    (job) =>
      (!experienceFilter || job.experience === experienceFilter) &&
      (!locationFilter || job.location === locationFilter) &&
      (!typeFilter || job.type === typeFilter) &&
      (!searchTerm || job.title.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#a0eaea] to-[#0da6a6] font-sans p-6">
      {/* Search Fields */}
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-4 justify-center items-center mb-6">
        <input
          type="text"
          placeholder="Search Job Title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 rounded-lg w-full md:w-1/3 focus:outline-none"
        />
        <button className="bg-[#066] text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <Search size={18} /> Search
        </button>
      </div>

      {/* Filter and Sort Section */}
      <div className="max-w-5xl mx-auto bg-white/70 p-4 rounded-lg">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="flex flex-col md:flex-row gap-4">
            <select
              value={experienceFilter}
              onChange={(e) => setExperienceFilter(e.target.value)}
              className="border px-4 py-2 rounded shadow w-48"
            >
              <option value="">Experience</option>
              <option>Fresher</option>
              <option>Entry Level</option>
              <option>Mid Level</option>
              <option>Senior Level</option>
            </select>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="border px-4 py-2 rounded shadow w-48"
            >
              <option value="">Job Type</option>
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Internship</option>
              <option>Contract</option>
            </select>
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="border px-4 py-2 rounded shadow w-48"
            >
              <option value="">Location</option>
              <option>Guntur</option>
              <option>Hyderabad</option>
              <option>Bangalore</option>
              <option>Mumbai</option>
              <option>Chennai</option>
              <option>Delhi</option>
              <option>Pune</option>
              <option>Kolkata</option>
              <option>Ahmedabad</option>
              <option>Jaipur</option>
              <option>Vijayawada</option>
            </select>
          </div>
          <div className="mt-4 md:mt-0">
            <select className="border px-4 py-2 rounded-lg">
              <option>Sort by: Most Relevant</option>
              <option>Newest</option>
              <option>Oldest</option>
            </select>
          </div>
        </div>
      </div>

      {/* Job Listings */}
      <div className="max-w-5xl mx-auto mt-6 space-y-6">
        <AnimatePresence>
          {filteredJobs.map((job) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-white/70 p-6 rounded-lg shadow-md"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-teal-700 font-bold text-lg">{job.title}</h2>
                <p className="text-sm text-gray-700">Posted {job.posted}</p>
              </div>
              <p className="text-sm text-gray-700">Job ID: {job.id}</p>
              <p className="text-sm text-gray-700">Experience: {job.experience}</p>
              <p className="text-sm text-gray-700">Location: {job.location}</p>
              <p className="text-sm text-gray-700">Type: {job.type}</p>
              <h3 className="font-semibold mt-4 mb-2 text-gray-800">Basic Qualifications:</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {job.qualifications.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
