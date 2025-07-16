import "@/src/styles/globals.css";
import Footer from "../../components/footer";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import ScrollUp from "@/src/components/buttons/scrollup";
import React from "react";
import Header from "@/src/components/header/header";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale?: string };
}) {
  const { locale } = await params;

  if (!locale || typeof locale !== "string") {
    throw new Error("Locale parameter is required and must be a valid string.");
  }

  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <section className="flex flex-col">
            <div className="flex flex-col min-h-screen">
              <main className="mt-16 flex flex-1 bg-gray-100 overflow-y-auto">
                <Header showBorder={true} />
                {children}
              </main>
            </div>
            <Footer />
            <ScrollUp direction="up" />
          </section>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
