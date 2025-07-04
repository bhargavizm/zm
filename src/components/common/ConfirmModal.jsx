import React from "react";

const ConfirmModal = ({
  open,
  onClose,
  onConfirm,
  title = "Please Confirm Details",
  fields = [],
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>

        <div className="text-sm text-gray-700 space-y-2 max-h-60 overflow-y-auto pr-1">
          {fields.map((field, index) => (
            <p key={index}>
              <strong>{field.label}:</strong> {field.value || "—"}
            </p>
          ))}
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 cursor-pointer"
          >
            Back
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 cursor-pointer transition duration-150"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
