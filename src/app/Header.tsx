"use client";

//TODO: Reset Focus

import { useIsomorphicLayoutEffect, useOutsideClick } from "@/hooks";
import { useState, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import { m } from "framer-motion";
import clsx from "clsx";
import Image from "next/image";
import { DropLink, NavLink } from "./NavLink";
import DropmenuItem from "@/components/DropMenu/Item";

/** h-8 = 2rem, py-3 is .75 rem on both sides, should total 3.5rem or 56px */
const NAVBAR_BASE_HEIGHT = 2 + 2 * 0.75;
const navbarVariants = {
  open: { height: "auto" },
  closed: { height: `${NAVBAR_BASE_HEIGHT}rem` },
};

const burgerLineClasses = clsx("h-[0.1875rem]", "rounded-full", "w-full", "relative", "bg-white");

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
  const CHILDREN_REF = useRef<HTMLDivElement>(null);
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

  return (
    <m.header
      role="navigation"
      animate={open ? "open" : "closed"}
      initial={false}
      ref={HEADER_REF}
      variants={navbarVariants}
      className="navbar fixed inset-x-0 top-0 w-full overflow-y-hidden bg-gray-900 py-0 shadow-lg sm:overflow-y-visible sm:py-2"
      style={{ zIndex: 9999 }}
      onAnimationStart={onAnimationStart}
      onAnimationComplete={onAnimationComplete}
      transition={{ type: "tween", duration: 0.2 }}
    >
      <nav className="bs-container-xl sm:flex sm:justify-between">
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
              className="flex h-8 w-8 flex-col items-center justify-around rounded-sm transition-shadow focus:outline-none focus:ring focus:ring-opacity-60"
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
        <section ref={CHILDREN_REF} className="py-2 max-sm:hidden sm:flex sm:p-0">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/experience">Experience</NavLink>
          <NavLink to="/blog">Blog</NavLink>
          <DropLink id="content-drop-down" label="Projects">
            <DropmenuItem className="nav-link w-full hocus:!bg-transparent hocus:!text-opacity-80">
              Coming Soon...
            </DropmenuItem>
          </DropLink>
        </section>
      </nav>
    </m.header>
  );
}