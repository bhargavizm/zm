// components/AuthWatcher.jsx
"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

const AuthWatcher = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      toast.error("Session expired. Please login again.");
      signOut({ redirect: false }); // avoids double redirect
      router.push("/login"); // or "/"
    }
  }, [status,router]);

  return null;
};

export default AuthWatcher;
