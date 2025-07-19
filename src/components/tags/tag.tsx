import React from "react";
import { BodyExtraBold } from "../headings/headings";
import clsx from "clsx";

interface TagsProps {
  text: string;
  size?: "small" | "large";
  clickable?: boolean;
  selected?: boolean;
}

const Tag: React.FC<TagsProps> = ({ text, size = "large", clickable = false, selected = false }) => {
  return (
    <div className={clsx("border border-black rounded-full flex items-center align-center w-fit", {
      "px-4 py-2 text-xs": size === "small",
      "px-6 py-3 text-sm": size === "large",
      "hover:bg-black hover:text-white hover:cursor-pointer": clickable,
      "bg-black text-white": selected,
    })}>
      <BodyExtraBold>{text}</BodyExtraBold>
    </div>
  );
};

export default Tag;
