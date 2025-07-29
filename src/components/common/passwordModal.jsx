
"use client";

import React, { useState, useEffect } from "react";
import bcrypt from "bcryptjs";

const PasswordModal = ({ data, children }) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [inputPassword, setInputPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // If no password is set, unlock automatically
    if (!data?.password) {
      setIsUnlocked(true);
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!data?.password) {
      setIsUnlocked(true);
      return;
    }

    const match = await bcrypt.compare(inputPassword, data.password);
    if (match) {
      setIsUnlocked(true);
    } else {
      setError("Incorrect password. Please try again.");
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
    </div>
  );
};

export default PasswordModal;