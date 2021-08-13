import React, { FC } from "react";
import { Navbar, NavItem } from "@modules/Navigation";
import Footer from "./Footer";

const SiteLayout: FC = ({ children }) => {
  return (
    <>
      <Navbar>
        <NavItem to="/">Home</NavItem>
        <NavItem to="/about">About</NavItem>
        <NavItem to="/experience">Experience</NavItem>
      </Navbar>
      <div className="pt-16 bs-container-md mx-auto">{children}</div>
      <Footer />
    </>
  );
};

export default SiteLayout;
