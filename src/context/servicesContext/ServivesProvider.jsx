

"use client";

import React, { useEffect, useState } from "react";
import { ServicesContext } from "./ServicesContext";
const ServicesProvider = ({ children }) => {
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


  return (
    <ServicesContext.Provider
      value={{
       businessForm, setBusinessForm,profileImage, setProfileImage,brandLogo, setBrandLogo
      }}
    >
      {children}
    </ServicesContext.Provider>
  );
};

export default ServicesProvider;
