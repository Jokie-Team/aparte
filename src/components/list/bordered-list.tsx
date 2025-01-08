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
          className={`flex items-center border-t h-12 py-1 last:border-b ${
            item.onItemClick && "cursor-pointer"
          }`}
          key={item.title}
          onClick={item.onItemClick}
        >
          {bulleted && <span className="mr-2 list-disc">•</span>}
          {itemClassName == "body" ? (
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
