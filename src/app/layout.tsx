import "../styles/globals.css";
import { CMS_NAME } from "@/lib/constants";
import localFont from "next/font/local";
import Footer from "./(aparte)/components/footer";
import Header from "./(aparte)/components/navbar/header";

export const metadata = {
  title: `Next.js and ${CMS_NAME} Example`,
  description: `This is a blog built with Next.js and ${CMS_NAME}.`,
};

const neueHaas = localFont({
  src: [
    {
      path: "../public/fonts/NeueHaasUnicaPro-XBlack.ttf",
      weight: "800",
      style: "extra-bold",
    },
    {
      path: "../public/fonts/NeueHaasUnicaPro-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/NeueHaasUnicaPro-Medium.ttf",
      weight: "600",
      style: "medium",
    },
  ],
  variable: "--font-neue-haas",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={neueHaas.variable}>
      <body>
        <section className="min-h-screen">
          <Header />
          <main className="h-10">{children}</main>
          <Footer />
        </section>
      </body>
    </html>
  );
}
