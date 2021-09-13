/* eslint-disable @next/next/no-img-element */
import { FC, useEffect, useRef, useState } from "react";
import { useSpring, a } from "@react-spring/web";
import useOutsideClick from "@hooks/useOutsideClick";
import { useRouter } from "next/router";
import classNames from "classnames";

const Navbar: FC = ({ children }) => {
  const [open, setOpen] = useState(false);
  const NAV_REF = useRef<HTMLElement>(null);
  const router = useRouter();

  //* Helper to minimize redundant code
  const useTopBottom = (multpilier: 1 | -1, translateY: number) => {
    const translate = `translateY(${open ? multpilier * translateY : 0}rem)`;
    const rotate = `rotate(${open ? multpilier * 45 : 0}deg)`;
    return useSpring({
      transform: `${translate} ${rotate}`,
    });
  };

  const middle = useSpring({
    transform: `scale(${open ? 0.5 : 1})`,
    opacity: open ? 0 : 1,
  });

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
    <nav
      ref={NAV_REF}
      className="navbar fixed w-full top-0 inset-x-0 py-0 sm:py-2 shadow-md bg-gray-900"
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
              <a.span className={burgerLine} style={useTopBottom(1, 0.625)} />
              <a.span className={burgerLine} style={middle} />
              <a.span className={burgerLine} style={useTopBottom(-1, 0.7)} />
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
