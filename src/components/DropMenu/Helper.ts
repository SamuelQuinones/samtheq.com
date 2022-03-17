import type { PolymorphicComponentPropsWithRef } from "@util/PolymorphicComponents";
import type { Variants } from "framer-motion";
import type { ReactNode, ForwardedRef, ElementType, ReactElement } from "react";

type Placement = `${"top" | "bottom" | "left" | "right"}${
  | "-start"
  | "-end"
  | ""}`;

export type BaseProps = {
  children?: ReactNode;
  dropMenuLabel: ReactNode;
  arrowDownIcon?: ReactNode;
  arrowLast?: boolean;
  menuRef?: ForwardedRef<HTMLDivElement>;
  menuPosition?: Placement;
  menuClassList?: string;
  smallScreenTransition?: Variants;
};

export type DropMenuProps<C extends ElementType> =
  PolymorphicComponentPropsWithRef<C, BaseProps>;

export type PolymorphicDropDown = <C extends ElementType = "button">(
  props: DropMenuProps<C>
) => ReactElement | null;

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
