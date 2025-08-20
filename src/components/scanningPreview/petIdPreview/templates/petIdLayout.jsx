import React from "react";
import Image from "next/image";

const PetIdCardLayout = ({ backgroundImage, petIDFormData }) => {
  if (!petIDFormData) {
    return <div className="text-center p-6">No pet tag data available.</div>;
  }

  return (
    <div
      className="w-full h-full p-6 rounded-2xl "
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex justify-center items-center flex-col bg-white/60 p-6">
        {/* Pet Image */}
        <div className="mb-4">
          {petIDFormData.mainImage ? (
            <Image
              src={petIDFormData.mainImage}
              alt="Pet"
              width={120}
              height={120}
              className="rounded-2xl object-center"
            />
          ) : (
            <img
              src="/pet-id/image-frame.webp"
              alt="default dog"
              className="w-[120px] h-[120px] rounded-full object-center"
            />
          )}
        </div>

        {/* Pet Name */}
        <h2 className="text-2xl font-semibold text-[#8B4513] mb-6 drop-shadow">
          {petIDFormData.pet.name}
        </h2>

        {/* Pet Info */}
        <div className="w-full text-left text-gray-800 text-xl">
          <div className="grid grid-cols-[auto_1fr] gap-x-2 gap-y-4">
            {petIDFormData.ownerInfo.name && (
              <>
                <p className="font-medium text-[#8B4513]">Owner Name</p>
                <p>: {petIDFormData.ownerInfo.name}</p>
              </>
            )}
            {petIDFormData.ownerInfo.phone && (
              <>
                <p className="font-medium text-[#8B4513]">Contact Number</p>
                <p>: {petIDFormData.ownerInfo.phone}</p>
              </>
            )}
            {petIDFormData.ownerInfo.email && (
              <>
                <p className="font-medium text-[#8B4513]">Email</p>
                <p>: {petIDFormData.ownerInfo.email}</p>
              </>
            )}
           {petIDFormData.ownerInfo.address && (
  <>
    <p className="font-medium text-[#8B4513]">Address</p>
    <p>
      :{" "}
      <a
        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          petIDFormData.ownerInfo.address
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline"
      >
        {petIDFormData.ownerInfo.address}
      </a>
    </p>
  </>
)}

            {petIDFormData.pet.breed && (
              <>
                <p className="font-medium text-[#8B4513]">Breed</p>
                <p>: {petIDFormData.pet.breed}</p>
              </>
            )}
            {petIDFormData.pet.gender && (
              <>
                <p className="font-medium text-[#8B4513]">Gender</p>
                <p>: {petIDFormData.pet.gender}</p>
              </>
            )}
            {petIDFormData.pet.color && (
              <>
                <p className="font-medium text-[#8B4513]">Color</p>
                <p>: {petIDFormData.pet.color}</p>
              </>
            )}
            {petIDFormData.pet.microchip && (
              <>
                <p className="font-medium text-[#8B4513]">Microchip</p>
                <p>: {petIDFormData.pet.microchip}</p>
              </>
            )}
            {petIDFormData.pet.specialNeeds && (
              <>
                <p className="font-medium text-[#8B4513]">Special Needs</p>
                <p>: {petIDFormData.pet.specialNeeds}</p>
              </>
            )}
            {petIDFormData.pet.vetInfo && (
              <>
                <p className="font-medium text-[#8B4513]">Vet Info</p>
                <p>: {petIDFormData.pet.vetInfo}</p>
              </>
            )}
            {petIDFormData.pet.diet && (
              <>
                <p className="font-medium text-[#8B4513]">Diet</p>
                <p>: {petIDFormData.pet.diet}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetIdCardLayout;
