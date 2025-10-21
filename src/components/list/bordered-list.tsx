import { MouseEventHandler, ReactNode } from "react";
import { Body, Subtitle } from "../headings/headings";

interface Item {
  title: string;
  onItemClick?: MouseEventHandler<HTMLLIElement>;
  children?: ReactNode;             
  key?: string | number;            
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
      {items.map((item, i) => (
        <li
          className={`
            flex items-center justify-center text-center
            border-t py-3 last:border-b
            sm:py-1 sm:h-12
            ${item.onItemClick ? "cursor-pointer" : ""}
            sm:justify-start sm:text-left
          `}
          key={item.key ?? item.title ?? i}
          onClick={item.onItemClick}
        >
          <div className="flex items-center sm:justify-start">
            {bulleted && (
              <span className="mr-2 sm:inline-block hidden list-disc">●</span>
            )}
            {itemClassName === "body" ? (
              <Body className={`${item.onItemClick ? "hover:opacity-80" : ""}`}>{item.title}</Body>
            ) : (
              <Subtitle className={`${item.onItemClick ? "hover:opacity-80" : ""}`}>{item.title}</Subtitle>
            )}
          </div>

          {item.children && (
            <div className="flex items-center gap-3">
              {item.children}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default BorderedList;