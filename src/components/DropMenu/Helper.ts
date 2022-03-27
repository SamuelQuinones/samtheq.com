import type { Variants } from "framer-motion";

export const transitionConfig: Variants = {
  open: {
    scale: 1,
    opacity: 1,
    display: "block",
  },
  closed: {
    scale: 0.9,
    opacity: 0,
    transitionEnd: { display: "none" },
  },
};
