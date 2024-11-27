"use client";
import ContentfulImage from "@/lib/contentful-image";
import { PictureProps } from "@/lib/types";
import React, { useState } from "react";
import { ArrowRight } from "./icons/arrow-right";
interface CarouselProps {
  images: PictureProps[];
  visibleCount: number;
}

const Carousel: React.FC<CarouselProps> = ({ images, visibleCount }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < images.length - visibleCount ? prevIndex + 1 : prevIndex
    );
  };

  return (
    <div className="relative w-full !mt-10">
      <div className="flex flex-col items-center">
        <div className="flex flex-row justify-between w-full">
          {currentIndex < images.length - visibleCount ? (
            <button onClick={handleNext} className="rotate-180">
              <ArrowRight />
            </button>
          ) : (
            <div></div>
          )}
          {currentIndex > 0 ? (
            <button onClick={handlePrev}>
              <ArrowRight />
            </button>
          ) : (
            <div></div>
          )}
        </div>

        <div className="overflow-hidden w-full">
          <div
            className="flex transition-transform duration-300"
            style={{
              transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
            }}
          >
            {images.map((image, index) => (
              <div
                key={index}
                className="flex-none w-1/6 p-2"
                style={{ flex: `0 0 ${100 / visibleCount}%` }}
              >
                <ContentfulImage
                  alt={image.alt || ""}
                  src={image.url}
                  width={500}
                  height={500}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
