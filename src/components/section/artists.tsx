import React from "react";
import Carousel from "../carousel";
import { Artist } from "@/lib/artists";
import ContentfulImage from "@/lib/contentful-image";
import AccordionButton from "../buttons/accordion";
import ForwardButton from "../buttons/forward";

interface TranslationsObject {
  aboutArtists: string;
}

const Section: React.FC<{
  artist: Artist;
  translations: TranslationsObject;
}> = ({ artist, translations }) => (
  <div className="flex flex-col gap-20 my-24">
    <div className="flex flex-row justify-between gap-36">
      <div className="flex flex-col gap-2 w-full">
        <h3 className="text-gray-900">{artist?.name}</h3>
        <p className="text-gray-600">{artist?.bio}</p>
      </div>
      <div className="sm:w-1/3 w-full">
        <ContentfulImage
          src={artist.picture.url}
          alt={artist.picture.alt || `${artist.name}'s picture`}
          width={500}
          height={500}
          className="rounded object-cover"
          priority={false}
          quality={75}
        />
      </div>
    </div>
    <ForwardButton>{translations.aboutArtists}</ForwardButton>
    {/* <Carousel
            images={exhibitionItem?.artworks || artistItem?.artworks || []}
            visibleCount={3}
          /> */}
  </div>
);

export default Section;
