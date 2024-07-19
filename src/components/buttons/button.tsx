"use client";

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
      style={{
        fontFamily: "var(--font-neue-haas)",
      }}
      className={`${classnames} font-medium px-6 
      ${uppercase ? "py-4" : "py-3"} 
      ${
        filled
          ? "bg-black text-white border-none"
          : "transparent text-black border border-1 border-black"
      } 
      hover:opacity-75 disabled:opacity-25 hover:border-opacity-75 disabled:border-opacity-25`}
      disabled={disabled}
    >
      {uppercase ? text.toUpperCase() : text.toLowerCase()}
    </button>
  );
};

export default Button;
