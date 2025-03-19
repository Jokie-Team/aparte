"use client";

import React from "react";
import { useTranslations } from "next-intl";
import Input from "./input/input";

export default function Contacts() {
  const t = useTranslations("contacts");

  return (
    <footer className="sm:static relative w-full bottom-0 h-full md:h-4/6 border-t-1 bg-accent-1 border-t border-accent-2 text-center px-6 p-10 mt-auto">
      <div className="h-full flex flex-col md:flex-row md:gap-20 gap-0">
        <div className="w-1/2">
          <h2 className="text-left mb-10">{t("title")}</h2>
          <div className="md:w-1/2">
            <p className="text-left">{t("supportingText")}</p>
          </div>
        </div>
        <div className="flex flex-col flex-1 justify-around gap-2 md:gap-2">
          <Input id="name" label="Nome" onChange={() => {}} required />
          <Input id="email" label="Email" onChange={() => {}} required />
        </div>
      </div>
    </footer>
  );
}
