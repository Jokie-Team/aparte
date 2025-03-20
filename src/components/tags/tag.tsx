import React from "react";
import { BodyExtraBold } from "../headings/headings";

interface TagsProps {
  text: string;
}

const Tag: React.FC<TagsProps> = ({ text }) => {
  return (
    <div className="border border-black rounded-full px-2 py-1 flex items-center align-center w-fit">
      <BodyExtraBold>* {text}</BodyExtraBold>
    </div>
  );
};

export default Tag;
