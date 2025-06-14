'use client';

import React from 'react';
import { useLanguage } from '@/context/languageContext/LanguageContext';

const RefundPolicyPage = () => {
  const { dictionary } = useLanguage();

  return (
    <div className="relative flex flex-col items-center justify-start min-h-screen px-4 py-10 my-10 bg-[#008080] overflow-hidden text-white">
      {/* Simulated Noise */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:20px_20px] opacity-20 mix-blend-overlay pointer-events-none z-0" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl text-center space-y-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold drop-shadow-md animate-fade-in tracking-wide">
          {dictionary.refund_policy.title}
        </h1>

        <div className="bg-[#87ecec] backdrop-blur-md rounded-3xl shadow-2xl p-6 sm:p-10 text-gray-800 border border-[#ccf0ec] animate-fade-in-up space-y-6 text-left">
          <p className="text-base sm:text-lg leading-relaxed font-medium">
            {dictionary.refund_policy.intro}
          </p>

          <ul className="list-disc list-inside ml-4 text-sm sm:text-base text-gray-700">
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
            {dictionary.refund_policy.contact_prompt}{' '}
            <a
              href="/contact"
              className="text-[#004d4d] font-semibold underline hover:text-[#003030] transition"
            >
              {dictionary.refund_policy.contact_link}
            </a>{' '}
            {dictionary.refund_policy.contact_suffix}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicyPage;
