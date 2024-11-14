import clsx from "clsx";

export type RotateDirection = "up" | "left" | "down" | "right";

export const Arrow = ({
  fill = "#2B2B2B",
  rotate = "down",
  size = "40",
}: {
  fill?: string;
  rotate?: RotateDirection;
  size?: string;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={clsx("-rotate-90", {
      "rotate-0": rotate === "up",
      "rotate-90": rotate === "right",
      "rotate-180": rotate === "down",
    })}
  >
    <mask
      id="mask0_2404_2560"
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="40"
      height="40"
    >
      <rect width="40" height="40" fill="#D9D9D9" />
    </mask>
    <g mask="url(#mask0_2404_2560)">
      <path
        d="M18.9443 33.6666V12.2916L8.94429 22.2916L6.99988 20.3333L20.3332 6.99997L33.6665 20.3333L31.7221 22.2916L21.7221 12.2916V33.6666H18.9443Z"
        fill={fill}
      />
    </g>
  </svg>
);
