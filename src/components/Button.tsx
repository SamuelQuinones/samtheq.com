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
      "transition-color",
      disabled,
      className
    );

    if (props.href !== undefined) {
      return (
        <a {...props} className={classes} ref={ref}>
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
