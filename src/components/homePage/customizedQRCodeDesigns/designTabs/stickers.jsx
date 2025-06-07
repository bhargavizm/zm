import Image from 'next/image';
import React from 'react'

const Stickers = ({ onSelectImage }) => {
   const stickers = [
        '/images/stickers/stickers-1.svg',
        '/images/stickers/stickers-2.svg',
         '/images/stickers/stickers-3.svg',
          '/images/stickers/stickers-4.svg',
           '/images/stickers/stickers-5.svg',
            '/images/stickers/sticker-6.svg',

  ];
  return (
   <section>
        <section className="mt-6">
             <div className="grid grid-cols-8 gap-6">
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