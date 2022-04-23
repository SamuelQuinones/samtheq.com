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

const testOpenGraphUr = (ogurl?: string) => {
  if (!ogurl) return;
  if (!process.env.NEXT_PUBLIC_BASE_URL) {
    console.assert(
      process.env.NODE_ENV === "development",
      "NEXT_PUBLIC_BASE_URL is not defined, please make sure it is defined in production"
    );
    return;
  }
  if (ogurl.includes(process.env.NEXT_PUBLIC_BASE_URL)) {
    return ogurl;
  }
  if (ogurl.includes("/", 0)) {
    return `${process.env.NEXT_PUBLIC_BASE_URL}${ogurl}`;
  }
  return `${process.env.NEXT_PUBLIC_BASE_URL}/${ogurl}`;
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
  const OG_URL = testOpenGraphUr(openGraphUrl);
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
