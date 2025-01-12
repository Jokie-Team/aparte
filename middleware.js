import { NextResponse } from "next/server";
import { locales } from "./i18n.config";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Verifica se o caminho já inclui um locale
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    // Locale padrão (substitua "en" pelo seu idioma padrão)
    const defaultLocale = "en";

    // Redireciona para o caminho com o locale padrão
    return NextResponse.redirect(
      new URL(`/${defaultLocale}${pathname}`, request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  // Middleware será executado para todas as rotas, exceto APIs e assets estáticos
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
