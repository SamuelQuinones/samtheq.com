import { FC, useRef, useEffect, useState, useMemo } from "react";
import { m } from "framer-motion";
import { useRouter } from "next/router";
import { Dropdown } from "@restart/ui";
import { useWindowSize } from "@hooks";
import DropmenuToggle from "@components/DropMenu/Toggle";
import DropmenuMenu from "@components/DropMenu/Menu";
import { transitionConfig } from "@components/DropMenu/Helper";
import { smallTransitionConfig } from "../Helper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { qs, resolveElement } from "@util/DomHelper";

type Props = {
  label: string;
  id: string;
};

/**
 *
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
const DropLink: FC<Props> = ({ children, label, id }) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLAnchorElement>(null);
  const { asPath } = useRouter();
  const [show, setShow] = useState(false);
  const [display, setDisplay] = useState("hidden");
  useEffect(() => {
    const menuEl = resolveElement(menuRef);
    const triggerEl = resolveElement(triggerRef);
    if (!menuEl || !triggerEl) return;
    const containsActiveLink = qs(menuEl, ".active");
    if (!containsActiveLink) {
      triggerEl.classList.remove("active");
    } else {
      triggerEl.classList.add("active");
    }
  }, [asPath]);

  const { width } = useWindowSize();
  const isSmall = useMemo(() => width <= 639, [width]);

  const responsiveVariants = useMemo(
    () => (isSmall ? smallTransitionConfig : transitionConfig),
    [isSmall]
  );
  const responsiveTransitionConfig = useMemo(
    () =>
      isSmall
        ? { type: "tween", duration: 0 }
        : { type: "tween", duration: 0.15 },
    [isSmall]
  );

  return (
    <div className="relative">
      <Dropdown
        show={show}
        onToggle={(nextShow) => setShow(nextShow)}
        placement="bottom-end"
      >
        <DropmenuToggle
          ref={triggerRef}
          as="a"
          role="button"
          href="#"
          onClick={(e) => e.preventDefault()}
          className="nav-link drop-toggle flex items-center gap-1"
          id={id}
        >
          <span>{label}</span>
          <FontAwesomeIcon icon={["fas", "chevron-down"]} size="sm" />
        </DropmenuToggle>
        <DropmenuMenu
          ref={menuRef}
          className={`${display} popper-nav-menu top-[100%] right-0 mt-1 rounded sm:absolute`}
          usePopper={false}
        >
          <m.div
            variants={responsiveVariants}
            initial="closed"
            className="min-w-[8rem] origin-top-right rounded bg-gray-700 py-2 shadow-md"
            animate={show ? "open" : "closed"}
            onAnimationStart={() => show && setDisplay("block")}
            onAnimationComplete={() => !show && setDisplay("hidden")}
            transition={responsiveTransitionConfig}
          >
            {children}
          </m.div>
        </DropmenuMenu>
      </Dropdown>
    </div>
  );
};

export default DropLink;
