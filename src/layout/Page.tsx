import { type ReactNode } from "react";
import classNames from "classnames";
import { NextSeo } from "next-seo";

type LayoutProps = {
  children?: ReactNode;
  description?: string;
  containerClasses?: string;
  title: string;
  titleTemplate?: string;
  pageUrl?: string;
};

const PageLayout = ({
  children,
  description,
  containerClasses,
  title,
  titleTemplate,
  pageUrl,
}: LayoutProps) => {
  const cn = classNames(
    "pt-16", //? Should this be margin instead?
    "bs-container-md",
    "flex-grow",
    containerClasses
  );
  return (
    <>
      <NextSeo
        titleTemplate={titleTemplate}
        title={title}
        openGraph={{
          url: `${process.env.NEXT_PUBLIC_BASE_URL}${pageUrl}`,
        }}
        canonical={`${process.env.NEXT_PUBLIC_BASE_URL}${pageUrl}`}
        description={description}
      />
      <main id="stq-page-content" className={cn}>
        {children}
      </main>
    </>
  );
};
export default PageLayout;
