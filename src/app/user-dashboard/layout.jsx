"use client";
import { useState } from "react";
import NavbarAvatar from "@/components/navbar/navbarAvatar";
import Sidebar from "@/components/sidebar/sidebar";
import Image from "next/image";
import Link from "next/link";
import { FiMenu } from "react-icons/fi";

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <nav className="md:bg-gray-100 bg-mainGreen  h-[10vh] text-white flex justify-between items-center px-4 md:px-10">
          {/* Hamburger on mobile */}
          <div className="flex justify-between items-center">
          <button
            className="text-white text-2xl md:hidden"
            onClick={() => setIsSidebarOpen(true)}
          >
            <FiMenu />
          </button>

          {/* Logo */}
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
          {/* <NavbarAvatar /> */}
        </nav>

        {/* Main content area */}
        <main className="flex-1 px-4 md:px-12 bg-white mt-[6vh]">
          {children}
        </main>
      </div>
    </div>
  );
}
