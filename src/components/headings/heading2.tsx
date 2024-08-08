import React from "react";

export default function Heading2({
  children,
  classnames,
}: Readonly<{ children: React.ReactNode; classnames: string }>) {
  return (
    <h2 className={`font-neue font-bold text-lg ${classnames}`}>{children}</h2>
  );
}
