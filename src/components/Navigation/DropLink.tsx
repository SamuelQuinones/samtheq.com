import { type ReactNode, useState, useMemo } from "react";
import { m } from "framer-motion";
import { Dropdown } from "@restart/ui";
import { useWindowSize } from "@hooks";
import DropmenuToggle from "@components/DropMenu/Toggle";
import DropmenuMenu from "@components/DropMenu/Menu";
import { smallTransitionConfig, transitionConfig } from "./Helper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  label: string;
  id: string;
  children?: ReactNode;
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
const DropLink = ({ children, label, id }: Props) => {
  const [show, setShow] = useState(false);
  const [display, setDisplay] = useState("hidden");

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
          as="a"
          role="button"
          href="#"
          onClick={(e) => e.preventDefault()}
          className="nav-link drop-toggle items-center gap-1"
          id={id}
        >
          <span>{label}</span>
          <FontAwesomeIcon
            icon={["fas", "chevron-down"]}
            size="sm"
            height="1em"
          />
        </DropmenuToggle>
        <DropmenuMenu
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
