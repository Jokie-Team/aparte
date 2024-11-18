import React from "react";
import Sidebar from "@/src/components/sidebar/sidebar";
import { getTranslations } from "next-intl/server";
import { Heading2 } from "@/src/components/headings/headings";
import Section from "@/src/components/section/section";

const Exhibitions = async () => {
  const t = await getTranslations("exhibitions");
  const exhibitions = [
    {
      category: 'Atuais',
      exhibitions: [
        {
          title: 'Universo, Gesto e Legado',
          description: 'É impossível saber o caminho pelo qual se percorre a criatividade. É uma receita incerta, cujos ingredientes misturam um tanto de subjetividade, fantasia e sonho, com quantidades elevadas da realidade social, política e económica vivida pelo artista. E ainda tem doses cavalares do passado, suas raízes e tradições. Nesta exposição, trabalhos recentes de treze artistas da Galeria Underdogs foram selecionados para serem apresentados na Ap\'arte Galeria e pincelar três desses espectros: emoção [universo particular], política [um gesto no mundo] e tradição [(in)conformismo e legado].Uma exposição focada em expressão e legado artístico.',
          artists: 'Add Fuel, André Saraiva, JonOne, Raquel Belli, Julien Raffin',
          dates: 'Em exposição de 4 de Novembro até 16 de Janeiro',
          imageUrl: '/images/1.jpeg',
          artworks: [
            '/images/1.jpeg',
            '/images/1.jpeg',
            '/images/1.jpeg',
            '/images/1.jpeg',
            '/images/1.jpeg',
          ]
        },
        {
          title: 'Alejandra Majewski',
          description: 'Exploração de paisagens urbanas e imaginários urbanos.',
          artists: 'Alejandra Majewski',
          dates: 'Em exposição de 4 de Novembro até 16 de Janeiro',
          imageUrl: '/images/1.jpeg',
        },
        {
          title: 'Alexandre Cabrita',
          description: 'Artista multifacetado explorando novos estilos e conceitos.',
          artists: 'Alexandre Cabrita',
          dates: 'Em exposição de 10 de Dezembro até 20 de Fevereiro',
          imageUrl: '/images/1.jpeg',
        },
        {
          title: 'Aline Setton',
          description: 'Focada em representar a natureza através da abstração.',
          artists: 'Aline Setton',
          dates: 'Em exposição de 15 de Janeiro até 15 de Março',
          imageUrl: '/images/1.jpeg',
        },
      ],
    },
    {
      category: 'Futuras',
      exhibitions: [
        {
          title: 'Universo, Gesto e Legado',
          description: 'Uma continuação do legado com novos artistas.',
          artists: 'Novo Coletivo',
          dates: 'Em exposição de 5 de Fevereiro até 5 de Abril',
          imageUrl: '/images/1.jpeg',
        },
        {
          title: 'Marian Van Der Zwan & Mark',
          description: 'Colaboração entre artistas contemporâneos.',
          artists: 'Marian Van Der Zwan, Mark',
          dates: 'Em exposição de 1 de Março até 30 de Abril',
          imageUrl: '/images/1.jpeg',
        },
        {
          title: 'Alejandra Majewski',
          description: 'Nova série de trabalhos sobre imaginários urbanos.',
          artists: 'Alejandra Majewski',
          dates: 'Em exposição de 20 de Março até 20 de Maio',
          imageUrl: '/images/1.jpeg',
        },
      ],
    },
    {
      category: 'Passadas',
      years: [
        {
          year: 2023,
          exhibitions: [
            {
              title: 'Universo, Gesto e Legado',
              description: 'Exposição anterior sobre gesto e legado.',
              artists: 'Add Fuel, André Saraiva, JonOne',
              dates: 'Exibido de 4 de Janeiro até 4 de Março',
              imageUrl: '/images/1.jpeg',
            },
            {
              title: 'Alejandra Majewski',
              description: 'Exposição de novos desenhos urbanos.',
              artists: 'Alejandra Majewski',
              dates: 'Exibido de 5 de Abril até 5 de Junho',
              imageUrl: '/images/1.jpeg',
            },
            {
              title: 'Alexandre Cabrita',
              description: 'Exploração artística de Cabrita.',
              artists: 'Alexandre Cabrita',
              dates: 'Exibido de 7 de Julho até 7 de Setembro',
              imageUrl: '/images/1.jpeg',
            },
            {
              title: 'Aline Setton',
              description: 'Reflexão sobre a natureza.',
              artists: 'Aline Setton',
              dates: 'Exibido de 15 de Setembro até 15 de Novembro',
              imageUrl: '/images/1.jpeg',
            },
          ],
        },
        {
          year: 2022,
          exhibitions: [
            {
              title: 'Universo, Gesto e Legado',
              description: 'Exposição inicial do projeto de legado.',
              artists: 'Add Fuel, André Saraiva, JonOne',
              dates: 'Exibido de 10 de Janeiro até 10 de Março',
              imageUrl: '/images/1.jpeg',
            },
            {
              title: 'Alejandra Majewski',
              description: 'Obras focadas em paisagens.',
              artists: 'Alejandra Majewski',
              dates: 'Exibido de 12 de Março até 12 de Maio',
              imageUrl: '/images/1.jpeg',
            },
            {
              title: 'Alexandre Cabrita',
              description: 'Explorando novos horizontes.',
              artists: 'Alexandre Cabrita',
              dates: 'Exibido de 15 de Junho até 15 de Agosto',
              imageUrl: '/images/1.jpeg',
            },
            {
              title: 'Aline Setton',
              description: 'Natureza em um novo olhar.',
              artists: 'Aline Setton',
              dates: 'Exibido de 18 de Setembro até 18 de Novembro',
              imageUrl: '/images/1.jpeg',
            },
          ],
        },
      ],
    },
  ];


  return (
    <div className="m-12 flex flex-row gap-24">
      <Sidebar type="exhibitions" exhibitions={exhibitions} />
      <div className="w-full">
        <Heading2 className="mb-8">{t("title")}</Heading2>
        {exhibitions.map((expo) => (
          <div key={expo.category}>
            {expo.years
              ? expo.years.map((yearData) => (
                <div key={yearData.year}>
                  {yearData.exhibitions.map((item, index) => (
                    <React.Fragment key={item.title}>
                      <Section exhibitionItem={item} />
                      {index !== yearData.exhibitions.length - 1 && (
                        <div className="my-32 border-b border-gray-200" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              ))
              : expo.exhibitions?.map((item, index) => (
                <React.Fragment key={item.title}>
                  <Section exhibitionItem={item} />
                  {index !== expo.exhibitions!.length - 1 && (
                    <div className="my-32 border-b border-gray-200" />
                  )}
                </React.Fragment>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Exhibitions;
