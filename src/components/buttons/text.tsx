"use client";
import { Arrow } from "../icons/arrow-down";

const TextButton = ({ text }: { text: string }) => {
  return (
    <div className="relative inline-block text-left cursor-pointer pb-1">
      <button
        type="button"
        className="inline-flex space-x-14 w-full justify-center gap-x-1.5 py-2"
        id="menu-button"
        aria-haspopup="true"
      >
        <span>{text}</span>
        <Arrow rotate="right" />
      </button>
    </div>
  );
};

export default TextButton;
