"use client";
import { ArrowDown } from "../icons/arrow-down";

const IconButton = () => {
  return (
    <div
      style={{
        fontFamily: "var(--font-neue-haas)",
      }}
      className="relative inline-block text-left cursor-pointer pb-1"
    >
      <button
        type="button"
        className="text-white  bg-black font-extrabold justify-center rounded-full p-2"
        id="menu-button"
        aria-haspopup="true"
      >
        {<ArrowDown fill="#ffff" rotateUp size="40" />}
      </button>
    </div>
  );
};

export default IconButton;
