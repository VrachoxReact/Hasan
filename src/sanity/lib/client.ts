import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImageSource = any;

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: process.env.NODE_ENV === "production",
});

const builder = imageUrlBuilder(client);

/**
 * Generate optimized image URLs from Sanity
 * @example urlFor(image).width(800).height(600).url()
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

/**
 * Get image dimensions for Next.js Image component
 */
export function getImageDimensions(image: SanityImageSource): {
  width: number;
  height: number;
  aspectRatio: number;
} {
  const ref = (image as { asset?: { _ref?: string } })?.asset?._ref;
  if (!ref) {
    return { width: 800, height: 600, aspectRatio: 4 / 3 };
  }

  const dimensions = ref.split("-")[2];
  const [width, height] = dimensions.split("x").map(Number);

  return {
    width,
    height,
    aspectRatio: width / height,
  };
}
