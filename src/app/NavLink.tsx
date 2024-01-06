import DropmenuMenu from "@/components/DropMenu/Menu";
import DropmenuToggle from "@/components/DropMenu/Toggle";
import { useMediaQuery } from "@/hooks";
import { Dropdown } from "@restart/ui";
import clsx from "clsx";
import { m } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type HTMLAttributes, useState, type ReactNode } from "react";

interface NavLinkProps extends HTMLAttributes<HTMLElement> {
  highlightNested?: boolean;
  href: string;
  children?: ReactNode;
}

interface DropLinkProps {
  label: string;
  id: string;
  children: ReactNode;
}

function isActiveNested(href: string, pathname: string) {
  const splitHref = href.split("/");
  const splitPathname = pathname.split("/");
  for (let i = 0; i < splitHref.length; i++) {
    if (splitHref[i] !== splitPathname[i]) return false;
  }
  return true;
}

export function NavLink({ href, highlightNested, children, className, ...rest }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = highlightNested ? isActiveNested(href, pathname) : pathname === href;
  const classList = clsx("nav-link", isActive && "active", className);
  return (
    <Link {...rest} href={href} className={classList}>
      {children}
    </Link>
  );
}

const smallVariants = {
  open: { opacity: 1, display: "block" },
  closed: { opacity: 0, transitionEnd: { display: "none" } },
};

const defaultVariants = {
  open: { scale: 1, opacity: 1, display: "block" },
  closed: { scale: 0.9, opacity: 0, transitionEnd: { display: "none" } },
};

const smallTransition = { type: "tween", duration: 0 };
const defaultTransition = { type: "tween", duration: 0.15 };

/**
 * @example
 * <DropLink id="drop-link-one" label="Projects">
 *  <DropmenuItem as={NavLink} to="/code">
 *    Code
 *  </DropmenuItem>
 *  <DropmenuItem as={NavLink} to="/video">
 *    Video
 *  </DropmenuItem>
 * </DropLink>
 */
export function DropLink({ children, id, label }: DropLinkProps) {
  const [show, setShow] = useState(false);
  const [display, setDisplay] = useState("hidden");

  const isLarge = useMediaQuery("(min-width: 640px)");
  const variants = isLarge ? defaultVariants : smallVariants;
  const transition = isLarge ? defaultTransition : smallTransition;

  return (
    <div className="nav-item relative">
      <Dropdown show={show} onToggle={(nextShow) => setShow(nextShow)} placement="bottom-end">
        <DropmenuToggle id={id} className="nav-link drop-toggle items-center gap-1">
          <span>{label}</span>
          <span className="text-xs">&#9660;</span>
        </DropmenuToggle>
        <DropmenuMenu
          className={`${display} popper-nav-menu right-0 top-full mt-1 rounded sm:absolute`}
          usePopper={false}
        >
          <m.div
            variants={variants}
            initial="closed"
            className="min-w-[8rem] origin-top-right rounded bg-gray-700 py-2 shadow-md"
            animate={show ? "open" : "closed"}
            onAnimationStart={() => show && setDisplay("block")}
            onAnimationComplete={() => !show && setDisplay("hidden")}
            transition={transition}
          >
            {children}
          </m.div>
        </DropmenuMenu>
      </Dropdown>
    </div>
  );
}
