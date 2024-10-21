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
      <h1>{t("title")}</h1>
    </div>
  );
};

export default Artists;
