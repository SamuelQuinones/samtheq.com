/* eslint-disable @next/next/no-img-element */
import { FC, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import useOutsideClick from "@hooks/useOutsideClick";
import { useRouter } from "next/router";
import classNames from "classnames";

const Navbar: FC = ({ children }) => {
  const [open, setOpen] = useState(false);
  const NAV_REF = useRef<HTMLElement>(null);
  const router = useRouter();

  //* Helper to minimize redundant code
  const useTopBottom = (mult: 1 | -1, moveY: number) => {
    return {
      open: {
        transform: `translateY(${mult * moveY}rem) rotate(${mult * 45}deg)`,
      },
      closed: {
        transform: "translateY(0rem) rotate(0deg)",
      },
    };
  };

  const hideNavbar = () => setOpen(false);

  useEffect(() => {
    router.events.on("routeChangeStart", hideNavbar);
    return () => {
      router.events.off("routeChangeStart", hideNavbar);
    };
  }, [router.events]);

  useOutsideClick(NAV_REF, hideNavbar);

  const burgerLine = classNames(
    "h-[0.1875rem]",
    "rounded-full",
    "w-full",
    "relative",
    "bg-white"
  );

  return (
    <motion.nav
      animate={open ? "open" : "closed"}
      initial={false}
      ref={NAV_REF}
      className="navbar fixed w-full top-0 inset-x-0 py-0 sm:py-2 shadow-md bg-gray-900"
      style={{ zIndex: 9999 }}
    >
      <div className="bs-container-xl sm:flex sm:justify-between">
        <div className="flex items-center justify-between py-3 sm:py-0">
          {/* Logo */}
          <img src="/favicon.ico" className="h-8" alt="SamTheQ Logo" />
          <div className="flex sm:hidden">SamTheQ</div>
          {/* Toggle Button */}
          <div className="flex sm:hidden">
            <button
              className="h-8 w-8 flex flex-col justify-around items-center rounded-sm transition-shadow focus:ring focus:ring-opacity-60 focus:outline-none"
              onClick={() => setOpen(!open)}
            >
              <motion.span
                className={burgerLine}
                variants={useTopBottom(1, 0.625)}
              />
              <motion.span
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
              <motion.span
                className={burgerLine}
                variants={useTopBottom(-1, 0.7)}
              />
            </button>
          </div>
        </div>
        {/* Content */}
        <div className={`${open ? "block" : "hidden"} py-2 sm:flex sm:p-0`}>
          {children}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
