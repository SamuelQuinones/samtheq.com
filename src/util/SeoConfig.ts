import type { DefaultSeoProps } from "next-seo";

const SEO: DefaultSeoProps = {
  canonical: "https://samtheq.com",
  description:
    "A personal website for Samuel Quinones, to show off projects and a personal portfolio",
  titleTemplate: "%s | SamTheQ",
  twitter: {
    handle: "@SamuelQuinones1",
    site: "@SamuelQuinones1",
    cardType: "summary",
  },
  openGraph: {
    type: "website",
    url: "https://samtheq.com",
    site_name: "SamTheQ",
    images: [
      {
        url: "https://samtheq.com/favicon.png",
        alt: "SamTheQ logo",
      },
    ],
  },
  additionalLinkTags: [{ rel: "icon", href: "/favicon.ico" }],
  additionalMetaTags: [
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { name: "author", content: "Samuel Quinones" },
  ],
};

export default SEO;
