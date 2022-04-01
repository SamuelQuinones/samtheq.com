import { ElementType, forwardRef, HTMLAttributes, ReactNode } from "react";
import { DropdownItemProps, useDropdownItem } from "@restart/ui";
import type { DynamicRefForwardingComponent } from "@restart/ui/types";

interface Props extends DropdownItemProps, HTMLAttributes<HTMLElement> {
  as?: ElementType;
  children?: ReactNode;
}

const DropmenuItem: DynamicRefForwardingComponent<"button", Props> = forwardRef<
  HTMLElement,
  Props
>(({ as: asProp, eventKey, onClick: nativeOnClick, ...props }, ref) => {
  const [{ onClick, ...itemProps }] = useDropdownItem({
    key: eventKey,
    ...props,
  });
  const handleClick = (e: any) => {
    onClick(e);
    nativeOnClick?.(e);
  };
  const Component = asProp ?? "button";
  return (
    <Component {...props} {...itemProps} onClick={handleClick} ref={ref} />
  );
});

export default DropmenuItem;
