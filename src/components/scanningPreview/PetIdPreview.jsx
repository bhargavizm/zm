"use client";
import Image from "next/image";
import dynamic from "next/dynamic";

const PetIdPreview = ({ data }) => {
  if (!data) return null;

  const {
    mainImage,
    selectedTemplate,
    backgroundVideo,
    ownerInfo = {},
    pet = {},
    qrCodeDetails = {},
  } = data;

  const renderField = (label, value) => (
    <div className="mb-2">
      <p className="text-white text-sm font-semibold">{label}</p>
      <p className="text-white text-base">
        {value || <span className="text-gray-300">Not provided</span>}
      </p>
    </div>
  );

  return (
    <div className="w-full max-w-3xl mx-auto relative rounded-xl overflow-hidden shadow-2xl">
      {/* Background: Video or Image */}
      {backgroundVideo ? (
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          src={backgroundVideo}
          autoPlay
          muted
          loop
          playsInline
        />
      ) : selectedTemplate ? (
        <Image
          src={`/pet-id/${selectedTemplate}`}
          alt="Background Template"
          fill
          className="object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900" />
      )}

      {/* Overlay Content */}
      <div className="relative z-10 p-6 space-y-6 bg-black/60 backdrop-blur-sm">
        <h2 className="text-2xl font-bold text-center text-teal-300">
          Pet ID Tag Preview
        </h2>

        {/* Main Pet Image */}
        {mainImage && (
          <div className="text-center">
            <p className="text-sm text-gray-300 mb-2">Pet Image</p>
            <Image
              src={mainImage}
              alt="Pet"
              width={120}
              height={120}
              className="rounded-full border mx-auto"
            />
          </div>
        )}

        {/* Owner Info */}
        <div>
          <h3 className="text-lg font-semibold text-teal-100 border-b border-teal-200 pb-1 mb-3">
            Owner Information
          </h3>
          {renderField("Name", ownerInfo.name)}
          {renderField("Phone", ownerInfo.phone)}
          {renderField("Email", ownerInfo.email)}
          {renderField("Address", ownerInfo.address)}
        </div>

        {/* Pet Info */}
        <div>
          <h3 className="text-lg font-semibold text-teal-100 border-b border-teal-200 pb-1 mb-3">
            Pet Information
          </h3>
          {renderField("Pet Name", pet.name)}
          {renderField("Breed", pet.breed)}
          {renderField("Color", pet.color)}
        </div>

        {/* QR Code Details */}
        <div>
          <h3 className="text-lg font-semibold text-teal-100 border-b border-teal-200 pb-1 mb-3">
            QR Code Details
          </h3>
          {qrCodeDetails.qrCodeImage && (
            <div className="text-center mb-4">
              <Image
                src={qrCodeDetails.qrCodeImage}
                alt="QR Code"
                width={100}
                height={100}
                className="mx-auto"
              />
            </div>
          )}
          {renderField("Status", qrCodeDetails.status)}
          {renderField("Scans", qrCodeDetails.scanCount)}
          {renderField("Location Address", qrCodeDetails.location?.address)}
          {renderField(
            "Renewal Date",
            qrCodeDetails.renewalDate
              ? new Date(qrCodeDetails.renewalDate).toLocaleDateString()
              : null
          )}
        </div>
      </div>
    </div>
  );
};

export default PetIdPreview;
