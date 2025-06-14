// "use client";
// import React from "react"; // React is not strictly needed for this file, but good practice
// import Image from "next/image"; // Not used in AudioPreview, but keeping consistent with BusinessPreview

// import useServicesContext from "@/components/hooks/useServiceContext";

// const VedioPreview = () => {
//   const { titleFormData } = useServicesContext();

//   const { title, description, file, password } = titleFormData || {};

//   const fileName = file ? file.name : "No file selected";

//   return (
//     <>
//       <div className="flex justify-center items-start">
//         <div className="w-[320px] h-[570px] border-4 border-[#001a1a] rounded-3xl p-4 shadow-2xl bg-white flex flex-col items-center space-y-3">
//           <div>
//             <Image
//               src="/services-service/video.jpg"
//               width={100}
//               height={100}
//               alt="Video"
//             />
//           </div>
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
//             <p className="text-xs text-gray-500 font-medium mb-1">Vedio File</p>
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

// export default VedioPreview;

"use client";
import React from "react";
import Image from "next/image";
import useServicesContext from "@/components/hooks/useServiceContext";

const VideoPreview = () => {
  const { titleFormData } = useServicesContext();
  const { title, description, file, password } = titleFormData || {};
  const fileName = file ? file.name : "No file selected";

  return (
    <div className="flex justify-center items-center w-full">
      <div className="relative w-[320px] h-[550px] border-4 border-[#001a1a] rounded-3xl shadow-2xl overflow-hidden">
        {/* 🖼️ Background Image */}
        <Image
          src="/services-service/video.jpg"
          alt="Video Preview Background"
          fill
          className="object-cover z-0"
        />

        {/* 🔳 Overlay to improve text readability */}
        <div className="absolute inset-0 bg-black/50 z-10" />

        {/* 📝 Foreground content */}
        <div className="relative z-20 w-full h-full p-4 flex flex-col items-center justify-center space-y-4 text-white text-center">
          <div>
            <p className="text-xs font-semibold text-white/80">Title</p>
            <p className="text-sm font-bold">{title || ""}</p>
          </div>

          <div>
            <p className="text-xs font-semibold text-white/80">Description</p>
            <p className="text-sm font-medium whitespace-pre-wrap">
              {description || ""}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold text-white/80">Video File</p>
            <p className="text-teal-200 text-base">🎞️ {fileName}</p>
          </div>

          <div>
            <p className="text-xs font-semibold text-white/80">Password</p>
            <p>{password ? "••••••••" : "Not set"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPreview;
