import "@/src/styles/globals.css";
import Footer from "../../components/footer";
import Header from "../../components/header/header";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import ScrollUp from "@/src/components/buttons/scrollup";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;

  if (!locale) {
    throw new Error("Locale parameter is required.");
  }

  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages} locale={locale}>
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
