/* eslint-disable @typescript-eslint/no-var-requires */
// TODO: Once templates are fixed, move this to a template.tsx
"use client";

const { config } = require("@fortawesome/fontawesome-svg-core");
import { LazyMotion } from "framer-motion";

const loadFeatures = async () => (await import("../lib/FramerMotion.js")).default;

config.autoAddCss = false;

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion strict features={loadFeatures}>
      {children}
    </LazyMotion>
  );
}
