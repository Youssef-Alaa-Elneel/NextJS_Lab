"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

function NavClint() {
  const pathname = usePathname();
  return (
    <div className="w-full h-16 bg-gray-800 text-white flex items-center justify-center">
      <Link href="/" className={`mx-4 ${pathname === "/" ? "underline" : ""}`}>
        Home
      </Link>
      <Link
        href="/users"
        className={`mx-4 ${pathname === "/users" ? "underline" : ""}`}
      >
        Users
      </Link>
      <Link
        href="/about"
        className={`mx-4 ${pathname === "/about" ? "underline" : ""}`}
      >
        About
      </Link>
      <Link
        href="/contactus"
        className={`mx-4 ${pathname === "/contactus" ? "underline" : ""}`}
      >
        Contact US
      </Link>
      <Link
        href="/products"
        className={`mx-4 ${pathname === "/products" ? "underline" : ""}`}
      >
        Products
      </Link>
    </div>
  );
}

export default NavClint;
