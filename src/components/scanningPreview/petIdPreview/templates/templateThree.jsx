import React from "react";
import PetIdCardLayout from "./petIdLayout";


const PetIdTemplateThree = ({ petIDFormData }) => {
  const backgroundImage = "/pet-id/pet3.webp";
  return <PetIdCardLayout backgroundImage={backgroundImage} petIDFormData={petIDFormData} />;
};

export default PetIdTemplateThree;
