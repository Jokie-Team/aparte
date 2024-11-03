import React from "react";
import Button from "@/src/components/buttons/button";
import DropdownButton from "@/src/components/buttons/dropdown";
import IconButton from "@/src/components/buttons/scrollup";
import TextButton from "@/src/components/buttons/text";
import { getTranslations } from "next-intl/server";

const Contacts = async () => {
  const t = await getTranslations("contacts");

  return (
    <div>
      <h1>{t("title")}</h1>
    </div>
  );
};

export default Contacts;
