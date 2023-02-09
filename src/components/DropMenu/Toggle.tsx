import { useMergedRef } from "@hooks";
import { useDropdownToggle } from "@restart/ui/DropdownToggle";
import { DynamicRefForwardingComponent } from "@restart/ui/types";
import { ElementType, forwardRef, HTMLAttributes, useCallback } from "react";

type Props = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
};

const DropmenuToggle: DynamicRefForwardingComponent<"button", Props> =
  forwardRef<HTMLElement, Props>(
    ({ as: Component = "button", onClick: nativeOnClick, ...props }, ref) => {
      const [{ ref: ddRef, onClick, ...toggleProps }] = useDropdownToggle();
      // const Component = asProp ?? "button";
      const newRef = useMergedRef(ddRef, ref);
      const handleClick = useCallback(
        (e: any) => {
          onClick(e);
          nativeOnClick?.(e);
        },
        [nativeOnClick, onClick]
      );
      return (
        <Component
          {...toggleProps}
          {...props}
          onClick={handleClick}
          ref={newRef}
        />
      );
    }
  );
export default DropmenuToggle;
