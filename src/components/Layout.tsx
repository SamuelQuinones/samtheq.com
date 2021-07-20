import { FC } from "react";
import Navbar from "./Navigation/Navbar";
import NavItem from "./Navigation/NavItem";

const SiteLayout: FC = ({ children }) => {
  return (
    <>
      <Navbar>
        <NavItem to="/">Home</NavItem>
        <NavItem to="/about">About</NavItem>
        <NavItem to="/experience">Experience</NavItem>
      </Navbar>
      <div className="pt-16 container mx-auto">{children}</div>
    </>
  );
};

export default SiteLayout;
