import classNames from "classnames";
import { ComponentPropsWithoutRef, forwardRef } from "react";

type CardProps = ComponentPropsWithoutRef<"div">;

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, className, ...rest }, ref) => {
    const classList = classNames("card", className);
    return (
      <div ref={ref} className={classList} {...rest}>
        {children}
      </div>
    );
  }
);
Card.displayName = "Card";
export default Card;
