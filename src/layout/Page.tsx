import type { FC } from "react";
import classNames from "classnames";
import { NextSeo } from "next-seo";

type LayoutProps = {
  containerClasses?: string;
  title: string;
  titleTemplate?: string;
  openGraphUrl?: string;
  canonical?: string;
};

const PageLayout: FC<LayoutProps> = ({
  children,
  containerClasses,
  title,
  titleTemplate,
  openGraphUrl,
  canonical,
}) => {
  const cn = classNames(
    "pt-16",
    "bs-container-md",
    "flex-grow",
    containerClasses
  );
  const OG_URL = openGraphUrl
    ? /http(s?):\/\/samtheq.com/gm.test(openGraphUrl)
      ? openGraphUrl
      : `https://samtheq.com${openGraphUrl}`
    : undefined;
  return (
    <>
      <NextSeo
        titleTemplate={titleTemplate}
        title={title}
        openGraph={{ url: OG_URL }}
        canonical={canonical}
      />
      <main id="stq-page-content" className={cn}>
        {children}
      </main>
    </>
  );
};
export default PageLayout;
