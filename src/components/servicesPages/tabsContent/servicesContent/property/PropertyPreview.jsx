// "use client";

// import React, { useEffect } from 'react';
// import useServicesContext from '@/components/hooks/useServiceContext';
// import useDesignContext from '@/components/hooks/useDesignContext';
// import Image from 'next/image';

// const PropertyPreview = () => {
//   const { dynamicForms } = useServicesContext();
//    const { bgDesign, setBgDesign, isLoading, setIsLoading } = useDesignContext();

//   const defaultBg = '/services-service/property.webp'

//   useEffect(() => {
//     setIsLoading(true);
//     setBgDesign(defaultBg);
//   }, []);

//   const property = dynamicForms.propertyDetails;

//   const hasBasicInfo = Object.values(property?.basicInfo || {}).some(Boolean);
//   const hasAddressInfo = Object.values(property?.addressInfo || {}).some(Boolean);
//   const hasPricingInfo = Object.values(property?.pricingInfo || {}).some(Boolean);
//   const hasMainImage = !!property?.images?.mainImage;
//   const hasGalleryImages = property?.images?.galleryImages?.length > 0;

//   const isVideo = bgDesign?.endsWith('.mp4');
//   const isImage = bgDesign && !isVideo;

//   return (
//     <div className="relative ">
//       {/* 🔳 Background Layer */}


//       {/* 🧊 White overlay */}
//       {/* <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-10" /> */}

//       {/* 📱 Main Preview Content */}
//       <div className="relative z-20 flex justify-center">
//         <div className="w-[350px] h-[600px] border-[12px] border-black rounded-[36px] shadow-xl overflow-y-auto scrollbar-hide relative">
//                 {isImage && (
//         <img
//           src={bgDesign}
//           alt="Background"
//            onLoad={() => setTimeout(() => setIsLoading(false), 300)}
//           className="absolute inset-0 w-full h-full object-cover z-0"
//         />
//       )}
//       {isVideo && (
//         <video
//           src={bgDesign}
//           autoPlay
//           loop
//           muted
//           playsInline
//            onLoadedData={() => setTimeout(() => setIsLoading(false), 300)}
//           className="absolute inset-0 w-full h-full object-cover z-0"
//         />
//       )}
//       {!bgDesign && (
//          <img
//           src={defaultBg}
//           alt="Background"
//            onLoad={() => setTimeout(() => setIsLoading(false), 300)}
//           className="absolute inset-0 w-full h-full object-cover z-0"
//         />
//       )}

//               {/* ⏳ Loader */}
//               {isLoading && (
//                 <div className="absolute inset-0 z-50 bg-mainGreen backdrop-blur-sm flex justify-center items-center">
//                   <Image
//                     src="/logos/ZM LOGO.webp"
//                     alt="Loading"
//                     width={100}
//                     height={100}
//                     className="w-20 h-20 animate-bounce"
//                   />
//                 </div>
//               )}
      

//         <div className="relative z-10 flex-1 overflow-y-auto p-6 pt-12 m-4 rounded-xl bg-white/70">
//             {/* <h1 className="text-2xl font-bold text-center text-[#008080] mb-6">🏡 Property Preview</h1> */}

//             {/* Basic Info */}
//             {hasBasicInfo && (
//               <div className="border p-4 rounded shadow mb-4">
//                 <h2 className="text-lg font-semibold text-[#008080] mb-2">Basic Information</h2>
//                 {property.basicInfo.propertyName && <p><strong>Name:</strong> {property.basicInfo.propertyName}</p>}
//                 {property.basicInfo.propertyType && <p><strong>Type:</strong> {property.basicInfo.propertyType}</p>}
//                 {property.basicInfo.ownerName && <p><strong>Owner:</strong> {property.basicInfo.ownerName}</p>}
//                 {property.basicInfo.contactNumber && <p><strong>Contact:</strong> {property.basicInfo.contactNumber}</p>}
//                 {property.basicInfo.alternateNumber && <p><strong>Alternate Number:</strong> {property.basicInfo.alternateNumber}</p>}
//                 {property.basicInfo.propertyDescription && <p><strong>Description:</strong> {property.basicInfo.propertyDescription}</p>}
//               </div>
//             )}

