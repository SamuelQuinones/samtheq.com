import { FC } from "react";
import ActiveLink from "./_ActiveLink";
import { ItemProps } from "./Helper";

const NavItem: FC<ItemProps> = ({ children, to, ...props }) => {
  const focusClasses =
    "hover:bg-gray-800 hover:text-opacity-100 focus:text-opacity-100 active:text-opacity-100 focus-within:text-opacity-100";

  return (
    <ActiveLink
      activeClassName="font-bold"
      href={to}
      switchClasses={{
        isActive: "text-opacity-100",
        notActive: "text-opacity-80",
      }}
      {...props}
      passHref
    >
      <a
        className={`font-lato flex px-2 py-2 md:py-1 text-white rounded transition-colors ${focusClasses}`}
      >
        {children}
      </a>
    </ActiveLink>
  );
};

export default NavItem;
