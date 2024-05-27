import "../../styles/globals.css";
import { CMS_NAME } from "@/lib/constants";
import localFont from "next/font/local";
import Footer from "../../components/footer";
import Header from "../../components/header";

import { dir } from "i18next";

const languages = ["en", "de"];

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export const metadata = {
  title: `Next.js and ${CMS_NAME} Example`,
  description: `This is a blog built with Next.js and ${CMS_NAME}.`,
};

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

export default function RootLayout({
  children,
  params: { lng },
}: {
  children: React.ReactNode;
  params: {
    lng: string;
  };
}) {
  return (
    <html lang={lng} dir={dir(lng)} className={neueHaas.variable}>
      <body>
        <section className="min-h-screen">
          <Header lng={lng} />
          <main className="flex-grow">{children}</main>
          <Footer />
        </section>
      </body>
    </html>
  );
}