//             {/* Address Info */}
//             {hasAddressInfo && (
//               <div className="border p-4 rounded shadow mb-4">
//                 <h2 className="text-lg font-semibold text-[#008080] mb-2">Address Info</h2>
//                 {property.addressInfo.address && <p><strong>Address:</strong> {property.addressInfo.address}</p>}
//                 {property.addressInfo.mapLink && <p><strong>Map Link:</strong> {property.addressInfo.mapLink}</p>}
//               </div>
//             )}

//             {/* Pricing Info */}
//             {hasPricingInfo && (
//               <div className="border p-4 rounded shadow mb-4">
//                 <h2 className="text-lg font-semibold text-[#008080] mb-2">Pricing Info</h2>
//                 {property.pricingInfo.price && <p><strong>Price:</strong> {property.pricingInfo.price}</p>}
//                 {property.pricingInfo.area && <p><strong>Area:</strong> {property.pricingInfo.area}</p>}
//                 {property.pricingInfo.amenities && <p><strong>Amenities:</strong> {property.pricingInfo.amenities}</p>}
//               </div>
//             )}

//             {/* Main Image */}
//             {hasMainImage && (
//               <div className="border p-4 rounded shadow mb-4">
//                 <h2 className="text-lg font-semibold text-[#008080] mb-2">Main Image</h2>
//                 <Image
//                   src={URL.createObjectURL(property.images.mainImage)}
//                   alt="Main Property"
//                   width={300}
//                   height={200}
//                   className="rounded w-full object-cover"
//                 />
//               </div>
//             )}

//             {/* Gallery Images */}
//             {hasGalleryImages && (
//               <div className="border p-4 rounded shadow mb-4">
//                 <h2 className="text-lg font-semibold text-[#008080] mb-2">Gallery Images</h2>
//                 <div className="grid grid-cols-2 gap-3">
//                   {property.images.galleryImages.map((img, index) => (
//                     <Image
//                       key={index}
//                       src={URL.createObjectURL(img)}
//                       alt={`Gallery ${index + 1}`}
//                       width={150}
//                       height={100}
//                       className="rounded w-full object-cover"
//                     />
//                   ))}
//                 </div>
//               </div>
//             )}

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PropertyPreview;

// "use client";

// import React, { useEffect } from 'react';
// import useServicesContext from '@/components/hooks/useServiceContext';
// import useDesignContext from '@/components/hooks/useDesignContext';
// import Image from 'next/image';

"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import useServicesContext from "@/components/hooks/useServiceContext";
import useDesignContext from "@/components/hooks/useDesignContext";

