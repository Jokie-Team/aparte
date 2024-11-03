"use client";
import React from "react";
import BurgerMenu from "./icons/burger-menu";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Body } from "@/src/components/headings/headings";

interface MenuProps {
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
}

const Menu: React.FC<MenuProps> = ({ isMobileMenuOpen, toggleMobileMenu }) => {
  const pathname = usePathname();
  const t = useTranslations("menu");
  const currentLocale = useLocale();

  const otherLocale = currentLocale === "en" ? "pt" : "en";
  const localizedPathname = (locale: string) => {
    return pathname.replace(`/${currentLocale}`, `/${locale}`);
  };

  // Remove o prefixo de idioma do pathname para comparações
  const normalizedPathname = pathname.replace(`/${currentLocale}`, "");

  return (
    <>
      <nav className="hidden sm:block pt-10">
        <ul className="flex gap-40">
          <li className="flex flex-row items-center cursor-pointer">
            <Link href="/exhibitions">
              <Body className={normalizedPathname === "/exhibitions" ? "font-extrabold" : ""}>
                {t("exhibitions")}
              </Body>
            </Link>
          </li>
          <li className="flex flex-row items-center cursor-pointer">
            <Link href="/artists">
              <Body className={normalizedPathname === "/artists" ? "font-extrabold" : ""}>
                {t("artists")}
              </Body>
            </Link>
          </li>
          <li className="flex flex-row items-center cursor-pointer">
            <Link href="/contacts">
              <Body className={normalizedPathname === "/contacts" ? "font-extrabold" : ""}>
                {t("contacts")}
              </Body>
            </Link>
          </li>
          <li className="h-10 flex flex-row items-center">
            <Link
              href={localizedPathname(otherLocale)}
              locale={false}
              className="hover:text-gray-900"
            >
              <Body>{otherLocale.toUpperCase()}</Body>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="flex sm:hidden items-center h-full">
        <button onClick={toggleMobileMenu}>
          <BurgerMenu />
        </button>
      </div>
    </>
  );
};

export default Menu;
