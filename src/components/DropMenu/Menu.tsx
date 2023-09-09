"use client";

/**
 * May 27th, 2023
 * Remember that hidden and show states need to be controlled with the show property:
 * `show && "dropmenu-show"`, where it is display none by default and block when "dropmenu-show" is active
 */

import { useIsomorphicLayoutEffect, useMergedRef } from "@/hooks";
import { useDropdownMenu, type UseDropdownMenuOptions } from "@restart/ui/DropdownMenu";
import type { DynamicRefForwardingComponent } from "@restart/ui/types";
import { type ElementType, forwardRef, type HTMLAttributes, type ReactNode } from "react";

export interface DropmenuMenuProps extends UseDropdownMenuOptions, HTMLAttributes<HTMLElement> {
  as?: ElementType;
  children?: ReactNode;
}

// @ts-expect-error TS 5.2, this is a false positive I think
const DropmenuMenu: DynamicRefForwardingComponent<"div", DropmenuMenuProps> = forwardRef<
  HTMLElement,
  DropmenuMenuProps
>(
  (
    {
      as: Component = "div",
      flip,
      show: rawShow,
      fixed,
      placement,
      usePopper,
      enableEventListeners,
      offset = [0, 8],
      rootCloseEvent,
      popperConfig,
      ...props
    },
    ref
  ) => {
    const [{ ref: dmRef, ...menuProps }, { popper, show }] = useDropdownMenu({
      flip,
      show: rawShow,
      fixed,
      placement,
      usePopper,
      enableEventListeners,
      offset,
      rootCloseEvent,
      popperConfig,
    });
    useIsomorphicLayoutEffect(() => {
      if (show) popper?.update();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [show]);
    let style = props.style;
    if (popper?.placement) {
      // we don't need the default popper style,
      // menus are display: none when not shown.
      style = { ...props.style, ...menuProps.style };
      //@ts-expect-error we are manually adding this prop
      props["x-placement"] = popper.placement;
    }
    const newRef = useMergedRef(dmRef, ref);
    return <Component {...props} {...menuProps} style={style} ref={newRef} />;
  }
);

export default DropmenuMenu;
