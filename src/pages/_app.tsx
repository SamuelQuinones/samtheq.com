import "@fortawesome/fontawesome-svg-core/styles.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import SiteLayout from "layout/Site";
import { initializeFontAwesome } from "@util/FontAwesome";

initializeFontAwesome();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SiteLayout>
      <Component {...pageProps} />
    </SiteLayout>
  );
}

export default MyApp;
