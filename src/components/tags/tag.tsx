import React from "react";
import { Body, BodyExtraBold, SmallBody } from "../headings/headings";
import clsx from "clsx";

interface TagsProps {
  text: string;
  size?: "extrasmall" | "small" | "large";
  clickable?: boolean;
  selected?: boolean;
}

const Tag: React.FC<TagsProps> = ({ text, size = "large", clickable = false, selected = false }) => {
  return (
    <div className={clsx("border border-black rounded-full flex items-center align-center w-fit", {
      "px-2 py-1": size === "extrasmall",
      "px-4 py-2": size === "small",
      "px-6 py-3": size === "large",
      "hover:bg-black hover:text-white hover:cursor-pointer": clickable,
      "bg-black text-white": selected,
    })}>
      {size === "extrasmall" && <SmallBody className="font-bold">{text}</SmallBody>}
      {size === "small" && <Body className="font-bold">{text}</Body>}
      {size === "large" && <BodyExtraBold>{text}</BodyExtraBold>}
    </div>
  );
};

export default Tag;
