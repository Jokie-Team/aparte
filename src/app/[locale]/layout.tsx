import "@/src/styles/globals.css";
import localFont from "next/font/local";
import Footer from "../../components/footer";
import Header from "../../components/header/header";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import ScrollUp from "@/src/components/buttons/scrollup";

export default async function LocaleLayout({
  children,
  params: { lng },
}: {
  children: React.ReactNode;
  params: {
    lng: string;
  };
}) {
  const messages = await getMessages();

  return (
    <html lang={lng}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <section className="flex flex-col">
            <div className="flex flex-col min-h-screen">
              <Header showBorder={false} />
              <main className="pt-24 flex flex-1 bg-gray-100 overflow-y-auto">
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
