"use client";

import clsx from "clsx";
import { useButtonProps, type ButtonProps as RRButtonProps } from "@restart/ui/Button";
import { forwardRef } from "react";

interface ButtonProps extends RRButtonProps {
  variant?: string;
  outline?: boolean;
  shape?: "pill" | "square" | "default";
}

const Button = forwardRef<HTMLElement, ButtonProps>(
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

    const classes = clsx(
      "btn",
      disabled && "disabled",
      { [`btn-${variant}`]: !outline, [`btn-outline-${variant}`]: outline },
      shape === "pill" && "rounded-full",
      shape === "square" && "rounded-none",
      className
    );

    return <Component {...props} {...buttonProps} className={classes} ref={ref} />;
  }
);

export default Button;
