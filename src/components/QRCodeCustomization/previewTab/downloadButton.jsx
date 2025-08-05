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

  const DownloadButton = ({ previewRef, regenerateMatrixWithText }) => {
    const { submitForm, encryptSubmitForm } = useServicesFormData();
    const {
      activeService,
      resetAllDynamicForms,
      servicesDataLoading,
      setServicesDataLoading,
    } = useServicesContext();

    const handleDownload = async () => {
      if (!previewRef?.current) {
        toast.error("Preview not available");
        return;
      }
      const submitFn = ["pdf", "audios", "videos", "gallery"].includes(
        activeService
      )
        ? encryptSubmitForm
        : submitForm;
      try {
        setServicesDataLoading(true);
        let generatedUrl = await submitFn();

        if (!generatedUrl) {
          toast.error("QR Code generation failed. Please try again.");
          setServicesDataLoading(false);
          return;
        }

        await regenerateMatrixWithText(generatedUrl);
        await new Promise((res) => setTimeout(res, 150));

        // ✅ Generate image separately
        const dataUrl = await generateImageFromRef(previewRef);

        // const exportWidth = 1024;
        // const exportHeight = Math.round(
        //   (previewRef.current.offsetHeight / previewRef.current.offsetWidth) *
        //     exportWidth
        // );

        resetAllDynamicForms();

        // const dataUrl = await toPng(previewRef.current, {y
        //   cacheBust: true,
        //   backgroundColor: "white",
        //   width: exportWidth,
        //   height: exportHeight,
        //   style: {
        //     transform: `scale(${exportWidth / previewRef.current.offsetWidth})`,
        //     transformOrigin: "top left",
        //     width: `${previewRef.current.offsetWidth}px`,
        //     height: `${previewRef.current.offsetHeight}px`,
        //   },
        // });

        // const link = document.createElement("a");
        // link.download = "qr-code.png";
        // link.href = dataUrl;
        // link.click();
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
    );
  };

  export default DownloadButton;
