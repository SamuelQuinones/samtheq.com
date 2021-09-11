import "@fortawesome/fontawesome-svg-core/styles.css";
import "../assets/styles/globals.scss";
import type { AppProps } from "next/app";
import useHashChange from "@hooks/useHashChange";
import useResetFocus from "@hooks/useResetFocus";
import { initializeFontAwesome } from "@util/IconLibrary";
import SiteLayout from "@modules/Layout/Site";

initializeFontAwesome();

function MyApp({ Component, pageProps }: AppProps) {
  useHashChange();
  useResetFocus();
  return (
    <SiteLayout>
      <Component {...pageProps} />
    </SiteLayout>
  );
}

export default MyApp;
