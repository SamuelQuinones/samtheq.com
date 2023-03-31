// TODO: Once templates are fixed, move this to a template.tsx
"use client";

import addClientIcons from "@/lib/FontAwesome/client";
import { LazyMotion } from "framer-motion";

const loadFeatures = async () => (await import("../lib/FramerMotion.js")).default;

// See comment above function
addClientIcons();

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion strict features={loadFeatures}>
      {children}
    </LazyMotion>
  );
}
