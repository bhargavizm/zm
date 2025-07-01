"use client";

import { useEffect } from "react";
import Image from "next/image"; // ✅ For logo in loader
import useServicesContext from "@/components/hooks/useServiceContext";
import useDesignContext from "@/components/hooks/useDesignContext";

// Reusable transparent card section
const Section = ({ title, children, condition }) => {
  if (!condition) return null;
  return (
    <div className="mb-4 px-4">
      <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-md p-4">
        <h2 className="text-xl font-semibold mb-2 text-[#008080]">{title}</h2>
        <div className="space-y-1.5 text-sm text-gray-800">{children}</div>
      </div>
    </div>
  );
};

const resolveImageUrl = (image) => {
  if (image instanceof File) return URL.createObjectURL(image);
  if (typeof image === "string") return image;
  return null;
};

const VehiclePreview = () => {
  const { dynamicForms } = useServicesContext();
  const { bgDesign, setBgDesign, isLoading, setIsLoading } = useDesignContext();

  useEffect(() => {
    setBgDesign(null);
    setIsLoading(false);
  }, []);

  const { vehicle = {}, vehicleTemplate = {} } = dynamicForms;

  const {
    general = {},
    registration = {},
    contact = {},
    media = {},
    security = {},
  } = vehicle;

  //const { selectedTemplate = "none" } = vehicleTemplate;

  // const hasData =
  //   general.vehicleModel ||
  //   general.vehicleType ||
  //   general.buyDate ||
  //   general.description ||
  //   registration.rcNumber ||
  //   registration.driverName ||
  //   registration.ownerName ||
  //   contact.contact ||
  //   contact.altContact ||
  //   contact.address ||
  //   contact.mapLink ||
  //   media.vehicleImage ||
  //   media.licenseFront ||
  //   media.licenseBack ||
  //   media.galleryImages?.length > 0 ||
  //   security.password ||
  //   selectedTemplate !== "none";
  const { selectedTemplate } = vehicleTemplate;

  const hasData =
    general.vehicleModel || general.vehicleType || general.buyDate || general.description ||
    registration.rcNumber || registration.driverName || registration.ownerName ||
    contact.contact || contact.altContact || contact.address || contact.mapLink ||
    media.vehicleImage || media.licenseFront || media.licenseBack || (media.galleryImages?.length > 0) ||
    security.password;

  // const hasData =
  //   general.vehicleModel ||
  //   general.vehicleType ||
  //   general.buyDate ||
  //   general.description ||
  //   registration.rcNumber ||
  //   registration.driverName ||
  //   registration.ownerName ||
  //   contact.contact ||
  //   contact.altContact ||
  //   contact.address ||
  //   contact.mapLink ||
  //   media.vehicleImage ||
  //   media.licenseFront ||
  //   media.licenseBack ||
  //   media.galleryImages?.length > 0 ||
  //   security.password ||
  //   selectedTemplate !== "none";
  


 

const isVideo = bgDesign?.endsWith(".mp4") || bgDesign?.endsWith(".webm");
  const isImage = bgDesign && !isVideo;

  const templateBgMap = {
    templateV1: "/images/back/bgcar.png",
    templateV2: "/images/back/bgauto.png",
    templateV3: "/images/back/bglorry.png",
    templateV4: "/images/back/bgbike.png",
  };


  const templateBackground = templateBgMap[selectedTemplate] || null;
  const useTemplateBg = selectedTemplate !== "none" && templateBackground;
  // Always use templateV1 as default if no template is selected
//   const templateBackground = templateBgMap[selectedTemplate] || templateBgMap.templateV1;
//   const useTemplateBg = true; // Always true since we always want a template background

  return (
    <div className="flex justify-center">
      <div className="relative w-[350px] h-[650px] rounded-[40px] border-[14px] border-gray-800 shadow-xl overflow-hidden flex flex-col text-gray-800 bg-white">
        {/* Background Layer */}
        {/* {useTemplateBg ? (
          <img
            src={templateBackground}
            alt="Template Background"
            className="absolute inset-0 w-full h-full object-cover z-0 p-3"
          />
        ) : isImage ? (
          <img
            src={bgDesign}
            alt="Custom Background"
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
        ) : isVideo ? (
          <video
            src={bgDesign}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-[#d1f0f0] to-white z-0" />
        )} */}

        {/* Background Layer: bgDesign first */}
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
        {isImage && (
          <img
            src={bgDesign}
            alt="Background Design"
            onLoad={() => setTimeout(() => setIsLoading(false), 300)}
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
        )}

        {/* Template Image Overlay (if selected) */}
        {useTemplateBg && (
          <img
            src={templateBackground}
            alt="Template Background"
            className="absolute inset-0 w-full h-full opacity-70 object-contain z-10 p-2 pointer-events-none"
          />
        )}

        {/* Fallback gradient if no bgDesign or template */}
        {!isVideo && !isImage && !useTemplateBg && (
          <div className="absolute inset-0 bg-gradient-to-b from-[#d1f0f0] to-white z-0" />
        )}

        {/* Loader Overlay */}
        {isLoading && (
          <div className="absolute inset-0 z-50 bg-mainGreen backdrop-blur-sm flex justify-center items-center">
            <Image
              src="/logos/ZM LOGO.webp"
              alt="Loading Logo"
              width={300}
              height={150}
              className="w-20 h-20 animate-bounce"
            />
          </div>
        )}

        {/* Notch */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-6 bg-gray-800 rounded-b-xl z-10" />

        {/* Content */}
        <div className="relative z-10 flex-1 overflow-y-auto scrollbar-hide pt-8 pb-4 ">
          {!hasData ? (
            <div className="flex items-center justify-center h-full text-center text-gray-500 text-lg font-medium px-4">
              Start entering vehicle details to see a live preview!
            </div>
          ) : (
            <div>
              {/* Main Vehicle Image at the top */}
              {resolveImageUrl(media.vehicleImage) && (
                <div className="flex justify-center mb-4 px-4">
                  <div className="bg-white/80 backdrop-blur-md rounded-full shadow-md p-2 w-40 h-40 flex items-center justify-center overflow-hidden">
                    <img
                      src={resolveImageUrl(media.vehicleImage)}
                      alt="Main Vehicle"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </div>
              )}

              <h2 className="text-center text-xl font-bold mb-4 text-[#008080]">
                Vehicle Profile
              </h2>

              <Section
                title="General Information"
                condition={
                  general.vehicleModel ||
                  general.vehicleType ||
                  general.buyDate ||
                  general.description
                }
              >
                {general.vehicleModel && (
                  <p>
                    <strong>Name:</strong> {general.vehicleModel}
                  </p>
                )}
                {general.vehicleType && (
                  <p>
                    <strong>Type:</strong> {general.vehicleType}
                  </p>
                )}
                {general.buyDate && (
                  <p>
                    <strong>Purchase Date:</strong> {general.buyDate}
                  </p>
                )}
                {general.description && (
                  <p>
                    <strong>Description:</strong> {general.description}
                  </p>
                )}
              </Section>

              <Section
                title="Registration Details"
                condition={
                  registration.rcNumber ||
                  registration.driverName ||
                  registration.ownerName
                }
              >
                {registration.rcNumber && (
                  <p>
                    <strong>RC Number:</strong> {registration.rcNumber}
                  </p>
                )}
                {registration.driverName && (
                  <p>
                    <strong>Driver Name:</strong> {registration.driverName}
                  </p>
                )}
                {registration.ownerName && (
                  <p>
                    <strong>Owner Name:</strong> {registration.ownerName}
                  </p>
                )}
              </Section>

              <Section
                title="Contact Information"
                condition={
                  contact.contact ||
                  contact.altContact ||
                  contact.address ||
                  contact.mapLink
                }
              >
                {contact.contact && (
                  <p>
                    <strong>Contact:</strong> {contact.contact}
                  </p>
                )}
                {contact.altContact && (
                  <p>
                    <strong>Alt. Contact:</strong> {contact.altContact}
                  </p>
                )}
                {contact.address && (
                  <p>
                    <strong>Address:</strong> {contact.address}
                  </p>
                )}
                {contact.mapLink && (
                  <p>
                    <strong>Map Link:</strong>{" "}
                    <a
                      href={contact.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {contact.mapLink}
                    </a>
                  </p>
                )}
              </Section>

              {/* Media section at the bottom */}
              <Section
                title="Additional Images"
                condition={
                  media.licenseFront ||
                  media.licenseBack ||
                  media.galleryImages?.length > 0
                }
              >
                <div className="grid grid-cols-2 gap-2">
                  {resolveImageUrl(media.licenseFront) && (
                    <div className="mb-2">
                      <p className="font-medium text-xs mb-1">License Front:</p>
                      <img
                        src={resolveImageUrl(media.licenseFront)}
                        alt="License Front"
                        className="w-full h-20 object-cover rounded border"
                      />
                    </div>
                  )}
                  {resolveImageUrl(media.licenseBack) && (
                    <div className="mb-2">
                      <p className="font-medium text-xs mb-1">License Back:</p>
                      <img
                        src={resolveImageUrl(media.licenseBack)}
                        alt="License Back"
                        className="w-full h-20 object-cover rounded border"
                      />
                    </div>
                  )}
                  {media.galleryImages?.length > 0 &&
                    media.galleryImages.map((img, idx) => {
                      const src = resolveImageUrl(img);
                      return src ? (
                        <div key={idx} className="mb-2">
                          <p className="font-medium text-xs mb-1">
                            Gallery {idx + 1}:
                          </p>
                          <img
                            src={src}
                            alt={`Gallery ${idx + 1}`}
                            className="w-full h-20 object-cover rounded border"
                          />
                        </div>
                      ) : null;
                    })}
                </div>
              </Section>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="relative z-10 border-t border-gray-200 text-center text-xs text-gray-500 py-2 bg-white/70">
          <p>Scan for Vehicle Info</p>
          <p className="mt-1">v1.0.0</p>
        </div>
      </div>
    </div>
  );
};

export default VehiclePreview;
