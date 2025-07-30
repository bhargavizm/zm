import CardsTemplate from "./cardsTemplate";

const TemplateFour = ({ businessForm, profileImage }) => (
  <CardsTemplate
    businessForm={businessForm}
    profileImage={profileImage}
    styles={{
      containerBg: "bg-[#f9f7f3]/70",
      fontFamily: "'Dancing Script', cursive",
      nameColor: "text-gray-800 italic",
      subheadingColor: "text-gray-400 font-montserrat",
      profileBorder: "border-white",
      button: "bg-white text-gray-900 border border-gray-400 hover:bg-gray-100",
    }}
  />
);

export default TemplateFour;
