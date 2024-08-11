import Heading1 from "@/src/components/headings/heading1";
import { getTranslations } from "next-intl/server";
import React from "react";
import BannerSVG from "../../public/images/banner_temp.svg";

const Main = async () => {
  const t = await getTranslations("homepage");

  return (
    <div className="p-4 overflow-x-hidden overflow-y-hidden">
      <BannerSVG />
      <Heading1 classnames="bottom-0 left-0">Somos AP'ARTE</Heading1>
    </div>
  );
};

export default Main;
