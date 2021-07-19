import { Children, FC, ReactElement, cloneElement } from "react";
import Link from "next/link";
import { ActiveLinkProps, useRegexAsPath } from "./Helper";

const ActiveLink: FC<ActiveLinkProps> = ({
  children,
  activeClassName,
  ...props
}) => {
  const asPath = useRegexAsPath();
  const child = Children.only(children);
  const childClassName = (child as ReactElement).props.className || "";

  const isActive = asPath === props.href || asPath === props.as;

  const className = isActive
    ? `${childClassName} ${activeClassName}`.trim()
    : childClassName;

  return (
    <Link {...props}>
      {cloneElement(child as ReactElement, {
        "aria-current": isActive ? "page" : undefined,
        className: className || null,
      })}
    </Link>
  );
};

export default ActiveLink;
