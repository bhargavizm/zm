// import Image from 'next/image';
// import React from 'react'
// import { stickers } from './stickerImages';

// const Stickers = ({ onSelectImage }) => {

//   return (

//         <section className="mt-6">
//              <div className="grid lg:grid-cols-8 md:grid-cols-6 sm:grid-cols-4 grid-cols-3 gap-6 h-[70vh] overflow-y-auto scrollbar-hide" >
//                {stickers.map((src, index) => (
//                  <Image
//                    key={index}
//                    src={src}
//                    alt={`qr shape ${index + 1}`}
//                    width={60}
//                    height={60}
//                    className="cursor-pointer hover:scale-110 transition-transform"
//                    onClick={() => onSelectImage(src)}
//                    priority
//                  />
//                ))}
//              </div>
       
       
//            </section>
 
//   )
// }

<<<<<<< HEAD
export default Stickers
=======
// export default Stickers
>>>>>>> d012277da28460bcbff7e6d4fb874d1c6f390f6d

import Image from "next/image";
import React from "react";
import { stickerConfig } from "./stickerImages";


const Stickers = ({ onSelectImage }) => (
  <section className="mt-6">
    <div className="grid lg:grid-cols-7 md:grid-cols-6 sm:grid-cols-4 grid-cols-3 gap-8 h-[65vh] overflow-y-auto scrollbar-hide">
      {Object.keys(stickerConfig).map((src, index) => (
        <Image
          key={index}
          src={src}
          alt={`sticker ${index + 1}`}
          width={60}
          height={60}
          className="cursor-pointer hover:scale-110 transition-transform"
          onClick={() => onSelectImage(src)}
        />
      ))}
    </div>
  </section>
);

<<<<<<< HEAD
// export default Stickers;
=======
export default Stickers;
>>>>>>> d012277da28460bcbff7e6d4fb874d1c6f390f6d
