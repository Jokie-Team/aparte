"use client";
import { useState } from "react";
import Logo from "./logo/logo";
import Menu from "./menu";

interface HeaderProps {
  showBorder: boolean;
}

export default function Header({ showBorder }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className={`fixed top-0 w-full z-50 flex flex-row justify-between ${showBorder ? "border-b" : ""} font-neue h-24 px-10 md:py-0 md:px-10 bg-[#ffffff]`} >
      <a href="/" className="pt-12">
        <Logo />
      </a>
      <Menu
        isMobileMenuOpen={isMobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
      />
    </div >
  );
}
