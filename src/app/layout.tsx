import { NextIntlClientProvider } from "next-intl";
import { getMessages } from 'next-intl/server';

export default async function RootLayout({
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
    <NextIntlClientProvider messages={messages} locale={lng}>
      {children}
    </NextIntlClientProvider>
  );
}
