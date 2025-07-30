"use client";
import React, { useEffect, useState } from "react";
import { FiFileText, FiLink } from "react-icons/fi";
import useServicesContext from "@/components/hooks/useServiceContext";
import BgDesignRenderer from "./bgDesignRender";

const ResumePreview = ({ data }) => {
  const { resumeFormData } = useServicesContext();
  const defaultBg = "/services-service/resume.webp";
  const [bgDesign, setBgDesign] = useState(defaultBg);

  const resumeFiles = data?.resumeFiles || resumeFormData?.resumeFiles || [];
  const resumeUrl = data?.resumeUrl || resumeFormData?.resumeUrl || "";

  useEffect(() => {
    setBgDesign(data?.bgDesign || defaultBg);
  }, [data]);

  const hasData = (resumeFiles && resumeFiles.length > 0) || resumeUrl;

  return (
    <div className="w-full px-6">
      <div>
        <BgDesignRenderer bgDesign={bgDesign} defaultBg={defaultBg} />
        <div className="relative flex-1 bg-white/70 m-2 rounded-xl overflow-y-auto pt-6 pb-3 px-3 z-20 max-h-full">
          {hasData ? (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-center text-[#004d4d]">Resume Preview</h2>

              {resumeFiles.length > 0 && (
                <div className="bg-[#004d4d]/10 p-3 rounded border border-[#004d4d]/20">
                  <div className="flex items-center text-[#004d4d] mb-1">
                    <FiFileText className="mr-2" />
                    <span className="font-medium">Uploaded Files</span>
                  </div>
                  <ul className="text-sm space-y-1">
                    {resumeFiles.map((file, index) => {
                      const fileName = file?.fileName || "Resume";
                      const fileUrl = `/uploads/resumes/${fileName}`;

                      return (
                        <li key={index}>
                          <button
                            type="button"
                            onClick={() => window.open(fileUrl, "_blank")}
                            className="text-blue-600 underline break-words"
                          >
                            📄 {fileName}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

              {resumeUrl && (
                <div className="bg-[#004d4d]/10 p-3 rounded border border-[#004d4d]/20">
                  <div className="flex items-center text-[#004d4d] mb-1">
                    <FiLink className="mr-2" />
                    <span className="font-medium">Resume URL</span>
                  </div>
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 text-sm underline break-words"
                  >
                    🔗 {resumeUrl}
                  </a>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center text-gray-400">
              <FiFileText className="text-4xl mb-4 text-[#004d4d]" />
              <h3 className="text-lg font-medium">Resume Preview</h3>
              <p className="mt-2">No resume data available.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
