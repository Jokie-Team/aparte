import "@/src/styles/globals.css";
import { getLocale } from "next-intl/server";
import * as React from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";

function docLang(l?: string) {
  return l === "pt" ? "pt" : l === "en" ? "en" : "en";
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale().catch(() => "en");

  return (
    <html lang={docLang(locale)} suppressHydrationWarning>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
