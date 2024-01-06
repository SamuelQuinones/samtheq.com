"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";

import twClsx from "@/lib/TailwindCSS/tw-clsx";
import { Slot } from "@radix-ui/react-slot";

const buttonVariants = {
  primary:
    "border-primary bg-primary focus:ring-primary/60 hocus:border-primary-darker-10 hocus:bg-primary-darker-10 disabled:border-primary-lighter-10 disabled:bg-primary-lighter-10 text-black",
  secondary:
    "border-secondary bg-secondary focus:ring-secondary/60 hocus:border-secondary-darker-10 hocus:bg-secondary-darker-10 disabled:border-secondary-lighter-10 disabled:bg-secondary-lighter-10",
  accent:
    "border-accent bg-accent focus:ring-accent/60 hocus:border-accent-darker-10 hocus:bg-accent-darker-10 disabled:border-accent-lighter-10 disabled:bg-accent-lighter-10 text-black",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof buttonVariants;
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, disabled, asChild = false, variant = "primary", ...props }, ref) => {
    const classList = twClsx(
      "inline-block select-none rounded-md border px-3 py-1.5 text-center align-middle leading-normal transition-colors duration-200 focus:outline-none focus:ring disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-70",
      disabled && "disabled",
      buttonVariants[variant],
      className
    );

    const Comp = asChild ? Slot : "button";

    return <Comp {...props} disabled={disabled} className={classList} ref={ref} />;
  }
);

export default Button;
