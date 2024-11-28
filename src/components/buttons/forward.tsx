"use client";
import { ReactNode, useState } from "react";
import { Arrow } from "../icons/arrow";
import clsx from "clsx";

const ForwardButton = ({
  onClick,
  disabled = false,
  children,
}: {
  onClick?: () => void;
  disabled?: boolean;
  children: ReactNode;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      type="button"
      style={{ borderBottomWidth: "1px" }}
      className={clsx(
        "disabled:opacity-25 border-black font-extrabold justify-between gap-x-1.5 py-2 text-left pb-1 flex flex-row w-fit",
        {
          "cursor-none": disabled,
          "cursor-pointer": !disabled,
        }
      )}
      id="menu-button"
      aria-haspopup="true"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      disabled={disabled}
      onClick={onClick}
    >
      <span
        className={clsx("transition-all duration-300", {
          "mr-8": hovered,
          "mr-4": !hovered,
        })}
      >
        {children}
      </span>
      <Arrow direction="right" />
    </button>
  );
};

export default ForwardButton;
