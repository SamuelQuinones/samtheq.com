import { useDropdownToggle } from "@restart/ui";
import { DynamicRefForwardingComponent } from "@restart/ui/types";
import mergeRefs from "@util/MergeReactRefs";
import { ElementType, forwardRef, HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
};

const DropmenuToggle: DynamicRefForwardingComponent<"button", Props> =
  forwardRef<HTMLElement, Props>(
    ({ as: Component = "button", ...props }, ref) => {
      const [{ ref: ddRef, ...itemProps }] = useDropdownToggle();
      // const Component = asProp ?? "button";
      const newRef = mergeRefs([ddRef, ref]);
      return <Component {...itemProps} {...props} ref={newRef} />;
    }
  );
export default DropmenuToggle;
