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
>(({ as: asProp, eventKey, ...props }, ref) => {
  const [itemProps] = useDropdownItem({
    key: eventKey,
    ...props,
  });
  const Component = asProp ?? "button";
  return <Component {...props} {...itemProps} ref={ref} />;
});

export default DropmenuItem;
