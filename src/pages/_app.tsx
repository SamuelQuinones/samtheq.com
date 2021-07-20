import "../assets/styles/globals.scss";
import type { AppProps } from "next/app";
import SiteLayout from "@components/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SiteLayout>
      <Component {...pageProps} />
    </SiteLayout>
  );
}

export default MyApp;
