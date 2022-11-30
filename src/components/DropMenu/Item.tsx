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
>(
  (
    { eventKey, disabled, onClick, active, as: Component = "button", ...props },
    ref
  ) => {
    const [dropdownItemProps] = useDropdownItem({
      key: eventKey,
      href: props.href,
      disabled,
      onClick,
      active,
    });

    return <Component {...props} {...dropdownItemProps} ref={ref} />;
  }
);

export default DropmenuItem;
