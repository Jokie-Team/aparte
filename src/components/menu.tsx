"use client";
import React from "react";
import BurgerMenu from "./icons/burger-menu";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

interface MenuProps {
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
}

const Menu: React.FC<MenuProps> = ({ isMobileMenuOpen, toggleMobileMenu }) => {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("menu");
  const currentLocale = useLocale();

  const otherLocale = currentLocale === "en" ? "pt" : "en";
  const localizedPathname = (locale: string) => {
    return pathname.replace(`/${currentLocale}`, `/${locale}`);
  };

  return (
    <div className="h-full">
      <nav className="hidden sm:block">
        <ul className="flex pt-10 gap-10 lg:gap-40">
          <li className="h-10 flex flex-row items-center cursor-pointer">
            <Link href="/exhibitions">{t("exhibitions")}</Link>
          </li>
          <li className="h-10 flex flex-row items-center cursor-pointer">
            <Link href="/artists">{t("artists")}</Link>
          </li>
          <li className="h-10 flex flex-row items-center cursor-pointer">
            <Link href="/contacts">{t("contacts")}</Link>
          </li>
          {/* <li className='h-10 flex flex-row items-center hover:text-gray-900'>Pesquisa</a></li> */}
          <li className="h-10 flex flex-row items-center">
            <Link
              href={localizedPathname(otherLocale)}
              locale={false}
              className="hover:text-gray-900"
            >
              {otherLocale.toUpperCase()}
            </Link>
          </li>
        </ul>
      </nav>
      <div className="flex sm:hidden items-center h-full">
        <button onClick={toggleMobileMenu}>
          <BurgerMenu />
        </button>
      </div>
      {/*{isMobileMenuOpen && (
                <nav className="md:hidden">
                    <ul className="flex flex-col items-center space-y-2 mt-4">
                        <li><a href="/exhibitions" className="hover:text-gray-900">{t("exhibitions")}</a></li>
                        <li><a href="/artistas" className="hover:text-gray-900">{t("artists")}</a></li>
                        <li><a href="/contactos" className="hover:text-gray-900">{t("contacts")}</a></li>
                        <li><a href="/pesquisa" className="hover:text-gray-900">Pesquisa</a></li>
                        <li><a className="hover:text-gray-900">EN</a></li>
                    </ul>
                </nav>
            )} */}
    </div>
  );
};

export default Menu;
