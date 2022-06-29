//TODO: Update to match new logic of example: https://github.com/vercel/next.js/blob/canary/examples/active-class-name/components/ActiveLink.tsx

import { type ComponentPropsWithoutRef, forwardRef } from "react";
import Link from "next/link";
import { useRegexAsPath } from "./Helper";
import classNames from "classnames";

type Props = ComponentPropsWithoutRef<typeof Link> & {
  matchNestedPaths?: boolean;
};

const NavLink = forwardRef<HTMLAnchorElement, Props>(
  ({ matchNestedPaths = false, className, ...props }, ref) => {
    const asPath = useRegexAsPath(matchNestedPaths);
    const isActiveLink = asPath === props.as || asPath === props.href;

    const classList = classNames(
      "nav-link",
      { active: isActiveLink },
      className
    );
    return (
      <Link
        {...props}
        ref={ref}
        className={classList}
        aria-current={isActiveLink}
      />
    );
  }
);

export default NavLink;
