"use client";
import React from "react";

const BgDesignRenderer = ({ bgDesign, defaultBg }) => {
  const isVideo = bgDesign?.endsWith(".mp4") || bgDesign?.endsWith(".webm");
  const isImage = bgDesign && !isVideo;

  const commonProps = {
    className: "absolute top-0 left-0 w-full h-full object-cover z-0",
  };

  if (isImage) {
    return <img src={bgDesign} alt="Background" {...commonProps} />;
  }

  if (isVideo) {
    return (
      <video src={bgDesign} autoPlay loop muted playsInline {...commonProps} />
    );
  }

  // return <img src={defaultBg} alt="Default Background" {...commonProps} />;
};

export default BgDesignRenderer;
