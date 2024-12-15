"use client";
import ContentfulImage from "@/lib/contentful-image";
import { PictureProps } from "@/lib/types";
import React, { useState } from "react";
import { Arrow } from "./icons/arrow";

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
    <div className="relative w-full mt-10">
      {currentIndex > 0 && (
        <button
          onClick={handlePrev}
          className="absolute left-0 top-0"
        >
          <Arrow size={28} direction="left" />
        </button>
      )}

      {currentIndex < images.length - visibleCount && (
        <button
          onClick={handleNext}
          className="absolute right-6 top-0"
        >
          <Arrow size={28} direction="right" />
        </button>
      )}

      <div className="overflow-hidden w-full mt-16">
        <div
          className="flex transition-transform duration-300"
          style={{
            transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
            gap: "24px"
          }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="flex-none w-1/6"
              style={{ flex: `0 0 calc(${100 / visibleCount}% - 24px)` }}
            >
              <img
                src={image.url}
                alt={`Slide ${index}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
