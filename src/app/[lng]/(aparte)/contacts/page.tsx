import React from "react";
import { useTranslation } from "../../../i18n";
import Button from "@/src/components/buttons/button";
import DropdownButton from "@/src/components/buttons/dropdown";
import AccordionButton from "@/src/components/buttons/forward";
import IconButton from "@/src/components/buttons/icon";
import TextButton from "@/src/components/buttons/text";

const Contacts = async ({ params }: { params: { lng: string } }) => {
  const { t } = await useTranslation(params.lng, "common");

  return (
    <div>
      <h1>{t("contacts")}</h1>
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
            <div>Forward Button</div>
            <AccordionButton text="label" />
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
