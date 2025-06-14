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
            backgroundImage = "/pet-id/pet1.jpg"; // Both pet1 and pet2 use similar dog image backgrounds, assuming pet1.webp as the base
            break;
        case "pet3.webp":
            backgroundImage = "/pet-id/pet3.jpg";
            break;
        case "pet4.webp":
            backgroundImage = "/pet-id/pet4.jpg";
            break;
        case "PET6.webp":
            backgroundImage = "/pet-id/PET6.jpg";
            break;
        default:
            backgroundImage = "/pet-id/pet1.jpg"; // Default to pet1.webp if no template is selected or found
    }

    return (
        <div
            className="relative  w-[360px] h-[490px] overflow-y-auto scrollbar-hide rounded-lg shadow-lg flex flex-col items-center justify-start p-6"
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* Overlay for gradient effect if needed, or adjust background image */}
            <div className="absolute inset-0 bg-gradient-to-t from-teal-100 via-blue-100 to-purple-100 opacity-60"></div>

            {/* Pet Image - Centered and Circular */}
            <div className="relative z-10 mb-8">
                {petIDFormData.mainImage ? (
                    <Image
                        src={petIDFormData.mainImage}
                        alt="Pet"
                        width={150}
                        height={150}
                        className="rounded-full object-cover border-4 border-white shadow-md"
                    />
                ) : (
                    <div className="w-[150px] h-[150px] bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                        No Image
                    </div>
                )}
            </div>

            {/* Pet Tag Title */}
            <h1 className="relative z-10 text-4xl font-bold text-[#6D3C00] mb-2 drop-shadow">
                {petIDFormData.tagTitle || "Pet Tag"}
            </h1>

            {/* Pet Name */}
            <h2 className="relative z-10 text-2xl font-semibold text-[#8B4513] mb-8 drop-shadow">
                {petIDFormData.pet.name || "Bread"}
            </h2>

            {/* Pet and Owner Information */}
            <div className="relative z-10 w-full max-w-xs bg-white bg-opacity-80 rounded-lg p-4 shadow-inner">
                <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-gray-800 text-base">
                    <p className="font-medium text-[#8B4513]">Type of Pet</p>
                    <p>: {petIDFormData.pet.species || "Dog"}</p>

                    <p className="font-medium text-[#8B4513]">Date of Birth</p>
                    <p>: {petIDFormData.pet.birthDate || "Nov 15, 2022"}</p>

                    <p className="font-medium text-[#8B4513]">Name of the Owner</p>
                    <p>: {petIDFormData.ownerInfo.name || "Ricardo Ibarra"}</p>

                    <p className="font-medium text-[#8B4513]">Contact Number</p>
                    <p>: {petIDFormData.ownerInfo.phone || "+123-456-7890"}</p>

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
    );
};

export default PetIdTemplateOne;