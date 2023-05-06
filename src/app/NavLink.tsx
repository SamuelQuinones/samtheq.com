import DropmenuMenu from "@/components/DropMenu/Menu";
import DropmenuToggle from "@/components/DropMenu/Toggle";
import { useMediaQuery } from "@/hooks";
import { Dropdown } from "@restart/ui";
import clsx from "clsx";
import { m } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";

interface NavLinkProps {
  highlightNested?: boolean;
  to: string;
  children?: ReactNode;
}

interface DropLinkProps {
  label: string;
  id: string;
  children: ReactNode;
}

export function NavLink({ to, highlightNested, children }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = highlightNested ? `/${pathname.split("/")[1]}` === to : pathname === to;
  const classList = clsx("nav-link", { active: isActive });
  return (
    <Link href={to} className={classList}>
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
 *  <DropmenuItem as={NavLink} href="/code">
 *    Code
 *  </DropmenuItem>
 *  <DropmenuItem as={NavLink} href="/video">
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
    <div className="relative">
      <Dropdown show={show} onToggle={(nextShow) => setShow(nextShow)} placement="bottom-end">
        <DropmenuToggle role="button" className="nav-link drop-toggle items-center gap-1" id={id}>
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
