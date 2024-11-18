"use client";
import React, { useState } from "react";

interface CarouselProps {
  images: string[];
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
      <div className="flex items-center">
        {currentIndex > 0 && (
          <button
            onClick={handlePrev}
            className="absolute left-0 z-10 p-2 bg-white rounded-full shadow-md"
          >
            ←
          </button>
        )}
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
                <img
                  src={image}
                  alt={`Slide ${index}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        {currentIndex < images.length - visibleCount && (
          <button
            onClick={handleNext}
            className="absolute right-0 z-10 p-2 bg-white rounded-full shadow-md"
          >
            →
          </button>
        )}
      </div>
    </div>
  );
};

export default Carousel;
