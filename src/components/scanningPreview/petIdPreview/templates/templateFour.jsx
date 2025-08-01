import React from "react";
import PetIdCardLayout from "./petIdLayout";


const PetIdTemplateFour = ({ petIDFormData }) => {
  const backgroundImage = "/pet-id/pet4.webp";
  return <PetIdCardLayout backgroundImage={backgroundImage} petIDFormData={petIDFormData} />;
};

export default PetIdTemplateFour;
