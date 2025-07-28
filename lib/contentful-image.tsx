"use client";

import Image from "next/image";
import type { ImageLoader } from "next/image";

interface ContentfulImageProps extends Omit<React.ComponentProps<typeof Image>, 'src' | 'loader'> {
  src: string;
}

const contentfulLoader: ImageLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

export default function ContentfulImage(props: ContentfulImageProps) {
  if (!props.src) return null;

  return (
    <Image
      loader={contentfulLoader}
      {...props}
      alt={props.alt || "Contentful Image"}
      src={props.src}
    />
  );
}
