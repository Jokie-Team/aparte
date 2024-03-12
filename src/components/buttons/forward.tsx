"use client";
import { useState } from "react";
import { ArrowRight } from "../icons/arrow-right";

const ForwardButton = ({
  text,
  disabled = false,
}: {
  text: string;
  disabled?: boolean;
}) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{
        fontFamily: "var(--font-neue-haas)",
        cursor: disabled ? "none" : "pointer",
      }}
      className="relative inline-block text-left cursor-pointer pb-1"
    >
      <button
        type="button"
        style={{ borderBottomWidth: "1px" }}
        className="disabled:opacity-25 border-black font-extrabold	inline-flex w-full justify-center gap-x-1.5 py-2"
        id="menu-button"
        aria-haspopup="true"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        disabled={disabled}
      >
        <span
          className={`transition-all duration-300 ${hovered ? "mr-8" : "mr-4"}`}
        >
          {text}
        </span>
        <ArrowRight />
      </button>
    </div>
  );
};

export default ForwardButton;
