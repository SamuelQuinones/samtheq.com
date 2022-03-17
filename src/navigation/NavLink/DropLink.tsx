import { FC, useRef, useEffect } from "react";
import DropMenu from "@components/DropMenu";
import { useRouter } from "next/router";
import { smallTransitionConfig } from "../Helper";

type Props = {
  label: string;
};

const DropLink: FC<Props> = ({ children, label }) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLAnchorElement>(null);
  const { asPath } = useRouter();

  useEffect(() => {
    if (!menuRef.current || !triggerRef.current) return;
    const containsActiveLink = menuRef.current.querySelector(".active");
    if (!containsActiveLink) {
      triggerRef.current.classList.remove("active");
    } else {
      triggerRef.current.classList.add("active");
    }
  }, [asPath]);

  return (
    //? Do I need this div?
    <div className="nav-menu max-md:relative">
      <DropMenu
        as="a"
        ref={triggerRef}
        className="nav-link"
        dropMenuLabel={label}
        menuPosition="bottom-end"
        menuRef={menuRef}
        arrowLast
        menuClassList="bg-gray-700"
        smallScreenTransition={smallTransitionConfig}
      >
        {children}
      </DropMenu>
    </div>
  );
};

export default DropLink;
