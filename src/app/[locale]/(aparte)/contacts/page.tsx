import React from "react";
import { getTranslations } from "next-intl/server";
import { Heading2 } from "@/src/components/headings/headings";

export const revalidate = 1800;

const Contacts = async () => {
  const t = await getTranslations("contacts");

  return (
    <div className="sm:flex sm:flex-row mt-12 ml-10">
      <Heading2>{t("title")}</Heading2>
    </div>
  );
};

export default Contacts;
