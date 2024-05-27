interface Item {
  title: string;
}

interface BorderedListProps<T extends Item> {
  classNames?: string;
  items: T[];
  bulleted?: boolean;
  listClassName?: string;
  itemClassName?: string;
}

const BorderedList = <T extends Item>({
  items,
  bulleted = false,
  listClassName = "font-normal text-base",
  itemClassName = "",
}: BorderedListProps<T>) => {
  return (
    <ul className={`${listClassName} text-sm`}>
      {items.map((item) => (
        <li
          className={`${itemClassName} flex border-t py-1 last:border-b`}
          key={item.title}
        >
          {bulleted && <span className="mr-2 list-disc">•</span>}
          <div>{item.title}</div>
        </li>
      ))}
    </ul>
  );
};

export default BorderedList;