const PropertyPreview = () => {
  const { propertyDetails } = useServicesContext();
  const { bgDesign, setBgDesign, isLoading, setIsLoading } = useDesignContext();

  const defaultBg = "/services-service/property.webp";

  useEffect(() => {
    setIsLoading(true);
    setBgDesign(defaultBg);
  }, []);

  const property = propertyDetails;

  const hasBasicInfo = Object.values(property?.basicInfo || {}).some(Boolean);
  const hasAddressInfo = Object.values(property?.addressInfo || {}).some(Boolean);
  const hasPricingInfo = Object.values(property?.pricingInfo || {}).some(Boolean);
  const hasMainImage = !!property?.images?.mainImage;
  const hasGalleryImages = property?.images?.galleryImages?.length > 0;

  const isVideo = bgDesign?.endsWith(".mp4");
  const isImage = bgDesign && !isVideo;

  return (
    <div className="relative flex justify-center">
      {/* 📱 Phone Frame */}
      <div className="w-[350px] h-[600px] border-[12px] border-black rounded-[36px] shadow-xl relative overflow-hidden">
        {/* 📽 Background inside phone */}
        {isImage && (
          <img
            src={bgDesign}
            alt="Background"
            onLoad={() => setTimeout(() => setIsLoading(false), 300)}
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
        )}
        {isVideo && (
          <video
            src={bgDesign}
            autoPlay
            loop
            muted
            playsInline
            onLoadedData={() => setTimeout(() => setIsLoading(false), 300)}
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
        )}
        {!bgDesign && (
          <img
            src={defaultBg}
            alt="Background"
            onLoad={() => setTimeout(() => setIsLoading(false), 300)}
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
        )}

        {/* ⏳ Loader */}
        {isLoading && (
          <div className="absolute inset-0 z-50 bg-mainGreen/80 backdrop-blur-sm flex justify-center items-center">
            <Image
              src="/logos/ZM LOGO.webp"
              alt="Loading"
              width={100}
              height={100}
              className="w-20 h-20 animate-bounce"
            />
          </div>
        )}

        {/* 🧾 Scrollable Content */}
        <div className="absolute inset-0 z-10 overflow-y-scroll scrollbar-hide p-6 pt-12 m-4 rounded-xl bg-white/70">
          {/* Basic Info */}
          {hasBasicInfo && (
            <div className="border p-4 rounded shadow mb-4">
              <h2 className="text-lg font-semibold text-[#008080] mb-2">Basic Information</h2>
              {property.basicInfo.propertyName && <p><strong>Name:</strong> {property.basicInfo.propertyName}</p>}
              {property.basicInfo.propertyType && <p><strong>Type:</strong> {property.basicInfo.propertyType}</p>}
              {property.basicInfo.ownerName && <p><strong>Owner:</strong> {property.basicInfo.ownerName}</p>}
              {property.basicInfo.contactNumber && <p><strong>Contact:</strong> {property.basicInfo.contactNumber}</p>}
              {property.basicInfo.alternateNumber && <p><strong>Alternate Number:</strong> {property.basicInfo.alternateNumber}</p>}
              {property.basicInfo.propertyDescription && <p><strong>Description:</strong> {property.basicInfo.propertyDescription}</p>}
            </div>
          )}

          {/* Address Info */}
          {hasAddressInfo && (
            <div className="border p-4 rounded shadow mb-4">
              <h2 className="text-lg font-semibold text-[#008080] mb-2">Address Info</h2>
              {property.addressInfo.address && <p><strong>Address:</strong> {property.addressInfo.address}</p>}
              {property.addressInfo.mapLink && <p><strong>Map Link:</strong> {property.addressInfo.mapLink}</p>}
            </div>
          )}

          {/* Pricing Info */}
          {hasPricingInfo && (
            <div className="border p-4 rounded shadow mb-4">
              <h2 className="text-lg font-semibold text-[#008080] mb-2">Pricing Info</h2>
              {property.pricingInfo.price && <p><strong>Price:</strong> {property.pricingInfo.price}</p>}
              {property.pricingInfo.area && <p><strong>Area:</strong> {property.pricingInfo.area}</p>}
              {property.pricingInfo.amenities && <p><strong>Amenities:</strong> {property.pricingInfo.amenities}</p>}
            </div>
          )}

          {/* Main Image */}
          {hasMainImage && (
            <div className="border p-4 rounded shadow mb-4">
              <h2 className="text-lg font-semibold text-[#008080] mb-2">Main Image</h2>
              <Image
                src={URL.createObjectURL(property.images.mainImage)}
                alt="Main Property"
                width={300}
                height={200}
                className="rounded w-full object-cover"
              />
            </div>
          )}

          {/* Gallery Images with File Names */}
          {hasGalleryImages && (
            <div className="border p-4 rounded shadow mb-4">
              <h2 className="text-lg font-semibold text-[#008080] mb-2">Gallery Images</h2>
              <div className="grid grid-cols-2 gap-3">
                {property.images.galleryImages.map((img, index) => (
                  <div key={index} className="flex flex-col items-center space-y-1">
                    <Image
                      src={URL.createObjectURL(img)}
                      alt={img.name || `Gallery ${index + 1}`}
                      width={150}
                      height={100}
                      className="rounded w-full object-cover"
                    />
                    {/* <p className="text-xs text-gray-600 text-center truncate max-w-[140px]">
                      {img.name || `Image ${index + 1}`}
                    </p> */}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyPreview;
