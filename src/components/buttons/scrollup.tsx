"use client";
import { useState } from "react";
import { Arrow, RotateDirection } from "../icons/arrow-down";

const ScrollUp = ({ direction }: { direction: RotateDirection }) => {
  const [hovered, setHovered] = useState<boolean | null>(null);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      style={{
        fontFamily: "var(--font-neue-haas)",
      }}
      className="fixed bottom-10 right-10 z-50 w-20 h-20 flex items-center justify-center"
    >
      <button
        type="button"
        onClick={scrollToTop}
        className="w-20 h-20 flex items-center justify-center bg-white border border-black rounded-full hover:bg-black"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="w-10 h-10 flex items-center justify-center">
          <Arrow
            fill={hovered ? "#fff" : "#000"}
            rotate={direction}
            size="40"
          />
        </div>
      </button>
    </div>
  );
};

export default ScrollUp;
