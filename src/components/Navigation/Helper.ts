import classNames from "classnames";
import type { ComponentPropsWithoutRef } from "react";
import type { LinkProps } from "next/link";
import { useRouter } from "next/router";

export type NavLinkProps = LinkProps & {
  matchNestedPaths?: boolean;
} & Omit<ComponentPropsWithoutRef<"a">, keyof LinkProps>;

/** h-8 = 2rem, py-3 is .75 rem on both sides, should total 3.5rem or 56px */
export const NAVBAR_BASE_HEIGHT = 2 + 2 * 0.75;

/**
 * To be written
 *
 * @returns the router's `asPath` variable, having been formatted
 */
export function useRegexAsPath(matchNestedPaths = false) {
  const { asPath } = useRouter();
  // Queries and hashes
  const asPathTwo = /(#.*|\?.+=.*)/g.test(asPath)
    ? asPath.replace(/(#.*|\?.+=.*)/g, "")
    : asPath;

  // Nested Paths
  let asPathThree = asPathTwo;
  if (matchNestedPaths) {
    asPathThree = asPathTwo.replace(
      /^(\/[A-Za-z\-0-9]+)(?:\/[A-Za-z\-0-9]+)+/i,
      "$1"
    );
  }

  return asPathThree;
}

//* Helper to minimize redundant code
//* outside of main component to save on renders
const makeTopBottom = (mult: 1 | -1, moveY: number) => {
  return {
    open: {
      transform: `translateY(${mult * moveY}rem) rotate(${mult * 45}deg)`,
    },
    closed: {
      transform: "translateY(0rem) rotate(0deg)",
    },
  };
};
export const burgerTop = makeTopBottom(1, 0.625);
export const burgerBottom = makeTopBottom(-1, 0.7);
export const navbarSmallHeight = {
  open: { height: "auto" },
  closed: { height: `${NAVBAR_BASE_HEIGHT}rem` },
};

export const burgerLine = classNames(
  "h-[0.1875rem]",
  "rounded-full",
  "w-full",
  "relative",
  "bg-white"
);

//* helper to make motion less jarring for nav dropdowns
export const smallTransitionConfig = {
  open: {
    opacity: 1,
    display: "block",
  },
  closed: {
    opacity: 0,
    transitionEnd: { display: "none" },
  },
};
