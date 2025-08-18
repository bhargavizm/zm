"use client";
import React, { useEffect } from "react";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { MdEventNote } from "react-icons/md";
import { FiUser, FiCalendar } from "react-icons/fi";
import useServicesContext from "@/components/hooks/useServiceContext";
import useDesignContext from "@/components/hooks/useDesignContext";
import BgDesignRenderer from "../scanningPreview/bgDesignRender";

// --- Plain JS date + time formatter ---
const formatDateTime = (input) => {
  if (!input) return "";
  const d = new Date(input); // works with ISO strings with timezone

  if (isNaN(d.getTime())) return ""; // invalid date guard

  // Date parts
  const day = String(d.getDate()).padStart(2, "0");
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const mon = months[d.getMonth()];
  const year = d.getFullYear();

  // Time parts
  let hours = d.getHours();
  const minutes = String(d.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // convert 0 → 12 for 12-hour format

  return `${day} ${mon} ${year}, ${hours}:${minutes} ${ampm}`;
};


const EventsPreview = ({ data }) => {
  const { eventsFormData } = useServicesContext();
  const { bgDesign, setBgDesign, isLoading, setIsLoading } = useDesignContext();

  const form = data || eventsFormData || {};
  const {
    organizer,
    title,
    summary,
    fromDate,
    toDate,
    venue,
    address,
    contactName,
    contactEmail,
    contactPhone,
    files,
  } = form;

 const formattedFrom = formatDateTime(fromDate);
const formattedTo = formatDateTime(toDate);


  const defaultBg = "/services-service/text-message.webp";

  useEffect(() => {
    setIsLoading(true);
    setBgDesign(form?.bgDesign || defaultBg);
    // Optionally stop loading after bg settles in your renderer logic
  }, [form, setBgDesign, setIsLoading]);

  const hasContent =
    title ||
    organizer ||
    summary ||
    fromDate ||
    toDate ||
    venue ||
    address ||
    contactName ||
    contactEmail ||
    contactPhone ||
    (files?.length > 0);

  return (
    <div className="w-full px-6">
      <div>
        <BgDesignRenderer bgDesign={bgDesign} defaultBg={defaultBg} />

        <div className="relative flex-1 w-full bg-white/70 m-2 rounded-xl overflow-y-auto pt-6 pb-3 px-3 z-20">
          {hasContent ? (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-center text-[#008080]">
                Event QR Code
              </h2>

              {(title || summary) && (
                <div className="bg-[#008080]/10 p-3 rounded border border-[#008080]/20 text-black">
                  <div className="flex items-center text-[#008080] mb-1">
                    <MdEventNote className="mr-2" />
                    <span className="font-medium">Event</span>
                  </div>
                  {title && <p><strong>{title}</strong></p>}
                  {summary && <p>{summary}</p>}
                </div>
              )}

              {(fromDate || toDate) && (
                <div className="bg-[#008080]/10 p-3 rounded border border-[#008080]/20 text-black">
                  <div className="flex items-center mb-1">
                    <FiCalendar className="mr-2" />
                    <span className="font-medium">Dates</span>
                  </div>
                  <p>
                    {formattedFrom}
                    {formattedFrom && formattedTo ? " → " : ""}
                    {formattedTo}
                  </p>
                </div>
              )}

              {venue && (
                <div className="bg-[#008080]/10 p-3 rounded border border-[#008080]/20 text-black">
                  <div className="flex items-center mb-1">
                    <FaMapMarkerAlt className="mr-2" />
                    <span className="font-medium">Venue</span>
                  </div>
                  <p>{venue}</p>
                </div>
              )}

              {address && (
                <div className="bg-[#008080]/10 p-3 rounded border border-[#008080]/20 text-black">
                  <div className="flex items-center mb-1">
                    <FaMapMarkerAlt className="mr-2" />
                    <span className="font-medium">Address</span>
                  </div>
                  <p>{address}</p>
                </div>
              )}

              {(contactName || contactPhone || contactEmail) && (
                <div className="bg-[#008080]/10 p-3 rounded border border-[#008080]/20 text-black">
                  <div className="flex items-center mb-1 text-[#008080]">
                    <FaPhoneAlt className="mr-2" />
                    <span className="font-medium">Contact Info</span>
                  </div>
                  {contactName && <p>Name: {contactName}</p>}
                  {contactPhone && <p>Phone: {contactPhone}</p>}
                  {contactEmail && <p>Email: {contactEmail}</p>}
                </div>
              )}

              {files?.length > 0 && (
                <div className="bg-[#008080]/10 p-3 rounded border border-[#008080]/20 text-black">
                  <div className="flex items-center mb-2 text-[#008080]">
                    <MdEventNote className="mr-2" />
                    <span className="font-medium">Images</span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {files.map((file, index) => (
                      <div
                        key={index}
                        className="w-full h-40 border-[#008080]/20 shadow-sm"
                      >
                        <img
                          src={file.url}
                          alt={file.name || `image-${index}`}
                          className="w-full h-full object-center"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center text-gray-400">
              <MdEventNote className="text-4xl mb-4 text-[#008080]" />
              <h3 className="text-lg font-medium">Event QR Preview</h3>
              <p className="mt-2">No data available.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventsPreview;
