import "../../styles/globals.css";
import localFont from "next/font/local";
import Footer from "../../components/footer";
import Header from "../../components/header";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

const neueHaas = localFont({
  src: [
    {
      path: "../../public/fonts/NeueHaasUnicaPro-XBlack.ttf",
      weight: "800",
      style: "extra-bold",
    },
    {
      path: "../../public/fonts/NeueHaasUnicaPro-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/NeueHaasUnicaPro-Medium.ttf",
      weight: "600",
      style: "medium",
    },
  ],
  variable: "--font-neue-haas",
});

export default async function LocaleLayout({
  children,
  params: { lng },
}: {
  children: React.ReactNode;
  params: {
    lng: string;
  };
}) {
  // Receive messages provided in `i18n.ts`
  const messages = await getMessages();

  return (
    <html lang={lng} className={neueHaas.variable}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <section className="min-h-screen">
            <Header />
            <main>{children}</main>
            <Footer />
          </section>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
