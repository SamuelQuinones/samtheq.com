import { FC } from "react";
import NavLink from "react-bootstrap/NavLink";
import ActiveLink from "./ActiveLink";
import { ItemProps } from "./Helper";

const NavItem: FC<ItemProps> = ({ children, to, ...props }) => {
  return (
    <ActiveLink activeClassName="active" href={to} {...props} passHref>
      <NavLink className="stq-nl nav-item" active={false}>
        {children}
      </NavLink>
    </ActiveLink>
  );
};

export default NavItem;
