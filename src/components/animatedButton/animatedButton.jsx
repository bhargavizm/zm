"use client";

import React from "react";
import styles from "./button.module.css";

const AnimatedButton = ({ children, onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`relative px-6 py-2 cursor-pointer text-xl text-white font-bold rounded-lg ${className}`}
    >
      <span className="relative z-10 flex justify-center items-center gap-2">
        {children}
      </span>

      <span
        className={`${styles.animatedBorder} absolute inset-0 rounded-md pointer-events-none`}
      />
    </button>
  );
};

export default AnimatedButton;
