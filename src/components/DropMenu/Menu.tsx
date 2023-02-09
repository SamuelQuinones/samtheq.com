import { ElementType, forwardRef, HTMLAttributes, ReactNode } from "react";
import type { DynamicRefForwardingComponent } from "@restart/ui/types";
import {
  useDropdownMenu,
  UseDropdownMenuOptions,
} from "@restart/ui/DropdownMenu";
import { useIsomorphicLayoutEffect, useMergedRef } from "@hooks";

interface Props extends UseDropdownMenuOptions, HTMLAttributes<HTMLElement> {
  as?: ElementType;
  children?: ReactNode;
}

const DropmenuMenu: DynamicRefForwardingComponent<"div", Props> = forwardRef<
  HTMLElement,
  Props
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
    const newRef = useMergedRef(dmRef, ref);
    return <Component {...props} {...menuProps} ref={newRef} />;
  }
);
export default DropmenuMenu;
