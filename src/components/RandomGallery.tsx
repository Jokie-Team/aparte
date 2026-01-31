"use client";
import React, { useMemo } from "react";
import Image from "next/image";
import Masonry from "react-masonry-css";

type ArtworkImage = {
  url: string;
  title?: string;
  description?: string;
  artworkId?: string;
};

type Artwork = {
  id: string;
  name: string;
  images: ArtworkImage[];
};

type RandomGalleryProps = {
  artworks: Artwork[];
  count?: number;
};

const breakpointColumnsObj = {
  default: 4,
  700: 3,
};

export default function RandomGallery({
  artworks,
  count = 8,
}: RandomGalleryProps) {
  const images: ArtworkImage[] = useMemo(() => {
    return [
      ...artworks.flatMap((a) =>
        a.images.map((img) => ({ ...img, artworkId: a.id })),
      ),
    ]
      .sort(() => 0.5 - Math.random())
      .slice(0, count);
  }, [artworks, count]);

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="flex w-auto gap-4 h-full"
      columnClassName="space-y-4"
    >
      {images.map((img, index) => (
        <div key={`${img.artworkId}-${index}`} className="relative w-full">
          <Image
            src={img.url}
            alt={img.title || "Artwork"}
            width={500}
            height={500}
            className="w-full h-auto object-contain"
          />
        </div>
      ))}
    </Masonry>
  );
}
