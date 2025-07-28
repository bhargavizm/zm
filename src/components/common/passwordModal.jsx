"use client";
import React, { useState } from "react";
import bcrypt from "bcryptjs";

const PasswordModal = ({ data, Component }) => {
  const [isUnlocked, setIsUnlocked] = useState(!data.password);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.password) {
      setIsUnlocked(true);
      return;
    }

    const isMatch = await bcrypt.compare(input, data.password);
    if (isMatch) {
      setIsUnlocked(true);
    } else {
      setError("Incorrect Password");
    }
  };

  if (isUnlocked) {
    return <Component data={data} isUnlocked={true} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white/90 px-4">
      <div className="bg-white space-y-9 shadow-lg rounded-2xl p-6 w-full max-w-sm text-center border border-gray-200">
        <h2 className="text-2xl font-bold  text-mainGreen mb-4">
          🔐 Enter Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter password"
            className="w-full px-4 py-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mainGreen "
          />
          <button
            type="submit"
            className="w-full bg-mainGreen text-white font-bold py-2 rounded-lg transition-effects "
          >
            Unlock
          </button>
        </form>
        {error && <p className="text-red-500 text-lg mt-3">{error}</p>}
      </div>
    </div>
  );
};

export default PasswordModal;
