import Image from "next/image";
import React from "react";
import { bodyFrames, eyeBalls, eyeFrames } from "./shapeImages";

const Shapes = ({ onSelectImage }) => {

  return (
    <section>
      
 <h4 className="text-2xl font-bold text-darkGreen mb-4">Body Frames</h4>
        <div className="flex gap-6 flex-wrap">
                {bodyFrames.map((src, index) => (
                  <Image
                    key={index}
                    src={src}
                    alt={`Logo ${index + 1}`}
                    width={30}
                    height={30}
                    className="cursor-pointer hover:scale-110 transition-transform"
                    onClick={() => onSelectImage(src)}
                    priority
                  />
                ))}
              </div>

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
