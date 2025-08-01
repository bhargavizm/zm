import React from "react";
import Image from "next/image";

const PetIdTemplateOne = ({ petIDFormData }) => {
    if (!petIDFormData) {
        return <div className="text-center p-6">No pet tag data available.</div>;
    }

    // Determine background image
    let backgroundImage = "";
    switch (petIDFormData.selectedTemplate) {
        case "pet1.webp":
        case "pet2.webp":
            backgroundImage = "/pet-id/pet2.webp";
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
            className="relative w-[350px] h-[600px] rounded-lg shadow-lg overflow-hidden"
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* Fixed Pet Image inside card */}
            <div className="absolute top-10 left-0 w-full z-10 flex justify-center pt-4 ">
                {petIDFormData.previewUrl ? (
                    <Image
                        src={petIDFormData.previewUrl}
                        alt="Pet"
                        width={120}
                        height={120}
                        className="rounded-full object-cover"
                    />
                ) : (
                    <div className="w-[150px] h-[150px] flex items-center justify-center text-gray-500">
                        <img
                            src="/pet-id/image-frame.webp"
                            alt="default dog"
                            className="rounded-full object-cover"
                        />
                    </div>
                )}
            </div>

            {/* Scrollable Content */}
            <div className="h-full overflow-y-auto scrollbar-hide pt-[150px] pb-6 px-4 my-13 flex flex-col items-center z-0">
                {/* Pet Name */}
                <h2 className="text-2xl font-semibold text-[#8B4513] mb-6 drop-shadow">
                    {petIDFormData.pet.name}
                </h2>

                {/* Pet and Owner Info */}
                <div className="w-full  rounded-lg px-4 py-3">
                    <div className="grid grid-cols-[auto_1fr] gap-x-2 gap-y-2 text-gray-800 text-md">
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
                                <p>: {petIDFormData.ownerInfo.address}</p>
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

export default PetIdTemplateOne;
