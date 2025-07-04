// hooks/useProtectedSubmit.js or .ts

'use client';
import { useSession, signIn } from "next-auth/react";
import { useRef, useEffect } from "react";
import toast from "react-hot-toast";

export const useProtectedSubmit = (onSubmitCallback) => {
  const { data: session } = useSession();
  const pendingDataRef = useRef(null);

  const handleProtectedSubmit = async (formData) => {
    if (!formData?.url?.trim()) {
      toast.error("URL is required!");
      return;
    }

    if (!session) {
      pendingDataRef.current = formData;
      toast.error("Please log in to continue.");
      signIn(); // opens login modal
      return;
    }

    await onSubmitCallback(formData);
  };

  const reset = () => {
    pendingDataRef.current = null;
  };

  return { session, pendingDataRef, handleProtectedSubmit, reset };
};
