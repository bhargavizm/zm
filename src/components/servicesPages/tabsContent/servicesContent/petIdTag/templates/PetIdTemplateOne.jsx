import React from "react";
import Image from "next/image";

const PetIdTemplateOne = ({ petIDFormData }) => {
  if (!petIDFormData) {
    return <div className="text-center p-6">No pet tag data available.</div>;
  }

  // background (kept optional)
  let backgroundImage = "";
  switch (petIDFormData.selectedTemplate) {
    case "pet1.webp":
    case "pet2.webp":
      backgroundImage = "/pet-id/pet1.webp";
      break;
    case "pet3.webp":
      backgroundImage = "/pet-id/pet3.webp";
      break;
    case "pet4.webp":
      backgroundImage = "/pet-id/pet4.webp";
      break;
    case "PET6.webp":
      backgroundImage = "/pet-id/PET6.webp";
      break;
    default:
      backgroundImage = "/pet-id/pet1.webp";
  }

const DetailRow = ({ label, value, isAddress }) =>
  value ? (
    <>
      <div className="font-medium text-[#8B4513]">{label}</div>
      <div className="text-[#8B4513]">:</div>
      <div className="text-gray-800 break-words whitespace-normal overflow-hidden">
        {isAddress ? (
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              value
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            {value}
          </a>
        ) : (
          value
        )}
      </div>
    </>
  ) : null;


  return (
    <div
      className="relative w-[350px] h-[650px] rounded-lg shadow-lg overflow-hidden"
      style={{
        // uncomment if you want the background visible
         backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Pet Image (centered, fixed) */}
       <div className="bg-white/70 m-2">
      <div className="absolute inset-x-0 top-6 z-10 flex justify-center my-9">
        {petIDFormData.previewUrl ? (
          <Image
            src={petIDFormData.previewUrl}
            alt="Pet"
            width={120}
            height={120}
            className="rounded-xl object-cover w-[120px] h-[120px]"
          />
        ) : (
          <div className="w-[120px] h-[120px] flex items-center justify-center text-gray-500">
            <img
              src="/pet-id/image-frame.webp"
              alt="default dog"
              className="rounded-full object-center"
            />
          </div>
        )}
      </div>

      {/* Scrollable Content (padding top to clear the image) */}
      <div className="h-full overflow-y-auto scrollbar-hide pt-44 pb-6 px-4 flex flex-col items-center">
        {/* Pet Name */}
        <h2 className="text-2xl font-semibold text-[#8B4513] my-6 drop-shadow">
          {petIDFormData.pet.name}
        </h2>

        {/* Details with perfect alignment */}
        <div className="w-full rounded-lg px-2 py-3">
          <div className="grid grid-cols-[max-content_12px_1fr] gap-x-2 gap-y-2 text-md">
            <DetailRow label="Owner Name" value={petIDFormData.ownerInfo.name} />
            <DetailRow label="Contact Number" value={petIDFormData.ownerInfo.phone} />
            <DetailRow label="Email" value={petIDFormData.ownerInfo.email} />
           <DetailRow label="Address" value={petIDFormData.ownerInfo.address} isAddress />
            <DetailRow label="Breed" value={petIDFormData.pet.breed} />
            <DetailRow label="Gender" value={petIDFormData.pet.gender} />
            <DetailRow label="Color" value={petIDFormData.pet.color} />
            <DetailRow label="Microchip" value={petIDFormData.pet.microchip} />
            <DetailRow label="Special Needs" value={petIDFormData.pet.specialNeeds} />
            <DetailRow label="Vet Info" value={petIDFormData.pet.vetInfo} />
            <DetailRow label="Diet" value={petIDFormData.pet.diet} />
          </div>
        </div>
      </div>
</div>

    </div>
  );
};

export default PetIdTemplateOne;
