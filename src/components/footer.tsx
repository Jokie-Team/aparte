"use client";

import React from "react";
import BorderedList from "./list/bordered-list";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export default function Footer() {
  const t = useTranslations("footer");
  const menuT = useTranslations("menu");
  const router = useRouter();

  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const ContactItems = [
    { title: t("info.agenda") },
    {
      title: t("info.address"),
      onItemClick: () => {
        window.open("https://maps.app.goo.gl/CUWJBwhB4dun5ZPA9");
      },
    },
    {
      title: t("info.phone"),
      onItemClick: () => {
        window.location.href = `tel:+351220120184`;
      },
    },
    {
      title: t("info.email"),
      onItemClick: () => {
        window.location.href = `mailto:geral@apartegaleria.com`;
      },
    },
    {
      title: "",
      children: (
        <>
          <a
            href="https://www.facebook.com/apartegaleriaa"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80"
            onClick={(e) => e.stopPropagation()}
          >
            {t("info.facebook")}
          </a>
          <span>•</span>
          <a
            href="https://www.instagram.com/apartegaleria/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80"
            onClick={(e) => e.stopPropagation()}
          >
            {t("info.instagram")}
          </a>
        </>
      ),
    },
  ];

  const MenuItems = [
    { title: menuT("homepage"), onItemClick: () => router.replace("/") },
    {
      title: menuT("exhibitions"),
      onItemClick: () => router.replace("/exhibitions"),
    },
    { title: menuT("artists"), onItemClick: () => router.replace("/artists") },
    /* {
      title: menuT("contacts"),
      onItemClick: () => router.replace("/contacts"),
    }, */
  ];

  return (
    <footer id="footer" className="sm:static relative w-full bottom-0 h-full md:h-4/6 border-t-1 bg-accent-1 border-accent-2 text-center md:px-6 pt-10 mt-auto">
      {" "}
      {/* border-t */}
      {/* <h1 className="text-left mb-10">{t("title")}</h1> */}
      <div className="h-full flex flex-col md:flex-row md:gap-20 gap-0">
        <div className="w-1/2"></div>
        <div className="flex flex-col flex-1 justify-around gap-10 md:gap-20">
          <BorderedList items={ContactItems} bulleted={false}
            itemClassName="body" />
          {!isMobile && (
            <BorderedList
              items={MenuItems}
              bulleted={false}  
              itemClassName="subtitle"
            />
          )}
        </div>
      </div>
      <div className="flex text-center text-xs mt-16 md:flex-row md:text-left flex-col py-2 gap-x-16">
        <div className="pr-10">{t("madeby")}</div>
        <div> {t("rights")}</div>
      </div>
    </footer>
  );
}
