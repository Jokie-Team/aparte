"use client";

import Image, { ImageLoader, ImageProps } from "next/image";

type Props = Omit<ImageProps, "src" | "loader"> & {
  src: string; // URL absoluto vindo do Contentful (pode vir com //)
  alt?: string;
};

const CONTENTFUL_HOST_RE =
  /^(?:https?:)?\/\/(?:images|assets|downloads)\.ctfassets\.net\/?/i;

function normalizeSrc(src: string): string {
  if (!src) return "";
  // Contentful por vezes devolve //images.ctfassets.net/...
  if (src.startsWith("//")) return `https:${src}`;
  return src;
}

const contentfulLoader: ImageLoader = ({ src, width, quality }) => {
  const normalized = normalizeSrc(src);

  // Só manipula URLs do Contentful
  if (!CONTENTFUL_HOST_RE.test(normalized)) return normalized;

  const url = new URL(normalized);
  url.searchParams.set("w", String(width));
  if (quality) url.searchParams.set("q", String(quality));
  return url.toString();
};

export default function ContentfulImage({ src, alt = "Image", ...rest }: Props) {
  if (!src) return null;

  const isDev = process.env.NODE_ENV !== "production";
  const normalized = normalizeSrc(src);

  // No dev: nada de loader/optimização (evita 404/loop do _next/image)
  if (isDev) {
    return (
      <Image
        src={normalized}
        alt={alt}
        unoptimized
        loading="lazy"
        {...rest}
      />
    );
  }

  // Produção: usa loader apenas para domínios do Contentful
  const maybeLoader = CONTENTFUL_HOST_RE.test(normalized)
    ? { loader: contentfulLoader }
    : {};

  return (
    <Image
      src={normalized}
      alt={alt}
      loading="lazy"
      {...maybeLoader}
      {...rest}
    />
  );
}
