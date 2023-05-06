"use client";

import { LazyMotion } from "framer-motion";

const loadFeatures = async () => (await import("../lib/FramerMotion.js")).default;

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion strict features={loadFeatures}>
      {children}
    </LazyMotion>
  );
}
