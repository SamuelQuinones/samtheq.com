// LAYOUT CLASSES bs-container-md mt-16 grow scroll-mt-16

import "../styles/fa.css";
import "../styles/globals.css";
import localFont from "next/font/local";
import Footer from "./Footer";
import Header from "./Header";
import Template from "./_client";
import { mergeMetadata } from "@/lib/NextJS/metadata";
import { config } from "@fortawesome/fontawesome-svg-core";

config.autoAddCss = false;

const InterVar = localFont({
  src: [
    {
      path: "../fonts/Inter-roman.var.woff2",
      style: "normal",
    },
    {
      path: "../fonts/Inter-italic.var.woff2",
      style: "italic",
    },
  ],
  weight: "100 900",
  variable: "--font-inter",
});
const FiraCode = localFont({
  src: "../fonts/FiraCode-VF.woff2",
  weight: "300 700",
  variable: "--font-fira-code",
});

export const metadata = mergeMetadata({
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL ?? ""),
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${InterVar.variable} ${FiraCode.variable}`}>
      <body>
        <Template>
          <Header />
          {children}
          <Footer />
        </Template>
      </body>
    </html>
  );
}
