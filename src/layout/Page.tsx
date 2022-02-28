import type { FC } from "react";
import NextHead from "next/head";
import classNames from "classnames";

type LayoutProps = {
  containerClasses?: string;
  metaDescription?: string;
  metaTitle: string;
  metaUrl?: string;
};

const PageLayout: FC<LayoutProps> = ({
  children,
  containerClasses,
  metaDescription = "A personal website for Samuel Quinones, to show off projects and a personal portfolio",
  metaTitle,
  metaUrl = "",
}) => {
  const cn = classNames(
    "pt-16",
    "bs-container-md",
    "flex-grow",
    containerClasses
  );
  return (
    <>
      <NextHead>
        <title>{metaTitle}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="metaDescription" content={metaDescription} />
        <meta name="author" content="Samuel Quinones" />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:metaDescription" content={metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="SamTheQ" />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_BASE_URL}/favicon.png`}
        />
        <meta
          property="og:url"
          content={`${
            process.env.NEXT_PUBLIC_BASE_URL
          }/${metaUrl.toLowerCase()}`}
        />
        <meta property="twitter:card" content="summary" />
        <meta property="twitter:creator" content="@SamuelQuinones1" />
        <meta property="twitter:site" content="@SamuelQuinones1" />
        <meta property="twitter:title" content={metaTitle} />
        <meta property="twitter:metaDescription" content={metaDescription} />
        <meta
          property="twitter:image"
          content={`${process.env.NEXT_PUBLIC_BASE_URL}/favicon.ico`}
        />
      </NextHead>
      <main id="stq-page-content" className={cn}>
        {children}
      </main>
    </>
  );
};
export default PageLayout;
