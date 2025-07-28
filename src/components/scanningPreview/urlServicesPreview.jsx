"use client";
import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const URLServicesPreview = ({ data }) => {
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    // If password exists, user must input it
    if (data.password) return;

    // No password? Instantly redirect to URL
    window.location.href = data.url;
  }, [data]);

  return (
    <div className="h-screen flex items-center justify-center text-center">
      <p>🔒 This URL is password protected. Please enter the password to continue.</p>
    </div>
  );
};

export default URLServicesPreview;
