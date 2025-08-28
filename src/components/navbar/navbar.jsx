"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/languageContext/LanguageContext";
import LanguageSelector from "./LanguageSelector";
import { MdKeyboardArrowDown } from "react-icons/md";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import useLogout from "../hooks/useLogout";
import NavbarAvatar from "./navbarAvatar";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [navigationError, setNavigationError] = useState(null);

  const supportRef = useRef(null);
  const userDropdownRef = useRef(null);
  const userMenuRef = useRef(null);

  const logout = useLogout();
  const userData = useSelector((state) => state?.authentication?.userData);
  const router = useRouter();

  const { dictionary } = useLanguage();
  const pathname = usePathname();

  const isActive = (route) => {
    if (route === "/") return pathname === "/";
    return pathname.startsWith(route);
  };

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !supportRef.current?.contains(event.target) &&
        !userDropdownRef.current?.contains(event.target) &&
        !userMenuRef.current?.contains(event.target)
      ) {
        setOpenDropdown(null);
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    setOpenDropdown(null);
    setShowUserMenu(false);
    router.push("/");
  };

  // Simple dashboard navigation with error handling
  const navigateToDashboard = async () => {
    setShowUserMenu(false);
    setNavigationError(null);
    
    try {
      // First try the normal navigation
      router.push("/user-dashboard");
      
      // Set a timeout to check if navigation worked
      setTimeout(() => {
        // If we're still on the same page after 2 seconds, try fallback
        if (window.location.pathname !== "/user-dashboard") {
          console.warn("Router navigation failed, using fallback");
          window.location.href = "/user-dashboard";
        }
      }, 2000);
    } catch (error) {
      console.error("Navigation error:", error);
      setNavigationError("Failed to navigate to dashboard");
      
      // Fallback: use window.location
      setTimeout(() => {
        window.location.href = "/user-dashboard";
      }, 1000);
    }
  };

  // Alternative navigation method that avoids potential API calls
  const navigateToDashboardSimple = () => {
    setShowUserMenu(false);
    
    // Use a direct approach that doesn't rely on the router
    // This will cause a full page refresh but should work
    window.location.href = "/user-dashboard";
  };

  return (
    <nav className="bg-mainGreen h-[10vh] py-2 text-white fixed top-0 left-0 right-0 w-full z-50">
      {/* Error message (hidden by default, shown only if there's an error) */}
      {navigationError && (
        <div className="bg-red-500 text-white text-center py-1 text-sm">
          {navigationError}
        </div>
      )}
      
      <div className="flex justify-between items-center mx-auto md:px-10 px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-full h-auto">
            <Image
              src="/logos/zm-full.webp"
              alt="logo"
              width={170}
              height={50}
              priority
            />
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden xl:flex items-center space-x-6 font-semibold text-xl">
          {[
            { href: "/", label: dictionary.home },
            { href: "/services", label: dictionary.services },
            { href: "/prices", label: dictionary.prices },
            { href: "/career", label: dictionary.Career },
            { href: "/investors", label: dictionary.Investors },
            { href: "/franchise", label: dictionary.Franchise },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`hover:text-gray-300 ${
                isActive(href) ? "text-darkGreen" : ""
              }`}
            >
              {label}
            </Link>
          ))}

          {/* Support Dropdown */}
          <div className="relative" ref={supportRef}>
            <button
              onClick={() =>
                setOpenDropdown(openDropdown === "support" ? null : "support")
              }
              className="hover:text-gray-300 flex items-center gap-1 cursor-pointer"
            >
              {dictionary.support}
              <MdKeyboardArrowDown
                className={`transition-transform ${
                  openDropdown === "support" ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>

            {openDropdown === "support" && (
              <div className="absolute top-full left-0 mt-2 bg-white text-mainGreen rounded-md shadow-md w-48 z-50">
                <Link
                  href="/faq"
                  className="block px-4 py-2 hover:bg-mainGreen hover:text-white transition"
                >
                  FAQ
                </Link>
                <Link
                  href="/contactUs"
                  className="block px-4 py-2 hover:bg-mainGreen hover:text-white transition"
                >
                  Contact Us
                </Link>
              </div>
            )}
          </div>

          <LanguageSelector />

          {/* User Dropdown */}
          <NavbarAvatar
            setOpenDropdown={setOpenDropdown}
            openDropdown={openDropdown}
            userDropdownRef={userDropdownRef}
          />
        </div>

        {/* Right side (Mobile: User/Login + Hamburger) */}
        <div className="xl:hidden flex items-center gap-4">
          {userData ? (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-1 font-semibold text-white"
              >
                {userData.name}
                <MdKeyboardArrowDown
                  className={`transition-transform ${
                    showUserMenu ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>
              
              {/* User Dropdown Menu for Mobile */}
              {showUserMenu && (
                <div className="absolute top-full right-0 mt-2 bg-white text-mainGreen rounded-md shadow-md w-48 z-50 py-2">
                  <button
                    onClick={navigateToDashboardSimple}
                    className="block w-full text-left px-4 py-2 hover:bg-mainGreen hover:text-white transition text-sm"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-mainGreen hover:text-white transition text-sm"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="border border-white px-3 py-1 rounded-lg bg-[linear-gradient(to_right,#008080,#001a1a)] text-white text-sm"
            >
              {dictionary.login}
            </Link>
          )}

          {/* Hamburger Menu */}
          <button
            className="flex flex-col gap-[3px]"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle mobile menu"
          >
            <div className="w-6 h-1 bg-white"></div>
            <div className="w-6 h-1 bg-white"></div>
            <div className="w-6 h-1 bg-white"></div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <>
          <div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black bg-opacity-40 z-40"
          />

          <div className="xl:hidden fixed top-[60px] py-4 right-0 w-60 bg-white text-xl font-semibold text-mainGreen z-50 shadow-lg transition-all duration-300">
            <div className="flex flex-col px-6 space-y-4 h-full justify-start">
              {[
                { href: "/", label: dictionary.home },
                { href: "/services", label: dictionary.services },
                { href: "/prices", label: dictionary.prices },
                { href: "/career", label: dictionary.Career },
                { href: "/investors", label: dictionary.Investors },
                { href: "/franchise", label: dictionary.Franchise },
                { href: "/faq", label: "FAQ" },
                { href: "/contactUs", label: "Contact Us" },
              ].map(({ href, label }) => (
                <Link key={href} href={href} onClick={() => setIsOpen(false)}>
                  {label}
                </Link>
              ))}

              <LanguageSelector isOpen={isOpen} />

              {userData ? (
                <>
                  <Link
                    href="/user-dashboard"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsOpen(false);
                      navigateToDashboardSimple();
                    }}
                    className="border border-mainGreen px-5 py-2 rounded-lg transition text-mainGreen text-center mt-4"
                  >
                    {dictionary.dashboard || "Dashboard"}
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="border border-mainGreen px-5 py-2 rounded-lg w-full transition-effects text-mainGreen mt-2"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="border border-mainGreen px-5 py-2 rounded-lg transition bg-[linear-gradient(to_right,#008080,#001a1a)] text-white"
                >
                  {dictionary.login}
                </Link>
              )}
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;