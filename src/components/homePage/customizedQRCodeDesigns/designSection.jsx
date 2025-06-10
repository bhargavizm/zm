// "use client";

// import React from "react";
// import { TiBusinessCard } from "react-icons/ti";
// import { BsFillCartCheckFill } from "react-icons/bs";
// import { SiGoogleforms } from "react-icons/si";
// import { BsPersonVcard } from "react-icons/bs";
// import { FaFilePdf } from "react-icons/fa6";
// import { MdPets } from "react-icons/md";
// import Link from "next/link";
// import { MdArrowForwardIos } from "react-icons/md";
// import { useParams } from "next/navigation";

// const DesignSection = () => {
//    const { slug } = useParams();
//    console.log(slug)
//   return (
//     <div className="px-14 py-8">
//       <div className="grid grid-cols-8  ">
//         <Link href="/services/business-cards" className="flex flex-col items-center justify-center cursor-pointer group transition-all duration-300">
//           <div
            
//             className="w-14 h-14 flex items-center justify-center rounded-full bg-transparent transition-all duration-300 group-hover:bg-white"
//           >
//             <TiBusinessCard
//               size={28}
//               className="text-white transition-all duration-300 group-hover:text-darkGreen"
//             />
//           </div>

//           <p className="text-white text-md  transition-colors duration-300 group-hover:font-bold group-hover:text-darkGreen">
//             Business Card
//           </p>
//         </Link>

//         <Link href="/services/v-cards" className="flex flex-col items-center justify-center cursor-pointer group transition-all duration-300">
//           <div className="w-14 h-14 flex items-center justify-center rounded-full bg-transparent transition-all duration-300 group-hover:bg-white">
//             <BsPersonVcard
//               size={28}
//               className="text-white transition-all duration-300 group-hover:text-darkGreen"
//             />
//           </div>

//           <p className="text-white text-md  transition-colors duration-300 group-hover:font-bold group-hover:text-darkGreen">
//             V Cards
//           </p>
//         </Link>

//         <Link href="/services/form-qr" className="flex flex-col items-center justify-center cursor-pointer group transition-all duration-300">
//           <div className="w-14 h-14 flex items-center justify-center rounded-full bg-transparent transition-all duration-300 group-hover:bg-white">
//             <SiGoogleforms
//               size={28}
//               className="text-white transition-all duration-300 group-hover:text-darkGreen"
//             />
//           </div>

//           <p className="text-white text-md  transition-colors duration-300 group-hover:font-bold group-hover:text-darkGreen">
//             Form QR Codes
//           </p>
//         </Link>

//         <Link href='/services/pdf' className="flex flex-col items-center justify-center cursor-pointer group transition-all duration-300">
//           <div className="w-14 h-14 flex items-center justify-center rounded-full bg-transparent transition-all duration-300 group-hover:bg-white">
//             <FaFilePdf
//               size={28}
//               className="text-white transition-all duration-300 group-hover:text-darkGreen"
//             />
//           </div>

//           <p className="text-white text-md  transition-colors duration-300 group-hover:font-bold group-hover:text-darkGreen">
//             PDF
//           </p>
//         </Link>

//         <Link href='/services/product-cards' className="flex flex-col items-center justify-center cursor-pointer group transition-all duration-300">
//           <div className="w-14 h-14 flex items-center justify-center rounded-full bg-transparent transition-all duration-300 group-hover:bg-white">
//             <BsFillCartCheckFill
//               size={28}
//               className="text-white transition-all duration-300 group-hover:text-darkGreen"
//             />
//           </div>

//           <p className="text-white text-md  transition-colors duration-300 group-hover:text-darkGreen">
//             Product QR Codes
//           </p>
//         </Link>

//         <Link href='/services/pet-id-tag' className="flex flex-col items-center justify-center cursor-pointer group transition-all duration-300">
//           <div className="w-14 h-14 flex items-center justify-center rounded-full bg-transparent transition-all duration-300 group-hover:bg-white">
//             <MdPets
//               size={28}
//               className="text-white transition-all duration-300 group-hover:text-darkGreen"
//             />
//           </div>

