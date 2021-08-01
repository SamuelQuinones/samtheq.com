import "../assets/styles/globals.scss";
import type { AppProps } from "next/app";
import SiteLayout from "@modules/Layout/Page";
import useHashChange from "@hooks/useHashChange";

function MyApp({ Component, pageProps }: AppProps) {
  useHashChange();
  return (
    <SiteLayout>
      <Component {...pageProps} />
    </SiteLayout>
  );
}

export default MyApp;
