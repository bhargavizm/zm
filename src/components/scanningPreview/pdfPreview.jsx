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

  useEffect(() => { setBgDesign(data?.bgDesign || defaultBg); }, [data?.bgDesign, setBgDesign]);

  const handleDownload = async (fileUrl, fileName) => {
    if (!fileUrl) return;
    try {
      const response = await fetch(fileUrl, { mode: "cors" });
      if (!response.ok) { console.error("File not found:", fileUrl); return; }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;

      // Force proper download filename
      link.download = fileName.toLowerCase().endsWith(".pdf") ? fileName : `${fileName}.pdf`;

      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) { console.error("Download failed:", error); }
  };

  return (
    <div className="relative z-20 w-full mx-auto p-4">
      <BgDesignRenderer bgDesign={data?.bgDesign} defaultBg={defaultBg} />
      <div className="bg-white/70 p-6 rounded-[28px] shadow-lg space-y-4">
        {title && <div className="flex gap-4"><p className="text-xl font-semibold">Title:</p><p className="text-xl font-bold">{title}</p></div>}
        {description && <div className="flex gap-4"><p className="text-xl font-semibold">Description:</p><p className="text-xl font-medium whitespace-pre-wrap">{description}</p></div>}
        <div className="w-full">
          <p className="text-lg font-semibold mb-1">PDF Files:</p>
          <div className="flex flex-col gap-2">
            {files.length > 0 ? files.map((f, idx) => {
              const fileUrl = f?.url;
              const fileName = f?.name || `File-${idx + 1}`;
              if (!fileUrl) return null;
              return (
                <div key={idx} className="flex items-center justify-between gap-4 bg-[#f0f0f0] p-2 rounded">
                  <p className="text-lg break-all">📄 {fileName}.pdf</p>
                  <button onClick={() => handleDownload(fileUrl, fileName)} className="px-3 py-1 bg-[#004d4d] text-white rounded hover:bg-[#006666] transition">Download</button>
                </div>
              );
            }) : <p className="text-sm text-gray-500">No files uploaded</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PdfPreview;
