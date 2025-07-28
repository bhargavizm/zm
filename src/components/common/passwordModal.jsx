"use client";

import React, { useState, useEffect } from "react";
import bcrypt from "bcryptjs";


const PasswordModal = ({ data, Component }) => {
  const [isUnlocked, setIsUnlocked] = useState(!data.password); // auto-unlock if no password
  const [input, setInput] = useState("");
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


  if (isUnlocked) {
    return <Component data={data} />;
  }

  return (
    <div className="min-h-screen flex justify-center items-center flex-col p-4">
      <h2 className="text-xl mb-2">Enter Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border px-3 py-1 rounded w-64"
          placeholder="Password"
        />
        <button
          type="submit"
          className="ml-2 bg-black text-white px-4 py-1 rounded"
        >
          Unlock
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default PasswordModal;