import { ElementType, HTMLAttributes, forwardRef } from "react";
import type { DynamicRefForwardingComponent } from "@restart/ui/types";
import classNames from "classnames";
interface CardProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
}

const Card: DynamicRefForwardingComponent<"div", CardProps> = forwardRef<
  HTMLElement,
  CardProps
>(({ children, className, as: Component = "div", ...rest }, ref) => {
  const classList = classNames("card", className);
  return (
    <Component ref={ref} className={classList} {...rest}>
      {children}
    </Component>
  );
});
Card.displayName = "Card";
export default Card;
