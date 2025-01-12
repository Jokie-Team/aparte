import RandomGallery from "@/src/components/random-gallery";
import { getTranslations } from "next-intl/server";
import React from "react";

export default async function LocalePage() {
  const t = await getTranslations("homepage");

  return (
    <div className="px-10 py-16 w-full overflow-x-hidden overflow-y-hidden">
      <RandomGallery />

      <h1 className="bottom-0 left-0">{t("title")}</h1>
    </div>
  );
}
