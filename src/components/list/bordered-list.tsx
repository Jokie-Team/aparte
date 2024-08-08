import { MouseEventHandler } from "react";

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
          className={`flex border-t py-1 last:border-b ${
            item.onItemClick && "cursor-pointer"
          }`}
          key={item.title}
          onClick={item.onItemClick}
        >
          {bulleted && <span className="mr-2 list-disc">•</span>}
          <div className={itemClassName}>{item.title}</div>
        </li>
      ))}
    </ul>
  );
};

export default BorderedList;
