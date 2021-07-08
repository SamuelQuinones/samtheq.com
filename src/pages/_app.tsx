import "../assets/styles/globals.scss";
import type { AppProps } from "next/app";
import Container from "react-bootstrap/Container";
import Navbar from "@components/Navbar";
import NavItem from "@components/Navigation/NavItem";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar>
        <NavItem to="/">Home</NavItem>
        <NavItem to="/about">About</NavItem>
      </Navbar>
      <Container style={{ paddingTop: "4rem" }} fluid="md">
        <Component {...pageProps} />
      </Container>
    </>
  );
}

export default MyApp;
