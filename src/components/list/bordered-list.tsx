import { MouseEventHandler } from "react";
import { Body, Subtitle } from "../headings/headings";

interface Item {
  title: string;
  onItemClick?: MouseEventHandler<HTMLLIElement>;
}

interface BorderedListProps<T extends Item> {
  classNames?: string;
  items: T[];
  bulleted?: boolean;
  itemClassName?: string;
}

const BorderedList = <T extends Item>({
  items,
  bulleted = false,
  itemClassName,
}: BorderedListProps<T>) => {
  return (
    <ul className="text-base">
      {items.map((item) => (
        <li
          className={`
            flex items-center justify-center text-center
            border-t py-3 last:border-b
            sm:py-1 sm:h-12
            ${item.onItemClick ? "cursor-pointer" : ""}
            sm:justify-start sm:text-left
          `}
          key={item.title}
          onClick={item.onItemClick}
        >
          {bulleted && (
            <span className="mr-2 sm:inline-block hidden list-disc">●</span>
          )}
          {itemClassName === "body" ? (
            <Body>{item.title}</Body>
          ) : (
            <Subtitle>{item.title}</Subtitle>
          )}
        </li>
      ))}
    </ul>

  );
};

export default BorderedList;
