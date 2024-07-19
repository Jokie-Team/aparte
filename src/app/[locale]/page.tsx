import { getTranslations } from "next-intl/server";
import React from "react";

const Main = async () => {
  const t = await getTranslations("homepage");

  return (
    <div>
      <h1>{t("title")}</h1>
      {/* Page Content */}
    </div>
  );
};

export default Main;
