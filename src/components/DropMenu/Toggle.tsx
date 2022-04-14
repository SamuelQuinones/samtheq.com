import { useDropdownToggle } from "@restart/ui";
import { DynamicRefForwardingComponent } from "@restart/ui/types";
import mergeRefs from "@util/MergeReactRefs";
import {
  ElementType,
  forwardRef,
  HTMLAttributes,
  useCallback,
  useMemo,
} from "react";

type Props = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
};

const DropmenuToggle: DynamicRefForwardingComponent<"button", Props> =
  forwardRef<HTMLElement, Props>(
    ({ as: Component = "button", onClick: nativeOnClick, ...props }, ref) => {
      const [{ ref: ddRef, onClick, ...itemProps }] = useDropdownToggle();
      // const Component = asProp ?? "button";
      const newRef = useMemo(() => mergeRefs([ddRef, ref]), [ddRef, ref]);
      const handleClick = useCallback(
        (e: any) => {
          onClick(e);
          nativeOnClick?.(e);
        },
        [nativeOnClick, onClick]
      );
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
