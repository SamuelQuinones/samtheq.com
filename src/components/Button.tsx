import classNames from "classnames";
import { forwardRef, ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";

type AnchorProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  type?: never;
  disabled?: boolean;
};
type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> & {
  href?: never;
  type?: "button" | "reset" | "submit";
};
type Props = (AnchorProps | ButtonProps) & {
  variant?: string;
};

const Button = forwardRef<any, Props>(
  (
    { className, children, disabled, variant = "primary", type, ...props },
    ref
  ) => {
    const classes = classNames(
      "btn",
      variant && `btn-${variant}`,
      disabled && "disabled",
      className
    );

    if (props.href !== undefined) {
      const special = disabled
        ? { "aria-disabled": true, tabIndex: -1 }
        : { "aria-disabled": props["aria-disabled"], tabIndex: props.tabIndex };
      return (
        <a {...special} {...props} className={classes} ref={ref}>
          {children}
        </a>
      );
    }
    return (
      <button
        {...props}
        type={type || "button"}
        disabled={disabled}
        className={classes}
        ref={ref}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "STQButton";
export default Button;
