"use client";
import React from "react";
import Image from "next/image";
import { Artwork } from "@/lib/artworks";

const RandomGallery = ({ artworks }: { artworks: Artwork[] }) => {
  return (
    <div className="grid grid-cols-12 gap-4 w-full h-[65vh] pb-5">
      <div className="relative col-span-3 row-span-1 h-full">
        <Image
          src={artworks[0].images[0].url}
          alt="Artwork 1"
          fill
          style={{ objectFit: "cover" }}
          className="rounded"
        />
      </div>
      <div className="relative col-span-3 row-span-2 h-full">
        <Image
          src={artworks[1].images[0].url}
          alt="Artwork 2"
          fill
          style={{ objectFit: "cover" }}
          className="rounded"
        />
      </div>
      <div className="relative col-span-3 row-span-3 h-full">
        <Image
          src={artworks[2].images[0].url}
          alt="Artwork 3"
          fill
          style={{ objectFit: "cover" }}
          className="rounded"
        />
      </div>
      <div className="relative col-span-3 row-span-4 h-full">
        <Image
          src={artworks[3].images[0].url}
          alt="Artwork 4"
          fill
          style={{ objectFit: "cover" }}
          className="rounded"
        />
      </div>
      <div className="relative col-span-6 row-span-2 h-full">
        <Image
          src={artworks[4].images[0].url}
          alt="Artwork 5"
          fill
          style={{ objectFit: "cover" }}
          className="rounded"
        />
      </div>
      <div className="relative col-span-6 row-span-1 h-full">
        <Image
          src={artworks[5].images[0].url}
          alt="Artwork 6"
          fill
          style={{ objectFit: "cover" }}
          className="rounded"
        />
      </div>
      <div className="relative col-span-9 row-span-3 h-full">
        <Image
          src={artworks[6].images[0].url}
          alt="Artwork 7"
          fill
          style={{ objectFit: "cover" }}
          className="rounded"
        />
      </div>
      <div className="relative col-span-3 row-span-2 h-full">
        <Image
          src={artworks[7].images[0].url}
          alt="Artwork 8"
          fill
          style={{ objectFit: "cover" }}
          className="rounded"
        />
      </div>
      <div className="relative col-span-3 row-span-1 h-full">
        <Image
          src={artworks[8].images[0].url}
          alt="Artwork 9"
          fill
          style={{ objectFit: "cover" }}
          className="rounded"
        />
      </div>
    </div>
  );
};

export default RandomGallery;
