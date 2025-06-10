"use client";
import React from "react";
import useServicesContext from "@/components/hooks/useServiceContext";

const ResumePreview = () => {
  const { resumeFormData } = useServicesContext();

  // Corrected destructuring: using properties from resumeFormData
  // Make sure to match the property names in your resumeFormData state object
  const { title, description, resumeFile, resumeUrl, password } =
    resumeFormData || {};

  return (
    <>
      <div className="flex justify-center items-start">
        {/* Outer container for centering */}
        <div className="w-[320px] h-[570px] border-4 border-[#001a1a] rounded-3xl p-4 shadow-2xl bg-white flex flex-col items-center space-y-3">
          {/* Re-integrated iPhone Preview structure */}
          <div>
            <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-16 h-1.5 bg-gray-400 rounded-full"></div>
            <div className="absolute top-3 left-[calc(50%-28px)] w-14 h-3 bg-gray-200 rounded-xl z-10"></div>
            <div className="bg-white h-full w-full rounded-[1.8rem] p-4 overflow-y-auto no-scrollbar flex flex-col items-center text-center">
              <h2 className="text-base font-bold text-gray-800 mb-2">
                📱 Live Preview
              </h2>

              {/* Display Title if present */}
              {title && ( // Using 'title' directly
                <div className="w-full mb-3">
                  <p className="text-xs font-medium text-gray-500 mb-1">
                    Title
                  </p>
                  <p className="text-sm font-semibold text-gray-800">{title}</p>
                </div>
              )}

              {/* Display Description if present */}
              {description && ( // Using 'description' directly
                <div className="w-full mb-3">
                  <p className="text-xs font-medium text-gray-500 mb-1">
                    Description
                  </p>
                  <p className="text-sm whitespace-pre-wrap text-gray-700">
                    {description}
                  </p>
                </div>
              )}

              {/* Display Uploaded Resume info if a file is selected */}
              {resumeFile && ( // Using 'resumeFile'
                <div className="w-full mb-3">
                  <p className="text-xs font-medium text-gray-500 mb-1">
                    Uploaded Resume
                  </p>
                  <p className="text-sm text-blue-700 underline break-all">
                    📄 {resumeFile.name}{" "}
                    {/* Accessing name property of resumeFile */}
                  </p>
                  {/* For PDF/Doc, direct preview can be tricky. A common approach is a link or a dedicated PDF viewer.
                      You can use an <embed> tag for PDF preview, but it might not work consistently across all browsers
                      or for .doc/.docx files. Consider linking to the file instead.
                      <embed src={URL.createObjectURL(resumeFile)} type="application/pdf" width="100%" height="200px" />
                  */}
                </div>
              )}

              {/* Display Resume URL if entered */}
              {resumeUrl && ( // Using 'resumeUrl'
                <div className="w-full mb-3">
                  <p className="text-xs font-medium text-gray-500 mb-1">
                    Resume URL
                  </p>
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 underline break-all"
                  >
                    🔗 {resumeUrl}
                  </a>
                </div>
              )}

              {/* Display Password info if entered */}
              {password && ( // Using 'password'
                <div className="w-full mb-3">
                  <p className="text-xs font-medium text-gray-500 mb-1">
                    Password
                  </p>
                  <p className="text-gray-700">••••••••</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResumePreview;
