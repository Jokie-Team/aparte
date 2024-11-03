import { Heading2 } from "@/src/components/headings/headings";
import Sidebar from "@/src/components/sidebar/sidebar";
import { getTranslations } from "next-intl/server";
import React from "react";

const Artists = async ({ params }: { params: { lng: string } }) => {
  const t = await getTranslations("artists");

  const artists = [
    { letter: 'A', names: ['Alejandra Majewski', 'Alexandre Cabrita', 'Aline Setton'] },
    { letter: 'M', names: ['Marian Van Der Zwan', 'Mark Rothko'] },
  ];

  return (
    <div className="sm:flex sm:flex-row">
      <Sidebar type={"artists"} artists={artists} />
      <Heading2>{t("title")}</Heading2>
    </div>
  );
};

export default Artists;
