import Sidebar from "@/src/components/sidebar/sidebar";
import { getTranslations } from "next-intl/server";
import React from "react";
import Section from "@/src/components/section/section";

const Artists = async () => {
  const t = await getTranslations("artists");

  const artists = [
    {
      letter: "A",
      artists: [
        {
          name: "Alejandra Majewski",
          bio: "É impossível saber o caminho pelo qual se percorre a criatividade. É uma receita incerta, cujos ingredientes misturam um tanto de subjetividade, fantasia e sonho, com quantidades elevadas da realidade social, política e económica vivida pelo artista.",
          imageUrl: "/images/1.jpeg",
          artworks: [
            "/images/1.jpeg",
            "/images/1.jpeg",
            "/images/1.jpeg",
            "/images/1.jpeg",
            "/images/1.jpeg",
            "/images/1.jpeg",
          ],
        },
        {
          name: "Alexandre Cabrita",
          bio: "Artista multifacetado explorando novos estilos e conceitos.",
          imageUrl: "/images/1.jpeg",
          artworks: [
            "/images/1.jpeg",
            "/images/1.jpeg",
            "/images/1.jpeg",
            "/images/1.jpeg",
            "/images/1.jpeg",
            "/images/1.jpeg",
          ],
        },
      ],
    },
    {
      letter: "M",
      artists: [
        {
          name: "Marian Van Der Zwan",
          bio: "Exploração artística focada na abstração e colaboração.",
          imageUrl: "/images/1.jpeg",
          artworks: [
            "/images/1.jpeg",
            "/images/1.jpeg",
            "/images/1.jpeg",
            "/images/1.jpeg",
            "/images/1.jpeg",
            "/images/1.jpeg",
          ],
        },
        {
          name: "Mark Rothko",
          bio: "Famoso por suas pinturas de grande escala e uso de cor.",
          imageUrl: "/images/1.jpeg",
          artworks: [
            "/images/1.jpeg",
            "/images/1.jpeg",
            "/images/1.jpeg",
            "/images/1.jpeg",
            "/images/1.jpeg",
            "/images/1.jpeg",
          ],
        },
      ],
    },
  ];

  return (
    <div className="m-12 flex flex-row gap-24">
      <Sidebar
        type="artists"
        artists={artists.map((group) => ({
          letter: group.letter,
          names: group.artists.map((artist) => artist.name),
        }))}
      />
      <div className="w-full">
        <h2 className="mb-8">{t("title")}</h2>
        {artists.map((item, index) => (
          <>
            <div key={item.letter}>
              {item.artists.map((artist, index) => (
                <React.Fragment key={artist.name}>
                  <Section artistItem={artist} />
                  {index !== item.artists.length - 1 && (
                    <div className="my-32 border-b border-gray-200" />
                  )}
                </React.Fragment>
              ))}
            </div>
            {index !== artists.length - 1 && (
              <div className="my-32 border-b border-gray-200" />
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export default Artists;
