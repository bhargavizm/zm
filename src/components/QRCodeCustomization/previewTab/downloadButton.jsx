"use client";

import { toPng } from "html-to-image";
import toast from "react-hot-toast";
import { FaLongArrowAltDown } from "react-icons/fa";
import { useServicesFormData } from "../servicesData/useServicesFormData";
import useServicesContext from "@/components/hooks/useServiceContext";




const DownloadButton = ({ previewRef, regenerateMatrixWithText }) => {
  const {
    activeService,
    submitForm,
    encryptSubmitForm,
  } = useServicesFormData();

  const {resetAllDynamicForms} = useServicesContext()

  const handleDownload = async () => {
    if (!previewRef?.current) {
      toast.error("Preview not available");
      return;
    }

    const submitFn = ["pdf", "audios", "videos", "gallery"].includes(activeService)
      ? encryptSubmitForm
      : submitForm;

    try {
      let generatedUrl = await submitFn();

      if (!generatedUrl) {
        toast.error("QR Code generation failed. Please try again.");
        return;
      }

      await regenerateMatrixWithText(generatedUrl);
      await new Promise((res) => setTimeout(res, 150));

      const exportWidth = 1024;
      const exportHeight = Math.round(
        (previewRef.current.offsetHeight / previewRef.current.offsetWidth) * exportWidth
      );

      resetAllDynamicForms()

      const dataUrl = await toPng(previewRef.current, {
        cacheBust: true,
        backgroundColor: "white",
        width: exportWidth,
        height: exportHeight,
        style: {
          transform: `scale(${exportWidth / previewRef.current.offsetWidth})`,
          transformOrigin: "top left",
          width: `${previewRef.current.offsetWidth}px`,
          height: `${previewRef.current.offsetHeight}px`,
        },
      });

      const link = document.createElement("a");
      link.download = "qr-code.png";
      link.href = dataUrl;
      link.click();

      toast.success("QR Code downloaded successfully!");
    } catch (error) {
      console.error("Download failed:", error);
    toast.error(error?.response?.data?.error);
    }
  };

  return (
   <div className="pt-4 pb-2 flex justify-center border-t">
      <button
        onClick={handleDownload}
        className="px-6 py-2 text-xl text-white cursor-pointer font-bold rounded-lg flex items-center gap-2 bg-[linear-gradient(to_right,#008080,#001a1a)]"
      >
        Download Large Files
        <FaLongArrowAltDown />
      </button>
    </div>
  );
};

export default DownloadButton;
