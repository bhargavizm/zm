"use client";

import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useServicesContext from "../../../hooks/useServiceContext";

const Toggle = ({ checked, onChange }) => (
  <label className="inline-flex items-center cursor-pointer">
    <input
      type="checkbox"
      className="sr-only peer"
      checked={checked}
      onChange={onChange}
    />
    <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-mainGreen relative transition-all">
      <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-5" />
    </div>
  </label>
);

const DropdownSelect = ({ options, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="w-full flex justify-between items-center border px-3 py-2 rounded bg-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={value ? "" : "text-gray-400"}>
          {value || placeholder}
        </span>
        <svg
          className={`w-4 h-4 ml-2 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded shadow-lg">
          {options.map((option) => (
            <div
              key={option.value}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const PetIDTagContent = () => {
  const { petIDFormData, setPetIDFormData ,isAnimating, setIsAnimating} = useServicesContext();

  const [activeDropdown, setActiveDropdown] = useState(null);
  
  const additionalInfoOptions = [
    { value: "phone", label: "Phone Number" },
    { value: "email", label: "Email Address" },
    { value: "address", label: "Physical Address" },
    { value: "link", label: "Website Link" },
    { value: "video", label: "Video Message" },
    { value: "medical", label: "Medical Records" },
  ];

  const handleMainImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setIsAnimating(true);
        setPetIDFormData((prev) => ({
          ...prev,
          mainImage: reader.result,
        }));
        setTimeout(() => setIsAnimating(false), 1000);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleToggleChange = (section, index) => {
    const updated = [...petIDFormData[section]];
    updated[index].visible = !updated[index].visible;
    setPetIDFormData({ ...petIDFormData, [section]: updated });
  };

  const handleOwnerToggle = () => {
    setPetIDFormData((prev) => ({
      ...prev,
      ownerInfo: {
        ...prev.ownerInfo,
        visible: !prev.ownerInfo.visible,
      },
    }));
  };

  const handlePetToggle = () => {
    setPetIDFormData((prev) => ({
      ...prev,
      pet: {
        ...prev.pet,
        visible: !prev.pet.visible,
      },
    }));
  };

  const handleAdditionalInfoChange = (index, field, value) => {
    const updated = [...petIDFormData.additionalInfo];
    updated[index][field] = value;

    // Set placeholder based on type
    if (field === "type") {
      updated[index].placeholder = getPlaceholder(value);
      updated[index].label =
        additionalInfoOptions.find((opt) => opt.value === value)?.label || "";
    }

    setPetIDFormData({ ...petIDFormData, additionalInfo: updated });
  };

  const getPlaceholder = (type) => {
    switch (type) {
      case "phone":
        return "+91-0000000000";
      case "email":
        return "example@mail.com";
      case "address":
        return "Enter physical address";
      case "link":
        return "https://yourlink.com";
      case "video":
        return "Upload video";
      case "medical":
        return "Enter medical info";
      default:
        return "";
    }
  };

  const handlePetChange = (field, value) => {
    setPetIDFormData((prev) => ({
      ...prev,
      pet: {
        ...prev.pet,
        [field]: value,
      },
    }));
  };

  const handleOwnerChange = (field, value) => {
    setPetIDFormData((prev) => ({
      ...prev,
      ownerInfo: {
        ...prev.ownerInfo,
        [field]: value,
      },
    }));
  };

  const handleEmergencyContactChange = (index, field, value) => {
    const updated = [...petIDFormData.emergencyContacts];
    updated[index][field] = value;
    setPetIDFormData({ ...petIDFormData, emergencyContacts: updated });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const readers = files.map((file) => {
      const reader = new FileReader();
      return new Promise((resolve) => {
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers).then((newImages) => {
      setPetIDFormData((prev) => ({
        ...prev,
        pet: {
          ...prev.pet,
          images: [...prev.pet.images, ...newImages],
        },
      }));
    });
  };

  const removeImage = (index) => {
    setPetIDFormData((prev) => ({
      ...prev,
      pet: {
        ...prev.pet,
        images: prev.pet.images.filter((_, i) => i !== index),
      },
    }));
  };

  const handleVideoUpload = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const updated = [...petIDFormData.additionalInfo];
      updated[index].value = reader.result;
      setPetIDFormData({ ...petIDFormData, additionalInfo: updated });
    };
    reader.readAsDataURL(file);
  };

  const addAdditionalInfoField = () => {
    setPetIDFormData((prev) => ({
      ...prev,
      additionalInfo: [
        ...prev.additionalInfo,
        { type: "", label: "", value: "", visible: true, placeholder: "" },
      ],
    }));
  };

  const removeAdditionalInfoField = (index) => {
    const updated = [...petIDFormData.additionalInfo];
    updated.splice(index, 1);
    setPetIDFormData({ ...petIDFormData, additionalInfo: updated });
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    adaptiveHeight: true,
  };

  return (
    <div className=" ">
      <div className="flex flex-col   pt-6 gap-6 max-w-7xl mx-auto pb-6">
        {/* Left Form Section */}
        <div className="w-full">
          <div className=" p-6 rounded-xl  space-y-6">
            {/* Main Image Upload Card */}
            <div className="p-5 bg-gray-50 rounded-lg border border-gray-200">
              <label className="block mb-3 text-sm font-medium text-gray-700">
                Main Pet Image (Displayed as Profile)
              </label>
              <div className="flex items-center gap-4">
                <div className="relative">
                  {petIDFormData.mainImage ? (
                    <div
                      className={`w-20 h-20 rounded-full overflow-hidden border-2 border-teal-300 shadow-md ${
                        isAnimating ? "animate-pulse" : ""
                      }`}
                    >
                      <img
                        src={petIDFormData.mainImage}
                        alt="Main Pet"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-gray-200 border-2 border-dashed border-gray-400 flex items-center justify-center">
                      <span className="text-gray-500 text-xs text-center">
                        No Image
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleMainImageChange}
                    className="block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-md file:border-0
                      file:text-sm file:font-semibold
                      file:bg-teal-100 file:text-teal-700
                      hover:file:bg-teal-200"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    This will be displayed as the main profile image
                  </p>
                </div>
              </div>
            </div>

            {/* Tag Title Card */}
            <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-teal-700 mb-3">
                Tag Information
              </h3>
              <input
                value={petIDFormData.tagTitle}
                onChange={(e) =>
                  setPetIDFormData({
                    ...petIDFormData,
                    tagTitle: e.target.value,
                  })
                }
                placeholder="Give your pet tag a title"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
              />
            </div>

            {/* Owner Information Card */}
            <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold text-teal-700">
                  Owner Information
                </h3>
                <Toggle
                  checked={petIDFormData.ownerInfo.visible}
                  onChange={handleOwnerToggle}
                />
              </div>
              {petIDFormData.ownerInfo.visible && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      placeholder="Your name"
                      value={petIDFormData.ownerInfo.name}
                      onChange={(e) =>
                        handleOwnerChange("name", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      placeholder="Phone number"
                      value={petIDFormData.ownerInfo.phone}
                      onChange={(e) =>
                        handleOwnerChange("phone", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      placeholder="Email address"
                      value={petIDFormData.ownerInfo.email}
                      onChange={(e) =>
                        handleOwnerChange("email", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <input
                      placeholder="Your address"
                      value={petIDFormData.ownerInfo.address}
                      onChange={(e) =>
                        handleOwnerChange("address", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Pet Information Card */}
            <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold text-teal-700">
                  Pet Information
                </h3>
                <Toggle
                  checked={petIDFormData.pet.visible}
                  onChange={handlePetToggle}
                />
              </div>

              {petIDFormData.pet.visible && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Pet Name*
                      </label>
                      <input
                        placeholder="Buddy"
                        value={petIDFormData.pet.name}
                        onChange={(e) =>
                          handlePetChange("name", e.target.value)
                        }
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Species
                      </label>
                      <input
                        placeholder="Dog, Cat, etc"
                        value={petIDFormData.pet.species}
                        onChange={(e) =>
                          handlePetChange("species", e.target.value)
                        }
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Breed
                      </label>
                      <input
                        placeholder="Golden Retriever"
                        value={petIDFormData.pet.breed}
                        onChange={(e) =>
                          handlePetChange("breed", e.target.value)
                        }
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Gender
                      </label>
                      <input
                        placeholder="Male/Female"
                        value={petIDFormData.pet.gender}
                        onChange={(e) =>
                          handlePetChange("gender", e.target.value)
                        }
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Birth Date
                      </label>
                      <input
                        type="date"
                        value={petIDFormData.pet.birthDate}
                        onChange={(e) =>
                          handlePetChange("birthDate", e.target.value)
                        }
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Color/Markings
                      </label>
                      <input
                        placeholder="Golden, white paws"
                        value={petIDFormData.pet.color}
                        onChange={(e) =>
                          handlePetChange("color", e.target.value)
                        }
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Microchip ID
                      </label>
                      <input
                        placeholder="Microchip number"
                        value={petIDFormData.pet.microchip}
                        onChange={(e) =>
                          handlePetChange("microchip", e.target.value)
                        }
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Special Needs/Medical Conditions
                      </label>
                      <textarea
                        placeholder="Any special care requirements"
                        value={petIDFormData.pet.specialNeeds}
                        onChange={(e) =>
                          handlePetChange("specialNeeds", e.target.value)
                        }
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                        rows="3"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Veterinarian Information
                      </label>
                      <textarea
                        placeholder="Vet name and contact"
                        value={petIDFormData.pet.vetInfo}
                        onChange={(e) =>
                          handlePetChange("vetInfo", e.target.value)
                        }
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                        rows="2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Dietary Requirements
                      </label>
                      <textarea
                        placeholder="Special diet or feeding instructions"
                        value={petIDFormData.pet.diet}
                        onChange={(e) =>
                          handlePetChange("diet", e.target.value)
                        }
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                        rows="2"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Pet Photos
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      multiple
                      className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-md file:border-0
                        file:text-sm file:font-semibold
                        file:bg-teal-100 file:text-teal-700
                        hover:file:bg-teal-200"
                    />
                    {petIDFormData.pet.images.length > 0 && (
                      <div className="mt-3 grid grid-cols-3 gap-3">
                        {petIDFormData.pet.images.map((img, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={img}
                              alt={`pet-${index}`}
                              className="h-24 w-full object-cover rounded-lg"
                            />
                            <button
                              onClick={() => removeImage(index)}
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Emergency Contacts Card */}
            <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-teal-700 mb-3">
                Emergency Contacts
              </h3>
              {petIDFormData.emergencyContacts.map((contact, index) => (
                <div
                  key={index}
                  className="mb-4 last:mb-0 border-b pb-4 last:border-b-0 last:pb-0"
                >
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium text-teal-600">
                      Contact #{index + 1}
                    </h4>
                    <div className="flex items-center">
                      <Toggle
                        checked={contact.visible}
                        onChange={() =>
                          handleToggleChange("emergencyContacts", index)
                        }
                      />
                      {petIDFormData.emergencyContacts.length > 1 && (
                        <button
                          onClick={() => {
                            const updated = [
                              ...petIDFormData.emergencyContacts,
                            ];
                            updated.splice(index, 1);
                            setPetIDFormData({
                              ...petIDFormData,
                              emergencyContacts: updated,
                            });
                          }}
                          className="ml-3 text-red-500 hover:text-red-700 transition-colors"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>

                  {contact.visible && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Name
                        </label>
                        <input
                          placeholder="Contact name"
                          value={contact.name}
                          onChange={(e) =>
                            handleEmergencyContactChange(
                              index,
                              "name",
                              e.target.value
                            )
                          }
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Relationship
                        </label>
                        <input
                          placeholder="Vet, family, etc"
                          value={contact.relationship}
                          onChange={(e) =>
                            handleEmergencyContactChange(
                              index,
                              "relationship",
                              e.target.value
                            )
                          }
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone
                        </label>
                        <input
                          placeholder="Phone number"
                          value={contact.phone}
                          onChange={(e) =>
                            handleEmergencyContactChange(
                              index,
                              "phone",
                              e.target.value
                            )
                          }
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <button
                onClick={() =>
                  setPetIDFormData((prev) => ({
                    ...prev,
                    emergencyContacts: [
                      ...prev.emergencyContacts,
                      {
                        name: "",
                        relationship: "",
                        phone: "",
                        visible: true,
                      },
                    ],
                  }))
                }
                className="mt-3 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Add Emergency Contact
              </button>
            </div>

            {/* Additional Information Card */}
            <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-teal-700 mb-3">
                Additional Information
              </h3>
              {petIDFormData.additionalInfo.map((field, index) => (
                <div key={index} className="mb-4 last:mb-0">
                  <div className="flex justify-between items-center mb-2">
                    <div className="w-full">
                      <DropdownSelect
                        options={additionalInfoOptions}
                        value={field.type}
                        onChange={(value) =>
                          handleAdditionalInfoChange(index, "type", value)
                        }
                        placeholder="Select information type"
                      />
                    </div>
                    <div className="ml-3 flex items-center">
                      <Toggle
                        checked={field.visible}
                        onChange={() =>
                          handleToggleChange("additionalInfo", index)
                        }
                      />
                      {petIDFormData.additionalInfo.length > 1 && (
                        <button
                          onClick={() => removeAdditionalInfoField(index)}
                          className="ml-3 text-red-500 hover:text-red-700 transition-colors"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  </div>

                  {field.type && (
                    <div className="mt-2">
                      {field.type === "video" ? (
                        <div>
                          <input
                            type="file"
                            accept="video/*"
                            onChange={(e) => handleVideoUpload(e, index)}
                            className="block w-full text-sm text-gray-500
                              file:mr-4 file:py-2 file:px-4
                              file:rounded-md file:border-0
                              file:text-sm file:font-semibold
                              file:bg-teal-100 file:text-teal-700
                              hover:file:bg-teal-200"
                          />
                          {field.value && (
                            <div className="mt-2">
                              <video controls className="w-full rounded-lg">
                                <source src={field.value} type="video/mp4" />
                              </video>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {field.label}
                          </label>
                          <input
                            value={field.value}
                            onChange={(e) =>
                              handleAdditionalInfoChange(
                                index,
                                "value",
                                e.target.value
                              )
                            }
                            placeholder={field.placeholder}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
              <button
                onClick={addAdditionalInfoField}
                className="mt-3 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Add More Information
              </button>
            </div>
            <div className="flex justify-center">
              <button
                onClick={addAdditionalInfoField}
                className="mt-3 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetIDTagContent;
