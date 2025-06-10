"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useServicesContext from "@/components/hooks/useServiceContext";

const GalleryContent = () => {
  // Destructuring imagesFormData and setImagesFormData from your context
  const { imagesFormData, setImagesFormData } = useServicesContext();

  const [showPassword, setShowPassword] = useState(false);
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

  return (
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
                value={imagesFormData.password || ""} // Bind value to imagesFormData.password
                onChange={handleChange}
                placeholder="Set password for gallery"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
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
            Create Gallery
          </button>
        </form>
      </div>
    </div>
  );
};

export default GalleryContent;