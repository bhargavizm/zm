import CardsTemplate from "./cardsTemplate";


const TemplateThree = ({ businessForm, profileImage }) => (
  <CardsTemplate
    businessForm={businessForm}
    profileImage={profileImage}
    styles={{
      containerBg: "bg-[#efeae6]/70",
      fontFamily: "'Playfair Display', serif",
      nameColor: "text-gray-800",
      subheadingColor: "text-gray-500",
      profileBorder: "border-gray-200",
      button: "bg-white text-gray-800 border border-gray-400 hover:bg-gray-50",
    }}
  />
);

export default TemplateThree;
