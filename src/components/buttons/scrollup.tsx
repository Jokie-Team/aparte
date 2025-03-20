"use client";
import { useState, useEffect } from "react";
import { Arrow } from "../icons/arrow";

interface ScrollUpProps {
  direction: "up" | "down" | "left" | "right";
}

const ScrollUp: React.FC<ScrollUpProps> = ({ direction }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleScroll = () => {
    if (window.scrollY > 200) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    isVisible && (
      <div className="fixed bottom-10 right-10 z-50 w-20 h-20 flex items-center justify-center">
        <button
          type="button"
          onClick={scrollToTop}
          className="group w-20 h-20 flex items-center justify-center bg-white border border-black rounded-full hover:bg-black"
        >
          <div className="w-10 h-10 flex items-center justify-center">
            <Arrow
              size={32}
              direction={direction}
              className="fill-black group-hover:fill-white"
            />
          </div>
        </button>
      </div>
    )
  );
};

export default ScrollUp;
