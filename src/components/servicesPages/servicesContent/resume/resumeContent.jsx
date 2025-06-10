"use client"; // This directive is essential for Next.js 13+ to mark this as a client component

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // For navigation in Next.js App Router
import useServicesContext from "@/components/hooks/useServiceContext"; // Assuming you have this context

const ResumeContent = () => {
  // Destructure resumeFormData from your context
  const { resumeFormData, setResumeFormData } = useServicesContext();

  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter(); // Initialize Next.js router

  // Effect to clean up the Object URL when the component unmounts
  // or when resumeFile changes to avoid memory leaks
  useEffect(() => {
    if (resumeFormData.resumeFile) {
      const url = URL.createObjectURL(resumeFormData.resumeFile);
      return () => URL.revokeObjectURL(url); // Clean up the URL
    }
  }, [resumeFormData.resumeFile]); // Re-run when resumeFile changes

  // Generic handleChange function for all form fields
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setResumeFormData((prevData) => ({
      ...prevData,
      // If the input is a file input, store the File object (the first one)
      // Otherwise, store the value from text/url/password inputs
      [name]: name === "resumeFile" ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate if either a resume file is uploaded OR a resume URL is provided
    if (!resumeFormData.resumeFile && !resumeFormData.resumeUrl) {
      alert("Please upload a resume file or provide a resume URL.");
      return;
    }

    // In a real application, you would handle file uploads (e.g., to cloud storage)
    // and/or generate a QR code from the resume's public URL.

    const submittedData = {
      title: resumeFormData.title,
      description: resumeFormData.description,
      // Store resume file name for display
      resumeFileName: resumeFormData.resumeFile ? resumeFormData.resumeFile.name : null,
      resumeUrl: resumeFormData.resumeUrl, // The external URL
      password: resumeFormData.password,
    };

    console.log("Submitted Resume Data:", submittedData);

    // Optionally store this data in localStorage for a separate preview page
    localStorage.setItem("resumeQRData", JSON.stringify(submittedData));
    router.push("/preview"); // Navigate to a dedicated preview page if you have one
    // alert("Resume data submitted (check console). A real QR code would be generated here!");
  };

  return (
    <div className=" flex items-center justify-center ">
      <div className="flex w-full max-w-5xl gap-6">
        {/* Form Section */}
        <div className="flex-1 bg-white shadow-xl rounded-2xl p-6 space-y-5 max-h-[600px] overflow-auto">

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                name="title"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                value={resumeFormData.title || ""}
                onChange={handleChange}
                placeholder="Enter resume title"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                rows="2"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                value={resumeFormData.description || ""}
                onChange={handleChange}
                placeholder="Enter resume description"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Upload Resume (PDF/Doc)
              </label>
              <input
                type="file"
                name="resumeFile"
                accept=".pdf,.doc,.docx" // Accept common resume formats
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:bg-teal-600 file:text-white hover:file:bg-teal-700"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Or Enter Resume URL
              </label>
              <input
                type="url"
                name="resumeUrl"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                value={resumeFormData.resumeUrl || ""}
                onChange={handleChange}
                placeholder="https://example.com/your-resume.pdf"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Password (Optional)
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                  value={resumeFormData.password || ""}
                  onChange={handleChange}
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2 text-xs text-teal-600 font-medium focus:outline-none"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-lg font-semibold text-sm transition"
            >
              Generate QR Code
            </button>
          </form>
        </div>

     
      </div>
    </div>
  );
};

export default ResumeContent;