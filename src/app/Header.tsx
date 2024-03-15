"use client";

import { useState, useRef, useCallback, useMemo } from "react";
import { usePathname } from "next/navigation";
import { m } from "framer-motion";
import clsx from "clsx";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode, faFilm } from "@fortawesome/free-solid-svg-icons";
import useOutsideClick from "@/hooks/use-outside-click";
import useIsomorphicLayoutEffect from "@/hooks/use-isomorphic-layout-effect";
import {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuNextLink,
} from "./NavigationMenu";

/** h-8 = 2rem, py-3 is .75 rem on both sides, should total 3.5rem or 56px */
const NAVBAR_BASE_HEIGHT = 2 + 2 * 0.75;
const navbarVariants = {
  open: { height: "312px" },
  closed: { height: `${NAVBAR_BASE_HEIGHT}rem` },
};

const burgerLineClasses = clsx("relative h-[0.1875rem] w-full rounded-full bg-white");

const navLinkSyle = clsx("rounded-md p-2");
const dropLinkStyle = clsx(
  "gap-x-2 px-4 py-1.5 [&:not(:hover,:focus)]:data-[active]:aria-[current='page']:bg-background-lighter-10/70"
);

const burgerTop = {
  open: { y: "0.625rem", rotate: "45deg" },
  closed: { y: "0rem", rotate: "0deg" },
};
const burgerMiddle = {
  open: { opacity: 0 },
  closed: { opacity: 1 },
};
const burgerBottom = {
  open: { y: "-0.7rem", rotate: "-45deg" },
  closed: { y: "0rem", rotate: "0deg" },
};

export default function Header() {
  const [open, setOpen] = useState(false);
  const HEADER_REF = useRef<HTMLElement>(null);
  const CHILDREN_REF = useRef<HTMLUListElement>(null);
  const pathname = usePathname();

  const onAnimationComplete = useCallback((def: string) => {
    if (def === "closed") {
      CHILDREN_REF.current?.classList?.add("max-sm:hidden");
    }
  }, []);
  const onAnimationStart = useCallback((def: string) => {
    if (def === "open") {
      CHILDREN_REF?.current?.classList?.remove("max-sm:hidden");
    }
  }, []);

  const hideNavbar = () => setOpen(false);
  const toggleNavbar = () => setOpen((o) => !o);

  useOutsideClick(HEADER_REF, hideNavbar);
  useIsomorphicLayoutEffect(() => {
    hideNavbar();
  }, [pathname]);

  const projectListActive = useMemo(
    () => (["/media", "/code"].includes(pathname) ? "" : undefined),
    [pathname]
  );

  return (
    <m.header
      role="navigation"
      animate={open ? "open" : "closed"}
      initial={false}
      ref={HEADER_REF}
      variants={navbarVariants}
      className="navbar fixed inset-x-0 top-0 w-full overflow-y-hidden bg-black py-0 shadow-lg shadow-white/10 sm:overflow-y-visible sm:py-2"
      style={{ zIndex: 9999 }}
      onAnimationStart={onAnimationStart}
      onAnimationComplete={onAnimationComplete}
      transition={{ type: "tween", duration: 0.2 }}
    >
      <div className="bs-container-xl sm:flex sm:justify-between">
        <a href="#stq-page-content" data-nav-skip-link="true">
          Skip To Content
        </a>
        <section className="flex items-center justify-between py-3 sm:py-0">
          {/* Logo */}
          <Image quality={100} src="/favicon.ico" height="32" width="32" alt="SamTheQ Logo" />
          <span className="flex sm:hidden">SamTheQ</span>
          {/* Toggle Button */}
          <div className="flex sm:hidden">
            <button
              className="flex size-8 flex-col items-center justify-around rounded-sm transition-shadow focus:outline-none focus:ring focus:ring-opacity-60"
              onClick={toggleNavbar}
              aria-label="Toggle Navbar"
            >
              <m.span className={burgerLineClasses} variants={burgerTop} />
              <m.span
                className={burgerLineClasses}
                variants={burgerMiddle}
                transition={{ duration: 0.1 }}
              />
              <m.span className={burgerLineClasses} variants={burgerBottom} />
            </button>
          </div>
        </section>
        {/* Content */}
        <NavigationMenu>
          <NavigationMenuList
            ref={CHILDREN_REF}
            className="flex-col py-2 max-sm:hidden sm:flex-row sm:space-x-1 sm:p-0"
          >
            <NavigationMenuItem>
              <NavigationMenuNextLink href="/" className={navLinkSyle}>
                Home
              </NavigationMenuNextLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuNextLink href="/about" className={navLinkSyle}>
                About
              </NavigationMenuNextLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuNextLink href="/experience" className={navLinkSyle}>
                Experience
              </NavigationMenuNextLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                href={process.env.NEXT_PUBLIC_BLOG_URL}
                className={clsx(navigationMenuTriggerStyle, navLinkSyle)}
              >
                Blog
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem className="hidden sm:list-item">
              <NavigationMenuTrigger
                data-contains-active={projectListActive}
                className={clsx(
                  navLinkSyle,
                  "data-[contains-active]:text-text data-[contains-active]:underline"
                )}
              >
                Projects
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="list-none py-2.5">
                  <li>
                    <NavigationMenuNextLink className={dropLinkStyle} href="/code">
                      <FontAwesomeIcon icon={faCode} height="1em" width="1em" /> Code
                    </NavigationMenuNextLink>
                  </li>
                  <li>
                    <NavigationMenuNextLink className={dropLinkStyle} href="/media">
                      <FontAwesomeIcon icon={faFilm} height="1em" width="1em" /> Media
                    </NavigationMenuNextLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem className="list-item border-t border-text/40 sm:hidden">
              <h5 className="px-2 pt-2">Projects</h5>
              <div className="mx-3 flex gap-x-3 pb-2">
                <NavigationMenuNextLink className={clsx(navLinkSyle, "gap-x-2")} href="/code">
                  <FontAwesomeIcon icon={faCode} height="1em" width="1em" /> Code
                </NavigationMenuNextLink>
                <NavigationMenuNextLink className={clsx(navLinkSyle, "gap-x-2")} href="/media">
                  <FontAwesomeIcon icon={faFilm} height="1em" width="1em" /> Media
                </NavigationMenuNextLink>
              </div>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </m.header>
  );
}
