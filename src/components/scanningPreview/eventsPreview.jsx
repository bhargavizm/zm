"use client";
import React, { useEffect } from "react";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import { MdEventNote } from "react-icons/md";
import { FiUser, FiCalendar } from "react-icons/fi";
import useServicesContext from "@/components/hooks/useServiceContext";
import useDesignContext from "@/components/hooks/useDesignContext";
import BgDesignRenderer from "../scanningPreview/bgDesignRender";
import { format } from "date-fns";

const EventsPreview = ({ data }) => {
  const { eventsFormData } = useServicesContext();
  const { bgDesign, setBgDesign, isLoading, setIsLoading } = useDesignContext();

  const form = data || eventsFormData;
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
    password,
    qrCodeDetails,
  } = form || {};

  const formattedFrom = fromDate ? format(new Date(fromDate), "dd MMM yyyy") : "";
  const formattedTo = toDate ? format(new Date(toDate), "dd MMM yyyy") : "";

  const defaultBg = "/services-service/text-message.webp";

  useEffect(() => {
    setIsLoading(true);
    setBgDesign(form?.bgDesign || defaultBg);
  }, [form]);

  return (
    <div className="w-full px-6">
      <div>
        <BgDesignRenderer bgDesign={bgDesign} defaultBg={defaultBg} />

        <div className="relative flex-1 w-full bg-white/70 m-2 rounded-xl overflow-y-auto pt-6 pb-3 px-3 z-20">
          {title || organizer || fromDate ? (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-center text-[#008080]">
                Event QR Code
              </h2>

              {/* Event Summary */}
              <div className="bg-[#008080]/10 p-3 rounded border border-[#008080]/20 text-black">
                <div className="flex items-center text-[#008080] mb-1">
                  <MdEventNote className="mr-2" />
                  <span className="font-medium">Event</span>
                </div>
                <p><strong>{title}</strong></p>
                {summary && <p>{summary}</p>}
              </div>

              {/* Organizer */}
              {organizer && (
                <div className="bg-[#008080]/10 p-3 rounded border border-[#008080]/20 text-black">
                  <div className="flex items-center text-[#008080] mb-1">
                    <FiUser className="mr-2" />
                    <span className="font-medium">Organizer</span>
                  </div>
                  <p>{organizer}</p>
                </div>
              )}

              {/* Dates */}
              {(fromDate || toDate) && (
                <div className="bg-[#008080]/10 p-3 rounded border border-[#008080]/20 text-black">
                  <div className="flex items-center mb-1">
                    <FiCalendar className="mr-2" />
                    <span className="font-medium">Dates</span>
                  </div>
                  <p>{formattedFrom} → {formattedTo}</p>
                </div>
              )}

              {/* Venue */}
              {venue && (
                <div className="bg-[#008080]/10 p-3 rounded border border-[#008080]/20 text-black">
                  <div className="flex items-center mb-1">
                    <FaMapMarkerAlt className="mr-2" />
                    <span className="font-medium">Venue</span>
                  </div>
                  <p>{venue}</p>
                </div>
              )}

              {/* Address */}
              {address && (
                <div className="bg-[#008080]/10 p-3 rounded border border-[#008080]/20 text-black">
                  <div className="flex items-center mb-1">
                    <FaMapMarkerAlt className="mr-2" />
                    <span className="font-medium">Address</span>
                  </div>
                  <p>{address}</p>
                </div>
              )}

              {/* Contact Info */}
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

              {/* {password && (
                <div className="text-yellow-700 font-semibold">
                  🔒 Password protected event
                </div>
              )} */}
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
