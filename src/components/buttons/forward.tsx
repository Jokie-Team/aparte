"use client";
import { ReactElement, useState } from "react";
import { ArrowRight } from "../icons/arrow-right";
import { Arrow } from "../icons/arrow-down";
import clsx from "clsx";

const AccordionButton = ({
  text,
  disabled = false,
  children,
  clicked,
  setClicked,
}: {
  text: string;
  disabled?: boolean;
  children: ReactElement;
  clicked: boolean;
  setClicked: Function;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={clsx("relative text-left pb-1 flex flex-col", {
        "cursor-none": disabled,
        "cursor-pointer": !disabled,
      })}
    >
      <button
        type="button"
        style={{ borderBottomWidth: "1px" }}
        className="disabled:opacity-25 border-black font-extrabold inline-flex justify-between gap-x-1.5 py-2"
        id="menu-button"
        aria-haspopup="true"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setClicked((clicked: boolean) => !clicked)}
        disabled={disabled}
      >
        <span
          className={clsx("transition-all duration-300", {
            "mr-8": hovered,
            "mr-4": !hovered,
          })}
        >
          {text}
        </span>
        {clicked ? <Arrow /> : <ArrowRight />}
      </button>
      {clicked ? <div className="my-5">{children}</div> : null}
    </div>
  );
};

export default AccordionButton;
