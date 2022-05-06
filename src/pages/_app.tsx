import "@fortawesome/fontawesome-svg-core/styles.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import SiteLayout from "layout/Site";
import { initializeFontAwesome } from "@lib/FontAwesome";
import { LazyMotion } from "framer-motion";

initializeFontAwesome();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LazyMotion
      features={async () => (await import("../lib/FramerFeatures")).default}
      strict
    >
      <SiteLayout>
        <Component {...pageProps} />
      </SiteLayout>
    </LazyMotion>
  );
}

export default MyApp;
