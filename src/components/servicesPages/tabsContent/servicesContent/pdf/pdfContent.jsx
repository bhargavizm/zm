"use client";
import { useState, useRef } from "react"; // ← include useRef
import { useRouter } from "next/navigation";
import { FiEye, FiEyeOff } from "react-icons/fi";
import useServicesContext from "@/components/hooks/useServiceContext";
import NFCModal from "@/components/modalPopUps/nfcModal";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setPDFServices } from "@/redux/slices/servicesSlice";

const PDFContent = () => {
  const { pdfFormData, setPdfFormData } = useServicesContext();
  const [showPassword, setShowPassword] = useState(false);

  const pdfData = useSelector((state) => state?.services?.pdfServiceData)
  console.log('redux data',pdfData)

  const dispatch = useDispatch()
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




  const handleSubmit = async (e) => {
    console.log('submit')

    e.preventDefault()
    const formData = new FormData();
    formData.append("title", pdfFormData.title);
    formData.append("description", pdfFormData.description);
    formData.append("password", pdfFormData.password);
    if (pdfFormData.file) {
      formData.append("file", pdfFormData.file);
    }
    console.log('submit', formData)
    try {
      const response = await axios.post("http://localhost:3000/api/services/pdf", formData); // ✅ Make sure it's a valid API path
      console.log('submit', response)
      if (response.data.success) {
        dispatch(setPDFServices(response.data.fileData));
        toast.success("✅ File uploaded successfully!");


        // Reset form
        setPdfFormData({
          title: "",
          description: "",
          password: "",
          file: null,
        });

        if (fileInputRef.current) fileInputRef.current.value = "";
      } else {
        toast.error("❌ Upload failed: " + response.data.error);
      }
    } catch (error) {
      const errMsg =
        error?.response?.data?.error || "An unexpected error occurred.";
      toast.error(`❌ ${errMsg}`);
      console.error("Submit Error:", error);
    }
  };





  return (
    <>
      <div className="flex w-full max-w-3xl gap-6">
        <div className="flex-1 bg-white shadow-lg rounded-2xl p-6 space-y-5 max-h-[650px] overflow-auto">
          <form className="space-y-4" >
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
                  {showPassword ? <FiEye size={18} /> : <FiEyeOff size={18} />}
                </button>
              </div>
            </div>

            {/* NFC Modal */}
            <NFCModal />

            {/* Submit */}
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full cursor-pointer bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-lg font-semibold text-sm transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>

{pdfData?.title && (
  <div className="mt-8 space-y-4">
    <h2 className="text-lg font-semibold text-gray-800">Uploaded PDF</h2>
    <div className="p-4 border border-gray-200 rounded-lg shadow-sm bg-gray-50">
      <div className="flex justify-between items-center">
        <div>
          <p className="font-medium text-sm text-gray-900">📄 {pdfData.title}</p>
          <p className="text-xs text-gray-500 mt-1">{pdfData.description}</p>
   <iframe
 src={`${pdfData.pdfFileName}?fl_attachment:false`}
  width="100%"
  height="60px"
  title="PDF Viewer"
/>

{/* <a
  href={pdfData.pdfFileName}
  target="_blank"
  rel="noopener noreferrer"
  className="text-teal-600 text-sm font-medium hover:underline"
>
  Open in New Tab
</a> */}



    <p className="text-xs text-gray-400 mt-1">🔐 {pdfData.password}</p>
        </div>
       
     <a
  href={pdfData.pdfFileName}
  target="_blank"
  rel="noopener noreferrer"
  className="text-teal-600 text-sm font-medium hover:underline"
>
  View PDF
</a>





      </div>
    </div>
  </div>
)}



{/* {pdfData.title} */}

      {/* <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/30">
        <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full border border-teal-200 relative">
        
          
        </div>
      </div> */}
    </>
  );
};

export default PDFContent;





