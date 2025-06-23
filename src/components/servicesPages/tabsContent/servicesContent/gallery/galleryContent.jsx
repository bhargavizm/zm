"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import useServicesContext from "@/components/hooks/useServiceContext";
import { IoEyeOutline, IoEyeOffOutline, IoClose } from "react-icons/io5";
import NFCModal from "@/components/modalPopUps/nfcModal";

const GalleryContent = () => {
  const { imagesFormData, setImagesFormData } = useServicesContext();
  const [showPassword, setShowPassword] = useState(false);
  const [previewUrls, setPreviewUrls] = useState([]);
  const router = useRouter();

  // Generate preview URLs when files change
  useEffect(() => {
    if (imagesFormData.files && imagesFormData.files.length > 0) {
      const urls = imagesFormData.files.map((file) => URL.createObjectURL(file));
      setPreviewUrls(urls);

      return () => {
        urls.forEach((url) => URL.revokeObjectURL(url));
      };
    } else {
      setPreviewUrls([]);
    }
  }, [imagesFormData.files]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const fileList = Array.from(files);
      setImagesFormData((prev) => ({
        ...prev,
        [name]: [...(prev.files || []), ...fileList],
      }));
    } else {
      setImagesFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageDelete = (indexToDelete) => {
    const updatedFiles = imagesFormData.files.filter((_, index) => index !== indexToDelete);
    setImagesFormData((prev) => ({ ...prev, files: updatedFiles }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!imagesFormData.files || imagesFormData.files.length === 0) {
      alert("Please select at least one image file for your gallery.");
      return;
    }

    const data = {
      title: imagesFormData.title,
      description: imagesFormData.description,
      fileNames: imagesFormData.files.map((file) => file.name),
      password: imagesFormData.password,
    };

    localStorage.setItem("galleryData", JSON.stringify(data));
    router.push("/preview");
  };

  return (
    <div className="flex w-full max-w-3xl gap-6 h-auto">
      <div className="flex-1 bg-white shadow-lg rounded-2xl p-6 space-y-5 max-h-[600px] overflow-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Gallery Title</label>
            <input
              type="text"
              name="title"
              value={imagesFormData.title || ""}
              onChange={handleChange}
              placeholder="Enter gallery title"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Description (Optional)</label>
            <textarea
              name="description"
              rows="2"
              value={imagesFormData.description || ""}
              onChange={handleChange}
              placeholder="Enter description for your gallery"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
            />
          </div>

          {/* Upload & Previews */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Choose Images</label>
            <input
              type="file"
              name="files"
              accept="image/*"
              multiple
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:bg-teal-600 file:text-white hover:file:bg-teal-700"
            />

            {previewUrls.length > 0 && (
              <div className="grid grid-cols-3 gap-3 mt-4">
                {previewUrls.map((src, index) => (
                  <div key={index} className="relative group">
                    <Image
                      src={src}
                      alt={`Preview ${index + 1}`}
                      width={100}
                      height={100}
                      className="rounded-lg object-cover w-full h-full aspect-square"
                    />
                    <button
                      type="button"
                      onClick={() => handleImageDelete(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full text-xs opacity-80 hover:opacity-100"
                    >
                      <IoClose size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Password */}
          <div>
            
          </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Password
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
                  {showPassword ? (
                    <IoEyeOffOutline size={18} />
                  ) : (
                    <IoEyeOutline size={18} />
                  )}
                </span>
              </div>
            </div>

            <NFCModal />

          <button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-lg font-semibold text-sm transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default GalleryContent;
