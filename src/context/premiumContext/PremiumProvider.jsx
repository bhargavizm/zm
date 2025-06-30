"use client";

import { useState } from "react";
import { PremiumContext } from "./PremiumContext";




const PremiumProvider = ({ children }) => {
 const [premiumEnabled, setPremiumEnabled] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);


  return (
    <PremiumContext.Provider
      value={{
       premiumEnabled, setPremiumEnabled,showPremiumModal, setShowPremiumModal
      }}
    >
      {children}
    </PremiumContext.Provider>
  );
};

export default PremiumProvider;

