"use client";

import { toPng } from "html-to-image";
import toast from "react-hot-toast";
import { FaLongArrowAltDown } from "react-icons/fa";
import { useServicesFormData } from "../servicesData/useServicesFormData";
import useServicesContext from "@/components/hooks/useServiceContext";
import LoadingSpinner from "@/components/common/spinner";
import {
  downloadImage,
  generateImageFromRef,
} from "../utils/generateMergedImage";
import { useState } from "react";
import EncryptedPricesModalPopUp from "./modalPopUps/encryptedPricesModalPopUp";
import SecuredPricesModalPopUp from "./modalPopUps/securedPricesModalPopUp";

export const uploadImageToCloudinary = async (dataUrl) => {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME; // 🔁 Replace this
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESETS; // 🔁 Replace this

  const formData = new FormData();
  formData.append("file", dataUrl);
  formData.append("upload_preset", uploadPreset);
  formData.append("folder", "qr_codes");

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Failed to upload to Cloudinary");
  }

  const data = await response.json();
  return data.secure_url; // 🔥 Cloud-hosted image URL
};

const DownloadButton = ({ previewRef, regenerateMatrixWithText }) => {
  const { submitForm, encryptSubmitForm } = useServicesFormData();
  const {
    activeService,
    resetAllDynamicForms,
    servicesDataLoading,
    setServicesDataLoading,
  } = useServicesContext();

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("normal");
  const [userMeta, setUserMeta] = useState({});

  const handleDownload = async () => {
    if (!previewRef?.current) {
      toast.error("Preview not available");
      return;
    }

    const isEncryptedService = ["pdf", "audios", "videos", "gallery"].includes(
      activeService
    );
    const submitFn = isEncryptedService ? encryptSubmitForm : submitForm;

    try {
      setServicesDataLoading(true);

      const response = await submitFn();
      const generatedUrl = response?.qrUrl;
      const userMeta = {
        userId: response?.userId,
        userName: response?.userName,
        serviceId: response?.serviceId,
        serviceName: response?.serviceName,
      };

      if (!generatedUrl) {
        toast.error("QR Code generation failed. Please try again.");
        setServicesDataLoading(false);
        return;
      }
      setServicesDataLoading(false);
      setModalType(isEncryptedService ? "encrypted" : "normal");
      setUserMeta(userMeta);
      setShowModal(true);

      await regenerateMatrixWithText(generatedUrl);
      await new Promise((res) => setTimeout(res, 150));

      // ✅ Generate image separately
      const dataUrl = await generateImageFromRef(previewRef);

      resetAllDynamicForms();

      downloadImage(dataUrl);
      toast.success("QR Code downloaded successfully!");
    } catch (error) {
      console.error("Download failed:", error);
      toast.error(error?.response?.data?.error);
    } finally {
      setServicesDataLoading(false);
    }
  };

  return (
    <>
      <div className="pt-4 pb-2 flex flex-col items-center justify-center">
        {servicesDataLoading && <LoadingSpinner />}{" "}
        {/* ← Spinner visible only while loading */}
        <button
          onClick={handleDownload}
          className="mt-2 px-6 py-2 text-xl text-white cursor-pointer font-bold rounded-lg flex items-center gap-2 bg-[linear-gradient(to_right,#008080,#001a1a)] disabled:opacity-50"
          disabled={servicesDataLoading}
        >
          {servicesDataLoading ? (
            <>
              Processing...
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
            </>
          ) : (
            <>
              Submit To Download <FaLongArrowAltDown />
            </>
          )}
        </button>
      </div>

      {modalType === "normal" && (
        <SecuredPricesModalPopUp
          open={showModal}
          userMeta={userMeta}
          onClose={() => setShowModal(false)}
        />
      )}
      {/* {modalType === "encrypted" && (
        <EncryptedPricesModalPopUp
          open={showModal}
                    userMeta={userMeta}
          onClose={() => setShowModal(false)}
        />
      )} */}
    </>
  );
};

export default DownloadButton;
