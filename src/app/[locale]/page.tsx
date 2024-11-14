import { Heading1 } from "@/src/components/headings/headings";
import RandomGallery from "@/src/components/random-gallery";
import { getTranslations } from "next-intl/server";
import React from "react";

const Main = async () => {
  const t = await getTranslations("homepage");

  return (
    <div className="px-10 py-16 w-full overflow-x-hidden overflow-y-hidden">
      <RandomGallery />
      <Heading1 className="w-96 leading-none">Somos AP'ARTE</Heading1>
    </div>
  );
};

export default Main;
