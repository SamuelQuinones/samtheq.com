/* eslint-disable @next/next/no-img-element */
import { FC, useEffect, useRef, useState } from "react";
import useOutsideClick from "@hooks/useOutsideClick";
import { useRouter } from "next/router";

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
          <div className="sm:hidden flex">
            <button
              className="focus:ring focus:ring-opacity-60 focus:outline-none rounded-sm transition-shadow"
              onClick={() => setOpen(!open)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                />
              </svg>
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
