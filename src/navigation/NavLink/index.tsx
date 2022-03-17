//TODO: Update to match new logic of example: https://github.com/vercel/next.js/blob/canary/examples/active-class-name/components/ActiveLink.js

import { forwardRef } from "react";
import Link from "next/link";
import { NavLinkProps, useRegexAsPath } from "../Helper";
import classNames from "classnames";

const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ children, matchNestedPaths = false, className, ...props }, ref) => {
    const {
      href,
      as,
      replace,
      scroll,
      shallow,
      passHref,
      prefetch,
      locale,
      ...rest
    } = props;
    const linkCompProps = {
      href,
      as,
      replace,
      scroll,
      shallow,
      passHref,
      prefetch,
      locale,
    };
    const asPath = useRegexAsPath(matchNestedPaths);
    const isActiveLink = asPath === props.as || asPath === props.href;

    const classList = classNames(
      "nav-link",
      { active: isActiveLink },
      className
    );
    return (
      <Link {...linkCompProps}>
        <a ref={ref} className={classList} {...rest}>
          {children}
        </a>
      </Link>
    );
  }
);

export default NavLink;
