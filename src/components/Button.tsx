import classNames from "classnames";
import { forwardRef, ComponentPropsWithoutRef } from "react";
import { useButtonProps } from "@restart/ui/Button";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  as?: keyof JSX.IntrinsicElements;
  disabled?: boolean;
  href?: string;
  target?: string;
  rel?: string;
  variant?: string;
};

const Button = forwardRef<HTMLElement, ButtonProps>(
  ({ as: asProp, disabled, variant = "primary", className, ...rest }, ref) => {
    const [buttonProps, { tagName: Tag }] = useButtonProps({
      tagName: asProp,
      disabled,
      ...rest,
    });
    const classes = classNames(
      "btn",
      variant && `btn-${variant}`,
      disabled && "disabled",
      className
    );

    return <Tag {...rest} {...buttonProps} className={classes} ref={ref} />;
  }
);

Button.displayName = "STQButton";
export default Button;
