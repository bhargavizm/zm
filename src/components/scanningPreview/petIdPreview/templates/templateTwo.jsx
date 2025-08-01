import React from "react";
import PetIdCardLayout from "./petIdLayout";


const PetIdTemplateTwo = ({ petIDFormData }) => {
  const backgroundImage = "/pet-id/pet2.webp";
  return <PetIdCardLayout backgroundImage={backgroundImage} petIDFormData={petIDFormData} />;
};

export default PetIdTemplateTwo;
