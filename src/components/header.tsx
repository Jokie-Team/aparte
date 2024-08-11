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
    <div className="flex items-center flex-row justify-between font-neue w-full h-16 border-b border-gray-900 p-4 md:py-0 md:px-10">
      <a href="/" className="md:pt-12">
        <Logo />
      </a>
      <Menu
        isMobileMenuOpen={isMobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
      />
    </div>
  );
}
