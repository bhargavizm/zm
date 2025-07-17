

"use client";

import useDesignContext from "@/components/hooks/useDesignContext";
import React from "react";
import { bodyFrames, eyeballFrames, eyeFrames } from "./qrFrameImages";


const QRFrames = () => {
  const {
    selectedBodyFrame,
    setSelectedBodyFrame,
    selectedEyeFrame,
    setSelectedEyeFrame,
    selectedEyeBall,
    setSelectedEyeBall,
  } = useDesignContext();

  return (
    <section className="mt-4 px-4">
      {/* 🟢 Body Frames */}
      <h4 className="text-2xl font-bold text-mainGreen mb-4">Body Frames</h4>
      <div className="flex gap-4 flex-wrap">
        {Object.keys(bodyFrames).map((shape) => (
          <div
            key={shape} 
            onClick={() => setSelectedBodyFrame(shape)}
            className={`border rounded p-1 cursor-pointer ${
              selectedBodyFrame === shape
                ? "border-mainGreen ring-2 ring-mainGreen"
                : "border-gray-300"
            }`}
          >
            <svg width="40" height="40" viewBox="-8 -8 16 16">
              <path d={bodyFrames[shape]} fill="#000" />
            </svg>
            {/* <p className="text-xs text-center">{shape}</p> */}
          </div>
        ))}
      </div>

      {/* 🟢 Eye Frames */}
      <h4 className="text-2xl font-bold text-mainGreen my-6">Eye Frames</h4>
      <div className="flex gap-4 flex-wrap">
        {Object.keys(eyeFrames).map((style) => (
          <div
            key={style}
            onClick={() => setSelectedEyeFrame(style)}
            className={`border rounded p-1 cursor-pointer ${
              selectedEyeFrame === style
                ? "border-mainGreen ring-2 ring-mainGreen"
                : "border-gray-300"
            }`}
          >
            <svg width="40" height="40">
              {eyeFrames[style](5, 5, 30, "#000")}
            </svg>
            {/* <p className="text-xs text-center">{style}</p> */}
          </div>
        ))}
      </div>

      {/* 🟢 Eyeball Shapes */}
      <h4 className="text-2xl font-bold text-mainGreen my-6 pt-4">
        Eye Ball Frames
      </h4>
      <div className="flex gap-4 flex-wrap">
        {Object.keys(eyeballFrames).map((shape) => (
          <div
            key={shape}
            onClick={() => setSelectedEyeBall(shape)}
            className={`border rounded p-1 cursor-pointer ${
              selectedEyeBall === shape
                ? "border-mainGreen ring-2 ring-mainGreen"
                : "border-gray-300"
            }`}
          >
            <svg width="40" height="40">
              {eyeballFrames[shape](5, 5, 30, "#000")}
            </svg>
            {/* <p className="text-xs text-center">{shape}</p> */}
          </div>
        ))}
      </div>
    </section>
  );
};

export default QRFrames;



// import Image from "next/image";
// import React from "react";
// import { bodyFrames, eyeBalls, eyeFrames } from "./qrFrameImages";
// import useDesignContext from "@/components/hooks/useDesignContext";

// const QRFrames = ({ onSelectImage }) => {
// const {selectedBodyFrame,
//   setSelectedBodyFrame,
//   selectedEyeFrame,
//   setSelectedEyeFrame,
//   selectedEyeBall,
//   setSelectedEyeBall,} = useDesignContext()

//   return (
//     <section className="mt-4 px-4">
      
//  <h4 className="text-2xl font-bold text-mainGreen mb-4">Body Frames</h4>
//         <div className="flex gap-6 flex-wrap">
//                 {bodyFrames.map((src, index) => (
//                   <Image
//                     key={index}
//                     src={src}
//                     alt={`Logo ${index + 1}`}
//                     width={30}
//                     height={30}
//                     className="cursor-pointer hover:scale-110 transition-transform"
//                     //onClick={() => onSelectImage(src)}
//                     priority
//                   />
//                 ))}
//               </div>

//       <h4 className="text-2xl font-bold text-mainGreen my-6">Eye Frames</h4>
//       <div className="flex gap-4 flex-wrap">
//         {eyeFrames.map((src, index) => (
//           <Image
//             key={index}
//             src={src}
//             alt={`Logo ${index + 1}`}
//             width={35}
//             height={35}
//              className={`relative aspect-square flex items-center justify-center rounded-xl border-4 cursor-pointer transition-transform duration-200 ${
//                 selectedEyeFrame === src
//                   ? "border-mainGreen scale-105 shadow-md"
//                   : "border-transparent hover:border-gray-300"
//               }`}
//             onClick={() => setSelectedEyeFrame(src)}
//             priority
//           />
//         ))}
//       </div>

//       <h4 className="text-2xl font-bold text-mainGreen my-6 pt-4">
//         Eye Ball Frames
//       </h4>
//       <div className="flex gap-4 flex-wrap">
//         {eyeBalls.map((src, index) => (
//           <Image
//             key={index}
//             src={src}
//             alt={`Logo ${index + 1}`}
//             width={35}
//             height={35}
//              className={`relative aspect-square flex items-center justify-center rounded-xl border-4 cursor-pointer transition-transform duration-200 ${
//                 selectedEyeBall === src
//                   ? "border-mainGreen scale-105 shadow-md"
//                   : "border-transparent hover:border-gray-300"
//               }`}
//             onClick={() => setSelectedEyeBall(src)}
//             priority
//           />
//         ))}
//       </div>
//     </section>
//   );
// };

// export default QRFrames;
