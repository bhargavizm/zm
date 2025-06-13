'use client';

import React from 'react';
import useServicesContext from '@/components/hooks/useServiceContext';

const TextMessageContent = () => {
  const { textMessageForm, setTextMessageForm } = useServicesContext();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTextMessageForm({ ...textMessageForm, [name]: value });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold pb-6 text-[#008080]">QR Code for Text Message</h1>

      <div className="grid grid-cols-1 gap-4">
        <input
          type="text"
          name="sender"
          placeholder="Sender Name"
          value={textMessageForm.sender}
          onChange={handleChange}
          className="border p-2 rounded shadow-sm w-full"
        />
        <textarea
          name="message"
          placeholder="Enter your message here..."
          value={textMessageForm.message}
          onChange={handleChange}
          rows={4}
          className="border p-2 rounded shadow-sm w-full"
        />
      </div>

      <button
        type="submit"
        className="mt-4 w-full bg-[#008080] text-white font-semibold py-2 rounded hover:bg-[#006666] transition"
      >
        Submit
      </button>
    </div>
  );
};

export default TextMessageContent;
