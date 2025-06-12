

"use client";

import React, { useEffect, useState } from "react";
import { ServicesContext } from "./ServicesContext";
const ServicesProvider = ({ children }) => {
  // business service
    const [businessForm, setBusinessForm] = useState({
        name: "",
        heading: "",
        subheading: "",
        businessName: "",
        mobile: "",
        designation: "",
        address: "",
        mapLink: "",
        email: "",
        password: "",
        socialLink: "",
    });
    const [profileImage, setProfileImage] = useState(null);
    const [brandLogo, setBrandLogo] = useState(null);

    //products
        const [productData, setProductData] = useState({
        heading: "",
        description: "",
        pageUrl: "",
        videoUrl: "",
        manual: null,
        email: "",
        phone: "",
        password: "",
        selectedTemplate: null,
    });

    const [productImage, setProductImage] = useState(null);

    //audio, video
    const [titleFormData, setTitleFormData] = useState({
        title: "",
        description: "",
        file: null,
        password: "",
      });

       //gallery
    const [imagesFormData, setImagesFormData] = useState({
    title: "",
    description: "",
    files: [], // Changed from 'file: null' to 'files: []' for multiple files
    password: "",
  });

  //document
const [resumeFormData, setResumeFormData] = useState({
    title: "",
    description: "",
    documentFile: null, // Changed from 'resumeFile' to 'documentFile'
    documentUrl: "", // Changed from 'resumeUrl' to 'documentUrl'
    password: "",
  });

  

//pet id tag
  const [petIDFormData, setPetIDFormData] = useState({
    tagTitle: "",
    mainImage: null,
    ownerInfo: {
      name: "",
      phone: "",
      email: "",
      address: "",
      visible: true,
    },
    pet: {
      name: "",
      breed: "",
      species: "",
      gender: "",
      birthDate: "",
      color: "",
      microchip: "",
      specialNeeds: "",
      vetInfo: "",
      diet: "",
      images: [],
      visible: true,
    },
    password: "",
    emergencyContacts: [
      { name: "", relationship: "", phone: "", visible: true },
    ],
    additionalInfo: [
      { type: "", label: "", value: "", visible: true, placeholder: "" },
    ],
  });
const [isAnimating, setIsAnimating] = useState(false);

  return (
    <ServicesContext.Provider
      value={{
        businessForm, setBusinessForm,profileImage, setProfileImage,brandLogo, setBrandLogo,productData, setProductData,productImage, setProductImage,titleFormData, setTitleFormData,petIDFormData, setPetIDFormData,isAnimating, setIsAnimating,imagesFormData, setImagesFormData,resumeFormData, setResumeFormData
      }}
    >
      {children}
    </ServicesContext.Provider>
  );
};

export default ServicesProvider;
