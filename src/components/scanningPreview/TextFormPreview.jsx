"use client";

import React, { useEffect } from "react";
import { FiUser, FiMessageSquare } from "react-icons/fi";
import Image from "next/image";
import useDesignContext from "../hooks/useDesignContext";
import BgDesignRenderer from "./bgDesignRender";

const TextMessagePreview = ({ data }) => {
  const defaultBg = "/services-service/text-message.webp";
  const { bgDesign, setBgDesign } = useDesignContext();

  const hasData = data?.sender || data?.message;

  useEffect(() => {
    // setIsLoading(true);

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

        {/* 🧾 Main Content */}
        <div className="relative flex-1 w-full bg-white/70 m-2 rounded-xl overflow-y-auto pt-6 pb-3 px-3 z-20 ">
          {hasData ? (
            <div className="space-y-4 ">
              <h2 className="text-xl font-bold text-center text-[#008080]">
                Text Message Preview
              </h2>

              {data.sender && (
                <div className="bg-[#008080]/10 p-3 rounded border border-[#008080]/20">
                  <div className="flex items-center text-[#008080] mb-1">
                    <FiUser className="mr-2" />
                    <span className="font-medium">Sender</span>
                  </div>
                  <p className="break-words max-w-full whitespace-pre-wrap">
                    {data.sender}
                  </p>
                </div>
              )}

              {data.message && (
                <div className="bg-[#008080]/10 p-3 rounded border border-[#008080]/20">
                  <div className="flex items-center text-[#008080] mb-1">
                    <FiMessageSquare className="mr-2" />
                    <span className="font-medium">Message</span>
                  </div>
                  <p className="break-words max-w-full whitespace-pre-wrap">
                    {data.message}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center text-gray-400">
              <FiMessageSquare className="text-4xl mb-4 text-[#008080]" />
              <h3 className="text-lg font-medium">Text Message Preview</h3>
              <p className="mt-2">No message data found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TextMessagePreview;
