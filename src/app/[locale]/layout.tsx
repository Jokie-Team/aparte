import "@/src/styles/globals.css";
import Footer from "../../components/footer";
import {NextIntlClientProvider} from "next-intl";
import {getMessages} from "next-intl/server";
import ScrollUp from "@/src/components/buttons/scrollup";
import Header from "@/src/components/header/header";
import * as React from "react";

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({children, params}: LocaleLayoutProps) {
  const {locale} = await params;              
  const messages = await getMessages();         

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <section className="flex flex-col">
            <div className="flex flex-col min-h-screen">
              <Header showBorder={true} />
              <main className="mt-16 flex flex-1 bg-gray-100 overflow-y-auto">
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

export function generateStaticParams() {
  return [{locale: "pt"}, {locale: "en"}];
}
