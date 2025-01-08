import clsx from "clsx";

const Divider = ({ className }: { className?: string }) => (
  <hr className={clsx("border-gray-200", className)} />
);

export { Divider };
