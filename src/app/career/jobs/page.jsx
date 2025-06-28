'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, X, Upload } from 'lucide-react';
import { FaChevronCircleLeft } from "react-icons/fa";
import Link from 'next/link';

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
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    resume: null
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const filteredJobs = allJobs.filter(
    (job) =>
      (!experienceFilter || job.experience === experienceFilter) &&
      (!locationFilter || job.location === locationFilter) &&
      (!typeFilter || job.type === typeFilter) &&
      (!searchTerm || job.title.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setShowModal(true);
    setIsSubmitted(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      experience: '',
      resume: null
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      resume: e.target.files[0]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', { job: selectedJob, applicant: formData });
    setIsSubmitted(true);
    setTimeout(() => {
      setShowModal(false);
    }, 3000);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#a0eaea] to-[#0da6a6] font-sans p-4 md:p-6 ">
      {/* Search Fields */}
      <div className="max-w-5xl mx-auto mt-30 md:mt-20 flex flex-col md:flex-row gap-4 justify-center items-center mb-6 relative w-full px-4">
        <div className="absolute -top-10 left-0 md:static md:mr-auto md:top-0">
          <Link href="/career" className="flex items-center text-lg md:text-xl text-teal-800 hover:text-teal-900 transition">
            <FaChevronCircleLeft className="mr-2" /> Back to Career
          </Link>
        </div>

        <div className="w-full md:w-auto flex-1 flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            placeholder="Search Job Title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <button className="bg-[#066] text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-[#044] transition-colors">
            <Search size={18} /> <span className="hidden sm:inline">Search</span>
          </button>
        </div>
      </div>

      {/* Filter and Sort Section */}
      <div className="max-w-5xl mx-auto bg-white/70 p-4 rounded-lg shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <select
              value={experienceFilter}
              onChange={(e) => setExperienceFilter(e.target.value)}
              className="w-full border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="">Experience Level</option>
              <option>Fresher</option>
              <option>Entry Level</option>
              <option>Mid Level</option>
              <option>Senior Level</option>
            </select>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
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
              className="w-full border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
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
          <div className="w-full sm:w-auto">
            <select className="w-full border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500">
              <option>Sort by: Most Relevant</option>
              <option>Newest</option>
              <option>Oldest</option>
            </select>
          </div>
        </div>
      </div>

      {/* Job Listings */}
      <div className="max-w-5xl mx-auto mt-6 space-y-4 md:space-y-6 pb-10">
        <AnimatePresence>
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-white/70 p-4 md:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-3 gap-2">
                  <h2 className="text-teal-700 font-bold text-lg md:text-xl">{job.title}</h2>
                  <p className="text-sm text-gray-600">Posted {job.posted}</p>
                </div>
                <div className="grid-cols-2 mgrid d:grid-cols-3 gap-2 mb-4">
                  <p className="text-sm text-gray-700"><span className="font-medium">Job ID:</span> {job.id}</p>
                  <p className="text-sm text-gray-700"><span className="font-medium">Experience:</span> {job.experience}</p>
                  <p className="text-sm text-gray-700"><span className="font-medium">Location:</span> {job.location}</p>
                  <p className="text-sm text-gray-700"><span className="font-medium">Type:</span> {job.type}</p>
                </div>
                <h3 className="font-semibold mt-3 mb-2 text-gray-800">Basic Qualifications:</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm md:text-base">
                  {job.qualifications.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
                <button
                  onClick={() => handleApplyClick(job)}
                  className="mt-4 bg-[#066] text-white px-4 py-2 rounded-lg hover:bg-[#044] transition-colors w-full sm:w-auto"
                >
                  Apply Now
                </button>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white/70 p-6 rounded-lg shadow-md text-center"
            >
              <h3 className="text-lg font-medium text-gray-700">No jobs found matching your criteria</h3>
              <p className="text-gray-600 mt-2">Try adjusting your filters or search term</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Resume Upload Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-lg p-6 w-full max-w-md mx-2 sm:mx-0 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>

              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="text-green-500 text-5xl mb-4">✓</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Application Submitted!</h3>
                  <p className="text-gray-600">Thank you for applying to {selectedJob.title}.</p>
                  <p className="text-gray-600">We'll review your application and get back to you soon.</p>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-bold text-gray-800 mb-2">Apply for {selectedJob?.title}</h2>
                  <p className="text-gray-600 mb-6">Please fill out the form below to apply for this position.</p>

                  <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-700 mb-1">Full Name*</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 mb-1">Email*</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 mb-1">Phone Number*</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 mb-1">Experience Level*</label>
                        <select
                          name="experience"
                          value={formData.experience}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        >
                          <option value="">Select your experience</option>
                          <option>Fresher</option>
                          <option>Entry Level (0-2 years)</option>
                          <option>Mid Level (2-5 years)</option>
                          <option>Senior Level (5+ years)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-gray-700 mb-1">Upload Resume*</label>
                        <div className="flex items-center gap-2">
                          <label className="flex-1 cursor-pointer">
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:bg-gray-50 transition-colors">
                              <Upload className="mx-auto mb-2 text-gray-400" />
                              <p className="text-sm text-gray-500">
                                {formData.resume ? (
                                  <span className="text-teal-600">{formData.resume.name}</span>
                                ) : (
                                  'Click to upload PDF, DOC (max 5MB)'
                                )}
                              </p>
                            </div>
                            <input
                              type="file"
                              accept=".pdf,.doc,.docx"
                              onChange={handleFileChange}
                              required
                              className="hidden"
                            />
                          </label>
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="mt-6 w-full bg-[#066] text-white py-3 rounded-lg hover:bg-[#044] transition-colors flex items-center justify-center gap-2"
                    >
                      Submit Application
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}