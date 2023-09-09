"use client";

/**
 * May 27th, 2023
 * Dropdown items only get the active property AUTOMATICALLY from meta if they are children of a restartui Nav.
 *
 * The active property comes from the nav context, so either make a child of Nav or pass active manually
 */

import { useDropdownItem, type DropdownItemProps } from "@restart/ui/DropdownItem";
import type { DynamicRefForwardingComponent } from "@restart/ui/types";
import clsx from "clsx";
import { type ReactNode, type ElementType, forwardRef, type HTMLAttributes } from "react";

export interface DropmenuItemProps extends DropdownItemProps, HTMLAttributes<HTMLElement> {
  as?: ElementType;
  children?: ReactNode;
}

// @ts-expect-error TS 5.2, this is a false positive I think
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
