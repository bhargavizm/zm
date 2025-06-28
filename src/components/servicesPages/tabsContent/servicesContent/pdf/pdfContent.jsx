"use client";
import { useState, useRef } from "react"; // ← include useRef
import { useRouter } from "next/navigation";
import { FiEye, FiEyeOff } from "react-icons/fi";
import useServicesContext from "@/components/hooks/useServiceContext";
import NFCModal from "@/components/modalPopUps/nfcModal";

const PDFContent = () => {
  const { pdfFormData, setPdfFormData } = useServicesContext();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  // 👇 Ref to reset file input
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setPdfFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  

   
   


  return (
    <div className="flex w-full max-w-3xl gap-6">
      <div className="flex-1 bg-white shadow-lg rounded-2xl p-6 space-y-5 max-h-[650px] overflow-auto">
        <form className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={pdfFormData.title}
              onChange={handleChange}
              placeholder="Enter PDF title"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              rows="2"
              value={pdfFormData.description}
              onChange={handleChange}
              placeholder="Enter description"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
            />
          </div>

          {/* PDF File Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Choose PDF File
            </label>
            <input
              ref={fileInputRef}
              type="file"
              name="file"
              accept="application/pdf"
              onChange={handleChange}
              className="w-full px-3 py-2 cursor-pointer border border-gray-300 rounded-lg text-sm file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:bg-teal-600 file:text-white hover:file:bg-teal-700"
            />

            {pdfFormData.file && (
              <div className="mt-2 flex items-center justify-between bg-gray-100 px-3 py-2 text-sm">
                <span className="truncate">{pdfFormData.file.name}</span>
                <button
                  type="button"
                  onClick={() => {
                    setPdfFormData((prev) => ({ ...prev, file: null }));
                    if (fileInputRef.current) {
                      fileInputRef.current.value = ""; // 👈 reset file input
                    }
                  }}
                  className="text-red-600 text-sm cursor-pointer"
                >
                  ❌
                </button>
              </div>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={pdfFormData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 focus:outline-none"
              >
                {showPassword ? <FiEye size={18} />  : <FiEyeOff size={18} />}
              </button>
            </div>
          </div>

          {/* NFC Modal */}
          <NFCModal />

          {/* Submit */}
          <button
            type="button"
            className="w-full cursor-pointer bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-lg font-semibold text-sm transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default PDFContent;
