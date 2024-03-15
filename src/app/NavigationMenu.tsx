"use client";

import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  forwardRef,
  type ElementRef,
  type ComponentPropsWithoutRef,
  type HTMLAttributes,
} from "react";

const navigationMenuTriggerStyle = clsx(
  "group flex select-none items-center text-text/85 transition-colors focus:outline-none hocus:bg-background-lighter-10 hocus:text-text disabled:pointer-events-none disabled:opacity-50"
);

function isActiveNested(href: string, pathname: string) {
  const splitHref = href.split("/");
  const splitPathname = pathname.split("/");
  for (let i = 0; i < splitHref.length; i++) {
    if (splitHref[i] !== splitPathname[i]) return false;
  }
  return true;
}

const NavigationMenu = forwardRef<
  ElementRef<typeof NavigationMenuPrimitive.Root>,
  ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root ref={ref} className={clsx("relative z-[1]", className)} {...props}>
    {children}
  </NavigationMenuPrimitive.Root>
));
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName;

// Might not need flex on this
const NavigationMenuList = forwardRef<
  ElementRef<typeof NavigationMenuPrimitive.List>,
  ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={clsx("flex list-none", className)}
    {...props}
  />
));
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName;

const NavigationMenuItem = forwardRef<
  ElementRef<typeof NavigationMenuPrimitive.Item>,
  ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Item>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Item ref={ref} className={clsx("relative", className)} {...props} />
));
NavigationMenuItem.displayName = "NavigationMenuItem";

const NavigationMenuTrigger = forwardRef<
  ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    {...props}
    className={clsx(navigationMenuTriggerStyle, className)}
  >
    {children}{" "}
    <FontAwesomeIcon
      height="1em"
      width="0.625em"
      className="relative top-[-1px] ml-1.5 transition-transform duration-[250] ease-in group-data-[state=open]:rotate-90"
      icon={faCaretDown}
    />
  </NavigationMenuPrimitive.Trigger>
));

// TODO: Implement framer
const NavigationMenuContent = forwardRef<
  ElementRef<typeof NavigationMenuPrimitive.Content>,
  ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...props }, ref) => {
  return (
    <NavigationMenuPrimitive.Content
      ref={ref}
      className={clsx(
        "absolute right-0 top-full mt-1 w-fit rounded-sm border border-background-lighter-10 bg-black shadow shadow-white/10",
        // "data-[motion^=from-]:animate-slideEnter data-[motion^=to-]:animate-slideExit data-[motion=from-end]:slide-in-from-right-10 data-[motion=from-start]:slide-in-from-left-10 data-[motion=to-end]:slide-out-to-right-10 data-[motion=to-start]:slide-out-to-left-10",
        "data-[state=closed]:animate-slideExit data-[state=open]:animate-slideEnter data-[state=closed]:slide-out-to-top-2 data-[state=open]:slide-in-from-top-2",
        className
      )}
      {...props}
    />
  );
});
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName;

const NavigationMenuLink = NavigationMenuPrimitive.Link;

interface NavigationMenuNextLinkProps extends HTMLAttributes<HTMLAnchorElement> {
  href: string;
  highlightNested?: boolean;
}

const NavigationMenuNextLink = ({
  href,
  highlightNested,
  className,
  ...props
}: NavigationMenuNextLinkProps) => {
  const pathname = usePathname();
  const isActive = highlightNested ? isActiveNested(href, pathname) : pathname === href;

  return (
    <NavigationMenuPrimitive.Link asChild active={isActive}>
      <Link
        href={href}
        className={clsx(
          navigationMenuTriggerStyle,
          "data-[active]:aria-[current='page']:text-text data-[active]:aria-[current='page']:underline",
          className
        )}
        {...props}
      />
    </NavigationMenuPrimitive.Link>
  );
};

export {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuNextLink,
};
