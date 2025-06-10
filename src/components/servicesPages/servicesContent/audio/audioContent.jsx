"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const AudioContent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select an audio file.");
      return;
    }

    // Instead of router.push with state, pass data via query or localStorage
    const data = {
      title,
      description,
      fileName: file.name,
      password,
    };

    // Store in localStorage or global state (temporary workaround)
    localStorage.setItem("audioData", JSON.stringify(data));
    router.push("/preview");
  };

  return (
    <>
      <h1 className="text-3xl pb-6 font-bold text-gray-800">
        Audio QR Generator
      </h1>
      <div className="flex w-full max-w-3xl gap-6">
        <div className="flex-1 bg-white shadow-lg rounded-2xl p-6 space-y-5 max-h-[600px] overflow-auto">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Audio Title
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter audio title"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Description
              </label>
              <textarea
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                rows="2"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Choose Audio File
              </label>
              <input
                type="file"
                accept="audio/*"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:bg-teal-600 file:text-white hover:file:bg-teal-700"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AudioContent;
