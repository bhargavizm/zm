import Image from "next/image";
import React from "react";

const Shapes = ({ onSelectImage }) => {
  const bodyFrames = [
    "/images/shapes/body-frames/body-frame-1.jpg",
    "/images/shapes/body-frames/body-frame-2.jpg",
    "/images/shapes/body-frames/body-frame-3.jpg",
    "/images/shapes/body-frames/body-frame-4.jpg",
    "/images/shapes/body-frames/body-frame-5.jpg",
  ];
  const eyeFrames = [
    "/images/shapes/eye-frames/eye-frame-1.svg",
    "/images/shapes/eye-frames/eye-frame-2.svg",
    "/images/shapes/eye-frames/eye-frame-3.svg",
    "/images/shapes/eye-frames/eye-frame-4.svg",
    "/images/shapes/eye-frames/eye-frame-5.svg",
  ];
  const eyeBalls = [
    "/images/shapes/eye-balls/eye-ball-1.svg",
    "/images/shapes/eye-balls/eye-ball-2.svg",
    "/images/shapes/eye-balls/eye-ball-3.svg",
    "/images/shapes/eye-balls/eye-ball-4.svg",
    "/images/shapes/eye-balls/eye-ball-5.svg",
  ];
  return (
    <section>
      {/* 
 <h4 className="text-2xl font-bold text-darkGreen mb-4">Body Frames</h4>
        <div className="flex gap-4 flex-wrap">
                {bodyFrames.map((src, index) => (
                  <Image
                    key={index}
                    src={src}
                    alt={`Logo ${index + 1}`}
                    width={10}
                    height={10}
                    className="cursor-pointer hover:scale-110 transition-transform"
                    onClick={() => onSelectImage(src)}
                    priority
                  />
                ))}
              </div> */}

      <h4 className="text-2xl font-bold text-darkGreen mb-4">Eye Frames</h4>
      <div className="flex gap-4 flex-wrap">
        {eyeFrames.map((src, index) => (
          <Image
            key={index}
            src={src}
            alt={`Logo ${index + 1}`}
            width={30}
            height={30}
            className="cursor-pointer hover:scale-110 transition-transform"
            //onClick={() => onSelectImage(src)}
            priority
          />
        ))}
      </div>

      <h4 className="text-2xl font-bold text-darkGreen my-6 pt-6">
        Eye Ball Frames
      </h4>
      <div className="flex gap-4 flex-wrap">
        {eyeBalls.map((src, index) => (
          <Image
            key={index}
            src={src}
            alt={`Logo ${index + 1}`}
            width={30}
            height={30}
            className="cursor-pointer hover:scale-110 transition-transform"
            //onClick={() => onSelectImage(src)}
            priority
          />
        ))}
      </div>
    </section>
  );
};

export default Shapes;
