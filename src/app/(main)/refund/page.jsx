"use client";

import React from "react";
import { useLanguage } from "@/context/languageContext/LanguageContext";
import Link from "next/link";

const RefundPolicyPage = () => {
  const { dictionary } = useLanguage();
  const refund = dictionary?.refund_policy;

  if (!refund) return null;

  return (
    <div className="relative flex flex-col items-center justify-start px-5 py-28 bg-[#008080] overflow-hidden text-white">
      {/* Background Noise */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:20px_20px] opacity-20 mix-blend-overlay pointer-events-none z-0" />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-4xl text-center space-y-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold drop-shadow-md animate-fade-in tracking-wide">
          {refund.title}
        </h1>

        <div className="bg-white backdrop-blur-md rounded-xl shadow-2xl p-6 sm:p-10 text-gray-800 border border-[#ccf0ec] animate-fade-in-up space-y-6 text-left">
          <p className="leading-relaxed">{refund.intro}</p>

          {refund.sections.map((section, index) => (
            <div key={index} className="space-y-3">
              <h2 className="font-bold text-xl">{section.heading}</h2>
              <p>{section.content}</p>

              {section.list && (
                <ul className="list-disc px-9">
                  {section.list.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}

              {section.note && (
                <p className="italic text-sm text-gray-600">{section.note}</p>
              )}
            </div>
          ))}

          <div className="space-y-2">
            <p className="font-semibold text-lg">{refund.footer.company}</p>
            <p>
              Website:&nbsp;
              {refund.footer.websites.map((site, index) => (
                <span key={index}>
                  <a
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    {site.label}
                  </a>
                  {index < refund.footer.websites.length - 1 && " | "}
                </span>
              ))}
            </p>
            <p>
              Support Email:&nbsp;
              <a
                href={`mailto:${refund.footer.email}`}
                className="text-blue-600 underline"
              >
                {refund.footer.email}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicyPage;
