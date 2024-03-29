import deepmerge from "deepmerge";
import isPlainObject from "@/util/is-plain-object";
import type { Metadata } from "next";

const title = {
  default: "SamTheQ",
  template: "%s | SamTheQ",
};

const description =
  "A personal website for Samuel Quinones, to show off projects and a personal portfolio";

const SEO: Metadata = {
  title,
  creator: "Samuel Quinones",
  generator: "Next.js",
  alternates: {
    canonical: "/",
  },
  icons: [
    {
      rel: "icon",
      url: "/favicon.ico",
      type: "image/x-icon",
    },
    {
      rel: "apple-touch-icon",
      url: "/apple-touch-icon.png",
      sizes: "180x180",
      type: "image/png",
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
    url: "/",
    description,
    images: [
      {
        url: `/Logo_866.png`,
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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    arrayMerge: (dest, source) => [...dest, ...source],
    isMergeableObject: isPlainObject,
  });
}
