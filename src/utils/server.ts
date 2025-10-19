// src/utils/server-url.ts
import { headers } from "next/headers";

/** Base URL correta para chamadas no SERVIDOR (RSC/SSR/Route Handlers) */
export async function getServerBaseUrl(): Promise<string> {
  const h = await headers(); 

  const host =
    h.get("x-forwarded-host") ??
    h.get("host") ??
    "localhost:3000";

  const proto =
    h.get("x-forwarded-proto") ??
    (host.startsWith("localhost") ? "http" : "https");

  return `${proto}://${host}`;
}
