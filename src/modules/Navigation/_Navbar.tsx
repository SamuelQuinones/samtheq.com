/* eslint-disable @next/next/no-img-element */
import { FC, useEffect, useRef, useState } from "react";
import useOutsideClick from "@hooks/useOutsideClick";
import { useRouter } from "next/router";
import classNames from "classnames";

const Navbar: FC = ({ children }) => {
  const [open, setOpen] = useState(false);
  const NAV_REF = useRef<HTMLElement>(null);
  const router = useRouter();

  const hideNavbar = () => setOpen(false);

  useEffect(() => {
    router.events.on("routeChangeStart", hideNavbar);
    return () => {
      router.events.off("routeChangeStart", hideNavbar);
    };
  }, [router.events]);

  useOutsideClick(NAV_REF, hideNavbar);

  const commonBurgerClasses = classNames(
    "h-[0.1875rem]",
    "rounded-full",
    "w-full",
    "relative",
    "bg-white",
    "transform",
    "duration-300",
    "ease-in-out",
    !open && "rotate-0 translate-y-0 translate-x-0 opacity-1 scale-1"
  );

  return (
    <nav
      ref={NAV_REF}
      className="navbar fixed w-full top-0 left-0 right-0 py-0 sm:py-2 shadow-md bg-gray-900"
      style={{ zIndex: 9999 }}
    >
      <div className="bs-container-xl sm:flex sm:justify-between">
        <div className="flex items-center justify-between py-3 sm:py-0">
          {/* Logo */}
          {/* <div> */}
          <img src="/favicon.ico" className="h-8" alt="SamTheQ Logo" />
          {/* </div> */}
          <div className="flex sm:hidden">SamTheQ</div>
          {/* Toggle Button */}
          <div className="flex sm:hidden">
            <button
              className="h-8 w-8 flex flex-col justify-around items-center rounded-sm transition-shadow focus:ring focus:ring-opacity-60 focus:outline-none"
              onClick={() => setOpen(!open)}
            >
              <span
                className={classNames(
                  commonBurgerClasses,
                  "transition-transform",
                  open && "rotate-45 translate-y-2.5"
                )}
              />
              <span
                className={classNames(
                  commonBurgerClasses,
                  "transition-slide",
                  open && "scale-90 opacity-0"
                )}
              />
              <span
                className={classNames(
                  commonBurgerClasses,
                  "transition-transform",
                  open && "-rotate-45 translate-y-[-0.7rem]"
                )}
              />
            </button>
          </div>
        </div>
        {/* Content */}
        <div className={`${open ? "block" : "hidden"} py-2 sm:flex sm:p-0`}>
          {children}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
