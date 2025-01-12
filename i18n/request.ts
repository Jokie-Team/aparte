import { getRequestConfig, setRequestLocale } from "next-intl/server";
import { locales, Locale } from "./i18n.config";

const DEFAULT_LOCALE: Locale = "pt"; // Idioma de fallback

export default getRequestConfig(async ({ locale }) => {
  const validLocale = locales.includes(locale as Locale)
    ? locale
    : DEFAULT_LOCALE;

  setRequestLocale(validLocale);

  return {
    messages: (await import(`../src/app/locales/${validLocale}.json`)).default,
  };
});
