
"use client";
import React, { useEffect } from "react";
import { FiUser, FiMessageSquare, FiCalendar } from "react-icons/fi";
import useDesignContext from "../hooks/useDesignContext";
import BgDesignRenderer from "./bgDesignRender";

const SmsPreview = ({ data }) => {
  const { bgDesign, setBgDesign } = useDesignContext();
  const defaultBg = "/services-service/text-message.webp";

  useEffect(() => {
    if (data?.bgDesign) {
      setBgDesign(data.bgDesign);
    } else {
      setBgDesign(defaultBg);
    }
  }, [data]);

  return (

    <div className="w-full px-6 ">
      <div>
        <BgDesignRenderer bgDesign={bgDesign} defaultBg={defaultBg} />

        <div className="relative flex-1 w-full bg-white/70 m-2 rounded-xl overflow-y-auto pt-6 pb-3 px-3 z-20 ">
          {data?.genderName || data?.messageType || data?.textMessage ? (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-center text-[#008080]">
                SMS QR Code
              </h2>

              <div className="bg-[#008080]/10 p-3 rounded border border-[#008080]/20 text-black">
                <div className="flex items-center text-[#008080] mb-1">
                  <FiUser className="mr-2" />
                  <span className="font-medium">Recipient</span>
                </div>
                {data.genderName && <p>{data.genderName}</p>}
                {data.messageType && <p>Type: {data.messageType}</p>}
              </div>

              {data.textMessage && (
                <div className="bg-[#008080]/10 p-3 rounded border border-[#008080]/20 text-black">
                  <div className="flex items-center text-[#008080] mb-1">
                    <FiMessageSquare className="mr-2" />
                    <span className="font-medium">Message</span>
                  </div>
                  <p>{data.textMessage}</p>
                </div>
              )}

              {data.date && (
                <div className="bg-gray-100 p-3 rounded text-black">
                  <div className="flex items-center  mb-1">
                    <FiCalendar className="mr-2" />
                    <span className="font-medium">Date</span>
                  </div>
                  <p>{new Date(data.date).toLocaleDateString("en-GB")}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center text-gray-400">
              <FiMessageSquare className="text-4xl mb-4 text-[#008080]" />
              <h3 className="text-lg font-medium">SMS QR Preview</h3>
              <p className="mt-2">No data available.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SmsPreview;
