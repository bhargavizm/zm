
// import Image from "next/image";
// // import MarketingData from "./marketingData";
// import { useLanguage } from "@/context/languageContext/LanguageContext";

// const MarketingData = [
//     {
//         id: 1,
//         title: 'Generate Static',
//         image: '/images/home/marketing-1.svg',
//         description: 'Advanced tools to design and manage QRs'
//     },
//     {
//         id: 2,
//         title: 'Advanced Analytics to Track Scans',
//         image: '/images/home/marketing-2.svg',
//         description: 'Location, time, device, OS, browser'
//     },
//     {
//         id: 3,

//         title: 'Bulk Upload and Bulk Download QRs',
//         image: '/images/home/marketing-3.svg',
//         description: 'Upload QRs via excel or download QRs in zip and pdf'
//     },
//     {
//         id: 4,

//         title: 'Integrate with Google Analytics',
//         image: '/images/home/marketing-4.svg',
//         description: 'Download analytics in excel or integrate with Google'
//     },
//     {
//         id: 5,

//         title: 'Customize Domains with White-Labeling',
//         image: '/images/home/marketing-6.svg',
//         description: 'Use your short URLs and landing page URLs'
//     },
//     {
//         id: 6,

//         title: 'Beautiful vCard Plus and Landing Pages',
//         image: '/images/home/marketing-7.svg',
//         description: 'Beautiful mesmerizing professional designs'
//     },
//     {
//         id: 7,

//         title: 'QR Code Design Customization',
//         image: '/images/home/marketing-8.svg',
//         description: 'Exciting shapes, colors, logo, stickers and 3D effect'
//     },
//     {
//         id: 8,

//         title: 'Free Account with Upgrade Options',
//         image: '/images/home/marketing-8.svg',
//         description: 'Free basic plan; flexible payment options for upgrades'
//     },
// ]


// const MarketingFeatures = () => {
//     const { dictionary } = useLanguage();
//   return (
//     <section className="bg-mainGreen padding-lr py-20">
//       <h2 className="text-white text-center font-bold text-4xl mb-3">
//         Leading QR Code Marketing and Management Tools
//       </h2>
//       <h2 className="text-white text-center font-bold text-4xl mb-3">
//         {/* {dictionary.marketingFeatures.heading} */}
//       </h2>
//       {/* <h4 className="mb-10 text-center text-lg text-slate-400">
//         A reliable QR Code solution equipped with powerful, next-gen features.
//       </h4> */}
//       <h4 className="mb-10 text-center text-lg text-slate-400">
//       </h4>

//       <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//         {MarketingData && MarketingData.map((item) => (
//           <div
//             key={item.id}
//             className="bg-white rounded-xl p-6 cursor-pointer shadow-xl transition-effects border-2 border-dashed"
//           >
//             <div className="w-16 h-16 mx-auto mb-4 pt-4 animate-bounce">
//               <Image
//                 src={item.image}
//                 alt={item.title}
//                 width={70}
//                 height={70}
//               />
//             </div>
//             <h3 className="text-xl font-semibold text-center text-darkGreen">
//               {item.title}
//             </h3>
//             <p className="text-center text-gray-600 text-sm mt-2">
//               {item.description}
//             </p>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default MarketingFeatures;


"use client";

import Image from "next/image";
import { useLanguage } from "@/context/languageContext/LanguageContext";

const MarketingFeatures = () => {
  const { dictionary } = useLanguage();
  const marketing = dictionary.marketingFeatures;

  return (
    <section className="bg-mainGreen padding-lr py-20">
      <h2 className="text-white text-center font-bold text-4xl mb-3">
        {marketing.heading}
      </h2>
      <h4 className="mb-10 text-center text-lg text-slate-400">
        {marketing.subheading}
      </h4>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {marketing.items &&
          marketing.items.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 cursor-pointer shadow-xl transition-all border-2 border-dashed hover:shadow-2xl"
            >
              <div className="w-16 h-16 mx-auto mb-4 pt-4 animate-bounce">
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.title || "Marketing Feature"}
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                )}
              </div>
              <h3 className="text-xl font-semibold text-center text-darkGreen">
                {item.title}
              </h3>
              <p className="text-center text-gray-600 text-sm mt-2">
                {item.description}
              </p>
            </div>
          ))}
      </div>
    </section>
  );
};

export default MarketingFeatures;
