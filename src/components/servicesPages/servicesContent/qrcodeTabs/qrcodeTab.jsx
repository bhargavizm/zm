"use client";

import DesignModal from "@/components/homePage/customizedQRCodeDesigns/designModal";
import Image from "next/image";
import React, { useState } from "react";

const cardItems = [
  {
    id: 1,
    title: "QR Shapes",
    image: "/images/qr-shapes/qrshapes-1.png",
  },
  {
    id: 2,
    title: "Stickers",
    image: "/images/stickers/stickers.png",
  },
  {
    id: 3,
    title: "Shapes",
    extraImages: [
      "/images/shapes/body-frames/shapes.png",
      "/images/shapes/eye-balls/eye-ball-1.svg",
      "/images/shapes/eye-frames/eye-frame-1.svg",
    ],
  },
  {
    id: 4,
    title: "Colors",
    image: "/images/home/color.webp",
  },
  {
    id: 5,
    title: "Logos",
    image: "/images/logos/cloud.svg",
  },
];

const QRCodeTab = () => {
        const [activeTab, setActiveTab] = useState("QR Shapes");
        const [isModalOpen, setIsModalOpen] = useState(false);
        console.log(activeTab)
  return (
    <>
    <section>
      <h2 className="text-xl font-bold text-darkGreen mb-4">
        Customize QR Code
      </h2>

      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">
        {cardItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center cursor-pointer transition-effects"
            onClick={() => {
                    setActiveTab(item.title);
       // set clicked tab as active
                    setIsModalOpen(true);    // open modal
                  }}
          >
            {/* Only show main image if no extraImages */}
            {!item.extraImages && (
              <Image
                src={item.image}
                alt={item.title}
                width={60}
                height={60}
                className="mb-2 object-cover"
              />
            )}

            <h3 className="text-lg font-semibold text-gray-800 my-3">
              {item.title}
            </h3>

            {/* Render 3 small horizontal images if extraImages are present */}
            {item.extraImages && (
              <div className="flex gap-2 pt-4">
                {item.extraImages.map((src, index) => (
                  <Image
                    key={index}
                    src={src}
                    alt={`Shape ${index + 1}`}
                    width={25}
                    height={25}
                    className="rounded"
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>


     {/* Modal */}
     {isModalOpen && (
        <DesignModal
          setIsModalOpen={setIsModalOpen}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      )}
       </>
  );
};

export default QRCodeTab;
