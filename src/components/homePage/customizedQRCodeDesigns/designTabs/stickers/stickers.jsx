import Image from 'next/image';
import React from 'react'
import { stickers } from './stickerImages';

const Stickers = ({ onSelectImage }) => {

  return (
   <section>
        <section className="mt-6">
             <div className="grid grid-cols-8 gap-6 h-[90vh] overflow-y-auto scrollbar-hide" >
               {stickers.map((src, index) => (
                 <Image
                   key={index}
                   src={src}
                   alt={`qr shape ${index + 1}`}
                   width={60}
                   height={60}
                   className="cursor-pointer hover:scale-110 transition-transform"
                   onClick={() => onSelectImage(src)}
                   priority
                 />
               ))}
             </div>
       
       
           </section>
    </section>
  )
}

export default Stickers