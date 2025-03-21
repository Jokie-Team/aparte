"use client";
import { useState } from "react";
import { ExpandMoreIcon } from "../icons/expand-more";
import clsx from "clsx";

const DropdownButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (event: React.MouseEvent) =>
    setIsOpen((prevIsOpen) => !prevIsOpen);

  return (
    <div
      className="relative inline-block text-left cursor-pointer"
      onClick={handleClick}
    >
      <button
        type="button"
        className="font-extrabold	inline-flex w-full justify-center gap-x-1.5 px-3 py-2"
        id="menu-button"
        aria-expanded={isOpen ? "true" : "false"}
        aria-haspopup="true"
      >
        <span>Options</span>
        <ExpandMoreIcon rotate180={isOpen} />
      </button>
      <div
        className={clsx(
          "pt-6 text-left absolute left-0 top-0 z-10 mt-2 w-56 origin-top-right rounded-md",
          { block: isOpen, hidden: !isOpen }
        )}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
      >
        <div className="py-1" role="none">
          <a
            href="/"
            className="text-gray-700 block px-4 py-2 text-sm"
            role="menuitem"
            id="menu-item-0"
          >
            Account settings
          </a>
          <a
            href="/"
            className="text-gray-700 block px-4 py-2 text-sm"
            role="menuitem"
            id="menu-item-1"
          >
            Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default DropdownButton;
