"use client";

import { useState } from "react";
import Button from "./buttons/button";
import AccordionButton from "./buttons/accordion";
import Input from "./input/input";
import { useTranslations } from "next-intl";

const Newsletter = () => {
  const [clicked, setClicked] = useState(false);
  const t = useTranslations("footer.newsletter");

  return (
    <div className="w-full sm:w-7/12">
      <div className="flex-1 w-full sm:w-3/5 gap-20 sm:gap-0">
        <AccordionButton
          text={t("input")}
          clicked={clicked}
          setClicked={setClicked}
        >
          <>
            <Input id="name" label={t("form.name")} onChange={() => {}} />
            <Input id="email" label={t("form.email")} onChange={() => {}} />
          </>
        </AccordionButton>
        <div className="text-left my-0 sm:my-4 text-sm flex flex-row justify-between items-center">
          <span>{t("info")}</span>
          {clicked && (
            <Button classnames="mt-2 p-1" text={t("cta")} filled={true} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
