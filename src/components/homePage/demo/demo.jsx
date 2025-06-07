// "use client";

// import Image from "next/image";
// import React, { useState } from "react";
// import DemoForm from "./demoForm/demoForm";
// import AnimatedButton from "@/components/animatedButton/animatedButton";


// const ScheduleDemo = () => {
//  const [isOpen, setIsOpen] = useState(false);

//   return (
//     <>
//     <section
//       className="relative overflow-hidden w-full text-white bg-scroll-contained"
//       style={{
//         backgroundImage: "url('/images/bg-demo-image.png')",
//         backgroundSize: "100%",
//       }}
//     >
//       <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-10 bg-[rgba(0,128,128,0.6)] padding-lr py-10">
//         {/* Image Column */}
//         <div className="col-span-12 lg:col-span-2 flex justify-center lg:justify-start">
//           <Image
//             src="/images/scan.png"
//             alt="QR Demo"
//             width={250}
//             height={250}
//             className="rounded-full"
//           />
//         </div>

//         {/* Text + Button Column */}
//         <div className="col-span-12 lg:col-span-6 text-center lg:text-left">
//           <h2 className="text-3xl font-bold mb-4 leading-snug text-darkGreen">
//             Book a personalized demo tailored to your use case with one of our QR code experts.
//           </h2>
//           {/* <button
//            onClick={() => setIsOpen(true)}
//             className="bg-skyBlue hover:bg-lightBlue hover:text-white text-xl text-darkGreen font-bold py-2 px-6 rounded-lg mt-4 cursor-pointer"
//           >
//             Schedule a Demo
//           </button> */}
//           <AnimatedButton  onClick={() => setIsOpen(true)} >Schedule a Demo</AnimatedButton>
//         </div>
//       </div>
//     </section>

//      {isOpen && (
//         <DemoForm onClose={() => setIsOpen(false)} />
//       )}
//     </>
//   );
// };

// export default ScheduleDemo;

"use client";

import Image from "next/image";
import React, { useState } from "react";
import DemoForm from "./demoForm/demoForm";
import AnimatedButton from "@/components/animatedButton/animatedButton";

const ScheduleDemo = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <section
        className="relative overflow-hidden w-full text-white bg-scroll-contained bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/bg-demo-image.png')",
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 bg-[rgba(0,128,128,0.6)] padding-lr py-8 md:py-10">
          {/* Image Column */}
          <div className="col-span-12 lg:col-span-2 flex justify-center lg:justify-start">
            <Image
              src="/images/scan.png"
              alt="QR Demo"
              width={250}
              height={250}
              className="rounded-full"
            />
          </div>

          {/* Text + Button Column */}
          <div className="col-span-12 lg:col-span-6 text-center lg:text-left">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 leading-snug text-darkGreen">
              Book a personalized demo tailored to your use case with one of our QR code experts.
            </h2>

            <AnimatedButton
              onClick={() => setIsOpen(true)}
              className="w-full max-w-xs mx-auto lg:mx-0"
            >
              Schedule a Demo
            </AnimatedButton>
          </div>
        </div>
      </section>

      {isOpen && <DemoForm onClose={() => setIsOpen(false)} />}
    </>
  );
};

export default ScheduleDemo;
