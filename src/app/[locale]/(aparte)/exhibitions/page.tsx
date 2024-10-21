import React from "react";
import Carousel from "@/src/components/carousel";
import Sidebar from "@/src/components/sidebar/sidebar";
import { getTranslations } from "next-intl/server";

const Exhibitions = async () => {
  const t = await getTranslations("exhibitions");
  const exhibitions = [
    {
      category: 'Atuais',
      titles: ['Universo, Gesto e Legado', 'Alejandra Majewski', 'Alexandre Cabrita', 'Aline Setton'],
    },
    {
      category: 'Futuras',
      titles: ['Universo, Gesto e Legado', 'Marian Van Der Zwan & Mark', 'Alejandra Majewski'],
    },
    {
      category: 'Passadas',
      years: [
        {
          year: 2023,
          titles: ['Universo, Gesto e Legado', 'Alejandra Majewski', 'Alexandre Cabrita', 'Aline Setton'],
        },
        {
          year: 2022,
          titles: ['Universo, Gesto e Legado', 'Alejandra Majewski', 'Alexandre Cabrita', 'Aline Setton'],
        },
      ],
    },
  ];

  return (
    <div className="sm:flex sm:flex-row">
      <Sidebar type={"exhibitions"} exhibitions={exhibitions} />
      <h1>{t("title")}</h1>
    </div>
  );
};

export default Exhibitions;
