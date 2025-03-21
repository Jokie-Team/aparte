"use client";
import { useState, useEffect } from "react";
import Logo from "../logo/logo";
import clsx from "clsx";
import { useLocale } from "next-intl";
import { Navbar } from "./navbar";
import BurgerMenu from "../icons/burger-menu";
import { CrossIcon } from "../icons/cross";
import { Divider } from "../Divider";

interface HeaderProps {
  showBorder?: boolean; // torna opcional para não depender da prop externa
}

export default function Header({ showBorder }: HeaderProps) {
  const currentLocale = useLocale();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={clsx(
        "fixed top-0 w-full z-50 flex flex-row justify-between font-neue h-14 items-center md:p-10 p-3 bg-[#ffffff] transition-all duration-300",
        {
          "border-b": scrolled,
        }
      )}
    >
      <a href={`/${currentLocale}`}>
        <Logo />
      </a>
      <Navbar />
      <div className="md:hidden flex items-center">
        {!isMobileMenuOpen ? (
          <button onClick={toggleMobileMenu}>
            <BurgerMenu />
          </button>
        ) : (
          <button onClick={toggleMobileMenu}>
            <CrossIcon />
          </button>
        )}
        {isMobileMenuOpen && (
          <div className="absolute inset-x-0 top-14 w-full flex flex-col h-screen">
            <Divider />
            <div className="flex-1 bg-[#ffffff] py-5">
              <Navbar isMobile isMobileMenuOpen onClick={closeMobileMenu} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
