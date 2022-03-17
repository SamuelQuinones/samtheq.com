import classNames from "classnames";
import {
  ComponentPropsWithoutRef,
  forwardRef,
  MouseEvent as ME,
  KeyboardEvent as KBE,
  ElementType,
  EventHandler,
} from "react";
import { ThemeVariants } from "../util/Theme";

type ButtonType = "button" | "reset" | "submit";

type UseButtonPropsOptions = {
  href?: string;
  rel?: string;
  target?: string;
  type?: ButtonType;
  disabled?: boolean;
  onClick?: EventHandler<ME | KBE>;
  tabIndex?: number;
  tagName?: keyof JSX.IntrinsicElements;
};

function isTrivialHref(href?: string) {
  return !href || href.trim() === "#";
}

type AriaButtonProps = {
  type?: ButtonType | undefined;
  disabled: boolean | undefined;
  role?: "button";
  tabIndex?: number | undefined;
  href?: string | undefined;
  target?: string | undefined;
  rel?: string | undefined;
  "aria-disabled"?: true | undefined;
  onClick?: (event: ME | KBE) => void;
  onKeyDown?: (event: KBE) => void;
};

function useButtonProps({
  disabled,
  href,
  target,
  rel,
  onClick,
  tabIndex = 0,
  type,
}: UseButtonPropsOptions): [AriaButtonProps, { tagName: ElementType }] {
  let tagName: ElementType = "button";
  if (href != null || target != null || rel != null) {
    tagName = "a";
  }
  const meta = { tagName };
  if (tagName === "button") {
    return [{ type: (type as any) || "button", disabled }, meta];
  }

  const handleClick = (event: ME | KBE) => {
    if (disabled || (tagName === "a" && isTrivialHref(href))) {
      event.preventDefault();
    }

    if (disabled) {
      event.stopPropagation();
      return;
    }

    onClick?.(event);
  };

  const handleKeyDown = (event: KBE) => {
    if (event.key === " ") {
      event.preventDefault();
      handleClick(event);
    }
  };

  if (tagName === "a") {
    // Ensure there's a href so Enter can trigger anchor button.
    href ||= "#";
    if (disabled) {
      href = undefined;
    }
  }

  return [
    {
      role: "button",
      // explicitly undefined so that it overrides the props disabled in a spread
      // e.g. <Tag {...props} {...hookProps} />
      disabled: undefined,
      tabIndex: disabled ? undefined : tabIndex,
      href,
      target: tagName === "a" ? target : undefined,
      "aria-disabled": !disabled ? undefined : disabled,
      rel: tagName === "a" ? rel : undefined,
      onClick: handleClick,
      onKeyDown: handleKeyDown,
    },
    meta,
  ];
}

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  disabled?: boolean;
  href?: string;
  target?: string;
  rel?: string;
  variant?: ThemeVariants;
  outline?: boolean;
  shape?: "pill" | "square" | "default";
};

const Button = forwardRef<HTMLElement, ButtonProps>(
  (
    {
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
      disabled,
      ...props,
    });

    const classes = classNames(
      "btn",
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
