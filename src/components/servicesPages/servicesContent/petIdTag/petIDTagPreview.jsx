import useServicesContext from "@/components/hooks/useServiceContext";
import React from "react";

const PetIDTagPreview = () => {
  const { petIDFormData,isAnimating } = useServicesContext();
  return (
    <>
      <section>
        {/* Right iPhone Preview */}
        <div className="flex justify-center items-start">
          <div className="w-[320px] h-[570px] border-4 border-[#001a1a] rounded-3xl p-4 shadow-2xl bg-white flex flex-col items-center space-y-3">
            {/* Profile Card */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
              <div className="flex flex-col items-center">
                {petIDFormData.mainImage ? (
                  <div
                    className={`w-24 h-24 rounded-full overflow-hidden border-4 border-teal-300 shadow-md mb-3 ${
                      isAnimating ? "animate-bounce" : ""
                    }`}
                  >
                    <img
                      src={petIDFormData.mainImage}
                      alt="Main Pet"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gray-200 border-2 border-dashed border-gray-400 flex items-center justify-center mb-3">
                    <span className="text-gray-500 text-sm text-center">
                      No Image
                    </span>
                  </div>
                )}
                <h3 className="text-lg font-bold text-teal-600 text-center">
                  {petIDFormData.tagTitle || "Pet ID Tag"}
                </h3>
              </div>
            </div>

            {/* Owner Info Card */}
            {petIDFormData.ownerInfo.visible &&
              (petIDFormData.ownerInfo.name ||
                petIDFormData.ownerInfo.phone ||
                petIDFormData.ownerInfo.email ||
                petIDFormData.ownerInfo.address) && (
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <h4 className="font-semibold text-teal-600 border-b pb-2 mb-3">
                    Owner Information
                  </h4>
                  <div className="space-y-2">
                    {petIDFormData.ownerInfo.name && (
                      <p className="text-sm">
                        <span className="font-medium text-gray-700">Name:</span>{" "}
                        {petIDFormData.ownerInfo.name}
                      </p>
                    )}
                    {petIDFormData.ownerInfo.phone && (
                      <p className="text-sm">
                        <span className="font-medium text-gray-700">
                          Phone:
                        </span>{" "}
                        {petIDFormData.ownerInfo.phone}
                      </p>
                    )}
                    {petIDFormData.ownerInfo.email && (
                      <p className="text-sm">
                        <span className="font-medium text-gray-700">
                          Email:
                        </span>{" "}
                        {petIDFormData.ownerInfo.email}
                      </p>
                    )}
                    {petIDFormData.ownerInfo.address && (
                      <p className="text-sm">
                        <span className="font-medium text-gray-700">
                          Address:
                        </span>{" "}
                        {petIDFormData.ownerInfo.address}
                      </p>
                    )}
                  </div>
                </div>
              )}

            {/* Pet Info Card */}
            {petIDFormData.pet.visible && (
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                <h4 className="font-semibold text-teal-600 border-b pb-2 mb-3">
                  Pet Information
                </h4>

                {/* Pet Images Carousel */}
                {petIDFormData.pet.images.length > 0 && (
                  <div className="mb-4">
                    <Slider {...sliderSettings}>
                      {petIDFormData.pet.images.map((img, i) => (
                        <div key={i} className="px-1">
                          <img
                            src={img}
                            alt={`pet-${i}`}
                            className="w-full h-48 object-cover rounded-lg"
                          />
                        </div>
                      ))}
                    </Slider>
                  </div>
                )}

                {/* Pet Details */}
                <div className="space-y-3">
                  {petIDFormData.pet.name && (
                    <p className="text-sm">
                      <span className="font-medium text-gray-700">Name:</span>{" "}
                      {petIDFormData.pet.name}
                    </p>
                  )}
                  {(petIDFormData.pet.species || petIDFormData.pet.breed) && (
                    <p className="text-sm">
                      <span className="font-medium text-gray-700">Breed:</span>
                      {petIDFormData.pet.species &&
                        ` ${petIDFormData.pet.species}`}
                      {petIDFormData.pet.breed &&
                        ` (${petIDFormData.pet.breed})`}
                    </p>
                  )}
                  {petIDFormData.pet.gender && (
                    <p className="text-sm">
                      <span className="font-medium text-gray-700">Gender:</span>{" "}
                      {petIDFormData.pet.gender}
                    </p>
                  )}
                  {petIDFormData.pet.birthDate && (
                    <p className="text-sm">
                      <span className="font-medium text-gray-700">
                        Birth Date:
                      </span>{" "}
                      {petIDFormData.pet.birthDate}
                    </p>
                  )}
                  {petIDFormData.pet.color && (
                    <p className="text-sm">
                      <span className="font-medium text-gray-700">Color:</span>{" "}
                      {petIDFormData.pet.color}
                    </p>
                  )}
                  {petIDFormData.pet.microchip && (
                    <p className="text-sm">
                      <span className="font-medium text-gray-700">
                        Microchip:
                      </span>{" "}
                      {petIDFormData.pet.microchip}
                    </p>
                  )}
                  {petIDFormData.pet.specialNeeds && (
                    <p className="text-sm">
                      <span className="font-medium text-gray-700">
                        Special Needs:
                      </span>{" "}
                      {petIDFormData.pet.specialNeeds}
                    </p>
                  )}
                  {petIDFormData.pet.vetInfo && (
                    <p className="text-sm">
                      <span className="font-medium text-gray-700">
                        Vet Info:
                      </span>{" "}
                      {petIDFormData.pet.vetInfo}
                    </p>
                  )}
                  {petIDFormData.pet.diet && (
                    <p className="text-sm">
                      <span className="font-medium text-gray-700">Diet:</span>{" "}
                      {petIDFormData.pet.diet}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Emergency Contacts Card */}
            {petIDFormData.emergencyContacts.filter(
              (c) => c.visible && (c.name || c.phone)
            ).length > 0 && (
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                <h4 className="font-semibold text-teal-600 border-b pb-2 mb-3">
                  Emergency Contacts
                </h4>
                <div className="space-y-3">
                  {petIDFormData.emergencyContacts
                    .filter((c) => c.visible && (c.name || c.phone))
                    .map((contact, i) => (
                      <div key={i} className="text-sm">
                        {contact.name && (
                          <p>
                            <span className="font-medium text-gray-700">
                              Name:
                            </span>{" "}
                            {contact.name}
                          </p>
                        )}
                        {contact.relationship && (
                          <p>
                            <span className="font-medium text-gray-700">
                              Relationship:
                            </span>{" "}
                            {contact.relationship}
                          </p>
                        )}
                        {contact.phone && (
                          <p>
                            <span className="font-medium text-gray-700">
                              Phone:
                            </span>{" "}
                            {contact.phone}
                          </p>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Additional Info Card */}
            {petIDFormData.additionalInfo.filter((i) => i.visible && i.value)
              .length > 0 && (
              <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                <h4 className="font-semibold text-teal-600 border-b pb-2 mb-3">
                  Additional Information
                </h4>
                <div className="space-y-3">
                  {petIDFormData.additionalInfo
                    .filter((i) => i.visible && i.value)
                    .map((field, i) => (
                      <div key={i}>
                        {field.type === "video" ? (
                          <div className="mt-2">
                            <p className="font-medium text-gray-700 text-sm mb-1">
                              {field.label}
                            </p>
                            <video controls className="w-full rounded-lg">
                              <source src={field.value} type="video/mp4" />
                            </video>
                          </div>
                        ) : (
                          <p className="text-sm">
                            <span className="font-medium text-gray-700">
                              {field.label}:
                            </span>{" "}
                            {field.value}
                          </p>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* QR Code Placeholder */}
          </div>
        </div>
      </section>
    </>
  );
};

export default PetIDTagPreview;
