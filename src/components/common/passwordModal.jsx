
"use client";
import React, { useState } from "react";
import bcrypt from "bcryptjs";

const PasswordModal = ({ data, children }) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [inputPassword, setInputPassword] = useState("");

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

  if (isUnlocked) return children;

  return (
    <div className="fixed inset-0 bg-teal-100 bg-opacity-70 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-lg w-96"
      >
        <h2 className="text-xl font-bold mb-4">Enter Password</h2>
        <input
          type="password"
          value={inputPassword}
          onChange={(e) => setInputPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded mb-3"
          placeholder="Password"
        />
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <button
          type="submit"
          className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 rounded"
        >
          Unlock
        </button>
      </form>
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
