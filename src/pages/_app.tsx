import "../assets/styles/globals.scss";
import type { AppProps } from "next/app";
import Navbar from "@components/Navbar";
import NavItem from "@components/Navigation/NavItem";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar>
        <NavItem to="/">Home</NavItem>
        <NavItem to="/about">About</NavItem>
        <NavItem to="/experience">Experience</NavItem>
      </Navbar>
      <div className="pt-16 container mx-auto">
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
