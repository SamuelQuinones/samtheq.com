"use client";

import { useDropdownItem, type DropdownItemProps } from "@restart/ui/DropdownItem";
import type { DynamicRefForwardingComponent } from "@restart/ui/types";
import clsx from "clsx";
import { type ReactNode, type ElementType, forwardRef, type HTMLAttributes } from "react";

export interface DropmenuItemProps extends DropdownItemProps, HTMLAttributes<HTMLElement> {
  as?: ElementType;
  children?: ReactNode;
}

const DropmenuItem: DynamicRefForwardingComponent<"button", DropmenuItemProps> = forwardRef<
  HTMLElement,
  DropmenuItemProps
>(({ eventKey, disabled, onClick, active, as: Component = "button", className, ...props }, ref) => {
  const [dropdownItemProps, meta] = useDropdownItem({
    key: eventKey,
    href: props.href,
    disabled,
    onClick,
    active,
  });
  const classList = clsx(className, disabled && "disabled", meta.isActive && "active");

  return <Component {...props} {...dropdownItemProps} className={classList} ref={ref} />;
});

export default DropmenuItem;
