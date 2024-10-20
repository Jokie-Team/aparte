import React from "react";
import Carousel from "@/src/components/carousel";
import Sidebar from "@/src/components/sidebar/sidebar";
import { getTranslations } from "next-intl/server";

const Exhibitions = async () => {
  const t = await getTranslations("exhibitions");
  const exposicoes = [
    {
      categoria: 'Atuais',
      titulos: ['Universo, Gesto e Legado', 'Alejandra Majewski', 'Alexandre Cabrita', 'Aline Setton'],
    },
    {
      categoria: 'Futuras',
      titulos: ['Universo, Gesto e Legado', 'Marian Van Der Zwan & Mark', 'Alejandra Majewski'],
    },
    {
      categoria: 'Passadas',
      anos: [
        {
          ano: 2023,
          titulos: ['Universo, Gesto e Legado', 'Alejandra Majewski', 'Alexandre Cabrita', 'Aline Setton'],
        },
        {
          ano: 2022,
          titulos: ['Universo, Gesto e Legado', 'Alejandra Majewski', 'Alexandre Cabrita', 'Aline Setton'],
        },
      ],
    },
  ];

  return (
    <div>
      <Sidebar tipo={"exposicoes"} exposicoes={exposicoes} />
    </div>
  );
};

export default Exhibitions;
