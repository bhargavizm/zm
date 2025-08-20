"use client";
import { useState } from "react";
import Sidebar from "@/components/sidebar/sidebar";
import Image from "next/image";
import Link from "next/link";
import { FiMenu } from "react-icons/fi";

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex">
      {/* Sidebar - fixed on left */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main area with padding to avoid overlap */}
      <div className="flex-1 flex flex-col md:ml-60 h-screen overflow-hidden">
        {/* Navbar */}
        <nav className=" bg-mainGreen h-[10vh] text-white flex justify-between items-center px-4 md:px-10">
          {/* Hamburger on mobile */}
          <div className="flex justify-between items-center">
            <button
              className="text-white text-2xl md:hidden"
              onClick={() => setIsSidebarOpen(true)}
            >
              <FiMenu />
            </button>

            {/* Logo for mobile */}
            <Link href="/" className="flex items-center gap-3 md:hidden">
              <Image
                src="/logos/zm-full.webp"
                alt="logo"
                width={150}
                height={50}
                priority
              />
            </Link>
          </div>
        </nav>

        {/* Scrollable content */}
        <main className="flex-1 px-4 md:px-4 bg-white overflow-y-auto mt-9">
          {children}
        </main>
      </div>
    </div>
  );
}
