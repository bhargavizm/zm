// /app/user-dashboard/page.jsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardHome() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/user-dashboard/qrCodesLists");
  }, [router]);

  return null; // or a loader/spinner if needed
}
