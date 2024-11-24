"use client";

import clsx from "clsx";

const Button = ({
  text,
  filled = false,
  disabled = false,
  uppercase = false,
  classnames,
}: {
  text: string;
  filled?: boolean;
  disabled?: boolean;
  uppercase?: boolean;
  classnames?: string;
}) => {
  return (
    <button
      className={clsx(
        "font-medium px-6 hover:opacity-75 disabled:opacity-25 hover:border-opacity-75 disabled:border-opacity-25",
        {
          "py-4": uppercase,
          "py-3": !uppercase,
          "bg-black text-white border-none": filled,
          "transparent text-black border border-1 border-black": !filled,
        },
        classnames
      )}
      disabled={disabled}
    >
      {uppercase ? text.toUpperCase() : text.toLowerCase()}
    </button>
  );
};

export default Button;
