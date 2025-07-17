// // utils/generateNoiseElements.js
// "use client";
// import useDesignContext from "@/components/hooks/useDesignContext";
// import React from "react";
// // import useDesignContext from "@/hooks/useDesignContext";
//  //import { heartModulePath } from "@/components/shapes/qrShapes";

// export const useGenerateNoiseElements = ({
//   qrX,
//   qrY,
//   qrWidth,
//   qrHeight,
//   // moduleShape,
//   selectedBodyFrame,
//   moduleShapes,
//   selectedQRShape,
//   fgColor,
//   colorMode,
// }) => {
//   const { fullSize, noiseDensity, canvasSize } = useDesignContext();

//   return () => {
//     const elements = [];
//     const numElements = Math.floor(fullSize * fullSize * noiseDensity);
//     const modulePath = moduleShapes[moduleShape] 
//     // || heartModulePath;

//     const qrLeft = qrX;
//     const qrRight = qrX + qrWidth;
//     const qrTop = qrY;
//     const qrBottom = qrY + qrHeight;

//     const getRandomPointOutsideQR = () => {
//       const margin = canvasSize * 0.002;
//       let x, y;
//       let attempts = 0;

//       do {
//         if (++attempts > 100) {
//           x = Math.random() * canvasSize;
//           y = Math.random() * canvasSize;
//           break;
//         }

//         // random within container shape
//         switch (selectedQRShape) {
//           case "circle": {
//             const angle = Math.random() * 2 * Math.PI;
//             const radius = Math.random() * (canvasSize / 2);
//             x = canvasSize / 2 + radius * Math.cos(angle);
//             y = canvasSize / 2 + radius * Math.sin(angle);
//             break;
//           }
//           case "heart":
//             x = canvasSize / 2 - canvasSize * 0.4 + Math.random() * canvasSize * 0.8;
//             y = canvasSize / 2 - canvasSize * 0.3 + Math.random() * canvasSize * 0.6;
//             break;
//           default:
//             x = Math.random() * canvasSize;
//             y = Math.random() * canvasSize;
//         }

//         if (x < qrLeft || x > qrRight || y < qrTop || y > qrBottom) break;
//         x = y = null;
//       } while (x === null || y === null);

//       return { x, y };
//     };

//     for (let i = 0; i < numElements; i++) {
//       const { x, y } = getRandomPointOutsideQR();
//       const size = 0.8 + Math.random() * 0.4;
//       const rotation = Math.random() * 360;
//       elements.push(
//         <path
//           key={`noise-${i}`}
//           d={modulePath}
//           transform={`translate(${x}, ${y}) scale(${size}) rotate(${rotation})`}
//           fill={colorMode === "gradient" ? "url(#qrGradient)" : fgColor}
//           opacity={0.8 + Math.random() * 0.2}
//         />
//       );
//     }

//     return elements;
//   };
// };


"use client";
import useDesignContext from "@/components/hooks/useDesignContext";
import React from "react";
import { bodyFrames } from "../designTabs/qrFrames/qrFrameImages";

export const useGenerateNoiseElements = ({
  qrX,
  qrY,
  qrWidth,
  qrHeight,
  selectedBodyFrame, // used instead of moduleShape
  moduleShapes,
  selectedQRShape,
  fgColor,
  colorMode,
}) => {
  const { fullSize, noiseDensity, canvasSize } = useDesignContext();

  return () => {
    const elements = [];
console.log('noise,', selectedBodyFrame)
    const modulePath = bodyFrames?.[selectedBodyFrame];
    if (!modulePath) {
      console.warn(
        `⚠️ moduleShapes["${selectedBodyFrame}"] is undefined. Falling back to empty noise elements.`
      );
      return elements; // empty array to avoid crashing
    }

    const numElements = Math.floor(fullSize * fullSize * noiseDensity);

    const qrLeft = qrX;
    const qrRight = qrX + qrWidth;
    const qrTop = qrY;
    const qrBottom = qrY + qrHeight;

    const getRandomPointOutsideQR = () => {
      const margin = canvasSize * 0.002;
      let x, y;
      let attempts = 0;

      do {
        if (++attempts > 100) {
          x = Math.random() * canvasSize;
          y = Math.random() * canvasSize;
          break;
        }

        switch (selectedQRShape) {
          case "circle": {
            const angle = Math.random() * 2 * Math.PI;
            const radius = Math.random() * (canvasSize / 2);
            x = canvasSize / 2 + radius * Math.cos(angle);
            y = canvasSize / 2 + radius * Math.sin(angle);
            break;
          }
          case "heart":
            x = canvasSize / 2 - canvasSize * 0.4 + Math.random() * canvasSize * 0.8;
            y = canvasSize / 2 - canvasSize * 0.3 + Math.random() * canvasSize * 0.6;
            break;
          default:
            x = Math.random() * canvasSize;
            y = Math.random() * canvasSize;
        }

        if (x < qrLeft || x > qrRight || y < qrTop || y > qrBottom) break;
        x = y = null;
      } while (x === null || y === null);

      return { x, y };
    };

    for (let i = 0; i < numElements; i++) {
      const { x, y } = getRandomPointOutsideQR();
      const size = 0.8 + Math.random() * 0.4;
      const rotation = Math.random() * 360;

      elements.push(
        <path
          key={`noise-${i}`}
          d={modulePath}
          transform={`translate(${x}, ${y}) scale(${size}) rotate(${rotation})`}
          fill={colorMode === "gradient" ? "url(#qrGradient)" : fgColor}
          opacity={0.8 + Math.random() * 0.2}
        />
      );
    }

    return elements;
  };
};
