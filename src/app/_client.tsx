"use client";

import { config } from "@fortawesome/fontawesome-svg-core";
import { LazyMotion } from "framer-motion";

/**
 * May 9th 2023
 * Currently this is required to run on the client to prevent CSS injection.
 * But thinking about it more ... where as previously the _app ran on the server,
 * could I just not import the CSS file and allow the injection to happen?
 */
config.autoAddCss = false;

const loadFeatures = async () => (await import("../lib/FramerMotion.js")).default;

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion strict features={loadFeatures}>
      {children}
    </LazyMotion>
  );
}
