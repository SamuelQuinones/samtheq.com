import { FC } from "react";
import ActiveLink from "./_ActiveLink";
import { ItemProps } from "./Helper";

const NavItem: FC<ItemProps> = ({ children, to, ...props }) => {
  return (
    <ActiveLink activeClassName="active" href={to} {...props} passHref>
      <a className="stq-nl block p-2 rounded transition-colors focus:outline-none hover:bg-gray-800">
        {children}
      </a>
    </ActiveLink>
  );
};

export default NavItem;
