//TODO: Look into switching the span tags with an svg parent and path children a-la https://codesandbox.io/s/framer-motion-side-menu-mx2rw?from-embed=&file=/src/MenuToggle.tsx

/* eslint-disable @next/next/no-img-element */
import { ReactNode, useCallback, useRef, useState } from "react";
import { m } from "framer-motion";
import { useOutsideClick, useOnRouterEvent } from "@hooks";
// import { contains } from "@util/DomHelper";
import {
  burgerBottom,
  burgerLine,
  navbarSmallHeight,
  burgerTop,
} from "./Helper";

type Props = { children: ReactNode };

const Navbar = ({ children }: Props) => {
  const [open, setOpen] = useState(false);
  const HEADER_REF = useRef<HTMLElement>(null);
  const CHILDREN_REF = useRef<HTMLDivElement>(null);
  // const TOGGLE_REF = useRef<HTMLButtonElement>(null);

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

  const hideNavbar = useCallback(() => setOpen(false), []);
  const toggleNavbar = useCallback(() => setOpen((prev) => !prev), []);

  useOnRouterEvent("routeChangeStart", hideNavbar);
  useOutsideClick(HEADER_REF, hideNavbar, "pointerdown");
  // TODO: Block focus when closed on lower breakpoints
  // useEventListener(HEADER_REF, "focusin", (e) => {
  //   if (!CHILDREN_REF.current || !TOGGLE_REF.current) return;
  //   if (contains(CHILDREN_REF.current, e.target as Element) && !open) {
  //     TOGGLE_REF.current?.focus();
  //   }
  // });

  return (
    <m.header
      role="navigation"
      animate={open ? "open" : "closed"}
      initial={false}
      ref={HEADER_REF}
      variants={navbarSmallHeight}
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
          <img src="/favicon.ico" height="32" width="32" alt="SamTheQ Logo" />
          <span className="flex sm:hidden">SamTheQ</span>
          {/* Toggle Button */}
          <div className="flex sm:hidden">
            <button
              className="flex h-8 w-8 flex-col items-center justify-around rounded-sm transition-shadow focus:outline-none focus:ring focus:ring-opacity-60"
              onClick={toggleNavbar}
              aria-label="Toggle Navbar"
              // ref={TOGGLE_REF}
            >
              <m.span className={burgerLine} variants={burgerTop} />
              <m.span
                className={burgerLine}
                variants={{
                  open: {
                    opacity: 0,
                  },
                  closed: {
                    opacity: 1,
                  },
                }}
                transition={{ duration: 0.1 }}
              />
              <m.span className={burgerLine} variants={burgerBottom} />
            </button>
          </div>
        </section>
        {/* Content */}
        <section
          ref={CHILDREN_REF}
          className="py-2 sm:flex sm:p-0 max-sm:hidden"
        >
          {children}
        </section>
      </nav>
    </m.header>
  );
};

export default Navbar;
