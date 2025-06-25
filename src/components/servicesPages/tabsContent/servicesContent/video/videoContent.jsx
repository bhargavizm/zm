"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useServicesContext from "@/components/hooks/useServiceContext";
import { FiEye, FiEyeOff } from "react-icons/fi";
import NFCModal from "@/components/modalPopUps/nfcModal";

const VedioContent = () => {
  const { videoFormData, setVideoFormData } = useServicesContext(); // Using titleFormData
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setVideoFormData((prev) => ({
      // Updated to setTitleFormData
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!titleFormData.file) {
      // Updated to titleFormData
      alert("Please select an audio file.");
      return;
    }

    const data = {
      title: videoFormData.title, // Updated to titleFormData
      description: videoFormData.description, // Updated to titleFormData
      fileName: videoFormData.file.name, // Updated to titleFormData
      password: videoFormData.password, // Updated to titleFormData
    };

    localStorage.setItem("audioData", JSON.stringify(data));
    router.push("/preview");
  };

  return (
    <>
      <div className="flex w-full max-w-3xl gap-6">
        <div className="flex-1 bg-white shadow-lg rounded-2xl p-6 space-y-5">
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={videoFormData.title} // Updated to titleFormData
                onChange={handleChange}
                placeholder="Enter audio title"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                rows="2"
                value={videoFormData.description} // Updated to titleFormData
                onChange={handleChange}
                placeholder="Enter description"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
              />
            </div>

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
                  value={videoFormData.password}
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

            <NFCModal />

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

export default VedioContent;
