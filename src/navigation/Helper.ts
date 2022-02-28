import type { LinkProps } from "next/link";
import { useRouter } from "next/router";

export type NavLinkProps = Omit<LinkProps, "passHref"> & {
  className?: string;
  activeClassName?: string;
};

/** h-8 = 2rem, py-3 is .75 rem on both sides, should total 3.5rem or 56px */
export const NAVBAR_BASE_HEIGHT = 2 + 2 * 0.75;
// export const NAVBAR_BASE_HEIGHT = 1 + 2 * 0.5 + 2 * 0.5;

/**
 * To be written
 *
 * @returns the router's `asPath` variable, having been formatted
 */
export function useRegexAsPath() {
  const { asPath } = useRouter();
  // Queries and hashes
  const asPathTwo = /(#.*|\?.+=.*)/g.test(asPath)
    ? asPath.replace(/(#.*|\?.+=.*)/g, "")
    : asPath;

  // Nested Paths
  const asPathThree = asPathTwo.replace(
    /^(\/[A-Za-z\-0-9]+)(?:\/[A-Za-z\-0-9]+)+/i,
    "$1"
  );

  return asPathThree;
}
