"use client";

import { useMergedRef } from "@/hooks";
import { useDropdownToggle } from "@restart/ui/DropdownToggle";
import type { DynamicRefForwardingComponent } from "@restart/ui/types";
import { type ElementType, forwardRef, type HTMLAttributes, useCallback } from "react";

interface DropmenuToggleProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
}

const DropmenuToggle: DynamicRefForwardingComponent<"button", DropmenuToggleProps> = forwardRef<
  HTMLElement,
  DropmenuToggleProps
>(({ as: Component = "button", onClick: nativeOnClick, ...props }, ref) => {
  const [{ ref: ddRef, onClick, ...toggleProps }] = useDropdownToggle();
  const newRef = useMergedRef(ddRef, ref);
  const handleClick = useCallback(
    (e: any) => {
      onClick(e);
      nativeOnClick?.(e);
    },
    [nativeOnClick, onClick]
  );
  return <Component {...toggleProps} {...props} onClick={handleClick} ref={newRef} />;
});

export default DropmenuToggle;
