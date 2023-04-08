/* eslint-disable @typescript-eslint/no-var-requires */
// LAYOUT CLASSES bs-container-md mt-16 grow scroll-mt-16

import "../styles/fa.css";
import "../styles/globals.css";
import localFont from "next/font/local";
import Footer from "./Footer";
import Header from "./Header";
import Template from "./_client";
import { SEO } from "@/lib/NextJS/metadata";
const { config } = require("@fortawesome/fontawesome-svg-core");

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

export const metadata = SEO;

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
