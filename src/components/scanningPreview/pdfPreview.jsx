"use client";

import React, { useEffect } from "react";
import useDesignContext from "@/components/hooks/useDesignContext";
import BgDesignRenderer from "./bgDesignRender";

const PdfPreview = ({ data = {} }) => {
  const { setBgDesign } = useDesignContext();

  const title = data?.title || "";
  const description = data?.description || "";
  const files = Array.isArray(data?.files) ? data.files : [];

  const defaultBg = "/services-service/pdf.webp";

  useEffect(() => {
    setBgDesign(data?.bgDesign || defaultBg);
  }, [data?.bgDesign]);

  return (
    <>
      {/* 🌄 Background */}
      <div className="absolute inset-0 z-0">
        <BgDesignRenderer bgDesign={data?.bgDesign} defaultBg={defaultBg} />
      </div>

      {/* 📄 Foreground */}
      <div className="relative z-20 w-full mx-auto p-4">
        <div className="bg-white/70 p-6 rounded-[28px] shadow-lg space-y-4">
          {title && (
            <div className="flex gap-4">
              <p className="text-xl font-semibold">Title:</p>
              <p className="text-xl font-bold">{title}</p>
            </div>
          )}

          {description && (
            <div className="flex gap-4">
              <p className="text-xl font-semibold">Description:</p>
              <p className="text-xl font-medium whitespace-pre-wrap">
                {description}
              </p>
            </div>
          )}

          <div className="w-full">
            <p className="text-lg font-semibold mb-1">PDF Files:</p>
            <div className="flex flex-col gap-1">
              {files.length > 0 ? (
                files.map((f, idx) => {
                  const fileName = f?.fileName || `File ${idx + 1}`;
                  const fileUrl = f?.localPath?.startsWith("/")
                    ? `${process.env.NEXT_PUBLIC_BASE_URL || ""}${f.localPath}`
                    : f?.localPath;

                  return (
                    <a
                      key={idx}
                      href={fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg pb-4 underline text-blue-800 hover:text-blue-600 transition"
                    >
                      📄 {fileName}
                    </a>
                  );
                })
              ) : (
                <p className="text-sm text-gray-500">No files uploaded</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PdfPreview;
