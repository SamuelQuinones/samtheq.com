import { FC } from "react";
import BootNav from "react-bootstrap/Nav";
import BootNavbar from "react-bootstrap/Navbar";

const Navbar: FC = ({ children }) => {
  return (
    <BootNavbar
      className="shadow-sm"
      collapseOnSelect
      expand="sm"
      fixed="top"
      variant="dark"
      bg="secondary"
    >
      <BootNavbar.Brand href="#">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="SamTheQ favicon"
          className="d-inline-block align-top"
          src="/favicon.ico"
          height="32px"
        />
      </BootNavbar.Brand>
      <BootNavbar.Toggle aria-controls="samtheq-navbar" />
      <BootNavbar.Collapse id="samtheq-navbar">
        <BootNav>{children}</BootNav>
      </BootNavbar.Collapse>
    </BootNavbar>
  );
};

export default Navbar;
