export const locales = ["en", "pt"] as const; // Locales suportados
export type Locale = typeof locales[number]; // Tipo gerado dinamicamente

export function isValidLocale(locale: string): locale is Locale {
    return locales.includes(locale as Locale);
}