//           <p className="text-white text-md  transition-colors duration-300 group-hover:font-bold group-hover:text-darkGreen">
//             Pet ID Tag
//           </p>
//         </Link>

//         {/* <div className="flex flex-col items-center justify-center cursor-pointer group transition-all duration-300">
//           <div className="w-14 h-14 flex items-center justify-center rounded-full bg-transparent transition-all duration-300 group-hover:bg-skyBlue">
//             <TiBusinessCard
//               size={28}
//               className="text-darkGreen transition-all duration-300 group-hover:text-white"
//             />
//           </div>

//           <p className="text-darkGreen text-md  transition-colors duration-300 group-hover:font-bold group-hover:text-skyBlue">
//             Business Card
//           </p>
//         </div> */}

//         <Link
//           href="/services"
//           className="flex flex-col items-center justify-center cursor-pointer group transition-all duration-300"
//         >
//           <div className="w-14 h-14 flex items-center justify-center rounded-full bg-transparent transition-all duration-300 group-hover:bg-white">
//             <MdArrowForwardIos
//               size={28}
//               className="text-white transition-all duration-300 group-hover:text-darkGreen"
//             />
//           </div>

//           <p className="text-white text-md  transition-colors duration-300 group-hover:font-bold group-hover:text-darkGreen">
//             More
//           </p>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default DesignSection;
"use client";

import React from "react";
import { TiBusinessCard } from "react-icons/ti";
import { BsFillCartCheckFill, BsPersonVcard } from "react-icons/bs";
import { SiGoogleforms } from "react-icons/si";
import { FaFilePdf } from "react-icons/fa6";
import { MdPets, MdArrowForwardIos } from "react-icons/md";
import Link from "next/link";
import { useParams } from "next/navigation";
import clsx from "clsx";

const tabLinks = [
  { href: "/services/business-cards", label: "Business Card", icon: <TiBusinessCard size={28} /> },
  { href: "/services/v-cards", label: "V Cards", icon: <BsPersonVcard size={28} /> },
  { href: "/services/form-qr", label: "Form QR Codes", icon: <SiGoogleforms size={28} /> },
  { href: "/services/pdf", label: "PDF", icon: <FaFilePdf size={28} /> },
  { href: "/services/product-cards", label: "Product QR Codes", icon: <BsFillCartCheckFill size={28} /> },
  { href: "/services/pet-id-tag", label: "Pet ID Tag", icon: <MdPets size={28} /> },
  { href: "/services", label: "More", icon: <MdArrowForwardIos size={28} /> },
];

const DesignSection = () => {
  const { slug } = useParams();

  return (
    <div className="px-14 py-8">
      <div className="flex justify-center items-center overflow-x-auto space-x-6 border-b border-white/20 pb-4">
        {tabLinks.map(({ href, label, icon }) => {
          const isActive = href.includes(slug);

          return (
            <Link
              key={label}
              href={href}
              className={clsx(
                "flex flex-col items-center justify-center min-w-[90px] group transition-all duration-300",
                isActive && "font-bold text-darkGreen"
              )}
            >
              <div
                className={clsx(
                  "w-14 h-14 flex items-center justify-center rounded-full transition-all duration-300",
                  isActive ? "bg-white text-darkGreen" : "bg-transparent group-hover:bg-white"
                )}
              >
                {React.cloneElement(icon, {
                  className: clsx(
                    "transition-all duration-300",
                    isActive ? "text-darkGreen" : "text-white group-hover:text-darkGreen"
                  ),
                })}
              </div>
              <p
                className={clsx(
                  "text-md transition-colors duration-300",
                  isActive ? "text-darkGreen font-bold" : "text-white group-hover:text-darkGreen"
                )}
              >
                {label}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default DesignSection;
