"use client";
import { useState } from "react";
import { Arrow, RotateDirection } from "../icons/arrow-down";

const IconButton = ({ direction }: { direction: RotateDirection }) => {
  const [hovered, setHovered] = useState<boolean | null>(null);

  return (
    <div
      style={{
        fontFamily: "var(--font-neue-haas)",
      }}
      className="relative inline-block text-left cursor-pointer pb-1"
    >
      <button
        type="button"
        className=" bg-black border hover:bg-white hover:border font-extrabold justify-center rounded-full p-2"
        id="menu-button"
        aria-haspopup="true"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {
          <Arrow
            fill={hovered ? "#000" : "#ffff"}
            rotate={direction}
            size="40"
          />
        }
      </button>
    </div>
  );
};

export default IconButton;
