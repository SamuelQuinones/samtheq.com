"use client";

import { config } from "@fortawesome/fontawesome-svg-core";
import { LazyMotion } from "framer-motion";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

/**
 * May 9th 2023
 * Currently this is required to run on the client to prevent CSS injection.
 * But thinking about it more ... where as previously the _app ran on the server,
 * could I just not import the CSS file and allow the injection to happen?
 */
config.autoAddCss = false;

const loadFeatures = async () => (await import("../lib/FramerMotion.js")).default;

const queryClient = new QueryClient();

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <LazyMotion strict features={loadFeatures}>
        {children}
      </LazyMotion>
    </QueryClientProvider>
  );
}
