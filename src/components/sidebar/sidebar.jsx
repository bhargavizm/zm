"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { menuItems } from "./menuItems";
import Image from "next/image";
import { IoClose } from "react-icons/io5";
import { MdQrCodeScanner } from "react-icons/md";
import useLogout from "../hooks/useLogout";

export default function Sidebar({ isOpen, onClose }) {
  const pathname = usePathname();
  const router = useRouter();
  const logout = useLogout();

  const handleLogout = async () => {
    try {
      await logout(); // your logout logic
      onClose(); // close sidebar
      router.push("/"); // redirect to home/login
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      {/* Sidebar drawer */}
      <aside
        className={`fixed top-0 left-0  w-60 bg-mainGreen z-40 transform transition-transform duration-300 
        ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static`}
      >
        {/* Logo + Close */}
        <div className="flex justify-between items-center h-16 border-gray-300 px-4">
          <Link href="/" className="w-full flex justify-center">
            <Image
              src="/logos/zm-full.webp"
              alt="logo"
              width={160}
              height={50}
              className="object-center w-[80%] h-auto"
              priority
            />
          </Link>
          <button
            onClick={onClose}
            className="md:hidden text-white text-2xl absolute top-4 right-4"
          >
            <IoClose />
          </button>
        </div>

        {/* Menu items */}
        <nav className="mt-4 space-y-2">
          {menuItems &&
            menuItems.map(({ name, href }) =>
              name === "Logout" ? (
                <button
                  key={href} // ✅ Key added here
                  onClick={handleLogout}
                  className="block w-full cursor-pointer text-left px-9 py-2 mx-2 rounded transition-all text-xl text-white hover:bg-white hover:text-mainGreen"
                >
                  {name}
                </button>
              ) : name === "Create QR Codes" ? (
                <Link key={href} href={`/${href}`} passHref>
                  {" "}
                  {/* ✅ Key added here */}
                  <div
                    onClick={onClose}
                    className="flex items-center gap-2 bg-[#35aeae] text-white font-bold px-4 py-2 my-6 mx-2 rounded transition-all text-xl cursor-pointer shadow-md"
                  >
                    <MdQrCodeScanner className="text-2xl" />
                    {name}
                  </div>
                </Link>
              ) : (
                <Link
                  key={href} // ✅ Already correct
                  href={`/user-dashboard/${href}`}
                  className={`block px-9 py-2 mx-2 rounded transition-all text-xl ${
                    pathname.startsWith(`/user-dashboard/${href}`)
                      ? "bg-white font-bold text-mainGreen shadow-2xl"
                      : "text-white"
                  }`}
                  onClick={onClose}
                >
                  {name}
                </Link>
              )
            )}
        </nav>
      </aside>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-opacity-50 z-30 md:hidden"
          onClick={onClose}
        />
      )}
    </>
  );
}
