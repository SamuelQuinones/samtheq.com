import React, { FC } from "react";
import { Navbar, NavItem } from "@modules/Navigation";
import Footer from "./Footer";
import Head, { HeadProps } from "./Head";
import classNames from "classnames";
import UnderConstruction from "@components/Construction";

type LayoutProps = HeadProps & {
  containerClasses?: string;
  underConstruction?: boolean;
  sourceFile?: string;
};

const PageLayout: FC<LayoutProps> = ({
  children,
  containerClasses,
  underConstruction = false,
  sourceFile = "",
  ...head
}) => {
  //TODO: experiment with having the container use the flex-auto class instead of the main tag
  const cn = classNames("pt-16", "bs-container-md", containerClasses);
  return (
    <>
      <Head {...head} />
      <Navbar>
        <NavItem to="/">Home</NavItem>
        <NavItem to="/about">About</NavItem>
        <NavItem to="/experience">Experience</NavItem>
      </Navbar>
      {underConstruction ? (
        <div className="bs-container-md pt-16 flex-auto flex justify-center items-center">
          <UnderConstruction sourceFile={sourceFile} />
        </div>
      ) : (
        <>
          <div className={cn}>{children}</div>
          <main className="flex-auto" />
        </>
      )}
      <Footer />
    </>
  );
};

export default PageLayout;
