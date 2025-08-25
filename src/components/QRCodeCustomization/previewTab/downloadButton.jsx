"use client";

import { FaLongArrowAltDown } from "react-icons/fa";
import { useServicesFormData } from "../servicesData/useServicesFormData";
import useServicesContext from "@/components/hooks/useServiceContext";
import LoadingSpinner from "@/components/common/spinner";
import {
  downloadImage,
  generateImageFromRef,
} from "../utils/generateMergedImage";
import { useState } from "react";
import toast from "react-hot-toast";
import SecuredPricesModalPopUp from "./modalPopUps/securedPricesModalPopUp";
import useDesignContext from "@/components/hooks/useDesignContext";
import { useRouter } from "next/navigation";
import EncryptedPricesModalPopUp from "./modalPopUps/encryptedPricesModalPopUp";

export const uploadImageToCloudinary = async (dataUrl) => {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESETS;

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
  return data.secure_url;
};

const DownloadButton = ({ previewRef, regenerateMatrixWithText }) => {
  const { submitForm, encryptSubmitForm } = useServicesFormData();
  const {
    activeService,
    resetAllDynamicForms,
    servicesDataLoading,
    setServicesDataLoading,
  } = useServicesContext();

  const { resetPreview, setSelectedQRCodeImage } = useDesignContext();

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [userMeta, setUserMeta] = useState({});
  const [generatedUrl, setGeneratedUrl] = useState("");

  const router = useRouter();

  const handleDownload = async () => {
    if (!previewRef?.current) {
      toast.error("Preview not available");
      return;
    }

    try {
      setServicesDataLoading(true);

      // Step 1: Generate + upload preview to Cloudinary
      const dataUrl = await generateImageFromRef(previewRef);
      const imageurl = await uploadImageToCloudinary(dataUrl);
      setSelectedQRCodeImage(imageurl);

      const isEncryptedService = [
        "pdf",
        "audios",
        "videos",
        "gallery",
      ].includes(activeService);

      if (isEncryptedService) {
        /** 🔹 Encrypted Flow */
        const response = await encryptSubmitForm(imageurl);
        const url = response?.qrUrl;
        if (!url) {
          toast.error("short link generation failed");
          return;
        }


        setUserMeta({
          userId: response?.userId,
          userName: response?.userName,
          serviceId: response?.serviceId,
          serviceName: response?.serviceName,
          priceDetails : response?.priceDetails
        });
        setGeneratedUrl(response?.qrUrl || "");
                setModalType("encrypted");
        setShowModal(true);

        // regenerate QR with short link
        // await regenerateMatrixWithText(url);
        // await new Promise((res) => setTimeout(res, 200));

        // const finalDataUrl = await generateImageFromRef(previewRef);
        // resetAllDynamicForms();
        // downloadImage(finalDataUrl);

        // toast.success("QR Code downloaded successfully!");

        // ✅ redirect to dashboard after success
        // router.push("/user-dashboard/qrCodesLists/");
        // resetPreview();
      } else {
        /** 🔹 Secured Flow */
        const response = await submitForm(imageurl);
        const url = response?.qrUrl;
        if (!url) {
          toast.error("QR Code generation failed");
          return;
        }

        setUserMeta({
          userId: response?.userId,
          userName: response?.userName,
          serviceId: response?.serviceId,
          serviceName: response?.serviceName,
        });
        setGeneratedUrl(response?.qrUrl || "");
        resetAllDynamicForms();
        setModalType("secured");
        setShowModal(true);
      }
    } catch (error) {
      console.error("Download failed:", error);
      toast.error(error?.response?.data?.error || error.message);
    } finally {
      setServicesDataLoading(false);
    }
  };

  /** 🔹 Triggered from Secured modal after confirmation */
  /** 🔹 Triggered from Secured modal after confirmation */
const handleSecuredDownload = async () => {
  try {
    setServicesDataLoading(true);

    // regenerate QR with final secured link
    await regenerateMatrixWithText(generatedUrl);
    await new Promise((res) => setTimeout(res, 150));

        // ✅ redirect to dashboard after download
    // router.push("/user-dashboard/qrCodesLists/");
    // capture QR code and download
    const dataUrl = await generateImageFromRef(previewRef);
    downloadImage(dataUrl);

    toast.success("QR Code downloaded successfully!");


    resetPreview();
  } catch (error) {
    toast.error("Download failed. Try again.");
  } finally {
    setServicesDataLoading(false);
  }
};


  return (
    <>
      {/* Fullscreen overlay spinner */}
      {servicesDataLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <LoadingSpinner />
        </div>
      )}

      <div className="pt-4 pb-2 flex flex-col items-center justify-center">
        <button
          onClick={handleDownload}
          className="mt-2 px-6 py-2 text-xl text-white cursor-pointer font-bold rounded-lg flex items-center gap-2 bg-[linear-gradient(to_right,#008080,#001a1a)] disabled:opacity-50"
          disabled={servicesDataLoading}
        >
          {servicesDataLoading ? (
            "Processing..."
          ) : (
            <>
              Submit To Download <FaLongArrowAltDown />
            </>
          )}
        </button>
      </div>

      {modalType === "secured" && (
        <SecuredPricesModalPopUp
          open={showModal}
          userMeta={userMeta}
          onConfirm={handleSecuredDownload}
          onClose={() => setShowModal(false)}
        />
      )}

      {modalType === "encrypted" && (
        <EncryptedPricesModalPopUp
          open={showModal}
          userMeta={userMeta}
           onConfirm={handleSecuredDownload}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default DownloadButton;
