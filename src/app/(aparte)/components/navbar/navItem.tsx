"use client";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

const navItem = ({
  text,
  href
}: {
  text: string;
  href: string;
}) => {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const router = useRouter()
  const currentPage = usePathname();

  const isActive = currentPage === href;

  const handleNavigation = (path: string) => {
    router.prefetch(path);
    router.push(path);
  };

  return (
    <div
      style={{
        fontFamily: "var(--font-neue-haas)",
      }}
      className="relative inline-block text-center"
    >
      <button
        type="button"
        style={{ borderBottomWidth: `${hovered ? "1.5px" : 0}` }}
        className="font-normal py-2"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => { handleNavigation(href); setClicked(!clicked) }}
      >
        <span
          className={`transition-all duration-300 ${hovered ? "px-4 font-extrabold" : null} ${isActive ? "font-bold" : "font-normal"}`}
        >
          {text}
        </span>
      </button>
    </div>
  );
};

export default navItem;
