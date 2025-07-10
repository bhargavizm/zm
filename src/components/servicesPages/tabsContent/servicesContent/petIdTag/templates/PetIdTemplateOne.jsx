import React from "react";
import Image from "next/image";

const PetIdTemplateOne = ({ petIDFormData }) => {
    if (!petIDFormData) {
        return <div className="text-center p-6">No pet tag data available.</div>;
    }

    // Determine which background image to use based on the selectedTemplate
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

    return (
        <div
            className="relative w-[350px] h-[650px] overflow-y-auto scrollbar-hide rounded-lg shadow-lg flex flex-col items-center justify-center"
            style={{
                // backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* Pet Image */}
            <div className="relative z-10 mb-8 flex justify-center">
                {petIDFormData.mainImage ? (
                    <Image
                        src={petIDFormData.mainImage}
                        alt="Pet"
                        width={150}
                        height={150}
                        className="rounded-full object-cover border-4 border-white shadow-md"
                    />
                ) : (
                    <div className="w-[150px] h-[150px] flex items-center justify-center text-gray-500">
                        <img src="/pet-id/image-frame.webp" alt="default dog" />
                    </div>
                )}
            </div>

            {/* Pet Name */}
            <h2 className="relative z-10 text-2xl font-semibold text-[#8B4513] mb-8 drop-shadow">
                {petIDFormData.pet.name}
            </h2>

            {/* Pet and Owner Information */}
            <div className="relative z-10 w-full bg-opacity-80 rounded-lg px-4 py-2">
                <div className="grid grid-cols-[auto_1fr] gap-x-2 gap-y-2 text-gray-800 text-base">
                    {/* Owner Name */}
                    {petIDFormData.ownerInfo.name && (
                        <>
                            <p className="font-medium text-[#8B4513]">Name of the Owner</p>
                            <p>: {petIDFormData.ownerInfo.name}</p>
                        </>
                    )}

                    {/* Phone Number */}
                    {petIDFormData.ownerInfo.phone && (
                        <>
                            <p className="font-medium text-[#8B4513]">Contact Number</p>
                            <p>: {petIDFormData.ownerInfo.phone}</p>
                        </>
                    )}

                    {/* Email */}
                    {petIDFormData.ownerInfo.email && (
                        <>
                            <p className="font-medium text-[#8B4513]">Email</p>
                            <p>: {petIDFormData.ownerInfo.email}</p>
                        </>
                    )}

                    {/* Address */}
                    {petIDFormData.ownerInfo.address && (
                        <>
                            <p className="font-medium text-[#8B4513]">Address</p>
                            <p>: {petIDFormData.ownerInfo.address}</p>
                        </>
                    )}

                    {/* Additional Pet Info */}
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
    );
};

export default PetIdTemplateOne;
