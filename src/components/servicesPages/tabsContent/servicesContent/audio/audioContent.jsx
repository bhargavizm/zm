"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiEye, FiEyeOff } from "react-icons/fi";
import useServicesContext from "@/components/hooks/useServiceContext";
import NFCModal from "@/components/modalPopUps/nfcModal";

const AudioContent = () => {
  const {audioFormData, setAudioFormData } = useServicesContext();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setAudioFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!titleFormData.file) {
      alert("Please select an audio file.");
      return;
    }

    const data = {
      title: audioFormData.title,
      description: audioFormData.description,
      fileName: audioFormData.file.name,
      password: audioFormData.password,
    };

    localStorage.setItem("audioData", JSON.stringify(data));
    router.push("/preview");
  };

  return (
    <>
    <div className="flex w-full max-w-3xl gap-6">
      <div className="flex-1 bg-white shadow-lg rounded-2xl p-6 space-y-5 ">
        <form className="space-y-4">
          {/* Title Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={audioFormData.title}
              onChange={handleChange}
              placeholder="Enter audio title"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
            />
          </div>

          {/* Description Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              rows="2"
              value={audioFormData.description}
              onChange={handleChange}
              placeholder="Enter description"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
            />
          </div>

          {/* File Upload Field */}
          {/* File Upload Field with Preview and Remove */}
<div>
  <label className="block text-sm font-semibold text-gray-700 mb-1">
    Choose File
  </label>
  <input
    type="file"
    name="file"
    accept="audio/*"
    onChange={handleChange}
    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:bg-teal-600 file:text-white hover:file:bg-teal-700"
  />

  {audioFormData.file && (
    <div className="flex items-center justify-between mt-2 bg-gray-50 border border-gray-200 rounded px-3 py-2 text-sm">
      <span className="truncate max-w-[80%]">{audioFormData.file.name}</span>
      <button
        type="button"
        onClick={() =>
          setAudioFormData((prev) => ({ ...prev, file: null }))
        }
        className="text-red-600 hover:text-red-800 font-bold ml-4"
        aria-label="Remove file"
      >
        ✕
      </button>
    </div>
  )}
</div>


          {/* Password Field with Eye Icon */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={audioFormData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 focus:outline-none"
              >
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
          </div>

        <NFCModal/>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full cursor-pointer bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-lg font-semibold text-sm transition"
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
