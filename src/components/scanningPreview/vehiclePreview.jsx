import React from "react";

const VehiclePreview = ({ data }) => {
  const {
    user,
    template,
    general,
    registration,
    contact,
    media,
    security,
    createdAt,
  } = data;

  return (
    <div className="max-w-4xl bg-white p-6 rounded-lg shadow-md w-full">
      <h2 className="text-2xl font-bold mb-4">Vehicle Information</h2>

      {/* General Info */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold">General Info</h3>
        <p><strong>Model:</strong> {general?.vehicleModel || "N/A"}</p>
        <p><strong>Type:</strong> {general?.vehicleType || "N/A"}</p>
        <p><strong>Description:</strong> {general?.description || "N/A"}</p>
      </div>

      {/* Registration Info */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Registration Info</h3>
        <p><strong>RC Number:</strong> {registration?.rcNumber || "N/A"}</p>
        <p><strong>Driver Name:</strong> {registration?.driverName || "N/A"}</p>
        <p><strong>Owner Name:</strong> {registration?.ownerName || "N/A"}</p>
      </div>

      {/* Contact Info */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Contact Info</h3>
        <p><strong>Phone:</strong> {contact?.contact || "N/A"}</p>
        <p><strong>Alt Contact:</strong> {contact?.altContact || "N/A"}</p>
        <p><strong>Address:</strong> {contact?.address || "N/A"}</p>
      </div>

      {/* Media */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Media</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {media?.vehicleImage && (
            <div>
              <p className="font-medium">Vehicle Image:</p>
              <img src={media.vehicleImage} alt="Vehicle" className="rounded" />
            </div>
          )}
          {media?.licenseFront && (
            <div>
              <p className="font-medium">License Front:</p>
              <img src={media.licenseFront} alt="License Front" className="rounded" />
            </div>
          )}
          {media?.licenseBack && (
            <div>
              <p className="font-medium">License Back:</p>
              <img src={media.licenseBack} alt="License Back" className="rounded" />
            </div>
          )}
        </div>
      </div>

      {/* Created By */}
      <div className="mt-4 text-sm text-gray-600">
        <p><strong>User:</strong> {user?.name || "Unknown"}</p>
        <p><strong>Created At:</strong> {new Date(createdAt).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default VehiclePreview;
