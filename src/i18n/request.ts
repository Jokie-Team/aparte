import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { locales, Locale } from "../i18n.config";

export default getRequestConfig(async () => {
  const localeHeader = (await headers()).get('X-NEXT-INTL-LOCALE');

  // Certifique-se de que o locale é uma string válida
  const locale = localeHeader && locales.includes(localeHeader as Locale)
    ? localeHeader
    : undefined; // Use `undefined` ao invés de `null` para omitir o atributo no DOM

  if (!locale) {
    return notFound();
  }

  return {
    locale, // Inclui o locale para uso no sistema
    messages: (await import(`../app/locales/${locale}.json`)).default,
  };
});
