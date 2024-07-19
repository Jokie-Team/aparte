"use client";

import { createContext, useContext, useState } from "react";

export type Lng = "pt" | "en";

const LngContext = createContext<{
  language: Lng;
  setLanguage: (Lng: Lng) => void;
}>({
  language: "pt",
  setLanguage: () => {},
});

const useLngContext = () => useContext(LngContext);

export const LngProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentLng, setLng] = useState<Lng>("pt");

  return (
    <LngContext.Provider value={{ language: currentLng, setLanguage: setLng }}>
      {children}
    </LngContext.Provider>
  );
};

export default useLngContext;
