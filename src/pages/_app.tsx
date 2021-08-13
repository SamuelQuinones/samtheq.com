import "@fortawesome/fontawesome-svg-core/styles.css";
import "../assets/styles/globals.scss";
import type { AppProps } from "next/app";
import SiteLayout from "@modules/Layout/Page";
import useHashChange from "@hooks/useHashChange";
import { initializeFontAwesome } from "@util/IconLibrary";

initializeFontAwesome();

function MyApp({ Component, pageProps }: AppProps) {
  useHashChange();
  return (
    <SiteLayout>
      <Component {...pageProps} />
    </SiteLayout>
  );
}

export default MyApp;
