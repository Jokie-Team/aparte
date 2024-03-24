'use client'
import { useState } from "react";
import Logo from "./images/logo";
import Menu from "./menu";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="w-full h-24 border-b border-gray-900 flex flex-row justify-between items-center">
      <div className="pt-12 pl-10 h-full">
        <Logo />
      </div>
      <Menu isMobileMenuOpen={isMobileMenuOpen} toggleMobileMenu={toggleMobileMenu} />
    </div>
  );
}
