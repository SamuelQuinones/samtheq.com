import { FC } from "react";
import NextHead from "next/head";
import { MetaData } from "@util/Config";

type HeadProps = {
  title: string;
  flipOrder?: boolean;
  description?: string;
  slug?: string;
  // hideNavbar?: boolean;
};

const STQHead: FC<HeadProps> = ({
  title,
  flipOrder,
  description = MetaData.description,
  slug,
}) => {
  const titleString = flipOrder
    ? `${MetaData.title} ${title}`
    : `${title} ${MetaData.title}`;

  const path = title.toLowerCase() === "home" ? "" : title.toLowerCase();

  return (
    <NextHead>
      <title>{titleString}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
      <meta name="description" content={description} />
      <meta property="og:title" content={titleString} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={MetaData.title} />
      <meta
        property="og:image"
        content={`${process.env.NEXT_PUBLIC_BASE_URL}/images/logo.png`}
      />
      <meta
        property="og:url"
        content={`${process.env.NEXT_PUBLIC_BASE_URL}/${
          slug?.toLowerCase() || path
        }`}
      />
      <meta property="twitter:card" content="summary" />
      <meta property="twitter:creator" content={MetaData.social.twitter} />
      <meta property="twitter:title" content={titleString} />
      <meta property="twitter:description" content={description} />
      <meta
        property="twitter:image"
        content={`${process.env.NEXT_PUBLIC_BASE_URL}/images/logo.png`}
      />
    </NextHead>
  );
};

export default STQHead;
