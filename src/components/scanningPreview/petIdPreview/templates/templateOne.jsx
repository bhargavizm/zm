import React from "react";
import PetIdCardLayout from "./petIdLayout";


const PetIdTemplateOne = ({ petIDFormData }) => {
  const backgroundImage = "/pet-id/pet1.webp";
  return <PetIdCardLayout backgroundImage={backgroundImage} petIDFormData={petIDFormData} />;
};

export default PetIdTemplateOne;
