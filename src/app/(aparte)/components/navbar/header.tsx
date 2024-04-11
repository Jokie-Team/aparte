'use client'
import { useState } from "react";
import Logo from "../logo/logo";
import Menu from "./menu";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="font-neue w-full md:h-24 border-b border-gray-900 flex flex-row justify-between items-center p-4 md:py-0 md:px-10">
      <a href="/" className="h-full md:pt-12">
        <Logo />
      </a>
      <Menu isMobileMenuOpen={isMobileMenuOpen} toggleMobileMenu={toggleMobileMenu} />
    </div>
  );
}
