import { useDropdownToggle } from "@restart/ui";
import { DynamicRefForwardingComponent } from "@restart/ui/types";
import mergeRefs from "@util/MergeReactRefs";
import { ElementType, forwardRef, HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
};

const DropmenuToggle: DynamicRefForwardingComponent<"button", Props> =
  forwardRef<HTMLElement, Props>(
    ({ as: Component = "button", onClick: nativeOnClick, ...props }, ref) => {
      const [{ ref: ddRef, onClick, ...itemProps }] = useDropdownToggle();
      // const Component = asProp ?? "button";
      const newRef = mergeRefs([ddRef, ref]);
      const handleClick = (e: any) => {
        onClick(e);
        nativeOnClick?.(e);
      };
      return (
        <Component
          {...itemProps}
          {...props}
          onClick={handleClick}
          ref={newRef}
        />
      );
    }
  );
export default DropmenuToggle;
