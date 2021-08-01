/* eslint-disable @next/next/no-img-element */
import { FC, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import useOutsideClick from "@hooks/useOutsideClick";

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
      className="navbar sm:flex sm:justify-between fixed w-full top-0 left-0 right-0 sm:px-4 sm:py-3 shadow-md bg-gray-900"
      style={{ zIndex: 9999999 }}
    >
      <div className="flex items-center justify-between px-4 py-3 sm:p-0">
        {/* Logo */}
        <div>
          <img src="/favicon.ico" className="h-8" alt="SamTheQ Logo" />
        </div>
        <div className="block sm:hidden">SamTheQ</div>
        {/* Toggle Button */}
        <div className="sm:hidden flex">
          <button onClick={() => setOpen(!open)}>
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
      <div className={`${open ? "block" : "hidden"} px-2 py-2 sm:flex sm:p-0`}>
        {children}
      </div>
    </nav>
  );
};

export default Navbar;
