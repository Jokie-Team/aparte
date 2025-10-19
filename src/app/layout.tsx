import "@/src/styles/globals.css";
import { getLocale } from "next-intl/server";
import * as React from "react";

function docLang(l?: string) {
  return l === "pt" ? "pt" : l === "en" ? "en" : "en";
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale().catch(() => "en");

  return (
    <html lang={docLang(locale)} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
