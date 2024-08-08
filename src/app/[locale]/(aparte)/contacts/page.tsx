import React from "react";
import Button from "@/src/components/buttons/button";
import DropdownButton from "@/src/components/buttons/dropdown";
import IconButton from "@/src/components/buttons/icon";
import TextButton from "@/src/components/buttons/text";
import { getTranslations } from "next-intl/server";

const Contacts = async () => {
  const t = await getTranslations("contacts");

  return (
    <div>
      <h1>{t("title")}</h1>
      <div className="container mx-auto px-5">
        <div className="py-28 flex flex-col space-y-10">
          <div>
            <div>Dropdown Button</div>
            <DropdownButton />
          </div>
          <div>
            <div>Button</div>
            <Button text="teste" />
          </div>
          <div>
            <div>Icon Button</div>
            <IconButton direction="left" />
          </div>
          <div>
            <div>Text Button</div>
            <TextButton text="Label" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
