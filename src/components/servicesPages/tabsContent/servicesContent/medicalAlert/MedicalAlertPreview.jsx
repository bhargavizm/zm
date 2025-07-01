"use client";

import React, { useEffect } from "react";
import { FiLock } from "react-icons/fi";
import useServicesContext from "@/components/hooks/useServiceContext";
import useDesignContext from "@/components/hooks/useDesignContext";
import Image from "next/image";

const formatLabel = (key) =>
  key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());

const MedicalAlertPreview = () => {
  const { dynamicForms } = useServicesContext();
  const { bgDesign, setBgDesign, isLoading, setIsLoading } = useDesignContext();

  const defaultBg = "/services-service/medical-alert.jpg";

  useEffect(() => {
    setIsLoading(true);
    setBgDesign(defaultBg);
  }, []);

  const medicalAlert = dynamicForms.medicalAlert;

  const hasData = Object.entries(medicalAlert).some(
    ([section, fields]) =>
      section !== "password" &&
      typeof fields === "object" &&
      Object.values(fields).some((value) => value?.toString().trim() !== "")
  );

 const isVideo = bgDesign?.endsWith(".mp4") || bgDesign?.endsWith(".webm");
  const isImage = bgDesign && !isVideo;

  const isBase64 = (str) => typeof str === "string" && str.startsWith("data:");

  const isImageBase64 = (str) => isBase64(str) && str.startsWith("data:image");

  const isPdfBase64 = (str) =>
    isBase64(str) && str.startsWith("data:application/pdf");

  return (
    <div className="flex justify-center">
      <div className="relative w-[350px] h-[650px] rounded-[40px] border-[14px] border-gray-800 shadow-xl overflow-hidden flex flex-col">
        {/* Background */}
        {isImage && (
          <img
            src={bgDesign}
            alt="Background"
            onLoad={() => setTimeout(() => setIsLoading(false), 300)}
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
        )}
        {isVideo && (
          <video
            src={bgDesign}
            autoPlay
            loop
            muted
            playsInline
            onLoadedData={() => setTimeout(() => setIsLoading(false), 300)}
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
        )}
        {!bgDesign && (
          <img
            src={defaultBg}
            alt="Background"
            onLoad={() => setTimeout(() => setIsLoading(false), 300)}
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
        )}

        {/* ⏳ Loader */}
        {isLoading && (
          <div className="absolute inset-0 z-50 bg-mainGreen backdrop-blur-sm flex justify-center items-center">
            <Image
              src="/logos/ZM LOGO.webp"
              alt="Loading"
              width={100}
              height={100}
              className="w-20 h-20 animate-bounce"
            />
          </div>
        )}

        {/* Top Bar */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-6 bg-gray-800 rounded-b-xl z-10" />

        {/* Content */}
        <div className="relative z-10 flex-1 overflow-y-auto bg-white/70 m-2 rounded-xl pt-8 pb-4 px-4">
          {hasData ? (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-center text-[#008080]">
                Medical Alert
              </h2>

              {Object.entries(medicalAlert).map(([section, fields]) => {
                if (section === "password") return null;

                return (
                  typeof fields === "object" && (
                    <div
                      key={section}
                      className="bg-[#008080]/10 p-3 rounded border border-[#008080]/20 space-y-2"
                    >
                      {Object.entries(fields).map(([key, value]) => {
                        if (!value) return null;

                        return (
                          <div key={key} className="text-sm">
                            <span className="font-medium text-[#008080]">
                              {formatLabel(key)}:
                            </span>{" "}
                            {/* Show uploaded file */}
                            {isImageBase64(value) ? (
                              <div className="mt-2">
                                <img
                                  src={value}
                                  alt={key}
                                  className="w-full rounded shadow"
                                />
                              </div>
                            ) : isPdfBase64(value) ? (
                              <a
                                href={value}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 underline ml-1"
                              >
                                View PDF
                              </a>
                            ) : (
                              <span className="text-gray-700 ml-1">
                                {value}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )
                );
              })}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center text-gray-400">
              <FiLock className="text-4xl mb-4 text-[#008080]" />
              <h3 className="text-lg font-medium">Medical Alert Preview</h3>
              <p className="mt-2">Fill the form to see the preview</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicalAlertPreview;
