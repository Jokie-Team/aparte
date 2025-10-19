// src/utils/server-url.ts
import { headers } from "next/headers";

/**
 * Base URL correta para chamadas no SERVIDOR (RSC/SSR/Route Handlers)
 * Funciona tanto em local, Vercel (Node/Edge), como em previews.
 */
export function getServerBaseUrl(): string {
  const h = headers();

  // Wrapper defensivo para garantir compatibilidade com HeadersList e Headers
  const getHeader = (key: string): string | null => {
    try {
      if (typeof (h as any).get === "function") {
        return (h as any).get(key);
      }
      if (typeof (h as any).getAll === "function") {
        const values = (h as any).getAll(key);
        return Array.isArray(values) ? values[0] : null;
      }
    } catch {
      // silencioso — runtime edge pode não permitir
    }
    return null;
  };

  const host =
    getHeader("x-forwarded-host") ??
    getHeader("host") ??
    process.env.VERCEL_URL ?? // p.ex. aparte-xxxxx.vercel.app
    process.env.NEXT_PUBLIC_BASE_URL?.replace(/^https?:\/\//, "") ??
    "localhost:3000";

  const proto =
    getHeader("x-forwarded-proto") ??
    (host.startsWith("localhost") ? "http" : "https");

  return `${proto}://${host}`;
}
