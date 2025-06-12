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
    selectedTemplate: "bc.webp",
  });

  const [productImage, setProductImage] = useState(null);

  //audio, vedio
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
    emergencyContacts: [
      { name: "", relationship: "", phone: "", visible: true },
    ],
    additionalInfo: [
      { type: "", label: "", value: "", visible: true, placeholder: "" },
    ],
  });
  const [isAnimating, setIsAnimating] = useState(false);

  //menu book
  const [menuBookFormData, setMenuBookFormData] = useState({
    restaurantName: "",
    menuItems: [
      { name: "", description: "", price: "", image: "", visible: true },
    ],
    extras: [
      {
        type: "phone",
        label: "Phone",
        value: "",
        visible: true,
        placeholder: "+91-0000000000",
      },
      {
        type: "email",
        label: "Email",
        value: "",
        visible: true,
        placeholder: "example@mail.com",
      },
      {
        type: "link",
        label: "Link",
        value: "",
        visible: true,
        placeholder: "https://yourlink.com",
      },
      {
        type: "form",
        label: "Form",
        value: "",
        visible: true,
        placeholder: "https://formurl.com",
      },
      {
        type: "video",
        label: "Video",
        value: "",
        visible: true,
        placeholder: "upload",
      },
    ],
  });

  //sms
  const [smsFormData, setSmsFormData] = useState({
    genderName: "",
    messageType: "",
    textMessage: "",
    date: "",
    password: "",
  });

  //events
  const [eventsFormData, setEventsFormData] = useState({
    organizer: "",
    title: "",
    summary: "",
    buttonLabel: "Buy Tickets",
    buttonLink: "www.YourWebsite.com",
    fromDate: "",
    toDate: "",
    venue: "",
    address: "",
    about: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    webLabel: "My Website",
    webUrl: "www.yourweburl.com",
  });

  //wifi
  const [wifiFormData, setWifiFormData] = useState([
    { ssid: "", password: "", security: "WPA" },
  ]);

  return (
    <ServicesContext.Provider
      value={{
        businessForm,
        setBusinessForm,
        profileImage,
        setProfileImage,
        brandLogo,
        setBrandLogo,
        productData,
        setProductData,
        productImage,
        setProductImage,
        titleFormData,
        setTitleFormData,
        petIDFormData,
        setPetIDFormData,
        isAnimating,
        setIsAnimating,
        imagesFormData,
        setImagesFormData,
        resumeFormData,
        setResumeFormData,
        wifiFormData,
        setWifiFormData,
        menuBookFormData,
        setMenuBookFormData,
        smsFormData,
        setSmsFormData,
        eventsFormData,
        setEventsFormData,
      }}
    >
      {children}
    </ServicesContext.Provider>
  );
};

export default ServicesProvider;
