import { FC } from "react";
import Link from "next/link";
import { NavLinkProps, useRegexAsPath } from "./Helper";
import classNames from "classnames";

const NavLink: FC<NavLinkProps> = ({
  children,
  activeClassName = "font-bold text-opacity-100",
  className,
  ...props
}) => {
  const asPath = useRegexAsPath();
  const isActive = asPath === props.href || asPath === props.as;
  const classList = classNames(
    "flex",
    "rounded",
    "p-2",
    "my-1",
    "sm:my-0",
    "sm:mx-1",
    "text-white",
    "text-opacity-80",
    "transition-colors",
    "focus-within:text-opacity-100",
    "hover:bg-gray-800",
    "hover:text-opacity-100",
    "focus:text-opacity-100",
    "active:text-opacity-100",
    isActive && activeClassName,
    className
  );
  return (
    <Link passHref {...props}>
      <a className={classList}>{children}</a>
    </Link>
  );
};

export default NavLink;
