"use client";
import { useState } from "react";
import Logo from "../logo/logo";
import clsx from "clsx";
import { useLocale } from "next-intl";
import { Navbar } from "./navbar";
import BurgerMenu from "../icons/burger-menu";
import Cross from "../icons/cross";
import { Divider } from "../Divider";

interface HeaderProps {
  showBorder: boolean;
}

export default function Header({ showBorder }: HeaderProps) {
  const currentLocale = useLocale();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <div
      className={clsx(
        "fixed top-0 w-full z-50 flex flex-row justify-between font-neue h-14 items-center md:p-10 p-3 bg-[#ffffff]",
        {
          "border-b": showBorder,
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
            <Cross />
          </button>
        )}
        {isMobileMenuOpen && (
          <div className="absolute inset-x-0 top-14 w-full flex flex-col h-screen">
            <Divider />
            <div className="flex-1 bg-[#ffffff] py-5">
              {/* <div className="px-5">
                <RandomGallery />
              </div> neeed to receive artworks to achieve this - or refactor random gallery*/}
              <Navbar isMobile isMobileMenuOpen onClick={closeMobileMenu} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
