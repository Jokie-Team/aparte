import React from "react";

interface ArrowProps {
    size?: number;
    direction?: "right" | "left" | "up" | "down";
    fill?: string;
}

export const Arrow: React.FC<ArrowProps> = ({
    size = 24,
    direction = "right",
    fill = "#000",
}) => {
    const scale = size / 24;
    const rotationDegrees =
        direction === "right"
            ? 0
            : direction === "left"
                ? 180
                : direction === "up"
                    ? -90
                    : 90;

    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <mask
                id="mask0_2473_383"
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="24"
                height="24"
            >
                <rect width="24" height="24" fill="#D9D9D9" />
            </mask>
            <g
                mask="url(#mask0_2473_383)"
                transform={`translate(12, 12) scale(${scale}) rotate(${rotationDegrees}) translate(-12, -12)`}
            >
                <path
                    d="M13.8461 17.6534L12.7923 16.5688L16.6116 12.7495H4.5V11.2496H16.6116L12.7923 7.4303L13.8461 6.3457L19.5 11.9995L13.8461 17.6534Z"
                    fill={fill}
                />
            </g>
        </svg>
    );
};
