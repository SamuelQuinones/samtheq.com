"use client";

import { useMergedRef } from "@/hooks";
import { useDropdownToggle } from "@restart/ui/DropdownToggle";
import type { DynamicRefForwardingComponent } from "@restart/ui/types";
import {
  type ElementType,
  forwardRef,
  type HTMLAttributes,
  useCallback,
  type MouseEventHandler,
} from "react";

interface DropmenuToggleProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
}

// @ts-expect-error TS 5.2, this is a false positive I think
const DropmenuToggle: DynamicRefForwardingComponent<"button", DropmenuToggleProps> = forwardRef<
  HTMLElement,
  DropmenuToggleProps
>(({ as: Component = "button", onClick: nativeOnClick, ...props }, ref) => {
  const [{ ref: ddRef, onClick, ...toggleProps }] = useDropdownToggle();
  const newRef = useMergedRef(ddRef, ref);
  const handleClick: MouseEventHandler<HTMLElement> = useCallback(
    (e) => {
      onClick(e);
      nativeOnClick?.(e);
    },
    [nativeOnClick, onClick]
  );
  return <Component {...toggleProps} {...props} onClick={handleClick} ref={newRef} />;
});

export default DropmenuToggle;
