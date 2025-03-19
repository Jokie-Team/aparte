"use client";
import React from "react";
import Image from "next/image";

const artworks = [
  {
    src: "/images/1.jpeg",
    style: "col-start-1 col-span-1 row-start-2 row-span-1 h-50",
    alt: "Artwork 1",
  },
  {
    src: "/images/2.jpeg",
    style: "col-start-2 col-span-1 row-start-1 row-span-1 h-50",
    alt: "Artwork 1",
  },
  {
    src: "/images/3.jpeg",
    style: "col-start-3 col-span-2 row-start-1 row-span-2 h-[100%]",
    alt: "Artwork 2",
  },
  {
    src: "/images/4.jpeg",
    style: "col-start-5 col-span-2 row-start-1 row-span-1 h-50",
    alt: "Artwork 3",
  },
  {
    src: "/images/5.jpeg",
    style: "col-start-5 col-span-2 row-start-2 row-span-1 h-30",
    alt: "Artwork 4",
  },
  {
    src: "/images/6.jpeg",
    style: "col-start-5 col-span-2 row-start-3 row-span-1 h-20",
    alt: "Artwork 5",
  },
  {
    src: "/images/7.jpeg",
    style: "col-start-2 col-span-1 row-start-2 row-span-1 h-40",
    alt: "Artwork 6",
  },
  {
    src: "/images/8.jpeg",
    style: "col-start-7 col-span-3 row-start-1 row-span-1 h-64",
    alt: "Artwork 7",
  },
  {
    src: "/images/9.jpeg",
    style: "col-start-7 col-span-3 row-start-2 row-span-1 h-64",
    alt: "Artwork 8",
  },
];

const RandomGallery = () => {
  return (
    <div className="grid grid-cols-9 grid-rows-2 py-5 gap-2 w-full max-w-full mx-auto h-full">
      {artworks.map((artwork, index) => (
        <div key={index} className={`relative ${artwork.style}`}>
          <Image
            src={artwork.src}
            alt={artwork.alt}
            fill
            style={{ objectFit: "cover" }}
            className="rounded-lg"
          />
        </div>
      ))}
    </div>
  );
};

export default RandomGallery;
