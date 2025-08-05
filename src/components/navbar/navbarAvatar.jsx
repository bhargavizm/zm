
"use client";
import React from "react";
import { useSelector } from "react-redux";
import { MdKeyboardArrowDown } from "react-icons/md";
import useLogout from "../hooks/useLogout";
import Link from "next/link";
import { useLanguage } from "@/context/languageContext/LanguageContext";
import {  useRouter } from "next/navigation";


const NavbarAvatar = ({ setOpenDropdown, openDropdown, userDropdownRef }) => {
  const logout = useLogout();
  const userData = useSelector((state) => state?.authentication?.userData);

  const router = useRouter();
  const { dictionary } = useLanguage();
  const handleLogout = async () => {
    await logout(); // ✅ Logout logic from your hook
    setOpenDropdown(null); // ✅ Close dropdown (if applicable)
    router.push("/"); // ✅ Navigate to homepage or login
  };
  return (
    <>
      {userData ? (
        <>
          <div className="relative" ref={userDropdownRef}>
            <button
              onClick={() =>
                setOpenDropdown(openDropdown === "user" ? null : "user")
              }
              className="hover:text-gray-300 flex items-center gap-1 cursor-pointer"
            >
              {userData &&
                userData?.name &&
                userData?.name?.charAt(0)?.toUpperCase() +
                  userData.name.slice(1)}

              <MdKeyboardArrowDown
                className={`transition-transform ${
                  openDropdown === "user" ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>

            {openDropdown === "user" && (
              <div className="absolute top-full right-0 mt-2 bg-white text-mainGreen rounded-md shadow-md w-40 z-50">
                <button
                  onClick={handleLogout}
                  className="block cursor-pointer w-full text-left px-4 py-2 hover:bg-mainGreen hover:text-white transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          <Link
            href="/user-dashboard"
            className="border border-white px-5 py-2 rounded-lg transition bg-[linear-gradient(to_right,#008080,#001a1a)]"
          >
            Dashboard
          </Link>
        </>
      ) : (
        <Link
          href="/login"
          className="border border-white px-5 py-2 rounded-lg transition bg-[linear-gradient(to_right,#008080,#001a1a)]"
        >
          {dictionary.login}
        </Link>
      )}
    </>
  );
};

export default NavbarAvatar;
