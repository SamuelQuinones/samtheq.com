import { FC } from "react";
import UnderConstruction from "@components/Construction";
import classNames from "classnames";
import STQHead, { HeadProps } from "./Head";

type PageProps = HeadProps & {
  underConstruction?: boolean;
  pageSource?: string;
  containerClasses?: string;
};

const PageLayout: FC<PageProps> = ({
  children,
  underConstruction = false,
  pageSource,
  containerClasses,
  ...head
}) => {
  const cn = classNames("pt-16", "bs-container-md", containerClasses);

  return (
    <>
      <STQHead {...head} />
      {underConstruction ? (
        <div
          id="stq-page-content"
          className="bs-container-md pt-16 flex-auto flex justify-center items-center"
        >
          <UnderConstruction sourceFile={pageSource} />
        </div>
      ) : (
        <>
          <div id="stq-page-content" className={cn}>
            {children}
          </div>
          <main className="flex-auto" />
        </>
      )}
    </>
  );
};

export default PageLayout;
