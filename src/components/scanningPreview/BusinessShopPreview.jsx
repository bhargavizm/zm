"use client";
import React, { useEffect, useState } from "react";
import { FiUser, FiPhone, FiImage } from "react-icons/fi";
import BgDesignRenderer from "./bgDesignRender";
import Link from "next/link";
import { HiOutlineLocationMarker } from "react-icons/hi";

const BusinessShopPreview = ({ data }) => {
  const selectedTemplate = data?.selectedTemplate || "template1";
  const defaultBg = `/images/templates/businessShop${selectedTemplate.replace(
    "template",
    ""
  )}.webp`;

  const [bgDesign, setBgDesign] = useState(null);

  useEffect(() => {
    if (data?.bgDesign) {
      setBgDesign(data.bgDesign);
    } else {
      setBgDesign(null); // show only template if no bgDesign
    }
  }, [data]);

  // const isVideo = bgDesign?.endsWith(".mp4") || bgDesign?.endsWith(".webm");
  // const isImage = bgDesign && !isVideo;

  const getSrc = (input) =>
    typeof input === "string" ? input : URL.createObjectURL(input);

  const formatTimeToAMPM = (time) => {
    if (!time) return "";
    const [hour, minute] = time.split(":").map(Number);
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12; // convert 0 → 12
    return `${hour12}:${minute.toString().padStart(2, "0")} ${ampm}`;
  };
  return (
    <div className="h-screen">
      {/* 1. Optional bgDesign (bottom layer) */}
      <BgDesignRenderer bgDesign={bgDesign} defaultBg={defaultBg} />
      {/* 2. Template Layer (middle layer, always shown) */}
      <img
        src={defaultBg}
        className="absolute inset-0 w-full h-full opacity-70 object-center z-[-2]"
        alt="Template"
      />

      {/* 3. Content Layer (top layer) */}
      <div className="relative z-10 p-4 m-4 pt-28 overflow-y-auto scrollbar-hide h-full bg-white/70  rounded-xl">
        {/* Business Logo */}
        {data.shopLogo && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-30">
            <img
              src={getSrc(data.shopLogo)}
              alt="Business Logo"
              className="w-30 h-30 object-center rounded-xl  border-white"
            />
          </div>
        )}

        <div className="space-y-4 text-black pt-9 text-lg">
          {data.businessName && (
            <h2 className="text-xl font-bold text-center text-[#008080]">
              {data.businessName}
            </h2>
          )}

          {/* Business Info */}
          {(data.businessType ||
            data.description ||
            data.openingTime ||
            data.closingTime ||
            data.discount) && (
            <div className="bg-[#008080]/10 p-3 rounded border border-[#008080]/20 ">
              <div className="flex items-center text-[#008080] mb-1">
                <FiUser className="mr-2" />
                <span className="font-medium">Business Info</span>
              </div>
              {data.businessType && <p>Type: {data.businessType}</p>}
              {data.description && <p>{data.description}</p>}
              {data.openingTime && (
                <p>
                  <strong>Opening Timings:</strong>{" "}
                  {formatTimeToAMPM(data.openingTime)}
                </p>
              )}
              {data.closingTime && (
                <p>
                  <strong>Closing Timings:</strong>{" "}
                  {formatTimeToAMPM(data.closingTime)}
                </p>
              )}
              {data.discount && (
                <p className="text-red-600 font-medium">
                  Offer: {data.discount}
                </p>
              )}
            </div>
          )}

          {/* Contact Info */}
          {(data.contact?.ownerName ||
            data.contact?.phone ||
            data.contact?.altPhone ||
            data.contact?.mapLink ||
            data.contact?.email ||
            data.contact?.address) && (
            <div className="bg-[#008080]/10 p-3 rounded border border-[#008080]/20">
              <div className="flex items-center text-[#008080] mb-1">
                <FiPhone className="mr-2" />
                <span className="font-medium">Contact</span>
              </div>
              {data.contact.ownerName && <p>Owner: {data.contact.ownerName}</p>}
              {data.contact.phone && <p>Phone: {data.contact.phone}</p>}
              {data.contact.altPhone && (
                <p>Alt Phone: {data.contact.altPhone}</p>
              )}
              {data.contact.email && <p>Email: {data.contact.email}</p>}
              {data.contact.address && (
                <p>
                  Address:{" "}
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      data.contact.address
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-blue-600 hover:text-blue-800"
                  >
                    {data.contact.address}
                  </a>
                </p>
              )}
              {data.contact?.mapLink && (
                <div className="mt-2 flex items-center gap-1 flex-wrap">
                  <HiOutlineLocationMarker className="w-5 h-5" />
                  <span>Map Link:</span>
                  <Link
                    href={data.contact.mapLink}
                    target="_blank"
                    className="text-blue-600 underline break-all"
                  >
                    View location
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Media Gallery */}
          {Array.isArray(data.shopImages) && data.shopImages.length > 0 && (
            <div className="bg-[#008080]/10 p-3 rounded border border-[#008080]/20 space-y-2">
              <div className="flex items-center text-[#008080] mb-1">
                <FiImage className="mr-2" />
                <span className="font-medium">Media Gallery</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                {data.shopImages.map((img, idx) => (
                  <img
                    key={idx}
                    src={getSrc(img)}
                    alt={`Gallery ${idx + 1}`}
                    className="rounded object-center w-full h-40"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BusinessShopPreview;
