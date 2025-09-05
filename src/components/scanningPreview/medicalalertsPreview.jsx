"use client";

import React, { useEffect } from "react";
import { FiLock } from "react-icons/fi";
import useDesignContext from "@/components/hooks/useDesignContext";
import BgDesignRenderer from "./bgDesignRender";

const formatLabel = (key) =>
  key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());

const MedicalAlertPreview = ({ data }) => {
  const defaultBg = "/services-service/medical-alert.webp";
  const { bgDesign, setBgDesign } = useDesignContext();
  const excludedSections = ["user", "userId", "status", "qrCodeDetails", "priceDetails"];

  useEffect(() => {
    setBgDesign(data?.bgDesign || defaultBg);
  }, [data, setBgDesign]);

  const hasData =
    data &&
    Object.entries(data).some(([key, value]) => {
      if (excludedSections.includes(key)) return false;
      if (typeof value === "string") return value.trim() !== "";
      if (typeof value === "object" && value !== null) {
        return Object.values(value).some((val) =>
          typeof val === "string"
            ? val.trim() !== ""
            : val && typeof val === "object"
            ? Object.keys(val).length > 0
            : !!val
        );
      }
      return !!value;
    });

  if (!hasData) {
    return (
      <div className="w-full px-6">
        <BgDesignRenderer bgDesign={defaultBg} defaultBg={defaultBg} />
        <div className="relative flex-1 w-full bg-white/70 m-2 rounded-xl p-6 text-center text-gray-400">
          <FiLock className="text-4xl mb-4 text-[#004d4d] mx-auto" />
          <h3 className="text-lg font-medium">Medical Alert Preview</h3>
          <p className="mt-2">Fill the form to see the preview</p>
        </div>
      </div>
    );
  }

  // ✅ Download handler for cross-origin files
  const handleDownload = async (fileUrl, fileName) => {
    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName || "file");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed:", err);
    }
  };

  // ✅ File Renderer (Cloudinary + download)
  const renderFile = (file) => {
    const fileUrl = file.url;
    const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(fileUrl);
    const isPdf = /\.pdf$/i.test(fileUrl);

    return (
      <div key={file._id || file.name} className="flex flex-col items-center">
        {isImage && (
          <img
            src={fileUrl}
            alt={file.name}
            className="w-24 h-24 object-cover rounded border"
          />
        )}
        {isPdf && (
          <p className="text-gray-700 text-sm break-words">📄 {file.name}</p>
        )}
        <button
          onClick={() => handleDownload(fileUrl, file.name)}
          className="mt-2 px-3 py-1 bg-[#004d4d] text-white rounded hover:bg-[#006666] transition"
        >
          {isPdf ? "Download PDF" : "Download"}
        </button>
      </div>
    );
  };

  // ✅ Render Fields
  const renderFields = (sectionValue) => {
    return Object.entries(sectionValue)
      .filter(([_, val]) => {
        if (typeof val === "string") return val.trim() !== "";
        if (Array.isArray(val) && val.length === 0) return false;
        if (typeof val === "object" && val !== null) {
          return Object.values(val).some((v) => v && v.toString().trim() !== "");
        }
        return !!val;
      })
      .map(([fieldKey, fieldValue]) => {
        // File arrays with Cloudinary {url, name}
        if (Array.isArray(fieldValue) && fieldValue.length > 0 && fieldValue[0]?.url) {
          return (
            <div key={fieldKey} className="mb-4 flex flex-wrap gap-4">
              <strong className="w-full mb-2">{formatLabel(fieldKey)}:</strong>
              {fieldValue.map((file) => renderFile(file))}
            </div>
          );
        }

        // Location object
        if (
          typeof fieldValue === "object" &&
          fieldValue !== null &&
          "latitude" in fieldValue &&
          "longitude" in fieldValue
        ) {
          return (
            <div key={fieldKey} className="mb-2">
              <strong>{formatLabel(fieldKey)}:</strong>
              <div className="pl-4 mt-1 text-gray-700">
                <p>Latitude: {fieldValue.latitude ?? "N/A"}</p>
                <p>Longitude: {fieldValue.longitude ?? "N/A"}</p>
                <p>
                  Address:{" "}
                  {fieldValue.address ? (
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        fieldValue.address
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-blue-600 hover:text-blue-800"
                    >
                      {fieldValue.address}
                    </a>
                  ) : (
                    "N/A"
                  )}
                </p>
              </div>
            </div>
          );
        }

        // Nested object fallback
        if (typeof fieldValue === "object" && fieldValue !== null) {
          return (
            <div key={fieldKey} className="mb-2">
              <strong>{formatLabel(fieldKey)}:</strong>{" "}
              <span className="text-gray-600">[object details hidden]</span>
            </div>
          );
        }

        // Primitive values
        return (
          <p key={fieldKey} className="mb-2">
            <strong>{formatLabel(fieldKey)}:</strong> {fieldValue}
          </p>
        );
      });
  };

  return (
    <div className="w-full px-6">
      <BgDesignRenderer bgDesign={bgDesign} defaultBg={defaultBg} />
      <div className="relative flex-1 w-full bg-white/70 m-2 rounded-xl p-6">
        <h2 className="text-xl font-bold text-center text-[#004d4d] mb-6">
          Medical Alert Preview
        </h2>

        {Object.entries(data).map(([sectionKey, sectionValue]) => {
          if (excludedSections.includes(sectionKey)) return null;

          // Root-level file array with Cloudinary {url, name}
          if (Array.isArray(sectionValue) && sectionValue.length > 0 && sectionValue[0]?.url) {
            return (
              <section
                key={sectionKey}
                className="mb-6 p-4 bg-[#004d4d]/10 rounded border border-[#004d4d]/30 flex flex-wrap gap-2"
              >
                <h3 className="text-[#004d4d] font-semibold mb-3 w-full capitalize">
                  {formatLabel(sectionKey)}
                </h3>
                {sectionValue.map((file) => renderFile(file))}
              </section>
            );
          }

          // Nested object
          if (typeof sectionValue === "object" && sectionValue !== null) {
            const filledFields = Object.entries(sectionValue).filter(([_, val]) => {
              if (typeof val === "string") return val.trim() !== "";
              if (typeof val === "object" && val !== null) {
                return Object.values(val).some((v) => v && v.toString().trim() !== "");
              }
              return !!val;
            });

            if (filledFields.length === 0) return null;

            return (
              <section
                key={sectionKey}
                className="mb-6 p-4 bg-[#004d4d]/10 rounded border border-[#004d4d]/30"
              >
                <h3 className="text-[#004d4d] font-semibold mb-3 capitalize">
                  {formatLabel(sectionKey)}
                </h3>
                {renderFields(sectionValue)}
              </section>
            );
          }

          return null;
        })}
      </div>
    </div>
  );
};

export default MedicalAlertPreview;
