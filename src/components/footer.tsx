"use client";

import React from "react";
import BorderedList from "./list/bordered-list";
import Newsletter from "./newsletter";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export default function Footer() {
  const t = useTranslations("footer");
  const menuT = useTranslations("menu");
  const router = useRouter();

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
    { title: t("info.facebook"), onItemClick: () => { window.open("https://www.facebook.com/apartegaleriaa") } },
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
    <footer className="sm:static relative w-full bottom-0 h-full md:h-4/6 border-t-1 bg-accent-1 border-t border-accent-2 text-center px-6 pt-10 mt-auto">
      <h1 className="text-left mb-10">{t("title")}</h1>
      <div className="h-full flex flex-col md:flex-row md:gap-20 gap-0">
        <div className="w-1/2"></div>
        <div className="flex flex-col flex-1 justify-around gap-10 md:gap-20">
          <BorderedList items={ContactItems} bulleted itemClassName="body" />
          <BorderedList
            items={MenuItems}
            bulleted={false}
            itemClassName="subtitle"
          />
        </div>
      </div>
      <div className="flex text-left text-xs mt-16 md:flex-row flex-col py-2 gap-x-16">
        <div className="pr-10">{t("madeby")}</div>
        <div> {t("rights")}</div>
      </div>
    </footer>
  );
}
