import { headers } from "next/headers";

export function getServerBaseUrl(): string {
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  const h = headers();

  const getHeader = (key: string): string | null => {
    try {
      if (typeof (h as any).get === "function") return (h as any).get(key);
      if (typeof (h as any).getAll === "function") {
        const v = (h as any).getAll(key);
        return Array.isArray(v) ? v[0] : null;
      }
    } catch {}
    return null;
  };

  const host =
    getHeader("x-forwarded-host") ??
    getHeader("host") ??
    "localhost:3000";

  const proto =
    getHeader("x-forwarded-proto") ??
    (host.startsWith("localhost") ? "http" : "https");

  return `${proto}://${host}`;
}
