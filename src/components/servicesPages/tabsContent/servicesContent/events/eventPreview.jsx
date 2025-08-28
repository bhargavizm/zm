"use client";

import React, { useEffect } from "react";
import useServicesContext from "@/components/hooks/useServiceContext";
import useDesignContext from "@/components/hooks/useDesignContext";
import {
  FiCalendar,
  FiMapPin,
  FiUser,
  FiMail,
  FiPhone,
  FiPlus,
} from "react-icons/fi";
import Image from "next/image";

const EventPreview = () => {
  const { eventsFormData } = useServicesContext();
  const { bgDesign, setBgDesign, isLoading, setIsLoading } = useDesignContext();

  const defaultBg = "/services-service/event.webp";

  useEffect(() => {
    setIsLoading(true);
    setBgDesign(defaultBg);
  }, []);

  const hasBasicInfo =
    eventsFormData.title || eventsFormData.organizer || eventsFormData.summary;
  const hasSchedule = eventsFormData.fromDate || eventsFormData.toDate;
  const hasLocation = eventsFormData.venue || eventsFormData.address;
  const hasContact =
    eventsFormData.contactName ||
    eventsFormData.contactEmail ||
    eventsFormData.contactPhone;
  const hasLinks = eventsFormData.buttonLink || eventsFormData.webUrl;
  const hasFiles = eventsFormData.files?.length > 0;

  const isVideo = bgDesign?.endsWith(".mp4") || bgDesign?.endsWith(".webm");
  const isImage = bgDesign && !isVideo;

  return (
    <section className="flex justify-center items-center p-4">
      <div className="relative w-[350px] h-[650px] rounded-[40px] border-[14px] border-gray-800 shadow-2xl overflow-hidden bg-white">
        {/* Background Media */}
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

        {/* Loader */}
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

        {/* Notch */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-gray-800 rounded-b-xl z-10" />

        {/* Scrollable Content */}
        <div
          className="relative z-20 bg-white/60 m-2 rounded-xl px-4 pt-8 pb-6 text-sm overflow-y-auto"
          style={{
            height: "calc(100% - 1rem)",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          {hasBasicInfo ||
          hasSchedule ||
          hasLocation ||
          hasContact ||
          hasLinks ||
          eventsFormData.about ||
          hasFiles ? (
            <div className="space-y-4">
              {eventsFormData.title && (
                <h2 className="text-xl font-bold text-center">
                  {eventsFormData.title}
                </h2>
              )}

              {eventsFormData.organizer && (
                <p className=" text-center">
                  Hosted by{" "}
                  <span className="font-medium">{eventsFormData.organizer}</span>
                </p>
              )}

              {eventsFormData.summary && (
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-[#008080]">{eventsFormData.summary}</p>
                </div>
              )}

              {(eventsFormData.fromDate || eventsFormData.toDate) && (
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center text-gray-700 mb-1">
                    <FiCalendar className="mr-2" />
                    <span className="font-medium">When</span>
                  </div>
                  {eventsFormData.fromDate && (
                    <p>
                      <span className="font-medium">From:</span>{" "}
                      {new Date(eventsFormData.fromDate).toLocaleString()}
                    </p>
                  )}
                  {eventsFormData.toDate && (
                    <p>
                      <span className="font-medium">To:</span>{" "}
                      {new Date(eventsFormData.toDate).toLocaleString()}
                    </p>
                  )}
                </div>
              )}

            {(eventsFormData.venue || eventsFormData.address || eventsFormData.mapLink) && (
  <div className="bg-gray-50 p-3 rounded-lg">
    <div className="flex items-center text-gray-700 mb-1">
      <FiMapPin className="mr-2" />
      <span className="font-medium">Where</span>
    </div>

    {/* Venue */}
    {eventsFormData.venue && (
      <p className="font-medium">{eventsFormData.venue}</p>
    )}

    {/* Address */}
    {eventsFormData.address && (
      
      <a
        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          eventsFormData.address
        )}`}
        target="_blank"
        rel="noopener noreferrer"
         className="text-blue-600 underline break-words"
      >
        {eventsFormData.address}
      </a>
    ) }

    {/* ✅ Direct Map Link */}
    {eventsFormData.mapLink && (
      <div className="mt-2">
        <a
          href={eventsFormData.mapLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline break-words"
        >
          View Location
        </a>
      </div>
    )}
  </div>
)}


              {eventsFormData.about && (
                <div>
                  <h3 className="font-medium mb-1">About</h3>
                  <p className="text-gray-600">{eventsFormData.about}</p>
                </div>
              )}

              {hasContact && (
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center text-gray-700 mb-1">
                    <FiUser className="mr-2" />
                    <span className="font-medium">Contact</span>
                  </div>
                  {eventsFormData.contactName && (
                    <p>{eventsFormData.contactName}</p>
                  )}
                  {eventsFormData.contactEmail && (
                    <p className="flex items-center">
                      <FiMail className="mr-2" /> {eventsFormData.contactEmail}
                    </p>
                  )}
                  {eventsFormData.contactPhone && (
                    <p className="flex items-center">
                      <FiPhone className="mr-2" /> {eventsFormData.contactPhone}
                    </p>
                  )}
                </div>
              )}

              {/* ✅ Uploaded Images Preview */}
              {hasFiles && (
                <div className="bg-gray-50 p-3 ">
                  <h3 className="font-medium mb-2">Event Images</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {eventsFormData.files.map((item) => (
                      <div
                        key={item.id}
                        className="w-full h-28  "
                      >
                        <img
                          src={item.image}
                          alt="Event Upload"
                          className="w-full h-full object-center"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-gray-400">
              <FiPlus className="text-4xl mb-4" />
              <h3 className="text-lg font-medium">Event Preview</h3>
              <p className="mt-2">
                Start filling the form to see your event preview here
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default EventPreview;
