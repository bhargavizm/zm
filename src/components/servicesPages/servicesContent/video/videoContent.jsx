"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const  VideoContent = ()  => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a video file.");
      return;
    }

    const fileUrl = URL.createObjectURL(file);

    // Ideally you store this in a global store or temporary localStorage
    // For demo purposes, we’ll use localStorage here:
    localStorage.setItem(
      "videoPreviewData",
      JSON.stringify({
        title,
        description,
        fileName: file.name,
        password,
        fileUrl,
      })
    );

    router.push("/video/preview");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#008080] to-[#005f5f] flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-6 space-y-5">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          🎥 Video QR Generator
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-600">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 text-sm"
              placeholder="Video title"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="2"
              className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 text-sm"
              placeholder="Short description"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Video File</label>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:bg-teal-600 file:text-white hover:file:bg-teal-700"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 text-sm"
                placeholder="Password"
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
            className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-lg font-semibold text-sm"
          >
            Preview on iPhone
          </button>
        </form>
      </div>
    </div>
  );
}

export default VideoContent