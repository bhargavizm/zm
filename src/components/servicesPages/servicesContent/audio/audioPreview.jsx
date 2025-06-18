// "use client";
// import React from "react";

// import useServicesContext from "@/components/hooks/useServiceContext";

// const AudioPreview = () => {
//   const { titleFormData } = useServicesContext();

//   const { title, description, file, password } = titleFormData || {};

//   const fileName = file ? file.name : "No file selected";

//   return (
//     <>
//       <div className="flex justify-center items-start">
//         <div className="w-[320px] h-[570px] border-4 border-[#001a1a] rounded-3xl p-4 shadow-2xl bg-white flex flex-col items-center space-y-3">
//           <div className="w-full mb-3 text-center">
//             <p className="text-xs text-gray-500 font-medium mb-1">Title</p>
//             <p className="text-sm text-gray-800 font-semibold">{title || ""}</p>
//           </div>

//           <div className="w-full mb-3 text-center">
//             <p className="text-xs text-gray-500 font-medium mb-1">
//               Description
//             </p>
//             <p className="text-sm text-gray-700 whitespace-pre-wrap">
//               {description || ""}
//             </p>
//           </div>

//           <div className="w-full mb-3 text-center">
//             <p className="text-xs text-gray-500 font-medium mb-1">Audio File</p>
//             <p className="text-teal-600 text-base">🎧 {fileName}</p>
//           </div>

//           <div className="w-full mb-3 text-center">
//             <p className="text-xs text-gray-500 font-medium mb-1">Password</p>
//             <p className="text-gray-700">{password ? "••••••••" : "Not set"}</p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AudioPreview;

"use client";
import React from "react";
import useServicesContext from "@/components/hooks/useServiceContext";
import useDesignContext from "@/components/hooks/useDesignContext";

const AudioPreview = () => {
  const { audioFormData } = useServicesContext();
  const { bgDesign } = useDesignContext();
  const { title, description, file, password } = audioFormData || {};
  const fileName = file ? file.name : "No file selected";

  const isVideo = bgDesign?.endsWith(".mp4");
  const isImage = bgDesign && !isVideo;

  return (
    <div className="flex justify-center items-center w-full">
      <div className="relative w-[350px] h-[550px] border-4 border-[#001a1a] rounded-3xl shadow-2xl overflow-hidden">
        {/* Background */}
        {isImage ? (
          <img
            src={bgDesign}
            alt="Selected Background"
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
          />
        ) : isVideo ? (
          <video
            src={bgDesign}
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
          />
        ) : (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
          >
            <source src="/services-service/audio.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}

        {/* Foreground Content */}
        <div className="relative z-10 w-full h-full px-4 py-6 text-white text-center bg-black/30 overflow-hidden">
          <div className="flex flex-col gap-4 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent pr-1">
            {/* Title */}
            <div className="break-words">
              <p className="text-xs font-semibold">Title</p>
              <p className="text-sm font-bold break-words">{title || ""}</p>
            </div>

            {/* Description */}
            <div className="break-words">
              <p className="text-xs font-semibold">Description</p>
              <p className="text-sm font-medium whitespace-pre-wrap break-words">
                {description || ""}
              </p>
            </div>

            {/* Audio File */}
            <div>
              <p className="text-xs font-semibold">Audio File</p>
              <p className="text-teal-200 text-base truncate">🎧 {fileName}</p>
            </div>

            {/* Password */}
            <div>
              <p className="text-xs font-semibold">Password</p>
              <p className="text-white">{password ? "••••••••" : "Not set"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPreview;

