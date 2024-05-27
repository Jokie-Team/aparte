"use client";
import { ReactElement, useState } from "react";
import { ArrowRight } from "../icons/arrow-right";
import { Arrow } from "../icons/arrow-down";

const AccordionButton = ({
  text,
  disabled = false,
  children,
}: {
  text: string;
  disabled?: boolean;
  children: ReactElement;
}) => {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  return (
    <div
      style={{
        fontFamily: "var(--font-neue-haas)",
        cursor: disabled ? "none" : "pointer",
      }}
      className="relative inline-block text-left pb-1 flex flex-col w-3/5"
    >
      <button
        type="button"
        style={{ borderBottomWidth: "1px" }}
        className="disabled:opacity-25 border-black font-extrabold inline-flex justify-between gap-x-1.5 py-2"
        id="menu-button"
        aria-haspopup="true"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setClicked((clicked) => !clicked)}
        disabled={disabled}
      >
        <span
          className={`transition-all duration-300 ${hovered ? "mr-8" : "mr-4"}`}
        >
          {text}
        </span>
        {clicked ? <Arrow /> : <ArrowRight />}
      </button>
      <div className="my-5">{clicked ? children : null}</div>
    </div>
  );
};

export default AccordionButton;
