import CardsTemplate from "./cardsTemplate";

const TemplateTwo = ({ businessForm }) => (
  <CardsTemplate
    businessForm={businessForm}
    styles={{
      containerBg: "bg-[#fce7e0]/70",
      fontFamily: "Lato, sans-serif",
      nameColor: "text-pink-600",
      subheadingColor: "text-gray-500",
      profileBorder: "border-pink-200",
      button: "bg-white text-pink-600 shadow hover:bg-gray-50",
    }}
  />
);

export default TemplateTwo;
