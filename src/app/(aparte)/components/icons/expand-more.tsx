export const ExpandMoreIcon = ({ rotate180 }: { rotate180: boolean }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`duration-100 ${rotate180 ? "rotate-180" : "rotate-0"}`}
  >
    <mask
      id="mask0_132_540"
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="24"
      height="24"
    >
      <rect width="24" height="24" fill="#D9D9D9" />
    </mask>
    <g mask="url(#mask0_132_540)">
      <path
        d="M12 15.375L6 9.37498L7.4 7.97498L12 12.575L16.6 7.97498L18 9.37498L12 15.375Z"
        fill="#2B2B2B"
      />
    </g>
  </svg>
);
