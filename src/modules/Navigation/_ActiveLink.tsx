import { Children, FC, ReactElement, cloneElement } from "react";
import Link from "next/link";
import { ActiveLinkProps, useRegexAsPath } from "./Helper";
import classNames from "classnames";

const ActiveLink: FC<ActiveLinkProps> = ({
  children,
  activeClassName,
  switchClasses,
  ...props
}) => {
  const asPath = useRegexAsPath();
  const child = Children.only(children);
  const childClassName = (child as ReactElement).props.className;

  const isActive = asPath === props.href || asPath === props.as;

  const cn = classNames(
    {
      [activeClassName]: isActive,
      [`${switchClasses?.isActive}`]: isActive && switchClasses?.isActive,
      [`${switchClasses?.notActive}`]: !isActive && switchClasses?.notActive,
    },
    childClassName
  );

  return (
    <Link {...props}>
      {cloneElement(child as ReactElement, {
        "aria-current": isActive ? "page" : undefined,
        className: cn,
      })}
    </Link>
  );
};

export default ActiveLink;
