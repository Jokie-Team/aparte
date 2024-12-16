"use client";
import { useState } from "react";
import Logo from "./logo/logo";
import Menu from "./menu";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

interface HeaderProps {
  showBorder: boolean;
}

export default function Header({ showBorder }: HeaderProps) {
  const currentLocale = useLocale();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div
      className={clsx(
        "fixed top-0 w-full z-50 flex flex-row justify-between  font-neue h-24 px-10 md:py-0 md:px-10 bg-[#ffffff]",
        {
          showBorder: "border-b",
        }
      )}
    >
      <a href={`/${currentLocale}`} className="pt-12">
        <Logo />
      </a>
      <Menu
        isMobileMenuOpen={isMobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
      />
    </div>
  );
}
