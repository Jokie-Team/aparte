import React from "react";

// Heading 1 Component
export function Heading1({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h1 className={`font-neue font-extrabold text-[100px] ${className}`}>
      {children}
    </h1>
  );
}

// Heading 2 Component
export function Heading2({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={`font-neue font-extrabold text-[64px] leading-[64px] ${className}`}>
      {children}
    </h2>
  );
}

// Heading 3 Component
export function Heading3({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h3 className={`font-neue font-regular text-[40px] ${className}`}>
      {children}
    </h3>
  );
}

// Heading 4 Component
export function Heading4({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h4 className={`font-neue font-regular text-[24px] ${className}`}>
      {children}
    </h4>
  );
}

// Subtitle Component
export function Subtitle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h5 className={`font-neue font-extrabold text-[24px] ${className}`}>
      {children}
    </h5>
  );
}

// Body Component
export function Body({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`font-neue font-regular text-[16px] leading-[150%] ${className}`}>
      {children}
    </p>
  );
}

// Body Extra Bold Component
export function BodyExtraBold({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`font-neue font-extrabold text-[16px] ${className}`}>
      {children}
    </p>
  );
}

// Small Body Component
export function SmallBody({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`font-neue font-regular text-[14px] ${className}`}>
      {children}
    </p>
  );
}

// CTA Component
export function CTA({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`font-neue font-extrabold text-[18px] ${className}`}>
      {children}
    </span>
  );
}

// CTA Regular Component
export function CTARegular({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`font-neue font-regular text-[18px] ${className}`}>
      {children}
    </span>
  );
}
