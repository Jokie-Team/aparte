import Sidebar from "@/src/components/sidebar/sidebar";
import { getTranslations } from "next-intl/server";
import React from "react";

const Artists = async ({ params }: { params: { lng: string } }) => {
  const t = await getTranslations("artists");

  return (
    <div className="sm:flex sm:flex-row">
      <Sidebar />
      <h1>{t("title")}</h1>
    </div>
  );
};

export default Artists;
