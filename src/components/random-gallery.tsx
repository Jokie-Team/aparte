"use client";
import React, { useMemo } from "react";
import Image from "next/image";

const images = [
    "/images/1.jpeg",
    "/images/2.jpeg",
    "/images/3.jpeg",
    "/images/4.jpeg",
    "/images/5.jpeg",
    "/images/6.jpeg",
    "/images/7.jpeg",
    "/images/8.jpeg",
    "/images/9.jpeg",
    "/images/10.jpeg",
];

const shuffleArray = (array: string[]) => {
    return array.sort(() => Math.random() - 0.5);
};


const RandomGallery = () => {
    const shuffledImages = useMemo(() => shuffleArray([...images]), []);

    return (
        <div className="grid grid-cols-12 gap-4 w-full h-[50vh] pb-5">
            <div className="relative col-span-3 row-span-1 h-full">
                <Image src={shuffledImages[0]} alt="Artwork 1" fill style={{ objectFit: "cover" }} className="rounded" />
            </div>
            <div className="relative col-span-3 row-span-2 h-full">
                <Image src={shuffledImages[1]} alt="Artwork 2" fill style={{ objectFit: "cover" }} className="rounded" />
            </div>
            <div className="relative col-span-3 row-span-3 h-full">
                <Image src={shuffledImages[2]} alt="Artwork 3" fill style={{ objectFit: "cover" }} className="rounded" />
            </div>
            <div className="relative col-span-3 row-span-4 h-full">
                <Image src={shuffledImages[3]} alt="Artwork 4" fill style={{ objectFit: "cover" }} className="rounded" />
            </div>
            <div className="relative col-span-6 row-span-2 h-full">
                <Image src={shuffledImages[4]} alt="Artwork 5" fill style={{ objectFit: "cover" }} className="rounded" />
            </div>
            <div className="relative col-span-6 row-span-1 h-full">
                <Image src={shuffledImages[5]} alt="Artwork 6" fill style={{ objectFit: "cover" }} className="rounded" />
            </div>
            <div className="relative col-span-9 row-span-3 h-full">
                <Image src={shuffledImages[6]} alt="Artwork 7" fill style={{ objectFit: "cover" }} className="rounded" />
            </div>
            <div className="relative col-span-3 row-span-2 h-full">
                <Image src={shuffledImages[7]} alt="Artwork 8" fill style={{ objectFit: "cover" }} className="rounded" />
            </div>
            <div className="relative col-span-3 row-span-1 h-full">
                <Image src={shuffledImages[8]} alt="Artwork 9" fill style={{ objectFit: "cover" }} className="rounded" />
            </div>
        </div>
    );
};

export default RandomGallery;
