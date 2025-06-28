"use client";

import React from "react";
import { useLanguage } from "@/context/languageContext/LanguageContext";
import Link from "next/link";

const RefundPolicyPage = () => {
  const { dictionary } = useLanguage();

  return (
    <div className="relative flex flex-col items-center justify-start px-5 py-28 bg-[#008080] overflow-hidden text-white">
      {/* Simulated Noise */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:20px_20px] opacity-20 mix-blend-overlay pointer-events-none z-0" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl text-center space-y-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold drop-shadow-md animate-fade-in tracking-wide">
          {dictionary.refund_policy.title}
        </h1>

        <div className="bg-white backdrop-blur-md rounded-xl shadow-2xl p-6  sm:p-10 text-gray-800 border border-[#ccf0ec] animate-fade-in-up space-y-6 text-left">
          <p className=" leading-relaxed ">
            {/* {dictionary.refund_policy.intro} */}
            Thank you for choosing ZM QR Code Services. We value your trust and
            are committed to providing high-quality digital services and
            customer support. Please review our refund policy carefully before
            making a purchase.
          </p>
          <h2 className="font-bold text-xl">
            1. No Refund Policy for Digital Services
          </h2>
          <p>
            Once access is granted to our digital products and services,{" "}
            <strong>no refunds will be issued.</strong> This includes, but is
            not limited to:
          </p>

          <ul className="list-disc px-9">
            <li>QR Code generators and management systems</li>
            <li>Software tools and applications</li>
            <li>Digital learning materials, documentation, and user guides</li>
          </ul>

          <p>
            {" "}
            All digital products are <strong>final sale</strong> and
            non-returnable upon delivery or activation.
          </p>

          <h2 className="font-bold text-xl">2. Service Activation</h2>
          <p>
            Refunds are not available{" "}
            <strong>once the service has been activated</strong> or login/access
            credentials have been issued. This policy is in place due to the
            nature of digital products, which cannot be returned once delivered.
          </p>

          <h2 className="font-bold text-xl">
            3. Technical Support and Issue Resolution
          </h2>
          <p>
            If you experience any technical difficulties or billing issues, we
            encourage you to reach out to our support team. We are here to
            assist you with:
          </p>

          <ul className="list-disc px-9">
            <li>Troubleshooting and bug resolution</li>
            <li>Clarifications related to billing or subscription</li>
            <li>Product guidance and usage assistance</li>
          </ul>

          <p>
            We strive to provide a timely and effective resolution to all
            legitimate concerns.
          </p>

          <h2 className="font-bold text-xl">4. Contact Information</h2>
          <p>
            If you have questions about our refund policy or require support,
            please visit our Contact Us page or email us directly at{" "}
            <strong>support@zmqrcode.com.</strong>{" "}
          </p>

          <h2 className="font-bold text-xl">5. Agreement</h2>
          <p>
            By purchasing and using our services, you acknowledge and agree to
            this refund policy. ZM QR Code Services reserves the right to update
            or modify this policy at any time without prior notice.
          </p>

          <div className="space-y-2">
            <p className="font-semibold text-lg">ZM QR Code Services</p>
            <p>
              Website:&nbsp;
              <a
                href="https://zmqrcode.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                zmqrcode.com
              </a>{" "}
              &nbsp;| &nbsp;
              <a
                href="https://zmqrcode.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                zmqrcode.in
              </a>
            </p>
            <p>
              Support Email:&nbsp;
              <a
                href="mailto:support@zmqrcode.com"
                className="text-blue-600 underline"
              >
                support@zmqrcode.com
              </a>
            </p>
          </div>

          {/* <ul className="list-disc list-inside ml-4 text-sm sm:text-base text-gray-700">
            {dictionary.refund_policy.points.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
          <p className="text-sm sm:text-base text-gray-700">
            {dictionary.refund_policy.strict_policy}
          </p>
          <p className="text-sm sm:text-base text-gray-700">
            {dictionary.refund_policy.support_info}
          </p>
          <p className="text-sm sm:text-base text-gray-700">
            {dictionary.refund_policy.contact_prompt}{" "}
            <Link
              href="/contactUs"
              className="text-[#004d4d] font-semibold underline hover:text-[#003030] transition"
            >
              {dictionary.refund_policy.contact_link}
            </Link>{" "}
            {dictionary.refund_policy.contact_suffix}
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default RefundPolicyPage;
