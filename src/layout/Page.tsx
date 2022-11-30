import { ReactNode, /* useEffect, */ useMemo } from "react";
import classNames from "classnames";
import { NextSeo } from "next-seo";

type LayoutProps = {
  children?: ReactNode;
  containerClasses?: string;
  description?: string;
  title: string;
  titleTemplate?: string;
  /** If defined will override both openGraphUrl and canonical url */
  pageUrl?: string;
  openGraphUrl?: string;
  canonical?: string;
};

const testOpenGraphUrl = (ogurl?: string) => {
  if (!ogurl) return;
  if (!process.env.NEXT_PUBLIC_BASE_URL) {
    if (process.env.NODE_ENV === "development") {
      console.log(
        "NEXT_PUBLIC_BASE_URL is not defined, please make sure it is defined in production"
      );
    }
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

const PageLayout = ({
  children,
  description,
  containerClasses,
  title,
  titleTemplate,
  pageUrl,
  openGraphUrl,
  canonical,
}: LayoutProps) => {
  const cn = classNames(
    "pt-16",
    "bs-container-md",
    "flex-grow",
    containerClasses
  );
  const urlMeta = useMemo(() => {
    if (pageUrl !== undefined) {
      const finalUrl = testOpenGraphUrl(pageUrl);
      return {
        canonical: finalUrl,
        openGraph: finalUrl,
      };
    }
    return {
      canonical: testOpenGraphUrl(canonical),
      openGraph: testOpenGraphUrl(openGraphUrl),
    };
  }, [canonical, openGraphUrl, pageUrl]);
  // TODO: Experiment with this as a focus reset solution
  // useEffect(() => {
  //   setTimeout(() => document.body.removeAttribute("tabIndex"));
  //   return () => {
  //     document.body.setAttribute("tabIndex", "-1");
  //     document.body.focus();
  //   };
  // }, []);
  return (
    <>
      <NextSeo
        titleTemplate={titleTemplate}
        title={title}
        openGraph={{ url: urlMeta.openGraph }}
        canonical={urlMeta.canonical}
        description={description}
      />
      <main id="stq-page-content" className={cn}>
        {children}
      </main>
    </>
  );
};
export default PageLayout;
