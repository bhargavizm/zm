'use client';

import React from 'react';
import { FiUser, FiMessageSquare } from 'react-icons/fi';
import useServicesContext from '@/components/hooks/useServiceContext';

const TextMessagePreview = () => {
  const { textMessageForm } = useServicesContext();
  const hasData = textMessageForm.sender || textMessageForm.message;

  return (
    <div className="bg-white rounded-[40px] border-[14px] border-gray-800 shadow-xl w-[300px] h-[600px] overflow-hidden flex flex-col relative">
      {/* iPhone notch */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-6 bg-gray-800 rounded-b-xl z-10" />

      <div className="flex-1 overflow-y-auto no-scrollbar pt-8 pb-4 px-4">
        {hasData ? (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-center text-[#008080]">Text Message Preview</h2>

            {textMessageForm.sender && (
              <div className="bg-[#008080]/10 p-3 rounded border border-[#008080]/20">
                <div className="flex items-center text-[#008080] mb-1">
                  <FiUser className="mr-2" />
                  <span className="font-medium">Sender</span>
                </div>
                <p>{textMessageForm.sender}</p>
              </div>
            )}

            {textMessageForm.message && (
              <div className="bg-[#008080]/10 p-3 rounded border border-[#008080]/20">
                <div className="flex items-center text-[#008080] mb-1">
                  <FiMessageSquare className="mr-2" />
                  <span className="font-medium">Message</span>
                </div>
                <p>{textMessageForm.message}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center text-gray-400">
            <FiMessageSquare className="text-4xl mb-4 text-[#008080]" />
            <h3 className="text-lg font-medium">Text Message Preview</h3>
            <p className="mt-2">Fill the form to see your preview</p>
          </div>
        )}
      </div>

      <div className="border-t border-gray-200 text-center text-xs text-gray-500 py-2">
        <p>Scan to read message</p>
        <p className="mt-1">v1.0.0</p>
      </div>
    </div>
  );
};

export default TextMessagePreview;
