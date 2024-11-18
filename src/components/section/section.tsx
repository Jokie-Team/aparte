import React from "react";
import Image from "next/image";
import { Body, Heading3 } from "../headings/headings";
import Carousel from "../carousel";
import { Artist } from "@/lib/artists";

interface ExhibitionItem {
  title: string;
  description: string;
  artists: string;
  dates: string;
  imageUrl: string;
  artworks?: string[];
}

type SectionProps = {
  exhibitionItem?: ExhibitionItem;
  artistItem?: Artist;
};

const Section: React.FC<SectionProps> = ({ exhibitionItem, artistItem }) => {
  return (
    <div className="flex flex-col space-y-8">
      {exhibitionItem && (
        <div className="inline-flex h-auto w-fit px-4 py-2.5 rounded-3xl border border-[#2b2b2b]">
          <div className="text-[#2b2b2b] text-base font-extrabold font-['Neue Haas Unica']">
            ✴ Coleção / Série X
          </div>
        </div>
      )}

      <div className="flex flex-row justify-between">
        <div className="flex flex-col space-y-4 w-1/2">
          <h3 className="text-gray-900">
            {exhibitionItem ? exhibitionItem.title : artistItem?.name}
          </h3>
          <p className="text-gray-600">
            {exhibitionItem ? exhibitionItem.description : artistItem?.bio}
          </p>
        </div>

        <div className="sm:w-1/3 w-full">
          <Image
            src={
              exhibitionItem
                ? exhibitionItem.imageUrl
                : artistItem
                ? artistItem.picture.url
                : ""
            }
            alt={
              exhibitionItem
                ? exhibitionItem.title
                : artistItem
                ? artistItem.picture.url
                : ""
            }
            width={400}
            height={400}
            className="rounded object-cover"
          />
        </div>
      </div>
      <>
        {exhibitionItem && (
          <>
            <div className="border-t border-gray-300 !mt-10" />
            <p className="text-gray-800 font-medium !my-3">
              {exhibitionItem.artists}
            </p>
            <div className="border-t border-gray-300 !m-0" />
            <p className="text-gray-500 !my-3">{exhibitionItem.dates}</p>
            <div className="border-t border-gray-300 !mb-10 !mt-0" />
          </>
        )}

        <div className="flex !mt-10 space-x-8">
          <a
            href="#"
            className="flex items-center text-gray-800 hover:text-black"
          >
            {exhibitionItem ? "Sobre os Artistas" : "Sobre a Artista"}{" "}
            <span className="ml-2">→</span>
          </a>
          <a
            href="#"
            className="flex items-center text-gray-800 hover:text-black"
          >
            {exhibitionItem ? "Obras da Exposição" : "Ver Exposições"}{" "}
            <span className="ml-2">→</span>
          </a>
        </div>
      </>
      {/* <Carousel
        images={exhibitionItem?.artworks || artistItem?.artworks || []}
        visibleCount={3}
      /> */}
    </div>
  );
};

export default Section;
