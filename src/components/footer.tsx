"use client";

import React from "react";
import BorderedList from "./list/bordered-list";
import Newsletter from "./newsletter";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");
  const menuT = useTranslations("menu");

  const ContactItems = [
    { title: t("info.agenda") },
    {
      title: t("info.address"),
      onItemClick: () => {
        window.open("https://maps.app.goo.gl/CUWJBwhB4dun5ZPA9");
      },
    },
    { title: t("info.phone"), onItemClick: () => {} },
    { title: t("info.facebook"), onItemClick: () => {} },
  ];

  const MenuItems = [
    { title: menuT("homepage") },
    { title: menuT("exhibitions") },
    { title: menuT("artists") },
    { title: menuT("contacts") },
  ];

  return (
    <footer className="absolute w-full bottom-0 h-4/6 border-t-1 bg-accent-1 border-t border-accent-2 text-center p-4  mt-auto">
      <h1 className="font-neue font-extrabold text-5xl text-left mb-10">
        {t("title")}
      </h1>
      <div className="h-full flex ">
        <Newsletter />
        <div className="flex flex-col flex-1 justify-around">
          <BorderedList items={ContactItems} bulleted listClassName="font-sm" />
          <BorderedList
            classNames="mt-15"
            items={MenuItems}
            bulleted={false}
            listClassName="font-lg font-bold"
          />
        </div>
      </div>
      <div className="text-left text-xs">
        <span className="pr-10 py-5">{t("madeby")}</span>
        <span> {t("rights")}</span>
      </div>
    </footer>
  );
}
