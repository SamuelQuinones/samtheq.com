import { FC } from "react";
import ActiveLink from "./ActiveLink";
import { ItemProps } from "./Helper";

const NavItem: FC<ItemProps> = ({ children, to, ...props }) => {
  return (
    <ActiveLink activeClassName="active" href={to} {...props} passHref>
      <a className="stq-nl block px-2 py-1 rounded transition-colors focus:outline-none hover:bg-gray-600">
        {children}
      </a>
    </ActiveLink>
  );
};

export default NavItem;
