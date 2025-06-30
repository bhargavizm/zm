"use client";
import React, { useState } from "react";
import PreviewPanel from "@/components/homePage/customizedQRCodeDesigns/previewTab/previewPanel";

import { IoEyeOutline } from "react-icons/io5";
import { MdQrCodeScanner } from "react-icons/md";
import { FaLongArrowAltDown } from "react-icons/fa";
import { useParams } from "next/navigation";
import QRCodeTab from "../tabsContent/qrTabContent/qrcodeTab";
import BackdropDesigns from "../tabsContent/backDropDesigns/backdropDesigns";
import ComingSoonModal from "@/components/modalPopUps/comingSoonModal";

const tabs = ["Content", "Backdrop Designs", "QR Code"];

const encryptedSlugs = ["audios", "videos", "gallery", "pdf"];

const DesignLayout = ({ ContentTabComponent, PreviewTabComponent }) => {
  const { slug } = useParams();
  const [activeTab, setActiveTab] = useState("Content");
  const [activePreview, setActivePreview] = useState("eye");

  const [showModal, setShowModal] = useState(false);

  const handleClick = () => setShowModal(true);

  const formatServiceName = (slug) => {
    const name = slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    return encryptedSlugs.includes(slug)
      ? `${name} (Encrypted Service) `
      : name;
  };

  return (
    <>
      <section className="pt-8">
        {/* desktop layout */}
        <div className="hidden md:block">
          <div className="grid md:grid-cols-12  grid-cols-1 gap-4 mx-2 sm:mx-6 md:mx-4">
            {/* Left Panel */}
            <div className="col-span-7 bg-white rounded-3xl shadow-lg">
              <h1 className="text-2xl font-bold py-4 px-6 text-mainGreen ">
                {formatServiceName(slug)}
              </h1>
              {/* ...rest of your layout */}

          {/* Tabs */}
<div className="flex justify-center items-center text-center gap-9 bg-[#58b8b8] px-6 shadow-lg py-3 mb-4">
  {tabs.map((tab) => (
    <button
      key={tab}
      onClick={() => setActiveTab(tab)}
      className={`px-2 py-1 text-lg whitespace-nowrap rounded-xl transition-all duration-200 ${
        activeTab === tab
          ? "bg-white text-mainGreen font-bold"
          : "text-white hover:bg-white hover:text-mainGreen"
      }`}
    >
      {tab}
    </button>
  ))}
</div>


              {/* Tab Content */}
              <div className="px-4 pb-6 h-[100vh] overflow-y-auto scrollbar-hide">
                {activeTab === "Content" && <ContentTabComponent />}

                {activeTab === "Backdrop Designs" && <BackdropDesigns />}

                {activeTab === "QR Code" && <QRCodeTab />}
              </div>
            </div>

            {/* Right Preview Panel */}
            <div className="col-span-5 bg-white rounded-3xl shadow-lg py-8  lg:mt-0">
              <div className="flex justify-center gap-4 px-4 mb-4 bg-[#58b8b8] shadow-lg py-2 mt-7 ">
                <div
                  onClick={() => setActivePreview("scan")}
                  className={`p-3 rounded-full cursor-pointer ${
                    activePreview === "scan"
                      ? "bg-white text-green-600 shadow-md"
                      : "text-gray-600 hover:bg-white hover:text-green-600"
                  }`}
                >
                  <MdQrCodeScanner size={24} />
                </div>
                <div
                  onClick={() => setActivePreview("eye")}
                  className={`p-3 rounded-full cursor-pointer ${
                    activePreview === "eye"
                      ? "bg-white text-mainGreen shadow-md"
                      : "text-gray-600 hover:bg-white hover:text-green-600"
                  }`}
                >
                  <IoEyeOutline size={24} />
                </div>
              </div>

              <div className="px-4">
                {activePreview === "scan" && (
                  <>
                    <PreviewPanel />
                    <div className="flex justify-center items-center py-6">
                      <button
                        onClick={handleClick}
                        className="  px-6 py-2 cursor-pointer text-xl text-white font-bold rounded-lg flex justify-center items-center gap-2 bg-[linear-gradient(to_right,#008080,#001a1a)]"
                      >
                        Download  <FaLongArrowAltDown />
                      </button>
                    </div>
                  </>
                )}
                {activePreview === "eye" && (
                  <div className="flex justify-center items-center py-4 rounded-xl">
                    {/* Top Notch */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-5 bg-black rounded-b-2xl z-10"></div>

                    {/* Content Area */}
                    <div className="flex-1 w-full px-4 pt-8 pb-6 overflow-auto">
                      <PreviewTabComponent />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* mobile layout */}
        <div className="md:hidden bg-white rounded-xl shadow-xl w-full  relative pb-4 overflow-y-auto scrollbar-hide">

          <div className="grid md:grid-cols-12  grid-cols-1 gap-4 md:mx-9">
                      <h1 className="text-xl font-bold px-6 pt-4 text-mainGreen ">
                {formatServiceName(slug)}
              </h1>
            {/* left Preview Panel */}
            <div className="col-span-6 lg:col-span-5 bg-white rounded-3xl shadow-lg lg:mt-0">
              <div className="flex justify-center gap-4  mb-4 bg-[#58b8b8] shadow-lg py-2 mt-4 ">
                <div
                  onClick={() => setActivePreview("scan")}
                  className={`p-3 rounded-full cursor-pointer ${
                    activePreview === "scan"
                      ? "bg-white text-green-600 shadow-md"
                      : "text-gray-600 hover:bg-white hover:text-green-600"
                  }`}
                >
                  <MdQrCodeScanner size={24} />
                </div>
                <div
                  onClick={() => setActivePreview("eye")}
                  className={`p-3 rounded-full cursor-pointer ${
                    activePreview === "eye"
                      ? "bg-white text-mainGreen shadow-md"
                      : "text-gray-600 hover:bg-white hover:text-green-600"
                  }`}
                >
                  <IoEyeOutline size={24} />
                </div>
              </div>

              <div className="px-4 " >
                {activePreview === "scan" && (
                  <>
                    <div className="h-[40vh] overflow-y-auto scrollbar-hide ">
                      <PreviewPanel />
                      <div className="flex justify-center items-center py-6">
                        <button
                          onClick={handleClick}
                          className="  px-6 py-2 cursor-pointer text-xl text-white font-bold rounded-lg flex justify-center items-center gap-2 bg-[linear-gradient(to_right,#008080,#001a1a)]"
                        >
                          Download  <FaLongArrowAltDown />
                        </button>
                      </div>
                    </div>
                  </>
                )}
                {activePreview === "eye" && (
                  <div className="h-[60vh] overflow-y-auto scrollbar-hide">
                    <div className="flex justify-center items-center py-4 rounded-xl">
                      {/* Top Notch */}
                      {/* <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-5 bg-black rounded-b-2xl z-10"></div> */}

                      {/* Content Area */}
                      <div className="flex-1 w-full pt-8 pb-6 overflow-auto">
                        <PreviewTabComponent />
                      </div>
                    </div>
                  </div>
                )}
              </div>
                
                
            </div>

            {/* right Panel */}
            <div className="col-span-6 lg:col-span-7 bg-white rounded-3xl shadow-lg">
              {/* ...rest of your layout */}

              {/* Tabs */}

              <div className="grid grid-cols-3 md:px-6 bg-[#58b8b8]  shadow-lg py-2 mb-4">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 text-xl rounded-xl cursor-pointer ${
                      activeTab === tab
                        ? "bg-white text-mainGreen font-bold"
                        : "text-darkGreen"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="px-6 pb-6 h-[80vh] overflow-y-auto scrollbar-hide">
                {activeTab === "Content" && <ContentTabComponent />}

                {activeTab === "Backdrop Designs" && <BackdropDesigns />}

                {activeTab === "QR Code" && <QRCodeTab />}
              </div>
            </div>
          </div>
        </div>
      </section>

      {showModal && (
        <ComingSoonModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default DesignLayout;
// "use client";
// import React, { useEffect, useRef, useState } from "react";
// import PreviewPanel from "@/components/homePage/customizedQRCodeDesigns/previewTab/previewPanel";
// import { IoEyeOutline } from "react-icons/io5";
// import { MdQrCodeScanner } from "react-icons/md";
// import { FaLongArrowAltDown, FaBars, FaTimes } from "react-icons/fa";
// import { useParams } from "next/navigation";
// import QRCodeTab from "../tabsContent/qrTabContent/qrcodeTab";
// import BackdropDesigns from "../tabsContent/backDropDesigns/backdropDesigns";
// import ComingSoonModal from "@/components/modalPopUps/comingSoonModal";

// const DesignLayout = ({ ContentTabComponent, PreviewTabComponent }) => {
//   const { slug } = useParams();
//   const [activeTab, setActiveTab] = useState("Content");
//   const [activePreview, setActivePreview] = useState("eye");
//   const [showModal, setShowModal] = useState(false);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false); // 🔥 sidebar toggle
//   const [activeSection, setActiveSection] = useState("content");

//   const handleClick = () => setShowModal(true);

//   const formatServiceName = (slug) => {
//     const name = slug
//       .split("-")
//       .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//       .join(" ");
//     return ["audios", "videos", "gallery", "pdf"].includes(slug)
//       ? `${name} (Encrypted Service)`
//       : name;
//   };

//   // 🔥 Sidebar menu items
//   const sidebarItems = [
//     { name: "Content", action: () => setActiveTab("Content") },
//     {
//       name: "Backdrop Designs",
//       action: () => setActiveTab("Backdrop Designs"),
//     },
//     { name: "QR Code", action: () => setActiveTab("QR Code") },
//     { name: "Eye Preview", action: () => setActivePreview("eye") },
//     { name: "Scan Preview", action: () => setActivePreview("scan") },
//   ];

//   const sidebarRef = useRef();

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
//         setIsSidebarOpen(false);
//       }
//     };

//     if (isSidebarOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     } else {
//       document.removeEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isSidebarOpen]);

//   return (
//     <>
//       <section className="pt-8">
//         {/* Desktop Layout */}
//         <div className="hidden lg:block">
//           <div className="grid md:grid-cols-12 gap-4 mx-4">
//             {/* Left Panel */}
//             <div className="col-span-6 lg:col-span-7 bg-white rounded-3xl shadow-lg">
//               <h1 className="text-2xl font-bold py-4 px-6 text-mainGreen ">
//                 {formatServiceName(slug)}
//               </h1>

//               {/* Tabs */}
//               <div className="grid lg:grid-cols-3 md:grid-cols-2 md:px-6 bg-[#58b8b8] shadow-lg py-2 mb-4">
//                 {["Content", "Backdrop Designs", "QR Code"].map((tab) => (
//                   <button
//                     key={tab}
//                     onClick={() => setActiveTab(tab)}
//                     className={`px-4 py-2 text-xl rounded-xl cursor-pointer ${
//                       activeTab === tab
//                         ? "bg-white text-mainGreen font-bold"
//                         : "text-darkGreen"
//                     }`}
//                   >
//                     {tab}
//                   </button>
//                 ))}
//               </div>

//               {/* Tab Content */}
//               <div className="px-4 pb-6 h-[100vh] overflow-y-auto scrollbar-hide">
//                 {activeTab === "Content" && <ContentTabComponent />}
//                 {activeTab === "Backdrop Designs" && <BackdropDesigns />}
//                 {activeTab === "QR Code" && <QRCodeTab />}
//               </div>
//             </div>

//             {/* Right Preview Panel */}
//             <div className="col-span-6 lg:col-span-5 bg-white rounded-3xl shadow-lg py-8">
//               <div className="flex justify-center gap-4 px-4 mb-4 bg-[#58b8b8] shadow-lg py-2 mt-7">
//                 <div
//                   onClick={() => setActivePreview("scan")}
//                   className={`p-3 rounded-full cursor-pointer ${
//                     activePreview === "scan"
//                       ? "bg-white text-green-600 shadow-md"
//                       : "text-gray-600 hover:bg-white hover:text-green-600"
//                   }`}
//                 >
//                   <MdQrCodeScanner size={24} />
//                 </div>
//                 <div
//                   onClick={() => setActivePreview("eye")}
//                   className={`p-3 rounded-full cursor-pointer ${
//                     activePreview === "eye"
//                       ? "bg-white text-mainGreen shadow-md"
//                       : "text-gray-600 hover:bg-white hover:text-green-600"
//                   }`}
//                 >
//                   <IoEyeOutline size={24} />
//                 </div>
//               </div>

//               <div className="px-4">
//                 {activePreview === "scan" && (
//                   <>
//                     <PreviewPanel />
//                     <div className="flex justify-center items-center py-6">
//                       <button
//                         onClick={handleClick}
//                         className="px-6 py-2 cursor-pointer text-xl text-white font-bold rounded-lg flex justify-center items-center gap-2 bg-[linear-gradient(to_right,#008080,#001a1a)]"
//                       >
//                         Download  <FaLongArrowAltDown />
//                       </button>
//                     </div>
//                   </>
//                 )}
//                 {activePreview === "eye" && (
//                   <div className="flex justify-center items-center py-4 rounded-xl">
//                     <div className="flex-1 w-full px-4 pt-8 pb-6 overflow-auto">
//                       <PreviewTabComponent />
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Mobile Layout with Sidebar 🔥 */}
//         {/* Mobile Layout with Unified Sidebar Menu */}
//         <div className="lg:hidden relative w-full bg-white rounded-xl shadow-xl overflow-hidden pb-6">
//           {/* Sidebar toggle button */}
//           <div className="flex justify-between items-center px-4 py-4  bg-[#58b8b8] shadow-md">
//             <h1 className="text-xl font-bold text-white">
//               {formatServiceName(slug)}
//             </h1>
//             <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
//               {isSidebarOpen ? (
//                 <FaTimes className="text-white text-2xl" />
//               ) : (
//                 <FaBars className="text-white text-2xl" />
//               )}
//             </button>
//           </div>

//           {/* Single Mobile Sidebar menu (5 items) */}
//           {isSidebarOpen && (
//             <div
//               ref={sidebarRef}
//               className="bg-white border-b border-gray-200 shadow-md z-50"
//             >
//               {[
//                 // sidebarItems
//                 { name: "Content", key: "content" },
//                 { name: "Backdrop Designs", key: "backdrop" },
//                 { name: "QR Code", key: "qrcode" },
//                 { name: "Eye Preview", key: "eye" },
//                 { name: "Scan Preview", key: "scan" },
//               ].map((item) => (
//                 <button
//                   key={item.key}
//                   onClick={() => {
//                     setActiveSection(item.key);
//                     setIsSidebarOpen(false);
//                   }}
//                   className={`w-full text-left px-6 py-3 text-lg hover:bg-gray-100 transition-all duration-200 ${
//                     activeSection === item.key
//                       ? "bg-mainGreen text-white font-semibold"
//                       : "text-mainGreen"
//                   }`}
//                 >
//                   {item.name}
//                 </button>
//               ))}
//             </div>
//           )}

//           {/* Unified Panel for all 5 sections h-[100vh] overflow-y-auto scrollbar-hide */}
//           <div className="px-4 py-14">
//             {activeSection === "content" && <ContentTabComponent />}
//             {activeSection === "backdrop" && <BackdropDesigns />}
//             {activeSection === "qrcode" && <QRCodeTab />}
//             {activeSection === "eye" && <PreviewTabComponent />}
//             {activeSection === "scan" && (
//               <>
//                 <PreviewPanel />
//                 <div className="flex justify-center items-center py-6">
//                   <button
//                     onClick={handleClick}
//                     className="px-6 py-2 text-xl text-white font-bold rounded-lg bg-[linear-gradient(to_right,#008080,#001a1a)] flex items-center gap-2"
//                   >
//                     Download  <FaLongArrowAltDown />
//                   </button>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       </section>

//       {showModal && (
//         <ComingSoonModal
//           isOpen={showModal}
//           onClose={() => setShowModal(false)}
//         />
//       )}
//     </>
//   );
// };

// export default DesignLayout;
