import React from "react";

export default function Heading1({
  children,
  classnames,
}: Readonly<{ children: React.ReactNode; classnames?: string }>) {
  return (
    <h1 className={`font-neue font-extrabold text-5xl ${classnames}`}>
      {children}
    </h1>
  );
}
