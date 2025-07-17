"use client";

import React, { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { Paintbrush2 } from "lucide-react"; // 🎨 Paint icon
import useDesignContext from "@/components/hooks/useDesignContext";
import { FaPaintbrush } from "react-icons/fa6";

const Colors = () => {
 
  return (
    <div className="p-4 w-full">
      <h2 className="text-lg font-semibold mb-4">Choose QR Code Body Color</h2>

   
    </div>
  );
};

export default Colors;
