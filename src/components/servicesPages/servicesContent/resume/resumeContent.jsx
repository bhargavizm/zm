"use client"; // This directive is essential for Next.js 13+ to mark this as a client component

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // For navigation in Next.js App Router
import useServicesContext from "@/components/hooks/useServiceContext"; // Assuming you have this context
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

const ResumeContent = () => {
  // Destructure resumeFormData from your context
  const { resumeFormData, setResumeFormData } = useServicesContext();

  const [showPassword, setShowPassword] = useState(false);
  const [nfcEnabled, setNfcEnabled] = useState(false);
  const [showNfcModal, setShowNfcModal] = useState(false);
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
      resumeFileName: resumeFormData.resumeFile
        ? resumeFormData.resumeFile.name
        : null,
      resumeUrl: resumeFormData.resumeUrl, // The external URL
      password: resumeFormData.password,
    };

    console.log("Submitted Resume Data:", submittedData);

    // Optionally store this data in localStorage for a separate preview page
    localStorage.setItem("resumeQRData", JSON.stringify(submittedData));
    router.push("/preview"); // Navigate to a dedicated preview page if you have one
    // alert("Resume data submitted (check console). A real QR code would be generated here!");
  };

  const handleNfcToggle = () => {
    if (!nfcEnabled) {
      setShowNfcModal(true);
    } else {
      setNfcEnabled(false);
    }
  };

  const confirmNfc = () => {
    setNfcEnabled(true);
    setShowNfcModal(false);
  };

  const cancelNfc = () => {
    setShowNfcModal(false);
  };

  return (
    <>
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
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Password (Optional)
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={resumeFormData.password || ""}
                    onChange={handleChange}
                    placeholder="Set password for gallery"
                    className="w-full px-3 py-2 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600 hover:text-teal-600"
                  >
                    {showPassword ? (
                      <IoEyeOffOutline size={18} />
                    ) : (
                      <IoEyeOutline size={18} />
                    )}
                  </span>
                </div>
              </div>

              {/* ✅ NFC Toggle with Icon */}
              <div className="flex items-center gap-4 mt-2">
                <span className="text-sm font-medium text-gray-700">NFC</span>
                <button
                  type="button"
                  onClick={handleNfcToggle}
                  className={`relative cursor-pointer inline-flex h-8 w-16 items-center rounded-full transition-colors duration-500
                                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#008080]
                                ${nfcEnabled ? "bg-[#008080]" : "bg-gray-300"}`}
                >
                  <span
                    className={`absolute left-1 top-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-md transition-all duration-300
                                ${
                                  nfcEnabled ? "translate-x-8" : "translate-x-0"
                                }`}
                  >
                    {nfcEnabled ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-[#008080]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    )}
                  </span>
                </button>
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

      {/* ✅ NFC Modal */}
      {showNfcModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/30">
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full border border-teal-200 relative">
            {/* Close Button */}
            <button
              onClick={cancelNfc}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl"
            >
              &times;
            </button>

            <h2 className="text-xl font-bold text-[#008080] mb-2">
              NFC Activated
            </h2>
            <p className="text-sm text-gray-700">
              You're trying to enable <strong>NFC</strong> features.
              <br />
              This is a <strong>premium service</strong>.
              <br />
              <span className="text-[#008080] font-semibold">
                Cost: ₹499/year
              </span>
            </p>

            <div className="flex justify-end mt-5 space-x-3">
              <button
                onClick={cancelNfc}
                className="px-4 py-2 cursor-pointer rounded border border-gray-400 text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={confirmNfc}
                className="px-4 py-2 cursor-pointer bg-[#008080] text-white rounded hover:bg-[#006666] transition"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ResumeContent;
