"use client";
import { useState } from "react";
import Logo from "./logo/logo";
import Menu from "./menu";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="fixed top-0 w-full z-50 flex items-center flex-row justify-between font-neue h-16 p-4 md:py-0 md:px-10 bg-[#ffffff]">
      <a href="/" className="">
        <Logo />
      </a>
      <Menu
        isMobileMenuOpen={isMobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
      />
    </div>
  );
}
