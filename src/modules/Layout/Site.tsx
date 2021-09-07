import React, { FC } from "react";
import { Navbar, NavItem, ScrollToTop } from "@modules/Navigation";
import Footer from "./Footer";

const SiteLayout: FC = ({ children }) => {
  return (
    <>
      <Navbar>
        <NavItem to="/">Home</NavItem>
        <NavItem to="/about">About</NavItem>
        <NavItem to="/experience">Experience</NavItem>
      </Navbar>
      {children}
      <Footer />
      <ScrollToTop />
    </>
  );
};

export default SiteLayout;
