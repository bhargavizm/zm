import React from "react";
import Image from "next/image";

const PetIdTemplateThree = ({ petIDFormData }) => {
    if (!petIDFormData) {
        return <div className="text-center p-6">No pet tag data available.</div>;
    }

    // Determine background image
    let backgroundImage = "";
    switch (petIDFormData.selectedTemplate) {
        case "pet1.webp":
        case "pet2.webp":
            backgroundImage = "/pet-id/pet3.webp";
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

    const DetailRow = (label, value) =>
        value ? (
            <>
                <p className="font-medium text-[#8B4513]">{label}</p>
                <p className="text-[#8B4513]">:</p>
                <p className="text-gray-800 break-words whitespace-normal overflow-hidden">
                    {value}
                </p>
            </>
        ) : null;

    return (
        <div
            className="relative w-[350px] h-[650px] rounded-lg shadow-lg overflow-hidden "
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* White translucent background for better readability */}
            <div className="bg-white/70 m-2 ">
                {/* Pet Image */}
                <div className="absolute top-10 left-0 w-full z-10 flex justify-center pt-4">
                    {petIDFormData.previewUrl ? (
                        <Image
                            src={petIDFormData.previewUrl}
                            alt="Pet"
                            width={120}
                            height={120}
                            className="rounded-xl object-cover"
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

                {/* Scrollable Content */}
                <div className="h-full overflow-y-auto scrollbar-hide pt-[150px] pb-6 px-4 flex flex-col items-center">
                    {/* Pet Name */}
                    <h2 className="text-2xl font-semibold text-[#8B4513] mb-6 drop-shadow">
                        {petIDFormData.pet.name}
                    </h2>

                    {/* Pet and Owner Info */}
                    <div className="w-full rounded-lg px-2 py-3">
                        <div className="grid grid-cols-[max-content_12px_1fr] gap-x-2 gap-y-2 text-md">
                            {DetailRow("Owner Name", petIDFormData.ownerInfo.name)}
                            {DetailRow("Contact Number", petIDFormData.ownerInfo.phone)}
                            {DetailRow("Email", petIDFormData.ownerInfo.email)}
                            {DetailRow("Address", petIDFormData.ownerInfo.address)}
                            {DetailRow("Breed", petIDFormData.pet.breed)}
                            {DetailRow("Gender", petIDFormData.pet.gender)}
                            {DetailRow("Color", petIDFormData.pet.color)}
                            {DetailRow("Microchip", petIDFormData.pet.microchip)}
                            {DetailRow("Special Needs", petIDFormData.pet.specialNeeds)}
                            {DetailRow("Vet Info", petIDFormData.pet.vetInfo)}
                            {DetailRow("Diet", petIDFormData.pet.diet)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PetIdTemplateThree;
