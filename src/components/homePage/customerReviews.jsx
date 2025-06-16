// "use client";

// import React from "react";
// import { motion } from "framer-motion";
// import { useLanguage } from '@/context/languageContext/LanguageContext';

// const testimonials = [
//   {
//     title: "Impressive design options that amplify QR appeal!",
//     content: `ZM QR Code Services exceeded all expectations. I found QR generation to be simple, intuitive, and surprisingly powerful. 
//     The variety of templates allowed me to design high-quality QR codes tailored to different use cases — from WhatsApp links to brochures.
//     With just a few clicks, I was able to create visually stunning, branded QR codes. It’s easily the most user-friendly and flexible QR tool I’ve used.`,
//     author: "Rajesh Mehta – Marketing Director",
//   },
//   {
//     title: "Effortless bulk QR generation process!",
//     content: `I had to prepare personalized QR codes for a national HR onboarding event across multiple cities. 
//     With ZM’s bulk generator, I simply uploaded a CSV file with employee details and generated 200+ QR codes in under a minute. 
//     The automation saved hours of manual work. On top of that, each code was branded and pre-formatted — no additional tweaking needed. Incredible tool!`,
//     author: "Pooja Sharma – HR Head, Zenith Tech",
//   },
//   {
//     title: "Game-changing service with powerful insights!",
//     content: `ZM QR Code Services helped us track real-time engagement across our campaign banners and email signatures. 
//     The analytics dashboard shows exactly how many scans, when, and from which location. 
//     We identified peak engagement times and optimized our marketing accordingly. 
//     This data-driven approach gave us a significant edge in converting leads.`,
//     author: "Amit Desai – Growth Strategist",
//   },
//   {
//     title: "Customization made our campaigns stand out",
//     content: `As a design-centric brand, we needed QR codes that aligned with our visual identity. 
//     ZM allowed us to choose unique shapes, change colors, and even embed our logo seamlessly. 
//     The results were stunning — elegant QR codes that matched our flyers, product tags, and packaging. 
//     It’s rare to find a QR solution that understands the importance of branding so well.`,
//     author: "Divya Nair – Creative Lead, Bloom & Co.",
//   },
//   {
//     title: "Seamless API integration for developers",
//     content: `As a backend engineer, I integrated the ZM QR Code API into our CRM in just a few hours. 
//     The API documentation is clear, concise, and comes with useful examples. 
//     We now auto-generate dynamic QR codes every time a new customer is registered. 
//     ZM offers developer-friendly solutions with enterprise-grade reliability.`,
//     author: "Karan Patel – Senior Developer, FinEdge",
//   },
//   {
//     title: "Reliable platform with exceptional uptime",
//     content: `We’ve relied on ZM QR Code Services to power logistics QR labels across our nationwide network. 
//     Over the past 6 months, we’ve generated more than 10,000 QR codes — not a single error or downtime.
//     Every code scanned successfully on mobile and handheld scanners. This level of reliability is rare and exactly what our operations needed.`,
//     author: "Sneha Rao – Operations Manager, DeliverX",
//   },
// ];

// const cardVariants = {
//   hidden: { opacity: 0, y: 50 },
//   visible: (i) => ({
//     opacity: 1,
//     y: 0,
//     transition: {
//       delay: i * 0.2,
//       duration: 0.6,
//       ease: "easeOut",
//     },
//   }),
// };

// const CustomerReviews = () => {
//     const { dictionary } = useLanguage();
//   return (
//     <section className="bg-[#f5f7fb] py-20 px-4 md:px-12">
//       {/* <h2 className="text-center text-3xl md:text-4xl font-extrabold text-blue-900 mb-10">
//         Hear What Our Customers Have to Say!
//       </h2> */}
//       <h2 className="text-center text-3xl md:text-4xl font-extrabold text-blue-900 mb-10">
//         {dictionary.customerReviews.heading}
//       </h2>

//       {/* Rating Cards */}
//       <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-12">
//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           viewport={{ once: true }}
//           className="bg-mainGreen text-white px-6 py-5 rounded-2xl backdrop-blur-sm shadow-xl"
//         >
//           <div className="text-3xl mb-2">⭐⭐⭐⭐⭐ 4.5/5</div>
//           {/* <p className="text-sm opacity-80">Based on 48,000+ reviews on ZM QR Code Services</p> */}
//           <p className="text-sm opacity-80">{}</p>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.2 }}
//           viewport={{ once: true }}
//           className="bg-[#227171] text-white px-6 py-5 rounded-2xl shadow-xl backdrop-blur-md"
//         >
//           <div className="text-3xl mb-2">⭐⭐⭐⭐⭐</div>
//           <p className="text-sm">Trusted by companies across India – for all industries</p>
//         </motion.div>
//       </div>

//       {/* Testimonial Cards */}
//       <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
//         {testimonials.map((item, i) => (
//           <motion.div
//             key={i}
//             custom={i}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//             variants={cardVariants}
//             className="bg-white p-6 rounded-xl shadow-md flex flex-col justify-between border border-gray-100"
//           >
//             <div className="text-2xl text-mainGreen font-bold mb-4">“{item.title}”</div>
//             <p className="text-gray-700 text-sm mb-6 leading-relaxed whitespace-pre-line">{item.content}</p>
//             <div className="text-darkGreen font-bold text-sm">{item.author}</div>
//           </motion.div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default CustomerReviews;


"use client";
import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/languageContext/LanguageContext";

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const CustomerReviews = () => {
  const { dictionary } = useLanguage();
  const testimonials = dictionary?.customerReviews?.testimonials || [];

  return (
    <section className="bg-[#f5f7fb] py-20 px-4 md:px-12">
      <h2 className="text-center text-3xl md:text-4xl font-extrabold text-blue-900 mb-10">
        {dictionary.customerReviews.heading}
      </h2>

      <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-mainGreen text-white px-6 py-5 rounded-2xl backdrop-blur-sm shadow-xl"
        >
          <div className="text-3xl mb-2">⭐⭐⭐⭐⭐ 4.5/5</div>
          <p className="text-sm opacity-80">
            {dictionary.customerReviews.ratings.reviewText1}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-[#227171] text-white px-6 py-5 rounded-2xl shadow-xl backdrop-blur-md"
        >
          <div className="text-3xl mb-2">⭐⭐⭐⭐⭐</div>
          <p className="text-sm">
            {dictionary.customerReviews.ratings.reviewText2}
          </p>
        </motion.div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {testimonials.map((item, i) => (
          <motion.div
            key={i}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            className="bg-white p-6 rounded-xl shadow-md flex flex-col justify-between border border-gray-100"
          >
            <div className="text-2xl text-mainGreen font-bold mb-4">“{item.title}”</div>
            <p className="text-gray-700 text-sm mb-6 leading-relaxed whitespace-pre-line">{item.content}</p>
            <div className="text-darkGreen font-bold text-sm">{item.author}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CustomerReviews;
