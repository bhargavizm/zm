"use client";
import React from "react";

import useServicesContext from "@/components/hooks/useServiceContext";

const AudioPreview = () => {
  const { titleFormData } = useServicesContext();

  const { title, description, file, password } = titleFormData || {};

  const fileName = file ? file.name : "No file selected";

  return (
    <>
      <div className="flex justify-center items-start">
        <div className="w-[320px] h-[570px] border-4 border-[#001a1a] rounded-3xl p-4 shadow-2xl bg-white flex flex-col items-center space-y-3">
          <div className="w-full mb-3 text-center">
            <p className="text-xs text-gray-500 font-medium mb-1">Title</p>
            <p className="text-sm text-gray-800 font-semibold">{title || ""}</p>
          </div>

          <div className="w-full mb-3 text-center">
            <p className="text-xs text-gray-500 font-medium mb-1">
              Description
            </p>
            <p className="text-sm text-gray-700 whitespace-pre-wrap">
              {description || ""}
            </p>
          </div>

          <div className="w-full mb-3 text-center">
            <p className="text-xs text-gray-500 font-medium mb-1">Audio File</p>
            <p className="text-teal-600 text-base">🎧 {fileName}</p>
          </div>

          <div className="w-full mb-3 text-center">
            <p className="text-xs text-gray-500 font-medium mb-1">Password</p>
            <p className="text-gray-700">{password ? "••••••••" : "Not set"}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AudioPreview;
