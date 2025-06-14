"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useServicesContext from "@/components/hooks/useServiceContext";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";


const GalleryContent = () => {
  // Destructuring imagesFormData and setImagesFormData from your context
  const { imagesFormData, setImagesFormData } = useServicesContext();

  const [showPassword, setShowPassword] = useState(false);
    const [nfcEnabled, setNfcEnabled] = useState(false);
    const [showNfcModal, setShowNfcModal] = useState(false);

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    // If the input is a file input (e.g., name is 'files'),
    // convert the FileList to an array and store it.
    // Otherwise, store the value directly for text/password inputs.
    setImagesFormData((prev) => ({
      ...prev,
      [name]: files ? Array.from(files) : value, // Store an array of File objects
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate that at least one image file has been selected for the gallery
    if (!imagesFormData.files || imagesFormData.files.length === 0) {
      alert("Please select at least one image file for your gallery.");
      return;
    }

    // Prepare the data to be stored.
    // For files, we'll store their names for basic representation.
    // In a production app, you'd upload these files to a server and store their URLs.
    const data = {
      title: imagesFormData.title,
      description: imagesFormData.description,
      // Map the array of File objects to an array of their names for storage
      fileNames: imagesFormData.files.map((file) => file.name),
      password: imagesFormData.password,
    };

    // Store the gallery data in localStorage under a specific key
    localStorage.setItem("galleryData", JSON.stringify(data));
    router.push("/preview"); // Navigate to the preview page
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
    <div className="flex w-full max-w-3xl gap-6">
      <div className="flex-1 bg-white shadow-lg rounded-2xl p-6 space-y-5 max-h-[600px] overflow-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Gallery Title
            </label>
            <input
              type="text"
              name="title"
              value={imagesFormData.title || ""} // Bind value to imagesFormData.title
              onChange={handleChange}
              placeholder="Enter gallery title"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Description (Optional)
            </label>
            <textarea
              name="description"
              rows="2"
              value={imagesFormData.description || ""} // Bind value to imagesFormData.description
              onChange={handleChange}
              placeholder="Enter description for your gallery"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Choose Images
            </label>
            <input
              type="file"
              name="files" // Important: The 'name' should match the property in your state (e.g., 'files')
              accept="image/*" // Restrict to image files
              multiple // Allows selecting multiple files
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:bg-teal-600 file:text-white hover:file:bg-teal-700"
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
      value={imagesFormData.password || ""}
      onChange={handleChange}
      placeholder="Set password for gallery"
      className="w-full px-3 py-2 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
    />
    <span
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600 hover:text-teal-600"
    >
      {showPassword ? <IoEyeOffOutline size={18} /> : <IoEyeOutline size={18} />}
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
                    ${nfcEnabled ? "translate-x-8" : "translate-x-0"}`}
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
            Create Gallery
          </button>
        </form>
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

export default GalleryContent;