import { LngProvider } from "./context/language";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LngProvider>{children}</LngProvider>;
}
