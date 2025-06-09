"use client";

import React from "react";
import { TiBusinessCard } from "react-icons/ti";
import { BsFillCartCheckFill } from "react-icons/bs";
import { SiGoogleforms } from "react-icons/si";
import { BsPersonVcard } from "react-icons/bs";
import { FaFilePdf } from "react-icons/fa6";
import { MdPets } from "react-icons/md";
import Link from "next/link";
import { MdArrowForwardIos } from "react-icons/md";

const DesignSection = () => {
  return (
    <div className="px-14 py-8">
      <div className="grid grid-cols-8  ">
        <div className="flex flex-col items-center justify-center cursor-pointer group transition-all duration-300">
          <Link
            href="/services/business-cards"
            className="w-14 h-14 flex items-center justify-center rounded-full bg-transparent transition-all duration-300 group-hover:bg-white"
          >
            <TiBusinessCard
              size={28}
              className="text-white transition-all duration-300 group-hover:text-darkGreen"
            />
          </Link>

          <p className="text-white text-md  transition-colors duration-300 group-hover:font-bold group-hover:text-darkGreen">
            Business Card
          </p>
        </div>

        <div className="flex flex-col items-center justify-center cursor-pointer group transition-all duration-300">
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-transparent transition-all duration-300 group-hover:bg-white">
            <BsPersonVcard
              size={28}
              className="text-white transition-all duration-300 group-hover:text-darkGreen"
            />
          </div>

          <p className="text-white text-md  transition-colors duration-300 group-hover:font-bold group-hover:text-darkGreen">
            V Cards
          </p>
        </div>

        <div className="flex flex-col items-center justify-center cursor-pointer group transition-all duration-300">
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-transparent transition-all duration-300 group-hover:bg-white">
            <SiGoogleforms
              size={28}
              className="text-white transition-all duration-300 group-hover:text-darkGreen"
            />
          </div>

          <p className="text-white text-md  transition-colors duration-300 group-hover:font-bold group-hover:text-darkGreen">
            Form QR Codes
          </p>
        </div>

        <div className="flex flex-col items-center justify-center cursor-pointer group transition-all duration-300">
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-transparent transition-all duration-300 group-hover:bg-white">
            <FaFilePdf
              size={28}
              className="text-white transition-all duration-300 group-hover:text-darkGreen"
            />
          </div>

          <p className="text-white text-md  transition-colors duration-300 group-hover:font-bold group-hover:text-darkGreen">
            PDF
          </p>
        </div>

        <div className="flex flex-col items-center justify-center cursor-pointer group transition-all duration-300">
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-transparent transition-all duration-300 group-hover:bg-white">
            <BsFillCartCheckFill
              size={28}
              className="text-white transition-all duration-300 group-hover:text-darkGreen"
            />
          </div>

          <p className="text-white text-md  transition-colors duration-300 group-hover:text-darkGreen">
            Product QR Codes
          </p>
        </div>

        <div className="flex flex-col items-center justify-center cursor-pointer group transition-all duration-300">
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-transparent transition-all duration-300 group-hover:bg-white">
            <MdPets
              size={28}
              className="text-white transition-all duration-300 group-hover:text-darkGreen"
            />
          </div>

          <p className="text-white text-md  transition-colors duration-300 group-hover:font-bold group-hover:text-darkGreen">
            Pet ID Tag
          </p>
        </div>

        {/* <div className="flex flex-col items-center justify-center cursor-pointer group transition-all duration-300">
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-transparent transition-all duration-300 group-hover:bg-skyBlue">
            <TiBusinessCard
              size={28}
              className="text-darkGreen transition-all duration-300 group-hover:text-white"
            />
          </div>

          <p className="text-darkGreen text-md  transition-colors duration-300 group-hover:font-bold group-hover:text-skyBlue">
            Business Card
          </p>
        </div> */}

        <Link
          href="/services"
          className="flex flex-col items-center justify-center cursor-pointer group transition-all duration-300"
        >
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-transparent transition-all duration-300 group-hover:bg-white">
            <MdArrowForwardIos
              size={28}
              className="text-white transition-all duration-300 group-hover:text-darkGreen"
            />
          </div>

          <p className="text-white text-md  transition-colors duration-300 group-hover:font-bold group-hover:text-darkGreen">
            More
          </p>
        </Link>
      </div>
    </div>
  );
};

export default DesignSection;
