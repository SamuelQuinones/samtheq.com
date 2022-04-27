import classNames from "classnames";
import { useButtonProps, ButtonProps } from "@restart/ui/Button";
import { forwardRef } from "react";
import { ThemeVariants } from "../util/Theme";
interface Props extends ButtonProps {
  variant?: ThemeVariants;
  outline?: boolean;
  shape?: "pill" | "square" | "default";
}

const Button = forwardRef<HTMLElement, Props>(
  (
    {
      as: asProp,
      disabled,
      className,
      variant = "primary",
      outline = false,
      shape = "default",
      ...props
    },
    ref
  ) => {
    const [buttonProps, { tagName: Component }] = useButtonProps({
      tagName: asProp,
      disabled,
      ...props,
    });

    const classes = classNames(
      "btn",
      { disabled: disabled },
      { [`btn-${variant}`]: !outline, [`btn-outline-${variant}`]: outline },
      shape === "pill" && "rounded-full",
      shape === "square" && "rounded-none",
      className
    );

    return (
      <Component {...props} {...buttonProps} className={classes} ref={ref} />
    );
  }
);

Button.displayName = "Button";

export default Button;
