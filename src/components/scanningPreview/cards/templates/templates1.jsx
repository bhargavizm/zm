// components/templates/TemplateOne.jsx

import CardsTemplate from "./cardsTemplate";

const TemplateOne = ({ businessForm, profileImage }) => (
  <CardsTemplate
    businessForm={businessForm}
    profileImage={profileImage}
    styles={{
      containerBg: "bg-black/70 text-white",
      fontFamily: "Montserrat, sans-serif",
      nameColor: "text-yellow-500",
      subheadingColor: "text-gray-400",
      profileBorder: "border-yellow-500",
      button: "bg-white text-black shadow hover:bg-gray-100",
    }}
  />
);

export default TemplateOne;
