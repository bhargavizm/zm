"use client";
import React from "react";
import useServicesContext from "@/components/hooks/useServiceContext";

const KidsSafetyContent = () => {
  const {
    kidsSafetyFormData,
    setKidsSafetyFormData,
    kidsImage,
    setKidsImage,
  } = useServicesContext();

  const handleChange = (e) => {
    setKidsSafetyFormData({
      ...kidsSafetyFormData,
      [e.target.id]: e.target.value,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setKidsImage(URL.createObjectURL(file));
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold pb-6 text-[#008080]">
        QR Code Generator for Kids Safety
      </h1>

      <div className="bg-white shadow-xl rounded-xl p-6 space-y-6">
        {/* Image Upload */}
        <div>
          <label className="block mb-1 font-medium">Child Image For Profile</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full text-sm" />
        </div>

        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { id: "childName", placeholder: "Enter the child's name" },
            { id: "dob", placeholder: "dd-mm-yyyy" },
            { id: "grade", placeholder: "Enter the class or grade of the child" },
            { id: "schoolName", placeholder: "Enter the School Name" },
            { id: "schoolAddress", placeholder: "Enter the full address of the school" },
            { id: "parentName", placeholder: "Enter the parent's name" },
            { id: "contact", placeholder: "Enter the parent's contact number" },
            { id: "altContact", placeholder: "Enter the Alternate Contact Number" },
            { id: "homeAddress", placeholder: "Enter the address" },
            { id: "mapLink", placeholder: "Enter a Google Maps link (optional)" },
            { id: "password", placeholder: "Enter the Password" },
          ].map(({ id, placeholder }) => (
            <input
              key={id}
              id={id}
              type="text"
              value={kidsSafetyFormData[id] || ""}
              onChange={handleChange}
              placeholder={placeholder}
              className="border p-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#008080]"
            />
          ))}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="mt-4 w-full bg-[#008080] text-white font-semibold py-2 rounded hover:bg-[#006666] transition"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default KidsSafetyContent;
