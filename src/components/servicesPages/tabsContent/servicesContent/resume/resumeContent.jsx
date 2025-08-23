"use client";

import React, { useState, useRef } from "react";
import { useParams } from "next/navigation";
import { IoEyeOutline, IoEyeOffOutline, IoClose } from "react-icons/io5";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import useServicesContext from "@/components/hooks/useServiceContext";
import useDesignContext from "@/components/hooks/useDesignContext";
import NFCModal from "@/components/modalPopUps/nfcModal";
import { setResumeServices } from "@/redux/slices/servicesSlice";
import LoadingSpinner from "@/components/common/spinner";

const MAX_FILE_SIZE_MB = 2;
const MAX_TOTAL_SIZE_MB = 30;

const ResumeContent = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const fileInputRef = useRef();

  const { setActiveTab } = useDesignContext();
  const { resumeFormData, setResumeFormData, servicesDataLoading } =
    useServicesContext();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [errors, setErrors] = useState({ resumeUrl: "" });

  // URL validation
  const isValidUrl = (url) => {
    if (!url) return true;
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  // Handle file selection
  const handleChange = (e) => {
    const { files } = e.target;
    if (!files) return;

    const newFiles = Array.from(files);
    const existingFiles = resumeFormData.resumeFiles || [];

    for (let file of newFiles) {
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        toast.error(`${file.name} exceeds ${MAX_FILE_SIZE_MB}MB limit.`);
        return;
      }
    }

    const uniqueFiles = newFiles.filter(
      (file) =>
        !existingFiles.some(
          (f) => f.name === file.name && f.size === file.size
        )
    );

    const totalSize = [...existingFiles, ...uniqueFiles].reduce(
      (acc, file) => acc + file.size,
      0
    );

    if (totalSize > MAX_TOTAL_SIZE_MB * 1024 * 1024) {
      toast.error(`Total size exceeds ${MAX_TOTAL_SIZE_MB}MB limit.`);
      return;
    }

    setResumeFormData((prev) => ({
      ...prev,
      resumeFiles: [...existingFiles, ...uniqueFiles],
    }));

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Remove a file
  const handleFileRemove = (index) => {
    setResumeFormData((prev) => {
      const updated = [...(prev.resumeFiles || [])];
      updated.splice(index, 1);
      return { ...prev, resumeFiles: updated };
    });
  };

  // Handle input changes (URL/Password)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setResumeFormData((prev) => ({ ...prev, [name]: value }));

    // URL validation
    if (name === "resumeUrl") {
      if (value && !isValidUrl(value.trim())) {
        setErrors((prev) => ({ ...prev, resumeUrl: "Invalid URL" }));
      } else {
        setErrors((prev) => ({ ...prev, resumeUrl: "" }));
      }
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const hasFiles = resumeFormData.resumeFiles?.length > 0;
    const hasUrl = resumeFormData.resumeUrl?.trim();
    const hasPassword = resumeFormData.password?.trim();

    if (hasUrl && !isValidUrl(resumeFormData.resumeUrl.trim())) {
      setErrors((prev) => ({ ...prev, resumeUrl: "Invalid URL" }));
      toast.error("Please enter a valid URL.");
      return;
    }

    if (!hasFiles && !hasUrl && !hasPassword) {
      toast.error("Please fill at least one field before submitting.");
      return;
    }

    setShowConfirmModal(true);
  };

  // Confirm submission (placeholder for server call)
  const submitToServer = () => {
    setActiveTab(slug, "Backdrop Designs");
    toast.success("Submission confirmed!");
    setShowConfirmModal(false);
  };

  return (
    <>
      {servicesDataLoading && <LoadingSpinner />}

      <div className="flex items-center justify-center p-4">
        <div className="flex w-full max-w-5xl gap-6">
          <div className="flex-1 bg-white shadow-xl rounded-2xl p-6 space-y-5 max-h-[600px] overflow-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* File Upload */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Upload Resumes (PDF/Doc) - Multiple files allowed
                </label>
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md text-sm"
                  >
                    Choose Files
                  </button>
                  <span className="text-sm text-gray-600">
                    {resumeFormData.resumeFiles?.length || 0} file
                    {resumeFormData.resumeFiles?.length === 1 ? "" : "s"}{" "}
                    selected
                  </span>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  onChange={handleChange}
                />

                {resumeFormData.resumeFiles?.length > 0 && (
                  <div className="mt-2 space-y-2">
                    {resumeFormData.resumeFiles.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded-md text-sm"
                      >
                        <span className="truncate flex-1">{file.name}</span>
                        <span className="ml-2 text-gray-500 text-xs">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </span>
                        <button
                          type="button"
                          onClick={() => handleFileRemove(index)}
                          className="text-red-600 ml-2"
                        >
                          <IoClose size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Resume URL */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Or Enter Resume URL
                </label>
                <input
                  type="url"
                  name="resumeUrl"
                  value={resumeFormData.resumeUrl || ""}
                  onChange={handleInputChange}
                  placeholder="https://example.com/your-resume.pdf"
                  className={`w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                    errors.resumeUrl ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.resumeUrl && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.resumeUrl}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={resumeFormData.password || ""}
                    onChange={handleInputChange}
                    placeholder="Set password for resume"
                    className="w-full px-3 py-2 pr-10 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600 hover:text-teal-600"
                  >
                    {showPassword ? (
                      <IoEyeOutline size={18} />
                    ) : (
                      <IoEyeOffOutline size={18} />
                    )}
                  </span>
                </div>
              </div>

              <NFCModal />

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="font-bold px-4 py-2 bg-[#008080] text-white rounded text-lg"
                >
                  Next →
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Confirmation Modal */}
        {showConfirmModal && (
           <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/30">
          <div className="bg-white relative rounded-xl shadow-xl p-6 w-full max-w-xl max-h-[90vh] border border-teal-200 mx-4 sm:mx-auto">
              <h2 className="text-lg font-semibold text-gray-800">
                Confirm Submission
              </h2>
              <div className="text-md text-gray-700 space-y-2">
                {resumeFormData.resumeFiles?.length > 0 && (
                  <div>
                    <strong>Files:</strong>
                    <ul className="list-disc pl-5 mt-1">
                      {resumeFormData.resumeFiles.map((file, index) => (
                        <li key={index} className="truncate">
                          {file.name} -{" "}
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {resumeFormData.resumeUrl && (
                  <p>
                    <strong>URL:</strong> {resumeFormData.resumeUrl}
                  </p>
                )}
                {resumeFormData.password && (
                  <p>
                    <strong>Password:</strong> {resumeFormData.password}
                  </p>
                )}
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                >
                  Edit
                </button>
                <button
                  onClick={submitToServer}
                  className="px-4 py-2 bg-[#008080] text-white rounded font-bold"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ResumeContent;


