import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";

const LOCALES = ["en", "pt"] as const;
const DEFAULT_LOCALE = "pt";

const intlMiddleware = createMiddleware({
  locales: ["en", "pt"],
  defaultLocale: "pt",
  localeDetection: true,
});

export default function middleware(req: NextRequest) {
  const maintenance = process.env.MAINTENANCE_MODE === "1";

  // deixa o next-intl fazer redirects de locale quando necessário
  const intlResponse = intlMiddleware(req);

  if (!maintenance) return intlResponse;

  const pathname = req.nextUrl.pathname;

  // não interceptar a própria página de manutenção
  if (pathname === "/en/maintenance" || pathname === "/pt/maintenance") {
    return intlResponse;
  }

  // se o next-intl responder com redirect (ex: "/" -> "/pt"), troca o destino para maintenance
  const location = intlResponse?.headers?.get("location");
  if (location) {
    const redirected = new URL(location, req.url);
    const seg1 = redirected.pathname.split("/")[1];
    const locale = (LOCALES as readonly string[]).includes(seg1) ? seg1 : DEFAULT_LOCALE;

    const dest = new URL(req.url);
    dest.pathname = `/${locale}/maintenance`;
    return NextResponse.redirect(dest);
  }

  // caso normal: rewrite para /{locale}/maintenance
  const seg1 = pathname.split("/")[1];
  const locale = (LOCALES as readonly string[]).includes(seg1) ? seg1 : DEFAULT_LOCALE;

  const url = req.nextUrl.clone();
  url.pathname = `/${locale}/maintenance`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
