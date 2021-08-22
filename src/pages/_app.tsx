import "@fortawesome/fontawesome-svg-core/styles.css";
import "../assets/styles/globals.scss";
import type { AppProps } from "next/app";
import useHashChange from "@hooks/useHashChange";
import { initializeFontAwesome } from "@util/IconLibrary";

initializeFontAwesome();

function MyApp({ Component, pageProps }: AppProps) {
  useHashChange();
  return <Component {...pageProps} />;
}

export default MyApp;
