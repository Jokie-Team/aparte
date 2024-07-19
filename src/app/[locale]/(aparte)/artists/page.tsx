import { getTranslations } from "next-intl/server";
import React from "react";

const Artists = async ({ params }: { params: { lng: string } }) => {
  const t = await getTranslations("artists");

  return (
    <div>
      <h1>{t("title")}</h1>
      {/* Page Content */}
    </div>
  );
};

export default Artists;
