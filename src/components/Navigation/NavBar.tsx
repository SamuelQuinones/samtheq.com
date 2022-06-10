//TODO: Look into switching the span tags with an svg parent and path children a-la https://codesandbox.io/s/framer-motion-side-menu-mx2rw?from-embed=&file=/src/MenuToggle.tsx

/* eslint-disable @next/next/no-img-element */
import { FC, useCallback, useRef, useState } from "react";
import { m } from "framer-motion";
import { useOutsideClick, useOnRouterEvent } from "@hooks";
import {
  burgerBottom,
  burgerLine,
  navbarSmallHeight,
  burgerTop,
} from "./Helper";

const Navbar: FC = ({ children }) => {
  const [open, setOpen] = useState(false);
  const NAV_REF = useRef<HTMLElement>(null);

  const hideNavbar = useCallback(() => setOpen(false), []);
  const toggleNavbar = useCallback(() => setOpen((prev) => !prev), []);

  useOnRouterEvent("routeChangeStart", hideNavbar);
  useOutsideClick(NAV_REF, hideNavbar);

  return (
    <m.header
      role="navigation"
      animate={open ? "open" : "closed"}
      initial={false}
      ref={NAV_REF}
      variants={navbarSmallHeight}
      className="navbar fixed inset-x-0 top-0 w-full overflow-y-hidden bg-gray-900 py-0 shadow-lg sm:overflow-y-visible sm:py-2"
      style={{ zIndex: 9999 }}
    >
      <nav className="bs-container-xl sm:flex sm:justify-between">
        <a href="#stq-page-content" data-nav-skip-link="true">
          Skip To Content
        </a>
        <div className="flex items-center justify-between py-3 sm:py-0">
          {/* Logo */}
          <img src="/favicon.ico" height="32" width="32" alt="SamTheQ Logo" />
          <span className="flex sm:hidden">SamTheQ</span>
          {/* Toggle Button */}
          <section className="flex sm:hidden">
            <button
              className="flex h-8 w-8 flex-col items-center justify-around rounded-sm transition-shadow focus:outline-none focus:ring focus:ring-opacity-60"
              onClick={toggleNavbar}
              aria-label="Toggle Navbar"
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
          </section>
        </div>
        {/* Content */}
        <div className={`block py-2 sm:flex sm:p-0`}>{children}</div>
      </nav>
    </m.header>
  );
};

export default Navbar;
