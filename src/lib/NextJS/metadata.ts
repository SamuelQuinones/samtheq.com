import deepmerge from "deepmerge";
import type { Metadata } from "next";

const title = {
  default: "SamTheQ",
  template: "%s | SamTheQ",
};

const description =
  "A personal website for Samuel Quinones, to show off projects and a personal portfolio";

export const SEO: Metadata = {
  title,
  creator: "Samuel Quinones",
  colorScheme: "dark",
  alternates: {
    canonical: process.env.NEXT_PUBLIC_BASE_URL,
  },
  icons: [
    {
      rel: "icon",
      url: "/favicon.ico",
      type: "image/x-icon",
    },
  ],
  description,
  twitter: {
    creator: "@SamuelQuinones1",
    card: "summary",
    description,
    title,
  },
  openGraph: {
    title,
    type: "website",
    siteName: "SamTheQ",
    url: process.env.NEXT_PUBLIC_BASE_URL,
    description,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/Logo_866.png`,
        alt: "SamTheQ logo",
        type: "image/png",
      },
    ],
  },
  authors: [{ name: "Samuel Quinones", url: "https://samtheq.com" }],
};

/**
 * because NextJS doesnt support deep merging as of March 18th, 2023, this will have to do for now
 *
 * @param metadata pass in data in the NextJS metadata shape
 * @returns a valid NextJS metadata object based on the parameters merged with defaults
 */
export function mergeMetadata<T extends Metadata>(metadata: T) {
  return deepmerge(SEO, metadata, {
    arrayMerge: (dest, source) => [...dest, ...source],
  });
}
